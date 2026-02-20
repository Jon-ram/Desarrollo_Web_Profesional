// src/components/layout/SimpleHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

function SimpleHeader() {
  return (
    <header className="border-b border-slate-800 sticky top-0 bg-slate-900/90 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Solo logo */}
          <Link to="/" className="font-display text-3xl font-bold text-white uppercase">
            Atelier
          </Link>
          
          {/* Solo botón de tema */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default SimpleHeader;