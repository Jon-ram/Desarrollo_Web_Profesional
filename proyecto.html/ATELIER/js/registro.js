// js/registro.js

// ===== ESTADO GLOBAL =====
const state = {
    isSubmitting: false,
    formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        humanVerification: false,
        terms: false,
        privacy: false
    },
    validations: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        password: false,
        confirmPassword: false,
        humanVerification: false,
        terms: false,
        privacy: true // Opcional, por eso true por defecto
    }
};

// ===== ELEMENTOS DOM =====
const elements = {
    form: document.getElementById('registroForm'),
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    humanVerification: document.getElementById('humanVerification'),
    terms: document.getElementById('terms'),
    privacy: document.getElementById('privacy'),
    submitBtn: document.getElementById('submitBtn'),
    generalError: document.getElementById('general-error'),
    
    // Password toggle
    togglePassword: document.getElementById('togglePassword'),
    toggleConfirmPassword: document.getElementById('toggleConfirmPassword'),
    
    // Password strength
    strengthBar: document.getElementById('strengthBar'),
    strengthText: document.getElementById('strengthText'),
    
    // Requirements
    reqLength: document.getElementById('req-length'),
    reqUppercase: document.getElementById('req-uppercase'),
    reqNumber: document.getElementById('req-number'),
    reqSpecial: document.getElementById('req-special'),
    
    // Modals
    termsModal: document.getElementById('termsModal'),
    privacyModal: document.getElementById('privacyModal'),
    termsLink: document.getElementById('termsLink'),
    privacyLink: document.getElementById('privacyLink'),
    closeTermsModal: document.getElementById('closeTermsModal'),
    closePrivacyModal: document.getElementById('closePrivacyModal'),
    acceptTerms: document.getElementById('acceptTerms'),
    acceptPrivacy: document.getElementById('acceptPrivacy'),
    
    // Error messages
    firstNameError: document.getElementById('firstName-error'),
    lastNameError: document.getElementById('lastName-error'),
    emailError: document.getElementById('email-error'),
    phoneError: document.getElementById('phone-error'),
    passwordError: document.getElementById('password-error'),
    confirmPasswordError: document.getElementById('confirmPassword-error'),
    humanVerificationError: document.getElementById('humanVerification-error'),
    termsError: document.getElementById('terms-error'),
    privacyError: document.getElementById('privacy-error')
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    showToast('Sistema de registro: validación de campos', 'info');
});

/**
 * Inicializa event listeners
 */
function initializeEventListeners() {
    // Toggle contraseñas
    elements.togglePassword.addEventListener('click', () => togglePassword(elements.password, elements.togglePassword));
    elements.toggleConfirmPassword.addEventListener('click', () => togglePassword(elements.confirmPassword, elements.toggleConfirmPassword));
    
    // Input events con debounce implícito
    elements.firstName.addEventListener('input', () => validateField('firstName'));
    elements.firstName.addEventListener('blur', () => validateField('firstName'));
    
    elements.lastName.addEventListener('input', () => validateField('lastName'));
    elements.lastName.addEventListener('blur', () => validateField('lastName'));
    
    elements.email.addEventListener('input', () => validateField('email'));
    elements.email.addEventListener('blur', () => validateField('email'));
    
    elements.phone.addEventListener('input', () => validateField('phone'));
    elements.phone.addEventListener('blur', () => validateField('phone'));
    
    elements.password.addEventListener('input', () => {
        validateField('password');
        updatePasswordStrength();
        updatePasswordRequirements();
        // También validar confirmPassword si ya tiene valor
        if (elements.confirmPassword.value) {
            validateField('confirmPassword');
        }
    });
    
    elements.confirmPassword.addEventListener('input', () => validateField('confirmPassword'));
    elements.confirmPassword.addEventListener('blur', () => validateField('confirmPassword'));
    
    // Checkboxes
    elements.humanVerification.addEventListener('change', () => validateField('humanVerification'));
    elements.terms.addEventListener('change', () => validateField('terms'));
    elements.privacy.addEventListener('change', () => validateField('privacy'));
    
    // Modals
    elements.termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(elements.termsModal);
    });
    
    elements.privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(elements.privacyModal);
    });
    
    elements.closeTermsModal.addEventListener('click', () => closeModal(elements.termsModal));
    elements.closePrivacyModal.addEventListener('click', () => closeModal(elements.privacyModal));
    elements.acceptTerms.addEventListener('click', () => {
        elements.terms.checked = true;
        validateField('terms');
        closeModal(elements.termsModal);
        showToast('Términos aceptados', 'success');
    });
    
    elements.acceptPrivacy.addEventListener('click', () => {
        elements.privacy.checked = true;
        validateField('privacy');
        closeModal(elements.privacyModal);
        showToast('Aviso de privacidad aceptado', 'success');
    });
    
    // Cerrar modales al hacer clic fuera
    elements.termsModal.addEventListener('click', (e) => {
        if (e.target === elements.termsModal) closeModal(elements.termsModal);
    });
    
    elements.privacyModal.addEventListener('click', (e) => {
        if (e.target === elements.privacyModal) closeModal(elements.privacyModal);
    });
    
    // Submit del formulario
    elements.form.addEventListener('submit', handleSubmit);
}

