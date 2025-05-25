
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const FirstTimeScriptGeneratorPage = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            {isEnglish ? 'First-Time Script Generator' : 'फर्स्ट-टाइम स्क्रिप्ट जनरेटर'}
          </h1>
          <p className="text-xl text-gray-300">
            {isEnglish 
              ? 'Gentle scripts for intimate first-time experiences' 
              : 'अंतरंग पहली बार के अनुभवों के लिए कोमल स्क्रिप्ट'}
          </p>
        </div>
        
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <p className="text-center text-xl">
            {isEnglish ? 'Coming soon!' : 'जल्द आ रहा है!'}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default FirstTimeScriptGeneratorPage;
