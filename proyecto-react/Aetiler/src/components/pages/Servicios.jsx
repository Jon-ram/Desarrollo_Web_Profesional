// src/components/pages/Servicios.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function Servicios() {
    // Servicios principales
    const serviciosPrincipales = [
        {
            id: 1,
            titulo: "Personal Styling",
            icono: "person_search",
            descripcion: "Nuestros expertos crean looks que resaltan tu personalidad. Sesiones individuales, análisis de colorimetría y curaduría de guardarropa.",
            caracteristicas: [
                "Asesoría online o presencial",
                "Reporte de estilo personalizado"
            ],
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzskSXsWZYxwjTyq-F0o4VZhfIL5rknRU4A9m2cigUTqYw3dZBItX9Dv3rUmff9aeO8PmZ1DNLnwBzNVY5bOYMvGcOiWt_zfhKM4aMa_Nwp4ppx54HOH1JkZjt2ojHKK6hLZZAHQkZda6e7d9JqtUWyTSOSa-seAWqnR8rLf4jYzzXcU6FamY1WWQHN3LQg6Cl2rru7oroLxj8--7-5uxFC9bKZUTw1Tb5Aa1kkaoy18tw5DSYSXK7IqC9gHmCyBORfXwdonCv_Vq6",
            boton: "Agendar Cita",
            orden: "normal"
        },
        {
            id: 2,
            titulo: "Envío Premium",
            icono: "local_shipping",
            descripcion: "Disfruta de envíos express en 24 horas y nuestro servicio de entrega especial con packaging de lujo eco-friendly.",
            caracteristicas: [
                "Entrega en el mismo día",
                "Packaging eco-friendly"
            ],
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb7s2vaJFu89EtkS6OG2ntR5pj1VM7nr4WSAQbmfLcyajCzhbAUhOqFQSUMxJVJOAEX9XROWkf5sY7v5lytacBNiuNRyfikKJyBvHSPYZNOgnvsKMHk0_z4xe5n6ZxYQX_JCTg6n1zAVorxXZrP669MtHWujd_kLkcOL5tjreJQZZxwfa7y8wqOtKHJLxtnjzzo7dcideu81BYsMLv9FJEdhpob5Iu6z14lx2Iv3fhFELH4aw-uklqjAIB2cccvcMSKF6RNQ0NHjnd",
            boton: "Conocer más",
            orden: "invertido"
        }
    ];

    // Servicios adicionales
    const serviciosAdicionales = [
        {
            icono: "sync_alt",
            titulo: "Cambios y Devoluciones",
            descripcion: "Hasta 30 días para cambios y devoluciones gratuitas en todos los pedidos.",
            link: "#"
        },
        {
            icono: "support_agent",
            titulo: "Soporte VIP",
            descripcion: "Atención personalizada 24/7 por teléfono, chat y email para clientes premium.",
            link: "#"
        },
        {
            icono: "calendar_month",
            titulo: "Eventos Exclusivos",
            descripcion: "Acceso a previews de colecciones, talleres de estilo y eventos de networking.",
            link: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <Header showSearch={false} />
            
            {/* Breadcrumb */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <ol className="flex items-center space-x-2 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <li>
                        <Link to="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="material-symbols-outlined text-[10px] text-slate-400">chevron_right</span>
                        <span className="text-slate-900 dark:text-white font-bold">Servicios</span>
                    </li>
                </ol>
            </nav>

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight mb-4 text-slate-900 dark:text-white">
                            Elevamos tu Experiencia
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Más que moda, ofrecemos un estilo de vida. Descubre servicios exclusivos diseñados para la mujer moderna.
                        </p>
                    </div>
                </section>

                {/* Servicios Principales */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    {serviciosPrincipales.map((servicio) => (
                        <div 
                            key={servicio.id}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                                servicio.id === 1 ? 'mb-20' : ''
                            }`}
                        >
                            {/* Imagen */}
                            <div className={`${servicio.orden === 'invertido' ? 'order-2 lg:order-1' : 'order-1'}`}>
                                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                                    <img 
                                        alt={servicio.titulo} 
                                        className="w-full h-full object-cover" 
                                        src={servicio.imagen}
                                    />
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className={`space-y-6 ${servicio.orden === 'invertido' ? 'order-1 lg:order-2' : 'order-2'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center rounded-full">
                                        <span className="material-symbols-outlined">{servicio.icono}</span>
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                                        {servicio.titulo}
                                    </h2>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {servicio.descripcion}
                                </p>
                                <ul className="space-y-2">
                                    {servicio.caracteristicas.map((caracteristica, index) => (
                                        <li key={index} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                            <span className="material-symbols-outlined text-primary text-sm">
                                                check_circle
                                            </span>
                                            {caracteristica}
                                        </li>
                                    ))}
                                </ul>
                                <button className="bg-primary hover:bg-red-500 text-white px-6 py-3 rounded-full font-semibold transition-colors mt-4 shadow-md hover:shadow-lg">
                                    {servicio.boton}
                                </button>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Servicios Adicionales */}
                <section className="bg-slate-50 dark:bg-slate-800/50 py-16 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-bold mb-4 text-slate-900 dark:text-white">
                                Más Servicios
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Completa tu experiencia Atelier
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {serviciosAdicionales.map((servicio, index) => (
                                <div 
                                    key={index}
                                    className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all hover:shadow-lg"
                                >
                                    <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full mx-auto mb-4">
                                        <span className="material-symbols-outlined">{servicio.icono}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                                        {servicio.titulo}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                                        {servicio.descripcion}
                                    </p>
                                    <Link 
                                        to={servicio.link}
                                        className="text-primary font-medium text-sm hover:text-red-500 transition-colors inline-flex items-center gap-1"
                                    >
                                        Más información
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-12 text-center border border-slate-200 dark:border-slate-700 shadow-xl">
                        <h2 className="text-3xl font-display font-bold mb-4 text-slate-900 dark:text-white">
                            Acceso Prioritario
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
                            Sé el primero en conocer nuevas colecciones y ofertas exclusivas.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input 
                                className="flex-1 px-5 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all" 
                                placeholder="Tu correo electrónico" 
                                type="email"
                            />
                            <button className="bg-primary hover:bg-red-500 text-white px-6 py-3 rounded-full font-semibold transition-colors whitespace-nowrap shadow-md hover:shadow-lg">
                                Suscribirme
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}

export default Servicios;