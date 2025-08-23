import React from 'react';
import { AlertTriangle, X, Info, AlertCircle } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const WeatherAlerts: React.FC = () => {
  const { weatherData } = useWeather();

  if (!weatherData?.alerts?.length) {
    return null;
  }

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'severe':
        return {
          bg: 'bg-red-500/20 border-red-400/50',
          icon: AlertTriangle,
          iconColor: 'text-red-400'
        };
      case 'high':
        return {
          bg: 'bg-orange-500/20 border-orange-400/50',
          icon: AlertCircle,
          iconColor: 'text-orange-400'
        };
      case 'moderate':
        return {
          bg: 'bg-yellow-500/20 border-yellow-400/50',
          icon: AlertTriangle,
          iconColor: 'text-yellow-400'
        };
      default:
        return {
          bg: 'bg-blue-500/20 border-blue-400/50',
          icon: Info,
          iconColor: 'text-blue-400'
        };
    }
  };

  return (
    <div className="space-y-3">
      {weatherData.alerts.map((alert) => {
        const config = getSeverityConfig(alert.severity);
        const Icon = config.icon;
        
        return (
          <div
            key={alert.id}
            className={`backdrop-blur-lg ${config.bg} rounded-xl p-4 border animate-pulse-slow`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon className={`w-5 h-5 ${config.iconColor}`} />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">{alert.title}</h4>
                <p className="text-white/80 text-sm mb-2">{alert.description}</p>
                <p className="text-white/60 text-xs">
                  Expires: {new Date(alert.expires).toLocaleString()}
                </p>
              </div>
              <button className="flex-shrink-0 text-white/60 hover:text-white transition-colors duration-200">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherAlerts;