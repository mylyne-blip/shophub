// Categories Page Specific Functionality
let currentFilter = 'all';

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    
    if (productsGrid) {
        displayProducts(products);
    }
    
    // Setup search functionality if searchInput exists
    const searchInput = document.getElementById('searchInput');
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
    
    loadCart();
});

// Display products in grid
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found</p>';
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
function filterByCategory(category, event) {
    if (event) {
        event.preventDefault();
    }
    
    currentFilter = category;

    // Update filter button styles
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find the clicked button and add active class
    if (event && event.target.classList.contains('filter-btn')) {
        event.target.classList.add('active');
    } else if (event && event.target.closest('.filter-btn')) {
        event.target.closest('.filter-btn').classList.add('active');
    }

    // Filter and display products
    let filtered = products;
    if (category !== 'all') {
        filtered = products.filter(p => p.category === category);
    }
    displayProducts(filtered);
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
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

// Show cart notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    notification.textContent = '✓ Added to cart!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
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

// Add animation styles if not already present
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

    .product-image {
        position: relative;
        overflow: hidden;
        height: 200px;
        background-color: #f5f5f5;
    }

    .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .product-card:hover .product-image img {
        transform: scale(1.1);
    }

    .product-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: var(--primary-color, #FF6B35);
        color: white;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
    }

    .product-info {
        padding: 15px;
    }

    .product-category {
        color: var(--text-light, #666);
        font-size: 12px;
        text-transform: capitalize;
        margin-bottom: 5px;
    }

    .product-name {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        color: var(--text-dark, #333);
    }

    .product-description {
        font-size: 13px;
        color: var(--text-light, #666);
        margin-bottom: 10px;
        line-height: 1.4;
    }

    .product-rating {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
    }

    .star {
        color: var(--primary-color, #FF6B35);
        font-size: 12px;
    }

    .product-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .price {
        font-size: 18px;
        font-weight: 700;
        color: var(--primary-color, #FF6B35);
        margin-right: 10px;
    }

    .old-price {
        font-size: 14px;
        color: var(--text-light, #666);
        text-decoration: line-through;
    }

    .add-to-cart-btn {
        background-color: var(--primary-color, #FF6B35);
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 13px;
        transition: all 0.3s ease;
    }

    .add-to-cart-btn:hover {
        background-color: #E85A25;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
    }

    .add-to-cart-btn:active {
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
