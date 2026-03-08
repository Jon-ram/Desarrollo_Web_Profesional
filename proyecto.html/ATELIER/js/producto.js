// js/producto.js

// ===== ESTADO GLOBAL =====
const state = {
    productId: null,
    product: null,
    allProducts: [],
    selectedSize: null,
    quantity: 1,
    isWishlist: false,
    currentImage: null
};

// ===== ELEMENTOS DOM =====
const elements = {
    loading: document.getElementById('loadingState'),
    error: document.getElementById('errorState'),
    container: document.getElementById('productContainer'),
    breadcrumb: document.getElementById('breadcrumb-product')
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
});

/**
 * Obtiene ID de producto de la URL
 */
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

/**
 * Carga el producto
 */
async function loadProduct() {
    try {
        const productId = getProductIdFromUrl();
        
        if (!productId) {
            showError();
            return;
        }
        
        state.productId = productId;
        
        // Cargar todos los productos
        const response = await fetch('../data/productos.json');
        const data = await response.json();
        
        state.allProducts = data.productos;
        
        // Encontrar producto específico
        state.product = state.allProducts.find(p => p.id === productId);
        
        if (!state.product) {
            showError();
            return;
        }
        
        // Renderizar producto
        renderProduct();
        
        // Cargar productos relacionados
        loadRelatedProducts();
        
        // Ocultar loading, mostrar contenido
        elements.loading.classList.add('hidden');
        elements.container.classList.remove('hidden');
        
        // Actualizar título de página
        document.title = `${state.product.nombre} | ATELIER`;
        
    } catch (error) {
        console.error('Error al cargar producto:', error);
        showError();
    }
}

/**
 * Muestra estado de error
 */
function showError() {
    elements.loading.classList.add('hidden');
    elements.error.classList.remove('hidden');
}

/**
 * Renderiza el producto usando el template
 */
function renderProduct() {
    const template = document.getElementById('productTemplate');
    const content = template.content.cloneNode(true);
    
    // Limpiar y agregar contenido
    elements.container.innerHTML = '';
    elements.container.appendChild(content);
    
    // Actualizar breadcrumb
    if (elements.breadcrumb) {
        elements.breadcrumb.textContent = state.product.nombre;
    }
    
    // Configurar todos los elementos
    setupProductInfo();
    setupGallery();
    setupSizeSelector();
    setupQuantityControls();
    setupTabs();
    setupWishlist();
    setupButtons();
}

/**
 * Configura información básica del producto
 */
