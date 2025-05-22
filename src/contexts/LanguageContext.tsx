
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Available languages
export type LanguageType = 'en' | 'hi';

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
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
