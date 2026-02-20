// src/components/pages/Error404.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
            {/* Contenido principal */}
            <div className="text-center max-w-2xl">
                {/* Icono grande */}
                <div className="mb-8 relative">
                    <div className="text-[150px] font-display font-bold text-white select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-8xl text-white animate-pulse">
                            error
                        </span>
                    </div>
                </div>

                {/* Título */}
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                    ¡Ups! Página no encontrada
                </h1>

                {/* Descripción */}
                <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
                    La página que estás buscando no existe o ha sido movida a otra dirección.
                </p>

                {/* Opciones */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/"
                        className="bg-primary hover:bg-red-500 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:shadow-primary/30 inline-flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">home</span>
                        Volver al inicio
                    </Link>
                    
                    <Link
                        to="/productos"
                        className="border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-full font-semibold transition-all inline-flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">inventory_2</span>
                        Ver productos
                    </Link>
                </div>

                {/* Enlaces rápidos */}
                <div className="mt-12 pt-8 border-t border-slate-800">
                    <p className="text-sm text-slate-500 mb-4">Quizás te interese:</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/nosotros" className="text-slate-400 hover:text-primary transition-colors text-sm">
                            Nosotros
                        </Link>
                        <span className="text-slate-700">•</span>
                        <Link to="/servicios" className="text-slate-400 hover:text-primary transition-colors text-sm">
                            Servicios
                        </Link>
                        <span className="text-slate-700">•</span>
                        <Link to="/ofertas" className="text-slate-400 hover:text-primary transition-colors text-sm">
                            Ofertas
                        </Link>
                        <span className="text-slate-700">•</span>
                        <Link to="/contacto" className="text-slate-400 hover:text-primary transition-colors text-sm">
                            Contacto
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decoración de fondo */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}

export default Error404;