// src/components/pages/Registro.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Registro() {
    const navigate = useNavigate();
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        humanVerification: false,
        terms: false,
        privacy: false
    });

    // Estado de errores
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Estado para modales
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    
    // Estado para fuerza de contraseña
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        text: 'Débil',
        class: 'bg-red-500 w-1/4'
    });

    // Requisitos de contraseña
    const [passwordReqs, setPasswordReqs] = useState({
        length: false,
        uppercase: false,
        number: false,
        special: false
    });

    // Validar campo individual
    const validateField = (name, value) => {
        let error = '';

        switch(name) {
            case 'firstName':
            case 'lastName':
                if (!value || value.trim() === '') {
                    error = 'Este campo es obligatorio';
                } else if (value.length < 2) {
                    error = 'Mínimo 2 caracteres';
                } else if (value.length > 40) {
                    error = 'Máximo 40 caracteres';
                } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                    error = 'Solo letras y espacios';
                }
                break;

            case 'email':
                if (!value || value.trim() === '') {
                    error = 'Este campo es obligatorio';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Ingresa un email válido';
                } else if (value.length > 30) {
                    error = 'Máximo 30 caracteres';
                }
                break;

            case 'phone':
                if (!value || value.trim() === '') {
                    error = 'Este campo es obligatorio';
                } else {
                    const phoneDigits = value.replace(/\D/g, '');
                    if (!/^\d+$/.test(value)) {
                        error = 'Solo se permiten números';
                    } else if (phoneDigits.length < 10) {
                        error = 'Debe tener al menos 10 dígitos';
                    } else if (phoneDigits.length > 15) {
                        error = 'Máximo 15 dígitos';
                    }
                }
                break;

            case 'password':
                if (!value || value.trim() === '') {
                    error = 'Este campo es obligatorio';
                } else {
                    const reqs = {
                        length: value.length >= 8,
                        uppercase: /[A-Z]/.test(value),
                        number: /\d/.test(value),
                        special: /[!@#$%^&*]/.test(value)
                    };
                    setPasswordReqs(reqs);

                    if (value.length < 8) {
                        error = 'Mínimo 8 caracteres';
                    } else if (value.length > 15) {
                        error = 'Máximo 15 caracteres';
                    } else if (!reqs.uppercase) {
                        error = 'Al menos una mayúscula';
                    } else if (!reqs.number) {
                        error = 'Al menos un número';
                    } else if (!reqs.special) {
                        error = 'Al menos un carácter especial';
                    }
                }
                break;

            case 'confirmPassword':
                if (!value || value.trim() === '') {
                    error = 'Este campo es obligatorio';
                } else if (value !== formData.password) {
                    error = 'Las contraseñas no coinciden';
                }
                break;

            case 'humanVerification':
                if (!value) {
                    error = 'Debes confirmar que no eres un robot';
                }
                break;

            case 'terms':
                if (!value) {
                    error = 'Debes aceptar los términos y condiciones';
                }
                break;

            case 'privacy':
                // Opcional
                break;
        }

        return error;
    };

    // Validar campo cuando pierde el foco
    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const error = validateField(field, formData[field]);
        if (error) {
            setErrors(prev => ({ ...prev, [field]: error }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    // Manejar cambios en inputs
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Validar en tiempo real si el campo ya ha sido tocado
        if (touched[name]) {
            const error = validateField(name, newValue);
            if (error) {
                setErrors(prev => ({ ...prev, [name]: error }));
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        }

        // Limpiar error general
        setGeneralError('');

        // Validaciones especiales para contraseña
        if (name === 'password') {
            updatePasswordStrength(newValue);
            // También validar confirmPassword si ya tiene valor
            if (formData.confirmPassword) {
                const confirmError = validateField('confirmPassword', formData.confirmPassword);
                if (confirmError) {
                    setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
                }
            }
        }

        if (name === 'confirmPassword' && formData.password) {
            const error = validateField('confirmPassword', newValue);
            if (error) {
                setErrors(prev => ({ ...prev, confirmPassword: error }));
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.confirmPassword;
                    return newErrors;
                });
            }
        }
    };

    // Actualizar fuerza de contraseña
    const updatePasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*]/.test(password)) score++;

        const strengths = [
            { class: 'bg-red-500 w-1/4', text: 'Débil' },
            { class: 'bg-orange-500 w-2/4', text: 'Regular' },
            { class: 'bg-green-500 w-3/4', text: 'Buena' },
            { class: 'bg-green-600 w-full', text: 'Fuerte' }
        ];

        setPasswordStrength({
            score,
            ...strengths[score] || strengths[0]
        });
    };

    // Validar todo el formulario
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Marcar todos los campos como tocados
        const allTouched = {};
        Object.keys(formData).forEach(key => {
            allTouched[key] = true;
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setTouched(allTouched);
        setErrors(newErrors);
        return isValid;
    };

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Simular registro exitoso
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } else {
            setGeneralError('Por favor, completa todos los campos correctamente');
        }
    };

    // Verificar si el formulario es válido
    const isFormValid = () => {
        return !Object.keys(errors).length && 
               formData.firstName?.trim() && 
               formData.lastName?.trim() && 
               formData.email?.trim() && 
               formData.phone?.trim() && 
               formData.password?.trim() && 
               formData.confirmPassword?.trim() && 
               formData.humanVerification && 
               formData.terms;
    };

    // Estilo condicional para inputs
    const inputClassName = (fieldName) => {
        const baseClass = "w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all";
        if (touched[fieldName] && errors[fieldName]) {
            return `${baseClass} border-red-500 bg-red-500/10 focus:ring-red-500`;
        }
        if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
            return `${baseClass} border-green-500 bg-green-500/5 focus:ring-green-500`;
        }
        return `${baseClass} border-slate-700`;
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md">
                    {/* Header del Formulario */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-display font-bold text-white mb-2">
                            Crear cuenta
                        </h1>
                        <p className="text-slate-400">
                            Únete a la comunidad ATELIER
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre(s) */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Nombre(s) <span className="text-primary">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                onBlur={() => handleBlur('firstName')}
                                className={inputClassName('firstName')}
                                placeholder="Ej. María Elena"
                            />
                            {touched.firstName && errors.firstName && (
                                <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                            )}
                        </div>

                        {/* Apellido(s) */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Apellido(s) <span className="text-primary">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                onBlur={() => handleBlur('lastName')}
                                className={inputClassName('lastName')}
                                placeholder="Ej. Rodríguez López"
                            />
                            {touched.lastName && errors.lastName && (
                                <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                            )}
                        </div>

                        {/* Correo electrónico */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Correo electrónico <span className="text-primary">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={() => handleBlur('email')}
                                className={inputClassName('email')}
                                placeholder="tucorreo@ejemplo.com"
                            />
                            {touched.email && errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Teléfono <span className="text-primary">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={() => handleBlur('phone')}
                                className={inputClassName('phone')}
                                placeholder="Ej. 3001234567"
                            />
                            {touched.phone && errors.phone && (
                                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                            )}
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Contraseña <span className="text-primary">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('password')}
                                    className={`${inputClassName('password')} pr-10`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-primary"
                                >
                                    <span className="material-symbols-outlined">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                            
                            {/* Indicador de fortaleza */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                        <div className={`h-full ${passwordStrength.class} transition-all`}></div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Seguridad: {passwordStrength.text}
                                    </p>
                                </div>
                            )}
                            
                            {/* Requisitos de contraseña */}
                            {formData.password && (
                                <div className="mt-3 space-y-1 text-xs">
                                    <div className="flex items-center text-slate-500">
                                        <span className={`material-symbols-outlined text-xs mr-1 ${
                                            passwordReqs.length ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                            {passwordReqs.length ? 'check' : 'close'}
                                        </span>
                                        Al menos 8 caracteres
                                    </div>
                                    <div className="flex items-center text-slate-500">
                                        <span className={`material-symbols-outlined text-xs mr-1 ${
                                            passwordReqs.uppercase ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                            {passwordReqs.uppercase ? 'check' : 'close'}
                                        </span>
                                        Al menos una mayúscula
                                    </div>
                                    <div className="flex items-center text-slate-500">
                                        <span className={`material-symbols-outlined text-xs mr-1 ${
                                            passwordReqs.number ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                            {passwordReqs.number ? 'check' : 'close'}
                                        </span>
                                        Al menos un número
                                    </div>
                                    <div className="flex items-center text-slate-500">
                                        <span className={`material-symbols-outlined text-xs mr-1 ${
                                            passwordReqs.special ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                            {passwordReqs.special ? 'check' : 'close'}
                                        </span>
                                        Al menos un carácter especial (!@#$%^&*)
                                    </div>
                                </div>
                            )}
                            
                            {touched.password && errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirmación de contraseña */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Confirmar contraseña <span className="text-primary">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('confirmPassword')}
                                    className={`${inputClassName('confirmPassword')} pr-10`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-primary"
                                >
                                    <span className="material-symbols-outlined">
                                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                            {touched.confirmPassword && errors.confirmPassword && (
                                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Verificación Humana */}
                        <div className="p-4 bg-slate-800/50 rounded-lg">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="humanVerification"
                                    checked={formData.humanVerification}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('humanVerification')}
                                    className="h-5 w-5 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-slate-400">
                                    Marque la casilla para confirmar que no es un robot
                                </span>
                            </label>
                            {touched.humanVerification && errors.humanVerification && (
                                <p className="text-sm text-red-500 mt-1">{errors.humanVerification}</p>
                            )}
                        </div>

                        {/* Términos y Condiciones */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                name="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                                onBlur={() => handleBlur('terms')}
                                className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary"
                            />
                            <label className="text-sm text-slate-400">
                                Acepto los{' '}
                                <button
                                    type="button"
                                    onClick={() => setShowTermsModal(true)}
                                    className="text-primary hover:text-red-500 underline"
                                >
                                    Términos y Condiciones
                                </button>
                                {' '}<span className="text-primary">*</span>
                            </label>
                        </div>
                        {touched.terms && errors.terms && (
                            <p className="text-sm text-red-500 mt-1">{errors.terms}</p>
                        )}

                        {/* Aviso de Privacidad */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                name="privacy"
                                checked={formData.privacy}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary"
                            />
                            <label className="text-sm text-slate-400">
                                He leído y acepto el{' '}
                                <button
                                    type="button"
                                    onClick={() => setShowPrivacyModal(true)}
                                    className="text-primary hover:text-red-500 underline"
                                >
                                    Aviso de Privacidad
                                </button>
                            </label>
                        </div>

                        {/* Error general */}
                        {generalError && (
                            <div className="text-center text-sm text-red-500 bg-red-500/10 p-3 rounded-lg">
                                {generalError}
                            </div>
                        )}

                        {/* Botón de Registro */}
                        <button
                            type="submit"
                            disabled={!isFormValid()}
                            className="w-full bg-primary hover:bg-red-500 text-white py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Crear cuenta
                        </button>

                        {/* Enlace a Login */}
                        <div className="text-center text-sm text-slate-500">
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login" className="text-primary hover:text-red-500 font-medium">
                                Inicia sesión aquí
                            </Link>
                        </div>
                    </form>
                </div>
            </main>

            {/* Modal de Términos y Condiciones */}
            {showTermsModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowTermsModal(false)}>
                    <div className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-display font-bold text-white">Términos y Condiciones</h3>
                                <button onClick={() => setShowTermsModal(false)} className="text-slate-500 hover:text-primary">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="text-slate-300 max-h-[60vh] overflow-y-auto pr-4">
                                <p className="mb-4"><strong className="text-white">TÉRMINOS Y CONDICIONES DE ATELIER</strong></p>
                                <p className="mb-4">Al registrarte, aceptas nuestros términos y condiciones...</p>
                                <p className="mb-4">1. Aceptas recibir comunicaciones de nuestra parte.</p>
                                <p className="mb-4">2. Tus datos serán tratados conforme a nuestra política de privacidad.</p>
                                <p className="mb-4">3. Puedes cancelar tu suscripción en cualquier momento.</p>
                            </div>
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, terms: true }));
                                        setShowTermsModal(false);
                                    }}
                                    className="bg-primary hover:bg-red-500 text-white px-6 py-2 rounded-lg font-medium"
                                >
                                    Aceptar Términos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Aviso de Privacidad */}
            {showPrivacyModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowPrivacyModal(false)}>
                    <div className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-display font-bold text-white">Aviso de Privacidad</h3>
                                <button onClick={() => setShowPrivacyModal(false)} className="text-slate-500 hover:text-primary">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="text-slate-300 max-h-[60vh] overflow-y-auto pr-4">
                                <p className="mb-4"><strong className="text-white">AVISO DE PRIVACIDAD</strong></p>
                                <p className="mb-4">Tu información está protegida y no se almacena en este momento...</p>
                                <p className="mb-4">Recopilamos tu nombre, email y teléfono para mejorar tu experiencia.</p>
                                <p className="mb-4">No compartimos tus datos con terceros sin tu consentimiento.</p>
                            </div>
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, privacy: true }));
                                        setShowPrivacyModal(false);
                                    }}
                                    className="bg-primary hover:bg-red-500 text-white px-6 py-2 rounded-lg font-medium"
                                >
                                    Entendido
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Registro;