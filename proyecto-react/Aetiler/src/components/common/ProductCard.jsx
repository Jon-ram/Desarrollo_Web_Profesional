// src/components/common/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    const { 
        id, 
        nombre, 
        precio, 
        precio_original, 
        imagen, 
        en_oferta, 
        descuento,
        nuevo,
        destacado,
        valoracion,
        categoria,
        imagenes_secundarias = []
    } = product;

    // Calcular badge a mostrar
    const getBadge = () => {
        if (en_oferta) {
            return { text: '¡OFERTA!', color: 'bg-primary' };
        } else if (nuevo) {
            return { text: 'NUEVO', color: 'bg-green-500' };
        } else if (destacado) {
            return { text: 'DESTACADO', color: 'bg-yellow-500' };
        }
        return null;
    };

    const badge = getBadge();

    return (
        <div className="group bg-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-black/30 transition-all">
            <Link to={`/producto/${id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                        alt={nombre} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        src={imagen}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x400?text=Sin+imagen';
                        }}
                    />
                    
                    {/* Badge */}
                    {badge && (
                        <span className={`absolute top-3 left-3 ${badge.color} text-white text-[10px] font-bold px-2 py-1 rounded italic uppercase tracking-wider`}>
                            {badge.text}
                        </span>
                    )}
                    
                    {/* Contador de imágenes secundarias */}
                    {imagenes_secundarias.length > 0 && (
                        <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
                            +{imagenes_secundarias.length}
                        </div>
                    )}
                </div>
            </Link>
            
            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-bold text-white text-base mb-1 line-clamp-1">{nombre}</h3>
                    <p className="text-xs text-slate-500 mb-2">{categoria}</p>
                    
                    <div className="flex items-center justify-between">
                        {en_oferta ? (
                            <div className="flex items-center gap-2">
                                <span className="text-primary font-bold text-lg">${precio}</span>
                                {precio_original && (
                                    <span className="text-slate-500 line-through text-sm">${precio_original}</span>
                                )}
                                {descuento > 0 && (
                                    <span className="text-primary text-xs font-bold">-{descuento}%</span>
                                )}
                            </div>
                        ) : (
                            <span className="text-white font-bold text-lg">${precio}</span>
                        )}
                        
                        {valoracion && (
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-400 text-sm">★</span>
                                <span className="text-xs text-slate-400">{valoracion}</span>
                            </div>
                        )}
                    </div>
                </div>
                
                <button 
                    onClick={() => {
                        const notification = document.createElement('div');
                        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in flex items-center gap-2';
                        notification.innerHTML = `
                            <span class="material-symbols-outlined text-sm">check_circle</span>
                            <span>${nombre} añadido al carrito</span>
                        `;
                        document.body.appendChild(notification);
                        setTimeout(() => notification.remove(), 3000);
                    }}
                    className="w-full bg-primary hover:bg-red-500 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">shopping_cart</span>
                    Añadir al carrito
                </button>
                
                <Link 
                    to={`/producto/${id}`}
                    className="block w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm font-medium transition-colors text-center"
                >
                    Ver detalles
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;