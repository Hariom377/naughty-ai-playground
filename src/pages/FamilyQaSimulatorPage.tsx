
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const FamilyQaSimulatorPage = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            {isEnglish ? 'Family Q&A Simulator' : 'फैमिली Q&A सिमुलेटर'}
          </h1>
          <p className="text-xl text-gray-300">
            {isEnglish 
              ? 'Practice answering relationship questions from family' 
              : 'परिवार के रिश्ते संबंधी प्रश्नों के उत्तर देने का अभ्यास करें'}
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

export default FamilyQaSimulatorPage;
