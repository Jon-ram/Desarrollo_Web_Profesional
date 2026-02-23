// src/components/pages/Error404.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header'; // Añadimos Header para mantener consistencia
import Footer from '../layout/Footer'; // Añadimos Footer para mantener consistencia
import SimpleHeader from '../layout/SimpleHeader';

function Error404() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col transition-colors duration-300">
            <SimpleHeader />
            
            <main className="flex-grow flex items-center justify-center p-4">
                {/* Contenido principal */}
                <div className="text-center max-w-2xl">
                    {/* Icono grande */}
                    <div className="mb-8 relative">
                        <div className="text-[150px] font-display font-bold text-slate-200 dark:text-slate-800 select-none transition-colors duration-300">
                            404
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-8xl text-primary animate-pulse">
                                error
                            </span>
                        </div>
                    </div>

                    {/* Título */}
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
                        ¡Ups! Página no encontrada
                    </h1>

                    {/* Descripción */}
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto transition-colors duration-300">
                        La página que estás buscando no existe o ha sido movida a otra dirección.
                    </p>

                    {/* Opciones */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/"
                            className="bg-primary hover:bg-red-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/30 inline-flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">home</span>
                            Volver al inicio
                        </Link>
                        
                        <Link
                            to="/productos"
                            className="border-2 border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20 px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">inventory_2</span>
                            Ver productos
                        </Link>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 transition-colors duration-300">
                            Quizás te interese:
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link 
                                to="/nosotros" 
                                className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm"
                            >
                                Nosotros
                            </Link>
                            <span className="text-slate-300 dark:text-slate-600 transition-colors duration-300">•</span>
                            <Link 
                                to="/servicios" 
                                className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm"
                            >
                                Servicios
                            </Link>
                            <span className="text-slate-300 dark:text-slate-600 transition-colors duration-300">•</span>
                            <Link 
                                to="/ofertas" 
                                className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm"
                            >
                                Ofertas
                            </Link>
                            <span className="text-slate-300 dark:text-slate-600 transition-colors duration-300">•</span>
                            <Link 
                                to="/contacto" 
                                className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm"
                            >
                                Contacto
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decoración de fondo */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl transition-colors duration-300"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl transition-colors duration-300"></div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

export default Error404;