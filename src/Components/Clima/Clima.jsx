import { useState, useEffect } from 'react';

const Clima = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reemplaza esto con tu API key de OpenWeatherMap
  const API_KEY = 'f296f7b03924033387d5bae956162fd0';

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=es&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Ciudad no encontrada');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
    <div className="card w-96 bg-base-100 shadow-xl my-10">
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">¿Averigua el clima de tu destino?</h2>
        
        <form onSubmit={handleSubmit} className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Ingresa una ciudad..."
              className="input input-bordered w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button 
              className="btn btn-primary mt-5" 
              type="submit"
              disabled={loading}
            >
              Buscar
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {weather && !loading && !error && (
          <div className="mt-4">
            <h3 className="text-xl font-bold">{weather.name}, {weather.sys.country}</h3>
            <div className="flex items-center gap-4">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <div>
                <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
                <p className="capitalize">{weather.weather[0].description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm">Sensación térmica</p>
                <p className="font-bold">{Math.round(weather.main.feels_like)}°C</p>
              </div>
              <div>
                <p className="text-sm">Humedad</p>
                <p className="font-bold">{weather.main.humidity}%</p>
              </div>
              <div>
                <p className="text-sm">Viento</p>
                <p className="font-bold">{Math.round(weather.wind.speed * 3.6)} km/h</p>
              </div>
              <div>
                <p className="text-sm">Presión</p>
                <p className="font-bold">{weather.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Clima;