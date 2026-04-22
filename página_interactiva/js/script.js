// ============================
// 1. CARRUSEL DE IMÁGENES (manual + automático, mínimo 3 imágenes)
// ============================

// Seleccionar elementos del carrusel
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
const totalSlides = slides.length;
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dotsContainer = document.getElementById('dotsContainer');
let autoInterval;

// Generar indicadores (dots)
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active-dot');
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    }
}

// Actualizar estado de los dots
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
            dot.classList.add('active-dot');
        } else {
            dot.classList.remove('active-dot');
        }
    });
}

// Mostrar slide específico
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Asegurar rango válido
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    slides[index].classList.add('active');
    currentIndex = index;
    updateDots();
}

// Siguiente slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

// Anterior slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
}

// Ir a slide específico
function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Reiniciar reproducción automática
function resetAutoPlay() {
    clearInterval(autoInterval);
    autoInterval = setInterval(nextSlide, 3000);
}

// Eventos de botones del carrusel
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
});

// Iniciar carrusel automático
autoInterval = setInterval(nextSlide, 3000);

// Pausar carrusel al hacer hover
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoInterval);
    });
    carouselContainer.addEventListener('mouseleave', () => {
        autoInterval = setInterval(nextSlide, 3000);
    });
}

// Inicializar dots y mostrar primer slide
createDots();
showSlide(0);

// ============================
// 2. EVENTO DE SCROLL (Revelar secciones)
// ============================

const sectionsToReveal = document.querySelectorAll('.content-section');

function checkScrollVisibility() {
    sectionsToReveal.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Si la sección es visible en el viewport
        if (rect.top < windowHeight - 80 && rect.bottom > 60) {
            if (!section.classList.contains('visible')) {
                section.classList.add('visible');
                section.classList.remove('hidden');
            }
        }
    });
}

// Escuchar eventos de scroll y resize
window.addEventListener('scroll', checkScrollVisibility);
window.addEventListener('resize', checkScrollVisibility);

// Verificar visibilidad al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    sectionsToReveal.forEach(section => {
        if (!section.classList.contains('visible')) {
            section.classList.add('hidden');
        }
    });
    checkScrollVisibility();
});

// ============================
// 3. MOSTRAR / OCULTAR ELEMENTOS (Botón + Panel)
// ============================

const toggleBtn = document.getElementById('toggle-btn');
const panel = document.getElementById('panel');

// Configurar estado inicial del panel
if (panel && !panel.classList.contains('hidden')) {
    panel.classList.add('hidden');
}

toggleBtn.addEventListener('click', () => {
    // Alternar clase hidden en el panel
    panel.classList.toggle('hidden');
    
    // Cambiar texto y estilo del botón según el estado
    if (panel.classList.contains('hidden')) {
        toggleBtn.textContent = 'Ver mas información';
        toggleBtn.style.background = '#1e293b';
        toggleBtn.style.color = 'white';
    } else {
        toggleBtn.textContent = 'Ver menos información';
        toggleBtn.style.background = '#facc15';
        toggleBtn.style.color = '#0f172a';
    }
});

// ============================
// 4. EVENTOS DEL MOUSE (Tarjetas interactivas)
// ============================

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    // Evento mouseenter: cursor entra en la tarjeta
    card.addEventListener('mouseenter', () => {
        card.style.backgroundColor = '#facc15';
        card.style.transform = 'scale(1.06)';
        card.style.transition = 'all 0.25s ease';
        card.style.boxShadow = '0 20px 25px -12px rgba(0,0,0,0.3)';
    });
    
    // Evento mouseleave: cursor sale de la tarjeta
    card.addEventListener('mouseleave', () => {
        card.style.backgroundColor = '#f1f5f9';
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 5px 12px rgba(0, 0, 0, 0.05)';
    });
    
    // Evento click adicional: feedback visual
    card.addEventListener('click', () => {
        const cardTitle = card.querySelector('h3')?.innerText || 'tarjeta';
        console.log(`Click en ${cardTitle}`);
        
        // Efecto de presión
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            if (card.matches(':hover')) {
                card.style.transform = 'scale(1.06)';
            } else {
                card.style.transform = 'scale(1)';
            }
        }, 150);
    });
});

// ============================
// LIMPIEZA DE INTERVALOS AL CERRAR (buena práctica)
// ============================
window.addEventListener('beforeunload', () => {
    if (autoInterval) clearInterval(autoInterval);
});

// Mensaje de confirmación en consola
console.log(' Todos los elementos dinámicos activos:');
console.log('- Scroll reveal: secciones aparecen al desplazarse');
console.log('- Eventos mouse: hover y click en tarjetas');
console.log('- Mostrar/Ocultar: panel controlado por botón');
console.log('- Carrusel: automático + manual con 4 imágenes');