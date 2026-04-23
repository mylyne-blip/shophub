// Sample Products Database
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        currentprice: 3000,
        oldPrice: 4000,
        rating: 4.5,
        description: "High-quality wireless headphones with noise cancellation",
        badge: "20% OFF",
image: "images/jbl.png"
    },
    {
        id: 2,
        name: "mercedez",
        category: "automotive",
        currentprice: 7.5M,
        oldPrice: 12.0M,
        rating: 4.8,
        description: "a mordern combination of luxury and power cruise in style",
        badge: "30% OFF",
image: "images/mercedez.png"
    },
    {
        id: 3,
        name: "engine part",
        category: "automotive",
        currentprice: 50000,
        oldPrice: 75000,
        rating: 4.2,
        description: "need a change of engine look no further with the twin turbo 12 horsepower engine",
        badge: "NEW",
image: "images/engine.png"
    },
    {
        id: 4,
        name: "watch",
        category: "fashion",
        currentprice: 799,
        oldPrice: 999,
        rating: 4.6,
        description: "Stylish watch to fit every wear you have",
        badge: "SALE",
image: "images/watch.png"
    },
    {
        id: 5,
        name: "microwave",
        category: "home",
        currentprice: 5999,
        oldPrice: 8499,
        rating: 4.4,
        description: "an upgraded heater with counter heats your food to make it warm",
        badge: "25% OFF",
image: "images/microwave.png"
    },
    {
        id: 6,
        name: "cricket all in one",
        category: "sports",
        currentprice: 10999,
        oldPrice: 12999,
        rating: 4.3,
        description: "sports need proper gear an all in one is not just proper but affordable",
        badge: "TRENDING",
image: "images/cricket.png"
    },
    {
        id: 7,
        name: "mordern television",
        category: "electronics",
        currentprice: 11500,
        oldPrice: 15500,
        rating: 4.7,
        description: "Full-frame wide camera with 4K video",
        badge: "HOT",
image: "images/tv.png"
    },
    {
        id: 8,
        name: "sports wear",
        category: "sports",
        currentprice: 4999,
        oldPrice: 7499,
        rating: 4.5,
        description: "Warm and waterproof sports wear keeping you free from discomfort",
        badge: "WINTER SALE",
image: "images/sportswear.png"
    },
    {
        id: 9,
        name: "smart phone",
        category: "electronics",
        currentprice: 15999,
        oldPrice: 28999,
        rating: 4.4,
        description: "the latest and upgraded standard smartphone with modern day operations",
        badge: "15% OFF",
image: "images/phone 2.png"
    },
    {
        id: 10,
        name: "sports shoes",
        category: "sports",
       currentprice: 2499,
        oldPrice: 3499,
        rating: 4.2,
        description: "the perfect shoes for a tournament",
        badge: "NEW",
image: "images/sports"
    },
    {
        id: 11,
        name: "fridge",
        category: "electronics",
        currentprice: 18299,
        oldPrice: 41899,
        rating: 4.1,
        description: "a double sided fridge ",
        badge: "DEAL",
image: "images/fridge.png"
    },
    {
        id: 12,
        name: "woofer",
        category: "sports",
        currentprice: 3999,
        oldPrice: 10999,
        rating: 4.6,
        description: "Lightweight running shoes with cushioning",
        badge: "33% OFF",
image: "images/uffer.png"
    }
];

let currentFilter = 'all';
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    loadCart();
});

// Display products in grid
function displayProducts(productsToDisplay) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/250x200/E0E0E0/999999?text=No+Image'">
            <span class="product-badge">${product.badge}</span>
        </div>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">
                ${generateStars(product.rating)}
                <span style="font-size: 12px; color: #666;">(${product.rating})</span>
            </div>
            <div class="product-footer">
                <div>
                    <span class="price">₹${product.price.toLocaleString()}</span>
                    <span class="old-price">₹${product.oldPrice.toLocaleString()}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add</button>
            </div>
        </div>
    `;
    return card;
}

// Generate star rating
function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += '<span class="star"><i class="fas fa-star"></i></span>';
        } else if (i < rating) {
            stars += '<span class="star"><i class="fas fa-star-half-alt"></i></span>';
        } else {
            stars += '<span class="star"><i class="far fa-star"></i></span>';
        }
    }
    return stars;
}

// Filter products by category
function filterByCategory(category, evt) {
    currentFilter = category;

    // Update filter button styles
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    if (evt && (evt.target.classList.contains('filter-btn') || evt.target.classList.contains('category-card'))) {
        evt.target.classList.add('active');
    } else if (evt && evt.target.closest('.filter-btn')) {
        evt.target.closest('.filter-btn').classList.add('active');
    }

    // Filter and display products
    let filtered = products;
    if (category !== 'all') {
        filtered = products.filter(p => p.category === category);
    }
    displayProducts(filtered);
}

// Search products
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
        displayProducts(filtered);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    showCartNotification();
}



// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show cart notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = '✓ Added to cart!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles to document
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

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add keyboard shortcut for search focus
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && e.target === document.body && searchInput) {
        searchInput.focus();
    }
});
