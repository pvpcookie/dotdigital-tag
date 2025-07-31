/**
 * Initialize Dotdigital tracking with region and profile ID (Shopware compatible)
 * Prevents multiple initializations by checking for existing script tags
 * Loads the official Dotdigital script and allows it to replace our proxy
 * @param {string} regionId - Dotdigital region identifier (e.g., '1', '2', '3')
 * @param {string} profileId - Dotdigital profile/account identifier
 * @returns {void}
 */
const initializeDotdigital = (regionId, profileId) => {
    if (!regionId || !profileId) {
        console.warn('Dotdigital initialization failed: regionId and profileId are required');
        return;
    }

    const scriptUrl = `//r${regionId}.ddlnk.net/${profileId}/ddgtag.js`;
    if (document.querySelector(`script[src*="${profileId}/ddgtag.js"]`)) {
        isDotdigitalReady = true;
        processQueuedMethodCalls();
        emitTagLoadedEvent();
        return;
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    
    script.onload = () => {
        isDotdigitalReady = true;
        
        setTimeout(() => {
            processQueuedMethodCalls();
            emitTagLoadedEvent();
        }, 100);
    };
    
    script.onerror = () => {
        console.error('Failed to load Dotdigital script');
        isDotdigitalReady = true;
        processQueuedMethodCalls();
    };
    
    document.head.appendChild(script);
};

/**
 * Dispatches a custom browser event to notify other parts of the application
 * that the Dotdigital tracking tag has finished loading and is ready for use
 * @returns {void}
 */
const emitTagLoadedEvent = () => {
    window.dispatchEvent(new CustomEvent('DotdigitalTagLoaded', {
        detail: {
            message: 'dotdigital tag loaded',
            timestamp: Date.now()
        }
    }));
};

const queuedMethodCalls = [];
let isDotdigitalReady = false;

/**
 * Process all queued method calls using the real Dotdigital API
 * Once the real script loads, this will call the actual Dotdigital methods
 * @returns {void}
 */
const processQueuedMethodCalls = () => {
    while (queuedMethodCalls.length > 0) {
        const { methodName, methodArguments, promiseResolve } = queuedMethodCalls.shift();
        if (window.ddg && typeof window.ddg[methodName] === 'function') {
            try {
                const result = window.ddg[methodName](...methodArguments);
                if (promiseResolve) promiseResolve(result);
            } catch (error) {
                console.error(`Error calling Dotdigital ${methodName}:`, error);
                if (promiseResolve) promiseResolve(false);
            }
        } else {
            console.log(`Dotdigital ${methodName}:`, methodArguments);
            if (promiseResolve) promiseResolve(true);
        }
    }
};

/**
 * Mark Dotdigital as ready and process any queued method calls
 * @returns {void}
 */
const setDotdigitalReady = () => {
    isDotdigitalReady = true;
    processQueuedMethodCalls();
    emitTagLoadedEvent();
};

/**
 * Temporary Dotdigital proxy that queues calls until the real script loads
 * Once initialized, the real Dotdigital script will completely replace this proxy
 * 
 * Available methods:
 * - init(regionId, profileId) - Initialize tracking
 * - signal(signalName, data) - Custom signal tracking
 * - track(data) - Generic tracking
 * - identify(userData) - User identification  
 * And all other Dotdigital tracking methods
 */
window.ddg = window.ddg || new Proxy({
    init: (regionId, profileId) => initializeDotdigital(regionId, profileId),
    _setReady: setDotdigitalReady,
    _isReady: () => isDotdigitalReady,
    _getQueueLength: () => queuedMethodCalls.length,
    _getQueue: () => queuedMethodCalls
}, {
    get(target, propertyName) {
        if (propertyName in target) {
            return target[propertyName];
        }
        
        return function(...args) {
            if (isDotdigitalReady) {
                return true;
            }
            
            return new Promise((resolve, reject) => {
                queuedMethodCalls.push({
                    methodName: propertyName,
                    methodArguments: args,
                    promiseResolve: resolve,
                    promiseReject: reject
                });
            });
        };
    }
});