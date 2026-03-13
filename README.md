# Desarrolo_Web_Profecional
En este repositorio almacenare las practicas realizadas durante clases


## 1. VARIABLES Y CONSTANTES

### **`const` vs `let`**

```javascript
const titulo = document.getElementById("titulo")
```
**`const`** (constante):
- **Significado**: Valor que NO puede cambiar (inmutable)
- **Uso**: Para elementos del DOM que siempre serán los mismos
- **Característica**: No se puede reasignar
- **Ejemplo**: `const PI = 3.1416`

```javascript
let texto = prompt('ingresa el texto')
```
**`let`** (variable):
- **Significado**: Valor que PUEDE cambiar (mutable)
- **Uso**: Para valores que se modifican (como texto ingresado por usuario)
- **Característica**: Se puede reasignar cuantas veces quieras
- **Ejemplo**: `let contador = 0; contador = 1;`

---

## 2. MÉTODOS PARA SELECCIONAR ELEMENTOS

### **`document.getElementById('id')`**
```javascript
const titulo = document.getElementById("titulo")
```
- **Qué hace**: Busca en todo el HTML un elemento que tenga el `id` especificado
- **Qué devuelve**: El elemento HTML encontrado (o `null` si no existe)
- **Ejemplo HTML**: `<h1 id="titulo">Mi sitio web</h1>`
- **Es único**: Los `id` deben ser únicos en toda la página

---

## 3. PROPIEDADES DE ELEMENTOS

### **`textContent`**
```javascript
titulo.textContent = "Mi sitio web Dinamico";
```
- **Qué hace**: Obtiene o establece el **texto** dentro de un elemento
- **Característica**: Solo texto, ignora etiquetas HTML
- **Ejemplo**: Si el elemento tiene `<h1>Hola <span>Mundo</span></h1>`, `textContent` devuelve "Hola Mundo"

### **`children`**
```javascript
listaServicios.children.length
```
- **Qué hace**: Devuelve una colección con TODOS los elementos **hijos** del elemento
- **Ejemplo**: Si `<ul>` tiene 3 `<li>`, `children.length` = 3
- **Diferencia con `childNodes`**: `children` solo incluye elementos HTML, no espacios o saltos de línea

### **`length`**
```javascript
.length
```
- **Qué hace**: Propiedad que devuelve el **número de elementos** en un array o colección
- **Uso**: Para saber cuántos servicios hay en la lista

### **`value`**
```javascript
campoTexto.value
```
- **Qué hace**: Obtiene o establece el **valor** de un campo de formulario
- **Uso**: Para inputs, textareas, selects
- **Ejemplo**: Si el usuario escribe "Hola", `campoTexto.value` = "Hola"

### **`tagName`**
```javascript
e.target.tagName
```
- **Qué hace**: Devuelve el nombre de la etiqueta HTML en **MAYÚSCULAS**
- **Ejemplos**: `"LI"`, `"DIV"`, `"BUTTON"`, `"UL"`

### **`classList`**
```javascript
document.body.classList
```
- **Qué hace**: Propiedad que contiene TODAS las clases CSS de un elemento
- **Métodos útiles**:
  - `add('clase')` → Añade una clase
  - `remove('clase')` → Quita una clase
  - `toggle('clase')` → Alterna (si está la quita, si no la añade)
  - `contains('clase')` → Pregunta si tiene la clase (devuelve true/false)

### **`classList.add()`**
```javascript
userElement.classList.add("usuario");
```
- Añade la clase CSS `"usuario"` al div
- Permite darle estilos desde CSS

---

## 4. EVENTOS Y ADDEVENTLISTENER

### **`addEventListener(tipo, función)`**
```javascript
btnCambiarTitulo.addEventListener('click', ()=>{...})
```
- **Qué hace**: "Escucha" cuando ocurre un evento en el elemento
- **Parámetros**:
  1. **Tipo de evento** (string): `'click'`, `'dblclick'`, `'keyup'`, etc.
  2. **Función** (callback): Lo que se ejecuta cuando ocurre el evento

### **Tipos de eventos usados:**

| Evento | Cuándo ocurre | Ejemplo de uso |
|--------|---------------|----------------|
| **`'click'`** | Al hacer clic en un elemento | Botones, enlaces |
| **`'dblclick'`** | Al hacer doble clic | Eliminar elemento |
| **`'keyup'`** | Al soltar una tecla | Mostrar escritura en tiempo real |

### **El parámetro `e` (evento)**
```javascript
listaServicios.addEventListener('dblclick', (e) => {...})
```
- **`e`** es un objeto que contiene TODA la información del evento
- **Propiedades importantes**:
  - `e.target`: El elemento que recibió el evento (donde hiciste clic)
  - `e.type`: Tipo de evento (`'click'`, `'dblclick'`, etc.)
  - `e.clientX`, `e.clientY`: Coordenadas del mouse

