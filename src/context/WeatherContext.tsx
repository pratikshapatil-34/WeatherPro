import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WeatherData {
  current: {
    location: string;
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    feelsLike: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    humidity: number;
    windSpeed: number;
  }>;
  hourly: Array<{
    time: string;
    temperature: number;
    condition: string;
    icon: string;
    precipitation: number;
  }>;
  alerts: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'moderate' | 'high' | 'severe';
    expires: string;
  }>;
}

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  location: { lat: number; lng: number } | null;
  searchLocation: (query: string) => Promise<void>;
  refreshWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

// Mock data for demonstration
const generateMockWeatherData = (locationName: string): WeatherData => {
  const conditions = [
    { name: 'Sunny', icon: '☀️' },
    { name: 'Partly Cloudy', icon: '⛅' },
    { name: 'Cloudy', icon: '☁️' },
    { name: 'Rainy', icon: '🌧️' },
    { name: 'Thunderstorm', icon: '⛈️' },
    { name: 'Snow', icon: '❄️' }
  ];

  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const baseTemp = Math.floor(Math.random() * 40) + 50; // 50-90°F

  return {
    current: {
      location: locationName,
      temperature: baseTemp,
      condition: randomCondition.name,
      icon: randomCondition.icon,
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      pressure: Math.floor(Math.random() * 100) + 1000,
      visibility: Math.floor(Math.random() * 5) + 5,
      uvIndex: Math.floor(Math.random() * 10) + 1,
      feelsLike: baseTemp + (Math.random() > 0.5 ? Math.floor(Math.random() * 5) : -Math.floor(Math.random() * 5))
    },
    forecast: Array.from({ length: 5 }, (_, i) => {
      const dayTemp = baseTemp + (Math.random() > 0.5 ? Math.floor(Math.random() * 10) : -Math.floor(Math.random() * 10));
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      return {
        date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        high: dayTemp + Math.floor(Math.random() * 10),
        low: dayTemp - Math.floor(Math.random() * 15),
        condition: condition.name,
        icon: condition.icon,
        precipitation: Math.floor(Math.random() * 80),
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5
      };
    }),
    hourly: Array.from({ length: 24 }, (_, i) => {
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      return {
        time: `${i}:00`,
        temperature: baseTemp + (Math.random() > 0.5 ? Math.floor(Math.random() * 8) : -Math.floor(Math.random() * 8)),
        condition: condition.name,
        icon: condition.icon,
        precipitation: Math.floor(Math.random() * 100)
      };
    }),
    alerts: Math.random() > 0.7 ? [
      {
        id: '1',
        title: 'Severe Weather Warning',
        description: 'Heavy rain and thunderstorms expected in your area. Take necessary precautions.',
        severity: 'high' as const,
        expires: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
      }
    ] : []
  };
};

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const fetchWeatherData = async (locationName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock data
      const data = generateMockWeatherData(locationName);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather API error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (query: string) => {
    await fetchWeatherData(query);
  };

  const refreshWeather = async () => {
    if (weatherData) {
      await fetchWeatherData(weatherData.current.location);
    }
  };

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchWeatherData('Current Location');
        },
        () => {
          // Fallback to default location
          fetchWeatherData('New York, NY');
        }
      );
    } else {
      fetchWeatherData('New York, NY');
    }
  }, []);

  const value = {
    weatherData,
    loading,
    error,
    location,
    searchLocation,
    refreshWeather
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};