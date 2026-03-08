// js/productos.js

// ===== ESTADO GLOBAL =====
let productos = [];
let filteredProducts = [];
let categorias = [];
let tallas = [];

const state = {
    currentPage: 1,
    productsPerPage: 12,
    filters: {
        search: '',
        categories: [],
        sizes: [],
        maxPrice: 500,
        sortBy: 'relevance'
    }
};

// ===== ELEMENTOS DOM =====
const elements = {
    grid: document.getElementById('productsGrid'),
    searchInput: document.getElementById('searchInput'),
    priceRange: document.getElementById('priceRange'),
    priceValue: document.getElementById('priceValue'),
    sortSelect: document.getElementById('sortSelect'),
    clearFilters: document.getElementById('clearFilters'),
    productCount: document.getElementById('productCount'),
    categoryContainer: document.getElementById('categoryFilterContainer'),
    sizeContainer: document.getElementById('sizeFilterContainer'),
    paginationContainer: document.getElementById('paginationContainer'),
    prevPage: document.getElementById('prevPage'),
    nextPage: document.getElementById('nextPage'),
    pageNumbers: document.getElementById('pageNumbers')
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initializeEventListeners();
});

/**
 * Carga productos desde el JSON
 */
async function loadProducts() {
    try {
        const response = await fetch('../data/productos.json');
        const data = await response.json();
        
        productos = data.productos;
        filteredProducts = [...productos];
        
        // Extraer categorías únicas
        categorias = [...new Set(productos.map(p => p.categoria))];
        
        // Extraer tallas únicas
        const allSizes = productos.flatMap(p => p.tallas || []);
        tallas = [...new Set(allSizes)].sort();
        
        // Renderizar filtros y productos
        renderCategoryFilters();
        renderSizeFilters();
        applyFilters();
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
        showError();
    }
}

/**
 * Inicializa event listeners
 */
function initializeEventListeners() {
    // Búsqueda con debounce
    if (elements.searchInput) {
        let timeout;
        elements.searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                state.filters.search = e.target.value.toLowerCase();
                state.currentPage = 1;
                applyFilters();
            }, 300);
        });
    }

    // Filtro de precio
    if (elements.priceRange && elements.priceValue) {
        elements.priceRange.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            elements.priceValue.textContent = `$${value}`;
        });

        elements.priceRange.addEventListener('change', (e) => {
            state.filters.maxPrice = parseInt(e.target.value);
            state.currentPage = 1;
            applyFilters();
        });
    }

    // Ordenamiento
    if (elements.sortSelect) {
        elements.sortSelect.addEventListener('change', (e) => {
            state.filters.sortBy = e.target.value;
            applyFilters();
        });
    }

    // Limpiar filtros
    if (elements.clearFilters) {
        elements.clearFilters.addEventListener('click', clearAllFilters);
    }
}

/**
 * Renderiza filtros de categoría
 */
function renderCategoryFilters() {
    if (!elements.categoryContainer) return;
    
    elements.categoryContainer.innerHTML = categorias.map(cat => `
        <label class="filtro-checkbox">
            <input type="checkbox" class="category-filter" value="${cat}">
            <span class="checkmark"></span>
            ${capitalize(cat)}
        </label>
    `).join('');

    // Event listeners para categorías
    document.querySelectorAll('.category-filter').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const category = e.target.value;
            
            if (e.target.checked) {
                state.filters.categories.push(category);
            } else {
                state.filters.categories = state.filters.categories.filter(c => c !== category);
            }
            
            state.currentPage = 1;
            applyFilters();
        });
    });
}

/**
 * Renderiza filtros de talla
 */
function renderSizeFilters() {
    if (!elements.sizeContainer) return;
    
    elements.sizeContainer.innerHTML = tallas.map(talla => `
        <button class="btn-talla size-filter" data-size="${talla.toLowerCase()}">
            ${talla.toUpperCase()}
        </button>
    `).join('');

    // Event listeners para tallas
    document.querySelectorAll('.size-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const size = e.target.dataset.size;
            
            e.target.classList.toggle('active');
            
            if (e.target.classList.contains('active')) {
                state.filters.sizes.push(size);
            } else {
                state.filters.sizes = state.filters.sizes.filter(s => s !== size);
            }
            
            state.currentPage = 1;
            applyFilters();
        });
    });
}

