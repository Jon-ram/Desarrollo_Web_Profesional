// js/auth.js

// ===== USUARIO BASE PREDEFINIDO =====
const VALID_USER = {
    email: "demo@atelier.com",
    password: "Atelier123!",
    firstName: "Demo",
    lastName: "Usuario"
};

// ===== ESTADO =====
const state = {
    isLoggingIn: false,
    rememberMe: false
};

// ===== ELEMENTOS DOM =====
const elements = {
    form: document.getElementById('loginForm'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    remember: document.getElementById('remember'),
    recaptcha: document.getElementById('recaptcha'),
    loginBtn: document.getElementById('loginBtn'),
    generalError: document.getElementById('general-error'),
    emailError: document.getElementById('email-error'),
    passwordError: document.getElementById('password-error'),
    recaptchaError: document.getElementById('recaptcha-error'),
    togglePassword: document.getElementById('togglePassword'),
    forgotPasswordBtn: document.getElementById('forgotPasswordBtn'),
    forgotModal: document.getElementById('forgotPasswordModal'),
    closeForgotPassword: document.getElementById('closeForgotPassword'),
    cancelForgotPassword: document.getElementById('cancelForgotPassword'),
    sendRecoveryEmail: document.getElementById('sendRecoveryEmail'),
    recoveryEmail: document.getElementById('recoveryEmail'),
    googleLogin: document.getElementById('googleLogin'),
    facebookLogin: document.getElementById('facebookLogin')
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeLogin();
    initializeEventListeners();
    showToast('Sistema login: solo usuario demo@atelier.com', 'info');
});

/**
 * Inicializa el login
 */
function initializeLogin() {
    // Cargar email recordado si existe
    const rememberedEmail = localStorage.getItem('atelier_remember_email');
    if (rememberedEmail) {
        elements.email.value = rememberedEmail;
        elements.remember.checked = true;
        state.rememberMe = true;
    }
    
    updateLoginButton();
}

/**
 * Inicializa event listeners
 */
function initializeEventListeners() {
    // Toggle contraseña
    elements.togglePassword.addEventListener('click', togglePasswordVisibility);
    
    // Validación en tiempo real
    elements.email.addEventListener('input', handleEmailInput);
    elements.email.addEventListener('blur', () => validateEmail());
    
    elements.password.addEventListener('input', handlePasswordInput);
    elements.password.addEventListener('blur', () => validatePassword());
    
    elements.remember.addEventListener('change', (e) => {
        state.rememberMe = e.target.checked;
    });
    
    elements.recaptcha.addEventListener('change', () => {
        hideError(elements.recaptchaError);
    });
    
    // Submit del formulario
    elements.form.addEventListener('submit', handleLogin);
    
    // Forgot password modal
    elements.forgotPasswordBtn.addEventListener('click', openForgotModal);
    elements.closeForgotPassword.addEventListener('click', closeForgotModal);
    elements.cancelForgotPassword.addEventListener('click', closeForgotModal);
    elements.sendRecoveryEmail.addEventListener('click', handlePasswordRecovery);
    
    // Click fuera del modal para cerrar
    elements.forgotModal.addEventListener('click', (e) => {
        if (e.target === elements.forgotModal) {
            closeForgotModal();
        }
    });
    
    // Social login
    elements.googleLogin.addEventListener('click', () => handleSocialLogin('Google'));
    elements.facebookLogin.addEventListener('click', () => handleSocialLogin('Facebook'));
}

/**
 * Alterna visibilidad de contraseña
 */
function togglePasswordVisibility() {
    const type = elements.password.type === 'password' ? 'text' : 'password';
    elements.password.type = type;
    
    const icon = elements.togglePassword.querySelector('span');
    icon.textContent = type === 'password' ? 'visibility' : 'visibility_off';
}

/**
 * Maneja input de email
 */
function handleEmailInput() {
    hideError(elements.emailError);
    hideError(elements.generalError);
    hideError(elements.recaptchaError);
    updateLoginButton();
}

/**
 * Maneja input de password
 */
function handlePasswordInput() {
    hideError(elements.passwordError);
    hideError(elements.generalError);
    hideError(elements.recaptchaError);
    updateLoginButton();
}

/**
 * Valida email
 */
function validateEmail() {
    const email = elements.email.value.trim();
    
    if (!email) {
        showError(elements.emailError, 'Por favor, ingresa tu correo electrónico');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError(elements.emailError, 'Ingresa un email válido');
        return false;
    }
    
    hideError(elements.emailError);
    return true;
}

/**
 * Valida contraseña
 */
function validatePassword() {
    const password = elements.password.value.trim();
    
    if (!password) {
        showError(elements.passwordError, 'Por favor, ingresa tu contraseña');
        return false;
    }
    
    hideError(elements.passwordError);
    return true;
}

/**
 * Valida reCAPTCHA
 */
function validateRecaptcha() {
    return elements.recaptcha.checked;
}

/**
 * Actualiza estado del botón de login
 */
