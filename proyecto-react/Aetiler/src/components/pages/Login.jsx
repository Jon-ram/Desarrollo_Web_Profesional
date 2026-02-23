// src/components/pages/Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimpleHeader from '../layout/SimpleHeader';

// Referencia a grecaptcha de window
const grecaptcha = window.grecaptcha;

function Login() {
    const navigate = useNavigate();
    const recaptchaRef = useRef(null);
    
    // Usuario válido (demo)
    const VALID_USER = {
        email: "demo@atelier.com",
        password: "Atelier123!",
        firstName: "Demo",
        lastName: "Usuario"
    };

    // Estado del formulario
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    // Estado de errores
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [recaptchaError, setRecaptchaError] = useState(false);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    
    // Estado para modal de recuperación
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [recoveryError, setRecoveryError] = useState('');
    const [recoverySuccess, setRecoverySuccess] = useState(false);

    // Cargar reCAPTCHA
    useEffect(() => {
        // Verificar si reCAPTCHA ya está cargado
        if (window.grecaptcha) {
            setRecaptchaLoaded(true);
            return;
        }

        // Definir callback global para cuando cargue reCAPTCHA
        window.onRecaptchaLoad = () => {
            setRecaptchaLoaded(true);
        };

        // Si ya hay un script de reCAPTCHA pero no ha cargado, esperar
        if (document.querySelector('script[src*="recaptcha"]')) {
            return;
        }

        // Cargar el script si no existe
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        return () => {
            // Limpiar callback
            window.onRecaptchaLoad = undefined;
        };
    }, []);

    // Inicializar reCAPTCHA cuando esté cargado
    useEffect(() => {
        if (recaptchaLoaded && recaptchaRef.current) {
            try {
                window.grecaptcha.render(recaptchaRef.current, {
                    sitekey: '6Le0UGcsAAAAAEd0bNIj7FP4sgYfBGwPKlnLwquV',
                    callback: (token) => {
                        setRecaptchaToken(token);
                        setRecaptchaError(false);
                    },
                    'expired-callback': () => {
                        setRecaptchaToken('');
                        setRecaptchaError(true);
                    }
                });
            } catch (error) {
                console.error('Error al inicializar reCAPTCHA:', error);
            }
        }
    }, [recaptchaLoaded]);

    // Cargar email recordado al iniciar
    useEffect(() => {
        const rememberedEmail = localStorage.getItem('atelier_remember_email');
        if (rememberedEmail) {
            setFormData(prev => ({ ...prev, email: rememberedEmail, remember: true }));
        }
        
        // Mostrar toast de información
        showToast('Sistema login: solo usuario demo@atelier.com', 'info');
    }, []);

    // Función para mostrar notificaciones
    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in flex items-center gap-2 max-w-md ${
            type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`;
        toast.innerHTML = `
            <span class="material-symbols-outlined text-sm">
                ${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
            </span>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
        
        toast.addEventListener('click', () => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        });
    };

    // Validar campo individual
    const validateField = (name, value) => {
        let error = '';

        switch(name) {
            case 'email':
                if (!value || value.trim() === '') {
                    error = 'Por favor, ingresa tu correo electrónico';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Ingresa un email válido';
                }
                break;

            case 'password':
                if (!value || value.trim() === '') {
                    error = 'Por favor, ingresa tu contraseña';
                }
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

        // Limpiar errores generales
        setGeneralError('');
    };

    // Validar reCAPTCHA
    const validateRecaptcha = () => {
        if (!recaptchaToken) {
            setRecaptchaError(true);
            return false;
        }
        return true;
    };

    // Resetear reCAPTCHA
    const resetRecaptcha = () => {
        if (window.grecaptcha) {
            window.grecaptcha.reset();
            setRecaptchaToken('');
        }
    };

    // Validar todo el formulario
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Validar email
        const emailError = validateField('email', formData.email);
        if (emailError) {
            newErrors.email = emailError;
            isValid = false;
        }

        // Validar password
        const passwordError = validateField('password', formData.password);
        if (passwordError) {
            newErrors.password = passwordError;
            isValid = false;
        }

        // Validar reCAPTCHA
        if (!validateRecaptcha()) {
            isValid = false;
        }

        setErrors(newErrors);
        setTouched({ email: true, password: true });
        
        return isValid;
    };

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Resetear errores
        setGeneralError('');
        setRecaptchaError(false);
        
        if (validateForm()) {
            setIsLoading(true);
            
            // Aquí deberías enviar el token de reCAPTCHA a tu backend para validarlo
            console.log('reCAPTCHA Token:', recaptchaToken);
            
            // Simular proceso de login
            setTimeout(() => {
                // Validar contra usuario demo
                if (formData.email.toLowerCase() === VALID_USER.email && 
                    formData.password === VALID_USER.password) {
                    
                    showToast(`¡Bienvenido/a ${VALID_USER.firstName}!`, 'success');
                    
                    // Guardar sesión si marcó "Recordar"
                    if (formData.remember) {
                        localStorage.setItem('atelier_remember_email', formData.email);
                    } else {
                        localStorage.removeItem('atelier_remember_email');
                    }
                    
                    // Resetear reCAPTCHA
                    resetRecaptcha();
                    
                    // Redirigir al inicio
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                    
                } else {
                    setGeneralError('Email o contraseña incorrectos');
                    setIsLoading(false);
                    resetRecaptcha();
                }
            }, 1000);
        }
    };

    // Manejar recuperación de contraseña
    const handleForgotPassword = (e) => {
        e.preventDefault();
        setRecoveryError('');
        
        if (!recoveryEmail || !recoveryEmail.trim()) {
            setRecoveryError('Por favor, ingresa tu correo electrónico');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail)) {
            setRecoveryError('Ingresa un email válido');
            return;
        }
        
        // Simular envío
        setIsLoading(true);
        
        setTimeout(() => {
            if (recoveryEmail.toLowerCase() === VALID_USER.email) {
                setRecoverySuccess(true);
                showToast(`Enlace de recuperación enviado a ${recoveryEmail}`, 'success');
                
                setTimeout(() => {
                    setShowForgotModal(false);
                    setRecoverySuccess(false);
                    setRecoveryEmail('');
                }, 2000);
            } else {
                setRecoveryError('No se encontró una cuenta con ese email');
            }
            setIsLoading(false);
        }, 1000);
    };

    // Estilo condicional para inputs
    const inputClassName = (fieldName) => {
        const baseClass = "w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300";
        if (touched[fieldName] && errors[fieldName]) {
            return `${baseClass} border-red-500 bg-red-50 dark:bg-red-500/10 focus:ring-red-500`;
        }
        if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
            return `${baseClass} border-green-500 bg-green-50 dark:bg-green-500/5 focus:ring-green-500`;
        }
        return `${baseClass} border-slate-300 dark:border-slate-700`;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col transition-colors duration-300">
            <SimpleHeader />
            
            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md">
                    {/* Card de Login */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl transition-colors duration-300">
                        {/* Logo y Bienvenida */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full mb-4 shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-primary text-3xl drop-shadow-[0_0_8px_rgba(240,98,93,0.8)]">
                                    account_circle
                                </span>
                            </div>
                            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
                                Bienvenido de vuelta
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                                Ingresa a tu cuenta ATELIER
                            </p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                                    Correo electrónico <span className="text-primary">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('email')}
                                        className={inputClassName('email')}
                                        placeholder="demo@atelier.com"
                                    />
                                    <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 dark:text-slate-500">
                                        mail
                                    </span>
                                </div>
                                {touched.email && errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Contraseña */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
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
                                        className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                {touched.password && errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Mensaje de error general */}
                            {generalError && (
                                <div className="text-center text-sm text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-200 dark:border-red-800 transition-colors duration-300">
                                    {generalError}
                                </div>
                            )}

                            {/* Google reCAPTCHA */}
                            <div className="flex flex-col items-center">
                                <div 
                                    ref={recaptchaRef}
                                    className="g-recaptcha"
                                    data-sitekey="6Le0UGcsAAAAAEd0bNIj7FP4sgYfBGwPKlnLwquV"
                                ></div>
                                {recaptchaError && (
                                    <p className="text-sm text-red-500 mt-2">
                                        Por favor, completa la verificación de seguridad
                                    </p>
                                )}
                                {!recaptchaLoaded && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 transition-colors duration-300">
                                        Cargando verificación de seguridad...
                                    </p>
                                )}
                            </div>

                            {/* Recordar y Olvidé contraseña */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={formData.remember}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-primary focus:ring-primary transition-colors duration-300"
                                    />
                                    <span className="ml-2 text-sm text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                                        Recordar sesión
                                    </span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotModal(true)}
                                    className="text-sm text-slate-700 dark:text-slate-300 font-medium hover:text-primary transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>

                            {/* Botón de Login */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-red-500 text-white py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="inline-block animate-spin">⟳</span>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    'Iniciar sesión'
                                )}
                            </button>

                            {/* Divisor */}
                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-slate-200 dark:border-slate-700 transition-colors duration-300"></div>
                                <span className="flex-shrink mx-4 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                                    O continúa con
                                </span>
                                <div className="flex-grow border-t border-slate-200 dark:border-slate-700 transition-colors duration-300"></div>
                            </div>

                            {/* Login con redes sociales (simulado) */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => showToast('Login con Google no disponible - Solo usuario demo', 'info')}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span className="text-sm font-medium">Google</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => showToast('Login con Facebook no disponible - Solo usuario demo', 'info')}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary transition-all duration-300"
                                >
                                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    <span className="text-sm font-medium">Facebook</span>
                                </button>
                            </div>

                            {/* Enlace a Registro */}
                            <div className="text-center text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                                ¿No tienes una cuenta?{' '}
                                <Link to="/registro" className="text-primary hover:text-red-500 font-bold transition-colors">
                                    Regístrate aquí
                                </Link>
                            </div>
                        </form>

                        {/* Demo user info - ahora más integrado */}
                        <div className="mt-8 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20 dark:border-primary/30 transition-colors duration-300">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary">info</span>
                                <div>
                                    <h4 className="font-medium text-sm text-slate-900 dark:text-white mb-2">
                                        Usuario de prueba:
                                    </h4>
                                    <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">demo@atelier.com</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Contraseña: Atelier123!</p>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                                        * Único usuario válido para iniciar sesión
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal de Recuperación de Contraseña */}
            {showForgotModal && (
                <div 
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={() => setShowForgotModal(false)}
                >
                    <div 
                        className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-700 shadow-xl transition-colors duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                                Recuperar contraseña
                            </h3>
                            <button
                                onClick={() => setShowForgotModal(false)}
                                className="text-slate-400 hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        {recoverySuccess ? (
                            <div className="text-center py-4">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-green-500 text-3xl">
                                        check_circle
                                    </span>
                                </div>
                                <p className="text-slate-900 dark:text-white mb-2">¡Correo enviado!</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Revisa tu bandeja de entrada para restablecer tu contraseña.
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                                </p>
                                
                                <form onSubmit={handleForgotPassword}>
                                    <div className="mb-4">
                                        <input
                                            type="email"
                                            value={recoveryEmail}
                                            onChange={(e) => {
                                                setRecoveryEmail(e.target.value);
                                                setRecoveryError('');
                                            }}
                                            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                                            placeholder="tu@email.com"
                                        />
                                        {recoveryError && (
                                            <p className="text-sm text-red-500 mt-2">{recoveryError}</p>
                                        )}
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowForgotModal(false)}
                                            className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 bg-primary hover:bg-red-500 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                                        >
                                            {isLoading ? 'Enviando...' : 'Enviar enlace'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Estilos para animaciones */}
            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideOut {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* Estilos para reCAPTCHA en modo oscuro */
                .g-recaptcha {
                    transform: scale(0.9);
                    transform-origin: center;
                    margin: 0 auto;
                }
                
                @media (max-width: 640px) {
                    .g-recaptcha {
                        transform: scale(0.8);
                    }
                }
            `}</style>
        </div>
    );
}

export default Login;