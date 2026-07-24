import React from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_WEATHER_ALERTS, BIOLOGICAL_PRODUCTS, SCENARIO_PRESETS } from '../data/mockData';
import { CausalInferenceResult } from '../types';
import {
  MapPin,
  Thermometer,
  Droplets,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  BookOpen,
  LineChart,
  BarChart2,
  CheckCircle2,
  Sun,
  Activity,
} from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const {
    setActiveTab,
    currentLocation,
    setCurrentLocation,
    journalRecords,
    causalResults,
    setSelectedScenario,
  } = useApp();

  // Compute live statistics
  const totalAcres = journalRecords.reduce((acc, r) => acc + (r.plotSizeAcres || 0), 0);
  const activeLogsCount = journalRecords.length;
  const harvestedCount = journalRecords.filter((r) => r.harvestLogged).length;

  const resultsArray = Object.values(causalResults) as CausalInferenceResult[];
  const totalRobiINR = resultsArray.reduce((acc, r) => acc + (r.netROBI_INR || 0), 0);
  const avgYieldLift =
    resultsArray.length > 0
      ? (
          resultsArray.reduce((acc, r) => acc + r.isolatedYieldLiftPercent, 0) /
          resultsArray.length
        ).toFixed(1)
      : '13.4';

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-700/50 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Activity className="w-96 h-96 text-white" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Location Context: {currentLocation.region}, {currentLocation.state}, India
            </span>

            {/* Quick Location Context Switcher */}
            <div className="flex items-center gap-1 text-xs text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
              <span className="text-emerald-400 font-medium">Switch Region:</span>
              <button
                onClick={() => setCurrentLocation({ region: 'Bhatinda', state: 'Punjab' })}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  currentLocation.state === 'Punjab' ? 'bg-emerald-600 text-white font-bold' : 'hover:text-white'
                }`}
              >
                Punjab
              </button>
              <button
                onClick={() => setCurrentLocation({ region: 'Nashik', state: 'Maharashtra' })}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  currentLocation.state === 'Maharashtra' ? 'bg-emerald-600 text-white font-bold' : 'hover:text-white'
                }`}
              >
                Maharashtra
              </button>
              <button
                onClick={() => setCurrentLocation({ region: 'Guntur', state: 'Andhra Pradesh' })}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  currentLocation.state === 'Andhra Pradesh' ? 'bg-emerald-600 text-white font-bold' : 'hover:text-white'
                }`}
              >
                Andhra
              </button>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-serif leading-tight">
            Welcome to BioLoop AI Farming Command Center
          </h2>
          <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed max-w-3xl">
            Integrated Causal AI platform powered by <strong className="text-emerald-300">Syngenta Biologicals</strong> and <strong className="text-emerald-300">ANNAM.AI (IIT Ropar)</strong>. Track real-time satellite crop health, receive multilingual biostimulant recommendations, log application records, and prove exact Return on Biological Investment (ROBI) using Double Machine Learning (DML).
          </p>
        </div>
      </div>

      {/* Live Agroclimatic Alert Panel (ANNAM.AI Smart Weather Stations) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100">Live Agroclimatic Alert Panel</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono px-2 py-0.5 rounded font-bold">
                  ANNAM.AI Weather Stations
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Continuous telemetry from IIT Ropar sensor network & SWAN climate models
              </p>
            </div>
          </div>

          {/* Telemetry Metrics */}
          <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span>Soil Temp: <strong className="text-white text-sm">35.8°C</strong></span>
            </div>
            <div className="text-slate-700">|</div>
            <div className="flex items-center gap-1.5 text-teal-400 font-mono">
              <Droplets className="w-4 h-4 text-teal-400" />
              <span>Soil Moisture: <strong className="text-white text-sm">19.2%</strong></span>
            </div>
            <div className="text-slate-700">|</div>
            <div className="flex items-center gap-1.5 text-amber-300 font-mono hidden sm:flex">
              <Sun className="w-4 h-4 text-amber-300" />
              <span>VPD: <strong className="text-white text-sm">2.8 kPa</strong></span>
            </div>
          </div>
        </div>

        {/* Alerts Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_WEATHER_ALERTS.map((alert) => (
            <div
              key={alert.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {alert.affectedRegion}
                </span>
                <span className="text-[11px] font-mono text-slate-500">{alert.timestamp}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100">{alert.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {alert.recommendedAction}
                </span>
                <button
                  onClick={() => {
                    const matchedPreset = SCENARIO_PRESETS.find((p) => p.state.includes('Punjab')) || SCENARIO_PRESETS[0];
                    setSelectedScenario(matchedPreset);
                    setActiveTab('cropfit');
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Apply BioShield <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-slate-500">Total Farm Area Tracked</div>
          <div className="text-2xl font-bold text-emerald-950 font-serif">
            {totalAcres.toFixed(1)} <span className="text-sm font-sans font-normal text-slate-600">Acres</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">Google Earth Engine Ingested</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-slate-500">Active Biological Logs</div>
          <div className="text-2xl font-bold text-emerald-950 font-serif">
            {activeLogsCount} <span className="text-sm font-sans font-normal text-slate-600">Plots</span>
          </div>
          <div className="text-[11px] text-slate-500">{harvestedCount} Harvests Analyzed</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-slate-500">Est. Causal Net ROBI Created</div>
          <div className="text-2xl font-bold text-emerald-700 font-serif">
            ₹{totalRobiINR.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            Double ML Verified Return
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-slate-500">Isolated Yield Lift</div>
          <div className="text-2xl font-bold text-emerald-950 font-serif">
            +{avgYieldLift}% <span className="text-sm font-sans font-normal text-slate-600">Avg</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">Syngenta Biostimulant Lift</div>
        </div>
      </div>

      {/* Navigation Hub Cards with Progress Trackers */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-3 font-serif">
          Integrated Biological Workflow Hub
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hub Card 1: CropFit */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                  STEP 1: CROPFIT AI
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">CropFit Multilingual Advisor</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Query Gemini AI in 5 regional languages via voice or scenario shortcuts to receive customized Syngenta Biological recommendations with XAI rationale.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Advisor Status:</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 3 Scenarios Pre-loaded
                </span>
              </div>
              <button
                onClick={() => setActiveTab('cropfit')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Get AI Recommendation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hub Card 2: Season Journal */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full">
                  STEP 2: EARTH ENGINE
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Log Application & Earth Data</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Register application details and trigger automated live Google Earth Engine (GEE) satellite NDVI & Soil Moisture Index (SMI) data ingestion terminal.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Active Logs:</span>
                <span className="text-teal-700 font-semibold">
                  {journalRecords.length} Fields Tracked
                </span>
              </div>
              <button
                onClick={() => setActiveTab('journal')}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Open Season Journal <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hub Card 3: Yield Impact */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <LineChart className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full">
                  STEP 3: DOUBLE ML TWIN
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Analyze Yield & Prove ROI</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Run client-side Double Machine Learning (DML) causal inference simulator to construct synthetic control baselines and calculate exact ROBI in Rupees.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Causal Engine:</span>
                <span className="text-indigo-700 font-semibold font-mono">
                  DML / Propensity Ready
                </span>
              </div>
              <button
                onClick={() => setActiveTab('causal')}
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Analyze Yield & ROBI <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Syngenta Product Showcase Banner */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-emerald-950 font-serif flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Featured Syngenta Biological Portfolio Products
          </h3>
          <button
            onClick={() => setActiveTab('benchmark')}
            className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            View Regional Efficacy Data <BarChart2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BIOLOGICAL_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm space-y-2 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-900 font-serif">{prod.name}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono">
                  {prod.dosage}
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-medium italic">{prod.tagline}</p>
              <p className="text-[11px] text-slate-600 line-clamp-2">{prod.description}</p>
              <div className="pt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-100">
                <span>Ideal Temp: {prod.idealSoilTempRange}</span>
                <span className="text-emerald-700 font-bold">₹{prod.costPerAcreINR}/acre</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
