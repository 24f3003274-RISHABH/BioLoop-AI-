import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MONSOON_CROP_RECOMMENDATIONS } from '../data/mockData';
import { WeatherCondition } from '../types';
import { InteractiveWeatherWidget } from './InteractiveWeatherWidget';
import {
  CloudRain,
  Sun,
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sprout,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CloudLightning,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import { translateText } from '../utils/translations';

export const WeatherSowingAdvisor: React.FC = () => {
  const { setActiveTab, selectedLanguage } = useApp();
  const [selectedWeather, setSelectedWeather] = useState<WeatherCondition>('rainy');

  // Weather telemetry map
  const weatherProfiles = {
    rainy: {
      title: 'Heavy Monsoon Cloudburst & High Humidity',
      icon: CloudLightning,
      bgColor: 'bg-blue-950',
      borderColor: 'border-blue-700',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      tempC: 28.5,
      moisturePercent: 38.2,
      vpdKpa: 0.8,
      rainfallMm: 85,
      riskLevel: 'Moderate Flood & Nitrogen Leaching',
      recommendedBio: 'Syngenta ISABION',
      actionPlan: 'Drench ISABION at 250ml/acre to prevent root rot, enhance nitrogen uptake, and stabilize oxygen transport in waterlogged soil.',
    },
    heatwave: {
      title: 'Extreme Heatwave (El Niño Event)',
      icon: Sun,
      bgColor: 'bg-amber-950',
      borderColor: 'border-amber-700',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      tempC: 38.8,
      moisturePercent: 16.4,
      vpdKpa: 3.4,
      rainfallMm: 0,
      riskLevel: 'Severe Thermal Shock & Stomatal Closure',
      recommendedBio: 'Syngenta QUANTIS',
      actionPlan: 'Foliar spray QUANTIS at 400ml/acre early morning to maintain cell turgor and prevent flower abortion under >35°C soil heat.',
    },
    sunny: {
      title: 'Optimal Sunny Kharif / Clear Canopy',
      icon: Sun,
      bgColor: 'bg-emerald-950',
      borderColor: 'border-emerald-700',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      tempC: 31.2,
      moisturePercent: 26.8,
      vpdKpa: 1.8,
      rainfallMm: 12,
      riskLevel: 'Low Risk — Peak Photosynthesis Window',
      recommendedBio: 'Syngenta YIELDON',
      actionPlan: 'Apply YIELDON at 250ml/acre during vegetative transition to boost sugar translocation and maximize grain density.',
    },
    mild: {
      title: 'Mild Post-Monsoon / Early Rabi Transition',
      icon: CloudRain,
      bgColor: 'bg-teal-950',
      borderColor: 'border-teal-700',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      tempC: 24.0,
      moisturePercent: 30.0,
      vpdKpa: 1.2,
      rainfallMm: 25,
      riskLevel: 'Mild Dew & Fungal Humidity',
      recommendedBio: 'Syngenta ISABION + Root Booster',
      actionPlan: 'Spray ISABION to stimulate root branching and protect young seedlings during early winter temperature dips.',
    },
  };

  const currentProfile = weatherProfiles[selectedWeather];
  const WeatherIcon = currentProfile.icon;

  // Comparison chart: 2025 Historical vs 2026 Projected with Biostimulants
  const yieldComparisonData = MONSOON_CROP_RECOMMENDATIONS.map((c) => ({
    crop: c.cropName.split(' ')[0],
    '2025 Actual Yield (Q/Acre)': c.historicalYield2025,
    '2026 Projected Yield with Bio (Q/Acre)': c.projectedYield2026WithBio,
  }));

  return (
    <div className="space-y-6">
      {/* Interactive Weather Widget with OpenWeatherMap & Open-Meteo Real-time Data */}
      <InteractiveWeatherWidget />

      {/* Live Agroclimatic Weather & Season Banner */}
      <div className={`${currentProfile.bgColor} text-white rounded-2xl p-6 shadow-xl border ${currentProfile.borderColor} relative overflow-hidden transition-all duration-300`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${currentProfile.badgeColor} flex items-center gap-1.5`}>
                <WeatherIcon className="w-4 h-4 animate-bounce" />
                Live Agroclimatic Season Telemetry
              </span>
              <span className="text-xs bg-white/10 text-slate-200 px-2.5 py-1 rounded-full font-mono">
                2026 Monsoon Sowing Intelligence
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-serif">
              {currentProfile.title}
            </h2>

            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              Real-time atmospheric analysis synchronized with IIT Ropar sensor stations. Select a weather pattern below to observe automatic biostimulant adjustments.
            </p>

            {/* Weather Action Plan */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Prescribed Biostimulant: {currentProfile.recommendedBio}
                </span>
                <span className="text-[10px] text-amber-300 font-mono font-semibold">
                  Risk: {currentProfile.riskLevel}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-normal">{currentProfile.actionPlan}</p>
            </div>
          </div>

          {/* Interactive Weather Preset Switcher */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 space-y-3 shrink-0">
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Simulate Weather Conditions
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSelectedWeather('rainy')}
                className={`p-2.5 rounded-xl border font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                  selectedWeather === 'rainy'
                    ? 'bg-blue-600 text-white border-blue-300 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                }`}
              >
                <CloudLightning className="w-4 h-4 text-blue-300" />
                Heavy Monsoon
              </button>

              <button
                onClick={() => setSelectedWeather('heatwave')}
                className={`p-2.5 rounded-xl border font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                  selectedWeather === 'heatwave'
                    ? 'bg-amber-600 text-white border-amber-300 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-300" />
                Heat Wave
              </button>

              <button
                onClick={() => setSelectedWeather('sunny')}
                className={`p-2.5 rounded-xl border font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                  selectedWeather === 'sunny'
                    ? 'bg-emerald-600 text-white border-emerald-300 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                }`}
              >
                <Sun className="w-4 h-4 text-emerald-300" />
                Clear Sunny
              </button>

              <button
                onClick={() => setSelectedWeather('mild')}
                className={`p-2.5 rounded-xl border font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                  selectedWeather === 'mild'
                    ? 'bg-teal-600 text-white border-teal-300 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                }`}
              >
                <CloudRain className="w-4 h-4 text-teal-300" />
                Mild Rabi
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Metrics Strip */}
        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/10 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-slate-400 text-[10px] block">Temperature</span>
              <span className="font-bold text-white text-sm">{currentProfile.tempC}°C</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/10 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-400" />
            <div>
              <span className="text-slate-400 text-[10px] block">Soil Moisture</span>
              <span className="font-bold text-white text-sm">{currentProfile.moisturePercent}%</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/10 flex items-center gap-2">
            <Wind className="w-4 h-4 text-teal-400" />
            <div>
              <span className="text-slate-400 text-[10px] block">VPD Deficit</span>
              <span className="font-bold text-white text-sm">{currentProfile.vpdKpa} kPa</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/10 flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-indigo-400" />
            <div>
              <span className="text-slate-400 text-[10px] block">24h Rainfall</span>
              <span className="font-bold text-white text-sm">{currentProfile.rainfallMm} mm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monsoon Sowing & Crop Rotation Advisory Matrix */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-700" />
              {translateText('sowingTitle', selectedLanguage)}
            </h3>
            <p className="text-xs text-slate-600">
              {translateText('sowingDesc', selectedLanguage)}
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 self-start md:self-auto">
            Syngenta Biological Agronomy Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MONSOON_CROP_RECOMMENDATIONS.map((crop) => {
            const isHigh = crop.suitabilityStatus === 'Highly Recommended';
            const isMod = crop.suitabilityStatus === 'Moderate';

            return (
              <div
                key={crop.id}
                className={`rounded-2xl p-5 border space-y-3 transition-all ${
                  isHigh
                    ? 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-400'
                    : isMod
                    ? 'bg-amber-50/70 border-amber-200 hover:border-amber-400'
                    : 'bg-rose-50/70 border-rose-200 hover:border-rose-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                      {crop.season}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 font-serif">
                      {crop.cropName}
                    </h4>
                  </div>
                  {isHigh ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : isMod ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] ${
                      isHigh
                        ? 'bg-emerald-200 text-emerald-900'
                        : isMod
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-rose-200 text-rose-900'
                    }`}
                  >
                    {crop.suitabilityStatus}
                  </span>
                  <span className="text-[10px] font-mono text-slate-600 bg-white/80 px-2 py-0.5 rounded border">
                    {crop.monsoonSensitivity}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {crop.reasoning}
                </p>

                <div className="pt-3 border-t border-slate-200/60 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Recommended Product:</span>
                    <span className="font-bold text-emerald-900">{crop.recommendedBiostimulant}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Companion Pair:</span>
                    <span className="font-semibold text-slate-800">{crop.companionCrop}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono pt-1 text-[11px]">
                    <span className="text-slate-500">2026 Target Yield:</span>
                    <span className="font-bold text-emerald-700">{crop.projectedYield2026WithBio} Q/Acre</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Yield Trends Chart (2025 vs 2026 Projection) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              Historical Yield Comparison (2025 Baseline vs. 2026 Bio-Shielded Target)
            </h3>
            <p className="text-xs text-slate-500">
              Demonstrates climate risk mitigation through biostimulant application across major crops
            </p>
          </div>
          <button
            onClick={() => setActiveTab('cropfit')}
            className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            Consult CropFit Advisor <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yieldComparisonData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="crop" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="2025 Actual Yield (Q/Acre)" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              <Bar dataKey="2026 Projected Yield with Bio (Q/Acre)" fill="#047857" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
