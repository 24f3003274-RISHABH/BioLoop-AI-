import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CausalInferenceResult } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  LineChart as LineChartIcon,
  Calculator,
  TrendingUp,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Info,
  Layers,
  ArrowRight,
  Cpu,
} from 'lucide-react';

export const CausalROIScreen: React.FC = () => {
  const {
    journalRecords,
    causalResults,
    updateJournalHarvest,
    selectedJournalForAnalysis,
  } = useApp();

  const [selectedJournalId, setSelectedJournalId] = useState<string>(
    selectedJournalForAnalysis?.id || journalRecords[0]?.id || ''
  );
  const [actualYieldInput, setActualYieldInput] = useState<number>(12.8);
  const [marketPriceInput, setMarketPriceInput] = useState<number>(6200);
  const [currentResult, setCurrentResult] = useState<CausalInferenceResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const selectedRecord = journalRecords.find((r) => r.id === selectedJournalId);

  useEffect(() => {
    if (selectedJournalForAnalysis) {
      setSelectedJournalId(selectedJournalForAnalysis.id);
    }
  }, [selectedJournalForAnalysis]);

  useEffect(() => {
    if (selectedRecord) {
      if (selectedRecord.actualYieldQuintalPerAcre) {
        setActualYieldInput(selectedRecord.actualYieldQuintalPerAcre);
      } else {
        setActualYieldInput(selectedRecord.cropType === 'Sugarcane' ? 380 : selectedRecord.cropType === 'Tomatoes' ? 140 : 12.8);
      }
      if (selectedRecord.marketPriceINRPerQuintal) {
        setMarketPriceInput(selectedRecord.marketPriceINRPerQuintal);
      } else {
        setMarketPriceInput(selectedRecord.cropType === 'Sugarcane' ? 350 : selectedRecord.cropType === 'Tomatoes' ? 1800 : 6200);
      }

      if (causalResults[selectedRecord.id]) {
        setCurrentResult(causalResults[selectedRecord.id]);
      }
    }
  }, [selectedJournalId, causalResults, selectedRecord]);

  const handleRunCausalAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord) return;

    setIsCalculating(true);
    setTimeout(() => {
      const result = updateJournalHarvest(selectedJournalId, actualYieldInput, marketPriceInput);
      if (result) setCurrentResult(result);
      setIsCalculating(false);
    }, 1200);
  };

  // Prepare Chart Data
  const chartData = currentResult
    ? [
        {
          metric: 'Yield per Acre (Quintals)',
          'Synthetic Baseline (Untreated Control)': currentResult.syntheticControlYield,
          'Your Farm (Syngenta Bio Treated)': currentResult.actualYield,
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              Yield Impact & Causal ROI Predictor
            </h2>
            <span className="text-xs bg-indigo-100 text-indigo-800 font-mono px-2 py-0.5 rounded font-bold">
              PS-07 & PS-01
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Double Machine Learning (DML) Propensity Matching to isolate biological yield lift and calculate Return on Biological Investment (ROBI)
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-indigo-950 text-indigo-300 px-3 py-1.5 rounded-xl border border-indigo-800">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>DML Causal Inference Algorithm: ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Harvest Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-700" />
            Harvest & Market Data Input
          </h3>

          <form onSubmit={handleRunCausalAnalysis} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Select Active Application Log
              </label>
              <select
                value={selectedJournalId}
                onChange={(e) => setSelectedJournalId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-indigo-600 font-medium"
              >
                {journalRecords.map((rec) => (
                  <option key={rec.id} value={rec.id}>
                    {rec.id} | {rec.productName} on {rec.cropType} ({rec.locationName})
                  </option>
                ))}
              </select>
            </div>

            {selectedRecord && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="text-[11px] font-bold text-slate-800 flex justify-between">
                  <span>Target Field Context:</span>
                  <span className="text-emerald-700">{selectedRecord.plotSizeAcres} Acres</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-mono">
                  <div>Soil: {selectedRecord.soilType}</div>
                  <div>Health: {selectedRecord.observedCropHealth}</div>
                  <div>GEE NDVI: {selectedRecord.geeMetrics.ndvi}</div>
                  <div>Moisture: {selectedRecord.geeMetrics.soilMoisturePercent}%</div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Actual Harvest Output (Quintals / Acre)
              </label>
              <input
                type="number"
                step="0.1"
                value={actualYieldInput}
                onChange={(e) => setActualYieldInput(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600"
                placeholder="e.g. 12.8"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Local Market Price (₹ INR / Quintal)
              </label>
              <input
                type="number"
                step="50"
                value={marketPriceInput}
                onChange={(e) => setMarketPriceInput(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600"
                placeholder="e.g. 6200"
              />
            </div>

            <button
              type="submit"
              disabled={isCalculating}
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isCalculating ? 'Computing Synthetic Control & DML...' : 'Analyze Biological Yield Lift & Prove ROBI'}
            </button>
          </form>
        </div>

        {/* Results & Visual Chart Area */}
        <div className="lg:col-span-7 space-y-4">
          {currentResult ? (
            <div className="space-y-4">
              {/* Output Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1: Isolated Biological Yield Lift */}
                <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-800 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                      Isolated Biological Delta
                    </span>
                    <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-300 font-serif">
                    +{currentResult.isolatedYieldLiftPercent}%
                  </div>
                  <p className="text-xs text-emerald-100 font-medium">
                    + {currentResult.isolatedYieldLiftQuintals} Quintals / Acre attributable to {currentResult.productName}
                  </p>
                </div>

                {/* Card 2: Net ROBI */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                      Net ROBI (Rupee Value)
                    </span>
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                      <Award className="w-4 h-4 text-amber-400" />
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-amber-300 font-serif">
                    ₹{currentResult.netROBI_INR.toLocaleString('en-IN')}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Net ROBI Rate:</span>
                    <span className="font-bold text-emerald-400">{currentResult.netROBI_Percent}%</span>
                  </div>
                </div>
              </div>

              {/* PS-01 Optimal Readiness Meter */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                    <ShieldCheck className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      PS-01 Optimal Application Readiness Assessment
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Evaluated soil moisture & thermal window on application date
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    {currentResult.readinessStatus} Readiness Match (+{currentResult.readinessBoostPercent}% Efficacy Boost)
                  </span>
                </div>
              </div>

              {/* Recharts Causal Yield Lift Visual Chart */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-serif">
                      Causal Yield Comparison: Treated Farm vs. Synthetic Control Baseline
                    </h4>
                    <p className="text-xs text-slate-500">
                      Propensity score matched control farm using GEE climate covariates
                    </p>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} domain={[0, 'dataMax + 5']} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          color: '#ffffff',
                          borderRadius: '8px',
                          fontSize: '12px',
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar
                        dataKey="Synthetic Baseline (Untreated Control)"
                        fill="#94a3b8"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="Your Farm (Syngenta Bio Treated)"
                        fill="#047857"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gemini Generative Narration Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-950 font-serif flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    Gemini Generative Explainable ROI Narration
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-bold">
                    PS-07 Narration Output
                  </span>
                </div>

                <p className="text-xs text-emerald-900 leading-relaxed font-sans italic bg-white p-4 rounded-xl border border-emerald-200/80 shadow-sm">
                  "{currentResult.geminiNarration}"
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3">
              <Calculator className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">Select a plot and run Causal Analysis</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Select an active application log on the left, enter actual harvest yield output, and run Double Machine Learning to synthesize the untreated control baseline.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
