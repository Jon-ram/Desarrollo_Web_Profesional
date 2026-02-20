// src/components/home/FeaturedProducts.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';

// Datos de productos
const productos = [
    {
        "id": 1,
        "nombre": "Vestido chic rojo",
        "precio": 200,
        "imagen": "https://lh3.googleusercontent.com/aida-public/AB6AXuDzskSXsWZYxwjTyq-F0o4VZhfIL5rknRU4A9m2cigUTqYw3dZBItX9Dv3rUmff9aeO8PmZ1DNLnwBzNVY5bOYMvGcOiWt_zfhKM4aMa_Nwp4ppx54HOH1JkZjt2ojHKK6hLZZAHQkZda6e7d9JqtUWyTSOSa-seAWqnR8rLf4jYzzXcU6FamY1WWQHN3LQg6Cl2rru7oroLxj8--7-5uxFC9bKZUTw1Tb5Aa1kkaoy18tw5DSYSXK7IqC9gHmCyBORfXwdonCv_Vq6",
        "oferta": true,
        "categoria": "vestidos"
    },
    {
        "id": 2,
        "nombre": "Chaqueta sport Nike",
        "precio": 100,
        "imagen": "https://lh3.googleusercontent.com/aida-public/AB6AXuCb7s2vaJFu89EtkS6OG2ntR5pj1VM7nr4WSAQbmfLcyajCzhbAUhOqFQSUMxJVJOAEX9XROWkf5sY7v5lytacBNiuNRyfikKJyBvHSPYZNOgnvsKMHk0_z4xe5n6ZxYQX_JCTg6n1zAVorxXZrP669MtHWujd_kLkcOL5tjreJQZZxwfa7y8wqOtKHJLxtnjzzo7dcideu81BYsMLv9FJEdhpob5Iu6z14lx2Iv3fhFELH4aw-uklqjAIB2cccvcMSKF6RNQ0NHjnd",
        "oferta": true,
        "categoria": "chaquetas"
    },
    {
        "id": 3,
        "nombre": "Bolso de Mano",
        "precio": 200,
        "imagen": "https://lh3.googleusercontent.com/aida-public/AB6AXuAQOrzCzhGqkOu2au_nrIXvDIko3ZP5Ye6v5Xjr6GrmUxVB6d61pKtYU61-Ds8JAf73O32v6HNpw2HtMeiu5JfGNb_NE0NUuA0gLbqSCKfgqPEmc6yap8gAv0LZyrTBOLTZBa4teJ5Q0nrYPnIVWZWn1E6BDHPLRDTTqWnaMYeRgKCqW66V6sJD9xynB08yFcToeHWZ72sHLOl1EJROme1jnBkrnL_i_Gitz2uB_kIzxhf7l-aX6Yo1qXinQZDfJawaX0s7yBM9fFoW",
        "oferta": false,
        "categoria": "accesorios"
    },
    {
        "id": 4,
        "nombre": "Gafas de sol polarizados",
        "precio": 300,
        "imagen": "https://lh3.googleusercontent.com/aida-public/AB6AXuAnPCWhPUUPAAwFZhCurRdPo7Q4-tE7kS0_8-DzRySJdcTpiGeQLxByz4p5ld6Ait2brqtrx1eRHafRZYZqzMlg5TWWv0wUnBv59m2UhaGx7bAWJBSBXuYrTyuZqkkSDe4159Tg7CjUCTl7TAAqxD_FsBYQOw0eVnz0yZ3mo6jPGVmBEQUV4mFVXP_UxPo8ZUpfLF-uaGxaf9wgDPW6fj7Nhw5TEe6ltenIhiJ4UL2wFB9mk-iHcPdeqPCqm4WuJY0wLrzOvWtyIloJ",
        "oferta": false,
        "categoria": "accesorios"
    }
];

function FeaturedProducts() {
    const [sortBy, setSortBy] = useState('featured');
    const featuredProducts = productos.slice(0, 4);

    // Función para ordenar productos
    const getSortedProducts = () => {
        let sorted = [...featuredProducts];
        if (sortBy === 'price-asc') {
            sorted.sort((a, b) => a.precio - b.precio);
        } else if (sortBy === 'price-desc') {
            sorted.sort((a, b) => b.precio - a.precio);
        }
        return sorted;
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-12 bg-slate-900">
            <div className="text-center mb-10">
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
                    Colección exclusiva
                </p>
                <h2 className="text-3xl font-display font-bold mb-3 text-white">
                    Productos Destacados
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Selección cuidadosa de nuestras mejores piezas
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <p className="text-sm text-slate-400">Mostrando 4 productos</p>
                <select 
                    className="border border-slate-700 rounded-full px-4 py-2 text-sm bg-slate-800 text-slate-300 w-full sm:w-auto focus:outline-none focus:ring-1 focus:ring-primary"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="featured">Ordenar por: Destacados</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {getSortedProducts().map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            <div className="text-center mt-10">
                <Link 
                    to="/productos" 
                    className="inline-block border border-slate-700 hover:border-primary text-slate-300 hover:text-primary px-6 py-3 rounded-full font-medium transition-all duration-300"
                >
                    Explorar todos los productos →
                </Link>
            </div>
        </section>
    );
}

export default FeaturedProducts;