/**
 * Aplica todos los filtros y renderiza
 */
function applyFilters() {
    let filtered = [...productos];
    
    // Filtro de búsqueda
    if (state.filters.search) {
        filtered = filtered.filter(p => 
            p.nombre.toLowerCase().includes(state.filters.search) ||
            p.descripcion.toLowerCase().includes(state.filters.search) ||
            (p.tags && p.tags.some(tag => tag.toLowerCase().includes(state.filters.search)))
        );
    }
    
    // Filtro de categorías
    if (state.filters.categories.length > 0) {
        filtered = filtered.filter(p => 
            state.filters.categories.includes(p.categoria)
        );
    }
    
    // Filtro de tallas
    if (state.filters.sizes.length > 0) {
        filtered = filtered.filter(p => 
            p.tallas && p.tallas.some(talla => 
                state.filters.sizes.includes(talla.toLowerCase())
            )
        );
    }
    
    // Filtro de precio
    filtered = filtered.filter(p => p.precio <= state.filters.maxPrice);
    
    // Ordenamiento
    filtered.sort((a, b) => {
        switch(state.filters.sortBy) {
            case 'price-low':
                return a.precio - b.precio;
            case 'price-high':
                return b.precio - a.precio;
            case 'newest':
                return b.id - a.id;
            default: // relevance
                if (a.destacado && !b.destacado) return -1;
                if (!a.destacado && b.destacado) return 1;
                return 0;
        }
    });
    
    filteredProducts = filtered;
    renderProducts();
}

/**
 * Renderiza productos en el grid
 */
function renderProducts() {
    if (!elements.grid) return;
    
    const totalProducts = filteredProducts.length;
    const startIndex = (state.currentPage - 1) * state.productsPerPage;
    const endIndex = startIndex + state.productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    // Actualizar contador
    if (elements.productCount) {
        if (totalProducts === 0) {
            elements.productCount.textContent = 'No se encontraron productos';
        } else {
            elements.productCount.textContent = 
                `Mostrando ${startIndex + 1}-${Math.min(endIndex, totalProducts)} de ${totalProducts} productos`;
        }
    }
    
    // Renderizar grid
    if (productsToShow.length === 0) {
        elements.grid.innerHTML = `
            <div class="no-productos">
                <span class="material-symbols-outlined no-productos-icon">search_off</span>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros filtros o términos de búsqueda</p>
                <button onclick="clearAllFilters()" class="btn-primary">Limpiar filtros</button>
            </div>
        `;
    } else {
        elements.grid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    }
    
    // Renderizar paginación
    renderPagination(totalProducts);
    
    // Inicializar botones de carrito
    initializeCartButtons();
}

/**
 * Crea tarjeta de producto HTML
 */
