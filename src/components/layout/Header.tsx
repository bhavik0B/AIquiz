import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, ListChecks, BarChart, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();
  
  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/create', label: 'Create Quiz', icon: <Brain size={18} /> },
    { to: '/history', label: 'History', icon: <ListChecks size={18} /> },
    { to: '/stats', label: 'Statistics', icon: <BarChart size={18} /> },
  ];
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              QuizGenius
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium flex items-center
                    ${isActive
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <span className="mr-1.5">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-10">
        <div className="grid grid-cols-4 h-16">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  flex flex-col items-center justify-center
                  ${isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                <div>{link.icon}</div>
                <span className="text-xs mt-1">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;