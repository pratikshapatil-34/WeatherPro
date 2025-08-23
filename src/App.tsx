import React, { useState, useEffect } from 'react';
import { WeatherProvider } from './context/WeatherContext';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherMap from './components/WeatherMap';
import Analytics from './components/Analytics';
import WeatherAlerts from './components/WeatherAlerts';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <WeatherProvider>
      <div className={`min-h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
          : 'bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500'
      }`}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Weather Alerts */}
          <WeatherAlerts />
          
          {/* Current Weather & Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CurrentWeather />
            </div>
            <div className="space-y-6">
              <Analytics compact />
            </div>
          </div>
          
          {/* Forecast */}
          <Forecast />
          
          {/* Interactive Map */}
          <WeatherMap />
          
          {/* Detailed Analytics */}
          <Analytics />
        </main>
      </div>
    </WeatherProvider>
  );
}

export default App;