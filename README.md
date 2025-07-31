# Dotdigital Tracking Test Page

A comprehensive test environment for Dotdigital tracking implementation with real-time event monitoring, advanced queuing system, and interactive testing capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js installed on your system
- npm (comes with Node.js)
- A web browser with developer tools
- Your Dotdigital profile ID and region

### Local Development Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/shaunhogan/Work/tag-example
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Add your Dotdigital script**
   - Place your actual `dotdigital-tag.js` file in this directory
   - The test page will automatically load it

5. **Open the test page**
   - The development server will start and provide you with the local URL
   - Navigate to the provided URL (typically http://localhost:8080)

## 🧪 Test Page Features

### Configuration Panel
- **Region Selection**: Choose from Regions 1, 2, or 3
- **Profile ID Input**: Enter your Dotdigital profile identifier
- **Initialize Button**: Start Dotdigital tracking with your credentials
- **Control Buttons**: Clear console, reset page, test queue functionality

### Real-Time Monitoring
- **Status Indicator**: Live status of script loading and initialization
- **Queue Monitor**: Real-time display of queued events waiting to be processed
- **Console Output**: Color-coded logs of all tracking events and system messages
- **Network Monitor**: Track all HTTP requests made by the Dotdigital script

### Interactive Testing Sections

#### 🔍 Core Tracking
- **Page View**: Test basic page tracking
- **Custom Event**: Test custom event tracking  
- **Form Submit**: Test form submission tracking

#### 👤 User & Signals
- **Identify Email**: Test user identification
- **Product Signal**: Test product interest signals
- **Checkout Signal**: Test checkout amount signals
- **Newsletter**: Test newsletter signup signals

#### 🛒 E-commerce
- **Browse Product**: Test product view tracking
- **Add to Cart**: Test cart addition events
- **Checkout**: Test checkout process tracking
- **Purchase**: Test purchase completion events

#### 🎯 Advanced & Custom
- **Loyalty Points**: Test loyalty program events
- **Wishlist**: Test wishlist functionality
- **Complete Journey**: Run a full customer journey test
- **Marketing Flow**: Test marketing campaign flow

#### ⚙️ More Options
- **Product List**: Test category/listing views
- **Remove Cart**: Test cart removal events
- **Coupon Signal**: Test coupon usage tracking
- **Full Identify**: Test comprehensive user identification
- **Anonymous**: Test anonymous user tracking
- **Review**: Test review submission events
- **Support**: Test support ticket events

### Advanced Testing Features

#### 🔄 Event Queuing System
The test page demonstrates the advanced queuing capabilities:

1. **Pre-Script Testing**: Send events before initialization to see queuing in action
2. **Queue Monitoring**: Watch events accumulate in the queue
3. **Live Processing**: See queued events get processed when script initializes
4. **Queue Status**: Real-time count of pending events

#### 📊 Monitoring Tools
- **Tabbed Interface**: Switch between Console and Network monitoring
- **Color-coded Logs**: Different colors for system, test, network, and error messages
- **Timestamped Events**: Precise timing for all events
- **Network Tracking**: Monitor all HTTP requests and responses

## 🛠️ Development Workflow

### Testing Event Queuing
1. **Load the page** (script not yet initialized)
2. **Click "Test Queue"** to send events before initialization
3. **Watch events queue up** in the Queue Monitor
4. **Enter your Profile ID** and click "Initialize Dotdigital"
5. **See queued events process** in real-time

### Testing Individual Features
1. **Expand any section** by clicking the section headers
2. **Click test buttons** to trigger specific tracking events
3. **Monitor the console** for real-time feedback
4. **Check the network tab** for HTTP requests

### Complete Journey Testing
1. **Click "Complete Journey"** for an automated test sequence
2. **Watch the step-by-step process** in the console
3. **Monitor network requests** as each event fires
4. **Verify proper event sequencing**

## 📁 File Structure

```
tag-example/
├── index.html          # Main test page
├── index.css           # Styling for the test interface
├── package.json        # Node.js dependencies (if any)
├── README.md          # This documentation
└── dotdigital-tag.js  # Your Dotdigital script (add this file)
```

## 🔧 Configuration

### Required Files
- **dotdigital-tag.js**: Your actual Dotdigital tracking script
- **index.html**: The test interface (already provided)
- **index.css**: Styling for the interface (already provided)

### Environment Setup
- **Local server required**: Due to CORS restrictions, the page must be served via HTTP
- **Developer tools**: Use browser dev tools for additional monitoring
- **Network monitoring**: Enable network tab to see tracking requests

## 🐛 Troubleshooting

### Common Issues

**Script not loading:**
- Ensure `dotdigital-tag.js` is in the same directory as `index.html`
- Check browser console for file loading errors
- Verify local server is running

**Events not tracking:**
- Check that Profile ID and Region are correctly entered
- Verify initialization was successful (status indicator should be green)
- Monitor network tab for failed requests

**Queue not working:**
- Events should queue automatically before initialization
- Check console for queue-related messages
- Verify `testQueue()` function is working

**Console not showing data:**
- Ensure JavaScript is enabled in your browser
- Check for any JavaScript errors in browser console
- Try refreshing the page and re-initializing

### Debug Information
The test page provides extensive debugging information:
- **System Messages**: Script loading and initialization status
- **Queue Status**: Real-time queue length and content
- **Network Logs**: All HTTP requests with status codes
- **Event Logs**: Detailed tracking event information

## 📚 API Documentation

For detailed information about available tracking methods, see the [API Documentation](#dotdigital-tracking-methods) section below.

# Dotdigital Tracking Methods

This document outlines all available methods for the Dotdigital tracking implementation in Shopware.

## Table of Contents

- [Initialization](#initialization)
- [Core Tracking Methods](#core-tracking-methods)
- [E-commerce Tracking](#e-commerce-tracking)
- [User Identification](#user-identification)
- [Custom Events](#custom-events)
- [Complete Usage Examples](#complete-usage-examples)
- [Integration Notes](#integration-notes)

## Initialization

### `init(regionId, profileId)`
Initialize Dotdigital tracking with your account credentials.

```javascript
// Basic initialization
window.ddg.init('1', 'your-profile-id');

// Region options: '1', '2', or '3'
window.ddg.init('2', 'your-profile-id'); // Region 2
window.ddg.init('3', 'your-profile-id'); // Region 3
```

**Parameters:**
- `regionId` (string): Dotdigital region identifier ('1', '2', or '3')
- `profileId` (string): Your Dotdigital profile/account identifier

## Core Tracking Methods

### `track(data)`
Generic tracking method for custom events and page views.

```javascript
// Track page view
window.ddg.track({
    event: 'page_view',
    page: '/product/wireless-headphones',
    title: 'Wireless Headphones - Product Page',
    category: 'Electronics'
});

// Track custom interaction
window.ddg.track({
    event: 'button_click',
    element: 'add_to_cart',
    product_id: 'WH-001',
    timestamp: Date.now()
});

// Track form submission
window.ddg.track({
    event: 'form_submit',
    form_type: 'contact',
    form_id: 'contact-form',
    success: true
});
```

### `signal(signalName, data)`
Send custom signals for specific business events.

```javascript
// Product interest signal
window.ddg.signal('product', 'Wireless Headphones - Premium Quality');

// Revenue tracking signal
window.ddg.signal('CheckOutAmount', 99.99);

// Newsletter signup
window.ddg.signal('newsletter_signup', 'premium');

// Coupon usage
window.ddg.signal('coupon_used', 'SAVE10PERCENT');

// Custom business events
window.ddg.signal('loyalty_tier_upgrade', 'gold');
window.ddg.signal('wishlist_add', 'product-123');
```

## E-commerce Tracking

### `productBrowse(productData)`
Track when users view individual products.

```javascript
window.ddg.productBrowse({
    product_name: 'Wireless Bluetooth Headphones',
    product_sku: 'WH-BT-001',
    product_price: 99.99,
    product_currency: 'EUR',
    product_category: 'Electronics > Audio > Headphones',
    product_brand: 'TechBrand',
    product_url: '/products/wireless-bluetooth-headphones',
    product_image: '/media/products/wh-bt-001.jpg',
    product_description: 'Premium wireless headphones with noise cancellation',
    product_availability: 'in_stock',
    product_rating: 4.5,
    product_reviews: 127
});
```

### `productList(listData)`
Track when users view product listings or categories.

```javascript
window.ddg.productList({
    list_name: 'Electronics Category',
    list_id: 'cat-electronics',
    list_type: 'category',
    total_products: 25,
    products: [
        {
            sku: 'WH-BT-001',
            name: 'Wireless Headphones',
            price: 99.99,
            position: 1
        },
        {
            sku: 'SP-BT-002',
            name: 'Bluetooth Speaker',
            price: 49.99,
            position: 2
        }
    ]
});

// Search results tracking
window.ddg.productList({
    list_name: 'Search Results',
    list_type: 'search',
    search_term: 'bluetooth headphones',
    total_results: 12,
    products: [/* search results */]
});
```

### `cartUpdate(cartData)`
Track shopping cart modifications.

```javascript
// Add to cart
window.ddg.cartUpdate({
    action: 'add',
    cart_total: 149.98,
    cart_currency: 'EUR',
    cart_items_count: 2,
    cart_items: [
        {
            sku: 'WH-BT-001',
            name: 'Wireless Headphones',
            quantity: 1,
            price: 99.99,
            category: 'Electronics'
        },
        {
            sku: 'SP-BT-002',
            name: 'Bluetooth Speaker',
            quantity: 1,
            price: 49.99,
            category: 'Electronics'
        }
    ]
});

// Remove from cart
window.ddg.cartUpdate({
    action: 'remove',
    cart_total: 99.99,
    cart_currency: 'EUR',
    cart_items_count: 1,
    removed_item: {
        sku: 'SP-BT-002',
        quantity: 1
    }
});

// Update quantity
window.ddg.cartUpdate({
    action: 'update',
    cart_total: 199.98,
    updated_item: {
        sku: 'WH-BT-001',
        old_quantity: 1,
        new_quantity: 2
    }
});
```

### `checkout(checkoutData)`
Track checkout process initiation.

```javascript
window.ddg.checkout({
    checkout_step: 1,
    checkout_step_name: 'shipping_info',
    order_total: 149.98,
    currency: 'EUR',
    shipping_method: 'standard',
    payment_method: 'credit_card',
    items: [
        {
            sku: 'WH-BT-001',
            name: 'Wireless Headphones',
            quantity: 1,
            price: 99.99,
            category: 'Electronics'
        },
        {
            sku: 'SP-BT-002',
            name: 'Bluetooth Speaker',
            quantity: 1,
            price: 49.99,
            category: 'Electronics'
        }
    ],
    customer: {
        type: 'registered',
        email: 'customer@example.com'
    }
});
```

### `purchaseComplete(orderData)`
Track completed purchases and orders.

```javascript
window.ddg.purchaseComplete({
    order_id: 'ORD-2024-001234',
    order_total: 149.98,
    order_subtotal: 149.98,
    order_tax: 23.99,
    order_shipping: 5.99,
    order_discount: 10.00,
    currency: 'EUR',
    payment_method: 'credit_card',
    shipping_method: 'standard',
    customer: {
        email: 'customer@example.com',
        customer_id: 'CUST-789',
        type: 'registered'
    },
    items: [
        {
            sku: 'WH-BT-001',
            name: 'Wireless Headphones',
            quantity: 1,
            unit_price: 99.99,
            total_price: 99.99,
            category: 'Electronics > Audio',
            brand: 'TechBrand'
        },
        {
            sku: 'SP-BT-002',
            name: 'Bluetooth Speaker',
            quantity: 1,
            unit_price: 49.99,
            total_price: 49.99,
            category: 'Electronics > Audio',
            brand: 'TechBrand'
        }
    ],
    coupon_code: 'SAVE10',
    order_date: new Date().toISOString(),
    first_purchase: false
});
```

## User Identification

### `identify(userData)`
Identify and track user information.

```javascript
// Full user identification
window.ddg.identify({
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    customerId: 'CUST-12345',
    phone: '+1234567890',
    dateOfBirth: '1990-01-15',
    gender: 'male',
    location: {
        city: 'Berlin',
        country: 'Germany',
        postalCode: '10115'
    },
    preferences: {
        newsletter: true,
        sms: false,
        language: 'en'
    },
    customerSince: '2022-03-15',
    totalOrders: 12,
    totalSpent: 1299.87,
    loyaltyTier: 'gold'
});

// Simple email identification
window.ddg.identify('customer@example.com');

// Anonymous user with attributes
window.ddg.identify({
    anonymousId: 'anon-uuid-12345',
    sessionId: 'session-67890',
    userAgent: navigator.userAgent,
    referrer: document.referrer
});
```

## Custom Events

### Business-Specific Signals

```javascript
// Loyalty program events
window.ddg.signal('loyalty_points_earned', { points: 50, reason: 'purchase' });
window.ddg.signal('loyalty_tier_change', { from: 'silver', to: 'gold' });

// Engagement events
window.ddg.signal('wishlist_add', { product_sku: 'WH-BT-001' });
window.ddg.signal('review_submitted', { product_sku: 'WH-BT-001', rating: 5 });
window.ddg.signal('price_alert_set', { product_sku: 'WH-BT-001', target_price: 79.99 });

// Marketing events
window.ddg.signal('email_opened', { campaign_id: 'CAMP-001' });
window.ddg.signal('link_clicked', { campaign_id: 'CAMP-001', link_type: 'product' });
window.ddg.signal('unsubscribe', { reason: 'too_frequent' });

// Support events
window.ddg.signal('support_ticket_created', { category: 'shipping', priority: 'low' });
window.ddg.signal('live_chat_started', { department: 'sales' });
```

## Complete Usage Examples

### E-commerce Customer Journey

```javascript
// 1. User visits homepage
window.ddg.track({
    event: 'page_view',
    page: '/',
    title: 'Homepage'
});

// 2. User searches for products
window.ddg.track({
    event: 'search',
    search_term: 'bluetooth headphones',
    search_results: 15
});

// 3. User views category
window.ddg.productList({
    list_name: 'Electronics > Audio',
    list_type: 'category',
    products: [/* product list */]
});

// 4. User views specific product
window.ddg.productBrowse({
    product_name: 'Wireless Headphones',
    product_sku: 'WH-BT-001',
    product_price: 99.99
});

// 5. User adds to cart
window.ddg.cartUpdate({
    action: 'add',
    cart_total: 99.99,
    cart_items: [{ sku: 'WH-BT-001', quantity: 1, price: 99.99 }]
});

// 6. User identifies themselves
window.ddg.identify({
    email: 'customer@example.com',
    firstName: 'John',
    lastName: 'Doe'
});

// 7. User starts checkout
window.ddg.checkout({
    checkout_step: 1,
    order_total: 99.99,
    items: [{ sku: 'WH-BT-001', quantity: 1, price: 99.99 }]
});

// 8. User completes purchase
window.ddg.purchaseComplete({
    order_id: 'ORD-001',
    order_total: 99.99,
    customer: { email: 'customer@example.com' },
    items: [{ sku: 'WH-BT-001', quantity: 1, price: 99.99 }]
});
```

### Newsletter and Marketing Integration

```javascript
// Newsletter signup form
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    const email = e.target.email.value;
    
    window.ddg.identify(email);
    window.ddg.signal('newsletter_signup', {
        source: 'homepage_form',
        preferences: ['weekly_newsletter', 'product_updates']
    });
});

// Email campaign tracking
window.ddg.track({
    event: 'email_campaign_view',
    campaign_id: 'SPRING_SALE_2024',
    utm_source: 'email',
    utm_campaign: 'spring_sale'
});
```

## Integration Notes

### Automatic Initialization
The Dotdigital tracking is automatically initialized via the Shopware Twig template when configuration is available:

```javascript
// This happens automatically if configured in admin
const globalDotdigitalConfig = window.shopware?.dotdigital;
if (globalDotdigitalConfig?.profileId && globalDotdigitalConfig?.regionId) {
    window.ddg.init(globalDotdigitalConfig.regionId, globalDotdigitalConfig.profileId);
}
```

### Error Handling
All methods include built-in error handling and will queue calls if Dotdigital hasn't loaded yet:

```javascript
// This will work even if called before Dotdigital script loads
window.ddg.track({ event: 'early_event' }); // Queued until ready
```

### Privacy and Consent
Ensure you have proper consent before tracking personal data:

```javascript
// Check for consent before identifying users
if (hasUserConsent()) {
    window.ddg.identify(userEmail);
}
```

### Testing and Debugging
Enable console logging to see tracking calls:

```javascript
// All tracking calls are logged to console for debugging
// Look for "Dotdigital [method]:" messages in browser console
```

---

For more information about Dotdigital's tracking capabilities, refer to the official Dotdigital documentation.
