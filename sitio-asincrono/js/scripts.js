const btnCargarUsuarios = document.getElementById("btnCargarUsuarios");
const contenedorUsuario = document.getElementById("contenedorUsuarios");

btnCargarUsuarios.addEventListener('click', () =>{
    contenedorUsuario.innerHTML = "<p>Cargando usuarios...</p>"
    fetch("https://jsonplaceholder.typicode.com/users")
    .then( response => response.json())
    .then(users=>{
        contenedorUsuario.innerHTML = ""
        users.forEach(users => {
            const userElement = document.createElement("div")
            userElement.classList.add("usuario");
                userElement.innerHTML = `
                <h3>${users.name}</h3>
                <p>${users.email}</p>
                <p>${users.company.name}</p>`;
            contenedorUsuario.appendChild(userElement);
        });
    })
});
