const titulo = document.getElementById("titulo")
const btnCambiarTitulo = document.getElementById("btnCambiarTitulo")
const listaServicios = document.getElementById("listaServicios")
const btnAgregarServicio = document.getElementById("btnAgregarServicio")
const btnModoOscuro = document.getElementById("btnModoOscuro")
const campoTexto = document.getElementById("campoTexto")
const resultado = document.getElementById("resultado")
const btnElinarServicio = document.getElementById("btnEliminarServicio");
const numeroServicio = document.getElementById("numeroServicio");

//evento para cambiar titulo
btnCambiarTitulo.addEventListener('click', ()=>{
    titulo.textContent = "Mi sitio web Dinamico";
})

//funcion para actualizar el contador de servicios
function actualizarContador() {
    numeroServicio.textContent =`Total de servicios: ${listaServicios.children.length}`;
}

//evento para agregar servicio
btnAgregarServicio.addEventListener('click', ()=>{
    let texto = prompt('ingresa el texto que desees')
    if (texto && texto.trim() !== '') {
        const nuevoServicio = document.createElement("li");
        nuevoServicio.textContent = texto;
        listaServicios.appendChild(nuevoServicio);
        actualizarContador();
    } else if (texto !== null) {
        alert("El nombre no puede estar vacío"); // Mensaje simple
    }
})

//Evento para eliminar el ultimo servicio de la lista
btnElinarServicio.addEventListener('click', ()=>{
    if (listaServicios.lastElementChild)
        listaServicios.removeChild(listaServicios.lastElementChild) 
        actualizarContador(); 
    }
)

// Evento para eliminar un servicio específico al hacer doble clic en él
listaServicios.addEventListener('dblclick', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.remove();
        actualizarContador(); // Si creaste la función del paso 2
    }
});

//Modo oscuro
//btnModoOscuro.addEventListener('click', ()=>{
//    document.body.classList.toggle("modo-oscuro")
//})

// Cargar preferencia (usando true/false)
if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('modo-oscuro');
}

btnModoOscuro.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    
    // Guarda directamente si tiene la clase o no
    localStorage.setItem('modoOscuro', document.body.classList.contains('modo-oscuro'));
});

//Evento para mostrar lo que se escribe en el campo de texto en tiempo real
campoTexto.addEventListener('keyup', ()=>{
    resultado.textContent="Escribiendo: " + campoTexto.value
})

//Inicializamos el contador de servicios al cargar la página
actualizarContador();