/**
 * Alterna visibilidad de contraseña
 */
function togglePassword(inputField, toggleButton) {
    const type = inputField.type === 'password' ? 'text' : 'password';
    inputField.type = type;
    
    const icon = toggleButton.querySelector('span');
    icon.textContent = type === 'password' ? 'visibility' : 'visibility_off';
}

/**
 * Abre un modal
 */
function openModal(modal) {
    modal.classList.remove('hidden');
}

/**
 * Cierra un modal
 */
function closeModal(modal) {
    modal.classList.add('hidden');
}

/**
 * Valida un campo específico
 */
function validateField(fieldName) {
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldName) {
        case 'firstName':
        case 'lastName':
            const nameValue = elements[fieldName].value.trim();
            if (!nameValue) {
                isValid = false;
                errorMessage = 'Este campo es obligatorio';
            } else if (nameValue.length < 2) {
                isValid = false;
                errorMessage = 'Mínimo 2 caracteres';
            } else if (nameValue.length > 40) {
                isValid = false;
                errorMessage = 'Máximo 40 caracteres';
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nameValue)) {
                isValid = false;
                errorMessage = 'Solo letras y espacios';
            }
            break;
            
        case 'email':
            const email = elements.email.value.trim();
            if (!email) {
                isValid = false;
                errorMessage = 'Este campo es obligatorio';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                isValid = false;
                errorMessage = 'Ingresa un email válido';
            } else if (email.length > 50) {
                isValid = false;
                errorMessage = 'Máximo 50 caracteres';
            }
            break;
            
        case 'phone':
            const phone = elements.phone.value.trim();
            const phoneDigits = phone.replace(/\D/g, '');
            if (!phone) {
                isValid = false;
                errorMessage = 'Este campo es obligatorio';
            } else if (!/^\d+$/.test(phone)) {
                isValid = false;
                errorMessage = 'Solo números';
            } else if (phoneDigits.length < 10) {
                isValid = false;
                errorMessage = 'Mínimo 10 dígitos';
            } else if (phoneDigits.length > 15) {
                isValid = false;
                errorMessage = 'Máximo 15 dígitos';
            }
            break;
            
        case 'password':
            const password = elements.password.value;
            if (!password) {
                isValid = false;
                errorMessage = 'Este campo es obligatorio';
            } else if (password.length < 8) {
                isValid = false;
                errorMessage = 'Mínimo 8 caracteres';
            } else if (password.length > 20) {
                isValid = false;
                errorMessage = 'Máximo 20 caracteres';
            } else if (!/(?=.*[A-Z])/.test(password)) {
                isValid = false;
                errorMessage = 'Falta una mayúscula';
            } else if (!/(?=.*\d)/.test(password)) {
                isValid = false;
                errorMessage = 'Falta un número';
            } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
                isValid = false;
                errorMessage = 'Falta un carácter especial';
            }
            break;
            
        case 'confirmPassword':
            const confirmPassword = elements.confirmPassword.value;
            const passwordValue = elements.password.value;
            if (!confirmPassword) {
                isValid = false;
                errorMessage = 'Confirma tu contraseña';
            } else if (confirmPassword !== passwordValue) {
                isValid = false;
                errorMessage = 'Las contraseñas no coinciden';
            }
            break;
            
        case 'humanVerification':
            isValid = elements.humanVerification.checked;
            errorMessage = 'Debes confirmar que no eres un robot';
            break;
            
        case 'terms':
            isValid = elements.terms.checked;
            errorMessage = 'Debes aceptar los términos y condiciones';
            break;
            
        case 'privacy':
            isValid = true; // Opcional
            break;
    }
    
    // Actualizar estado
    state.validations[fieldName] = isValid;
    
    // Actualizar UI
    const input = elements[fieldName];
    const errorElement = elements[`${fieldName}Error`];
    
    if (input && input.tagName === 'INPUT' && input.type !== 'checkbox') {
        if (!isValid) {
            input.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.remove('hidden');
            }
            // Shake animation
            input.closest('.form-group')?.classList.add('error-shake');
            setTimeout(() => {
                input.closest('.form-group')?.classList.remove('error-shake');
            }, 500);
        } else {
            input.classList.remove('error');
            if (errorElement) errorElement.classList.add('hidden');
        }
    } else {
        // Para checkboxes
        if (!isValid) {
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.remove('hidden');
            }
        } else {
            if (errorElement) errorElement.classList.add('hidden');
        }
    }
    
    // Actualizar botón de submit
    updateSubmitButton();
    
    return isValid;
}

