import React, { useState } from 'react';
import { Search, RefreshCw, Sun, Moon, MapPin } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchLocation, refreshWeather, loading } = useWeather();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchLocation(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌤️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">WeatherPro</h1>
              <p className="text-white/80 text-sm">Advanced Weather Intelligence</p>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location..."
                className="w-64 px-4 py-2 pl-10 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-lg transition-colors duration-200"
              >
                <MapPin className="w-3 h-3" />
              </button>
            </form>

            {/* Refresh Button */}
            <button
              onClick={refreshWeather}
              disabled={loading}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 group"
            >
              <RefreshCw className={`w-5 h-5 text-white transition-transform duration-300 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mt-4 md:hidden relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location..."
            className="w-full px-4 py-2 pl-10 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-lg transition-colors duration-200"
          >
            <MapPin className="w-3 h-3" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;