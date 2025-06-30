import React, { useState, useEffect } from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Menu, Sun, Moon } from 'lucide-react';
import LogoImg from '@/assets/logo.png';

export const Header: React.FC<{
  setTab: (tab: string) => void;
}> = ({ setTab }) => {
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

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <header className="w-full bg-white dark:bg-zinc-900 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo & Title */}
        <div className="flex items-center space-x-2">
          <img src={LogoImg} alt="ElectriLog Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ElectriLog
          </h1>
        </div>

        {/* Right: Tabs/Hamburger & Dark Toggle grouped */}
        <div className="flex items-center space-x-4">
          {/* Horizontal tabs for md+ */}
          <TabsList className="hidden md:flex space-x-4">
            <TabsTrigger
              value="dashboard"
              className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="upload"
              className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600"
            >
              Upload
            </TabsTrigger>
            <TabsTrigger
              value="consumption"
              className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600"
            >
              Verbrauch
            </TabsTrigger>
            <TabsTrigger
              value="export"
              className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600"
            >
              Export
            </TabsTrigger>
          </TabsList>

          {/* Hamburger menu for small screens */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setTab('dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTab('upload')}>
                  Upload
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTab('consumption')}>
                  Verbrauch
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTab('export')}>
                  Export
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded focus:outline-none hover:bg-gray-100 dark:hover:bg-zinc-800"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-900" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
