import React from 'react';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { fahrenheitToCelsius } from '../utils/temperature';

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
    const avgTemp = Math.round(weatherData.hourly.reduce((acc, h) => acc + h.temperature, 0) / weatherData.hourly.length);
    const quickStats = [
      { icon: TrendingUp, label: 'Avg Temp', value: `${fahrenheitToCelsius(avgTemp)}°C`, change: '+1.3°' },
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
      <div className="relative h-80 bg-white/10 rounded-xl p-6 border border-white/20">
        {/* Chart Background Grid */}
        <div className="absolute inset-6">
          <svg width="100%" height="100%" className="opacity-20">
            {[...Array(6)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={`${i * 20}%`}
                x2="100%"
                y2={`${i * 20}%`}
                stroke="white"
                strokeWidth="1"
              />
            ))}
            {[...Array(13)].map((_, i) => (
              <line
                key={`v-${i}`}
                x1={`${i * 8.33}%`}
                y1="0"
                x2={`${i * 8.33}%`}
                y2="100%"
                stroke="white"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        {/* Y-Axis Labels (Temperature) */}
        <div className="absolute left-0 top-6 bottom-6 flex flex-col justify-between text-white/70 text-xs">
          {[30, 25, 20, 15, 10, 5].map((temp, i) => (
            <span key={i}>{temp}°C</span>
          ))}
        </div>

        {/* Temperature Area Chart with Gradient Fill */}
        <div className="absolute inset-6 left-12">
          <svg width="100%" height="100%">
            <defs>
              <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Area Fill */}
            <path
              d={`
                M 0,${100 - ((fahrenheitToCelsius(weatherData.hourly[0].temperature) - 5) / 25) * 100}
                ${weatherData.hourly.slice(0, 12).map((hour, i) =>
                  `L ${i * 9.09},${100 - ((fahrenheitToCelsius(hour.temperature) - 5) / 25) * 100}`
                ).join(' ')}
                L ${11 * 9.09},100 L 0,100 Z
              `}
              fill="url(#tempGradient)"
            />

            {/* Temperature Line */}
            <polyline
              points={weatherData.hourly.slice(0, 12).map((hour, i) =>
                `${i * 9.09}%, ${100 - ((fahrenheitToCelsius(hour.temperature) - 5) / 25) * 100}%`
              ).join(' ')}
              fill="none"
              stroke="#14b8a6"
              strokeWidth="3"
              className="drop-shadow-lg"
            />

            {/* Data Points with Values */}
            {weatherData.hourly.slice(0, 12).map((hour, i) => {
              const tempC = fahrenheitToCelsius(hour.temperature);
              const y = 100 - ((tempC - 5) / 25) * 100;
              return (
                <g key={i}>
                  <circle
                    cx={`${i * 9.09}%`}
                    cy={`${y}%`}
                    r="5"
                    fill="#14b8a6"
                    className="hover:r-7 transition-all duration-200 cursor-pointer"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={`${i * 9.09}%`}
                    y={`${y - 3}%`}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                  >
                    {tempC}°
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Precipitation Bars */}
        <div className="absolute inset-6 left-12 flex items-end justify-between pointer-events-none">
          {weatherData.hourly.slice(0, 12).map((hour, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-teal-400 to-teal-300 opacity-40 hover:opacity-60 transition-opacity duration-200 rounded-t pointer-events-auto cursor-pointer"
              style={{
                height: `${(hour.precipitation / 100) * 70}%`,
                width: '6px'
              }}
              title={`${hour.precipitation}% precipitation`}
            />
          ))}
        </div>

        {/* Chart Labels */}
        <div className="absolute -bottom-1 left-12 right-6 flex justify-between text-white/70 text-xs">
          {weatherData.hourly.slice(0, 12).map((hour, i) => (
            <span key={i}>{hour.time}</span>
          ))}
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 mt-10">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-teal-500 rounded"></div>
          <span className="text-white/80 text-sm">Temperature (°C)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-teal-400/60 rounded"></div>
          <span className="text-white/80 text-sm">Precipitation (%)</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;