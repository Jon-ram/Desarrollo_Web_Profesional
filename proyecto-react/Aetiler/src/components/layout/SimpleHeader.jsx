// src/components/layout/SimpleHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

function SimpleHeader() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase transition-colors duration-300"
          >
            Atelier
          </Link>
          
          {/* Botón de tema */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default SimpleHeader;