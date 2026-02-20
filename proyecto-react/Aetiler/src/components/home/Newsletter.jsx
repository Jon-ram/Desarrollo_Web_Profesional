// src/components/home/Newsletter.jsx
import React, { useState } from 'react';

function Newsletter() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            alert('¡Gracias por suscribirte!');
            setEmail('');
        } else {
            alert('Por favor ingresa un email válido');
        }
    };

    return (
        <section className="bg-slate-800 py-12 border-t border-slate-700">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h3 className="text-2xl font-display font-bold mb-3 text-white">
                    Únete a nuestra comunidad
                </h3>
                <p className="text-slate-400 mb-6">
                    Recibe ofertas exclusivas y novedades de moda antes que nadie
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="Tu correo electrónico" 
                        className="flex-1 px-4 py-3 rounded-full border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button 
                        type="submit"
                        className="bg-primary hover:bg-red-500 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    >
                        Suscribirse
                    </button>
                </form>
                <p className="text-xs text-slate-500 mt-3">
                    Al suscribirte aceptas nuestra política de privacidad
                </p>
            </div>
        </section>
    );
}

export default Newsletter;