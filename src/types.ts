export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export interface BiologicalProduct {
  id: string;
  name: string;
  tagline: string;
  category: string;
  activeIngredients: string;
  primaryBenefits: string[];
  recommendedCropTypes: string[];
  dosage: string;
  costPerAcreINR: number;
  idealSoilTempRange: string;
  idealSoilMoistureMin: number;
  iconName: string;
  description: string;
}

export interface ScenarioPreset {
  id: string;
  title: string;
  region: string;
  state: string;
  soilType: 'Clay' | 'Black Soil' | 'Sandy Loam' | 'Red Soil' | 'Alluvial';
  crop: string;
  growthStage: string;
  stressFactor: string;
  soilTemp: number; // in Celsius
  soilMoisture: number; // percentage
  ndvi: number;
}

export interface CropFitRecommendation {
  id: string;
  product: BiologicalProduct;
  confidenceScore: number; // 0-100
  dosageRate: string;
  optimalWindow: string;
  xaiRationale: Record<Language, string>;
  scenarioContext: {
    state: string;
    crop: string;
    growthStage: string;
    stressFactor: string;
    soilType: string;
  };
  timestamp: string;
}

export interface SeasonJournalRecord {
  id: string;
  productName: string;
  applicationDate: string;
  plotSizeAcres: number;
  locationName: string;
  latitude: number;
  longitude: number;
  observedCropHealth: 'Good' | 'Heat Stressed' | 'Yellowing Leaves' | 'Water Stressed';
  soilType: string;
  cropType: string;
  // GEE Satellite & Weather Covariates
  geeMetrics: {
    ndvi: number;
    soilMoisturePercent: number;
    soilTemperatureC: number;
    readinessScore: 'High' | 'Moderate' | 'Low';
    readinessMatchPercentage: number;
  };
  harvestLogged?: boolean;
  actualYieldQuintalPerAcre?: number;
  marketPriceINRPerQuintal?: number;
}

export interface CausalInferenceResult {
  journalId: string;
  productName: string;
  cropType: string;
  state: string;
  actualYield: number; // Quintals/acre
  syntheticControlYield: number; // Quintals/acre
  isolatedYieldLiftQuintals: number;
  isolatedYieldLiftPercent: number;
  marketPriceINR: number;
  grossRevenueIncreaseINR: number;
  estimatedProductCostINR: number;
  netROBI_INR: number; // Net Return on Biological Investment
  netROBI_Percent: number;
  readinessBoostPercent: number;
  readinessStatus: 'High' | 'Moderate' | 'Low';
  avoidedLossINRPerAcre: number;
  geminiNarration: string;
}

export interface BenchmarkOutcome {
  id: string;
  farmerName: string;
  district: string;
  state: string;
  crop: string;
  product: string;
  soilType: string;
  yieldLiftPercent: number;
  robiPercent: number;
  verificationBadge: boolean;
  season: string;
}

export interface WeatherAlert {
  id: string;
  severity: 'high' | 'medium' | 'info';
  title: string;
  message: string;
  recommendedAction: string;
  affectedRegion: string;
  stationId: string;
  timestamp: string;
  soilTemp: number;
  soilMoisture: number;
}
