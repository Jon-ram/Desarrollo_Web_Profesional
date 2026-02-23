// src/components/common/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Cambiar tema"
        >
            {isDark ? (
                <span className="material-symbols-outlined text-yellow-400">light_mode</span>
            ) : (
                <span className="material-symbols-outlined text-slate-700">dark_mode</span>
            )}
        </button>
    );
}

export default ThemeToggle;