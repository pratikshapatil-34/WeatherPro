import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const Forecast: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'hourly'>('daily');
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData) {
    return (
      <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/30 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/30 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { forecast, hourly } = weatherData;

  return (
    <div className="backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-white/20">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 ${
            activeTab === 'daily'
              ? 'bg-white/20 text-white border-b-2 border-white'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>5-Day Forecast</span>
        </button>
        <button
          onClick={() => setActiveTab('hourly')}
          className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 ${
            activeTab === 'hourly'
              ? 'bg-white/20 text-white border-b-2 border-white'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>24-Hour Forecast</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'daily' ? (
          <div className="space-y-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{day.icon}</span>
                  <div>
                    <p className="text-white font-medium">{day.date}</p>
                    <p className="text-white/70 text-sm">{day.condition}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="text-white/70">Precipitation</p>
                    <p className="text-white font-medium">{day.precipitation}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70">Humidity</p>
                    <p className="text-white font-medium">{day.humidity}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70">Wind</p>
                    <p className="text-white font-medium">{day.windSpeed} mph</p>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="text-white text-lg font-semibold">{day.high}°</p>
                    <p className="text-white/70">{day.low}°</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-80 overflow-y-auto">
            {hourly.map((hour, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              >
                <p className="text-white/70 text-sm mb-2">{hour.time}</p>
                <span className="text-xl block mb-2 group-hover:scale-110 transition-transform duration-300">{hour.icon}</span>
                <p className="text-white font-semibold text-lg mb-1">{hour.temperature}°</p>
                <p className="text-white/70 text-xs">{hour.precipitation}%</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Forecast;