function setupProductInfo() {
    const product = state.product;
    
    // Categoría y código
    document.getElementById('productCategory').textContent = capitalize(product.categoria);
    document.getElementById('productCode').textContent = `• Código: ATL-${product.id.toString().padStart(3, '0')}`;
    document.getElementById('productName').textContent = product.nombre;
    document.getElementById('productDescription').textContent = product.descripcion;
    
    // Precios
    const currentPrice = document.getElementById('currentPrice');
    const originalPrice = document.getElementById('originalPrice');
    const discountBadge = document.getElementById('discountBadge');
    
    currentPrice.textContent = `$${product.precio}`;
    
    if (product.en_oferta && product.precio_original) {
        originalPrice.textContent = `$${product.precio_original}`;
        const discount = Math.round((1 - product.precio / product.precio_original) * 100);
        discountBadge.textContent = `-${discount}%`;
        discountBadge.classList.remove('hidden');
    } else {
        originalPrice.classList.add('hidden');
        discountBadge.classList.add('hidden');
    }
    
    // Valoración
    const rating = product.valoracion || 4.5;
    const reviews = product.reseñas || 0;
    
    document.getElementById('ratingStars').innerHTML = generateStars(rating);
    document.getElementById('ratingText').textContent = `${rating} (${reviews} reseñas)`;
    document.getElementById('averageRating').textContent = rating;
    document.getElementById('reviewStars').innerHTML = generateStars(rating);
    document.getElementById('reviewCount').textContent = `Basado en ${reviews} reseñas`;
    
    // Stock
    const stockStatus = document.getElementById('stockStatus');
    const stockInfo = document.getElementById('stockInfo');
    
    if (product.stock > 0) {
        if (product.stock < 5) {
            stockStatus.className = 'stock-status low-stock';
            stockStatus.innerHTML = `
                <span class="material-symbols-outlined">warning</span>
                <span>¡Últimas ${product.stock} unidades!</span>
            `;
            stockInfo.innerHTML = `Solo quedan <strong>${product.stock}</strong> unidades disponibles`;
        } else {
            stockStatus.className = 'stock-status in-stock';
            stockStatus.innerHTML = `
                <span class="material-symbols-outlined">check_circle</span>
                <span>En stock</span>
            `;
            stockInfo.innerHTML = `Disponibles: <strong>${product.stock}</strong> unidades`;
        }
        
        // Habilitar botones
        document.getElementById('addToCartBtn').disabled = false;
        document.getElementById('buyNowBtn').disabled = false;
        document.getElementById('quantity').max = Math.min(product.stock, 10);
    } else {
        stockStatus.className = 'stock-status out-of-stock';
        stockStatus.innerHTML = `
            <span class="material-symbols-outlined">cancel</span>
            <span>Agotado</span>
        `;
        stockInfo.textContent = 'Producto agotado';
        
        // Deshabilitar botones
        document.getElementById('addToCartBtn').disabled = true;
        document.getElementById('buyNowBtn').disabled = true;
        document.getElementById('quantity').disabled = true;
    }
    
    // Características
    const featuresList = document.getElementById('featuresList');
    const features = [
        `Material: ${product.material || 'Algodón y poliéster'}`,
        'Corte: Ajustado en pecho, fluido en falda',
        'Largo: Mid-calf (65cm desde cintura)',
        'Forro interior de algodón transpirable'
    ];
    
    featuresList.innerHTML = features.map(f => `
        <li>
            <span class="material-symbols-outlined">check</span>
            <span>${f}</span>
        </li>
    `).join('');
    
    // Especificaciones
    const specificationsList = document.getElementById('specificationsList');
    const specifications = [
        { label: 'Composición', value: product.material || 'Algodón y poliéster' },
        { label: 'Cuidados', value: 'Lavado a mano, Secado plano' },
        { label: 'Color', value: product.colores ? product.colores[0] : 'Principal' },
        { label: 'Peso', value: '320g' },
        { label: 'Origen', value: 'Diseñado en España' }
    ];
    
    specificationsList.innerHTML = specifications.map(s => `
        <div class="spec-item">
            <span class="spec-label">${s.label}</span>
            <span class="spec-value">${s.value}</span>
        </div>
    `).join('');
    
    // Medidas (simuladas)
    const measurementsList = document.getElementById('measurementsList');
    const measurements = [
        { label: 'Largo total', value: '120 cm' },
        { label: 'Pecho', value: '88-92 cm' },
        { label: 'Cintura', value: '70-74 cm' },
        { label: 'Cadera', value: '96-100 cm' }
    ];
    
    measurementsList.innerHTML = measurements.map(m => `
        <div class="spec-item">
            <span class="spec-label">${m.label}</span>
            <span class="spec-value">${m.value}</span>
        </div>
    `).join('');
    
    // Reseñas (simuladas)
    const reviewsContainer = document.getElementById('reviewsContainer');
    const mockReviews = [
        {
            author: 'María G.',
            avatar: 'MG',
            date: 'Hace 2 días',
            rating: 5,
            comment: '¡Me encantó! La calidad es excelente y la talla es perfecta.',
            verified: true
        },
        {
            author: 'Ana L.',
            avatar: 'AL',
            date: 'Hace 1 semana',
            rating: 4,
            comment: 'Muy bonito, la tela es suave. Solo que el envío tardó un poco más de lo esperado.',
            verified: true
        },
        {
            author: 'Carmen R.',
            avatar: 'CR',
            date: 'Hace 2 semanas',
            rating: 5,
            comment: 'La atención al cliente es excelente. Definitivamente volveré a comprar.',
            verified: true
        }
    ];
    
    reviewsContainer.innerHTML = mockReviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div class="review-author">
                    <div class="review-author-avatar">
                        <span>${review.avatar}</span>
                    </div>
                    <div class="review-author-info">
                        <h5>${review.author}</h5>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
                <div class="review-rating">
                    ${generateStars(review.rating)}
                </div>
            </div>
            <p class="review-comment">${review.comment}</p>
            ${review.verified ? `
                <div class="review-verified">
                    <span class="material-symbols-outlined">verified</span>
                    <span>Compra verificada</span>
                </div>
            ` : ''}
        </div>
    `).join('');
}

/**
 * Configura galería de imágenes
 */
function setupGallery() {
    const product = state.product;
    const mainImage = document.getElementById('mainImage');
    const mainContainer = document.getElementById('mainImageContainer');
    const thumbnailsContainer = document.getElementById('thumbnailsContainer');
    const badgeContainer = document.getElementById('badgeContainer');
    
    // Imagen principal
    mainImage.src = product.imagen;
    mainImage.alt = product.nombre;
    state.currentImage = product.imagen;
    
    // Badges
    badgeContainer.innerHTML = '';
    
    if (product.en_oferta) {
        badgeContainer.innerHTML += `
            <span class="producto-badge">¡OFERTA!</span>
        `;
    }
    
    if (product.nuevo) {
        badgeContainer.innerHTML += `
            <span class="producto-badge nuevo">NUEVO</span>
        `;
    }
    
    // Miniaturas
    thumbnailsContainer.innerHTML = '';
    
    // Miniatura principal
    const mainThumb = createThumbnail(product.imagen, product.nombre, true);
    thumbnailsContainer.appendChild(mainThumb);
    
    // Miniaturas secundarias
    if (product.imagenes_secundarias && product.imagenes_secundarias.length > 0) {
        product.imagenes_secundarias.forEach(img => {
            const thumb = createThumbnail(img, `${product.nombre} - vista adicional`, false);
            thumbnailsContainer.appendChild(thumb);
        });
    }
    
    // Zoom de imagen
    mainContainer.addEventListener('click', toggleZoom);
}

/**
 * Crea una miniatura
 */
function createThumbnail(src, alt, isActive) {
    const btn = document.createElement('button');
    btn.className = `thumbnail-btn ${isActive ? 'active' : ''}`;
    btn.innerHTML = `<img src="${src}" alt="${alt}">`;
    
    btn.addEventListener('click', () => {
        // Cambiar imagen principal
        document.getElementById('mainImage').src = src;
        state.currentImage = src;
        
        // Actualizar miniaturas activas
        document.querySelectorAll('.thumbnail-btn').forEach(thumb => {
            thumb.classList.remove('active');
        });
        btn.classList.add('active');
    });
    
    return btn;
}

/**
 * Alterna zoom de imagen
 */
function toggleZoom(e) {
    const img = e.currentTarget.querySelector('img');
    img.classList.toggle('zoomed');
}

/**
 * Configura selector de tallas
 */
function setupSizeSelector() {
    const product = state.product;
    const container = document.getElementById('sizeSelectorContainer');
    
    if (!product.tallas || product.tallas.length === 0) {
        container.innerHTML = '<p class="size-note">Talla única</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="size-header">
            <h3>Talla</h3>
            <button class="size-guide" id="sizeGuideBtn">
                <span class="material-symbols-outlined">straighten</span>
                Guía de tallas
            </button>
        </div>
        <div class="sizes-grid" id="sizesGrid"></div>
        <p class="size-note">* Producto talla real. Si dudas, escoge una talla más</p>
    `;
    
    const sizesGrid = document.getElementById('sizesGrid');
    
    product.tallas.forEach((talla, index) => {
        const btn = document.createElement('button');
        btn.className = `size-btn ${index === 0 ? 'active' : ''}`;
        btn.dataset.size = talla.toLowerCase();
        btn.innerHTML = `
            <span>${talla.toUpperCase()}</span>
            <span class="size-eu">EU ${34 + index * 2}</span>
        `;
        
        btn.addEventListener('click', () => {
            // Actualizar UI
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Actualizar estado
            state.selectedSize = talla.toLowerCase();
        });
        
        sizesGrid.appendChild(btn);
    });
    
    // Seleccionar primera talla por defecto
    state.selectedSize = product.tallas[0].toLowerCase();
    
    // Guía de tallas
    document.getElementById('sizeGuideBtn')?.addEventListener('click', () => {
        showNotification('Guía de tallas disponible próximamente', 'info');
    });
}

