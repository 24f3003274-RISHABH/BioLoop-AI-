import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
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
  Compass,
  Sliders,
  CheckCircle2,
  Droplets,
  Thermometer,
  FileText,
  Search,
  TrendingUp,
  Calendar,
} from 'lucide-react';

interface PresetLocation {
  name: string;
  state: string;
  lat: number;
  lng: number;
  crop: string;
  soil: string;
  ndvi: number;
  moisture: number;
  temp: number;
}

const PRESET_LOCATIONS: PresetLocation[] = [
  {
    name: 'Nashik District',
    state: 'Maharashtra',
    lat: 20.005,
    lng: 73.789,
    crop: 'Grape & Tomatoes',
    soil: 'Black Basalt Soil',
    ndvi: 0.74,
    moisture: 28.5,
    temp: 27.8,
  },
  {
    name: 'Bhatinda District',
    state: 'Punjab',
    lat: 30.211,
    lng: 74.945,
    crop: 'Cotton & Wheat',
    soil: 'Alluvial Loam',
    ndvi: 0.65,
    moisture: 22.4,
    temp: 34.2,
  },
  {
    name: 'Guntur District',
    state: 'Andhra Pradesh',
    lat: 16.306,
    lng: 80.436,
    crop: 'Chilli & Cotton',
    soil: 'Red Sandy Loam',
    ndvi: 0.71,
    moisture: 25.8,
    temp: 31.5,
  },
  {
    name: 'Coimbatore District',
    state: 'Tamil Nadu',
    lat: 11.016,
    lng: 76.955,
    crop: 'Sugarcane & Tea',
    soil: 'Laterite Clay',
    ndvi: 0.82,
    moisture: 31.0,
    temp: 26.5,
  },
  {
    name: 'Rajkot District',
    state: 'Gujarat',
    lat: 22.303,
    lng: 70.802,
    crop: 'Groundnut & Cotton',
    soil: 'Black Medium Soil',
    ndvi: 0.58,
    moisture: 19.8,
    temp: 35.0,
  },
  {
    name: 'Varanasi District',
    state: 'Uttar Pradesh',
    lat: 25.317,
    lng: 82.973,
    crop: 'Rice & Paddy',
    soil: 'Gangetic Silt',
    ndvi: 0.78,
    moisture: 33.2,
    temp: 29.1,
  },
];

interface SatelliteFieldExplorerProps {
  initialLat?: number;
  initialLng?: number;
  initialCrop?: string;
  initialLocationName?: string;
}

