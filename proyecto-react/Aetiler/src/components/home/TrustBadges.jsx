// src/components/home/TrustBadges.jsx
import React from 'react';

function TrustBadges() {
    const badges = [
        { icon: 'local_shipping', text: 'Envío gratis +$50' },
        { icon: 'security', text: 'Compra 100% segura' },
        { icon: 'assignment_return', text: 'Devoluciones fáciles' },
        { icon: 'support_agent', text: 'Soporte 24/7' }
    ];

    return (
        <section className="py-8 border-y border-slate-800 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {badges.map((badge, index) => (
                        <div key={index} className="space-y-2">
                            <span className="material-symbols-outlined text-primary text-3xl">
                                {badge.icon}
                            </span>
                            <p className="text-sm font-medium text-slate-300">{badge.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TrustBadges;