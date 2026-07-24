import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  MapPin,
  Search,
  RefreshCw,
  Compass,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  windDir: string;
  pressure: number;
  condition: string;
  description: string;
  iconType: 'clear' | 'clouds' | 'rain' | 'thunder' | 'snow' | 'mist' | 'heat';
  lat: number;
  lon: number;
  isRealTime: boolean;
  source: string;
}

const PRESET_DISTRICTS = [
  { name: 'Nashik, MH', lat: 20.005, lon: 73.789, crop: 'Grape & Tomatoes' },
  { name: 'Bhatinda, PB', lat: 30.211, lon: 74.945, crop: 'Cotton & Wheat' },
  { name: 'Guntur, AP', lat: 16.306, lon: 80.436, crop: 'Chilli & Cotton' },
  { name: 'Coimbatore, TN', lat: 11.016, lon: 76.955, crop: 'Sugarcane & Tea' },
  { name: 'Rajkot, GJ', lat: 22.303, lon: 70.802, crop: 'Groundnut & Cotton' },
  { name: 'Varanasi, UP', lat: 25.317, lon: 82.973, crop: 'Rice & Paddy' },
];

export const InteractiveWeatherWidget: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData>({
    city: 'Nashik, Maharashtra',
    country: 'IN',
    temp: 28.5,
    feelsLike: 29.2,
    tempMin: 24.0,
    tempMax: 32.1,
    humidity: 68,
    windSpeed: 12.4,
    windDir: 'WSW',
    pressure: 1012,
    condition: 'Rain / Moisture',
    description: 'Light monsoon showers with optimal humidity',
    iconType: 'rain',
    lat: 20.005,
    lon: 73.789,
    isRealTime: true,
    source: 'Open-Meteo Live API',
  });

  const apiKey = (import.meta as any).env?.VITE_OPENWEATHER_API_KEY || '';

  // Map WMO or OpenWeather condition code to theme iconType
  const mapCodeToType = (code: number, temp: number): WeatherData['iconType'] => {
    if (temp >= 36) return 'heat';
    if (code === 0 || code === 1 || code === 800) return 'clear';
    if ([2, 3, 801, 802, 803, 804].includes(code)) return 'clouds';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 500, 501, 502, 503, 504].includes(code)) return 'rain';
    if ([95, 96, 99, 200, 201, 202, 211, 212].includes(code)) return 'thunder';
    if ([71, 73, 75, 77, 85, 86, 600, 601, 602].includes(code)) return 'snow';
    return 'mist';
  };

  const fetchWeatherByCoords = async (lat: number, lon: number, cityName?: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // 1. If OpenWeatherMap API key exists, try OpenWeatherMap
      if (apiKey && apiKey.trim() !== '') {
        try {
          const owRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
          );
          if (owRes.ok) {
            const data = await owRes.json();
            const temp = Math.round(data.main.temp * 10) / 10;
            const weatherType = mapCodeToType(data.weather[0].id, temp);
            setWeather({
              city: cityName || data.name || 'Local Farm Plot',
              country: data.sys?.country || 'IN',
              temp,
              feelsLike: Math.round(data.main.feels_like * 10) / 10,
              tempMin: Math.round(data.main.temp_min * 10) / 10,
              tempMax: Math.round(data.main.temp_max * 10) / 10,
              humidity: data.main.humidity,
              windSpeed: Math.round(data.wind.speed * 3.6 * 10) / 10, // m/s to km/h
              windDir: `${data.wind.deg || 0}°`,
              pressure: data.main.pressure,
              condition: data.weather[0].main,
              description: data.weather[0].description,
              iconType: weatherType,
              lat,
              lon,
              isRealTime: true,
              source: 'OpenWeatherMap API',
            });
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn('OpenWeatherMap call failed, falling back to Open-Meteo', e);
        }
      }

      // 2. Open-Meteo Real-Time Weather API (No key required)
      const omRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,surface_pressure,apparent_temperature&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      if (!omRes.ok) throw new Error('Failed to fetch real-time weather from Open-Meteo');

      const omData = await omRes.json();
      const current = omData.current_weather;
      const hourly = omData.hourly;
      const daily = omData.daily;

      const temp = Math.round(current.temperature * 10) / 10;
      const code = current.weathercode;
      const iconType = mapCodeToType(code, temp);

      // Extract current hour index
      const humidity = hourly?.relativehumidity_2m?.[0] || 65;
      const pressure = Math.round(hourly?.surface_pressure?.[0] || 1013);
      const feelsLike = Math.round((hourly?.apparent_temperature?.[0] || temp) * 10) / 10;

      const descriptions: Record<number, string> = {
        0: 'Clear sky with optimal canopy sunlight',
        1: 'Mainly clear, good solar radiation',
        2: 'Partly cloudy, mild transpiration',
        3: 'Overcast skies with light breeze',
        45: 'Foggy morning dew present',
        51: 'Light drizzle, moist soil surface',
        61: 'Sustained rain, watch nitrogen leaching',
        80: 'Rain showers over crop canopy',
        95: 'Thunderstorm warning with wind gusts',
      };

      setWeather({
        city: cityName || `Farm Sector (${lat.toFixed(2)}, ${lon.toFixed(2)})`,
        country: 'IN',
        temp,
        feelsLike,
        tempMin: Math.round((daily?.temperature_2m_min?.[0] || temp - 3) * 10) / 10,
        tempMax: Math.round((daily?.temperature_2m_max?.[0] || temp + 4) * 10) / 10,
        humidity,
        windSpeed: Math.round(current.windspeed * 10) / 10,
        windDir: `${current.winddirection}°`,
        pressure,
        condition: code === 0 ? 'Clear Sky' : code < 4 ? 'Partly Cloudy' : code < 70 ? 'Monsoon Rain' : 'Stormy',
        description: descriptions[code] || 'Real-time satellite micro-climate telemetry',
        iconType,
        lat,
        lon,
        isRealTime: true,
        source: 'Open-Meteo Live API',
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Weather data stream temporarily busy. Re-connecting to satellite...');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCity = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    try {
      // Geocode search via Open-Meteo Geocoding
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchTerm.trim()
        )}&count=1&language=en&format=json`
      );
      if (!geoRes.ok) throw new Error('Geocoding service unavailable');
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setErrorMsg(`City "${searchTerm}" not found. Try searching a district like Nashik or Bhatinda.`);
        setLoading(false);
        return;
      }

      const match = geoData.results[0];
      const displayName = `${match.name}, ${match.admin1 || match.country_code?.toUpperCase() || ''}`;
      await fetchWeatherByCoords(match.latitude, match.longitude, displayName);
    } catch (err) {
      setErrorMsg('Failed to locate city coordinates.');
      setLoading(false);
    }
  };

  const handleUseGeolocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude, 'My Detected Farm Location');
      },
      (err) => {
        setErrorMsg('Unable to detect location. Please select a preset district above.');
        setLoading(false);
      }
    );
  };

  // Initial fetch
  useEffect(() => {
    fetchWeatherByCoords(20.005, 73.789, 'Nashik, Maharashtra');
  }, []);

  // Theme styling based on iconType
  const getThemeStyles = (type: WeatherData['iconType']) => {
    switch (type) {
      case 'clear':
        return {
          bg: 'bg-gradient-to-br from-amber-950/80 via-sky-950/80 to-slate-950',
          border: 'border-amber-500/40',
          accentText: 'text-amber-400',
          iconBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          Icon: Sun,
          badge: 'Clear Canopy • Solar Peak',
        };
      case 'heat':
        return {
          bg: 'bg-gradient-to-br from-red-950/90 via-amber-950/80 to-slate-950',
          border: 'border-red-500/50',
          accentText: 'text-red-400',
          iconBg: 'bg-red-500/20 text-red-300 border-red-500/30',
          Icon: Thermometer,
          badge: 'Extreme Heatwave • Thermal Alert',
        };
      case 'rain':
        return {
          bg: 'bg-gradient-to-br from-blue-950/90 via-indigo-950/80 to-slate-950',
          border: 'border-blue-500/40',
          accentText: 'text-blue-400',
          iconBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          Icon: CloudRain,
          badge: 'Monsoon Rain • Soil Moisture High',
        };
      case 'thunder':
        return {
          bg: 'bg-gradient-to-br from-purple-950/90 via-slate-950 to-indigo-950',
          border: 'border-purple-500/50',
          accentText: 'text-purple-300',
          iconBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          Icon: CloudLightning,
          badge: 'Thunderstorm Risk • Gust Warning',
        };
      case 'snow':
        return {
          bg: 'bg-gradient-to-br from-cyan-950/80 via-slate-950 to-sky-950',
          border: 'border-cyan-500/40',
          accentText: 'text-cyan-300',
          iconBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
          Icon: Snowflake,
          badge: 'Cold Dip • Frost Protection',
        };
      case 'clouds':
      default:
        return {
          bg: 'bg-gradient-to-br from-slate-900 via-zinc-950 to-slate-950',
          border: 'border-slate-700',
          accentText: 'text-emerald-400',
          iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          Icon: CloudSun,
          badge: 'Partly Cloudy • Ideal Transpiration',
        };
    }
  };

  const theme = getThemeStyles(weather.iconType);
  const DynamicWeatherIcon = theme.Icon;

  // Agricultural advice based on real-time parameters
  const getAgriRecommendation = () => {
    if (weather.temp > 35) {
      return {
        product: 'Syngenta QUANTIS',
        dosage: '400 ml / acre',
        reason: 'High heat stress detected. Spray Quantis to protect cellular osmolytes and prevent flower drop.',
        status: 'URGENT FOLIAR SPRAY',
      };
    } else if (weather.condition.toLowerCase().includes('rain') || weather.humidity > 80) {
      return {
        product: 'Syngenta ISABION',
        dosage: '250 ml / acre',
        reason: 'Soil humidity high. Apply Isabion to enhance nitrogen assimilation and prevent waterlogging shock.',
        status: 'ROOT DRENCH RECOMMENDED',
      };
    } else {
      return {
        product: 'Syngenta YIELDON',
        dosage: '250 ml / acre',
        reason: 'Favorable photosynthesis conditions. Apply Yieldon to accelerate cell division and boost yield.',
        status: 'OPTIMAL SPRAY WINDOW',
      };
    }
  };

  const agriRec = getAgriRecommendation();

  return (
    <div
      className={`rounded-2xl border ${theme.border} ${theme.bg} p-5 text-white shadow-2xl transition-all duration-500 space-y-4 relative overflow-hidden`}
    >
      {/* Dynamic Background Glow Effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Location Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl border ${theme.iconBg} shadow-inner`}>
            <DynamicWeatherIcon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-serif tracking-wide">
                Live OpenWeather Telemetry
              </h3>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.iconBg}`}>
                {theme.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>{weather.city}</span>
              <span className="text-slate-400 font-mono">
                ({weather.lat.toFixed(2)}°, {weather.lon.toFixed(2)}°)
              </span>
            </p>
          </div>
        </div>

        {/* Search & Location Trigger Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUseGeolocation}
            disabled={loading}
            className="flex items-center gap-1.5 bg-slate-900/80 hover:bg-slate-800 text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer shadow-sm"
            title="Locate my farm using GPS"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>GPS Locate</span>
          </button>

          <form onSubmit={handleSearchCity} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search city (e.g. Nashik)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-400 rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-emerald-500 w-36 sm:w-48 font-sans"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
          </form>

          <button
            onClick={() => fetchWeatherByCoords(weather.lat, weather.lon, weather.city)}
            className="p-2 bg-slate-900/80 hover:bg-slate-800 rounded-xl border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Refresh Live Weather Stream"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Preset District Shortcuts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">Agri Hubs:</span>
        {PRESET_DISTRICTS.map((d) => (
          <button
            key={d.name}
            onClick={() => fetchWeatherByCoords(d.lat, d.lon, d.name)}
            className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer"
          >
            📍 {d.name}
          </button>
        ))}
      </div>

      {errorMsg && (
        <div className="bg-red-950/80 text-red-200 border border-red-800 text-xs p-2.5 rounded-xl flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Real-Time Telemetry Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left Column: Temperature Big Stats */}
        <div className="md:col-span-5 bg-slate-950/60 p-4 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="text-4xl font-extrabold text-white font-serif tracking-tight flex items-baseline gap-1">
              {weather.temp}°<span className="text-xl font-sans text-slate-400">C</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-mono">Feels Like</span>
              <span className={`text-sm font-bold font-mono ${theme.accentText}`}>
                {weather.feelsLike}°C
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-200 font-medium capitalize flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{weather.condition} — {weather.description}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5 pt-2">
            <span>Min: {weather.tempMin}°C</span>
            <span>Max: {weather.tempMax}°C</span>
            <span className="text-emerald-400">Data: {weather.source}</span>
          </div>
        </div>

        {/* Center Column: Telemetry Gauge Metrics Grid */}
        <div className="md:col-span-7 grid grid-cols-3 gap-2 text-xs font-mono">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10 space-y-1">
            <div className="flex items-center gap-1 text-slate-400 text-[10px]">
              <Droplets className="w-3.5 h-3.5 text-teal-400" />
              <span>Humidity</span>
            </div>
            <div className="text-base font-bold text-teal-300">{weather.humidity}%</div>
            <div className="text-[10px] text-teal-500">Transpiration Opt</div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10 space-y-1">
            <div className="flex items-center gap-1 text-slate-400 text-[10px]">
              <Wind className="w-3.5 h-3.5 text-sky-400" />
              <span>Wind Speed</span>
            </div>
            <div className="text-base font-bold text-sky-300">{weather.windSpeed} km/h</div>
            <div className="text-[10px] text-sky-500">Dir: {weather.windDir}</div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10 space-y-1">
            <div className="flex items-center gap-1 text-slate-400 text-[10px]">
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              <span>Barometer</span>
            </div>
            <div className="text-base font-bold text-amber-300">{weather.pressure} hPa</div>
            <div className="text-[10px] text-amber-500">Stable Front</div>
          </div>
        </div>
      </div>

      {/* Dynamic Agricultural Spraying Advisory Box */}
      <div className="bg-emerald-950/80 border border-emerald-700/60 p-3.5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <div className="p-2 bg-emerald-900 text-emerald-300 rounded-lg border border-emerald-600 shrink-0">
            <Zap className="w-4 h-4 text-emerald-400 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-300 uppercase tracking-wide text-[10px] font-mono bg-emerald-900 px-2 py-0.5 rounded border border-emerald-700">
                {agriRec.status}
              </span>
              <span className="text-white font-bold font-serif">{agriRec.product} ({agriRec.dosage})</span>
            </div>
            <p className="text-slate-300 text-xs mt-0.5">{agriRec.reason}</p>
          </div>
        </div>

        <div className="shrink-0 text-right font-mono text-[11px] text-emerald-400 bg-emerald-900/50 px-3 py-1.5 rounded-lg border border-emerald-700">
          🌱 Synthetic Fertilizer Cut: <span className="font-bold text-white">-25% Urea</span>
        </div>
      </div>
    </div>
  );
};