/**
 * Configura controles de cantidad
 */
function setupQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    
    decreaseBtn.addEventListener('click', () => {
        let current = parseInt(quantityInput.value);
        if (current > 1) {
            quantityInput.value = current - 1;
            state.quantity = current - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        let current = parseInt(quantityInput.value);
        const max = parseInt(quantityInput.max);
        if (current < max) {
            quantityInput.value = current + 1;
            state.quantity = current + 1;
        }
    });
}

/**
 * Configura tabs
 */
function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Actualizar botones
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Actualizar contenido
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`tab${capitalize(tabId)}`).classList.add('active');
        });
    });
}

/**
 * Configura botón de wishlist
 */
function setupWishlist() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    
    wishlistBtn.addEventListener('click', () => {
        state.isWishlist = !state.isWishlist;
        
        if (state.isWishlist) {
            wishlistBtn.classList.add('active');
            showNotification('Producto añadido a favoritos', 'success');
        } else {
            wishlistBtn.classList.remove('active');
            showNotification('Producto removido de favoritos', 'info');
        }
    });
}

/**
 * Configura botones de acción
 */
function setupButtons() {
    // Añadir al carrito
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);
    
    // Comprar ahora
    document.getElementById('buyNowBtn').addEventListener('click', buyNow);
    
    // Escribir reseña
    document.getElementById('writeReviewBtn').addEventListener('click', () => {
        showNotification('Funcionalidad de reseñas próximamente', 'info');
    });
}

