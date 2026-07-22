import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES, BIOLOGICAL_PRODUCTS, SCENARIO_PRESETS } from '../data/mockData';
import { Language, CropFitRecommendation, ScenarioPreset } from '../types';
import { generateXAIRationale } from '../utils/causalEngine';
import {
  MessageSquare,
  Mic,
  MicOff,
  Send,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Globe,
  Loader2,
  ShieldCheck,
  Zap,
  HelpCircle,
  Volume2,
  AlertTriangle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  recommendation?: CropFitRecommendation;
}

export const CropFitScreen: React.FC = () => {
  const {
    selectedLanguage,
    setSelectedLanguage,
    addRecommendation,
    exportRecommendationToJournal,
    setActiveTab,
    selectedScenario,
    setSelectedScenario,
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reasoningStep, setReasoningStep] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: 'Namaste! Welcome to Syngenta CropFit AI Advisor. Select a regional language or quick test scenario below, or type/speak your field conditions to receive a biostimulant recommendation with Explainable AI rationale.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Handle Speech-to-Text Simulation
  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate listening & speech recognition
      setTimeout(() => {
        const simQuery = `${selectedScenario?.state || 'Punjab'}, ${selectedScenario?.soilType || 'Clay'} soil, ${selectedScenario?.crop || 'Cotton'}, ${selectedScenario?.growthStage || 'Flowering'}, ${selectedScenario?.stressFactor || 'Heat Stress'}`;
        setInputQuery(simQuery);
        setIsRecording(false);
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  // Run Gemini LLM Simulation Engine
  const handleSendMessage = (scenarioOverride?: ScenarioPreset, customText?: string) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim() && !scenarioOverride) return;

    const userText = scenarioOverride
      ? `${scenarioOverride.region}, ${scenarioOverride.state} | ${scenarioOverride.soilType} | ${scenarioOverride.crop} | ${scenarioOverride.growthStage} | ${scenarioOverride.stressFactor}`
      : textToSend;

    // Add user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    // Multi-step reasoning simulation
    const steps = [
      'Extracting phenological stage & soil parameters...',
      'Querying Google Earth Engine satellite NDVI & soil temperature history...',
      'Cross-referencing Syngenta Biological Portfolio (Isabion, Quantis, YieldOn)...',
      'Generating Explainable AI (XAI) rationale in chosen regional language...',
    ];

    setReasoningStep(steps[0]);
    setTimeout(() => setReasoningStep(steps[1]), 800);
    setTimeout(() => setReasoningStep(steps[2]), 1600);
    setTimeout(() => setReasoningStep(steps[3]), 2400);

    setTimeout(() => {
      // Determine biological match logic
      const targetCrop = scenarioOverride?.crop || (userText.toLowerCase().includes('sugarcane') ? 'Sugarcane' : userText.toLowerCase().includes('tomatoes') ? 'Tomatoes' : 'Cotton');
      const targetStress = scenarioOverride?.stressFactor || (userText.toLowerCase().includes('drought') ? 'Drought Stress' : 'Heat Stress');
      const targetSoil = scenarioOverride?.soilType || 'Clay';
      const targetState = scenarioOverride?.state || 'Punjab';
      const targetStage = scenarioOverride?.growthStage || 'Flowering Stage';

      let matchedProduct = BIOLOGICAL_PRODUCTS[0]; // Isabion
      if (targetCrop === 'Sugarcane' || targetStress.includes('Heat Wave') || targetStress.includes('36°C')) {
        matchedProduct = BIOLOGICAL_PRODUCTS[1]; // Quantis
      } else if (targetCrop === 'Tomatoes' || targetStage.includes('Fruit') || targetStage.includes('Grain')) {
        matchedProduct = BIOLOGICAL_PRODUCTS[2]; // YieldOn
      }

      const matchScore = targetCrop === 'Cotton' ? 94 : targetCrop === 'Sugarcane' ? 96 : 92;
      const xaiRationales = generateXAIRationale(matchedProduct, targetCrop, targetSoil, targetStage, targetStress);

      const rec: CropFitRecommendation = {
        id: `REC-${Date.now()}`,
        product: matchedProduct,
        confidenceScore: matchScore,
        dosageRate: matchedProduct.dosage,
        optimalWindow: 'Apply within next 48 hours early morning (<30°C soil surface temp)',
        xaiRationale: xaiRationales,
        scenarioContext: {
          state: targetState,
          crop: targetCrop,
          growthStage: targetStage,
          stressFactor: targetStress,
          soilType: targetSoil,
        },
        timestamp: new Date().toISOString(),
      };

      addRecommendation(rec);

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: `Based on Gemini LLM analysis for ${targetCrop} in ${targetState}, here is your matched Syngenta Biological prescription:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendation: rec,
      };

      setChatHistory((prev) => [...prev, botMsg]);
      setIsProcessing(false);
      setReasoningStep('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Advisor Header & Language Selector */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              CropFit Multilingual AI Advisor
            </h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded font-bold">
              PS-03 & PS-04
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Natural language interface supporting 5 regional languages with Gemini XAI reasoning
          </p>
        </div>

        {/* Regional Language Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <Globe className="w-4 h-4 text-emerald-600 ml-1" />
          <span className="text-xs text-slate-500 font-medium mr-1">Language:</span>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code as Language)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedLanguage === lang.code
                  ? 'bg-emerald-700 text-white font-bold shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {lang.flag} {lang.nativeName}
            </button>
          ))}
        </div>
      </div>

      {/* Predefined Quick Test Inputs Panel */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            Predefined Test Scenarios (Quick Input Shortcuts)
          </h3>
          <span className="text-[11px] text-slate-400">Click any card to instantly test Gemini advisor</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SCENARIO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedScenario(preset);
                handleSendMessage(preset);
              }}
              disabled={isProcessing}
              className="text-left bg-slate-950 border border-slate-800 hover:border-emerald-500/60 p-3.5 rounded-xl transition-all cursor-pointer space-y-1.5 group disabled:opacity-50"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {preset.title}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                  {preset.crop}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {preset.state} • {preset.soilType} • {preset.growthStage}
              </p>
              <div className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-400" /> {preset.stressFactor}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Conversation Container */}
      <div className="bg-slate-100 rounded-2xl border border-slate-300/80 shadow-md flex flex-col h-[580px] overflow-hidden">
        {/* Chat Messages Area */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-500 px-1">
                <span>{msg.sender === 'user' ? 'You (Farmer)' : 'Syngenta CropFit AI'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-800 text-white rounded-tr-none shadow-sm'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
                }`}
              >
                <p>{msg.text}</p>

                {/* Structured Syngenta Recommendation Card Output */}
                {msg.recommendation && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                    {/* Recommendation Card Header */}
                    <div className="bg-emerald-950 text-white rounded-xl p-4 border border-emerald-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                            <Sparkles className="w-5 h-5 text-emerald-400" />
                          </span>
                          <div>
                            <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider block">
                              Prescribed Biological Product
                            </span>
                            <h4 className="text-lg font-bold text-white font-serif">
                              {msg.recommendation.product.name}
                            </h4>
                          </div>
                        </div>

                        {/* Confidence Score Meter */}
                        <div className="bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-700 text-center">
                          <div className="text-[10px] text-emerald-300 uppercase">Match Score</div>
                          <div className="text-base font-bold text-emerald-300 font-mono">
                            {msg.recommendation.confidenceScore}%
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-emerald-200 font-medium">
                        {msg.recommendation.product.tagline}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-emerald-900/60 p-2.5 rounded-lg border border-emerald-800/60 font-mono">
                        <div>
                          <span className="text-emerald-400">Dosage Rate:</span>
                          <span className="text-white ml-1 font-bold">{msg.recommendation.dosageRate}</span>
                        </div>
                        <div>
                          <span className="text-emerald-400">Cost / Acre:</span>
                          <span className="text-white ml-1 font-bold">₹{msg.recommendation.product.costPerAcreINR}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1.5 bg-amber-950/40 p-2 rounded border border-amber-800/40">
                        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Optimal Window: {msg.recommendation.optimalWindow}</span>
                      </div>
                    </div>

                    {/* XAI Rationale Box in Selected Language */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-900 flex items-center gap-1">
                          <HelpCircle className="w-4 h-4 text-emerald-700" />
                          Explainable AI (XAI) Rationale ({selectedLanguage.toUpperCase()})
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Gemini LLM</span>
                      </div>

                      <p className="text-xs text-slate-700 italic leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                        "{msg.recommendation.xaiRationale[selectedLanguage]}"
                      </p>

                      {/* Export Button */}
                      <button
                        onClick={() => {
                          if (msg.recommendation) {
                            exportRecommendationToJournal(msg.recommendation);
                            setActiveTab('journal');
                          }
                        }}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" />
                        Export Recommendation to Season Journal (PS-05)
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Reasoning Delay Spinner */}
          {isProcessing && (
            <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-w-md animate-pulse">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-emerald-900">Gemini Biological Reasoning Engine</span>
                <p className="text-slate-600 font-mono text-[11px]">{reasoningStep}</p>
              </div>
            </div>
          )}
        </div>

        {/* Voice & Input Action Bar */}
        <div className="bg-white p-3 border-t border-slate-200 space-y-2">
          {/* Audio Wave recording state indicator */}
          {isRecording && (
            <div className="flex items-center justify-center gap-2 text-xs text-rose-600 bg-rose-50 py-1.5 rounded-lg border border-rose-200 animate-pulse">
              <Volume2 className="w-4 h-4 text-rose-600 animate-ping" />
              <span className="font-mono font-bold">Listening & Translating Audio to Regional Text...</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            {/* Speech Microphone Button */}
            <button
              onClick={toggleVoiceRecording}
              disabled={isProcessing}
              title={isRecording ? 'Stop Recording' : 'Simulate Voice Input'}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 text-white animate-bounce'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Query Input */}
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Describe crop, location, soil, or stress (e.g., Punjab cotton heat stress)..."
              disabled={isProcessing}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={isProcessing || !inputQuery.trim()}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white p-3 rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
