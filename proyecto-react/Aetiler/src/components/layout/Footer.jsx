// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="max-w-sm">
                        <h2 className="font-display text-3xl font-bold tracking-tight uppercase mb-3 text-white">Atelier</h2>
                        <p className="text-slate-400 text-sm">Diseño de alta gama y elegancia para el mundo moderno. Encuentra tu estilo hoy.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {/* Explorar */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500">Explorar</h4>
                            <ul className="text-sm space-y-2">
                                <li>
                                    <Link to="/nosotros" className="text-slate-400 hover:text-primary transition-colors">
                                        Nosotros
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/servicios" className="text-slate-400 hover:text-primary transition-colors">
                                        Servicios
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/ofertas" className="text-slate-400 hover:text-primary transition-colors">
                                        Ofertas
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Ayuda */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500">Ayuda</h4>
                            <ul className="text-sm space-y-2">
                                <li>
                                    <Link to="/soporte" className="text-slate-400 hover:text-primary transition-colors">
                                        Soporte
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/envios" className="text-slate-400 hover:text-primary transition-colors">
                                        Envíos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/devoluciones" className="text-slate-400 hover:text-primary transition-colors">
                                        Devoluciones
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Legal */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500">Legal</h4>
                            <ul className="text-sm space-y-2">
                                <li>
                                    <Link to="/terminos" className="text-slate-400 hover:text-primary transition-colors">
                                        Términos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/privacidad" className="text-slate-400 hover:text-primary transition-colors">
                                        Privacidad
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/cookies" className="text-slate-400 hover:text-primary transition-colors">
                                        Cookies
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Copyright y redes sociales */}
                <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {currentYear} ATELIER S.A. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a 
                            href="#" 
                            className="text-slate-500 hover:text-primary transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="material-symbols-outlined text-base">photo_camera</span>
                        </a>
                        <a 
                            href="#" 
                            className="text-slate-500 hover:text-primary transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="material-symbols-outlined text-base">thumb_up</span>
                        </a>
                        <a 
                            href="#" 
                            className="text-slate-500 hover:text-primary transition-colors"
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