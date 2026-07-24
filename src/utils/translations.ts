import { Language } from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Header & Nav
    appName: 'BioLoop AI',
    tagline: 'Syngenta Biologicals & ANNAM.AI (IIT Ropar)',
    navDashboard: 'Command Center',
    navSowing: 'Monsoon & Sowing',
    navCropfit: 'CropFit AI Advisor',
    navJournal: 'Earth Engine Journal',
    navCausal: 'Yield & Causal Twin',
    navBenchmark: 'Efficacy Benchmarks',
    navSatellite: 'Satellite Explorer',
    langSelect: 'PAN-India Language:',
    chemicalReductionTag: '30% Chemical Fertilizer Reduction Target',

    // Banner / Hero
    heroTitle: 'Sustainably Maximize Crop Yield While Reducing Chemical Fertilizers',
    heroSubtitle: 'Empowering Indian Farmers with Syngenta Biologicals (Isabion, Quantis, YieldOn) and Causal Machine Learning to safely replace 25-30% synthetic Urea/NPK without yield loss.',
    kpiChemicalReduction: 'Avg. Chemical Fertilizer Saved',
    kpiYieldLift: 'Net Yield Lift',
    kpiNetProfit: 'Net Revenue Boost / Acre',
    kpiConfidence: 'Causal Confidence (DML)',

    // Key Actions / Steps
    step1Title: 'Step 1: CropFit Vernacular AI Advisor',
    step1Desc: 'Speak or type field conditions in Hindi, Marathi, Telugu, Tamil, Punjabi, or Gujarati to receive instant Syngenta prescription & chemical reduction plan.',
    step2Title: 'Step 2: Earth Engine Satellite Journal',
    step2Desc: 'Log field applications with real Sentinel-2 satellite NDVI imagery, soil moisture maps, and chemical savings tracker.',
    step3Title: 'Step 3: Double ML Causal Twin',
    step3Desc: 'Isolate biological performance from weather confounders and calculate true Return on Biological Investment (ROBI).',

    // Sowing Advisor
    sowingTitle: '2026 Monsoon Sowing & Chemical Optimization Advisor',
    sowingDesc: 'Real-time agroclimatic analysis & crop rotation matrix to minimize nitrogen leaching and chemical dependency.',
    chemReductionStrategy: 'Chemical Fertilizer Reduction Strategy',

    // CropFit Screen
    cropfitTitle: 'CropFit Multilingual AI Advisor',
    cropfitDesc: 'Ask questions in regional languages. Analyzes location history, weather, and soil to boost yield and cut chemical fertilizer.',
    placeholderQuery: 'Ask anything (e.g. How to reduce Urea in Bhatinda Cotton? / नाशिक उसासाठी जैविक खत)...',
    btnSend: 'Ask Advisor',
    btnListening: 'Listening...',
    prescribedBio: 'Prescribed Biological Product',
    matchScore: 'Match Score',
    xaiRationaleTitle: 'Explainable AI (XAI) Rationale',
    exportToJournal: 'Export Recommendation to Earth Engine Journal',

    // Chemical Reduction Highlights
    chemReductionNotice: 'Chemical Reduction Guarantee: Applying this Syngenta Biological reduces synthetic NPK requirement by 25%, saving ₹1,400/acre in chemical cost.',

    // Buttons
    btnLaunch: 'Launch Module',
    btnAnalyze: 'Run Causal Analysis',
    btnLogHarvest: 'Log Harvest Result',
  },
  hi: {
    // Header & Nav
    appName: 'बायोलूप एआई (BioLoop AI)',
    tagline: 'सिंजेंटा बायोलॉजिकल्स एवं अन्नम.एआई (आईआईटी रोपड़)',
    navDashboard: 'कमांड सेंटर',
    navSowing: 'मानसून एवं बुआई सलाहकार',
    navCropfit: 'क्रॉपफिट एआई सलाहकार',
    navJournal: 'अर्थ इंजन जर्नल',
    navCausal: 'उपज एवं कारण परिणाम ट्विन',
    navBenchmark: 'क्षेत्रीय मानक बेंचमार्क',
    navSatellite: 'सैटेलाइट एक्सप्लोरर',
    langSelect: 'संपूर्ण भारत भाषा:',
    chemicalReductionTag: '30% रासायनिक उर्वरक में कमी का लक्ष्य',

    // Banner / Hero
    heroTitle: 'रासायनिक उर्वरक घटाएं, स्थायी रूप से फसल उपज बढ़ाएं',
    heroSubtitle: 'भारतीय किसानों के लिए सिंजेंटा बायोलॉजिकल्स (इसाबियन, क्वांटिस, यील्डऑन) और कारण मशीन लर्निंग द्वारा 25-30% यूरिया/एनपीके की बचत।',
    kpiChemicalReduction: 'औसत रासायनिक उर्वरक की बचत',
    kpiYieldLift: 'शुद्ध उपज वृद्धि',
    kpiNetProfit: 'प्रति एकड़ शुद्ध आय वृद्धि',
    kpiConfidence: 'कारण मॉडल सटीकता (DML)',

    // Key Actions / Steps
    step1Title: 'चरण 1: क्रॉपफिट क्षेत्रीय भाषा एआई सलाहकार',
    step1Desc: 'हिंदी, मराठी, तेलुगु, तमिल, पंजाबी या गुजराती में बोलकर अपनी फसल समस्या का समाधान और यूरिया कटौती योजना पाएं।',
    step2Title: 'चरण 2: अर्थ इंजन सैटेलाइट खेत जर्नल',
    step2Desc: 'सेंटिनल-2 उपग्रह एनडीवीआई चित्रों, मृदा नमी मानचित्र और उर्वरक बचत ट्रैकर के साथ आवेदन दर्ज करें।',
    step3Title: 'चरण 3: डबल एमएल कारण परिणाम ट्विन',
    step3Desc: 'मौसम के प्रभाव को अलग करके जैविक उत्पादों का वास्तविक उपज लाभ और शुद्ध लाभ (ROBI) मापें।',

    // Sowing Advisor
    sowingTitle: '2026 मानसून बुआई एवं रासायनिक उर्वरक न्यूनीकरण सलाहकार',
    sowingDesc: 'नाइट्रोजन बर्बादी रोकने और रासायनिक निर्भरता कम करने के लिए वास्तविक समय का एग्रोक्लाइमैटिक विश्लेषण।',
    chemReductionStrategy: 'रासायनिक उर्वरक कटौती रणनीति',

    // CropFit Screen
    cropfitTitle: 'क्रॉपफिट बहुभाषी एआई सलाहकार',
    cropfitDesc: 'अपनी क्षेत्रीय भाषा में पूछें। उपज बढ़ाने और रासायनिक यूरिया घटाने के लिए स्थान, मौसम और मिट्टी का विश्लेषण।',
    placeholderQuery: 'फसल समस्या पूछें (जैसे: बठिंडा कपास में यूरिया कैसे कम करें?)...',
    btnSend: 'सलाह लें',
    btnListening: 'सुन रहा है...',
    prescribedBio: 'अनुशंसित सिंजेंटा जैविक उत्पाद',
    matchScore: 'सटीकता स्कोर',
    xaiRationaleTitle: 'स्पष्टीकरण एआई (XAI) कारण',
    exportToJournal: 'अनुशंसा को अर्थ इंजन जर्नल में सेव करें',

    // Chemical Reduction Highlights
    chemReductionNotice: 'उर्वरक बचत गारंटी: इस सिंजेंटा जैविक उत्पाद के प्रयोग से रासायनिक एनपीके की आवश्यकता 25% कम होती है, जिससे ₹1,400/एकड़ की बचत होती है।',

    // Buttons
    btnLaunch: 'मॉड्यूल खोलें',
    btnAnalyze: 'कारण विश्लेषण चलाएं',
    btnLogHarvest: 'कटाई परिणाम दर्ज करें',
  },
  mr: {
    // Header & Nav
    appName: 'बायोलूप एआय (BioLoop AI)',
    tagline: 'सिंजेंटा बायोलॉजिकल्स आणि अन्नम.एआय (आयआयटी रोपण)',
    navDashboard: 'कमांड सेंटर',
    navSowing: 'पावसाळा व पेरणी सल्लागार',
    navCropfit: 'क्रॉपफिट एआय सल्लागार',
    navJournal: 'अर्थ इंजिन शेत नोंदवही',
    navCausal: 'उत्पादन व कॉझल मॉडेल',
    navBenchmark: 'प्रादेशिक बेंचमार्क',
    navSatellite: 'सॅटेलाइट नकाशे',
    langSelect: 'भारत भाषा निवडा:',
    chemicalReductionTag: '३०% रासायनिक खत कपात उद्दिष्ट',

    // Banner / Hero
    heroTitle: 'रासायनिक खते कमी करा, पिकांचे उत्पादन शाश्वत वाढवा',
    heroSubtitle: 'सिंजेंटा बायोलॉजिकल्स (इसाबियन, क्वांटिस, यिल्डऑन) द्वारे २५-३०% युरिया/एनपीकेची बचत आणि उच्च उत्पन्न.',
    kpiChemicalReduction: 'सरासरी रासायनिक खत बचत',
    kpiYieldLift: 'निव्वळ उत्पन्न वाढ',
    kpiNetProfit: 'प्रति एकर निव्वळ नफा वाढ',
    kpiConfidence: 'मॉडेल अचूकता (DML)',

    // Key Actions / Steps
    step1Title: 'पायरी १: क्रॉपफिट प्रादेशिक भाषा एआय सल्लागार',
    step1Desc: 'मराठी किंवा इतर भारतीय भाषांमध्ये बोलून सिंजेंटा जैविक औषधांचा सल्ला आणि खत कपातीचे नियोजन मिळवा.',
    step2Title: 'पायरी २: अर्थ इंजिन सॅटेलाइट जर्नल',
    step2Desc: 'सेंटिनेल-२ उपग्रह एनडीव्हिआय नकाशे, मातीतील ओलावा आणि खत बचतीची नोंद ठेवा.',
    step3Title: 'पायरी ३: डबल एमएल कॉझल ट्विन',
    step3Desc: 'हवामानाच्या प्रभावापासून जैविक उत्पादनांचा खरा फायदा आणि निव्वळ नफा (ROBI) मोजा.',

    // Sowing Advisor
    sowingTitle: '२०२६ पावसाळी पेरणी व खत कपात सल्लागार',
    sowingDesc: 'मातीतील पोषक घटक टिकवून रासायनिक खतांवरील अवलंबित्व कमी करण्यासाठी थेट सॅटेलाइट विश्लेषण.',
    chemReductionStrategy: 'रासायनिक खत कपात धोरण',

    // CropFit Screen
    cropfitTitle: 'क्रॉपफिट बहुभाषिक एआय सल्लागार',
    cropfitDesc: 'तुमच्या भाषेत प्रश्न विचारा. नाशिक ऊस किंवा इतर पिकांसाठी युरिया कमी करून उत्पादन वाढवण्याचा सल्ला.',
    placeholderQuery: 'प्रश्न विचारा (उदा. नाशिकमध्ये उसासाठी युरिया कसा कमी करावा?)...',
    btnSend: 'सल्ला घ्या',
    btnListening: 'ऐकत आहे...',
    prescribedBio: 'शिफारस केलेले सिंजेंटा बायोलॉजिकल',
    matchScore: 'अचूकता स्कोर',
    xaiRationaleTitle: 'स्पष्टीकरण एआय (XAI) कारणे',
    exportToJournal: 'नोंदवहीत सेव्ह करा',

    // Chemical Reduction Highlights
    chemReductionNotice: 'खत कपात हमी: सिंजेंटा बायोलॉजिकल वापरल्याने २५% रासायनिक खतांची गरज कमी होते व १,४०० रुपये/एकर बचत होते.',

    // Buttons
    btnLaunch: 'मॉड्यूल सुरू करा',
    btnAnalyze: 'विश्लेषण करा',
    btnLogHarvest: 'कापणी नोंदवा',
  },
  te: {
    // Telugu
    appName: 'బయోలూప్ AI (BioLoop AI)',
    tagline: 'సింజెంటా బయోలాజికల్స్ & అన్నం.AI (IIT రోపార్)',
    navDashboard: 'కమాండ్ సెంటర్',
    navSowing: 'వర్షాకాలం & విత్తనాల సలహాదారు',
    navCropfit: 'క్రాప్‌ఫిట్ AI సలహాదారు',
    navJournal: 'ఎర్త్ ఇంజిన్ ఫీల్డ్ జర్నల్',
    navCausal: 'దిగుబడి & కాజల్ మోడల్',
    navBenchmark: 'ప్రాంతీయ బెంచ్‌మార్క్‌లు',
    navSatellite: 'శాటిలైట్ ఎక్స్‌ప్లోరర్',
    langSelect: 'భారతీయ భాషను ఎంచుకోండి:',
    chemicalReductionTag: '30% రసాయన ఎరువుల తగ్గింపు లక్ష్యం',

    heroTitle: 'రసాయన ఎరువులను తగ్గించండి, పంట దిగుబడిని పెంచండి',
    heroSubtitle: 'సింజెంటా బయోలాజికల్స్ (ఇసాబియాన్, క్వాంటిస్, యీల్డ్‌ఆన్) ద్వారా 25-30% యూరియా/NPK ని ఆదా చేయండి.',
    kpiChemicalReduction: 'సగటు రసాయన ఎరువుల ఆదా',
    kpiYieldLift: 'నికర దిగుబడి పెరుగుదల',
    kpiNetProfit: 'ఎకరాకి నికర లాభం పెరుగుదల',
    kpiConfidence: 'మోడల్ ఖచ్చితత్వం (DML)',

    step1Title: 'దశ 1: క్రాప్‌ఫిట్ ప్రాంతీయ భాషా AI సలహాదారు',
    step1Desc: 'తెలుగు లేదా ఇతర భాషలలో మాట్లాడి సింజెంటా బయోలాజికల్స్ సిఫార్సు మరియు ఎరువుల ఆదా ప్రణాళికను పొందండి.',
    step2Title: 'దశ 2: ఎర్త్ ఇంజిన్ శాటిలైట్ జర్నల్',
    step2Desc: 'సెంటినెల్-2 ఉపగ్రహ NDVI చిత్రాలు మరియు రసాయన ఎరువుల ఆదా రికార్డులను నిర్వహించండి.',
    step3Title: 'దశ 3: డబుల్ ML కాజల్ ట్విన్',
    step3Desc: 'వాతావరణ ప్రభావాలను వేరు చేసి బయోలాజికల్స్ యొక్క నిజమైన నికర లాభాన్ని (ROBI) లెక్కించండి.',

    sowingTitle: '2026 వర్షాకాల విత్తనాల ప్రణాళిక & రసాయన ఎరువుల తగ్గింపు',
    sowingDesc: 'నైట్రోజన్ వృధాను అరికట్టడానికి మరియు రసాయనాల వాడకాన్ని తగ్గించడానికి రియల్ టైమ్ డేటా.',
    chemReductionStrategy: 'రసాయన ఎరువుల తగ్గింపు వ్యూహం',

    cropfitTitle: 'క్రాప్‌ఫిట్ బహుభాషా AI సలహాదారు',
    cropfitDesc: 'మీ భాషలోనే అడగండి. గుంటూరు మిర్చి లేదా టమోటాలో రసాయన ఎరువులు తగ్గించి దిగుబడి పెంచే సలహాలు.',
    placeholderQuery: 'మీ ప్రశ్నను టైప్ చేయండి లేదా మాట్లాడండి (ఉదా. గుంటూరులో మిర్చి పంటకు ఎరువులు ఎలా తగ్గించాలి?)...',
    btnSend: 'సలహా పొందండి',
    btnListening: 'వింటోంది...',
    prescribedBio: 'సిఫార్సు చేసిన సింజెంటా బయోలాజికల్',
    matchScore: 'ఖచ్చితత్వం స్కోరు',
    xaiRationaleTitle: 'వివరణాత్మక AI (XAI) నివేదిక',
    exportToJournal: 'జర్నల్‌లో సేవ్ చేయండి',

    chemReductionNotice: 'ఎరువుల తగ్గింపు గ్యారెంటీ: ఈ సింజెంటా బయోలాజికల్ వాడకంతో 25% రసాయన ఎరువుల అవసరం తగ్గుతుంది.',

    btnLaunch: 'మాడ్యూల్ ప్రారంభించండి',
    btnAnalyze: 'విశ్లేషణ ప్రారంభించండి',
    btnLogHarvest: 'దిగుబడి నమోదు చేయండి',
  },
  ta: {
    // Tamil
    appName: 'பயோலூப் AI (BioLoop AI)',
    tagline: 'சின்ஜெண்டா பயோலாஜிகல்ஸ் & அன்னம்.AI (IIT ரோபார்)',
    navDashboard: 'கட்டளை மையம்',
    navSowing: 'பருவமழை & விதைப்பு வழிகாட்டி',
    navCropfit: 'க்ராப்ஃபிட் AI வழிகாட்டி',
    navJournal: 'எர்த் என்ஜின் புலம் டைரி',
    navCausal: 'மகசூல் & காரணி மாதிரி',
    navBenchmark: 'மண்டல ஒப்பீடுகள்',
    navSatellite: 'செயற்கைக்கோள் வரைபடம்',
    langSelect: 'இந்திய மொழியைத் தேர்ந்தெடுக்கவும்:',
    chemicalReductionTag: '30% இரசாயன உரக் குறைப்பு இலக்கு',

    heroTitle: 'இரசாயன உரங்களைக் குறைப்போம், பயிர் மகசூலை அதிகரிப்போம்',
    heroSubtitle: 'சின்ஜெண்டா பயோலாஜிகல்ஸ் (இசாபியான், குவாண்டிஸ், யீல்ட்ஆன்) மூலம் 25-30% யூரியா மற்றும் NPK உரங்களைச் சேமிக்கவும்.',
    kpiChemicalReduction: 'சராசரி இரசாயன உரச் சேமிப்பு',
    kpiYieldLift: 'நிகர மகசூல் உயர்வு',
    kpiNetProfit: 'ஏக்கருக்கு நிகர லாப உயர்வு',
    kpiConfidence: 'மாதிரி துல்லியம் (DML)',

    step1Title: 'படி 1: க்ராப்ஃபிட் தமிழ்/பிராந்திய AI வழிகாட்டி',
    step1Desc: 'தமிழில் பேசி உங்கள் பயிர் பிரச்சனைக்கான தீர்வையும் உரக் குறைப்புத் திட்டத்தையும் பெறுங்கள்.',
    step2Title: 'படி 2: எர்த் என்ஜின் செயற்கைக்கோள் டைரி',
    step2Desc: 'சென்டினல்-2 செயற்கைக்கோள் NDVI படங்கள் மற்றும் உரச் சேமிப்புப் பதிவுகளைப் பராமரிக்கவும்.',
    step3Title: 'படி 3: டபுள் ML காரணி மாதிரி',
    step3Desc: 'வானிலை தாக்கங்களைப் பிரித்து பயோலாஜிகல்ஸின் உண்மை லாபத்தைக் கணக்கிடுங்கள்.',

    sowingTitle: '2026 பருவமழை விதைப்பு & உரக் குறைப்பு வழிகாட்டி',
    sowingDesc: 'இரசாயன உரச் சார்பைக் குறைக்கவும் பயிர் ஊட்டச்சத்தை அதிகரிக்கவும் நேரலை செயற்கைக்கோள் பகுப்பாய்வு.',
    chemReductionStrategy: 'இரசாயன உரக் குறைப்பு உத்தி',

    cropfitTitle: 'க்ராப்ஃபிட் பன்மொழி AI வழிகாட்டி',
    cropfitDesc: 'கோயம்புத்தூர் பருத்தி, தக்காளி மற்றும் கரும்பில் உரங்களைக் குறைத்து மகசூலை உயர்த்துங்கள்.',
    placeholderQuery: 'கேள்வியைக் கேட்கவும் (எ.கா. யூரியா உரத்தைக் குறைப்பது எப்படி?)...',
    btnSend: 'ஆலோசனை பெறவும்',
    btnListening: 'கேட்கிறது...',
    prescribedBio: 'பரிந்துரைக்கப்பட்ட சின்ஜெண்டா பயோலாஜிகல்',
    matchScore: 'துல்லிய மதிப்பெண்',
    xaiRationaleTitle: 'விளக்கக்கூடிய AI (XAI) காரணம்',
    exportToJournal: 'டைரியில் சேமிக்கவும்',

    chemReductionNotice: 'உரக் குறைப்பு உத்தரவாதம்: 25% இரசாயன NPK உரத் தேவையை குறைத்து ஏக்கருக்கு ₹1,400 சேமிக்கிறது.',

    btnLaunch: 'தொடங்குங்கள்',
    btnAnalyze: 'பகுப்பாய்வு செய்',
    btnLogHarvest: 'அறுவடை பதிவு செய்',
  },
  pa: {
    // Punjabi
    appName: 'ਬਾਇਓਲੂਪ AI (BioLoop AI)',
    tagline: 'ਸਿੰਜੈਂਟਾ ਬਾਇਓਲੋਜੀਕਲਸ ਅਤੇ ਅੰਨਮ.AI (IIT ਰੋਪੜ)',
    navDashboard: 'ਕਮਾਂਡ ਸੈਂਟਰ',
    navSowing: 'ਮਾਨਸੂਨ ਅਤੇ ਬਿਜਾਈ ਸਲਾਹਕਾਰ',
    navCropfit: 'ਕ੍ਰੌਪਫਿੱਟ AI ਸਲਾਹਕਾਰ',
    navJournal: 'ਅਰਥ ਇੰਜਨ ਖੇਤ ਰਜਿਸਟਰ',
    navCausal: 'ਝਾੜ ਅਤੇ ਕਾਰਣ ਮਾਡਲ',
    navBenchmark: 'ਖੇਤਰੀ ਬੈਂਚਮਾਰਕ',
    navSatellite: 'ਸੈਟੇਲਾਈਟ ਐਕਸਪਲੋਰਰ',
    langSelect: 'ਭਾਰਤੀ ਭਾਸ਼ਾ ਚੁਣੋ:',
    chemicalReductionTag: '30% ਰਸਾਇਣਕ ਖਾਦ ਘਟਾਉਣ ਦਾ ਟੀਚਾ',

    heroTitle: 'ਰਸਾਇਣਕ ਖਾਦਾਂ ਘਟਾਓ, ਝਾੜ ਸਥਿਰਤਾ ਨਾਲ ਵਧਾਓ',
    heroSubtitle: 'ਸਿੰਜੈਂਟਾ ਬਾਇਓਲੋਜੀਕਲਸ (ਇਸਾਬੀਅਨ, ਕਵਾਂਟਿਸ, ਯੀਲਡਆਨ) ਨਾਲ 25-30% ਯੂਰੀਆ/NPK ਦੀ ਬਚਤ ਅਤੇ ਵਧੇਰੇ ਮੁਨਾਫ਼ਾ।',
    kpiChemicalReduction: 'ਔਸਤ ਰਸਾਇਣਕ ਖਾਦ ਬਚਤ',
    kpiYieldLift: 'ਸ਼ੁੱਧ ਝਾੜ ਵਾਧਾ',
    kpiNetProfit: 'ਪ੍ਰਤੀ ਏਕੜ ਸ਼ੁੱਧ ਮੁਨਾਫ਼ਾ',
    kpiConfidence: 'ਮਾਡਲ ਸ਼ੁੱਧਤਾ (DML)',

    step1Title: 'ਕਦਮ 1: ਕ੍ਰੌਪਫਿੱਟ ਪੰਜਾਬੀ AI ਸਲਾਹਕਾਰ',
    step1Desc: 'ਪੰਜਾਬੀ ਜਾਂ ਹੋਰ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲ ਕੇ ਨਰਮੇ, ਝੋਨੇ ਲਈ ਖਾਦ ਘਟਾਉਣ ਅਤੇ ਝਾੜ ਵਧਾਉਣ ਦੀ ਸਲਾਹ ਲਵੋ।',
    step2Title: 'ਕਦਮ 2: ਅਰਥ ਇੰਜਨ ਸੈਟੇਲਾਈਟ ਰਜਿਸਟਰ',
    step2Desc: 'ਸੈਂਟੀਨਲ-2 ਸੈਟੇਲਾਈਟ NDVI ਨਕਸ਼ੇ ਅਤੇ ਖਾਦ ਬਚਤ ਦੇ ਰਿਕਾਰਡ ਰੱਖੋ।',
    step3Title: 'ਕਦਮ 3: ਡਬਲ ML ਕਾਰਣ ਟਵਿਨ',
    step3Desc: 'ਮੌਸਮੀ ਪ੍ਰਭਾਵਾਂ ਤੋਂ ਬਿਨਾਂ ਬਾਇਓਲੋਜੀਕਲ ਖਾਦਾਂ ਦਾ ਅਸਲੀ ਲਾਭ (ROBI) ਮਾਪੋ।',

    sowingTitle: '2026 ਮਾਨਸੂਨ ਬਿਜਾਈ ਅਤੇ ਰਸਾਇਣ ਖਾਦ ਘਟਾਓ ਸਲਾਹਕਾਰ',
    sowingDesc: 'ਬਠਿੰਡਾ, ਲੁਧਿਆਣਾ ਅਤੇ ਪੰਜਾਬ ਦੇ ਕਿਸਾਨਾਂ ਲਈ ਰਸਾਇਣਕ ਨਿਰਭਰਤਾ ਘਟਾਉਣ ਦਾ ਵਿਗਿਆਨਕ ਤਰੀਕਾ।',
    chemReductionStrategy: 'ਰਸਾਇਣਕ ਖਾਦ ਘਟਾਓ ਰਣਨੀਤੀ',

    cropfitTitle: 'ਕ੍ਰੌਪਫਿੱਟ ਬਹੁ-ਭਾਸ਼ਾਈ AI ਸਲਾਹਕਾਰ',
    cropfitDesc: 'ਬਠਿੰਡਾ ਕਪਾਹ ਜਾਂ ਝੋਨੇ ਵਿੱਚ ਯੂਰੀਆ ਖਾਦ ਘਟਾ ਕੇ ਝਾੜ ਵਧਾਉਣ ਦਾ ਸਹੀ ਤਰੀਕਾ।',
    placeholderQuery: 'ਆਪਣਾ ਸਵਾਲ ਪੁੱਛੋ (ਜਿਵੇਂ: ਬਠਿੰਡਾ ਨਰਮੇ ਵਿੱਚ ਯੂਰੀਆ ਕਿਵੇਂ ਘਟਾਈਏ?)...',
    btnSend: 'ਸਲਾਹ ਲਵੋ',
    btnListening: 'ਸੁਣ ਰਿਹਾ ਹੈ...',
    prescribedBio: 'ਸਿਫ਼ਾਰਿਸ਼ ਕੀਤਾ ਸਿੰਜੈਂਟਾ ਬਾਇਓਲੋਜੀਕਲ',
    matchScore: 'ਸ਼ੁੱਧਤਾ ਸਕੋਰ',
    xaiRationaleTitle: 'ਵਿਆਖਿਆਤਮਕ AI (XAI) ਕਾਰਣ',
    exportToJournal: 'ਰਜਿਸਟਰ ਵਿੱਚ ਸੰਭਾਲੋ',

    chemReductionNotice: 'ਖਾਦ ਬਚਤ ਗਾਰੰਟੀ: 25% ਰਸਾਇਣਕ ਖਾਦਾਂ ਦੀ ਲੋੜ ਘੱਟਦੀ ਹੈ ਅਤੇ ₹1,400/ਏਕੜ ਦੀ ਬਚਤ ਹੁੰਦੀ ਹੈ।',

    btnLaunch: 'ਮਾਡਿਊਲ ਚਲਾਓ',
    btnAnalyze: 'ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    btnLogHarvest: 'ਝਾੜ ਦਰਜ ਕਰੋ',
  },
  gu: {
    // Gujarati
    appName: 'બાયોલૂપ AI (BioLoop AI)',
    tagline: 'સિન્જેન્ટા બાયોલોજીકલ્સ અને અન્નમ.AI (IIT રોપડ)',
    navDashboard: 'કમાન્ડ સેન્ટર',
    navSowing: 'ચોમાસુ અને વાવણી સલાહકાર',
    navCropfit: 'ક્રોપફિટ AI સલાહકાર',
    navJournal: 'અર્થ એન્જિન ખેતર ડાયરી',
    navCausal: 'ઉત્પાદન અને કોઝલ મોડેલ',
    navBenchmark: 'પ્રાદેશિક બેન્ચમાર્ક',
    navSatellite: 'સેટેલાઇਟ એક્સપ્લોરર',
    langSelect: 'ભારતીય ભાષા પસંદ કરો:',
    chemicalReductionTag: '30% રાસાયણિક ખાતર ઘટાડાનું લક્ષ્ય',

    heroTitle: 'રાસાયણિક ખાતરો ઘટાડો, પાક ઉત્પાદન સુધારા સાથે વધારો',
    heroSubtitle: 'સિન્જેન્ટા બાયોલોજીકલ્સ (ઇસાબિયન, ક્વાન્ટિસ, યીલ્ડઓન) દ્વારા 25-30% યુરિયા/NPK ની બચત.',
    kpiChemicalReduction: 'સરેરાશ રાસાયણિક ખાતર બચત',
    kpiYieldLift: 'ચોખ્ખો ઉત્પાદન વધારો',
    kpiNetProfit: 'એકર દીઠ ચોખ્ખો નફો',
    kpiConfidence: 'મોડેલ ચોકસાઈ (DML)',

    step1Title: 'પગલું 1: ક્રોપફિટ પ્રાદેશિક AI સલાહકાર',
    step1Desc: 'ગુજરાતીમાં બોલીને કપાસ અને મગફળીમાં રાસાયણિક ખાતર ઘટાડી ઉત્પાદન વધારવાની યોજના મેળવો.',
    step2Title: 'પગલું 2: અર્થ એન્જિન સેટેલાઇટ ડાયરી',
    step2Desc: 'સેન્ટીનલ-2 સેટેલાઇટ NDVI નકશા અને ખાતર બચતના રેકોર્ડ જાળવો.',
    step3Title: 'પગલું 3: ડબલ ML કોઝલ ટ્વિન',
    step3Desc: 'હવામાનની અસરો અલગ કરીને બાયોલોજીકલ્સનો સાચો ચોખ્ખો નફો (ROBI) માપો.',

    sowingTitle: '2026 ચોમાસુ વાવણી અને ખાતર ઘટાડા સલાહકાર',
    sowingDesc: 'રાજકોટ, સૌરાષ્ટ્ર અને ગુજરાત માટે જમીનની ફળદ્રુપતા જાળવી રાસાયણિક મુક્ત ખેતી.',
    chemReductionStrategy: 'રાસાયણિક ખાતર ઘટાડાની વ્યૂહરચના',

    cropfitTitle: 'ક્રોપફિટ બહુભાષી AI સલાહકાર',
    cropfitDesc: 'ગુજરાતીમાં પ્રશ્ન પૂછો. કપાસ અને મગફળીમાં યુરિયા ઘટાડવાનો ઉપાય.',
    placeholderQuery: 'પ્રશ્ન પૂછો (દા.ત. કપાસમાં યુરિયા ખાતર કેવી રીતે ઘટાડવું?)...',
    btnSend: 'સલાહ લો',
    btnListening: 'સાંભળી રહ્યું છે...',
    prescribedBio: 'ભલામણ કરેલ સિન્જેન્ટા બાયોલોજીકલ',
    matchScore: 'ચોકસાઈ સ્કોર',
    xaiRationaleTitle: 'સ્પષ્ટીકરણ AI (XAI) કારણો',
    exportToJournal: 'ડાયરીમાં સાચવો',

    chemReductionNotice: 'ખાતર ઘટાડાની ખાતરી: 25% રાસાયણિક ખાતરની જરૂરિયાત ઘટે છે અને ₹1,400/એકર બચત થાય છે.',

    btnLaunch: 'મોડ્યુલ શરૂ કરો',
    btnAnalyze: 'વિશ્લેષણ કરો',
    btnLogHarvest: 'લણણી નોંધો',
  },
};

export const translateText = (key: string, lang: Language): string => {
  if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
    return TRANSLATIONS[lang][key];
  }
  return TRANSLATIONS.en[key] || key;
};
