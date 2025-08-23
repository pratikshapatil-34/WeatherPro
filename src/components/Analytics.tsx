import React from 'react';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

interface AnalyticsProps {
  compact?: boolean;
}

const Analytics: React.FC<AnalyticsProps> = ({ compact = false }) => {
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData) {
    return (
      <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/30 rounded w-1/3"></div>
          {compact ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-white/30 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="h-64 bg-white/30 rounded"></div>
          )}
        </div>
      </div>
    );
  }

  if (compact) {
    const quickStats = [
      { icon: TrendingUp, label: 'Avg Temp', value: `${Math.round(weatherData.hourly.reduce((acc, h) => acc + h.temperature, 0) / weatherData.hourly.length)}°F`, change: '+2.3°' },
      { icon: BarChart3, label: 'Rain Chance', value: `${Math.max(...weatherData.hourly.map(h => h.precipitation))}%`, change: '+15%' },
      { icon: Activity, label: 'Air Quality', value: 'Good', change: 'Improving' }
    ];

    return (
      <div className="space-y-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/20 rounded-xl p-4 border border-white/30 hover:bg-white/25 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-xs">{stat.label}</p>
                    <p className="text-white font-semibold">{stat.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-xs font-medium">{stat.change}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Full Analytics View
  return (
    <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-white/20 rounded-lg">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold">Weather Analytics</h3>
          <p className="text-white/70 text-sm">24-hour temperature and precipitation trends</p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-64 bg-white/10 rounded-xl p-4 border border-white/20">
        {/* Chart Background Grid */}
        <div className="absolute inset-4">
          <svg width="100%" height="100%" className="opacity-30">
            {[...Array(6)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={`${i * 20}%`}
                x2="100%"
                y2={`${i * 20}%`}
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <line
                key={`v-${i}`}
                x1={`${i * 14.28}%`}
                y1="0"
                x2={`${i * 14.28}%`}
                y2="100%"
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>

        {/* Temperature Line Chart */}
        <div className="absolute inset-4">
          <svg width="100%" height="100%">
            <polyline
              points={weatherData.hourly.slice(0, 12).map((hour, i) => 
                `${i * 9.09}%, ${100 - ((hour.temperature - 40) / 50) * 100}%`
              ).join(' ')}
              fill="none"
              stroke="#60A5FA"
              strokeWidth="3"
              className="drop-shadow-lg"
            />
            {/* Data Points */}
            {weatherData.hourly.slice(0, 12).map((hour, i) => (
              <circle
                key={i}
                cx={`${i * 9.09}%`}
                cy={`${100 - ((hour.temperature - 40) / 50) * 100}%`}
                r="4"
                fill="#3B82F6"
                className="hover:r-6 transition-all duration-200 cursor-pointer"
              />
            ))}
          </svg>
        </div>

        {/* Precipitation Bars */}
        <div className="absolute inset-4 flex items-end justify-between">
          {weatherData.hourly.slice(0, 12).map((hour, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-blue-400 to-blue-300 opacity-60 hover:opacity-80 transition-opacity duration-200 rounded-t w-4"
              style={{ height: `${(hour.precipitation / 100) * 60}%` }}
            />
          ))}
        </div>

        {/* Chart Labels */}
        <div className="absolute -bottom-6 left-4 right-4 flex justify-between text-white/70 text-xs">
          {weatherData.hourly.slice(0, 12).map((hour, i) => (
            <span key={i}>{hour.time}</span>
          ))}
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 mt-8">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-blue-400 rounded"></div>
          <span className="text-white/80 text-sm">Temperature (°F)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-400/60 rounded"></div>
          <span className="text-white/80 text-sm">Precipitation (%)</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;