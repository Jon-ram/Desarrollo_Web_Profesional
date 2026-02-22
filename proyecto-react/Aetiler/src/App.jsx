// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './components/pages/Home';
import Productos from './components/pages/Productos';
import Nosotros from './components/pages/Nosotros';
import Servicios from './components/pages/Servicios';
import Login from './components/pages/Login';
import Registro from './components/pages/Registro';
import Error404 from './components/pages/Error404';
import ProductoDetalle from './components/pages/ProductoDetalle';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                } />
                
                <Route path="/productos" element={
                    <MainLayout>
                        <Productos />
                    </MainLayout>
                } />

                <Route path="/productos/:id" element={
                    <MainLayout>
                        <ProductoDetalle />
                    </MainLayout>
                } />
                
                <Route path="/nosotros" element={
                    <MainLayout>
                        <Nosotros />
                    </MainLayout>
                } />
                
                <Route path="/servicios" element={
                    <MainLayout>
                        <Servicios />
                    </MainLayout>
                } />
                
                <Route path="/login" element={
                    <MainLayout>
                        <Login />
                    </MainLayout>
                } />
                
                <Route path="/registro" element={
                    <MainLayout>
                        <Registro />
                    </MainLayout>
                } />
                <Route path="/*" element={
                    <MainLayout>
                        <Error404 />
                    </MainLayout>
                } />
            </Routes>
        </Router>
    );
}

export default App;