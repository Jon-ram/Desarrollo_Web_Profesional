// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Productos from './components/pages/Productos';
import ProductoDetalle from './components/pages/ProductoDetalle';
import Nosotros from './components/pages/Nosotros';
import Servicios from './components/pages/Servicios';
import Login from './components/pages/Login';
import Registro from './components/pages/Registro';
import Error404 from './components/pages/Error404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;