/**
 * Añade producto al carrito
 */
function addToCart() {
    const product = state.product;
    
    // Validar talla si es necesario
    if (product.tallas && product.tallas.length > 0 && !state.selectedSize) {
        showNotification('Por favor selecciona una talla', 'warning');
        return;
    }
    
    const cartItem = {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        talla: state.selectedSize,
        cantidad: state.quantity
    };
    
    if (window.cartManager) {
        window.cartManager.addItem(cartItem);
    } else {
        // Fallback
        let cart = JSON.parse(localStorage.getItem('atelier_cart')) || [];
        
        const existingItem = cart.find(item => 
            item.id === cartItem.id && item.talla === cartItem.talla
        );
        
        if (existingItem) {
            existingItem.cantidad += cartItem.cantidad;
        } else {
            cart.push(cartItem);
        }
        
        localStorage.setItem('atelier_cart', JSON.stringify(cart));
        showNotification(`${product.nombre} añadido al carrito`, 'success');
    }
}

/**
 * Comprar ahora
 */
function buyNow() {
    const product = state.product;
    
    if (product.tallas && product.tallas.length > 0 && !state.selectedSize) {
        showNotification('Por favor selecciona una talla', 'warning');
        return;
    }
    
    showNotification('Redirigiendo al checkout...', 'info');
    // Aquí iría la redirección al checkout
    // window.location.href = 'checkout.html';
}

/**
 * Carga productos relacionados
 */
async function loadRelatedProducts() {
    const relatedContainer = document.getElementById('relatedProducts');
    
    // Filtrar productos de misma categoría, excluyendo el actual
    const related = state.allProducts
        .filter(p => p.id !== state.productId && p.categoria === state.product.categoria)
        .slice(0, 4);
    
    if (related.length === 0) {
        // Si no hay en misma categoría, tomar aleatorios
        const others = state.allProducts
            .filter(p => p.id !== state.productId)
            .slice(0, 4);
        renderRelatedProducts(others);
    } else {
        renderRelatedProducts(related);
    }
}

/**
 * Renderiza productos relacionados
 */
function renderRelatedProducts(products) {
    const container = document.getElementById('relatedProducts');
    
    container.innerHTML = products.map(p => `
        <a href="producto.html?id=${p.id}" class="related-card">
            <div class="related-card-image">
                <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
            </div>
            <h3 class="related-card-title">${p.nombre}</h3>
            <p class="related-card-price">$${p.precio}</p>
        </a>
    `).join('');
}

/**
 * Genera estrellas de valoración
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="material-symbols-outlined star-full">star</span>';
    }
    
    if (hasHalfStar) {
        stars += '<span class="material-symbols-outlined star-half">star_half</span>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<span class="material-symbols-outlined star-empty">star</span>';
    }
    
    return stars;
}

/**
 * Muestra notificación
 */
function showNotification(message, type = 'success') {
    if (window.NotificationManager) {
        window.NotificationManager.show(message, type);
    } else {
        alert(message);
    }
}

/**
 * Capitaliza primera letra
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}