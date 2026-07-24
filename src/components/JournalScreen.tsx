import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BIOLOGICAL_PRODUCTS } from '../data/mockData';
import { SeasonJournalRecord } from '../types';
import { SatelliteMapView } from './SatelliteMapView';
import { translateText } from '../utils/translations';
import {
  BookOpen,
  PlusCircle,
  Terminal,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers,
  Sprout,
  Activity,
  Trash2,
  LineChart,
  Globe,
  Radio,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const JournalScreen: React.FC = () => {
  const {
    journalRecords,
    addJournalRecord,
    deleteJournalRecord,
    setActiveTab,
    setSelectedJournalForAnalysis,
    selectedLanguage,
  } = useApp();

  const [productName, setProductName] = useState('Isabion');
  const [applicationDate, setApplicationDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [plotSize, setPlotSize] = useState<number>(5.0);
  const [locationName, setLocationName] = useState('Bhatinda, Punjab');
  const [latitude, setLatitude] = useState<number>(30.211);
  const [longitude, setLongitude] = useState<number>(74.945);
  const [observedHealth, setObservedHealth] = useState<
    'Good' | 'Heat Stressed' | 'Yellowing Leaves' | 'Water Stressed'
  >('Heat Stressed');
  const [soilType, setSoilType] = useState('Clay');
  const [cropType, setCropType] = useState('Cotton');

  // Terminal Simulator State
  const [isIngesting, setIsIngesting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const presets = [
    { name: 'Bhatinda, Punjab', lat: 30.211, lng: 74.945, soil: 'Clay', crop: 'Cotton' },
    { name: 'Nashik, Maharashtra', lat: 20.005, lng: 73.789, soil: 'Black Soil', crop: 'Sugarcane' },
    { name: 'Guntur, Andhra Pradesh', lat: 16.306, lng: 80.436, soil: 'Sandy Loam', crop: 'Tomatoes' },
  ];

  const handleRegisterApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setIsIngesting(true);
    setTerminalLogs([]);

    const logSteps = [
      `[GEE-INGEST] Connecting to Google Earth Engine API v1.2...`,
      `[GEE-INGEST] Querying Sentinel-2 Surface Reflectance (B4, B8) for Lat: ${latitude}, Lng: ${longitude}...`,
      `[GEE-INGEST] Extracting Normalized Difference Vegetation Index (NDVI): 0.69...`,
      `[SWAN-WEATHER] Querying Soil Moisture Index (SMI) & 5-day thermal history... Soil Moisture: 27.5%`,
      `[BIGQUERY] Archiving climate covariates & phenology vector to BigQuery cluster...`,
      `[SUCCESS] Application record saved to Local Storage & GEE cloud archive.`,
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        setTerminalLogs((prev) => [...prev, logSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          // Calculate realistic GEE metrics
          const simNdvi = parseFloat((0.60 + Math.random() * 0.20).toFixed(2));
          const simSoilMoisture = parseFloat((22 + Math.random() * 8).toFixed(1));
          const simSoilTemp = parseFloat((26 + Math.random() * 8).toFixed(1));

          addJournalRecord({
            productName,
            applicationDate,
            plotSizeAcres: plotSize,
            locationName,
            latitude,
            longitude,
            observedCropHealth: observedHealth,
            soilType,
            cropType,
            geeMetrics: {
              ndvi: simNdvi,
              soilMoisturePercent: simSoilMoisture,
              soilTemperatureC: simSoilTemp,
              readinessScore: simSoilMoisture > 22 && simSoilTemp < 32 ? 'High' : 'Moderate',
              readinessMatchPercentage: simSoilMoisture > 22 ? 92 : 78,
            },
            harvestLogged: false,
          });

          setIsIngesting(false);
        }, 800);
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              Earth Engine Season Field Journal
            </h2>
            <span className="text-xs bg-teal-100 text-teal-800 font-mono px-2.5 py-0.5 rounded-full font-bold">
              Sentinel-2 GEE Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Register biological applications and ingest live Google Earth Engine (GEE) satellite environmental covariates
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-900 text-emerald-400 px-3 py-1.5 rounded-xl border border-slate-800">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Sentinel-2 GEE Ingestor: ACTIVE</span>
        </div>
      </div>


      {/* Sentinel-2 Interactive Satellite Map Canvas */}
      <SatelliteMapView
        locationName={locationName}
        latitude={latitude}
        longitude={longitude}
        cropType={cropType}
        ndvi={0.68}
        soilMoisture={26.4}
        soilTemp={28.2}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Registration Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-700" />
            Register Biological Application Record
          </h3>

          {/* Location Presets */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Quick Location Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    setLocationName(p.name);
                    setLatitude(p.lat);
                    setLongitude(p.lng);
                    setSoilType(p.soil);
                    setCropType(p.crop);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    locationName === p.name
                      ? 'bg-emerald-700 text-white font-bold border-emerald-800'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleRegisterApplication} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Syngenta Product</label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-600"
                >
                  {BIOLOGICAL_PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Application Date</label>
                <input
                  type="date"
                  value={applicationDate}
                  onChange={(e) => setApplicationDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Crop Type</label>
                <input
                  type="text"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-600"
                  placeholder="e.g. Cotton, Sugarcane"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Clay">Clay Soil</option>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Sandy Loam">Sandy Loam</option>
                  <option value="Alluvial">Alluvial</option>
                  <option value="Red Soil">Red Soil</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Plot Size (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={plotSize}
                  onChange={(e) => setPlotSize(parseFloat(e.target.value) || 1)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Latitude</label>
                <input
                  type="number"
                  step="0.001"
                  value={latitude}
                  onChange={(e) => setLatitude(parseFloat(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Longitude</label>
                <input
                  type="number"
                  step="0.001"
                  value={longitude}
                  onChange={(e) => setLongitude(parseFloat(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Observed Crop Health</label>
              <select
                value={observedHealth}
                onChange={(e) =>
                  setObservedHealth(
                    e.target.value as 'Good' | 'Heat Stressed' | 'Yellowing Leaves' | 'Water Stressed'
                  )
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Good">Good (Healthy Canopy)</option>
                <option value="Heat Stressed">Heat Stressed (Thermal Drop)</option>
                <option value="Water Stressed">Water Stressed (Low SMI)</option>
                <option value="Yellowing Leaves">Yellowing Leaves (Chlorosis)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isIngesting}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Globe className="w-4 h-4" />
              {isIngesting ? 'Ingesting Earth Engine Data...' : 'Register Application & Sync GEE Satellite'}
            </button>
          </form>
        </div>

        {/* Visual GEE Terminal Ingestor */}
        <div className="lg:col-span-6 bg-slate-950 text-emerald-400 rounded-2xl p-6 border border-slate-800 font-mono text-xs flex flex-col justify-between shadow-xl min-h-[380px]">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-2 text-white font-bold font-sans">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Google Earth Engine Live Ingestion Terminal
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                SWAN Model v2.4
              </span>
            </div>

            {terminalLogs.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <Radio className="w-8 h-8 text-slate-700 mx-auto animate-pulse" />
                <p>Waiting for application registration to trigger satellite spectral extraction...</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[320px] overflow-y-auto">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <span className="text-slate-600 text-[10px] select-none">&gt;</span>
                    <span
                      className={
                        log?.includes('SUCCESS')
                          ? 'text-emerald-300 font-bold'
                          : log?.includes('GEE')
                          ? 'text-teal-300'
                          : 'text-amber-300'
                      }
                    >
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-900 text-[11px] text-slate-500 flex items-center justify-between font-sans">
            <span>Coordinates Target: Lat {latitude}, Lng {longitude}</span>
            <span className="text-emerald-500 font-mono">Bands: B4 (Red), B8 (NIR)</span>
          </div>
        </div>
      </div>

      {/* Active Application Logs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            Active Application Logs & Earth Engine Metrics ({journalRecords.length})
          </h3>
          <span className="text-xs text-slate-500">
            Persisted in browser database for Causal Inference analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {journalRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 hover:border-emerald-300 transition-colors relative"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                    {record.id}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 font-serif mt-1">
                    {record.productName} on {record.cropType}
                  </h4>
                </div>
                <button
                  onClick={() => deleteJournalRecord(record.id)}
                  title="Delete Log"
                  className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {record.locationName}
                  </span>
                  <span className="font-semibold text-slate-800">{record.plotSizeAcres} Acres</span>
                </div>

                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    App Date: {record.applicationDate}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    Soil: {record.soilType}
                  </span>
                </div>
              </div>

              {/* GEE Metrics Badge Box */}
              <div className="bg-slate-950 text-white rounded-xl p-3 space-y-2 border border-slate-800">
                <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center justify-between">
                  <span>Google Earth Engine Telemetry</span>
                  <span className="text-emerald-400 font-bold">
                    Readiness: {record.geeMetrics.readinessScore}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-[9px] text-slate-400">NDVI</div>
                    <div className="font-bold text-emerald-400">{record.geeMetrics.ndvi}</div>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-[9px] text-slate-400">Soil Moisture</div>
                    <div className="font-bold text-teal-300">{record.geeMetrics.soilMoisturePercent}%</div>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="text-[9px] text-slate-400">Soil Temp</div>
                    <div className="font-bold text-amber-300">{record.geeMetrics.soilTemperatureC}°C</div>
                  </div>
                </div>
              </div>

              {/* Harvest & Yield Status Bar */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                {record.harvestLogged ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Harvest Logged ({record.actualYieldQuintalPerAcre} Q/Acre)
                  </span>
                ) : (
                  <span className="text-amber-600 font-medium">Harvest Pending</span>
                )}

                <button
                  onClick={() => {
                    setSelectedJournalForAnalysis(record);
                    setActiveTab('causal');
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-1.5 px-3 rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <LineChart className="w-3.5 h-3.5" />
                  Analyze Causal ROI
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
