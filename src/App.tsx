import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { DashboardScreen } from './components/DashboardScreen';
import { CropFitScreen } from './components/CropFitScreen';
import { JournalScreen } from './components/JournalScreen';
import { CausalROIScreen } from './components/CausalROIScreen';
import { BenchmarkScreen } from './components/BenchmarkScreen';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16 space-y-6">
      {activeTab === 'dashboard' && <DashboardScreen />}
      {activeTab === 'cropfit' && <CropFitScreen />}
      {activeTab === 'journal' && <JournalScreen />}
      {activeTab === 'causal' && <CausalROIScreen />}
      {activeTab === 'benchmark' && <BenchmarkScreen />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
        <Header />
        <MainContent />

        {/* Global Footer */}
        <footer className="mt-auto bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white font-serif">BioLoop AI</span>
              <span>—</span>
              <span className="text-emerald-400 font-medium">HACK CORE 2026 Integrated Solution</span>
            </div>
            <div className="text-center md:text-right text-slate-500 text-[11px]">
              Collaboration between <strong className="text-slate-300">Syngenta Biologicals</strong> and{' '}
              <strong className="text-slate-300">ANNAM.AI (IIT Ropar)</strong>. Solving PS-03, PS-04, PS-05, PS-06, & PS-07.
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
