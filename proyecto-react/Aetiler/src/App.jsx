// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import SimpleHeader from './components/layout/SimpleHeader';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Registro from './components/pages/Registro';
import Productos from './components/pages/Productos';
import Nosotros from './components/pages/Nosotros';
import Servicios from './components/pages/Servicios';
// ... otros imports

function AppContent() {
  const location = useLocation();
  
  // Rutas de autenticación
  const authRoutes = ['/login', '/registro'];
  const isAuthPage = authRoutes.includes(location.pathname);
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      {/* Header condicional */}
      {isAuthPage ? <SimpleHeader /> : <Header />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          {/* ... otras rutas */}
        </Routes>
      </main>
      
      {/* Footer solo en páginas no-auth (opcional) */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;