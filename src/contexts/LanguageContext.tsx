
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Available languages
export type LanguageType = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'ko' | 'zh' | 'hi' | 'ru' | 'ar' | 'nl' | 'sv' | 'no' | 'da' | 'fi';

// Translations interface
export interface TranslationsType {
  [key: string]: {
    [key: string]: string;
  };
}

// Default translations
export const translations: TranslationsType = {
  en: {
    // Navigation
    home: "Home",
    features: "Features",
    pricing: "Pricing",
    blog: "Blog",
    login: "Log In / Sign Up",
    logout: "Logout",
    // Common UI elements
    getStarted: "Get Started",
    tryNow: "Try Now",
    loading: "Loading...",
    // Tool categories
    sextingGenerator: "Sexting Generator",
    dirtyTalkIdeas: "Dirty Talk Ideas",
    eroticChat: "Erotic AI Chat",
    incomeCalculator: "Income Calculator",
    anniversaryIdeas: "Anniversary Ideas",
    firstDateIdeas: "First Date Ideas",
    // First Date Ideas categories
    uniqueIdeas: "Unique First Date Ideas for Couples",
    romanticIdeas: "Romantic First Date Ideas at Home",
    funIdeas: "Fun First Date Ideas for Young Adults",
    shyPeople: "Creative First Date Ideas for Shy People",
    foodLovers: "First Date Ideas for Food Lovers",
    newYorkCity: "First Date Ideas in New York City",
    movieBuffs: "First Date Ideas for Movie Buffs",
    budgetIdeas: "First Date Ideas on a Budget",
    natureLovers: "First Date Ideas for Nature Lovers",
    artEnthusiasts: "First Date Ideas for Art Enthusiasts",
    // Form elements
    location: "Location",
    budget: "Budget",
    interests: "Interests",
    season: "Season",
    generate: "Generate Ideas",
    // Footer
    copyright: "© 2025 NaughtyyAI. All rights reserved. 18+ only.",
    contactUs: "Contact Us",
    support: "Support",
    faq: "FAQ",
    // Premium banner
    upgradeNow: "Upgrade Now",
  },
  hi: {
    // Navigation
    home: "होम",
    features: "विशेषताएँ",
    pricing: "मूल्य निर्धारण",
    blog: "ब्लॉग",
    login: "लॉग इन / साइन अप",
    logout: "लॉग आउट",
    // Common UI elements
    getStarted: "शुरू करें",
    tryNow: "अभी आज़माएं",
    loading: "लोड हो रहा है...",
    // Tool categories
    sextingGenerator: "सेक्स्टिंग जनरेटर",
    dirtyTalkIdeas: "डर्टी टॉक आइडियाज़",
    eroticChat: "इरोटिक AI चैट",
    incomeCalculator: "आय कैलकुलेटर",
    anniversaryIdeas: "सालगिरह के लिए आइडियाज़",
    firstDateIdeas: "पहली डेट के आइडियाज़",
    // First Date Ideas categories
    uniqueIdeas: "जोड़ों के लिए अनोखे पहली डेट आइडियाज़",
    romanticIdeas: "घर पर रोमांटिक पहली डेट आइडियाज़",
    funIdeas: "युवा वयस्कों के लिए मज़ेदार पहली डेट आइडियाज़",
    shyPeople: "शर्मीले लोगों के लिए रचनात्मक पहली डेट आइडियाज़",
    foodLovers: "खाना प्रेमियों के लिए पहली डेट आइडियाज़",
    newYorkCity: "न्यूयॉर्क शहर में पहली डेट आइडियाज़",
    movieBuffs: "फिल्म प्रेमियों के लिए पहली डेट आइडियाज़",
    budgetIdeas: "बजट पर पहली डेट आइडियाज़",
    natureLovers: "प्रकृति प्रेमियों के लिए पहली डेट आइडियाज़",
    artEnthusiasts: "कला प्रेमियों के लिए पहली डेट आइडियाज़",
    // Form elements
    location: "स्थान",
    budget: "बजट",
    interests: "रुचियां",
    season: "मौसम",
    generate: "आइडियाज़ जनरेट करें",
    // Footer
    copyright: "© 2025 NaughtyyAI. सर्वाधिकार सुरक्षित। केवल 18+ के लिए।",
    contactUs: "संपर्क करें",
    support: "सहायता",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    // Premium banner
    upgradeNow: "अभी अपग्रेड करें",
  },
  es: {
    home: "Inicio",
    features: "Características",
    pricing: "Precios",
    blog: "Blog",
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    getStarted: "Comenzar",
    tryNow: "Probar Ahora",
    loading: "Cargando...",
    upgradeNow: "Actualizar Ahora",
  },
  fr: {
    home: "Accueil",
    features: "Fonctionnalités",
    pricing: "Tarifs",
    blog: "Blog",
    login: "Se Connecter",
    logout: "Se Déconnecter",
    getStarted: "Commencer",
    tryNow: "Essayer Maintenant",
    loading: "Chargement...",
    upgradeNow: "Mettre à Niveau",
  },
  de: {
    home: "Startseite",
    features: "Funktionen",
    pricing: "Preise",
    blog: "Blog",
    login: "Anmelden",
    logout: "Abmelden",
    getStarted: "Loslegen",
    tryNow: "Jetzt Testen",
    loading: "Laden...",
    upgradeNow: "Jetzt Upgraden",
  },
  it: {
    home: "Home",
    features: "Caratteristiche",
    pricing: "Prezzi",
    blog: "Blog",
    login: "Accedi",
    logout: "Esci",
    getStarted: "Inizia",
    tryNow: "Prova Ora",
    loading: "Caricamento...",
    upgradeNow: "Aggiorna Ora",
  },
  pt: {
    home: "Início",
    features: "Recursos",
    pricing: "Preços",
    blog: "Blog",
    login: "Entrar",
    logout: "Sair",
    getStarted: "Começar",
    tryNow: "Testar Agora",
    loading: "Carregando...",
    upgradeNow: "Atualizar Agora",
  },
  ja: {
    home: "ホーム",
    features: "機能",
    pricing: "料金",
    blog: "ブログ",
    login: "ログイン",
    logout: "ログアウト",
    getStarted: "始める",
    tryNow: "今すぐ試す",
    loading: "読み込み中...",
    upgradeNow: "今すぐアップグレード",
  },
  ko: {
    home: "홈",
    features: "기능",
    pricing: "가격",
    blog: "블로그",
    login: "로그인",
    logout: "로그아웃",
    getStarted: "시작하기",
    tryNow: "지금 시도",
    loading: "로딩 중...",
    upgradeNow: "지금 업그레이드",
  },
  zh: {
    home: "首页",
    features: "功能",
    pricing: "价格",
    blog: "博客",
    login: "登录",
    logout: "登出",
    getStarted: "开始",
    tryNow: "立即试用",
    loading: "加载中...",
    upgradeNow: "立即升级",
  },
  ru: {
    home: "Главная",
    features: "Функции",
    pricing: "Цены",
    blog: "Блог",
    login: "Войти",
    logout: "Выйти",
    getStarted: "Начать",
    tryNow: "Попробовать",
    loading: "Загрузка...",
    upgradeNow: "Обновить",
  },
  ar: {
    home: "الرئيسية",
    features: "الميزات",
    pricing: "الأسعار",
    blog: "المدونة",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    getStarted: "ابدأ",
    tryNow: "جرب الآن",
    loading: "جاري التحميل...",
    upgradeNow: "ترقية الآن",
  },
  nl: {
    home: "Thuis",
    features: "Functies",
    pricing: "Prijzen",
    blog: "Blog",
    login: "Inloggen",
    logout: "Uitloggen",
    getStarted: "Beginnen",
    tryNow: "Nu Proberen",
    loading: "Laden...",
    upgradeNow: "Nu Upgraden",
  },
  sv: {
    home: "Hem",
    features: "Funktioner",
    pricing: "Priser",
    blog: "Blogg",
    login: "Logga In",
    logout: "Logga Ut",
    getStarted: "Kom Igång",
    tryNow: "Prova Nu",
    loading: "Laddar...",
    upgradeNow: "Uppgradera Nu",
  },
  no: {
    home: "Hjem",
    features: "Funksjoner",
    pricing: "Priser",
    blog: "Blogg",
    login: "Logg Inn",
    logout: "Logg Ut",
    getStarted: "Kom I Gang",
    tryNow: "Prøv Nå",
    loading: "Laster...",
    upgradeNow: "Oppgrader Nå",
  },
  da: {
    home: "Hjem",
    features: "Funktioner",
    pricing: "Priser",
    blog: "Blog",
    login: "Log Ind",
    logout: "Log Ud",
    getStarted: "Kom I Gang",
    tryNow: "Prøv Nu",
    loading: "Indlæser...",
    upgradeNow: "Opgrader Nu",
  },
  fi: {
    home: "Koti",
    features: "Ominaisuudet",
    pricing: "Hinnat",
    blog: "Blogi",
    login: "Kirjaudu Sisään",
    logout: "Kirjaudu Ulos",
    getStarted: "Aloita",
    tryNow: "Kokeile Nyt",
    loading: "Ladataan...",
    upgradeNow: "Päivitä Nyt",
  },
};

// Context interface
interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
