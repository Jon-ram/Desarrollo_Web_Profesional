// src/components/pages/Nosotros.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function Nosotros() {
    // Equipo de trabajo
    const team = [
        {
            nombre: "Elena Valery",
            cargo: "Fundadora & Directora Creativa",
            frase: "La moda es la armadura para sobrevivir a la realidad cotidiana.",
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzskSXsWZYxwjTyq-F0o4VZhfIL5rknRU4A9m2cigUTqYw3dZBItX9Dv3rUmff9aeO8PmZ1DNLnwBzNVY5bOYMvGcOiWt_zfhKM4aMa_Nwp4ppx54HOH1JkZjt2ojHKK6hLZZAHQkZda6e7d9JqtUWyTSOSa-seAWqnR8rLf4jYzzXcU6FamY1WWQHN3LQg6Cl2rru7oroLxj8--7-5uxFC9bKZUTw1Tb5Aa1kkaoy18tw5DSYSXK7IqC9gHmCyBORfXwdonCv_Vq6"
        },
        {
            nombre: "Julian Rossi",
            cargo: "Jefe de Diseño",
            frase: "Buscamos la belleza en la simplicidad de la forma.",
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCFQKNcfPOULabJWys0ytJhTW9jCn25LYRBlWifni0X7Y7Scj79L5g0W-F1DiWJ4IZT3AplA_ap7CcdAso-G6FhQIjvf5AKuskJVjE0hitVib9G2MCp4Sqp5DFnSJ8QD4RuSA3TXRTv2BqW-NWwOK6-FIoJ4XPZmYO_JYxHqofdHOL1YaRjKSsVvkJldYLwLS2oumG_jPzTLcPGMlysY1gQYnqeTJFtBu0kvCKBbjWGs2JwIJ7MU3r84iO6aGWYtHr7VxsCF8enLA1"
        },
        {
            nombre: "Sofia Méndez",
            cargo: "Estratega de Marca",
            frase: "Contamos historias a través de texturas y colores.",
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTfKQy7MXlEDXSZrJHOeHOELK5w6P5_LKe8y2YMn6hjAQoibaMmBcL93iOuuAUKMY8_4-SIJxNk_z8USC2sol3V0ZwlkmqtQTs025n0yhMHqAuyyaMm6B3cSlFQygzIUvEaPaMZH1h3pDkpUxam4rw87G9EJY91xoRE7hYivyUHvUTFLiV7fjDnHx6S4m5acTObSGqRixiehAJyPLR2kzn4P48pYExh8mDnPV8jwPmOPcOnLOdN_IpJZH7rZxpg96RGXcI5VvWdvgv"
        }
    ];

    // Valores de la empresa
    const valores = [
        {
            icono: "handyman",
            titulo: "Artesanía",
            descripcion: "Cada detalle cuenta. Trabajamos con técnicas tradicionales y materiales de la más alta calidad."
        },
        {
            icono: "eco",
            titulo: "Sostenibilidad",
            descripcion: "Comprometidos con prácticas éticas y materiales sostenibles en cada proceso."
        },
        {
            icono: "diversity_3",
            titulo: "Comunidad",
            descripcion: "Creemos en el poder de la moda para unir personas y celebrar la diversidad."
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <Header showSearch={false} />
            
            {/* Breadcrumb */}
            <nav className="max-w-7xl mx-auto px-4 py-4">
                <ol className="flex items-center space-x-2 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-colors duration-300">
                    <li>
                        <Link to="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="material-symbols-outlined text-sm text-slate-400 dark:text-slate-500">chevron_right</span>
                        <span className="text-slate-900 dark:text-white font-semibold transition-colors duration-300">Nosotros</span>
                    </li>
                </ol>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4">
                {/* Hero Section */}
                <section className="py-12 md:py-16">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">
                            Nuestra Esencia
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-300">
                            Redefiniendo la elegancia desde 1992
                        </p>
                    </div>
                </section>

                {/* History Section */}
                <section className="py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg dark:shadow-black/50">
                                <img 
                                    alt="Atelier History Vintage" 
                                    className="w-full h-full object-cover sepia-[0.3] contrast-[1.1]" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv8z4dfDQCBiy5TuUcVJwTgxo1wNak5r5ZRAucsEQJkBCN3wHRzVQTw39ntTxpIt3sfmkM4OhHWgf9zzF0BjWDrSusjWJUY6lA43t-jLUewhiZQYBjd4HlxeQ3fTSyhWqs3jP1UgA_xMEu6iaZl4tLkiMA8gA_4xJjsodh-Xb_rbbr7Q7Gr2rbCay4cS5bOJBUCRl9J8YksQvoKohiwstIdof8GL9IWGcc2C_ZDrzpUSpy8rOOHW6p2Fp3eaLAZifmkJg-_-7xhS6q"
                                />
                            </div>
                        </div>
                        <div className="space-y-6 order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white transition-colors duration-300">
                                Nuestra Historia
                            </h2>
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                                    Fundada en 1992, Atelier nació de una pequeña sastrería familiar con una visión clara: redefinir la elegancia moderna a través del respeto por la artesanía tradicional.
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                                    Cada pieza que creamos lleva consigo décadas de perfeccionamiento y un compromiso inquebrantable con la calidad. Lo que comenzó como una búsqueda personal de la prenda perfecta se ha transformado en un referente de la moda contemporánea.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-12 md:py-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="mb-8">
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
                                Nuestra Misión
                            </h2>
                            <p className="text-2xl md:text-3xl font-display font-medium leading-relaxed text-slate-900 dark:text-white transition-colors duration-300">
                                Elevar el espíritu a través del diseño, creando piezas que no solo visten el cuerpo, sino que celebran la individualidad y el arte del buen vivir.
                            </p>
                        </div>
                        <div className="w-20 h-1 bg-primary mx-auto"></div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-12 md:py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">
                            Nuestros Valores
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                            Los principios que guían cada creación
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {valores.map((valor, index) => (
                            <div 
                                key={index}
                                className="text-center p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-primary">
                                        {valor.icono}
                                    </span>
                                </div>
                                <h3 className="text-xl font-display font-bold mb-3 text-slate-900 dark:text-white transition-colors duration-300">
                                    {valor.titulo}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">
                                    {valor.descripcion}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-12 md:py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">
                            Nuestro Equipo
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                            Las mentes creativas detrás de cada colección
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map((miembro, index) => (
                            <div key={index} className="group text-center">
                                <div className="relative aspect-square overflow-hidden rounded-xl mb-6 mx-auto max-w-xs shadow-lg dark:shadow-black/50">
                                    <img 
                                        alt={miembro.nombre} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                        src={miembro.imagen}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-bold mb-1 text-slate-900 dark:text-white transition-colors duration-300">
                                        {miembro.nombre}
                                    </h3>
                                    <p className="text-primary font-semibold text-xs uppercase tracking-widest mb-3">
                                        {miembro.cargo}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm italic transition-colors duration-300">
                                        "{miembro.frase}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-12 md:py-16">
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 md:p-12 text-center border border-primary/20 dark:border-primary/30 transition-colors duration-300">
                        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">
                            Conoce Nuestras Colecciones
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto transition-colors duration-300">
                            Descubre las piezas que reflejan nuestro compromiso con la excelencia y la belleza atemporal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                to="/productos" 
                                className="bg-primary hover:bg-red-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Ver Productos
                            </Link>
                            <Link 
                                to="/contacto" 
                                className="border border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20 px-8 py-3 rounded-full font-semibold transition-all duration-300"
                            >
                                Contactar
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}

export default Nosotros;