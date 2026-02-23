// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="max-w-sm">
                        <h2 className="font-display text-3xl font-bold tracking-tight uppercase mb-3 text-slate-900 dark:text-white transition-colors duration-300">
                            Atelier
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">
                            Diseño de alta gama y elegancia para el mundo moderno. Encuentra tu estilo hoy.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {/* Explorar */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-colors duration-300">
                                Explorar
                            </h4>
                            <ul className="text-sm space-y-2">
                                <li>
                                    <Link 
                                        to="/nosotros" 
                                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        Nosotros
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/servicios" 
                                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        Servicios
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/ofertas" 
                                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        Ofertas
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Ayuda */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-colors duration-300">
                                Ayuda
                            </h4>
                            <ul className="text-sm space-y-2">
                                <li>
                                    <Link 
                                        to="/soporte" 
                                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        Soporte
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/envios" 
                                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        Envíos
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/devoluciones" 
                                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        Devoluciones
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Legal */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-colors duration-300">
                                Legal
                            </h4>
                            <ul className="text-sm space-y-2">
                                <li>
                                    <Link 
                                        to="/terminos" 
                                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        Términos
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/privacidad" 
                                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        Privacidad
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/cookies" 
                                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        Cookies
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Copyright y redes sociales */}
                <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs transition-colors duration-300">
                    <p className="text-slate-600 dark:text-slate-500">
                        © {currentYear} ATELIER S.A. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6">
                        <a 
                            href="#" 
                            className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="material-symbols-outlined text-base">photo_camera</span>
                        </a>
                        <a 
                            href="#" 
                            className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="material-symbols-outlined text-base">thumb_up</span>
                        </a>
                        <a 
                            href="#" 
                            className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="material-symbols-outlined text-base">chat</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;