export const SatelliteFieldExplorer: React.FC<SatelliteFieldExplorerProps> = ({
  initialLat = 20.005,
  initialLng = 73.789,
  initialCrop = 'Cotton',
  initialLocationName = 'Nashik Plot #1',
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const overlayLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Explorer State
  const [activeLocation, setActiveLocation] = useState<PresetLocation>(PRESET_LOCATIONS[0]);
  const [viewMode, setViewMode] = useState<'ndvi' | 'moisture' | 'trueColor' | 'thermal'>('ndvi');
  const [opacity, setOpacity] = useState<number>(0.75);
  const [showBoundaries, setShowBoundaries] = useState<boolean>(true);
  const [customLat, setCustomLat] = useState<string>(initialLat.toString());
  const [customLng, setCustomLng] = useState<string>(initialLng.toString());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [plotAreaAcres, setPlotAreaAcres] = useState<number>(4.8);
  const [isScanningGEE, setIsScanningGEE] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<'7d' | '15d' | '30d'>('30d');

  // Helper to generate 30-day historical time series data for recharts
  const generate30DayHistoricalData = (
    baseNdvi: number,
    baseMoisture: number,
    lat: number,
    lng: number
  ) => {
    const points = [];
    const today = new Date();
    const seed = Math.abs(Math.sin(lat * 80 + lng * 30));

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const progress = (30 - i) / 30;
      const sprayBoost = i <= 18 ? 0.09 - (i / 18) * 0.02 : 0;
      const noise = Math.sin(i * 1.4 + seed * 8) * 0.035;

      const ndviVal = Math.min(
        0.92,
        Math.max(
          0.28,
          Math.round((baseNdvi - 0.16 + progress * 0.18 + sprayBoost + noise) * 100) / 100
        )
      );

      const moistureNoise = Math.cos(i * 0.9 + seed * 6) * 3.2;
      const moistureVal = Math.min(
        42,
        Math.max(
          14,
          Math.round((baseMoisture - 4 + progress * 6 + moistureNoise) * 10) / 10
        )
      );

      const tempVal = Math.round((27 + Math.sin(i * 0.4 + seed) * 3.5) * 10) / 10;

      let event: string | undefined = undefined;
      if (i === 18) event = '🌱 Syngenta Bio-Spray';
      if (i === 10) event = '🌧️ Monsoon Shower';
      if (i === 2) event = '🛰️ Sentinel-2 Pass';

      points.push({
        date: dateStr,
        ndvi: ndviVal,
        moisture: moistureVal,
        temp: tempVal,
        event,
      });
    }

    return points;
  };

  const history30Days = generate30DayHistoricalData(
    activeLocation.ndvi,
    activeLocation.moisture,
    activeLocation.lat,
    activeLocation.lng
  );

  const displayedHistory =
    timeframe === '7d'
      ? history30Days.slice(-7)
      : timeframe === '15d'
      ? history30Days.slice(-15)
      : history30Days;

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy previous instance if re-initializing
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [activeLocation.lat, activeLocation.lng],
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    // Base Satellite Layer (Esri World Imagery)
    const baseSatLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Sentinel-2 Satellite',
        maxZoom: 18,
      }
    ).addTo(map);

    tileLayerRef.current = baseSatLayer;

    // Layer Group for Overlays (NDVI Polygons, Markers, Boundaries)
    const overlayGroup = L.layerGroup().addTo(map);
    overlayLayerGroupRef.current = overlayGroup;

    // Custom Target Field Pin Marker
    const customIcon = L.divIcon({
      className: 'custom-leaflet-pin',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-75"></span>
          <div class="relative w-6 h-6 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold">
            🌱
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const marker = L.marker([activeLocation.lat, activeLocation.lng], {
      icon: customIcon,
      draggable: true,
    }).addTo(map);

    markerRef.current = marker;

    // Update coordinates when marker is dragged
    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      setCustomLat(pos.lat.toFixed(5));
      setCustomLng(pos.lng.toFixed(5));
      recalculateMetrics(pos.lat, pos.lng);
    });

    // Map Click Listener to re-position target field pin
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      setCustomLat(lat.toFixed(5));
      setCustomLng(lng.toFixed(5));
      recalculateMetrics(lat, lng);
    });

    // Render Field Overlays
    renderFieldOverlays(map, overlayGroup, activeLocation.lat, activeLocation.lng, viewMode, opacity, showBoundaries);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Recalculate satellite metrics dynamically based on coordinates
  const recalculateMetrics = (lat: number, lng: number) => {
    setIsScanningGEE(true);
    setTimeout(() => {
      // Deterministic synthetic metrics based on lat/lng offset
      const seed = Math.abs(Math.sin(lat * 100 + lng * 50));
      const newNdvi = Math.round((0.55 + seed * 0.35) * 100) / 100;
      const newMoisture = Math.round((18 + seed * 16) * 10) / 10;
      const newTemp = Math.round((25 + (1 - seed) * 10) * 10) / 10;

      setActiveLocation((prev) => ({
        ...prev,
        lat,
        lng,
        ndvi: newNdvi,
        moisture: newMoisture,
        temp: newTemp,
      }));
      setIsScanningGEE(false);
    }, 400);
  };

  // Re-render field polygons & heatmaps when mode or location changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const overlayGroup = overlayLayerGroupRef.current;
    if (!map || !overlayGroup) return;

    map.setView([activeLocation.lat, activeLocation.lng], map.getZoom());
    if (markerRef.current) {
      markerRef.current.setLatLng([activeLocation.lat, activeLocation.lng]);
    }

    renderFieldOverlays(
      map,
      overlayGroup,
      activeLocation.lat,
      activeLocation.lng,
      viewMode,
      opacity,
      showBoundaries
    );
  }, [activeLocation, viewMode, opacity, showBoundaries]);

  // Helper to draw simulated Sentinel-2 field grids & boundary polygons
  const renderFieldOverlays = (
    map: L.Map,
    layerGroup: L.LayerGroup,
    centerLat: number,
    centerLng: number,
    mode: string,
    layerOpacity: number,
    drawBoundaries: boolean
  ) => {
    layerGroup.clearLayers();

    // Field grid offset coordinates (Plot A, Plot B, Control Plot, Neighboring fields)
    const delta = 0.003;

    // Colors according to viewMode
    const getPolygonStyle = (offsetIdx: number) => {
      if (mode === 'ndvi') {
        // Higher NDVI = Darker Green
        const styles = [
          { color: '#16a34a', fillColor: '#22c55e', ndvi: 0.78, label: 'High Biomass (NDVI 0.78)' },
          { color: '#15803d', fillColor: '#16a34a', ndvi: 0.72, label: 'Optimal Canopy (NDVI 0.72)' },
          { color: '#ca8a04', fillColor: '#eab308', ndvi: 0.52, label: 'Moderate Stress (NDVI 0.52)' },
          { color: '#dc2626', fillColor: '#ef4444', ndvi: 0.38, label: 'Nitrogen Deficiency (NDVI 0.38)' },
        ];
        return styles[offsetIdx % styles.length];
      } else if (mode === 'moisture') {
        // NDWI Moisture colors (Blue/Teal = Moist, Amber/Red = Dry)
        const styles = [
          { color: '#0284c7', fillColor: '#38bdf8', ndvi: 0.8, label: 'Optimal Soil Hydration (32%)' },
          { color: '#0d9488', fillColor: '#14b8a6', ndvi: 0.7, label: 'Adequate Moisture (26%)' },
          { color: '#d97706', fillColor: '#f59e0b', ndvi: 0.5, label: 'Mild Drought Shock (19%)' },
          { color: '#2563eb', fillColor: '#60a5fa', ndvi: 0.85, label: 'Irrigated Sector (34%)' },
        ];
        return styles[offsetIdx % styles.length];
      } else if (mode === 'thermal') {
        // Surface Thermal Temperature
        const styles = [
          { color: '#b91c1c', fillColor: '#f87171', ndvi: 0.5, label: 'High Canopy Temp (34.5°C)' },
          { color: '#c2410c', fillColor: '#fb923c', ndvi: 0.6, label: 'Moderate Surface Temp (29.2°C)' },
          { color: '#047857', fillColor: '#34d399', ndvi: 0.8, label: 'Cool Canopy (25.1°C)' },
          { color: '#b91c1c', fillColor: '#ef4444', ndvi: 0.4, label: 'Thermal Stress Window' },
        ];
        return styles[offsetIdx % styles.length];
      } else {
        // True Color - subtle highlight
        return { color: '#10b981', fillColor: '#10b981', ndvi: 0.7, label: 'Field Sector Boundary' };
      }
    };

    // Plot Polygons around center location
    const plots = [
      // Main Target Farm Plot (Center)
      [
        [centerLat - delta * 0.8, centerLng - delta * 1.0],
        [centerLat - delta * 0.8, centerLng + delta * 0.9],
        [centerLat + delta * 0.7, centerLng + delta * 0.8],
        [centerLat + delta * 0.7, centerLng - delta * 0.9],
      ],
      // Adjacent North Plot
      [
        [centerLat + delta * 0.9, centerLng - delta * 0.9],
        [centerLat + delta * 0.9, centerLng + delta * 0.8],
        [centerLat + delta * 2.1, centerLng + delta * 0.7],
        [centerLat + delta * 2.1, centerLng - delta * 1.0],
      ],
      // Adjacent East Plot
      [
        [centerLat - delta * 0.8, centerLng + delta * 1.0],
        [centerLat - delta * 0.8, centerLng + delta * 2.3],
        [centerLat + delta * 0.7, centerLng + delta * 2.2],
        [centerLat + delta * 0.7, centerLng + delta * 1.0],
      ],
      // Control Reference Plot (South-West)
      [
        [centerLat - delta * 2.0, centerLng - delta * 2.1],
        [centerLat - delta * 2.0, centerLng - delta * 0.9],
        [centerLat - delta * 0.9, centerLng - delta * 0.9],
        [centerLat - delta * 0.9, centerLng - delta * 2.1],
      ],
    ];

    plots.forEach((coords, idx) => {
      const style = getPolygonStyle(idx);
      const isTargetPlot = idx === 0;

      const polygon = L.polygon(coords as L.LatLngExpression[], {
        color: isTargetPlot ? '#38bdf8' : style.color,
        weight: isTargetPlot ? 3 : drawBoundaries ? 2 : 1,
        dashArray: isTargetPlot ? '6, 6' : undefined,
        fillColor: style.fillColor,
        fillOpacity: mode === 'trueColor' ? 0.1 : layerOpacity,
      });

      // Bind interactive popup
      const popupContent = `
        <div style="font-family: monospace; font-size: 11px; color: #0f172a; padding: 4px;">
          <div style="font-weight: bold; color: #047857; margin-bottom: 4px; font-size: 12px;">
            ${isTargetPlot ? '🎯 Target Field Sector' : `Sector Plot #${idx + 1}`}
          </div>
          <div><strong>Crop:</strong> ${activeLocation.crop}</div>
          <div><strong>Layer Mode:</strong> ${mode.toUpperCase()}</div>
          <div><strong>Status:</strong> ${style.label}</div>
          <div><strong>NDVI Index:</strong> ${activeLocation.ndvi}</div>
          <div><strong>Soil Moisture:</strong> ${activeLocation.moisture}%</div>
          <div style="margin-top: 6px; padding: 4px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; color: #065f46; font-weight: bold;">
            🌱 Bio-Reduction: -28% Chemical Urea Saved
          </div>
        </div>
      `;

      polygon.bindPopup(popupContent);
      polygon.addTo(layerGroup);
    });
  };

  // Switch location handler
  const handleSelectLocation = (loc: PresetLocation) => {
    setActiveLocation(loc);
    setCustomLat(loc.lat.toString());
    setCustomLng(loc.lng.toString());
  };

  // Direct Coordinate Submit
  const handleApplyCoordinates = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedLat = parseFloat(customLat);
    const parsedLng = parseFloat(customLng);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      alert('Please enter valid numerical latitude and longitude values.');
      return;
    }

    recalculateMetrics(parsedLat, parsedLng);
  };

  // GPS Geolocation
  const handleGPSDetect = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsScanningGEE(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCustomLat(lat.toFixed(5));
        setCustomLng(lng.toFixed(5));
        recalculateMetrics(lat, lng);
      },
      () => {
        alert('Could not retrieve your GPS location. Showing preset agricultural district.');
        setIsScanningGEE(false);
      }
    );
  };

  return (
    <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-5">
      {/* Component Header & Platform Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-950 rounded-xl border border-emerald-700/60 text-emerald-400 shadow-inner">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white font-serif">
                Satellite Field Explorer (Leaflet & Sentinel-2)
              </h2>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-800">
                10m Multispectral GEE Feed
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive high-resolution multispectral layer controls for precision NDVI, NDWI & Canopy Temperature mapping.
            </p>
          </div>
        </div>

        {/* GPS Locate & Scanning Indicator */}
        <div className="flex items-center gap-2">
          {isScanningGEE && (
            <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/80 px-3 py-1.5 rounded-xl border border-amber-800 animate-pulse font-mono">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>GEE Sentinel-2 Scanning...</span>
            </div>
          )}

          <button
            onClick={handleGPSDetect}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-mono px-3 py-2 rounded-xl border border-emerald-600/40 hover:border-emerald-500 transition-all cursor-pointer shadow"
          >
            <Compass className="w-4 h-4" />
            <span>GPS Locate My Field</span>
          </button>
        </div>
      </div>

      {/* Preset District Shortcuts Strip */}
      <div className="space-y-2">
        <span className="text-xs text-slate-400 font-mono block">Select Agricultural Hub & Crop Sector:</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {PRESET_LOCATIONS.map((loc) => {
            const isSelected = activeLocation.name === loc.name;
            return (
              <button
                key={loc.name}
                onClick={() => handleSelectLocation(loc)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-900/90 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs truncate flex items-center gap-1">
                  <MapPin className={`w-3 h-3 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  {loc.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{loc.crop}</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">NDVI {loc.ndvi}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Toolbar: Layer Modes & Opacity Slider */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Layer Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Satellite Overlay Mode:</span>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('ndvi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'ndvi'
                    ? 'bg-emerald-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                NDVI Biomass
              </button>
              <button
                onClick={() => setViewMode('moisture')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'moisture'
                    ? 'bg-sky-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" />
                NDWI Moisture
              </button>
              <button
                onClick={() => setViewMode('thermal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'thermal'
                    ? 'bg-amber-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Thermometer className="w-3.5 h-3.5" />
                Thermal Surface
              </button>
              <button
                onClick={() => setViewMode('trueColor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'trueColor'
                    ? 'bg-teal-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                True Color RGB
              </button>
            </div>
          </div>

          {/* Toggle Boundaries */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showBoundaries}
                onChange={(e) => setShowBoundaries(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Plot Boundaries</span>
            </label>
          </div>
        </div>

        {/* Opacity Slider & Custom Lat/Lng Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-t border-slate-800 pt-3">
          {/* Opacity Control */}
          <div className="md:col-span-5 flex items-center space-x-3 text-xs font-mono">
            <Sliders className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-slate-300">Overlay Opacity: {Math.round(opacity * 100)}%</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg"
            />
          </div>

          {/* Coordinate Direct Inputs */}
          <form onSubmit={handleApplyCoordinates} className="md:col-span-7 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">Lat:</span>
            <input
              type="text"
              value={customLat}
              onChange={(e) => setCustomLat(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-emerald-300 font-mono text-xs px-2.5 py-1.5 rounded-lg w-28 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-slate-400 font-mono">Lng:</span>
            <input
              type="text"
              value={customLng}
              onChange={(e) => setCustomLng(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-emerald-300 font-mono text-xs px-2.5 py-1.5 rounded-lg w-28 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Update Map
            </button>
          </form>
        </div>
      </div>

      {/* Leaflet Map Interactive Canvas Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-inner h-[380px] z-10">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Multispectral Legend overlay */}
        <div className="absolute bottom-4 left-4 z-[400] bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1.5 max-w-xs shadow-xl">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span>
              {viewMode === 'ndvi'
                ? 'NDVI Biomass Scale'
                : viewMode === 'moisture'
                ? 'NDWI Moisture Scale'
                : viewMode === 'thermal'
                ? 'Surface Temp (°C)'
                : 'True Color RGB'}
            </span>
            <span className="text-emerald-400 font-mono">Sentinel-2 MSI</span>
          </div>

          {viewMode === 'ndvi' && (
            <div className="space-y-1">
              <div className="h-2 rounded-full bg-gradient-to-r from-red-600 via-amber-400 to-emerald-500 border border-slate-700" />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>0.0 (Stress)</span>
                <span>0.5 (Moderate)</span>
                <span className="text-emerald-400 font-bold">1.0 (Dense Canopy)</span>
              </div>
            </div>
          )}

          {viewMode === 'moisture' && (
            <div className="space-y-1">
              <div className="h-2 rounded-full bg-gradient-to-r from-amber-600 via-teal-500 to-sky-500 border border-slate-700" />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>10% (Dry)</span>
                <span>25% (Optimal)</span>
                <span className="text-sky-400 font-bold">40% (High Hydration)</span>
              </div>
            </div>
          )}

          {viewMode === 'thermal' && (
            <div className="space-y-1">
              <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-600 border border-slate-700" />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span className="text-emerald-400">22°C (Cool)</span>
                <span>28°C (Ideal)</span>
                <span className="text-red-400 font-bold">38°C (Heatwave)</span>
              </div>
            </div>
          )}
        </div>

        {/* Live Field Telemetry Card Badge */}
        <div className="absolute top-4 right-4 z-[400] bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-emerald-800/80 text-xs font-mono space-y-1.5 shadow-xl max-w-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-slate-800 pb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Target Field Telemetry</span>
          </div>
          <div className="text-white font-serif text-sm font-bold">{activeLocation.crop} Sector</div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div>
              <span className="text-slate-400 block">NDVI Index:</span>
              <span className="text-emerald-400 font-bold text-sm">{activeLocation.ndvi}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Soil Moisture:</span>
              <span className="text-teal-300 font-bold text-sm">{activeLocation.moisture}%</span>
            </div>
            <div>
              <span className="text-slate-400 block">Canopy Temp:</span>
              <span className="text-amber-300 font-bold text-sm">{activeLocation.temp}°C</span>
            </div>
            <div>
              <span className="text-slate-400 block">Urea Cut Target:</span>
              <span className="text-emerald-300 font-bold text-sm">-28% Saved</span>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Day Historical Satellite Telemetry Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white font-serif">
                30-Day Historical Satellite Indices (NDVI & NDWI Moisture)
              </h3>
              <p className="text-[11px] text-slate-400">
                Multi-spectral Sentinel-2 time-series tracking canopy vigor response to Syngenta Biologicals
              </p>
            </div>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setTimeframe('7d')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                timeframe === '7d'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeframe('15d')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                timeframe === '15d'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              15 Days
            </button>
            <button
              onClick={() => setTimeframe('30d')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                timeframe === '30d'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>

        {/* Time-Series Stats Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">NDVI Biomass Gain (30d)</span>
            <span className="text-base font-bold text-emerald-400 font-serif">+22.4% Uplift</span>
            <span className="text-[10px] text-emerald-500 block">Canopy Density Increased</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Moisture Retention</span>
            <span className="text-base font-bold text-sky-300 font-serif">28.5% Avg</span>
            <span className="text-[10px] text-sky-400 block">NDWI Hydration Peak</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Biological Spray Milestone</span>
            <span className="text-base font-bold text-amber-300 font-serif">Day 12 Active</span>
            <span className="text-[10px] text-amber-400 block">Isabion / Quantis Response</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Urea Replacement Target</span>
            <span className="text-base font-bold text-teal-300 font-serif">-28.5% Chemical</span>
            <span className="text-[10px] text-teal-400 block">Saves 25 kg Chemical/Acre</span>
          </div>
        </div>

        {/* Recharts LineChart */}
        <div className="h-[260px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayedHistory} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" domain={[0, 1.0]} stroke="#10b981" fontSize={11} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 50]} stroke="#38bdf8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}
                formatter={(value: any, name: string) => {
                  if (name === 'NDVI Biomass') return [`${value} Index`, 'NDVI Canopy'];
                  if (name === 'Soil Moisture %') return [`${value}%`, 'Soil Moisture'];
                  return [value, name];
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontFamily: 'monospace' }}
              />
              <ReferenceLine
                yAxisId="left"
                y={0.6}
                stroke="#eab308"
                strokeDasharray="4 4"
                label={{ value: 'Optimal Threshold (0.60)', fill: '#eab308', fontSize: 10, position: 'insideTopLeft' }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="ndvi"
                name="NDVI Biomass"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 3, fill: '#10b981' }}
                activeDot={{ r: 6, fill: '#34d399' }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="moisture"
                name="Soil Moisture %"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 2, fill: '#38bdf8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Metrics & Chemical Fertilizer Savings Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] block">Calculated Field Area</span>
          <span className="text-base font-bold text-white font-serif">{plotAreaAcres} Acres</span>
          <span className="text-[10px] text-emerald-400 block">High-Resolution Polygon</span>
        </div>

        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] block">Chemical NPK Reduction</span>
          <span className="text-base font-bold text-emerald-400 font-serif">-28.5% Synthetic Urea</span>
          <span className="text-[10px] text-emerald-500 block">25.0 kg Chemical Saved/Acre</span>
        </div>

        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] block">Cost Savings / Acre</span>
          <span className="text-base font-bold text-amber-300 font-serif">₹1,420 / Acre</span>
          <span className="text-[10px] text-amber-400 block">Syngenta Biologicals Offset</span>
        </div>

        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] block">Geographic Satellite Revisit</span>
          <span className="text-base font-bold text-sky-300 font-serif">Every 5 Days</span>
          <span className="text-[10px] text-sky-400 block">Sentinel-2A & 2B Constellation</span>
        </div>
      </div>
    </div>
  );
};
