// src/components/layout/MainLayout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import SimpleHeader from './SimpleHeader';
import Footer from './Footer';

function MainLayout({ children }) {
    const location = useLocation();
    const pathname = location.pathname;

    // Función para pasar a Productos cuando se busca
    const handleSearch = (searchTerm) => {
        // Solo redirigir si no estamos ya en productos
        if (pathname !== '/productos') {
            window.location.href = `/productos?search=${encodeURIComponent(searchTerm)}`;
        }
    };

    // Determinar qué header mostrar
    const renderHeader = () => {
        // Rutas de autenticación
        if (pathname === '/login' || pathname === '/registro') {
            return <SimpleHeader />;
        }
        
        // Ruta de productos (con buscador)
        if (pathname === '/productos') {
            return <Header showSearch={true} onSearch={handleSearch} />;
        }
        
        // Otras rutas (con botón de Productos)
        return <Header showSearch={false} onSearch={handleSearch} />;
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