// js/demo-simple.js
// Versión SIMPLE de lista y tarjetas dinámicas

document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('listaDeseos');
    const input = document.getElementById('inputDeseo');
    const btnAgregar = document.getElementById('btnAgregarDeseo');
    const btnLimpiar = document.getElementById('btnLimpiarDeseos');
    const contador = document.getElementById('contadorDeseos');
    
    if (lista && input && btnAgregar) {
        // Función para actualizar contador
        function actualizarContadorLista() {
            const total = lista.children.length;
            contador.textContent = total + ' ' + (total === 1 ? 'elemento' : 'elementos');
        }
        
        // Función para crear nuevo item
        function agregarItem() {
            const texto = input.value.trim();
            if (texto === '') {
                alert('Escribe algo');
                return;
            }
            
            const li = document.createElement('li');
            li.className = 'item-deseo fade-in';
            li.innerHTML = `
                <span>
                    <span class="material-symbols-outlined">favorite</span>
                    ${texto}
                </span>
                <button class="btn-eliminar" onclick="eliminarItem(this)">✖</button>
            `;
            
            lista.appendChild(li);
            input.value = '';
            input.focus();
            actualizarContadorLista();
        }
        
        btnAgregar.addEventListener('click', agregarItem);
        input.addEventListener('keyup', (e) => e.key === 'Enter' && agregarItem());
        
        if (btnLimpiar) {
            btnLimpiar.addEventListener('click', () => {
                if (lista.children.length > 0 && confirm('¿Eliminar todos?')) {
                    lista.innerHTML = '';
                    actualizarContadorLista();
                }
            });
        }
        
        actualizarContadorLista();
    }
    
});

// ===== FUNCION PARA ELIMINAR =====
function eliminarItem(btn) {
    if (confirm('¿Eliminar este deseo?')) {
        const li = btn.closest('li');
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
            // Actualizar contador si existe
            const contador = document.getElementById('contadorDeseos');
            if (contador) {
                const total = document.getElementById('listaDeseos').children.length;
                contador.textContent = total + ' ' + (total === 1 ? 'elemento' : 'elementos');
            }
        }, 300);
    }
}