function updateLoginButton() {
    const email = elements.email.value.trim();
    const password = elements.password.value.trim();
    
    elements.loginBtn.disabled = !(email && password);
}

/**
 * Maneja el login
 */
async function handleLogin(e) {
    e.preventDefault();
    
    // Resetear errores
    hideAllErrors();
    
    // Validar campos
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isRecaptchaValid = validateRecaptcha();
    
    if (!isEmailValid || !isPasswordValid) {
        return;
    }
    
    if (!isRecaptchaValid) {
        showError(elements.recaptchaError, 'Por favor, completa la verificación de seguridad');
        showToast('Por favor, completa la verificación de seguridad', 'error');
        return;
    }
    
    // Mostrar loading
    setLoadingState(true);
    
    // Simular delay de autenticación
    setTimeout(() => {
        const email = elements.email.value.trim().toLowerCase();
        const password = elements.password.value.trim();
        
        // Validar contra usuario base
        if (email === VALID_USER.email && password === VALID_USER.password) {
            // Login exitoso
            handleSuccessfulLogin();
        } else {
            // Login fallido
            handleFailedLogin();
        }
        
        setLoadingState(false);
    }, 1000);
}

/**
 * Maneja login exitoso
 */
function handleSuccessfulLogin() {
    // Guardar email si "recordar sesión" está marcado
    if (state.rememberMe) {
        localStorage.setItem('atelier_remember_email', elements.email.value.trim());
    } else {
        localStorage.removeItem('atelier_remember_email');
    }
    
    // Guardar sesión (simulado)
    sessionStorage.setItem('atelier_user', JSON.stringify({
        email: VALID_USER.email,
        name: VALID_USER.firstName,
        loggedIn: true
    }));
    
    showToast(`¡Bienvenido/a ${VALID_USER.firstName}!`, 'success');
    
    // Cambiar texto del botón
    elements.loginBtn.textContent = '¡Acceso Concedido!';
    elements.loginBtn.style.backgroundColor = '#10b981';
    
    // Redirigir al index
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}

/**
 * Maneja login fallido
 */
function handleFailedLogin() {
    showError(elements.generalError, 'Email o contraseña incorrectos');
    showToast('Email o contraseña incorrectos', 'error');
    
    // Agregar animación de shake
    elements.form.classList.add('error-shake');
    setTimeout(() => {
        elements.form.classList.remove('error-shake');
    }, 500);
    
    // Enfocar campo de contraseña
    elements.password.focus();
}

/**
 * Establece estado de loading
 */
function setLoadingState(isLoading) {
    state.isLoggingIn = isLoading;
    
    if (isLoading) {
        elements.loginBtn.disabled = true;
        elements.loginBtn.innerHTML = `
            <span class="spinner"></span>
            Iniciando sesión...
        `;
    } else {
        elements.loginBtn.disabled = false;
        elements.loginBtn.innerHTML = 'Iniciar sesión';
        elements.loginBtn.style.backgroundColor = '';
    }
}

/**
 * Maneja login social
 */
function handleSocialLogin(provider) {
    showToast(`Login con ${provider} no disponible - Solo usuario demo`, 'info');
}

/**
 * Abre modal de recuperación
 */
function openForgotModal() {
    elements.forgotModal.classList.remove('hidden');
    setTimeout(() => {
        elements.recoveryEmail.focus();
    }, 100);
}

/**
 * Cierra modal de recuperación
 */
function closeForgotModal() {
    elements.forgotModal.classList.add('hidden');
    elements.recoveryEmail.value = '';
}

/**
 * Maneja recuperación de contraseña
 */
function handlePasswordRecovery() {
    const email = elements.recoveryEmail.value.trim();
    
    if (!email) {
        showToast('Por favor ingresa un correo electrónico', 'warning');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Ingresa un email válido', 'error');
        return;
    }
    
    // Simular envío
    elements.sendRecoveryEmail.disabled = true;
    elements.sendRecoveryEmail.textContent = 'Enviando...';
    
    setTimeout(() => {
        if (email.toLowerCase() === VALID_USER.email) {
            showToast(`Enlace de recuperación enviado a ${email}`, 'success');
        } else {
            showToast('No se encontró una cuenta con ese email', 'error');
        }
        
        elements.sendRecoveryEmail.disabled = false;
        elements.sendRecoveryEmail.textContent = 'Enviar enlace';
        closeForgotModal();
    }, 1000);
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Muestra error en elemento
 */
function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
    }
}

/**
 * Oculta error
 */
function hideError(element) {
    if (element) {
        element.classList.add('hidden');
    }
}

/**
 * Oculta todos los errores
 */
function hideAllErrors() {
    hideError(elements.emailError);
    hideError(elements.passwordError);
    hideError(elements.generalError);
    hideError(elements.recaptchaError);
}

/**
 * Muestra notificación
 */
function showToast(message, type = 'success') {
    if (window.NotificationManager) {
        window.NotificationManager.show(message, type);
    } else {
        // Fallback si no existe NotificationManager
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="material-symbols-outlined">
                ${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
            </span>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
        
        toast.addEventListener('click', () => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        });
    }
}