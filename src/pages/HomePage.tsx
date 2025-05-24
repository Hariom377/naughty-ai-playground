import React from 'react';
import Layout from '@/components/layout/Layout';
import FeatureCard from '@/components/tools/FeatureCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { Search, MessageSquare, Heart, Users, Sparkles, Send, Gift, X, Clock, Brain, HeartHandshake, PenTool, Zap, Shield, Eye, Volume2, Calculator, GamepadIcon } from 'lucide-react';
const HomePage = () => {
  const {
    language
  } = useLanguage();
  const {
    user
  } = useUser();
  const isEnglish = language === 'en';
  const features = [{
    title: isEnglish ? 'Sexting Generator' : 'सेक्सटिंग जनरेटर',
    description: isEnglish ? 'Create romantic messages with customizable tone' : 'अनुकूलन योग्य टोन के साथ रोमांटिक संदेश बनाएं',
    icon: <Send />,
    to: '/sexting-generator',
    isPremium: false
  }, {
    title: isEnglish ? 'Dirty Talk Ideas' : 'डर्टी टॉक आइडियास',
    description: isEnglish ? 'Explore exciting phrases for intimate moments' : 'अंतरंग पलों के लिए रोमांचक वाक्यांश',
    icon: <MessageSquare />,
    to: '/dirty-talk-ideas',
    isPremium: true
  }, {
    title: isEnglish ? 'Erotic Chat' : 'इरोटिक चैट',
    description: isEnglish ? 'Practice intimate conversations with AI companion' : 'AI साथी के साथ अंतरंग बातचीत का अभ्यास करें',
    icon: <Heart />,
    to: '/erotic-chat',
    isPremium: true
  }, {
    title: isEnglish ? 'Interest Overlap Finder' : 'इंटरेस्ट ओवरलैप फाइंडर',
    description: isEnglish ? 'Discover shared passions and hidden connections' : 'साझा जुनून और छिपे कनेक्शन खोजें',
    icon: <Search />,
    to: '/interest-overlap-finder',
    isPremium: false,
    newFeature: true
  }, {
    title: isEnglish ? 'Text CPR' : 'टेक्स्ट सीपीआर',
    description: isEnglish ? 'Resuscitate dying conversations with witty rewrites' : 'चतुर पुनर्लेखन के साथ मरती बातचीत को पुनर्जीवित करें',
    icon: <Sparkles />,
    to: '/text-cpr',
    isPremium: false,
    newFeature: true
  }, {
    title: isEnglish ? 'Flirt Coach' : 'फ्लर्ट कोच',
    description: isEnglish ? 'Master the art of flirting with personalized guidance' : 'वैयक्तिकृत मार्गदर्शन के साथ फ्लर्टिंग की कला में महारत हासिल करें',
    icon: <Heart />,
    to: '/flirt-coach',
    isPremium: false,
    newFeature: true
  }, {
    title: isEnglish ? 'Social Spy' : 'सोशल स्पाई',
    description: isEnglish ? 'Ace meet-the-friends scenarios with insider knowledge' : 'अंदरूनी जानकारी के साथ दोस्तों से मिलने के परिदृश्य में उत्कृष्टता प्राप्त करें',
    icon: <Users />,
    to: '/social-spy',
    isPremium: true,
    newFeature: true
  }, {
    title: isEnglish ? 'Fight Moderator' : 'फाइट मॉडरेटर',
    description: isEnglish ? 'De-escalate conflicts with real-time message analysis' : 'वास्तविक समय संदेश विश्लेषण के साथ संघर्षों को कम करें',
    icon: <HeartHandshake />,
    to: '/fight-moderator',
    isPremium: true,
    newFeature: true
  }, {
    title: isEnglish ? 'Anniversary Ideas' : 'वर्षगांठ विचार',
    description: isEnglish ? 'Generate creative anniversary celebration concepts' : 'रचनात्मक वर्षगांठ उत्सव अवधारणाएँ उत्पन्न करें',
    icon: <Gift />,
    to: '/anniversary-ideas',
    isPremium: false
  }, {
    title: isEnglish ? 'First Date Ideas' : 'पहली डेट आइडियास',
    description: isEnglish ? 'Find the perfect activities for a memorable first date' : 'एक यादगार पहली डेट के लिए बिल्कुल सही गतिविधियां',
    icon: <Sparkles />,
    to: '/first-date-ideas',
    isPremium: false
  }, {
    title: isEnglish ? 'Random Adventure Wheel' : 'रैंडम एडवेंचर व्हील',
    description: isEnglish ? 'Spin for surprising adventures to break your routine' : 'अपनी दिनचर्या तोड़ने के लिए आश्चर्यजनक साहसिक कार्यों के लिए स्पिन करें',
    icon: <GamepadIcon />,
    to: '/random-adventure-wheel',
    isPremium: false,
    newFeature: true
  }, {
    title: isEnglish ? 'Love Language' : 'लव लैंग्वेज',
    description: isEnglish ? 'Decode and understand your partner\'s love language' : 'अपने साथी की प्रेम भाषा को समझें',
    icon: <Brain />,
    to: '/love-language-decoder',
    isPremium: false
  }, {
    title: isEnglish ? 'Love Note Generator' : 'लव नोट जनरेटर',
    description: isEnglish ? 'Create heartfelt love notes and romantic messages' : 'दिल से लव नोट्स और रोमांटिक मैसेज बनाएं',
    icon: <PenTool />,
    to: '/love-note-generator',
    isPremium: false
  }, {
    title: isEnglish ? 'Confession Letter' : 'कनफेशन लेटर',
    description: isEnglish ? 'Craft the perfect letter to express your feelings' : 'अपनी भावनाओं को व्यक्त करने के लिए एकदम सही पत्र',
    icon: <PenTool />,
    to: '/confession-letter',
    isPremium: true
  }, {
    title: isEnglish ? 'Ex Detox' : 'एक्स डिटॉक्स',
    description: isEnglish ? 'Overcome jealousy and comparisons to exes' : 'पूर्व प्रेमियों से ईर्ष्या और तुलना पर काबू पाएं',
    icon: <X />,
    to: '/ex-detox',
    isPremium: true,
    newFeature: true
  }];
  return <Layout>
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="keep this font in h1 and romantic format\\n text-5xl text-[#e839d6] font-semibold">
            {isEnglish ? 'AI-Powered Love Tools' : 'एआई-पावर्ड लव टूल्स'}
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            {isEnglish ? 'Enhance your romantic life with our comprehensive suite of AI-powered relationship tools' : 'एआई-संचालित संबंध उपकरणों के हमारे व्यापक सूट के साथ अपने रोमांटिक जीवन को बढ़ाएं'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {features.map((feature, index) => <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} to={feature.to} isPremium={feature.isPremium} newFeature={feature.newFeature} />)}
        </div>
      </div>
    </Layout>;
};
export default HomePage;