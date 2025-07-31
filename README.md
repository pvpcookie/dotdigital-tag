# Dotdigital Tracking Integration - Complete Solution

This repository contains a comprehensive Dotdigital tracking implementation with advanced event queuing, real-time console display, and interactive testing capabilities.

## 🎯 Quick Start with Node.js

### Prerequisites
- Node.js installed on your system
- A web browser for testing

### Local Development Server
```bash
# Navigate to the project directory
cd /Users/shaunhogan/Work/tag-example

# Start a simple HTTP server using Node.js
npx http-server -p 8080 -c-1

# Or use Python if you prefer
python3 -m http.server 8080

# Or use PHP if available
php -S localhost:8080
```

### Access the Test Page
Open your browser and navigate to:
- **Main Test Page**: [http://localhost:8080/index.html](http://localhost:8080/index.html)
- **Live Console Demo**: Perfect for testing event queuing before/after script initialization

## 🧪 Interactive Testing Features

### 🔄 Event Queuing System
The test page demonstrates advanced event queuing capabilities:

1. **Pre-Script Testing**: Send events before enabling the script to see them queued
2. **Script Toggle**: Use the switch to enable/disable the Dotdigital script
3. **Live Processing**: Watch queued events get processed when script is enabled
4. **Real-time Console**: See all events and system messages in the browser

### 🎛️ Test Page Features

#### Configuration Panel
- **Script Toggle**: Enable/disable Dotdigital script to test queuing
- **Region Selection**: Choose from Regions 1, 2, or 3
- **Profile ID Input**: Enter your Dotdigital profile identifier
- **Live Status**: Real-time display of script status, queue length, and ready state

#### Live Console Display
- **Color-coded Messages**: Different colors for different event types
- **Timestamped Logs**: Every event includes precise timing
- **Queue Monitoring**: See events being queued and processed
- **System Messages**: Track script loading and initialization

#### Comprehensive Event Testing
- **Core Tracking**: Page views, custom events, form submissions
- **E-commerce Flow**: Product browsing, cart updates, checkout, purchase completion
- **User Identification**: Email identification, full profiles, anonymous users
- **Signal Methods**: Product signals, checkout amounts, newsletters, coupons
- **Custom Events**: Loyalty points, wishlist, reviews, support tickets
5. Monitor the browser console and network tab to see tracking calls

## Prerequisites

- Valid Dotdigital account with Profile ID
- Knowledge of your Dotdigital region
- Browser with developer tools for monitoring tracking calls

## Integration Notes

The test page loads the actual Dotdigital tag script from:
`../Resources/app/storefront/src/dotdigital-tag.js`

This ensures you're testing with the same script that's used in production on your Shopware storefront.

## Troubleshooting

If tracking calls aren't working:
1. Check the browser console for JavaScript errors
2. Verify your Profile ID and region are correct
3. Ensure the Dotdigital script loaded successfully
4. Check the Network tab for failed requests

For more detailed implementation help, see the main app documentation in the parent directory.

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