---

## 5. MANIPULACIÓN DEL DOM

### **`document.createElement('etiqueta')`**
```javascript
const nuevoServicio = document.createElement("li");
```
- **Qué hace**: Crea un NUEVO elemento HTML en memoria (aún no visible)
- **Parámetro**: El tipo de etiqueta (`'li'`, `'div'`, `'p'`, etc.)
- **Devuelve**: El elemento creado (vacío, sin contenido)

### **`appendChild(elemento)`**
```javascript
listaServicios.appendChild(nuevoServicio);
```
- **Qué hace**: Agrega un elemento como el **ÚLTIMO hijo** de otro elemento
- **Resultado**: El nuevo elemento aparece al final del padre

### **`removeChild(elemento)`**
```javascript
listaServicios.removeChild(listaServicios.lastElementChild)
```
- **Qué hace**: Elimina un elemento HIJO específico de su padre
- **Parámetro**: El elemento a eliminar (debe ser hijo directo)

### **`lastElementChild`**
```javascript
listaServicios.lastElementChild
```
- **Qué hace**: Obtiene el **ÚLTIMO** elemento hijo
- **Devuelve**: El elemento (o `null` si no hay hijos)
- **Ejemplo**: En una lista, devuelve el último `<li>`

### **`remove()`**
```javascript
e.target.remove();
```
- **Qué hace**: Elimina el elemento del DOM directamente (sin necesidad del padre)
- **Ventaja**: Más simple que `removeChild()`
- **Ejemplo**: `elemento.remove()` elimina ese elemento

### **`prompt('mensaje')`**
```javascript
let texto = prompt('ingresa el texto que desees')
```
- **Qué hace**: Muestra una ventana emergente con un campo de texto
- **Devuelve**: 
  - El texto ingresado (si el usuario da OK)
  - `null` (si el usuario da Cancelar)

### **`.trim()`**
```javascript
texto.trim()
```
- **Qué hace**: Elimina los espacios en blanco del **principio y final** de un string
- **Ejemplos**:
  - `"  hola  ".trim()` → `"hola"`
  - `"   ".trim()` → `""` (string vacío)

---

## 6. LOCALSTORAGE

### **`localStorage`**
- **Qué es**: Una pequeña base de datos en el navegador que GUARDA datos aunque cierres la página
- **Capacidad**: Aproximadamente 5-10 MB
- **Persistencia**: Los datos NO se borran al cerrar el navegador

### **`localStorage.setItem(clave, valor)`**
```javascript
localStorage.setItem('modoOscuro', true);
```
- **Qué hace**: Guarda un valor en localStorage
- **Parámetros**:
  - `clave`: Nombre para identificar el dato (string)
  - `valor`: Lo que quieres guardar (se convierte automáticamente a string)

### **`localStorage.getItem(clave)`**
```javascript
localStorage.getItem('modoOscuro')
```
- **Qué hace**: Recupera un valor guardado anteriormente
- **Devuelve**: 
  - El valor guardado (si existe)
  - `null` (si no existe esa clave)

---



## 7. ESTRUCTURAS DE CONTROL

### **`if (condición) { ... }`**
```javascript
if (texto && texto.trim() !== '') {
    // Código si la condición es verdadera
}
```
- **Qué hace**: Ejecuta código SOLO si la condición es `true`

### **`else if (condición)`**
```javascript
} else if (texto !== null) {
    // Código si la primera condición es falsa pero esta es verdadera
}
```
- **Qué hace**: Segunda oportunidad si la primera condición falla

### **Operadores de comparación**
| Operador | Significado | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| `===` | Estrictamente igual (valor Y tipo) | `5 === "5"` | `false` |
| `!==` | Estrictamente diferente | `5 !== "5"` | `true` |
| `>` | Mayor que | `5 > 3` | `true` |
| `<` | Menor que | `5 < 3` | `false` |

### **Operadores lógicos**
| Operador | Significado | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| `&&` | Y (AND) - TODAS deben ser true | `true && false` | `false` |
| `\|\|` | O (OR) - AL MENOS UNA debe ser true | `true \|\| false` | `true` |

