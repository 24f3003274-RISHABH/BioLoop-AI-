import React from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/mockData';
import { Language } from '../types';
import {
  Sprout,
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  LineChart,
  BarChart2,
  Database,
  Radio,
  RefreshCw,
  Globe,
  Cpu,
  CloudRain,
  ShieldCheck,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedLanguage,
    setSelectedLanguage,
    resetToDemoDefaults,
    journalRecords,
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, badge: null },
    { id: 'sowing', label: 'Monsoon & Sowing', icon: CloudRain, badge: '2026 Matrix' },
    { id: 'cropfit', label: 'CropFit Advisor', icon: MessageSquare, badge: 'Gemini AI' },
    { id: 'journal', label: 'Earth Engine Journal', icon: BookOpen, badge: `${journalRecords.length} Fields` },
    { id: 'causal', label: 'Yield & Causal Twin', icon: LineChart, badge: 'Double ML' },
    { id: 'benchmark', label: 'Efficacy Benchmarks', icon: BarChart2, badge: 'Verified' },
  ];

  return (
    <header className="bg-emerald-950 text-white border-b border-emerald-800/60 shadow-lg sticky top-0 z-50">
      {/* Top Banner Collaboration Bar */}
      <div className="bg-emerald-900/90 border-b border-emerald-800/40 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 text-emerald-200">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              HACK CORE 2026
            </span>
            <span className="hidden sm:inline text-emerald-400">|</span>
            <span className="font-medium text-emerald-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Syngenta Biologicals × ANNAM.AI (IIT Ropar)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-emerald-300 text-xs">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden md:inline">GEE & SWAN Satellite Link:</span>
              <span className="font-mono text-emerald-300 font-bold">ONLINE</span>
            </div>
            <div className="flex items-center space-x-1 text-emerald-300 text-xs">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Storage:</span>
              <span className="font-mono text-emerald-300">ACTIVE</span>
            </div>
            <button
              onClick={() => {
                if (confirm('Reset to initial demo data?')) resetToDemoDefaults();
              }}
              title="Reset Demo Data"
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors text-xs bg-emerald-800/60 hover:bg-emerald-800 px-2 py-0.5 rounded border border-emerald-700/50 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Platform Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-inner text-emerald-950 font-bold border border-emerald-300/40">
                <Sprout className="w-6 h-6 text-emerald-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-white font-serif">
                    BioLoop <span className="text-emerald-400 font-sans font-extrabold">AI</span>
                  </h1>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700/60">
                    Causal Yield Engine
                  </span>
                </div>
                <p className="text-xs text-emerald-300/80">
                  Precision Biologicals & Causal ROI Verification Platform
                </p>
              </div>
            </div>

            {/* Language Picker on Mobile */}
            <div className="md:hidden">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                className="bg-emerald-900 text-emerald-100 border border-emerald-700 rounded text-xs px-2 py-1 focus:outline-none"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Language Picker */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center gap-1.5 bg-emerald-900/80 border border-emerald-700/60 rounded-lg px-2.5 py-1 text-xs text-emerald-200">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-medium">Advisor Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                className="bg-transparent text-emerald-100 font-semibold focus:outline-none cursor-pointer text-xs"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-emerald-950 text-white">
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Global Tab Controls */}
        <nav className="mt-4 flex space-x-1 sm:space-x-2 overflow-x-auto pb-1 scrollbar-none border-t border-emerald-900/80 pt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md border border-emerald-400/40 font-semibold'
                    : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive
                        ? 'bg-emerald-800 text-emerald-100'
                        : 'bg-emerald-900/90 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
