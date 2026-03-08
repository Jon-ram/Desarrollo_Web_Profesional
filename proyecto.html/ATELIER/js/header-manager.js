// js/header-manager.js
// Este archivo se encarga de manejar el header común en todas las páginas

document.addEventListener('DOMContentLoaded', () => {
    initializeHeader();
});

function initializeHeader() {
    // El header ya está en cada archivo HTML
    // Este script se encarga de la funcionalidad del header
    
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Inicializar tema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.classList.add('dark');
        updateThemeIcons(true);
    } else {
        htmlElement.classList.remove('dark');
        updateThemeIcons(false);
    }
    
    // Evento para cambiar tema
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Actualizar contador del carrito
    updateCartCount();
}

function toggleTheme() {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark');
    
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    updateThemeIcons(isDark);
    
    // Disparar evento para que otros scripts reaccionen al cambio de tema
    window.dispatchEvent(new CustomEvent('themechange', { detail: { dark: isDark } }));
}

function updateThemeIcons(isDark) {
    const darkIcon = document.querySelector('.dark\\:hidden');
    const lightIcon = document.querySelector('.hidden.dark\\:inline');
    
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

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('atelier_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}