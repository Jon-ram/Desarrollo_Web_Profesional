// src/components/pages/Productos.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductCard from '../common/ProductCard';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tallasUnicas, setTallasUnicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Estados para filtros
    const [filtros, setFiltros] = useState({
        busqueda: '',
        categorias: [],
        tallas: [],
        precioMax: 1000,
        orden: "relevance",
        paginaActual: 1,
        productosPorPagina: 12
    });

    // Estado para el precio
    const [precioValue, setPrecioValue] = useState(1000);

    // Cargar productos desde el JSON
    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setLoading(true);
                const data = await import('../../data/productos.json');
                const productosData = data.default.productos || data.productos;
                
                setProductos(productosData);
                setProductosFiltrados(productosData);
                
                // Extraer categorías únicas
                const cats = [...new Set(productosData.map(p => p.categoria))];
                setCategorias(cats);
                
                // Extraer tallas únicas
                const todasTallas = productosData.flatMap(p => p.tallas || []);
                const tallas = [...new Set(todasTallas)].sort();
                setTallasUnicas(tallas);
                
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar productos:', err);
                setError('No se pudieron cargar los productos');
                setLoading(false);
            }
        };
        
        cargarProductos();
    }, []);

    // Función para manejar búsqueda desde el Header
    const handleHeaderSearch = (searchTerm) => {
        setFiltros(prev => ({
            ...prev,
            busqueda: searchTerm,
            paginaActual: 1
        }));
    };

    // Efecto para filtrar productos
    useEffect(() => {
        if (productos.length === 0) return;

        let filtrados = [...productos];
        
        // Filtrar por búsqueda
        if (filtros.busqueda) {
            const busquedaLower = filtros.busqueda.toLowerCase().trim();
            filtrados = filtrados.filter(producto => {
                const nombreMatch = producto.nombre.toLowerCase().includes(busquedaLower);
                const descripcionMatch = producto.descripcion?.toLowerCase().includes(busquedaLower);
                const tagsMatch = producto.tags?.some(tag => 
                    tag.toLowerCase().includes(busquedaLower)
                );
                const categoriaMatch = producto.categoria?.toLowerCase().includes(busquedaLower);
                
                return nombreMatch || descripcionMatch || tagsMatch || categoriaMatch;
            });
        }
        
        // Filtrar por categorías
        if (filtros.categorias.length > 0) {
            filtrados = filtrados.filter(producto =>
                filtros.categorias.includes(producto.categoria)
            );
        }
        
        // Filtrar por tallas
        if (filtros.tallas.length > 0) {
            filtrados = filtrados.filter(producto =>
                producto.tallas?.some(talla =>
                    filtros.tallas.includes(talla.toLowerCase())
                )
            );
        }
        
        // Filtrar por precio
        filtrados = filtrados.filter(producto =>
            producto.precio <= filtros.precioMax
        );
        
        // Ordenar
        filtrados.sort((a, b) => {
            switch (filtros.orden) {
                case 'price-low':
                    return a.precio - b.precio;
                case 'price-high':
                    return b.precio - a.precio;
                case 'newest':
                    return b.id - a.id;
                default:
                    if (a.destacado && !b.destacado) return -1;
                    if (!a.destacado && b.destacado) return 1;
                    return b.id - a.id;
            }
        });
        
        setProductosFiltrados(filtrados);
    }, [filtros, productos]);

    // Manejar cambios en filtros
    const handleCategoriaChange = (categoria) => {
        setFiltros(prev => {
            const nuevasCategorias = prev.categorias.includes(categoria)
                ? prev.categorias.filter(c => c !== categoria)
                : [...prev.categorias, categoria];
            return { ...prev, categorias: nuevasCategorias, paginaActual: 1 };
        });
    };

    const handleTallaChange = (talla) => {
        setFiltros(prev => {
            const nuevasTallas = prev.tallas.includes(talla)
                ? prev.tallas.filter(t => t !== talla)
                : [...prev.tallas, talla];
            return { ...prev, tallas: nuevasTallas, paginaActual: 1 };
        });
    };

    const handlePrecioChange = (e) => {
        const valor = parseInt(e.target.value);
        setPrecioValue(valor);
        setFiltros(prev => ({ ...prev, precioMax: valor, paginaActual: 1 }));
    };

    const handleOrdenChange = (e) => {
        setFiltros(prev => ({ ...prev, orden: e.target.value, paginaActual: 1 }));
    };

    const limpiarFiltros = () => {
        setFiltros({
            busqueda: '',
            categorias: [],
            tallas: [],
            precioMax: 1000,
            orden: "relevance",
            paginaActual: 1,
            productosPorPagina: 12
        });
        setPrecioValue(1000);
    };

    const limpiarBusqueda = () => {
        setFiltros(prev => ({ ...prev, busqueda: '', paginaActual: 1 }));
    };

    // Productos paginados
    const productosPaginados = () => {
        const inicio = (filtros.paginaActual - 1) * filtros.productosPorPagina;
        const fin = inicio + filtros.productosPorPagina;
        return productosFiltrados.slice(inicio, fin);
    };

    const totalPaginas = Math.ceil(productosFiltrados.length / filtros.productosPorPagina);
    const productosActuales = productosPaginados();
    const inicio = (filtros.paginaActual - 1) * filtros.productosPorPagina + 1;
    const fin = Math.min(inicio + filtros.productosPorPagina - 1, productosFiltrados.length);

    // Mostrar loading
    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center transition-colors duration-300">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Cargando productos...</p>
                </div>
            </div>
        );
    }

    // Mostrar error
    if (error) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center transition-colors duration-300">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 transition-colors duration-300">Error al cargar productos</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-300">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-primary hover:bg-red-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col transition-colors duration-300">
            <Header showSearch={true} onSearch={handleHeaderSearch} />
            
            <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
                {/* Breadcrumb */}
                <nav className="flex text-xs text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-widest transition-colors duration-300">
                    <Link to="/" className="hover:text-primary transition-colors">
                        Inicio
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-900 dark:text-white font-semibold transition-colors duration-300">Productos</span>
                </nav>

                {/* Resultados de búsqueda */}
                {filtros.busqueda && (
                    <div className="mb-4 p-3 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/30 dark:border-primary/40 flex justify-between items-center transition-colors duration-300">
                        <p className="text-slate-900 dark:text-white">
                            Resultados para: <span className="text-primary font-bold">"{filtros.busqueda}"</span>
                        </p>
                        <button 
                            onClick={limpiarBusqueda}
                            className="text-sm text-primary hover:text-red-500 transition-colors"
                        >
                            Limpiar
                        </button>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="sticky top-28">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-lg text-slate-900 dark:text-white transition-colors duration-300">Filtros</h3>
                                <button 
                                    onClick={limpiarFiltros}
                                    className="text-xs text-primary hover:text-red-500 transition-colors"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                            
                            {/* Category Filter */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 transition-colors duration-300">
                                    Categoría
                                </h4>
                                <div className="space-y-2">
                                    {categorias.map(categoria => (
                                        <label key={categoria} className="flex items-center text-sm cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                checked={filtros.categorias.includes(categoria)}
                                                onChange={() => handleCategoriaChange(categoria)}
                                                className="hidden"
                                            />
                                            <span className={`w-4 h-4 border rounded mr-3 flex items-center justify-center transition-colors ${
                                                filtros.categorias.includes(categoria)
                                                    ? 'bg-primary border-primary'
                                                    : 'border-slate-300 dark:border-slate-600'
                                            }`}>
                                                {filtros.categorias.includes(categoria) && (
                                                    <span className="text-white text-xs">✓</span>
                                                )}
                                            </span>
                                            <span className="group-hover:text-primary transition-colors text-slate-700 dark:text-slate-300">
                                                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Size Filter */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 transition-colors duration-300">
                                    Talla
                                </h4>
                                <div className="grid grid-cols-5 gap-2">
                                    {tallasUnicas.map(talla => (
                                        <button
                                            key={talla}
                                            onClick={() => handleTallaChange(talla.toLowerCase())}
                                            className={`py-2 text-xs border rounded transition-colors ${
                                                filtros.tallas.includes(talla.toLowerCase())
                                                    ? 'bg-primary border-primary text-white'
                                                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-400 hover:border-primary dark:hover:border-primary'
                                            }`}
                                        >
                                            {talla.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 transition-colors duration-300">
                                    Rango de Precio
                                </h4>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="1000" 
                                    value={precioValue}
                                    onChange={handlePrecioChange}
                                    className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
                                    <span>$0</span>
                                    <span>${precioValue.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Section */}
                    <div className="flex-1">
                        {/* Products Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                            <div>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                                    Colección de Productos
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-300">
                                    {productosFiltrados.length > 0 ? (
                                        <>Mostrando {inicio}-{fin} de {productosFiltrados.length} productos</>
                                    ) : (
                                        'No se encontraron productos'
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <select 
                                    value={filtros.orden}
                                    onChange={handleOrdenChange}
                                    className="border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 focus:ring-primary focus:border-primary cursor-pointer transition-colors duration-300"
                                >
                                    <option value="relevance">Ordenar por: Relevancia</option>
                                    <option value="price-low">Precio: menor a mayor</option>
                                    <option value="price-high">Precio: mayor a menor</option>
                                    <option value="newest">Novedades</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {productosActuales.map(producto => (
                                <ProductCard key={producto.id} product={producto} />
                            ))}
                        </div>

                        {/* Empty State */}
                        {productosActuales.length === 0 && (
                            <div className="text-center py-16">
                                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4 transition-colors duration-300">
                                    search_off
                                </span>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
                                    No se encontraron productos
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">
                                    Intenta con otros filtros o términos de búsqueda.
                                </p>
                                {filtros.busqueda && (
                                    <button
                                        onClick={limpiarBusqueda}
                                        className="mt-4 text-primary hover:text-red-500 font-medium transition-colors"
                                    >
                                        Limpiar búsqueda
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPaginas > 1 && (
                            <div className="flex justify-center mt-12 pb-8">
                                <nav className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setFiltros(prev => ({ ...prev, paginaActual: prev.paginaActual - 1 }))}
                                        disabled={filtros.paginaActual === 1}
                                        className="p-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-slate-600 dark:text-slate-400"
                                    >
                                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                                    </button>
                                    
                                    {[...Array(totalPaginas)].map((_, i) => {
                                        const pagina = i + 1;
                                        if (
                                            pagina === 1 ||
                                            pagina === totalPaginas ||
                                            (pagina >= filtros.paginaActual - 2 && pagina <= filtros.paginaActual + 2)
                                        ) {
                                            return (
                                                <button
                                                    key={pagina}
                                                    onClick={() => setFiltros(prev => ({ ...prev, paginaActual: pagina }))}
                                                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors ${
                                                        filtros.paginaActual === pagina
                                                            ? 'bg-primary text-white'
                                                            : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                    }`}
                                                >
                                                    {pagina}
                                                </button>
                                            );
                                        } else if (
                                            pagina === filtros.paginaActual - 3 ||
                                            pagina === filtros.paginaActual + 3
                                        ) {
                                            return <span key={pagina} className="text-slate-400 dark:text-slate-600">...</span>;
                                        }
                                        return null;
                                    })}
                                    
                                    <button 
                                        onClick={() => setFiltros(prev => ({ ...prev, paginaActual: prev.paginaActual + 1 }))}
                                        disabled={filtros.paginaActual === totalPaginas}
                                        className="p-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-slate-600 dark:text-slate-400"
                                    >
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Productos;