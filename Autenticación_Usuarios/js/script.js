// script.js

const usuarios = [
    { email: "admin@test.com", password: "Admin123!", rol: "admin" },
    { email: "user@test.com",  password: "User123!",  rol: "usuario" }
];

const loginForm       = document.getElementById('loginForm');
const mensajeElemento = document.getElementById('mensaje');

function mostrarMensaje(texto, tipo) {
    mensajeElemento.textContent = texto;
    mensajeElemento.className   = tipo;
}

function validarContrasena(password) {
    if (password.length < 8)
        return { valida: false, mensaje: 'La contraseña debe tener al menos 8 caracteres.' };
    if (!/[A-Z]/.test(password))
        return { valida: false, mensaje: 'La contraseña debe contener al menos una mayúscula.' };
    if (!/[0-9]/.test(password))
        return { valida: false, mensaje: 'La contraseña debe contener al menos un número.' };
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        return { valida: false, mensaje: 'La contraseña debe contener al menos un símbolo especial (!@#$%^&*).' };
    return { valida: true, mensaje: 'Contraseña válida.' };
}

function autenticarUsuario(email, password) {
    return usuarios.find(u => u.email === email && u.password === password) || null;
}

function registrarIntento(email, exitoso) {
    const timestamp = new Date().toLocaleString('es-MX');
    console.log(`[${timestamp}] Intento de login — Email: ${email} — Éxito: ${exitoso}`);
}

function redirigirPorRol(usuario) {
    sessionStorage.setItem('usuarioEmail', usuario.email);
    sessionStorage.setItem('usuarioRol',   usuario.rol);
    if (usuario.rol === 'admin') {
        window.location.href = 'dashboard-admin.html';
    } else {
        window.location.href = 'dashboard-usuario.html';
    }
}

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) { mostrarMensaje('Por favor, completa todos los campos.', 'error'); return; }

    const validacion = validarContrasena(password);
    if (!validacion.valida) {
        mostrarMensaje(validacion.mensaje, 'error');
        registrarIntento(email, false);
        return;
    }

    const usuarioAutenticado = autenticarUsuario(email, password);

    if (usuarioAutenticado) {
        registrarIntento(email, true);
        mostrarMensaje('✅ Credenciales correctas. Redirigiendo...', 'success');
        setTimeout(() => redirigirPorRol(usuarioAutenticado), 1000);
    } else {
        registrarIntento(email, false);
        mostrarMensaje('❌ Credenciales incorrectas', 'error');
    }
});