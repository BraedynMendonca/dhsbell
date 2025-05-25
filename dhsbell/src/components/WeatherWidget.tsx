import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Loader2 } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=c8d97864544244659cf20213252505&q=Dublin,CA&aqi=no`
        );
        const data = await response.json();
        
        // Check if the API returned an error
        if (data.error) {
          console.error('API Error:', data.error.message);
          throw new Error(data.error.message || 'Failed to fetch weather data');
        }

        setWeather({
          temp: Math.round(data.current.temp_f),
          condition: data.current.condition.text.toLowerCase()
        });
        setError(null);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Unable to load weather data');
        // Fallback data
        setWeather({
          temp: 72,
          condition: 'clear'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudRain className="w-6 h-6" />;
    } else if (condition.includes('cloud')) {
      return <Cloud className="w-6 h-6" />;
    } else if (condition.includes('snow')) {
      return <CloudSnow className="w-6 h-6" />;
    } else if (condition.includes('thunder')) {
      return <CloudLightning className="w-6 h-6" />;
    }
    return <Sun className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getWeatherIcon(weather.condition)}
          <span className="ml-2 text-2xl font-semibold text-gray-800 dark:text-white">
            {weather.temp}°F
          </span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Dublin, CA
        </span>
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default WeatherWidget;