// ===== APP STATE =====
const app = {
    products: [],
    cart: [],
    categories: {},
    currentCategory: 'all',
    currentSort: 'default',
    isLoading: true,
    isCartOpen: false,
    checkoutStep: 1
};

// ===== PRODUCTS DATA =====
const productsData = [
    { id: 1, nombre: "Llavero", categoria: "Llaveros", precio: 1500, imagen: "llaveros.jpg" },
    { id: 2, nombre: "Llavero cruz", categoria: "Llaveros", precio: 1800, imagen: "llavero cruz.jpg" },
    { id: 3, nombre: "Movil osito", categoria: "Movil", precio: 3500, imagen: "moviles osito.jpg" },
    { id: 4, nombre: "Moviles", categoria: "Movil", precio: 3200, imagen: "mowiles.jpeg" },
    { id: 5, nombre: "Moviles", categoria: "Movil", precio: 3200, imagen: "movilkes.jpeg" },
    { id: 6, nombre: "Moviles", categoria: "Movil", precio: 3200, imagen: "mobiles.jpeg" },
    { id: 7, nombre: "Moviles", categoria: "Movil", precio: 3200, imagen: "movilse.jpeg" },
    { id: 8, nombre: "Moviles", categoria: "Movil", precio: 3200, imagen: "molvives.jpeg" },
    { id: 9, nombre: "Moviles", categoria: "Movil", precio: 3200, imagen: "movwiles.jpeg" },
    { id: 10, nombre: "Moviles", categoria: "Movil", precio: 3200, imagen: "mowiless.jpeg" },
    { id: 11, nombre: "Moviles", categoria: "Movil", precio: 3200, imagen: "mowilkes3.jpeg" },
    { id: 12, nombre: "Moviles", categoria: "Movil", precio: 3200, imagen: "moviles22.jpeg" },
    { id: 13, nombre: "Moviles", categoria: "Movil", precio: 3200, imagen: "moviles33.jpeg" },
    { id: 14, nombre: "Mate mini esculturitas", categoria: "Mini esculturitas", precio: 2800, imagen: "mate mini escultura.jpg" },
    { id: 15, nombre: "Mate mini esculturitas", categoria: "Mini esculturitas", precio: 2800, imagen: "mate mini escultutita.jpeg" },
    { id: 16, nombre: "Llavero personalizado", categoria: "Llaveros", precio: 2000, imagen: "pili llavero.jpeg" },
    { id: 17, nombre: "Aritos vitrofusión", categoria: "Bijou", precio: 2500, imagen: "aros en vitrofusion.jpg" },
    { id: 18, nombre: "Conjunto bijou", categoria: "Bijou", precio: 4500, imagen: "conjuntos bijou.jpg" },
    { id: 19, nombre: "Arito + anillo", categoria: "Bijou", precio: 3800, imagen: "conjunto arito y anillo.jpg" },
    { id: 20, nombre: "Bijou", categoria: "Bijou", precio: 2200, imagen: "bijouuuu.jpeg" },
    { id: 21, nombre: "Arito + anillo", categoria: "Bijou", precio: 3800, imagen: "bijouclg.jpeg" },
    { id: 22, nombre: "Plato redondo", categoria: "Platos", precio: 4200, imagen: "plato redondo.jpg" },
    { id: 23, nombre: "Plato cuadrado", categoria: "Platos", precio: 4500, imagen: "plato matecito.jpg" },
    { id: 24, nombre: "Plato Guembe", categoria: "Platos", precio: 4800, imagen: "plato guembe.jpg" },
    { id: 25, nombre: "Platos", categoria: "Platos", precio: 4000, imagen: "img plato1.jpeg" },
    { id: 26, nombre: "Platos", categoria: "Platos", precio: 4000, imagen: "img plato2.jpeg" },
    { id: 27, nombre: "Platos", categoria: "Platos", precio: 4000, imagen: "img plato3.jpeg" },
    { id: 28, nombre: "Platos", categoria: "Platos", precio: 4000, imagen: "img plato4.jpeg" },
    { id: 29, nombre: "Platos", categoria: "Platos", precio: 4000, imagen: "img plato5.jpeg" },
    { id: 30, nombre: "Platos", categoria: "Platos", precio: 4000, imagen: "img plato6.jpeg" },
    { id: 31, nombre: "Porta espiral", categoria: "Portadores", precio: 3500, imagen: "porta espiral.jpg" },
    { id: 32, nombre: "Mate mini esculturita", categoria: "Mini esculturitas", precio: 2800, imagen: "esculturitamate.jpeg" },
    { id: 33, nombre: "Porta espiral", categoria: "Portadores", precio: 3500, imagen: "porta espirales1.jpeg" },
    { id: 34, nombre: "Porta espiral", categoria: "Portadores", precio: 3500, imagen: "porta espirales2.jpeg" },
    { id: 35, nombre: "Porta espiral", categoria: "Portadores", precio: 3500, imagen: "porta espirales3.jpeg" },
    { id: 36, nombre: "Porta espiral", categoria: "Portadores", precio: 3500, imagen: "porta espirales4.jpeg" },
    { id: 37, nombre: "Porta espiral", categoria: "Portadores", precio: 3500, imagen: "porta espirales5.jpeg" },
    { id: 38, nombre: "Porta espiral", categoria: "Portadores", precio: 3500, imagen: "porta espirales6.jpeg" },
    { id: 39, nombre: "Porta espiral", categoria: "Portadores", precio: 3500, imagen: "porta espirales7.jpeg" },
    { id: 40, nombre: "Porta espiral", categoria: "Portadores", precio: 3500, imagen: "porta espirales8.jpeg" },
    { id: 41, nombre: "Porta espiral", categoria: "Portadores", precio: 3500, imagen: "porta espirales9.jpeg" },
    { id: 42, nombre: "Bacha para baño", categoria: "Decoración", precio: 8500, imagen: "bacha apra baño.jpg" },
    { id: 43, nombre: "Fuente circular enrejada", categoria: "Fuente Y Posatorta", precio: 5500, imagen: "fuente circular enrejada.jpg" },
    { id: 44, nombre: "Centro de mesa", categoria: "Decoración", precio: 4500, imagen: "centro de mesa.jpg" },
    { id: 45, nombre: "Posatorta", categoria: "Fuente Y Posatorta", precio: 3200, imagen: "fuente enrejada1.jpeg" },
    { id: 46, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada2.jpeg" },
    { id: 47, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada3.jpeg" },
    { id: 48, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada4.jpeg" },
    { id: 49, nombre: "Posatorta", categoria: "Fuente Y Posatorta", precio: 3200, imagen: "fuente enrejada5.jpeg" },
    { id: 50, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada6.jpeg" },
    { id: 51, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada7.jpeg" },
    { id: 52, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada8.jpeg" },
    { id: 53, nombre: "Posatorta", categoria: "Fuente Y Posatorta", precio: 3200, imagen: "fuente enrejada9.jpeg" },
    { id: 54, nombre: "Posatorta", categoria: "Fuente Y Posatorta", precio: 3200, imagen: "fuente enrejada10.jpeg" },
    { id: 55, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada11.jpeg" },
    { id: 56, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada12.jpeg" },
    { id: 57, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada13.jpeg" },
    { id: 58, nombre: "Posatorta", categoria: "Fuente Y Posatorta", precio: 3200, imagen: "fuente enrejada14.jpeg" },
    { id: 59, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada15.jpeg" },
    { id: 60, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada16.jpeg" },
    { id: 61, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada17.jpeg" },
    { id: 62, nombre: "Fuentes", categoria: "Fuente Y Posatorta", precio: 3500, imagen: "fuente enrejada18.jpeg" },
    { id: 63, nombre: "Porta Sahumerios", categoria: "Porta Sahumerios", precio: 2500, imagen: "porta sahumerios1.jpeg" },
    { id: 64, nombre: "Porta Sahumerios", categoria: "Porta Sahumerios", precio: 2500, imagen: "porta sahumerios2.jpeg" },
    { id: 65, nombre: "Porta Sahumerios", categoria: "Porta Sahumerios", precio: 2500, imagen: "porta sahumerios3.jpeg" },
    { id: 66, nombre: "Porta Sahumerios", categoria: "Porta Sahumerios", precio: 2500, imagen: "porta sahumerios4.jpeg" },
    { id: 67, nombre: "Porta Sahumerios", categoria: "Porta Sahumerios", precio: 2500, imagen: "porta sahumerios5.jpeg" },
    { id: 68, nombre: "Porta Sahumerios", categoria: "Porta Sahumerios", precio: 2500, imagen: "porta sahumerios6.jpeg" },
    { id: 69, nombre: "Porta Maceta", categoria: "Diseños", precio: 3800, imagen: "porta mecetas o fanal.jpg" },
    { id: 70, nombre: "Escarapelas", categoria: "Diseños", precio: 1500, imagen: "escarapelas.jpg" },
    { id: 71, nombre: "Tutores", categoria: "Diseños", precio: 2200, imagen: "padres.jpeg" },
    { id: 72, nombre: "Tutores", categoria: "Diseños", precio: 2200, imagen: "tutores.jpeg" }
];

// ===== DOM ELEMENTS =====
const elements = {
    loadingScreen: document.getElementById('loading-screen'),
    cartBtn: document.getElementById('cart-btn'),
    cartCount: document.getElementById('cart-count'),
    cartSidebar: document.getElementById('cart-sidebar'),
    cartClose: document.getElementById('cart-close'),
    cartItems: document.getElementById('cart-items'),
    totalAmount: document.getElementById('total-amount'),
    checkoutBtn: document.getElementById('checkout-btn'),
    checkoutModal: document.getElementById('checkout-modal'),
    checkoutClose: document.getElementById('checkout-close'),
    checkoutForm: document.getElementById('checkout-form'),
    checkoutBack: document.getElementById('checkout-back'),
    checkoutNext: document.getElementById('checkout-next'),
    checkoutPay: document.getElementById('checkout-pay'),
    successModal: document.getElementById('success-modal'),
    successClose: document.getElementById('success-close'),
    lightbox: document.getElementById('lightbox'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxClose: document.getElementById('lightbox-close'),
    mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
    navMenu: document.getElementById('nav-menu'),
    categoryFilter: document.getElementById('category-filter'),
    sortFilter: document.getElementById('sort-filter'),
    productsGrid: document.getElementById('products-grid'),
    categoriesGrid: document.getElementById('categories-grid'),
    contactForm: document.getElementById('contact-form'),
    orderSummary: document.getElementById('order-summary')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load cart from localStorage
    loadCartFromStorage();
    
    // Process products data
    processProductsData();
    
    // Render initial content
    renderCategories();
    renderProducts();
    updateCartUI();
    
    // Setup event listeners
    setupEventListeners();
    
    // Hide loading screen
    setTimeout(() => {
        elements.loadingScreen.classList.add('hidden');
        app.isLoading = false;
    }, 1000);
}

function processProductsData() {
    app.products = productsData.map(product => ({
        ...product,
        quantity: 0
    }));
    
    // Group products by category
    app.categories = {};
    app.products.forEach(product => {
        if (!app.categories[product.categoria]) {
            app.categories[product.categoria] = [];
        }
        app.categories[product.categoria].push(product);
    });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Cart toggle
    elements.cartBtn.addEventListener('click', toggleCart);
    elements.cartClose.addEventListener('click', closeCart);
    
    // Mobile menu
    elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Filters
    elements.categoryFilter.addEventListener('change', handleCategoryFilter);
    elements.sortFilter.addEventListener('change', handleSortFilter);
    
    // Checkout
    elements.checkoutBtn.addEventListener('click', openCheckout);
    elements.checkoutClose.addEventListener('click', closeCheckout);
    elements.checkoutBack.addEventListener('click', handleCheckoutBack);
    elements.checkoutNext.addEventListener('click', handleCheckoutNext);
    elements.checkoutPay.addEventListener('click', handlePayment);
    elements.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    
    // Success modal
    elements.successClose.addEventListener('click', closeSuccessModal);
    
    // Lightbox
    elements.lightboxClose.addEventListener('click', closeLightbox);
    elements.lightbox.addEventListener('click', (e) => {
        if (e.target === elements.lightbox) {
            closeLightbox();
        }
    });
    
    // Contact form
    elements.contactForm.addEventListener('submit', handleContactForm);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Close modals on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
            closeCheckout();
            closeLightbox();
        }
    });
}

// ===== CART FUNCTIONS =====
function toggleCart() {
    app.isCartOpen = !app.isCartOpen;
    elements.cartSidebar.classList.toggle('open', app.isCartOpen);
}

function closeCart() {
    app.isCartOpen = false;
    elements.cartSidebar.classList.remove('open');
}

function addToCart(productId) {
    const product = app.products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = app.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        app.cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showNotification('Producto agregado al carrito', 'success');
}

function removeFromCart(productId) {
    app.cart = app.cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

function updateQuantity(productId, newQuantity) {
    const item = app.cart.find(item => item.id === productId);
    if (!item) return;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else {
        item.quantity = newQuantity;
        updateCartUI();
        saveCartToStorage();
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = app.cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
    
    // Update cart items
    if (app.cart.length === 0) {
        elements.cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        elements.cartItems.innerHTML = app.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.imagen}" alt="${item.nombre}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.nombre}</div>
                    <div class="cart-item-category">${item.categoria}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="cart-item-price">$${(item.precio * item.quantity).toLocaleString()}</div>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = app.cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    elements.totalAmount.textContent = `$${total.toLocaleString()}`;
}

function saveCartToStorage() {
    localStorage.setItem('arete-cart', JSON.stringify(app.cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('arete-cart');
    if (savedCart) {
        app.cart = JSON.parse(savedCart);
    }
}

// ===== PRODUCT FUNCTIONS =====
function renderCategories() {
    const categories = Object.keys(app.categories);
    
    // Populate category filter
    elements.categoryFilter.innerHTML = `
        <option value="all">Todas las categorías</option>
        ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
    `;
    
    // Render category cards
    elements.categoriesGrid.innerHTML = categories.map(category => `
        <div class="category-card" data-category="${category}" onclick="filterByCategory('${category}')">
            <div class="category-icon">
                <i class="fas fa-palette"></i>
            </div>
            <div class="category-name">${category}</div>
            <div class="category-count">${app.categories[category].length} productos</div>
        </div>
    `).join('');
}

function renderProducts() {
    let filteredProducts = getFilteredProducts();
    
    elements.productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.categoria}">
            <div class="product-image" onclick="openLightbox('${product.imagen}')">
                <img src="${product.imagen}" alt="${product.nombre}" loading="lazy">
            </div>
            <div class="product-content">
                <div class="product-category">${product.categoria}</div>
                <h3 class="product-name">${product.nombre}</h3>
                <div class="product-actions">
                    <div class="product-price">$${product.precio.toLocaleString()}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})" 
                            ${app.cart.find(item => item.id === product.id) ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i>
                        ${app.cart.find(item => item.id === product.id) ? 'En el carrito' : 'Agregar'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getFilteredProducts() {
    let filtered = [...app.products];
    
    // Filter by category
    if (app.currentCategory !== 'all') {
        filtered = filtered.filter(product => product.categoria === app.currentCategory);
    }
    
    // Sort products
    switch (app.currentSort) {
        case 'name-asc':
            filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
    }
    
    return filtered;
}

function filterByCategory(category) {
    app.currentCategory = category;
    elements.categoryFilter.value = category;
    
    // Update active category card
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.toggle('active', card.dataset.category === category);
    });
    
    renderProducts();
}

function handleCategoryFilter(e) {
    app.currentCategory = e.target.value;
    
    // Update active category card
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.toggle('active', card.dataset.category === app.currentCategory);
    });
    
    renderProducts();
}

function handleSortFilter(e) {
    app.currentSort = e.target.value;
    renderProducts();
}

// ===== CHECKOUT FUNCTIONS =====
function openCheckout() {
    if (app.cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }
    
    app.checkoutStep = 1;
    updateCheckoutStep();
    elements.checkoutModal.classList.add('open');
}

function closeCheckout() {
    elements.checkoutModal.classList.remove('open');
    app.checkoutStep = 1;
}

function updateCheckoutStep() {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step-${app.checkoutStep}`).classList.add('active');
    
    // Update buttons
    elements.checkoutBack.style.display = app.checkoutStep > 1 ? 'block' : 'none';
    elements.checkoutNext.style.display = app.checkoutStep < 3 ? 'block' : 'none';
    elements.checkoutPay.style.display = app.checkoutStep === 3 ? 'block' : 'none';
    
    // Update order summary if on step 3
    if (app.checkoutStep === 3) {
        updateOrderSummary();
    }
}

function handleCheckoutBack() {
    if (app.checkoutStep > 1) {
        app.checkoutStep--;
        updateCheckoutStep();
    }
}

function handleCheckoutNext() {
    if (app.checkoutStep === 1) {
        // Validate step 1
        const form = elements.checkoutForm;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        app.checkoutStep++;
    } else if (app.checkoutStep === 2) {
        app.checkoutStep++;
    }
    updateCheckoutStep();
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
}

function updateOrderSummary() {
    const total = app.cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    elements.orderSummary.innerHTML = `
        ${app.cart.map(item => `
            <div class="order-item">
                <span>${item.nombre} x${item.quantity}</span>
                <span>$${(item.precio * item.quantity).toLocaleString()}</span>
            </div>
        `).join('')}
        <div class="order-item">
            <span>Total</span>
            <span>$${total.toLocaleString()}</span>
        </div>
        <div class="order-item">
            <span>Método de pago</span>
            <span>${paymentMethod === 'mercadopago' ? 'Mercado Pago' : 'Efectivo'}</span>
        </div>
    `;
}

async function handlePayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (paymentMethod === 'mercadopago') {
        await processMercadoPagoPayment();
    } else {
        await processCashPayment();
    }
}

async function processMercadoPagoPayment() {
    try {
        const orderData = {
            items: app.cart.map(item => ({
                id: item.id,
                title: item.nombre,
                quantity: item.quantity,
                unit_price: item.precio,
                currency_id: 'ARS'
            })),
            payer: {
                name: document.getElementById('checkout-name').value,
                email: document.getElementById('checkout-email').value,
                phone: document.getElementById('checkout-phone').value
            }
        };
        
        // Call backend to create Mercado Pago preference
        const response = await fetch('/api/mercadopago/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        
        if (data.init_point) {
            // Redirect to Mercado Pago
            window.location.href = data.init_point;
        } else {
            throw new Error('Error al generar preferencia de pago');
        }
    } catch (error) {
        console.error('Payment error:', error);
        showNotification('Error al procesar el pago. Intenta nuevamente.', 'error');
    }
}

async function processCashPayment() {
    try {
        const orderData = {
            items: app.cart.map(item => ({
                id: item.id,
                title: item.nombre,
                quantity: item.quantity,
                unit_price: item.precio
            })),
            customer: {
                name: document.getElementById('checkout-name').value,
                email: document.getElementById('checkout-email').value,
                phone: document.getElementById('checkout-phone').value,
                address: document.getElementById('checkout-address').value
            },
            payment_method: 'efectivo'
        };
        
        // Send order to backend
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            showSuccessMessage('¡Pedido realizado! Te contactaremos para coordinar el pago y envío.');
            clearCart();
            closeCheckout();
        } else {
            throw new Error('Error al procesar el pedido');
        }
    } catch (error) {
        console.error('Order error:', error);
        showNotification('Error al procesar el pedido. Intenta nuevamente.', 'error');
    }
}

function clearCart() {
    app.cart = [];
    updateCartUI();
    saveCartToStorage();
}

// ===== UI FUNCTIONS =====
function toggleMobileMenu() {
    elements.navMenu.classList.toggle('open');
}

function openLightbox(imageSrc) {
    elements.lightboxImg.src = imageSrc;
    elements.lightbox.classList.add('open');
}

function closeLightbox() {
    elements.lightbox.classList.remove('open');
}

function showSuccessMessage(message) {
    document.getElementById('success-message').textContent = message;
    elements.successModal.classList.add('open');
}

function closeSuccessModal() {
    elements.successModal.classList.remove('open');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#e53e3e' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== CONTACT FORM =====
async function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        message: document.getElementById('contact-message').value
    };
    
    try {
        // Send contact form data
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showNotification('Mensaje enviado correctamente', 'success');
            elements.contactForm.reset();
        } else {
            throw new Error('Error al enviar mensaje');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Error al enviar el mensaje. Intenta nuevamente.', 'error');
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add CSS for notifications
const notificationStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
