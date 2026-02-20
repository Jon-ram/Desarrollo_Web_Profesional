// src/components/pages/Home.jsx
import React from 'react';
import Hero from '../home/Hero';
import TrustBadges from '../home/TrustBadges';
import FeaturedProducts from '../home/FeaturedProducts';
import Newsletter from '../home/Newsletter';

function Home() {
    return (
        <div className="bg-slate-900">
            <Hero />
            <TrustBadges />
            <FeaturedProducts />
            <Newsletter />
        </div>
    );
}

export default Home;