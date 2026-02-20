// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="border-b border-slate-800 sticky top-0 bg-slate-900/90 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link 
                            to="/" 
                            className="font-display text-3xl font-bold tracking-tight text-white uppercase"
                        >
                            Atelier
                        </Link>
                    </div>
                    
                    {/* Botón de Productos (reemplaza la barra de búsqueda) */}
                    <div className="flex-1 max-w-2xl flex justify-center">
                        <Link
                            to="/productos"
                            className="bg-primary hover:bg-red-500 text-white px-8 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm inline-flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">inventory_2</span>
                            Productos
                        </Link>
                    </div>
                    
                    {/* Botones derecho */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link 
                            to="/login" 
                            className="bg-primary hover:bg-red-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm"
                        >
                            Regístrate o inicia sesión
                        </Link>
                        
                        {/* Botón menú móvil */}
                        <button 
                            className="md:hidden p-2 text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="material-symbols-outlined">
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
                
                {/* Navegación Móvil */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-slate-800">
                        <div className="flex flex-col space-y-3">
                            <Link 
                                to="/productos" 
                                className="text-slate-300 hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Productos
                            </Link>
                            <Link 
                                to="/login" 
                                className="text-slate-300 hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Iniciar Sesión
                            </Link>
                            <Link 
                                to="/registro" 
                                className="text-slate-300 hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Registrarse
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;