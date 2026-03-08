// ===== GESTIÓN DEL TEMA (OSCURO/CLARO) =====
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.htmlElement = document.documentElement;
        this.init();
    }

    init() {
        // Cargar tema guardado o preferencia del sistema
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            this.htmlElement.classList.add('dark');
        } else {
            this.htmlElement.classList.remove('dark');
        }

        // Event listener para el toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.htmlElement.classList.toggle('dark');
        const isDark = this.htmlElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Actualizar iconos si es necesario
        this.updateIcons(isDark);
    }

    updateIcons(isDark) {
        const darkIcon = this.themeToggle?.querySelector('.dark\\:hidden');
        const lightIcon = this.themeToggle?.querySelector('.hidden.dark\\:inline');
        
        if (darkIcon && lightIcon) {
            if (isDark) {
                darkIcon.style.display = 'none';
                lightIcon.style.display = 'inline';
            } else {
                darkIcon.style.display = 'inline';
                lightIcon.style.display = 'none';
            }
        }
    }
}

// ===== NOTIFICACIONES =====
class NotificationManager {
    static show(message, type = 'success') {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };

        const icons = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${colors[type]};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 9999;
            animation: fade-in 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 8px;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border-left: 4px solid ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#2563eb'};
        `;

        notification.innerHTML = `
            <span class="material-symbols-outlined">${icons[type]}</span>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);

        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// ===== MANEJADOR DEL CARRITO =====
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('atelier_cart')) || [];
        this.init();
    }

    init() {
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.cart.find(item => 
            item.id === product.id && item.talla === product.talla
        );

        if (existingItem) {
            existingItem.cantidad += product.cantidad || 1;
        } else {
            this.cart.push({
                ...product,
                cantidad: product.cantidad || 1
            });
        }

        this.saveCart();
        NotificationManager.show(`${product.nombre} añadido al carrito`);
    }

    removeItem(productId, talla) {
        this.cart = this.cart.filter(item => 
            !(item.id === productId && item.talla === talla)
        );
        this.saveCart();
    }

    updateQuantity(productId, talla, cantidad) {
        const item = this.cart.find(item => 
            item.id === productId && item.talla === talla
        );
        if (item) {
            item.cantidad = cantidad;
            this.saveCart();
        }
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    saveCart() {
        localStorage.setItem('atelier_cart', JSON.stringify(this.cart));
        this.updateCartCount();
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.cantidad, 0);
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar tema
    window.themeManager = new ThemeManager();
    
    // Inicializar carrito
    window.cartManager = new CartManager();

    // Cargar header común
    loadHeader();
});

// ===== CARGA DE HEADER COMÚN =====
function loadHeader() {
    // El header ya está incluido en cada página
    // Este es un placeholder para futuras funcionalidades
    console.log('Header cargado');
}

// ===== UTILIDADES =====
const Utils = {
    formatPrice(price) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(price);
    },

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return Object.fromEntries(params.entries());
    }
};

// Versión simplificada
document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('listaSimple');
    const input = document.getElementById('inputSimple');
    const btnAgregar = document.getElementById('btnAgregarSimple');
    const btnLimpiar = document.getElementById('btnLimpiarSimple');
        
    function agregarItem() {
        const texto = input.value.trim();
        if (!texto) return;
            
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.padding = '0.5rem';
        li.style.borderBottom = '1px solid #ddd';
            
        li.innerHTML = `
            <span>${texto}</span>
            <button class="eliminar-simple" style="color: red; background: none; border: none; cursor: pointer;">✖</button>
        `;
            
        li.querySelector('.eliminar-simple').addEventListener('click', function() {
            if (confirm('¿Eliminar este item?')) {
                li.remove();
            }
        });
            
        lista.appendChild(li);
        input.value = '';
        input.focus();
    }
        
    btnAgregar.addEventListener('click', agregarItem);
    input.addEventListener('keyup', (e) => e.key === 'Enter' && agregarItem());
        
    btnLimpiar.addEventListener('click', () => {
        if (confirm('¿Eliminar todos?')) {
            lista.innerHTML = '';
        }
    });
        
    // Eliminar items existentes
    document.querySelectorAll('.eliminar-simple').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('¿Eliminar este item?')) {
                this.closest('li').remove();
            }
        });
    });
});

// Exportar utilidades globalmente
window.Utils = Utils;