function createProductCard(product) {
    const discount = product.en_oferta && product.precio_original ? 
        Math.round((1 - product.precio / product.precio_original) * 100) : 0;
    
    const badges = [];
    if (product.en_oferta) {
        badges.push(`<span class="producto-badge">-${discount}%</span>`);
    }
    if (product.nuevo && !product.en_oferta) {
        badges.push(`<span class="producto-badge nuevo">NUEVO</span>`);
    }
    if (product.stock < 5 && product.stock > 0) {
        badges.push(`<span class="producto-badge stock">Últimas ${product.stock}</span>`);
    }
    
    return `
        <div class="producto-card" data-id="${product.id}">
            <a href="producto.html?id=${product.id}" class="producto-link">
                <div class="producto-imagen-container">
                    <img src="${product.imagen}" alt="${product.nombre}" class="producto-imagen" loading="lazy">
                    ${badges.join('')}
                </div>
                
                <div class="producto-contenido">
                    <div class="producto-categoria">${capitalize(product.categoria)}</div>
                    <h3 class="producto-nombre">${product.nombre}</h3>
                    
                    <div class="producto-rating">
                        ${generateStars(product.valoracion || 4.5)}
                        <span class="rating-count">(${product.reseñas || 0})</span>
                    </div>
                    
                    <div class="producto-precios">
                        <span class="precio-actual">$${product.precio}</span>
                        ${product.en_oferta ? `<span class="precio-original">$${product.precio_original}</span>` : ''}
                    </div>
                    
                    ${product.tallas ? `
                        <div class="producto-tallas">
                            ${product.tallas.slice(0, 3).map(t => 
                                `<span class="talla-badge">${t}</span>`
                            ).join('')}
                            ${product.tallas.length > 3 ? '<span class="talla-badge">+</span>' : ''}
                        </div>
                    ` : ''}
                </div>
            </a>
            
            <button class="btn-add-cart add-to-cart" data-id="${product.id}">
                <span class="material-symbols-outlined">shopping_cart</span>
                Añadir al carrito
            </button>
        </div>
    `;
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
 * Renderiza paginación
 */
function renderPagination(totalItems) {
    if (!elements.paginationContainer || !elements.prevPage || !elements.nextPage || !elements.pageNumbers) return;
    
    const totalPages = Math.ceil(totalItems / state.productsPerPage);
    
    if (totalPages <= 1) {
        elements.paginationContainer.classList.add('hidden');
        return;
    }
    
    elements.paginationContainer.classList.remove('hidden');
    
    // Generar números de página
    let pagesHTML = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pagesHTML += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    
    elements.pageNumbers.innerHTML = pagesHTML;
    
    // Actualizar estado de botones
    elements.prevPage.disabled = state.currentPage === 1;
    elements.nextPage.disabled = state.currentPage === totalPages;
    
    // Event listeners para páginas
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.dataset.page);
            if (page !== state.currentPage) {
                state.currentPage = page;
                applyFilters();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
    
    // Event listeners para anterior/siguiente
    elements.prevPage.onclick = () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            applyFilters();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    elements.nextPage.onclick = () => {
        if (state.currentPage < totalPages) {
            state.currentPage++;
            applyFilters();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
}

/**
 * Inicializa botones de añadir al carrito
 */
function initializeCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = btn.dataset.id;
            const product = productos.find(p => p.id === parseInt(productId));
            
            if (product && window.cartManager) {
                window.cartManager.addItem({
                    id: product.id,
                    nombre: product.nombre,
                    precio: product.precio,
                    imagen: product.imagen
                });
            } else {
                // Fallback si no hay cartManager
                showNotification(`${product.nombre} añadido al carrito`, 'success');
            }
        });
    });
}

/**
 * Limpia todos los filtros
 */
function clearAllFilters() {
    // Resetear checkboxes de categorías
    document.querySelectorAll('.category-filter').forEach(cb => {
        cb.checked = false;
    });
    
    // Resetear botones de talla
    document.querySelectorAll('.size-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Resetear input de búsqueda
    if (elements.searchInput) elements.searchInput.value = '';
    
    // Resetear slider de precio
    if (elements.priceRange) {
        elements.priceRange.value = 500;
        if (elements.priceValue) elements.priceValue.textContent = '$500';
    }
    
    // Resetear select de ordenamiento
    if (elements.sortSelect) elements.sortSelect.value = 'relevance';
    
    // Resetear estado
    state.filters = {
        search: '',
        categories: [],
        sizes: [],
        maxPrice: 500,
        sortBy: 'relevance'
    };
    state.currentPage = 1;
    
    applyFilters();
}

/**
 * Muestra error en el grid
 */
function showError() {
    if (elements.grid) {
        elements.grid.innerHTML = `
            <div class="no-productos">
                <span class="material-symbols-outlined no-productos-icon">error</span>
                <h3>Error al cargar productos</h3>
                <p>No se pudo cargar la información. Intenta nuevamente.</p>
                <button onclick="location.reload()" class="btn-primary">Reintentar</button>
            </div>
        `;
    }
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

// Hacer clearAllFilters global para el botón de "Limpiar filtros"
window.clearAllFilters = clearAllFilters;