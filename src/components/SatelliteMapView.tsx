import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Layers,
  Sparkles,
  MapPin,
  Eye,
  Activity,
  ShieldCheck,
  Zap,
  Info,
  Maximize2,
  RefreshCw,
} from 'lucide-react';

interface SatelliteMapViewProps {
  locationName: string;
  latitude: number;
  longitude: number;
  cropType: string;
  ndvi: number;
  soilMoisture: number;
  soilTemp: number;
}

export const SatelliteMapView: React.FC<SatelliteMapViewProps> = ({
  locationName,
  latitude,
  longitude,
  cropType,
  ndvi,
  soilMoisture,
  soilTemp,
}) => {
  const [mapMode, setMapMode] = useState<'ndvi' | 'trueColor' | 'thermal'>('ndvi');
  const [zoomLevel, setZoomLevel] = useState(14);
  const [selectedField, setSelectedField] = useState<'plotA' | 'plotB' | 'control'>('plotA');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render Satellite Field Map on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);

    if (mapMode === 'trueColor') {
      // Dark agricultural earth background
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, width, height);

      // Draw agricultural field grids (Greenish fields)
      const fieldColors = ['#15803d', '#166534', '#3f6212', '#14532d', '#22543d'];
      for (let i = 0; i < width; i += 60) {
        for (let j = 0; j < height; j += 60) {
          const colorIdx = Math.floor((i + j) / 60) % fieldColors.length;
          ctx.fillStyle = fieldColors[colorIdx];
          ctx.fillRect(i + 2, j + 2, 56, 56);
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 2;
          ctx.strokeRect(i + 2, j + 2, 56, 56);
        }
      }
    } else if (mapMode === 'ndvi') {
      // False color NDVI heatmap (Red/Yellow = Low vegetation, Bright Green = High NDVI)
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#022c22');
      gradient.addColorStop(0.3, '#064e3b');
      gradient.addColorStop(0.6, '#15803d');
      gradient.addColorStop(0.8, '#4d7c0f');
      gradient.addColorStop(1, '#a16207');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw NDVI field polygons with varying biomass density
      const ndviGradients = ['#22c55e', '#16a34a', '#15803d', '#eab308', '#22c55e'];
      for (let i = 0; i < width; i += 70) {
        for (let j = 0; j < height; j += 70) {
          const color = ndviGradients[Math.floor(Math.random() * ndviGradients.length)];
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.7;
          ctx.fillRect(i + 4, j + 4, 62, 62);
          ctx.strokeStyle = '#064e3b';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(i + 4, j + 4, 62, 62);
        }
      }
      ctx.globalAlpha = 1.0;
    } else {
      // Thermal Soil Surface Temperature map
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#450a0a');
      gradient.addColorStop(0.5, '#78350f');
      gradient.addColorStop(1, '#022c22');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Draw Pinpoint Target Polygon for the specific field
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(width / 2 - 50, height / 2 - 40, 100, 80);
    ctx.setLineDash([]);

    // Target Field Fill Highlight
    ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.fillRect(width / 2 - 50, height / 2 - 40, 100, 80);

    // Draw Lat/Lng Crosshair Pin
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pulse rings
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 16, 0, 2 * Math.PI);
    ctx.stroke();

    // Label Text on Canvas
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`Target: ${locationName}`, width / 2 - 45, height / 2 + 30);
    ctx.fillText(`NDVI: ${ndvi} | SMI: ${soilMoisture}%`, width / 2 - 45, height / 2 + 45);
  }, [mapMode, zoomLevel, locationName, ndvi, soilMoisture, soilTemp]);

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 text-white space-y-4 shadow-2xl">
      {/* Header & Satellite View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-950 rounded-xl border border-emerald-800 text-emerald-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-serif">
                Sentinel-2 Google Earth Engine Satellite Canvas
              </h3>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-800">
                10m Resolution
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live multispectral surface reflectance feed • {locationName} (Lat {latitude}, Lng {longitude})
            </p>
          </div>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMapMode('ndvi')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              mapMode === 'ndvi'
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            NDVI False Color
          </button>
          <button
            onClick={() => setMapMode('trueColor')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              mapMode === 'trueColor'
                ? 'bg-sky-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            True Color RGB
          </button>
          <button
            onClick={() => setMapMode('thermal')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              mapMode === 'thermal'
                ? 'bg-amber-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Thermal Surface
          </button>
        </div>
      </div>

      {/* Main Satellite Canvas Canvas Frame */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex justify-center items-center h-[280px]">
        <canvas
          ref={canvasRef}
          width={520}
          height={280}
          className="w-full h-full object-cover cursor-crosshair"
        />

        {/* Live Satellite Status Overlay Badge */}
        <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>SWAN Satellite Sensor: ACTIVE</span>
          </div>
          <div className="text-slate-300">Target Field: {cropType} Plot #1</div>
          <div className="text-slate-400">Revisit Cycle: Every 5 Days</div>
        </div>

        {/* Chemical Fertilizer Savings Badge */}
        <div className="absolute top-3 right-3 bg-emerald-950/90 backdrop-blur-md p-2.5 rounded-xl border border-emerald-800 text-[11px] font-mono space-y-1">
          <div className="flex items-center gap-1 text-emerald-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Chemical Savings</span>
          </div>
          <div className="text-white font-bold text-xs">-28.5 kg Urea / Acre</div>
          <div className="text-emerald-400 text-[10px]">Saved ₹1,420/acre</div>
        </div>

        {/* NDVI Vegetation Scale Bar Bar */}
        <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md p-2 rounded-xl border border-slate-800 flex items-center justify-between text-[10px] font-mono">
          <span className="text-amber-400">0.0 (Bare Soil)</span>
          <div className="flex-1 mx-3 h-2 rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-emerald-500 border border-slate-700" />
          <span className="text-emerald-400">1.0 (Dense Canopy)</span>
        </div>
      </div>

      {/* Field Telemetry Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-[10px] block">NDVI Canopy Score</span>
          <span className="text-base font-bold text-emerald-400">{ndvi}</span>
          <span className="text-[10px] text-emerald-500 block">Healthy Biomass</span>
        </div>

        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Soil Moisture (SMI)</span>
          <span className="text-base font-bold text-teal-300">{soilMoisture}%</span>
          <span className="text-[10px] text-teal-400 block">Optimal Hydration</span>
        </div>

        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Soil Surface Temp</span>
          <span className="text-base font-bold text-amber-300">{soilTemp}°C</span>
          <span className="text-[10px] text-amber-400 block">Safe Bio Window</span>
        </div>

        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Synthetic NPK Reduction</span>
          <span className="text-base font-bold text-emerald-300">-28% Target</span>
          <span className="text-[10px] text-emerald-400 block">Zero Leaching</span>
        </div>
      </div>
    </div>
  );
};
