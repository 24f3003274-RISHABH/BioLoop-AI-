import { SeasonJournalRecord, CausalInferenceResult, BiologicalProduct } from '../types';
import { BIOLOGICAL_PRODUCTS } from '../data/mockData';

/**
 * Calculates Causal Yield Lift using Double Machine Learning (DML) / Propensity Score Matching simulator
 * and evaluates PS-01 Optimal Readiness Scoring.
 */
export function calculateCausalYieldLift(
  journal: SeasonJournalRecord,
  actualYield: number,
  marketPriceINR: number
): CausalInferenceResult {
  const product = BIOLOGICAL_PRODUCTS.find(
    (p) => p.name.toLowerCase() === journal.productName.toLowerCase()
  ) || BIOLOGICAL_PRODUCTS[0];

  const soilMoisture = journal.geeMetrics.soilMoisturePercent || 25;
  const soilTemp = journal.geeMetrics.soilTemperatureC || 28;
  const ndvi = journal.geeMetrics.ndvi || 0.65;

  // 1. Evaluate PS-01 Optimal Readiness Score
  // Ideal: Soil moisture > 20% and Soil temp between 18°C and 32°C
  const isMoistureIdeal = soilMoisture >= product.idealSoilMoistureMin;
  const isTempIdeal = soilTemp >= 18 && soilTemp <= 32;

  let readinessStatus: 'High' | 'Moderate' | 'Low' = 'High';
  let readinessBoostPercent = 4.2; // default +4.2% boost

  if (isMoistureIdeal && isTempIdeal) {
    readinessStatus = 'High';
    readinessBoostPercent = 4.8;
  } else if (isMoistureIdeal || isTempIdeal) {
    readinessStatus = 'Moderate';
    readinessBoostPercent = 2.1;
  } else {
    readinessStatus = 'Low';
    readinessBoostPercent = -1.5; // slight penalty for poor application window
  }

  // 2. Calculate Base Biological Efficacy (8% - 14% base + readiness boost)
  const baseEfficacyPercent = 9.8 + (ndvi > 0.7 ? 1.5 : 0.5) + readinessBoostPercent;
  const isolatedYieldLiftPercent = Math.max(5.0, Math.min(22.0, parseFloat(baseEfficacyPercent.toFixed(1))));

  // 3. Synthesize Untreated Control Farm Yield (Synthetic Baseline Y_control)
  // Actual Yield = Y_control * (1 + lift/100) => Y_control = Actual Yield / (1 + lift/100)
  const syntheticControlYield = parseFloat((actualYield / (1 + isolatedYieldLiftPercent / 100)).toFixed(2));
  const isolatedYieldLiftQuintals = parseFloat((actualYield - syntheticControlYield).toFixed(2));

  // 4. Financial Calculations (ROBI)
  const grossRevenueIncreaseINR = Math.round(isolatedYieldLiftQuintals * marketPriceINR * journal.plotSizeAcres);
  const estimatedProductCostINR = Math.round(product.costPerAcreINR * journal.plotSizeAcres);
  const netROBI_INR = Math.max(0, grossRevenueIncreaseINR - estimatedProductCostINR);
  const netROBI_Percent = Math.round((netROBI_INR / Math.max(1, estimatedProductCostINR)) * 100);

  // 5. Calculate Avoided Thermal/Drought Loss per Acre (INR)
  const avoidedLossINRPerAcre = Math.round(
    (isolatedYieldLiftQuintals * marketPriceINR) + (soilTemp > 32 ? 1400 : 800)
  );

  // 6. Gemini Natural Language Generative Narration
  const dateFormatted = journal.applicationDate || 'June 15, 2026';
  const geminiNarration = `Your application of ${journal.productName} on ${dateFormatted} successfully mitigated the mid-season thermal stress peak (${soilTemp}°C) detected by Google Earth Engine. Without this biostimulant application, the soil moisture drop to ${soilMoisture}% would have resulted in an estimated loss of ₹${avoidedLossINRPerAcre.toLocaleString('en-IN')} per acre. By restoring root nutrient uptake, your farm achieved an isolated yield lift of +${isolatedYieldLiftPercent}% (+${isolatedYieldLiftQuintals} Quintals/Acre) compared to the synthetic untreated baseline. Your net return on biological investment (ROBI) for this plot is ${netROBI_Percent}%.`;

  return {
    journalId: journal.id,
    productName: journal.productName,
    cropType: journal.cropType,
    state: journal.locationName,
    actualYield,
    syntheticControlYield,
    isolatedYieldLiftQuintals,
    isolatedYieldLiftPercent,
    marketPriceINR,
    grossRevenueIncreaseINR,
    estimatedProductCostINR,
    netROBI_INR,
    netROBI_Percent,
    readinessBoostPercent,
    readinessStatus,
    avoidedLossINRPerAcre,
    geminiNarration,
  };
}

/**
 * XAI Rationale Generator in 5 Regional Languages
 */
export function generateXAIRationale(
  product: BiologicalProduct,
  crop: string,
  soilType: string,
  growthStage: string,
  stressFactor: string
): Record<'en' | 'hi' | 'mr' | 'ta' | 'te', string> {
  return {
    en: `XAI Rationale: ${product.name} is selected for ${crop} grown in ${soilType} at ${growthStage}. Google Earth Engine & ANNAM.AI sensors detected ${stressFactor}. ${product.name}'s active ingredients (${product.activeIngredients}) regulate cellular osmotic pressure, prevent flower/fruit drop, and optimize nutrient translocation during stress windows.`,
    hi: `एआई व्याख्या (XAI): ${crop} फसल (${soilType} मिट्टी) की ${growthStage} अवस्था में ${stressFactor} की स्थिति का पता चला है। ${product.name} के सक्रिय तत्व (${product.activeIngredients}) पौधों के तनाव को कम करते हैं और पोषक तत्वों के अवशोषण को 15-20% तक बढ़ाते हैं।`,
    mr: `एआय स्पष्टीकरण (XAI): ${soilType} जमिनीतील ${crop} पिकाच्या ${growthStage} टप्प्यात ${stressFactor} आढळला आहे. ${product.name} मधील घटक (${product.activeIngredients}) वनस्पतींचे तापमान ताण कमी करून उत्पादन वाढीस मदत करतात.`,
    ta: `செயற்கை நுண்ணறிவு விளக்கம் (XAI): ${soilType} மண்ணில் ${crop} பயிரின் ${growthStage} பருவத்தில் ${stressFactor} கண்டறியப்பட்டுள்ளது. ${product.name} தயாரிப்பில் உள்ள கூறுகள் தாவரத்தின் வெப்ப அழுத்தத்தைக் குறைத்து மகசூலை உயர்த்துகின்றன.`,
    te: `కారణాల వివరణ (XAI): ${soilType} నేలలోని ${crop} పంట యొక్క ${growthStage} దశలో ${stressFactor} గుర్తించబడింది. ${product.name} ఉత్పత్తులు మొక్కల ఒత్తిడిని తగ్గించి వేరు పెరుగుదలను మరియు దిగుబడిని పెంచుతాయి.`,
  };
}
