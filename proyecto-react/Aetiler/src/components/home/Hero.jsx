// src/components/home/Hero.jsx
import React from 'react';

function Hero() {
    return (
        <section className="relative h-[500px] overflow-hidden bg-slate-900">
<img 
    alt="Fashion background" 
    className="absolute inset-0 w-full h-full object-cover" // Sin opacidad en la imagen
    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv8z4dfDQCBiy5TuUcVJwTgxo1wNak5r5ZRAucsEQJkBCN3wHRzVQTw39ntTxpIt3sfmkM4OhHWgf9zzF0BjWDrSusjWJUY6lA43t-jLUewhiZQYBjd4HlxeQ3fTSyhWqs3jP1UgA_xMEu6iaZl4tLkiMA8gA_4xJjsodh-Xb_rbbr7Q7Gr2rbCay4cS5bOJBUCRl9J8YksQvoKohiwstIdof8GL9IWGcc2C_ZDrzpUSpy8rOOHW6p2Fp3eaLAZifmkJg-_-7xhS6q"
/>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="max-w-xl">
                    <span className="inline-block text-[#c4ff00] font-bold text-lg mb-3">
                        Ofertas exclusivas 2024
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-4 text-white">
                        Todo lo que Necesitas
                    </h1>
                    <p className="text-base mb-6 font-medium text-white">
                        Miles de productos en un solo lugar. Ofertas increíbles, envío gratis y la mejor calidad.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Hero;