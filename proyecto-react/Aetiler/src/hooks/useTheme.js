// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

export function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        // Verificar localStorage primero
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Si no hay preferencia guardada, usar preferencia del sistema
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Aplicar la clase 'dark' al elemento html
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return { isDark, toggleTheme };
}