/**
 * Actualiza la fortaleza de la contraseña
 */
function updatePasswordStrength() {
    const password = elements.password.value;
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    
    const strengths = [
        { class: 'weak', text: 'Débil' },
        { class: 'fair', text: 'Regular' },
        { class: 'good', text: 'Buena' },
        { class: 'strong', text: 'Fuerte' }
    ];
    
    const currentStrength = strengths[score] || strengths[0];
    
    elements.strengthBar.className = `strength-bar-fill ${currentStrength.class}`;
    elements.strengthText.textContent = `Seguridad: ${currentStrength.text}`;
}

/**
 * Actualiza los requisitos de contraseña
 */
function updatePasswordRequirements() {
    const password = elements.password.value;
    
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*]/.test(password)
    };
    
    // Longitud
    updateRequirement(elements.reqLength, requirements.length);
    
    // Mayúscula
    updateRequirement(elements.reqUppercase, requirements.uppercase);
    
    // Número
    updateRequirement(elements.reqNumber, requirements.number);
    
    // Especial
    updateRequirement(elements.reqSpecial, requirements.special);
}

/**
 * Actualiza un requisito individual
 */
function updateRequirement(element, isValid) {
    const icon = element.querySelector('.material-symbols-outlined');
    if (isValid) {
        element.classList.remove('invalid');
        element.classList.add('valid');
        icon.textContent = 'check';
    } else {
        element.classList.remove('valid');
        element.classList.add('invalid');
        icon.textContent = 'close';
    }
}

/**
 * Actualiza el estado del botón de submit
 */
function updateSubmitButton() {
    // Verificar que todos los campos obligatorios sean válidos
    const allValid = 
        state.validations.firstName &&
        state.validations.lastName &&
        state.validations.email &&
        state.validations.phone &&
        state.validations.password &&
        state.validations.confirmPassword &&
        state.validations.humanVerification &&
        state.validations.terms;
    
    elements.submitBtn.disabled = !allValid;
}

/**
 * Maneja el envío del formulario
 */
async function handleSubmit(e) {
    e.preventDefault();
    
    // Ocultar error general
    hideGeneralError();
    
    // Validar todos los campos
    const isValid = validateAllFields();
    
    if (!isValid) {
        showGeneralError('Por favor, completa todos los campos correctamente');
        
        // Enfocar el primer campo inválido
        focusFirstInvalid();
        return;
    }
    
    // Mostrar loading
    setLoadingState(true);
    
    // Simular envío a servidor
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Registro exitoso
        handleSuccessfulRegistration();
        
    } catch (error) {
        showToast('Error al registrar. Intenta nuevamente.', 'error');
        setLoadingState(false);
    }
}

/**
 * Valida todos los campos
 */
function validateAllFields() {
    const fields = [
        'firstName', 'lastName', 'email', 'phone', 
        'password', 'confirmPassword', 'humanVerification', 'terms'
    ];
    
    let isValid = true;
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Privacy es opcional, no afecta la validación
    
    return isValid;
}

/**
 * Enfoca el primer campo inválido
 */
function focusFirstInvalid() {
    const fields = [
        'firstName', 'lastName', 'email', 'phone', 
        'password', 'confirmPassword'
    ];
    
    for (const field of fields) {
        if (!state.validations[field]) {
            elements[field].focus();
            break;
        }
    }
}

/**
 * Maneja registro exitoso
 */
function handleSuccessfulRegistration() {
    showToast('¡Registro exitoso! Redirigiendo a login...', 'success');
    
    elements.submitBtn.textContent = '¡Registro Exitoso!';
    elements.submitBtn.style.backgroundColor = '#10b981';
    
    // Redirigir a login
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

/**
 * Establece estado de loading
 */
function setLoadingState(isLoading) {
    state.isSubmitting = isLoading;
    
    if (isLoading) {
        elements.submitBtn.disabled = true;
        elements.submitBtn.innerHTML = `
            <span class="spinner"></span>
            Procesando...
        `;
    } else {
        elements.submitBtn.disabled = false;
        elements.submitBtn.innerHTML = 'Crear cuenta';
        elements.submitBtn.style.backgroundColor = '';
    }
}

/**
 * Muestra error general
 */
function showGeneralError(message) {
    elements.generalError.textContent = message;
    elements.generalError.classList.remove('hidden');
}

/**
 * Oculta error general
 */
function hideGeneralError() {
    elements.generalError.classList.add('hidden');
}

/**
 * Muestra notificación
 */
function showToast(message, type = 'success') {
    if (window.NotificationManager) {
        window.NotificationManager.show(message, type);
    } else {
        // Fallback
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