// js/servicios.js

document.addEventListener('DOMContentLoaded', () => {
    initializeServiceButtons();
    initializeNewsletterForm();
});

/**
 * Inicializa los botones de servicios
 */
function initializeServiceButtons() {
    // Botón "Agendar Cita"
    const agendaBtn = document.querySelector('.servicio-btn');
    if (agendaBtn) {
        agendaBtn.addEventListener('click', () => {
            // Aquí iría la lógica para agendar cita
            showNotification('Redirigiendo al sistema de citas...', 'info');
            
            // Simular redirección después de 1 segundo
            setTimeout(() => {
                // window.location.href = 'agendar-cita.html';
                showNotification('Funcionalidad en desarrollo', 'warning');
            }, 1000);
        });
    }
    
    // Botones "Conocer más"
    document.querySelectorAll('.servicio-card-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = e.target.closest('.servicio-card')?.querySelector('h3')?.textContent;
            
            showNotification(`Más información sobre: ${serviceName}`, 'info');
        });
    });
}

/**
 * Inicializa el formulario de newsletter
 */
function initializeNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Validación básica
        if (!isValidEmail(email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        // Cambiar estado del botón
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="material-symbols-outlined spinning">progress_activity</span> Enviando...';
        
        // Simular envío a servidor
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.', 'success');
            form.reset();
            
        } catch (error) {
            showNotification('Error al suscribirte. Intenta nuevamente.', 'error');
            
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Muestra notificación (usa NotificationManager si existe)
 */
function showNotification(message, type = 'success') {
    if (window.NotificationManager) {
        NotificationManager.show(message, type);
    } else {
        // Fallback simple
        alert(message);
    }
}

// Añadir estilos para animación de spinning si no existen
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spinning {
        animation: spin 1s linear infinite;
        display: inline-block;
    }
`;
document.head.appendChild(style);

 // Mostrar/Ocultar sección de servicios adicionales
document.addEventListener('DOMContentLoaded', function() {
    const seccionServicios = document.getElementById('seccionServiciosAdicionales');
    const btnToggle = document.getElementById('btnToggleServicios');
    const btnTexto = document.getElementById('btnTexto');
    const btnIcono = btnToggle.querySelector('span:first-child');
        
    let seccionVisible = true;
        
    btnToggle.addEventListener('click', function() {
        if (seccionVisible) {
            // Ocultar sección
            seccionServicios.style.display = 'none';
            btnTexto.textContent = 'Mostrar Servicios Adicionales';
            btnIcono.textContent = 'visibility';
            btnToggle.style.backgroundColor = '#10b981'; // Verde cuando está oculto
            seccionVisible = false;
        } else {
            // Mostrar sección
            seccionServicios.style.display = 'block';
            btnTexto.textContent = 'Ocultar Servicios Adicionales';
            btnIcono.textContent = 'visibility_off';
            btnToggle.style.backgroundColor = ''; // Vuelve al color original (primary)
            seccionVisible = true;
        }
            
        // Animación del botón
        btnToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btnToggle.style.transform = 'scale(1)';
        }, 200);
    });
        
    // Efecto hover en el botón
    btnToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s, background-color 0.2s';
    });
        
    btnToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});