// Shared products data (same as main script.js)
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 4500,
        oldPrice: 6500,
        rating: 4.5,
        description: "High-quality wireless headphones with noise cancellation",
        badge: "20% OFF",
image: "images/jbl.png"
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        category: "electronics",
        price: 8999,
        oldPrice: 12999,
        rating: 4.8,
        description: "Advanced fitness tracking and notifications",
        badge: "30% OFF",
image: "#"
    },
    {
        id: 3,
        name: "Premium Cotton T-Shirt",
        category: "fashion",
        price: 899,
        oldPrice: 1299,
        rating: 4.2,
        description: "Comfortable and breathable cotton t-shirt",
        badge: "NEW",
image: "#"
    },
    {
        id: 4,
        name: "Designer Casual Sneakers",
        category: "fashion",
        price: 3499,
        oldPrice: 4999,
        rating: 4.6,
        description: "Stylish sneakers perfect for everyday wear",
        badge: "SALE",
image: "#"
    },
    {
        id: 5,
        name: "Stainless Steel Cooking Set",
        category: "home",
        price: 5999,
        oldPrice: 8499,
        rating: 4.4,
        description: "12-piece professional cooking and baking set",
        badge: "25% OFF",
        image: "https://via.placeholder.com/250x200/FF6B35/FFFFFF?text=Cookware"
    },
    {
        id: 6,
        name: "Modern Wall Clock",
        category: "home",
        price: 1299,
        oldPrice: 1899,
        rating: 4.3,
        description: "Stylish wall clock to complement your home décor",
        badge: "TRENDING",
        image: "https://via.placeholder.com/250x200/004E89/FFFFFF?text=Wall+Clock"
    },
    {
        id: 7,
        name: "Professional Camera",
        category: "electronics",
        price: 45000,
        oldPrice: 55000,
        rating: 4.7,
        description: "Full-frame mirrorless camera with 4K video",
        badge: "HOT",
        image: "https://via.placeholder.com/250x200/FF6B35/FFFFFF?text=Camera"
    },
    {
        id: 8,
        name: "Winter Jacket",
        category: "fashion",
        price: 4999,
        oldPrice: 7499,
        rating: 4.5,
        description: "Warm and waterproof winter jacket",
        badge: "WINTER SALE",
        image: "https://via.placeholder.com/250x200/004E89/FFFFFF?text=Jacket"
    },
    {
        id: 9,
        name: "washing mashine",
        category: "electronics",
        price: 1999,
        oldPrice: 2999,
        rating: 4.4,
        description: "20000mAh fast charging power bank",
        badge: "15% OFF",
        image: "images/washing machine"
    },
    {
        id: 10,
        name: "Comfortable Bedsheet Set",
        category: "home",
        price: 2499,
        oldPrice: 3499,
        rating: 4.2,
        description: "Soft Egyptian cotton bedsheet set",
        badge: "NEW",
        image: "https://via.placeholder.com/250x200/004E89/FFFFFF?text=Bedsheet"
    },
    {
        id: 11,
        name: "Yoga Mat",
        category: "sports",
        price: 1299,
        oldPrice: 1899,
        rating: 4.1,
        description: "Non-slip, eco-friendly yoga mat",
        badge: "DEAL",
        image: "https://via.placeholder.com/250x200/FF6B35/FFFFFF?text=YogaMat"
    },
    {
        id: 12,
        name: "Running Shoes",
        category: "sports",
        price: 3999,
        oldPrice: 5999,
        rating: 4.6,
        description: "Lightweight running shoes with cushioning",
        badge: "33% OFF",
        image: "https://via.placeholder.com/250x200/004E89/FFFFFF?text=Running+Shoes"
    }
];

let cart = [];

// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderCart();
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Render cart
function renderCart() {
    const cartContent = document.getElementById('cartContent');

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your Cart is Empty</h2>
                <p>Add some items to your cart and come back here to checkout!</p>
                <a href="../index.html" class="back-to-shopping">Continue Shopping</a>
            </div>
        `;
        return;
    }

    let cartHTML = '<div class="cart-container"><div class="cart-items">';

    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100/E0E0E0/999999?text=No+Image'">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">−</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });

    cartHTML += '</div><div class="cart-summary">';

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = subtotal > 5000 ? 0 : 99;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shippingCost + tax;

    cartHTML += `
        <h3 style="margin-bottom: 20px;">Order Summary</h3>
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>₹${subtotal.toLocaleString()}</span>
        </div>
        <div class="summary-row">
            <span>Shipping:</span>
            <span>${shippingCost === 0 ? 'FREE' : '₹' + shippingCost}</span>
        </div>
        <div class="summary-row">
            <span>Tax (5%):</span>
            <span>₹${tax.toLocaleString()}</span>
        </div>
        <div class="summary-row total">
            <span>Total:</span>
            <span>₹${total.toLocaleString()}</span>
        </div>
        <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
        <a href="../index.html" class="continue-shopping-btn">Continue Shopping</a>
    </div></div>
    `;

    cartContent.innerHTML = cartHTML;
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);

    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        renderCart();
    }
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        saveCart();
        renderCart();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
            saveCart();
            renderCart();
        } else {
            removeFromCart(productId);
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    showNotification('Item removed from cart');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Thank you for your order! This is a demo, so the order was not actually processed.');
    cart = [];
    saveCart();
    renderCart();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #FF6B35;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