### **Template Strings `${}`**
```javascript
`Total de servicios: ${listaServicios.children.length}`
```
- **Qué hace**: Permite insertar variables DENTRO de un string
- **Características**: Usa **backticks** `` ` `` en lugar de comillas
- **Ejemplo**: `` `Hola ${nombre}` `` → Si `nombre = "Ana"`, resulta "Hola Ana"

---
## . innerHTML

### **`innerHTML`**
```javascript
hola.innerHTML = "<p></p>"
hola.innerHTML = ""
```

**¿Qué hace?**
- Obtiene o establece el **contenido HTML** de un elemento
- A diferencia de `textContent`, **interpreta etiquetas HTML**

**Ejemplos:**
```javascript
hola.innerHTML = "<h1>Título</h1>" // Crea un h1
hola.innerHTML = "" // Borra TODO el contenido
hola.innerHTML += "<p>Nuevo</p>" // Añade al final 
```


---

##  FETCH API Y PROMESAS

### **`fetch(url)`**
```javascript
fetch("")
```

**¿Qué es?**
- Función nativa de JavaScript para hacer **peticiones HTTP**
- Obtiene recursos de internet (API, imágenes, archivos)
- Devuelve una **Promesa**


### **Promesas (`.then()`)**
```javascript
.then(response => response.json())
.then(hola => { ... })
```

**¿Qué es una Promesa?**
- Un objeto que representa un valor que **aún no está disponible**
- Como un "recibí" de un pedido: sabes que llegará, pero no sabes cuándo

**Estados de una Promesa:**
1. **Pending** (pendiente): Aún no hay respuesta
2. **Fulfilled** (resuelta): Llegaron los datos ✅
3. **Rejected** (rechazada): Hubo un error ❌

### **`.then()`**
```javascript
.then( response => response.json() )
```
- Se ejecuta CUANDO la promesa se resuelve (llegan los datos)
- Recibe el resultado de la promesa anterior
- **Siempre devuelve OTRA promesa** (por eso se pueden encadenar)

### **`response.json()`**
```javascript
response => response.json()
```
- **`response`** es el objeto que devuelve `fetch`
- **`.json()`** es un método que:
  - Lee el cuerpo de la respuesta
  - Lo CONVIERTE de JSON a un objeto/array JavaScript
  - Devuelve OTRA promesa

**Proceso completo:**
```
fetch(url)                         → Promesa 1 (response)
↓
.then(response => response.json()) → Promesa 2 (datos convertidos)
↓
.then(hola => { ... })            → Datos listos para usar
```

---

##  MÉTODOS DE ARRAYS

### **`forEach()`**
```javascript
hola.forEach(hola => { ... })
```

**¿Qué hace?**
- Itera (recorre) CADA elemento del array
- Ejecuta una función para cada elemento
- No devuelve nada (solo ejecuta código)

**Ejemplo:**
```javascript
const frutas = ["manzana", "pera", "uva"];
frutas.forEach(fruta => {
    console.log("Me gusta la " + fruta);
});
// Imprime:
// Me gusta la manzana
// Me gusta la pera
// Me gusta la uva
```
---
## 8. EXPLICACIÓN LÍNEA POR LÍNEA

```javascript
// 1. OBTENER ELEMENTOS DEL DOM (const)
const titulo = document.getElementById("titulo")               // Obtiene el h1
const btnCambiarTitulo = document.getElementById("btnCambiarTitulo") // Botón cambiar título
const listaServicios = document.getElementById("listaServicios")     // Lista ul
const btnAgregarServicio = document.getElementById("btnAgregarServicio") // Botón agregar
const btnModoOscuro = document.getElementById("btnModoOscuro")     // Botón modo oscuro
const campoTexto = document.getElementById("campoTexto")          // Input texto
const resultado = document.getElementById("resultado")            // Párrafo resultado
const btnElinarServicio = document.getElementById("btnEliminarServicio"); // Botón eliminar
const numeroServicio = document.getElementById("numeroServicio"); // Párrafo contador

// 2. EVENTO CAMBIAR TÍTULO
btnCambiarTitulo.addEventListener('click', ()=>{                 // Al hacer clic
    titulo.textContent = "Mi sitio web Dinamico";                // Cambia el texto del título
})

// 3. FUNCIÓN ACTUALIZAR CONTADOR
function actualizarContador() {                                    // Declara función
    numeroServicio.textContent =`Total de servicios: ${listaServicios.children.length}`; // Muestra número de servicios
}

// 4. EVENTO AGREGAR SERVICIO
btnAgregarServicio.addEventListener('click', ()=>{                // Al hacer clic
    let texto = prompt('ingresa el texto que desees')             // Pide texto al usuario
    if (texto && texto.trim() !== '') {                           // Si NO es null, vacío o espacios
        const nuevoServicio = document.createElement("li");       // Crea nuevo elemento li
        nuevoServicio.textContent = texto;                        // Le asigna el texto ingresado
        listaServicios.appendChild(nuevoServicio);                // Lo agrega a la lista
        actualizarContador();                                      // Actualiza el contador
    } else if (texto !== null) {                                  // Si el usuario dio OK pero vacío
        alert("El nombre no puede estar vacío");                  // Muestra alerta
    }
})

