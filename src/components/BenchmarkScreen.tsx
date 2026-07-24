import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BIOLOGICAL_PRODUCTS } from '../data/mockData';
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
import {
  BarChart2,
  CheckCircle2,
  Filter,
  Globe,
  Award,
  Users,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const BenchmarkScreen: React.FC = () => {
  const { benchmarkOutcomes } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter Outcomes
  const filteredOutcomes = benchmarkOutcomes.filter((outcome) => {
    const matchCrop = selectedCrop === 'All' || outcome.crop === selectedCrop;
    const matchProduct = selectedProduct === 'All' || outcome.product === selectedProduct;
    const matchSearch =
      outcome.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outcome.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outcome.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCrop && matchProduct && matchSearch;
  });

  // Chart Data: Efficacy Lift by Soil Type
  const soilData = [
    { soil: 'Clay Soil', yieldLift: 13.8, robiPercent: 385 },
    { soil: 'Black Soil', yieldLift: 14.5, robiPercent: 400 },
    { soil: 'Sandy Loam', yieldLift: 13.2, robiPercent: 360 },
    { soil: 'Alluvial', yieldLift: 12.1, robiPercent: 330 },
    { soil: 'Red Soil', yieldLift: 12.6, robiPercent: 345 },
  ];

  // Chart Data: Performance by Regional Zone
  const regionalData = [
    { zone: 'Punjab (Bhatinda)', lift: 13.8 },
    { zone: 'Maharashtra (Nashik)', lift: 15.2 },
    { zone: 'Andhra (Guntur)', lift: 14.5 },
    { zone: 'Haryana (Karnal)', lift: 11.9 },
    { zone: 'Karnataka (Mandya)', lift: 12.7 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              National Efficacy Benchmark Platform
            </h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-mono px-2.5 py-0.5 rounded-full font-bold">
              Verified Regional Trials
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Open community benchmarking database aggregating verified Double ML biological yield lifts across India
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-emerald-950 text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-800">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Verified Trials Database: 1,240+ Records</span>
        </div>
      </div>

      {/* Bayesian Feedback Self-Correction Loop Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
              Active Bayesian Model Self-Correction Loop
            </h3>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-800">
            P(θ | Yield Data) Prior Update
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Every verified harvest logged by a local farmer dynamically updates the regional Bayesian prior distribution. As new ground-truth yield reports arrive from Bhatinda or Nashik, the confidence interval shrinks and future recommendations become progressively more accurate!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-1">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Current Regional Prior Lift</span>
            <span className="text-lg font-bold text-emerald-400">+13.4% ± 0.8%</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Posterior Convergence Rate</span>
            <span className="text-lg font-bold text-amber-400">99.4% (N=1,248)</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Model Variance Loss</span>
            <span className="text-lg font-bold text-indigo-400">σ² = 0.014</span>
          </div>
        </div>
      </div>


      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-slate-500">Verified Community Trials</div>
          <div className="text-2xl font-bold text-emerald-950 font-serif">1,248</div>
          <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> 18 Agricultural Zones
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-slate-500">National Avg Yield Lift</div>
          <div className="text-2xl font-bold text-emerald-700 font-serif">+13.4%</div>
          <div className="text-[11px] text-slate-500 font-medium">Syngenta Bio Portfolio</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-slate-500">Average Net ROBI</div>
          <div className="text-2xl font-bold text-amber-600 font-serif">368%</div>
          <div className="text-[11px] text-slate-500 font-medium">Return on Product Cost</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-slate-500">Nitrogen Efficiency Score</div>
          <div className="text-2xl font-bold text-teal-800 font-serif">88.4 / 100</div>
          <div className="text-[11px] text-teal-700 font-medium">Eco-System Benefit</div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-600 font-bold">
            <Filter className="w-4 h-4 text-emerald-700" />
            <span>Filters:</span>
          </div>

          <div>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All">All Crops</option>
              <option value="Cotton">Cotton</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Tomatoes">Tomatoes</option>
              <option value="Wheat">Wheat</option>
            </select>
          </div>

          <div>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All">All Biological Products</option>
              {BIOLOGICAL_PRODUCTS.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search district, state, farmer..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Visual Benchmarking Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Soil Type Efficacy */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h4 className="text-sm font-bold text-slate-900 font-serif">
            Average Biological Yield Lift (%) by Soil Type
          </h4>
          <p className="text-xs text-slate-500">
            Performance across Clay, Black, Sandy Loam, Alluvial & Red Soils
          </p>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={soilData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="soil" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 20]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="yieldLift" name="Yield Lift %" fill="#047857" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Performance by Regional Zone */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h4 className="text-sm font-bold text-slate-900 font-serif">
            Average Yield Lift (%) by Regional State Zone
          </h4>
          <p className="text-xs text-slate-500">
            Community trial results in Punjab, Maharashtra, Andhra, Haryana
          </p>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="zone" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 20]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="lift" name="Average Lift %" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Verifiable Community Outcomes List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            Recent Verifiable Community Outcomes ({filteredOutcomes.length})
          </h3>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
            Double ML Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-mono text-[11px] uppercase border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Farmer ID</th>
                <th className="py-3 px-4">District / State</th>
                <th className="py-3 px-4">Crop & Product</th>
                <th className="py-3 px-4">Soil Type</th>
                <th className="py-3 px-4 text-center">Verified Yield Lift</th>
                <th className="py-3 px-4 text-center">Net ROBI</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOutcomes.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 font-mono">{item.farmerName}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-slate-800">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {item.district}, {item.state}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{item.product}</span> on {item.crop}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{item.soilType}</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-700 font-serif text-sm">
                    +{item.yieldLiftPercent}%
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-amber-700 font-mono">
                    {item.robiPercent}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
