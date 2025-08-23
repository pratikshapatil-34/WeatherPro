import React, { useState } from 'react';
import { Map, Layers, Satellite, Cloud, Zap } from 'lucide-react';

const WeatherMap: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'temperature' | 'precipitation' | 'clouds' | 'wind'>('temperature');
  
  const mapLayers = [
    { id: 'temperature', label: 'Temperature', icon: Map, color: 'from-blue-500 to-red-500' },
    { id: 'precipitation', label: 'Precipitation', icon: Cloud, color: 'from-green-400 to-blue-600' },
    { id: 'clouds', label: 'Cloud Cover', icon: Satellite, color: 'from-gray-400 to-white' },
    { id: 'wind', label: 'Wind Speed', icon: Zap, color: 'from-yellow-400 to-orange-500' }
  ];

  return (
    <div className="backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 overflow-hidden">
      {/* Map Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Interactive Weather Map</h3>
            <p className="text-white/70 text-sm">Real-time weather data visualization</p>
          </div>
        </div>
        
        {/* Layer Controls */}
        <div className="flex items-center space-x-2">
          {mapLayers.map((layer) => {
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeLayer === layer.id
                    ? 'bg-white/30 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{layer.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        {/* Map Placeholder with Dynamic Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Base Map Representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800">
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </div>

            {/* Dynamic Weather Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${mapLayers.find(l => l.id === activeLayer)?.color} opacity-30 mix-blend-overlay`}>
              {/* Animated Weather Patterns */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-16 h-16 rounded-full bg-white/20 animate-pulse"
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2 space-y-2">
              <button className="block w-8 h-8 bg-white/30 rounded hover:bg-white/40 transition-colors duration-200 flex items-center justify-center text-white text-lg font-bold">+</button>
              <button className="block w-8 h-8 bg-white/30 rounded hover:bg-white/40 transition-colors duration-200 flex items-center justify-center text-white text-lg font-bold">-</button>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <h4 className="text-white font-medium text-sm mb-2">{mapLayers.find(l => l.id === activeLayer)?.label}</h4>
              <div className={`h-3 w-24 rounded-full bg-gradient-to-r ${mapLayers.find(l => l.id === activeLayer)?.color}`}></div>
              <div className="flex justify-between text-white/70 text-xs mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Elements Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Weather Stations/Points */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-lg pointer-events-auto cursor-pointer hover:scale-150 transition-transform duration-200"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Map Footer */}
      <div className="p-4 bg-white/10 border-t border-white/20">
        <div className="flex items-center justify-between text-sm">
          <p className="text-white/70">
            Showing {mapLayers.find(l => l.id === activeLayer)?.label.toLowerCase()} data for your region
          </p>
          <p className="text-white/70">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;