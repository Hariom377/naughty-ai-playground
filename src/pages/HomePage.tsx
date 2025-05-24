
import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import FeatureCard from '@/components/tools/FeatureCard';
import SearchBar from '@/components/tools/SearchBar';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { Search, MessageSquare, Heart, Users, Sparkles, Send, Gift, X, Clock, Brain, HeartHandshake, PenTool, Zap, Shield, Eye, Volume2, Calculator, GamepadIcon, Star, HelpCircle, AudioLines, Lightbulb, Languages, Palette } from 'lucide-react';

const HomePage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isEnglish = language === 'en';

  const features = [
    {
      title: isEnglish ? 'Sexting Generator' : 'सेक्सटिंग जनरेटर',
      description: isEnglish ? 'Create romantic messages with customizable tone' : 'अनुकूलन योग्य टोन के साथ रोमांटिक संदेश बनाएं',
      icon: <Send />,
      to: '/sexting-generator',
      isPremium: false,
      category: 'messaging',
      featured: true
    },
    {
      title: isEnglish ? 'Dirty Talk Ideas' : 'डर्टी टॉक आइडियास',
      description: isEnglish ? 'Explore exciting phrases for intimate moments' : 'अंतरंग पलों के लिए रोमांचक वाक्यांश',
      icon: <MessageSquare />,
      to: '/dirty-talk-ideas',
      isPremium: true,
      category: 'intimacy'
    },
    {
      title: isEnglish ? 'Erotic Chat' : 'इरोटिक चैट',
      description: isEnglish ? 'Practice intimate conversations with AI companion' : 'AI साथी के साथ अंतरंग बातचीत का अभ्यास करें',
      icon: <Heart />,
      to: '/erotic-chat',
      isPremium: true,
      category: 'chat',
      featured: true
    },
    {
      title: isEnglish ? 'Interest Overlap Finder' : 'इंटरेस्ट ओवरलैप फाइंडर',
      description: isEnglish ? 'Discover shared passions and hidden connections' : 'साझा जुनून और छिपे कनेक्शन खोजें',
      icon: <Search />,
      to: '/interest-overlap-finder',
      isPremium: false,
      newFeature: true,
      category: 'relationship'
    },
    {
      title: isEnglish ? 'Text CPR' : 'टेक्स्ट सीपीआर',
      description: isEnglish ? 'Resuscitate dying conversations with witty rewrites' : 'चतुर पुनर्लेखन के साथ मरती बातचीत को पुनर्जीवित करें',
      icon: <Sparkles />,
      to: '/text-cpr',
      isPremium: false,
      newFeature: true,
      category: 'messaging'
    },
    {
      title: isEnglish ? 'Flirt Coach' : 'फ्लर्ट कोच',
      description: isEnglish ? 'Master the art of flirting with personalized guidance' : 'वैयक्तिकृत मार्गदर्शन के साथ फ्लर्टिंग की कला में महारत हासिल करें',
      icon: <Heart />,
      to: '/flirt-coach',
      isPremium: false,
      newFeature: true,
      category: 'coaching',
      featured: true
    },
    {
      title: isEnglish ? 'Social Spy' : 'सोशल स्पाई',
      description: isEnglish ? 'Ace meet-the-friends scenarios with insider knowledge' : 'अंदरूनी जानकारी के साथ दोस्तों से मिलने के परिदृश्य में उत्कृष्टता प्राप्त करें',
      icon: <Users />,
      to: '/social-spy',
      isPremium: true,
      newFeature: true,
      category: 'social'
    },
    {
      title: isEnglish ? 'Fight Moderator' : 'फाइट मॉडरेटर',
      description: isEnglish ? 'De-escalate conflicts with real-time message analysis' : 'वास्तविक समय संदेश विश्लेषण के साथ संघर्षों को कम करें',
      icon: <HeartHandshake />,
      to: '/fight-moderator',
      isPremium: true,
      newFeature: true,
      category: 'relationship'
    },
    {
      title: isEnglish ? 'Anniversary Ideas' : 'वर्षगांठ विचार',
      description: isEnglish ? 'Generate creative anniversary celebration concepts' : 'रचनात्मक वर्षगांठ उत्सव अवधारणाएँ उत्पन्न करें',
      icon: <Gift />,
      to: '/anniversary-ideas',
      isPremium: false,
      category: 'dating'
    },
    {
      title: isEnglish ? 'First Date Ideas' : 'पहली डेट आइडियास',
      description: isEnglish ? 'Find the perfect activities for a memorable first date' : 'एक यादगार पहली डेट के लिए बिल्कुल सही गतिविधियां',
      icon: <Sparkles />,
      to: '/first-date-ideas',
      isPremium: false,
      category: 'dating'
    },
    {
      title: isEnglish ? 'Random Adventure Wheel' : 'रैंडम एडवेंचर व्हील',
      description: isEnglish ? 'Spin for surprising adventures to break your routine' : 'अपनी दिनचर्या तोड़ने के लिए आश्चर्यजनक साहसिक कार्यों के लिए स्पिन करें',
      icon: <GamepadIcon />,
      to: '/random-adventure-wheel',
      isPremium: false,
      newFeature: true,
      category: 'fun'
    },
    {
      title: isEnglish ? 'Love Language' : 'लव लैंग्वेज',
      description: isEnglish ? 'Decode and understand your partner\'s love language' : 'अपने साथी की प्रेम भाषा को समझें',
      icon: <Brain />,
      to: '/love-language-decoder',
      isPremium: false,
      category: 'relationship'
    },
    {
      title: isEnglish ? 'Love Note Generator' : 'लव नोट जनरेटर',
      description: isEnglish ? 'Create heartfelt love notes and romantic messages' : 'दिल से लव नोट्स और रोमांटिक मैसेज बनाएं',
      icon: <PenTool />,
      to: '/love-note-generator',
      isPremium: false,
      category: 'messaging'
    },
    {
      title: isEnglish ? 'Confession Letter' : 'कनफेशन लेटर',
      description: isEnglish ? 'Craft the perfect letter to express your feelings' : 'अपनी भावनाओं को व्यक्त करने के लिए एकदम सही पत्र',
      icon: <PenTool />,
      to: '/confession-letter',
      isPremium: true,
      category: 'messaging'
    },
    {
      title: isEnglish ? 'Ex Detox' : 'एक्स डिटॉक्स',
      description: isEnglish ? 'Overcome jealousy and comparisons to exes' : 'पूर्व प्रेमियों से ईर्ष्या और तुलना पर काबू पाएं',
      icon: <X />,
      to: '/ex-detox',
      isPremium: true,
      newFeature: true,
      category: 'healing'
    },
    {
      title: isEnglish ? 'Voice Message Mood Detector' : 'वॉयस मैसेज मूड डिटेक्टर',
      description: isEnglish ? 'Analyze the emotional tone of voice messages' : 'वॉयस मैसेज के भावनात्मक टोन का विश्लेषण करें',
      icon: <Volume2 />,
      to: '/voice-message-mood',
      isPremium: true,
      newFeature: true,
      category: 'analysis'
    },
    {
      title: isEnglish ? 'AI Couple\'s Quiz Show' : 'एआई कपल क्विज़ शो',
      description: isEnglish ? 'Interactive quiz to test your relationship knowledge' : 'अपने रिश्ते की जानकारी का परीक्षण करने के लिए इंटरैक्टिव क्विज़',
      icon: <HelpCircle />,
      to: '/couples-quiz',
      isPremium: false,
      newFeature: true,
      category: 'fun'
    },
    {
      title: isEnglish ? 'Gift Translator' : 'गिफ्ट ट्रांसलेटर',
      description: isEnglish ? 'Decode the meaning behind gifts and gestures' : 'उपहारों और इशारों के पीछे के अर्थ को समझें',
      icon: <Gift />,
      to: '/gift-translator',
      isPremium: true,
      newFeature: true,
      category: 'analysis'
    },
    {
      title: isEnglish ? 'Emotion Translator' : 'इमोशन ट्रांसलेटर',
      description: isEnglish ? 'Understand hidden emotions in messages and behavior' : 'संदेशों और व्यवहार में छुपी भावनाओं को समझें',
      icon: <Palette />,
      to: '/emotion-translator',
      isPremium: true,
      newFeature: true,
      category: 'analysis'
    },
    {
      title: isEnglish ? 'Mind Reader Mode' : 'माइंड रीडर मोड',
      description: isEnglish ? 'AI insights into what your partner might be thinking' : 'आपका साथी क्या सोच रहा है इसकी AI अंतर्दृष्टि',
      icon: <Brain />,
      to: '/mind-reader-mode',
      isPremium: true,
      newFeature: true,
      category: 'analysis'
    },
    {
      title: isEnglish ? 'First-Time Script Generator' : 'फर्स्ट-टाइम स्क्रिप्ट जनरेटर',
      description: isEnglish ? 'Gentle guidance for intimate first experiences' : 'अंतरंग पहले अनुभवों के लिए कोमल मार्गदर्शन',
      icon: <AudioLines />,
      to: '/first-time-script',
      isPremium: true,
      newFeature: true,
      category: 'intimacy'
    },
    {
      title: isEnglish ? 'No-Shame Intimacy FAQ' : 'नो-शेम इंटिमेसी FAQ',
      description: isEnglish ? 'Get honest answers to intimate questions without judgment' : 'बिना जजमेंट के अंतरंग सवालों के ईमानदार जवाब पाएं',
      icon: <HelpCircle />,
      to: '/intimacy-faq',
      isPremium: false,
      newFeature: true,
      category: 'education'
    },
    {
      title: isEnglish ? 'Family Q&A Simulator' : 'फैमिली Q&A सिमुलेटर',
      description: isEnglish ? 'Practice difficult conversations with family members' : 'परिवारजनों के साथ कठिन बातचीत का अभ्यास करें',
      icon: <Users />,
      to: '/family-qa-simulator',
      isPremium: false,
      newFeature: true,
      category: 'social'
    }
  ];

  const categories = [
    { id: 'all', name: isEnglish ? 'All Tools' : 'सभी टूल्स' },
    { id: 'messaging', name: isEnglish ? 'Messaging' : 'मैसेजिंग' },
    { id: 'relationship', name: isEnglish ? 'Relationship' : 'रिश्ते' },
    { id: 'dating', name: isEnglish ? 'Dating' : 'डेटिंग' },
    { id: 'intimacy', name: isEnglish ? 'Intimacy' : 'अंतरंगता' },
    { id: 'coaching', name: isEnglish ? 'Coaching' : 'कोचिंग' },
    { id: 'fun', name: isEnglish ? 'Fun & Games' : 'मनोरंजन' },
    { id: 'healing', name: isEnglish ? 'Healing' : 'उपचार' },
    { id: 'analysis', name: isEnglish ? 'Analysis' : 'विश्लेषण' },
    { id: 'education', name: isEnglish ? 'Education' : 'शिक्षा' },
    { id: 'social', name: isEnglish ? 'Social' : 'सामाजिक' }
  ];

  const filteredFeatures = useMemo(() => {
    return features.filter(feature => {
      const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           feature.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, features]);

  const featuredFeatures = features.filter(f => f.featured);

  return (
    <Layout>
      <div className="w-full min-h-screen">
        {/* Hero Section - Full Width */}
        <div className="w-full px-4 text-center mb-16">
          <h1 className="text-5xl md:text-6xl text-[#e839d6] font-love mb-6 leading-tight">
            {isEnglish ? 'AI-Powered Love & Romance Tools' : 'एआई-पावर्ड लव और रोमांस टूल्स'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            {isEnglish 
              ? 'Enhance your romantic life with our comprehensive suite of AI-powered relationship tools. From flirting to deep connections, we\'ve got you covered.' 
              : 'एआई-संचालित संबंध उपकरणों के हमारे व्यापक सूट के साथ अपने रोमांटिक जीवन को बढ़ाएं। फ्लर्टिंग से लेकर गहरे कनेक्शन तक, हमारे पास आपके लिए सब कुछ है।'
            }
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50k+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% Private</span>
            </div>
          </div>
        </div>

        {/* Featured Tools - Full Width */}
        {featuredFeatures.length > 0 && (
          <div className="w-full px-4 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gradient">
              {isEnglish ? 'Featured Tools' : 'फीचर्ड टूल्स'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-7xl mx-auto">
              {featuredFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  {...feature}
                  className="feature-card-hover transform transition-all duration-300 hover:scale-105"
                />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter Section - Full Width */}
        <div className="w-full px-4 mb-12">
          <div className="max-w-7xl mx-auto">
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
        
        {/* All Tools Grid - Full Width */}
        <div className="w-full px-4 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient">
            {isEnglish ? 'All Tools' : 'सभी टूल्स'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 max-w-none mx-auto">
            {filteredFeatures.map((feature, index) => (
              <FeatureCard 
                key={index} 
                {...feature}
                className="feature-card-hover"
              />
            ))}
          </div>
          
          {filteredFeatures.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {isEnglish ? 'No tools found matching your search.' : 'आपकी खोज के अनुरूप कोई टूल नहीं मिला।'}
              </p>
            </div>
          )}
        </div>

        {/* Testimonials Section - Full Width */}
        <div className="w-full px-4">
          <TestimonialsSection />
        </div>

        {/* FAQ Section - Full Width */}
        <div className="w-full px-4">
          <FAQSection />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
