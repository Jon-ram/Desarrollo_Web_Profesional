const titulo = document.getElementById("titulo")
const btnCambiarTitulo = document.getElementById("btnCambiarTitulo")
const listaServicios = document.getElementById("listaServicios")
const btnAgregarServicio = document.getElementById("btnAgregarServicio")
const btnModoOscuro = document.getElementById("btnModoOscuro")
const campoTexto = document.getElementById("campoTexto")
const resultado = document.getElementById("resultado")
const btnElinarServicio = document.getElementById("btnEliminarServicio")

//evento para cambiar titulo
btnCambiarTitulo.addEventListener('click', ()=>{
    titulo.textContent = "Mi sitio web Dinamico";
})

//evento para agregar servicio

btnAgregarServicio.addEventListener('click', ()=>{
    let texto = prompt('ingresa el texto que desees')
    const nuevoServicio=document.createElement("li");
    nuevoServicio.textContent= texto
    listaServicios.appendChild(nuevoServicio)
})

//Modo oscuro

btnModoOscuro.addEventListener('click', ()=>{
    document.body.classList.toggle("modo-oscuro")
})

//

campoTexto.addEventListener('keyup', ()=>{
    resultado.textContent="Escribiendo: " + campoTexto.value
})

btnElinarServicio.addEventListener('click', ()=>{
    if (listaServicios.lastElementChild)
        listaServicios.removeChild(listaServicios.lastElementChild) 
})

