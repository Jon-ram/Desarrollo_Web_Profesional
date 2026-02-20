// src/components/layout/MainLayout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import SimpleHeader from './SimpleHeader';
import Footer from './Footer';

function MainLayout({ children }) {
    const location = useLocation();
    const pathname = location.pathname;

    // Determinar qué header mostrar
    const renderHeader = () => {
        // Rutas de autenticación
        if (pathname === '/login' || pathname === '/registro') {
            return <SimpleHeader />;
        }
        
        // Ruta de productos (con buscador)
        if (pathname === '/productos') {
            return <Header showSearch={true} />;
        }
        
        // Otras rutas (sin buscador)
        return <Header showSearch={false} />;
    };

    // Determinar si mostrar footer (no en auth)
    const showFooter = !(pathname === '/login' || pathname === '/registro');

    return (
        <div className="flex flex-col min-h-screen bg-slate-900">
            {renderHeader()}
            <main className="flex-grow">
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
}

export default MainLayout;