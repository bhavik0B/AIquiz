import React, { useEffect } from 'react';
import Header from './Header';
import { useThemeStore } from '../../store/themeStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useThemeStore();
  
  // Apply dark mode class to html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-200">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 mb-16 md:mb-0">
        {children}
      </main>
      
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 px-4 text-center text-sm text-gray-500 dark:text-gray-400 hidden md:block">
        <p>© 2025 QuizGenius. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;