// Botón para cambiar el título en Nosotros
document.addEventListener('DOMContentLoaded', function() {

    const titulo = document.getElementById('tituloNosotros');
    const btnEditar = document.getElementById('btnEditarTitulo');
        
    // Textos alternativos
    const textos = ['Nuestra Esencia', 'Nuestra Historia', 'Nuestro Propósito'];
    let indice = 0;
        
    if (btnEditar && titulo) {
        
        btnEditar.addEventListener('click', function() {
            // Cambiar al siguiente texto
            indice = (indice + 1) % textos.length;
            titulo.textContent = textos[indice];
                
            // Efecto visual de feedback
            titulo.style.transition = 'color 0.3s';
            titulo.style.color = 'var(--primary)';
            setTimeout(() => {
                titulo.style.color = '';
            }, 300);
        });
            
        // Efecto hover en el botón
        btnEditar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s';
        });
            
        btnEditar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});