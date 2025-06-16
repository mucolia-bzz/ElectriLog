import React, { useEffect, useState } from 'react';
import LogoImg from '@/assets/logo.png';
import { Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (
        (localStorage.getItem('theme') as 'light' | 'dark') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light')
      );
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={LogoImg} alt="ElectriLog Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ElectriLog
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-800" />
          )}
        </button>
      </div>
    </header>
  );
};
