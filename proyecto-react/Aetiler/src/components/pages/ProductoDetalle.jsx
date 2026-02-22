// src/components/pages/ProductoDetalle.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../common/ProductCard';

function ProductoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [productosRelacionados, setProductosRelacionados] = useState([]);
    const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [enFavoritos, setEnFavoritos] = useState(false);
    const [imagenPrincipal, setImagenPrincipal] = useState('');
    const [tabActivo, setTabActivo] = useState('details');
    const [notificacion, setNotificacion] = useState(null);

    // Cargar producto al montar el componente
    useEffect(() => {
        cargarProducto();
    }, [id]);

    // Función para mostrar notificaciones
    const mostrarNotificacion = (mensaje, tipo = 'success') => {
        setNotificacion({ mensaje, tipo });
        setTimeout(() => setNotificacion(null), 3000);
    };

    // Cargar producto desde el JSON
    const cargarProducto = async () => {
        try {
            setLoading(true);
            const data = await import('../../data/productos.json');
            const productos = data.default.productos || data.productos;
            
            const productoEncontrado = productos.find(p => p.id === parseInt(id));
            
            if (!productoEncontrado) {
                setError(true);
                setLoading(false);
                return;
            }

            setProducto(productoEncontrado);
            setImagenPrincipal(productoEncontrado.imagen);
            
            // Cargar productos relacionados
            cargarProductosRelacionados(productoEncontrado, productos);
            
            // Establecer talla por defecto si existe
            if (productoEncontrado.tallas && productoEncontrado.tallas.length > 0) {
                setTallaSeleccionada(productoEncontrado.tallas[0].toLowerCase());
            }

            setLoading(false);
        } catch (err) {
            console.error('Error al cargar producto:', err);
            setError(true);
            setLoading(false);
        }
    };

    // Cargar productos relacionados
    const cargarProductosRelacionados = (productoActual, todosProductos) => {
        // Filtrar productos de la misma categoría, excluyendo el actual
        const relacionados = todosProductos
            .filter(p => p.id !== productoActual.id && p.categoria === productoActual.categoria)
            .slice(0, 4);

        if (relacionados.length === 0) {
            // Si no hay productos en la misma categoría, tomar algunos aleatorios
            const otros = todosProductos
                .filter(p => p.id !== productoActual.id)
                .slice(0, 4);
            setProductosRelacionados(otros);
        } else {
            setProductosRelacionados(relacionados);
        }
    };

    // Generar estrellas de valoración
    const generarEstrellas = (rating) => {
        const estrellasLlenas = Math.floor(rating);
        const tieneMediaEstrella = rating % 1 >= 0.5;
        const estrellasVacias = 5 - estrellasLlenas - (tieneMediaEstrella ? 1 : 0);
        
        let estrellas = [];
        
        // Estrellas llenas
        for (let i = 0; i < estrellasLlenas; i++) {
            estrellas.push(<span key={`llena-${i}`} className="material-symbols-outlined text-amber-500">star</span>);
        }
        
        // Media estrella
        if (tieneMediaEstrella) {
            estrellas.push(<span key="media" className="material-symbols-outlined text-amber-500">star_half</span>);
        }
        
        // Estrellas vacías
        for (let i = 0; i < estrellasVacias; i++) {
            estrellas.push(<span key={`vacia-${i}`} className="material-symbols-outlined text-slate-600">star</span>);
        }
        
        return estrellas;
    };

    // Guardar en carrito
    const guardarEnCarrito = () => {
        if (producto.tallas && producto.tallas.length > 0 && !tallaSeleccionada) {
            mostrarNotificacion('Por favor selecciona una talla', 'warning');
            return;
        }

        const itemCarrito = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            talla: tallaSeleccionada,
            cantidad: cantidad
        };

        // Obtener carrito actual de localStorage
        let carrito = JSON.parse(localStorage.getItem('carritoAtelier')) || [];
        
        // Verificar si el producto ya está en el carrito
        const itemIndex = carrito.findIndex(i => 
            i.id === itemCarrito.id && i.talla === itemCarrito.talla
        );
        
        if (itemIndex > -1) {
            // Actualizar cantidad
            carrito[itemIndex].cantidad += itemCarrito.cantidad;
        } else {
            // Añadir nuevo item
            carrito.push(itemCarrito);
        }
        
        // Guardar en localStorage
        localStorage.setItem('carritoAtelier', JSON.stringify(carrito));
        
        mostrarNotificacion(`${producto.nombre} añadido al carrito`);
    };

    // Manejar compra ahora
    const handleBuyNow = () => {
        if (producto.tallas && producto.tallas.length > 0 && !tallaSeleccionada) {
            mostrarNotificacion('Por favor selecciona una talla', 'warning');
            return;
        }
        
        mostrarNotificacion('Redirigiendo al checkout...', 'info');
        // Aquí iría la redirección al checkout
    };

    // Cambiar imagen principal
    const cambiarImagen = (url) => {
        setImagenPrincipal(url);
    };

    // Mostrar loading
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Cargando producto...</p>
                </div>
            </div>
        );
    }

    // Mostrar error
    if (error || !producto) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">Producto no encontrado</h3>
                    <p className="text-slate-400 mb-6">El producto que buscas no existe o ha sido removido.</p>
                    <Link 
                        to="/productos" 
                        className="bg-primary hover:bg-red-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                    >
                        Volver a productos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Notificación */}
                {notificacion && (
                    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg animate-fade-in flex items-center gap-3 ${
                        notificacion.tipo === 'success' ? 'bg-green-500' : 
                        notificacion.tipo === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    } text-white`}>
                        <span className="material-symbols-outlined">
                            {notificacion.tipo === 'success' ? 'check_circle' : 
                             notificacion.tipo === 'warning' ? 'warning' : 'info'}
                        </span>
                        <span>{notificacion.mensaje}</span>
                    </div>
                )}

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex text-xs text-slate-500 mb-8 uppercase tracking-widest">
                    <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
                    <span className="mx-2">/</span>
                    <Link to="/productos" className="hover:text-primary transition-colors">Productos</Link>
                    <span className="mx-2">/</span>
                    <span className="text-white font-semibold">{producto.nombre}</span>
                </nav>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div>
                        {/* Main Image */}
                        <div className="relative rounded-xl overflow-hidden mb-4 bg-slate-800">
                            <img 
                                src={imagenPrincipal} 
                                alt={producto.nombre} 
                                className="w-full h-auto object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
                            />
                            
                            {/* Badges */}
                            <div className="absolute top-4 left-4">
                                {producto.en_oferta && (
                                    <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg mr-2">
                                        ¡OFERTA ESPECIAL!
                                    </span>
                                )}
                                {producto.nuevo && (
                                    <span className="bg-green-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
                                        NUEVO
                                    </span>
                                )}
                            </div>
                            
                            {/* Wishlist Button */}
                            <button 
                                onClick={() => {
                                    setEnFavoritos(!enFavoritos);
                                    mostrarNotificacion(
                                        enFavoritos ? 'Producto removido de favoritos' : 'Producto añadido a favoritos'
                                    );
                                }}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg"
                            >
                                <span className={`material-symbols-outlined ${enFavoritos ? 'text-primary' : 'text-white'}`}>
                                    {enFavoritos ? 'favorite' : 'favorite'}
                                </span>
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-3">
                            {/* Miniatura principal */}
                            <button 
                                onClick={() => cambiarImagen(producto.imagen)}
                                className={`border-2 rounded-lg overflow-hidden transition-all ${
                                    imagenPrincipal === producto.imagen ? 'border-primary' : 'border-transparent hover:border-primary'
                                }`}
                            >
                                <img src={producto.imagen} alt={producto.nombre} className="w-full aspect-square object-cover"/>
                            </button>

                            {/* Miniaturas secundarias */}
                            {producto.imagenes_secundarias?.map((img, index) => (
                                <button 
                                    key={index}
                                    onClick={() => cambiarImagen(img)}
                                    className={`border-2 rounded-lg overflow-hidden transition-all ${
                                        imagenPrincipal === img ? 'border-primary' : 'border-transparent hover:border-primary'
                                    }`}
                                >
                                    <img src={img} alt={`${producto.nombre} - vista ${index + 1}`} className="w-full aspect-square object-cover"/>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        {/* Product Header */}
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                    {producto.categoria}
                                </span>
                                <span className="text-xs text-slate-500">
                                    • Código: ATL-{producto.id.toString().padStart(3, '0')}
                                </span>
                            </div>
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
                                {producto.nombre}
                            </h1>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {generarEstrellas(producto.valoracion || 4.2)}
                                    </div>
                                    <span className="text-sm text-slate-500">
                                        {producto.valoracion || 4.2} ({producto.reseñas || 128} reseñas)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                    <span className="text-sm text-slate-500">
                                        {producto.stock > 0 ? 'En stock' : 'Agotado'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-bold text-primary">${producto.precio}</span>
                                {producto.en_oferta && producto.precio_original && (
                                    <>
                                        <span className="text-2xl text-slate-500 line-through">${producto.precio_original}</span>
                                        <span className="bg-red-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                                            -{Math.round((1 - producto.precio / producto.precio_original) * 100)}%
                                        </span>
                                    </>
                                )}
                            </div>
                            <p className="text-sm text-slate-500">Precio incluye IVA. Envío gratuito en pedidos +$50</p>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white">Descripción</h3>
                            <p className="text-slate-400 leading-relaxed">{producto.descripcion}</p>
                            <ul className="space-y-2 text-slate-400">
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>
                                    <span>Tela: {producto.material}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>
                                    <span>Corte: Ajustado en pecho, fluido en falda</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>
                                    <span>Largo: Mid-calf (65cm desde cintura)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>
                                    <span>Forro interior de algodón transpirable</span>
                                </li>
                            </ul>
                        </div>

                        {/* Size Selector */}
                        {producto.tallas && producto.tallas.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-white">Talla</h3>
                                    <button className="text-sm text-primary hover:text-red-500 transition-colors flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">straighten</span>
                                        Guía de tallas
                                    </button>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                    {producto.tallas.map((talla, index) => (
                                        <button
                                            key={talla}
                                            onClick={() => setTallaSeleccionada(talla.toLowerCase())}
                                            className={`border-2 py-3 rounded-lg text-center transition-all ${
                                                tallaSeleccionada === talla.toLowerCase()
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-slate-700 hover:border-primary'
                                            }`}
                                        >
                                            <span className="font-medium text-white">{talla.toUpperCase()}</span>
                                            <div className={`text-xs mt-1 ${
                                                tallaSeleccionada === talla.toLowerCase() ? 'text-primary' : 'text-slate-500'
                                            }`}>
                                                EU {34 + index * 2}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-500">* Producto talla real. Si dudas, escoge una talla más</p>
                            </div>
                        )}

                        {/* Quantity & Actions */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-white">Cantidad</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-slate-700 rounded-lg">
                                        <button 
                                            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                            className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined">remove</span>
                                        </button>
                                        <input 
                                            type="number" 
                                            min="1" 
                                            max={Math.min(producto.stock || 10, 10)}
                                            value={cantidad}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                if (!isNaN(val) && val >= 1 && val <= (producto.stock || 10)) {
                                                    setCantidad(val);
                                                }
                                            }}
                                            className="w-16 h-12 text-center border-x border-slate-700 bg-transparent text-white focus:outline-none"
                                        />
                                        <button 
                                            onClick={() => setCantidad(Math.min(cantidad + 1, producto.stock || 10, 10))}
                                            className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined">add</span>
                                        </button>
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        {producto.stock > 0 ? (
                                            <>Solo quedan <span className="font-bold text-primary">{producto.stock}</span> unidades</>
                                        ) : (
                                            'Producto agotado'
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button 
                                    onClick={guardarEnCarrito}
                                    disabled={!producto.stock}
                                    className="bg-primary hover:bg-red-500 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Añadir al carrito
                                </button>
                                <button 
                                    onClick={handleBuyNow}
                                    disabled={!producto.stock}
                                    className="bg-white text-slate-900 hover:bg-slate-200 py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="material-symbols-outlined">bolt</span>
                                    Comprar ahora
                                </button>
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-500">local_shipping</span>
                                    <div>
                                        <p className="text-sm font-medium text-white">Envío gratis</p>
                                        <p className="text-xs text-slate-500">En 24-48h</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-500">assignment_return</span>
                                    <div>
                                        <p className="text-sm font-medium text-white">Devolución fácil</p>
                                        <p className="text-xs text-slate-500">30 días</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Tabs */}
                <div className="mt-16 pt-12 border-t border-slate-800">
                    {/* Tab Navigation */}
                    <div className="flex border-b border-slate-800 mb-8">
                        {['details', 'reviews', 'shipping'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setTabActivo(tab)}
                                className={`py-4 px-6 text-lg font-medium border-b-2 transition-colors ${
                                    tabActivo === tab
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-slate-500 hover:text-primary'
                                }`}
                            >
                                {tab === 'details' && 'Detalles'}
                                {tab === 'reviews' && 'Reseñas'}
                                {tab === 'shipping' && 'Envío & Devoluciones'}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {tabActivo === 'details' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-4">Especificaciones</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400">Composición</span>
                                            <span className="font-medium text-white">{producto.material}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400">Cuidados</span>
                                            <span className="font-medium text-white">Lavado a mano, Secado plano</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400">Color</span>
                                            <span className="font-medium text-white">
                                                {producto.colores ? producto.colores[0] : 'Principal'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400">Peso</span>
                                            <span className="font-medium text-white">320g</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400">Origen</span>
                                            <span className="font-medium text-white">Diseñado en España</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-4">Medidas</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400">Largo total</span>
                                            <span className="font-medium text-white">110 cm</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400">Pecho</span>
                                            <span className="font-medium text-white">45 cm</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400">Cintura</span>
                                            <span className="font-medium text-white">38 cm</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400">Cadera</span>
                                            <span className="font-medium text-white">48 cm</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-800">
                                            <span className="text-slate-400">Manga</span>
                                            <span className="font-medium text-white">62 cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {tabActivo === 'reviews' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="text-4xl font-bold text-white">{producto.valoracion || 4.2}</div>
                                        <div>
                                            <div className="flex mb-1">
                                                {generarEstrellas(producto.valoracion || 4.2)}
                                            </div>
                                            <p className="text-sm text-slate-500">Basado en {producto.reseñas || 128} reseñas</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-primary hover:bg-red-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    Escribir reseña
                                </button>
                            </div>

                            {/* Reviews Container */}
                            <div className="space-y-6">
                                {/* Review 1 */}
                                <div className="bg-slate-800/50 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                                <span className="text-primary font-bold">M</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">María García</p>
                                                <p className="text-xs text-slate-500">Hace 2 semanas</p>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="material-symbols-outlined text-amber-500 text-sm">
                                                    {i < 4 ? 'star' : 'star'}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-400">
                                        ¡Me encantó! La tela es súper suave y el color es exactamente como en la foto. 
                                        La talla M me quedó perfecta.
                                    </p>
                                </div>

                                {/* Review 2 */}
                                <div className="bg-slate-800/50 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                                <span className="text-primary font-bold">C</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">Carlos Rodríguez</p>
                                                <p className="text-xs text-slate-500">Hace 1 mes</p>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="material-symbols-outlined text-amber-500 text-sm">
                                                    {i < 5 ? 'star' : 'star'}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-400">
                                        Excelente calidad, el envío llegó antes de lo esperado. Muy recomendado.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {tabActivo === 'shipping' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-white">Política de Envío</h4>
                                <ul className="space-y-3 text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">local_shipping</span>
                                        <span>Envío gratuito en pedidos superiores a $50</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">schedule</span>
                                        <span>Entrega en 24-48 horas en zonas urbanas</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">track_changes</span>
                                        <span>Seguimiento en tiempo real</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-white">Devoluciones & Cambios</h4>
                                <ul className="space-y-3 text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">assignment_return</span>
                                        <span>30 días para devoluciones gratuitas</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">sync_alt</span>
                                        <span>Cambios de talla sin costo adicional</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">support_agent</span>
                                        <span>Soporte dedicado para devoluciones</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Related Products */}
                {productosRelacionados.length > 0 && (
                    <section className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-display text-3xl font-bold text-white">Productos relacionados</h2>
                            <Link to="/productos" className="text-primary hover:text-red-500 font-medium flex items-center gap-2 transition-colors">
                                Ver todos
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {productosRelacionados.map(prod => (
                                <ProductCard key={prod.id} product={prod} />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Estilos para animaciones */}
            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}

export default ProductoDetalle;