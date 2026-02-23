// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

function Header({ showSearch = false, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            if (onSearch) {
                onSearch(searchTerm);
            } else {
                navigate(`/productos?search=${encodeURIComponent(searchTerm)}`);
            }
        }
    };

    return (
        <header className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link 
                            to="/" 
                            className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase transition-colors duration-300"
                        >
                            Atelier
                        </Link>
                    </div>
                    
                    {/* Área central: Buscador o Botón de Productos */}
                    {showSearch ? (
                        <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative mx-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-sm">search</span>
                            </div>
                            <input 
                                className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-full leading-5 bg-slate-50 dark:bg-slate-800 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all duration-300" 
                                placeholder="Buscar productos..." 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    ) : (
                        <div className="flex-1 max-w-2xl flex justify-center mx-4">
                            <Link
                                to="/productos"
                                className="bg-primary hover:bg-red-500 text-white px-8 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm inline-flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">inventory_2</span>
                                Productos
                            </Link>
                        </div>
                    )}
                    
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
                            className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="material-symbols-outlined">
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
                
                {/* Menú móvil */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col space-y-3">
                            <Link 
                                to="/" 
                                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Inicio
                            </Link>
                            <Link 
                                to="/productos" 
                                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Productos
                            </Link>
                            <Link 
                                to="/nosotros" 
                                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Nosotros
                            </Link>
                            <Link 
                                to="/servicios" 
                                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Servicios
                            </Link>
                            <Link 
                                to="/ofertas" 
                                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Ofertas
                            </Link>
                            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                                <Link 
                                    to="/login" 
                                    className="block text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link 
                                    to="/registro" 
                                    className="block text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;