// 5. EVENTO ELIMINAR ÚLTIMO SERVICIO
btnElinarServicio.addEventListener('click', ()=>{                 // Al hacer clic
    if (listaServicios.lastElementChild)                          // Si hay al menos un elemento
        listaServicios.removeChild(listaServicios.lastElementChild) // Elimina el último
        actualizarContador();                                      // Actualiza el contador
    }
)

// 6. EVENTO ELIMINAR CON DOBLE CLIC
listaServicios.addEventListener('dblclick', (e) => {              // Al hacer doble clic en la lista
    if (e.target.tagName === 'LI') {                              // Si el elemento clickeado es un li
        e.target.remove();                                         // Elimina ese li específico
        actualizarContador();                                      // Actualiza el contador
    }
});

// 7. MODO OSCURO CON LOCALSTORAGE
if (localStorage.getItem('modoOscuro') === 'true') {              // Si antes activó modo oscuro
    document.body.classList.add('modo-oscuro');                   // Actívalo al cargar
}

btnModoOscuro.addEventListener('click', () => {                    // Al hacer clic en botón modo oscuro
    document.body.classList.toggle('modo-oscuro');                // Alterna la clase (la pone o quita)
    
    localStorage.setItem('modoOscuro', document.body.classList.contains('modo-oscuro')); // Guarda el estado actual
});

// 8. EVENTO ESCRITURA EN TIEMPO REAL
campoTexto.addEventListener('keyup', ()=>{                         // Cada vez que suelta una tecla
    resultado.textContent="Escribiendo: " + campoTexto.value      // Muestra lo escrito
})

// 9. INICIALIZAR CONTADOR
actualizarContador();                                              // Muestra el contador al cargar la página
```

---


```

---

## 5. TEMPLATE STRINGS Y DATOS DINÁMICOS

### **Template Strings (`` `texto ${variable}` ``)**
```javascript
userElement.innerHTML = `
<h3>${users.name}</h3>
<p>${users.email}</p>
<p>${users.company.name}</p>`
```

**Características:**
- Usan **backticks** `` ` `` en lugar de comillas
- Permiten **saltos de línea** (multilínea)
- Permiten **interpolar variables** con `${}`

### **Accediendo a propiedades de objetos**
```javascript
users.name           // Nombre del usuario
users.email          // Email del usuario
users.company.name   // Nombre de la compañía (objeto dentro de objeto)
```

```

---

##  EXPLICACIÓN LÍNEA POR LÍNEA

```javascript
// 1. OBTENER ELEMENTOS DEL DOM
const btnCargarUsuarios = document.getElementById("btnCargarUsuarios"); // Botón para cargar
const contenedorUsuario = document.getElementById("contenedorUsuarios"); // Div donde se mostrarán

// 2. EVENTO CLICK EN EL BOTÓN
btnCargarUsuarios.addEventListener('click', () => {  // Cuando el usuario hace clic
    
    // 3. MOSTRAR MENSAJE DE CARGA
    contenedorUsuario.innerHTML = "<p>Cargando usuarios...</p>"; // Feedback visual inmediato
    
    // 4. INICIAR PETICIÓN A LA API
    fetch("https://jsonplaceholder.typicode.com/users") // Pide datos a la API
    
    // 5. PRIMER .then() - CUANDO LLEGA LA RESPUESTA
    .then(response => response.json()) // Convierte la respuesta de JSON a objeto JS
    
    // 6. SEGUNDO .then() - CUANDO LOS DATOS YA ESTÁN CONVERTIDOS
    .then(users => { // 'users' es el array con los 10 usuarios
        
        // 7. LIMPIAR EL CONTENEDOR
        contenedorUsuario.innerHTML = "" // Borra el mensaje "Cargando usuarios..."
        
        // 8. RECORRER CADA USUARIO
        users.forEach(users => { // Para cada usuario en el array
            
            // 9. CREAR ELEMENTO PARA EL USUARIO ACTUAL
            const userElement = document.createElement("div") // Crea un div vacío
            userElement.classList.add("usuario"); // Le añade la clase CSS "usuario"
            
            // 10. AÑADIR EL CONTENIDO DEL USUARIO
            userElement.innerHTML = `
                <h3>${users.name}</h3>           <!-- Nombre del usuario -->
                <p>${users.email}</p>             <!-- Email del usuario -->
                <p>${users.company.name}</p>`;    <!-- Nombre de la compañía -->
            
            // 11. AGREGAR EL USUARIO AL CONTENEDOR
            contenedorUsuario.appendChild(userElement); // Añade el div al contenedor
        });
    })
}); // Fin del evento
```

---
