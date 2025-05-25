
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const MindReaderModePage = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            {isEnglish ? 'Mind Reader Mode' : 'माइंड रीडर मोड'}
          </h1>
          <p className="text-xl text-gray-300">
            {isEnglish 
              ? 'AI-powered insights into your partner\'s thoughts and feelings' 
              : 'आपके साथी के विचारों और भावनाओं में एआई अंतर्दृष्टि'}
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

export default MindReaderModePage;
