import React from 'react';
import { Thermometer, Droplets, Wind, Eye, Sun, Gauge } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const CurrentWeather: React.FC = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/30 rounded w-3/4"></div>
          <div className="h-16 bg-white/30 rounded w-1/2"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-white/30 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="backdrop-blur-lg bg-red-500/20 rounded-2xl p-8 border border-red-400/30">
        <p className="text-white text-center">{error || 'Failed to load weather data'}</p>
      </div>
    );
  }

  const { current } = weatherData;

  const weatherMetrics = [
    { icon: Thermometer, label: 'Feels Like', value: `${current.feelsLike}°F` },
    { icon: Droplets, label: 'Humidity', value: `${current.humidity}%` },
    { icon: Wind, label: 'Wind Speed', value: `${current.windSpeed} mph` },
    { icon: Gauge, label: 'Pressure', value: `${current.pressure} mb` },
    { icon: Eye, label: 'Visibility', value: `${current.visibility} mi` },
    { icon: Sun, label: 'UV Index', value: current.uvIndex.toString() }
  ];

  return (
    <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300">
      {/* Current Temperature */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white/80 text-lg font-medium mb-2">{current.location}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-6xl font-light text-white">{current.temperature}°</span>
            <div>
              <span className="text-4xl">{current.icon}</span>
              <p className="text-white/90 text-xl font-medium">{current.condition}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {weatherMetrics.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="backdrop-blur-sm bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">{label}</p>
                <p className="text-white font-semibold">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;