import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import FeatureCard from '@/components/tools/FeatureCard';
import SearchAndFilter from '@/components/tools/SearchAndFilter';
import ToolPreviewModal from '@/components/tools/ToolPreviewModal';
import FAQSection from '@/components/sections/FAQSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { 
  Search, MessageSquare, Heart, Users, Sparkles, 
  Send, Gift, X, Clock, Brain, HeartHandshake, PenTool,
  Zap, Shield, Eye, Volume2, Calculator, GamepadIcon,
  Mic, HelpCircle, Languages, Smile, Lightbulb, FileText,
  ShieldCheck, MessageCircle
} from 'lucide-react';

const HomePage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const isEnglish = language === 'en';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewTool, setPreviewTool] = useState<any>(null);
  
  const features = [
    {
      title: isEnglish ? 'Sexting Generator' : 'सेक्सटिंग जनरेटर',
      description: isEnglish ? 'Create romantic messages with customizable tone and style' : 'अनुकूलन योग्य टोन के साथ रोमांटिक संदेश बनाएं',
      icon: <Send />,
      to: '/sexting-generator',
      isPremium: false,
      category: 'messaging',
      preview: isEnglish ? 'Generate personalized romantic messages instantly' : 'तुरंत व्यक्तिगत रोमांटिक संदेश उत्पन्न करें'
    },
    {
      title: isEnglish ? 'Dirty Talk Ideas' : 'डर्टी टॉक आइडियास',
      description: isEnglish ? 'Explore exciting phrases for intimate moments with confidence' : 'अंतरंग पलों के लिए रोमांचक वाक्यांश',
      icon: <MessageSquare />,
      to: '/dirty-talk-ideas',
      isPremium: true,
      category: 'intimacy',
      preview: isEnglish ? 'Discover conversation starters for intimate moments' : 'अंतरंग पलों के लिए बातचीत शुरू करने वाले खोजें'
    },
    {
      title: isEnglish ? 'Erotic Chat' : 'इरोटिक चैट',
      description: isEnglish ? 'Practice intimate conversations with AI companion' : 'AI साथी के साथ अंतरंग बातचीत का अभ्यास करें',
      icon: <Heart />,
      to: '/erotic-chat',
      isPremium: true
    },
    {
      title: isEnglish ? 'Interest Overlap Finder' : 'इंटरेस्ट ओवरलैप फाइंडर',
      description: isEnglish ? 'Discover shared passions and hidden connections' : 'साझा जुनून और छिपे कनेक्शन खोजें',
      icon: <Search />,
      to: '/interest-overlap-finder',
      isPremium: false,
      newFeature: true
    },
    {
      title: isEnglish ? 'Text CPR' : 'टेक्स्ट सीपीआर',
      description: isEnglish ? 'Resuscitate dying conversations with witty rewrites' : 'चतुर पुनर्लेखन के साथ मरती बातचीत को पुनर्जीवित करें',
      icon: <Sparkles />,
      to: '/text-cpr',
      isPremium: false,
      newFeature: true
    },
    {
      title: isEnglish ? 'Flirt Coach' : 'फ्लर्ट कोच',
      description: isEnglish ? 'Master the art of flirting with personalized guidance' : 'वैयक्तिकृत मार्गदर्शन के साथ फ्लर्टिंग की कला में महारत हासिल करें',
      icon: <Heart />,
      to: '/flirt-coach',
      isPremium: false,
      newFeature: true
    },
    {
      title: isEnglish ? 'Social Spy' : 'सोशल स्पाई',
      description: isEnglish ? 'Ace meet-the-friends scenarios with insider knowledge' : 'अंदरूनी जानकारी के साथ दोस्तों से मिलने के परिदृश्य में उत्कृष्टता प्राप्त करें',
      icon: <Users />,
      to: '/social-spy',
      isPremium: true,
      newFeature: true
    },
    {
      title: isEnglish ? 'Fight Moderator' : 'फाइट मॉडरेटर',
      description: isEnglish ? 'De-escalate conflicts with real-time message analysis' : 'वास्तविक समय संदेश विश्लेषण के साथ संघर्षों को कम करें',
      icon: <HeartHandshake />,
      to: '/fight-moderator',
      isPremium: true,
      newFeature: true
    },
    {
      title: isEnglish ? 'Anniversary Ideas' : 'वर्षगांठ विचार',
      description: isEnglish ? 'Generate creative anniversary celebration concepts' : 'रचनात्मक वर्षगांठ उत्सव अवधारणाएँ उत्पन्न करें',
      icon: <Gift />,
      to: '/anniversary-ideas',
      isPremium: false
    },
    {
      title: isEnglish ? 'First Date Ideas' : 'पहली डेट आइडियास',
      description: isEnglish ? 'Find the perfect activities for a memorable first date' : 'एक यादगार पहली डेट के लिए बिल्कुल सही गतिविधियां',
      icon: <Sparkles />,
      to: '/first-date-ideas',
      isPremium: false
    },
    {
      title: isEnglish ? 'Random Adventure Wheel' : 'रैंडम एडवेंचर व्हील',
      description: isEnglish ? 'Spin for surprising adventures to break your routine' : 'अपनी दिनचर्या तोड़ने के लिए आश्चर्यजनक साहसिक कार्यों के लिए स्पिन करें',
      icon: <GamepadIcon />,
      to: '/random-adventure-wheel',
      isPremium: false,
      newFeature: true
    },
    {
      title: isEnglish ? 'Love Language' : 'लव लैंग्वेज',
      description: isEnglish ? 'Decode and understand your partner\'s love language' : 'अपने साथी की प्रेम भाषा को समझें',
      icon: <Brain />,
      to: '/love-language-decoder',
      isPremium: false
    },
    {
      title: isEnglish ? 'Love Note Generator' : 'लव नोट जनरेटर',
      description: isEnglish ? 'Create heartfelt love notes and romantic messages' : 'दिल से लव नोट्स और रोमांटिक मैसेज बनाएं',
      icon: <PenTool />,
      to: '/love-note-generator',
      isPremium: false
    },
    {
      title: isEnglish ? 'Confession Letter' : 'कनफेशन लेटर',
      description: isEnglish ? 'Craft the perfect letter to express your feelings' : 'अपनी भावनाओं को व्यक्त करने के लिए एकदम सही पत्र',
      icon: <PenTool />,
      to: '/confession-letter',
      isPremium: true
    },
    {
      title: isEnglish ? 'Ex Detox' : 'एक्स डिटॉक्स',
      description: isEnglish ? 'Overcome jealousy and comparisons to exes' : 'पूर्व प्रेमियों से ईर्ष्या और तुलना पर काबू पाएं',
      icon: <X />,
      to: '/ex-detox',
      isPremium: true,
      newFeature: true
    }
  ];

  const categories = [
    { id: 'all', name: isEnglish ? 'All Tools' : 'सभी टूल्स' },
    { id: 'messaging', name: isEnglish ? 'Messaging' : 'मैसेजिंग' },
    { id: 'intimacy', name: isEnglish ? 'Intimacy' : 'अंतरंगता' },
    { id: 'relationship', name: isEnglish ? 'Relationship' : 'रिश्ता' },
    { id: 'dating', name: isEnglish ? 'Dating' : 'डेटिंग' }
  ];

  const filteredFeatures = useMemo(() => {
    return features.filter(feature => {
      const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feature.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, features]);

  return (
    <Layout>
      <div className="w-full">
        {/* Romantic Hero Section with Beach Couple Image */}
        <div className="relative min-h-screen w-full overflow-hidden">
          {/* Background Image with Blur Effect */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/lovable-uploads/9b775343-80b9-4cf7-84a7-b6f460af0eb6.png')`,
              filter: 'blur(1px)',
              transform: 'scale(1.1)'
            }}
          />
          
          {/* Gradient Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-naughty-dark/80 via-naughty-purple/60 to-naughty-dark/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-naughty-dark/90" />
          
          {/* Floating Hearts Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="floating-hearts absolute top-1/4 left-1/4 text-naughty-pink/30 text-2xl">💕</div>
            <div className="floating-hearts absolute top-1/3 right-1/4 text-naughty-pink/20 text-lg animate-[floating_4s_ease-in-out_infinite_1s]">💖</div>
            <div className="floating-hearts absolute top-1/2 left-1/6 text-naughty-pink/25 text-xl animate-[floating_5s_ease-in-out_infinite_2s]">✨</div>
            <div className="floating-hearts absolute bottom-1/3 right-1/6 text-naughty-pink/30 text-lg animate-[floating_3s_ease-in-out_infinite_0.5s]">💫</div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
            <header className="text-center max-w-6xl mx-auto">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 romantic-title leading-tight">
                {isEnglish ? 'AI-Powered Love & Intimacy Tools' : 'एआई-पावर्ड लव टूल्स'}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 leading-relaxed font-light">
                {isEnglish 
                  ? 'Enhance your romantic life with our comprehensive suite of 20+ AI-powered relationship tools. From intimate conversations to relationship building - all in a safe, private environment.' 
                  : 'एआई-संचालित संबंध उपकरणों के हमारे व्यापक सूट के साथ अपने रोमांटिक जीवन को बढ़ाएं'}
              </p>
              <div className="flex flex-wrap gap-6 justify-center mb-12">
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-lg text-white font-medium">✨ {isEnglish ? '20+ AI Tools' : '20+ एआई टूल्स'}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-lg text-white font-medium">🔒 {isEnglish ? 'Private & Secure' : 'निजी और सुरक्षित'}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-lg text-white font-medium">🚀 {isEnglish ? 'Instant Results' : 'तत्काल परिणाम'}</span>
                </div>
              </div>
              <div className="beating-heart text-6xl mb-8">💕</div>
            </header>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="w-full bg-naughty-dark/95 backdrop-blur-sm">
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </div>
        
        {/* Tools Grid */}
        <section className="w-full bg-naughty-dark px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {filteredFeatures.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                to={feature.to}
                isPremium={feature.isPremium}
                newFeature={feature.newFeature}
                onPreview={() => setPreviewTool(feature)}
                className={index % 4 === 0 ? 'md:col-span-2' : ''}
              />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Tool Preview Modal */}
        <ToolPreviewModal 
          tool={previewTool}
          isOpen={!!previewTool}
          onClose={() => setPreviewTool(null)}
        />
      </div>
    </Layout>
  );
};

export default HomePage;
