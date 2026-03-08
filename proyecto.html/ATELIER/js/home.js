// js/home.js
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    initializeAddToCartButtons();
});

async function loadFeaturedProducts() {
    try {
        const response = await fetch('data/productos.json');
        const data = await response.json();
        
        // Filtrar productos destacados (primeros 4)
        const featuredProducts = data.productos.filter(p => p.destacado).slice(0, 4);
        
        const productsGrid = document.getElementById('featured-products');
        if (!productsGrid) return;
        
        productsGrid.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
        
    } catch (error) {
        console.error('Error loading featured products:', error);
    }
}

function createProductCard(product) {
    const offerBadge = product.en_oferta ? 
        '<span class="card-badge">¡OFERTA!</span>' : '';
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="card-image-container">
                <img src="${product.imagen}" alt="${product.nombre}" class="card-image">
                ${offerBadge}
            </div>
            <div class="card-content">
                <h3 class="card-title">${product.nombre}</h3>
                <p class="card-price">$${product.precio}</p>
                <button class="card-button add-to-cart">
                    <span class="material-symbols-outlined">shopping_cart</span>
                    Añadir al carrito
                </button>
            </div>
        </div>
    `;
}

function initializeAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            // Aquí iría la lógica para agregar al carrito
            NotificationManager.show('Producto añadido al carrito');
        });
    });
}