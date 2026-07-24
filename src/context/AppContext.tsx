import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  SeasonJournalRecord,
  CropFitRecommendation,
  BenchmarkOutcome,
  ScenarioPreset,
  CausalInferenceResult,
} from '../types';
import {
  INITIAL_JOURNAL_RECORDS,
  INITIAL_BENCHMARK_OUTCOMES,
  SCENARIO_PRESETS,
} from '../data/mockData';
import { calculateCausalYieldLift } from '../utils/causalEngine';

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  journalRecords: SeasonJournalRecord[];
  addJournalRecord: (record: Omit<SeasonJournalRecord, 'id'>) => SeasonJournalRecord;
  updateJournalHarvest: (id: string, actualYield: number, marketPrice: number) => CausalInferenceResult | null;
  deleteJournalRecord: (id: string) => void;
  recommendations: CropFitRecommendation[];
  addRecommendation: (rec: CropFitRecommendation) => void;
  selectedScenario: ScenarioPreset | null;
  setSelectedScenario: (scenario: ScenarioPreset | null) => void;
  currentLocation: { region: string; state: string };
  setCurrentLocation: (loc: { region: string; state: string }) => void;
  causalResults: Record<string, CausalInferenceResult>;
  saveCausalResult: (result: CausalInferenceResult) => void;
  benchmarkOutcomes: BenchmarkOutcome[];
  exportRecommendationToJournal: (rec: CropFitRecommendation) => SeasonJournalRecord;
  resetToDemoDefaults: () => void;
  selectedJournalForAnalysis: SeasonJournalRecord | null;
  setSelectedJournalForAnalysis: (record: SeasonJournalRecord | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_JOURNAL = 'bioloop_journal_records_v1';
const LOCAL_STORAGE_KEY_CAUSAL = 'bioloop_causal_results_v1';
const LOCAL_STORAGE_KEY_RECS = 'bioloop_recommendations_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioPreset | null>(SCENARIO_PRESETS[0]);
  const [currentLocation, setCurrentLocation] = useState({ region: 'Bhatinda', state: 'Punjab' });
  const [selectedJournalForAnalysis, setSelectedJournalForAnalysis] = useState<SeasonJournalRecord | null>(null);

  // Load state from localStorage with fallback to initial defaults
  const [journalRecords, setJournalRecords] = useState<SeasonJournalRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_JOURNAL);
      return saved ? JSON.parse(saved) : INITIAL_JOURNAL_RECORDS;
    } catch {
      return INITIAL_JOURNAL_RECORDS;
    }
  });

  const [causalResults, setCausalResults] = useState<Record<string, CausalInferenceResult>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CAUSAL);
      if (saved) return JSON.parse(saved);

      // Pre-compute initial causal result for pre-loaded logged harvest
      const initialMap: Record<string, CausalInferenceResult> = {};
      const preHarvested = INITIAL_JOURNAL_RECORDS.find((r) => r.harvestLogged);
      if (preHarvested && preHarvested.actualYieldQuintalPerAcre && preHarvested.marketPriceINRPerQuintal) {
        const res = calculateCausalYieldLift(
          preHarvested,
          preHarvested.actualYieldQuintalPerAcre,
          preHarvested.marketPriceINRPerQuintal
        );
        initialMap[preHarvested.id] = res;
      }
      return initialMap;
    } catch {
      return {};
    }
  });

  const [recommendations, setRecommendations] = useState<CropFitRecommendation[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_RECS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [benchmarkOutcomes] = useState<BenchmarkOutcome[]>(INITIAL_BENCHMARK_OUTCOMES);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_JOURNAL, JSON.stringify(journalRecords));
  }, [journalRecords]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CAUSAL, JSON.stringify(causalResults));
  }, [causalResults]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_RECS, JSON.stringify(recommendations));
  }, [recommendations]);

  const addJournalRecord = (recordData: Omit<SeasonJournalRecord, 'id'>): SeasonJournalRecord => {
    const newRecord: SeasonJournalRecord = {
      ...recordData,
      id: `LOG-${Date.now().toString().slice(-6)}`,
    };
    setJournalRecords((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const updateJournalHarvest = (
    id: string,
    actualYield: number,
    marketPrice: number
  ): CausalInferenceResult | null => {
    const record = journalRecords.find((r) => r.id === id);
    if (!record) return null;

    const updatedRecord: SeasonJournalRecord = {
      ...record,
      harvestLogged: true,
      actualYieldQuintalPerAcre: actualYield,
      marketPriceINRPerQuintal: marketPrice,
    };

    setJournalRecords((prev) => prev.map((r) => (r.id === id ? updatedRecord : r)));

    // Calculate causal result
    const result = calculateCausalYieldLift(updatedRecord, actualYield, marketPrice);
    setCausalResults((prev) => ({ ...prev, [id]: result }));
    return result;
  };

  const deleteJournalRecord = (id: string) => {
    setJournalRecords((prev) => prev.filter((r) => r.id !== id));
    setCausalResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const addRecommendation = (rec: CropFitRecommendation) => {
    setRecommendations((prev) => [rec, ...prev]);
  };

  const saveCausalResult = (result: CausalInferenceResult) => {
    setCausalResults((prev) => ({ ...prev, [result.journalId]: result }));
  };

  const exportRecommendationToJournal = (rec: CropFitRecommendation): SeasonJournalRecord => {
    const newRecord: SeasonJournalRecord = {
      id: `LOG-REC-${Date.now().toString().slice(-6)}`,
      productName: rec.product.name,
      applicationDate: new Date().toISOString().split('T')[0],
      plotSizeAcres: 5.0,
      locationName: `${rec.scenarioContext?.state || 'Punjab'}`,
      latitude: rec.scenarioContext?.state?.includes('Punjab') ? 30.211 : 20.005,
      longitude: rec.scenarioContext?.state?.includes('Punjab') ? 74.945 : 73.789,
      observedCropHealth: rec.scenarioContext?.stressFactor?.includes('Heat')
        ? 'Heat Stressed'
        : 'Water Stressed',
      soilType: rec.scenarioContext?.soilType || 'Black Soil',
      cropType: rec.scenarioContext?.crop || 'Cotton',
      geeMetrics: {
        ndvi: 0.66,
        soilMoisturePercent: 24.5,
        soilTemperatureC: 29.5,
        readinessScore: 'High',
        readinessMatchPercentage: rec.confidenceScore,
      },
      harvestLogged: false,
    };

    setJournalRecords((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const resetToDemoDefaults = () => {
    setJournalRecords(INITIAL_JOURNAL_RECORDS);
    setRecommendations([]);
    const initialMap: Record<string, CausalInferenceResult> = {};
    const preHarvested = INITIAL_JOURNAL_RECORDS.find((r) => r.harvestLogged);
    if (preHarvested && preHarvested.actualYieldQuintalPerAcre && preHarvested.marketPriceINRPerQuintal) {
      initialMap[preHarvested.id] = calculateCausalYieldLift(
        preHarvested,
        preHarvested.actualYieldQuintalPerAcre,
        preHarvested.marketPriceINRPerQuintal
      );
    }
    setCausalResults(initialMap);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedLanguage,
        setSelectedLanguage,
        journalRecords,
        addJournalRecord,
        updateJournalHarvest,
        deleteJournalRecord,
        recommendations,
        addRecommendation,
        selectedScenario,
        setSelectedScenario,
        currentLocation,
        setCurrentLocation,
        causalResults,
        saveCausalResult,
        benchmarkOutcomes,
        exportRecommendationToJournal,
        resetToDemoDefaults,
        selectedJournalForAnalysis,
        setSelectedJournalForAnalysis,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
