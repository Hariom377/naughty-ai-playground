
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
        {/* Romantic Hero Section with Beach Couple Background */}
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Blur Effect */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/lovable-uploads/8c9bb8f5-6c3a-4c6f-8eb8-50306bd08c51.png')`,
              filter: 'blur(2px)',
              transform: 'scale(1.1)',
            }}
          />
          
          {/* Gradient Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/60 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-purple-900/40" />
          
          {/* Hero Content */}
          <div className="relative z-10 w-full px-4 text-center">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-6xl md:text-8xl text-white font-love mb-8 leading-tight drop-shadow-2xl">
                {isEnglish ? 'Find Your Perfect Love Story' : 'अपनी परफेक्ट लव स्टोरी खोजें'}
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-lg font-light">
                {isEnglish 
                  ? 'AI-powered tools to enhance every moment of your romantic journey. From first conversations to lasting connections.' 
                  : 'आपकी रोमांटिक यात्रा के हर पल को बेहतर बनाने के लिए एआई-पावर्ड टूल्स। पहली बातचीत से लेकर स्थायी कनेक्शन तक।'
                }
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  {isEnglish ? 'Start Your Journey' : 'अपनी यात्रा शुरू करें'}
                </button>
                <button className="border-2 border-white/50 text-white hover:bg-white/10 px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 backdrop-blur-sm">
                  {isEnglish ? 'Explore Tools' : 'टूल्स एक्सप्लोर करें'}
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-16 text-white/80">
                <div className="flex items-center gap-3 backdrop-blur-sm bg-white/10 px-6 py-3 rounded-full">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg">4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-3 backdrop-blur-sm bg-white/10 px-6 py-3 rounded-full">
                  <Users className="w-5 h-5" />
                  <span className="text-lg">50k+ Users</span>
                </div>
                <div className="flex items-center gap-3 backdrop-blur-sm bg-white/10 px-6 py-3 rounded-full">
                  <Shield className="w-5 h-5" />
                  <span className="text-lg">100% Private</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Hearts Animation */}
          <div className="absolute inset-0 pointer-events-none">
            <Heart className="absolute top-1/4 left-1/4 w-6 h-6 text-pink-300/30 animate-floating" style={{ animationDelay: '0s' }} />
            <Heart className="absolute top-1/3 right-1/4 w-4 h-4 text-purple-300/30 animate-floating" style={{ animationDelay: '2s' }} />
            <Heart className="absolute bottom-1/3 left-1/3 w-5 h-5 text-pink-300/30 animate-floating" style={{ animationDelay: '4s' }} />
            <Heart className="absolute bottom-1/4 right-1/3 w-6 h-6 text-purple-300/30 animate-floating" style={{ animationDelay: '6s' }} />
          </div>
        </div>

        {/* Featured Tools - Full Width */}
        {featuredFeatures.length > 0 && (
          <div className="w-full px-4 py-16 bg-gradient-to-b from-black to-gray-900">
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
              {isEnglish ? 'Featured Tools' : 'फीचर्ड टूल्स'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
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
        <div className="w-full px-4 py-12 bg-gray-900">
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        
        {/* All Tools Grid - Full Width */}
        <div className="w-full px-4 py-16 bg-gradient-to-b from-gray-900 to-black">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
            {isEnglish ? 'All Tools' : 'सभी टूल्स'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
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
        <div className="w-full px-4 bg-gray-900">
          <TestimonialsSection />
        </div>

        {/* FAQ Section - Full Width */}
        <div className="w-full px-4 bg-black">
          <FAQSection />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
