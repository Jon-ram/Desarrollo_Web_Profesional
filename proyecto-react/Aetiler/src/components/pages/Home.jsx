// src/components/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductCard from '../common/ProductCard';

// Datos de productos para destacados
const productosDestacados = [
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

// Componente Hero
function Hero() {
    return (
        <section className="relative h-[500px] overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
            <img 
                alt="Fashion background" 
                className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-80" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv8z4dfDQCBiy5TuUcVJwTgxo1wNak5r5ZRAucsEQJkBCN3wHRzVQTw39ntTxpIt3sfmkM4OhHWgf9zzF0BjWDrSusjWJUY6lA43t-jLUewhiZQYBjd4HlxeQ3fTSyhWqs3jP1UgA_xMEu6iaZl4tLkiMA8gA_4xJjsodh-Xb_rbbr7Q7Gr2rbCay4cS5bOJBUCRl9J8YksQvoKohiwstIdof8GL9IWGcc2C_ZDrzpUSpy8rOOHW6p2Fp3eaLAZifmkJg-_-7xhS6q"
            />
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-colors duration-300"></div>
            <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="max-w-xl">
                    <span className="inline-block text-[#c4ff00] font-bold text-lg mb-3 drop-shadow-lg">
                        Ofertas exclusivas 2024
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-4 text-white drop-shadow-2xl">
                        Todo lo que Necesitas
                    </h1>
                    <p className="text-base mb-6 font-medium text-white/90 drop-shadow-lg">
                        Miles de productos en un solo lugar. Ofertas increíbles, envío gratis y la mejor calidad.
                    </p>
                </div>
            </div>
        </section>
    );
}

// Componente TrustBadges
function TrustBadges() {
    const badges = [
        { icon: 'local_shipping', text: 'Envío gratis +$50' },
        { icon: 'security', text: 'Compra 100% segura' },
        { icon: 'assignment_return', text: 'Devoluciones fáciles' },
        { icon: 'support_agent', text: 'Soporte 24/7' }
    ];

    return (
        <section className="py-8 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {badges.map((badge, index) => (
                        <div key={index} className="space-y-2 group hover:scale-105 transition-transform duration-300">
                            <span className="material-symbols-outlined text-3xl text-primary group-hover:text-primary/80 transition-colors">
                                {badge.icon}
                            </span>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors duration-300">
                                {badge.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Componente Newsletter
function Newsletter() {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setMensaje('¡Gracias por suscribirte!');
            setEmail('');
            setTimeout(() => setMensaje(''), 3000);
        } else {
            setMensaje('Por favor ingresa un email válido');
            setTimeout(() => setMensaje(''), 3000);
        }
    };

    return (
        <section className="bg-slate-50 dark:bg-slate-800 py-12 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h3 className="text-2xl font-display font-bold mb-3 text-slate-900 dark:text-white transition-colors duration-300">
                    Únete a nuestra comunidad
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-300">
                    Recibe ofertas exclusivas y novedades de moda antes que nadie
                </p>
                
                {mensaje && (
                    <div className="mb-4 p-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg text-sm">
                        {mensaje}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="Tu correo electrónico" 
                        className="flex-1 px-4 py-3 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button 
                        type="submit"
                        className="bg-primary hover:bg-red-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Suscribirse
                    </button>
                </form>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 transition-colors duration-300">
                    Al suscribirte aceptas nuestra política de privacidad
                </p>
            </div>
        </section>
    );
}

// Componente FeaturedProducts
function FeaturedProducts() {
    const [sortBy, setSortBy] = useState('featured');
    const featuredProducts = productosDestacados.slice(0, 4);

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
        <section className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="text-center mb-10">
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
                    Colección exclusiva
                </p>
                <h2 className="text-3xl font-display font-bold mb-3 text-slate-900 dark:text-white transition-colors duration-300">
                    Productos Destacados
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto transition-colors duration-300">
                    Selección cuidadosa de nuestras mejores piezas
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                    Mostrando 4 productos
                </p>
                <select 
                    className="border border-slate-300 dark:border-slate-700 rounded-full px-4 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="featured">Ordenar por: Destacados</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {getSortedProducts().map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            <div className="text-center mt-10">
                <Link 
                    to="/productos" 
                    className="inline-block border-2 border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20 px-6 py-3 rounded-full font-medium transition-all duration-300"
                >
                    Explorar todos los productos →
                </Link>
            </div>
        </section>
    );
}

// Componente principal Home
function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col transition-colors duration-300">
            <Header showSearch={false} />
            <main className="flex-grow">
                <Hero />
                <TrustBadges />
                <FeaturedProducts />
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
}

export default Home;