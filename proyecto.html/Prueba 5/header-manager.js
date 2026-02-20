// header-manager.js

// Páginas donde NO debe aparecer el buscador completo
const NO_SEARCH_PAGES = [
    'prueba4.html',
    'prueba.html', 
    'nosotros.html',
    'servicios.html',
    'producto.html',
    '', // Página de inicio (vacío)
    '/', // Página de inicio (slash)
    'index.html'
];

// Páginas donde SÍ debe aparecer el buscador completo
const WITH_SEARCH_PAGES = [
    'productos.html',
    'productos2.html',
];

// Configurar el header dinámicamente
function configurarHeader() {
    // Obtener la página actual
    const currentPage = obtenerPaginaActual();
    
    // Buscar el header en la página
    const header = document.querySelector('header');
    if (!header) return;
    
    // Buscar el contenedor del buscador
    const searchContainer = header.querySelector('.max-w-2xl.relative');
    if (!searchContainer) return;
    
    // Determinar si esta página necesita buscador
    const necesitaBuscador = !NO_SEARCH_PAGES.includes(currentPage);
    
    if (necesitaBuscador) {
        // PÁGINAS COMERCIALES: Mantener buscador completo
        console.log(`Página ${currentPage}: Mostrando buscador completo`);
    } else {
        // PÁGINAS INFORMATIVAS: Reemplazar por icono de lupa
        console.log(`Página ${currentPage}: Reemplazando por icono de lupa`);
        reemplazarBuscadorPorIcono(searchContainer, header);
    }
}

// Función para obtener la página actual
function obtenerPaginaActual() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    return page || '';
}

// Función para reemplazar el buscador por un icono
function reemplazarBuscadorPorIcono(searchContainer, header) {
    // Guardar las clases originales para mantener el diseño
    const clasesOriginales = searchContainer.className;
    
    // Crear nuevo contenido con icono de lupa
    const nuevoContenido = `
        <div class="${clasesOriginales}">
            <a href="productos2.html" 
               class="flex items-center justify-center w-full h-full text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
               title="Buscar productos"
               aria-label="Buscar productos">
                <span class="material-symbols-outlined text-xl mr-2">search</span>
                <span class="text-sm font-medium">Buscar productos</span>
            </a>
        </div>
    `;
    
    // Reemplazar el contenido
    searchContainer.outerHTML = nuevoContenido;
    
    // También puedes agregar una variante más compacta si prefieres solo el icono:
    // searchContainer.innerHTML = `
    //     <a href="productos2.html" 
    //        class="flex items-center justify-center w-10 h-10 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
    //        title="Buscar productos"
    //        aria-label="Buscar productos">
    //         <span class="material-symbols-outlined">search</span>
    //     </a>
    // `;
}

// Configurar modo oscuro (mantener tu funcionalidad existente)
function configurarModoOscuro() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    if (!themeToggleBtn) return;
    
    if (localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    configurarHeader();
    configurarModoOscuro();
    
    // Opcional: Configurar navegación activa
    configurarNavegacionActiva();
});

// Opcional: Resaltar enlace activo en navegación
function configurarNavegacionActiva() {
    const currentPage = obtenerPaginaActual();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'prueba4.html') ||
            (currentPage === '' && linkHref === 'prueba.html')) {
            link.classList.add('text-primary', 'border-primary');
        }
    });
}

// Exportar funciones si es necesario
window.headerManager = {
    configurarHeader,
    configurarModoOscuro,
    obtenerPaginaActual
};