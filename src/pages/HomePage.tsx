import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, MessageCircleHeart, Calculator, CalendarHeart, Gift } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HomePage = () => {
  const { language } = useLanguage();
  
  const tools = [
    {
      title: language === 'en' ? "Couple's Quiz Show" : "कपल्स क्विज शो",
      description: language === 'en' 
        ? "Test your connection and learn about each other in a fun way" 
        : "मज़ेदार तरीके से अपने कनेक्शन का परीक्षण करें और एक-दूसरे के बारे में जानें",
      icon: "🎮",
      link: "/couples-quiz"
    },
    {
      title: language === 'en' ? "Love Language Decoder" : "प्रेम भाषा डिकोडर",
      description: language === 'en' 
        ? "Discover how you and your partner express and receive love" 
        : "जानें कि आप और आपका पार्टनर प्यार कैसे व्यक्त करते और प्राप्त करते हैं",
      icon: "💝",
      link: "/love-language-decoder"
    },
    {
      title: language === 'en' ? "Argument Mediator AI" : "तर्क मध्यस्थ AI",
      description: language === 'en' 
        ? "De-escalate conflicts and find solutions for relationship issues" 
        : "संघर्षों को कम करें और रिश्तों की समस्याओं के लिए समाधान खोजें",
      icon: "🤝",
      link: "/argument-mediator"
    },
    {
      title: language === 'en' ? "Confession Letter Generator" : "इकबाल पत्र जनरेटर",
      description: language === 'en' 
        ? "Craft the perfect message to express your feelings" 
        : "अपनी भावनाओं को व्यक्त करने के लिए एकदम सही संदेश तैयार करें",
      icon: "💌",
      link: "/confession-letter"
    },
    {
      title: language === 'en' ? "Love Note Generator" : "प्रेम पत्र जनरेटर",
      description: language === 'en' 
        ? "Create heartfelt messages for your special someone" 
        : "अपने विशेष व्यक्ति के लिए दिल से निकले संदेश बनाएँ",
      icon: "❤️",
      link: "/love-note-generator"
    },
    {
      title: language === 'en' ? "Voice Message Mood Detector" : "वॉइस मैसेज मूड डिटेक्टर",
      description: language === 'en' 
        ? "Decode the hidden emotions in voice messages" 
        : "वॉइस मैसेज में छिपी भावनाओं को डीकोड करें",
      icon: "🎙️",
      link: "/voice-message-mood"
    },
    {
      title: language === 'en' ? "Anniversary Ideas" : "सालगिरह के आइडियाज़",
      description: language === 'en' 
        ? "Get creative ideas to celebrate your relationship milestones" 
        : "अपने रिश्ते के माइलस्टोन्स को सेलिब्रेट करने के लिए क्रिएटिव आइडियाज़ पाएं",
      icon: "🎁",
      link: "/anniversary-ideas"
    },
    {
      title: language === 'en' ? "First Date Ideas" : "पहली डेट के आइडियाज़",
      description: language === 'en' 
        ? "Plan the perfect first date with personalized suggestions" 
        : "पर्सनलाइज़्ड सुझावों के साथ परफेक्ट पहली डेट की योजना बनाएं",
      icon: "💕",
      link: "/first-date-ideas"
    },
    {
      title: language === 'en' ? "Relationship Chat" : "रिलेशनशिप चैट",
      description: language === 'en' 
        ? "Get advice for your relationship questions" 
        : "अपने रिश्ते के सवालों के लिए सलाह पाएं",
      icon: "💬",
      link: "/erotic-chat"
    },
    {
      title: language === 'en' ? "Love Messages" : "प्रेम संदेश",
      description: language === 'en' 
        ? "Create sweet messages for your partner" 
        : "अपने पार्टनर के लिए मीठे संदेश बनाएं",
      icon: "📱",
      link: "/sexting-generator"
    },
    {
      title: language === 'en' ? "Creator Calculator" : "क्रिएटर कैलकुलेटर",
      description: language === 'en' 
        ? "Calculate potential income from content" 
        : "कंटेंट से होने वाली संभावित आय की गणना करें",
      icon: "💰",
      link: "/income-calculator"
    },
    {
      title: language === 'en' ? "Talk Ideas" : "बातचीत के आइडियाज़",
      description: language === 'en' 
        ? "Spice up your conversations with creative suggestions" 
        : "क्रिएटिव सुझावों के साथ अपनी बातचीत को रोचक बनाएं",
      icon: "🗣️",
      link: "/dirty-talk-ideas"
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 relative">
        <div className="absolute top-10 left-10 opacity-30 animate-floating">
          <span className="text-4xl">💕</span>
        </div>
        <div className="absolute top-20 right-20 opacity-20 animate-floating" style={{animationDelay: "1s"}}>
          <span className="text-3xl">💘</span>
        </div>
        <div className="absolute bottom-10 left-1/4 opacity-30 animate-floating" style={{animationDelay: "2s"}}>
          <span className="text-4xl">💖</span>
        </div>
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl mb-6 text-gradient leading-tight font-love">
            {language === 'en' 
              ? "Celebrate Your Relationship" 
              : "अपने रिश्ते का जश्न मनाएं"}
          </h1>
          <p className="text-lg md:text-xl text-naughty-pink mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Tools for couples to connect, celebrate milestones, and strengthen their bond ✨"
              : "जोड़ों के लिए टूल्स जो कनेक्ट करने, माइलस्टोन्स सेलिब्रेट करने और अपने बॉन्ड को मजबूत बनाने में मदद करते हैं ✨"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="romantic-button group">
              <Link to="/first-date-ideas">
                {language === 'en' ? "Plan Your Date" : "अपनी डेट की योजना बनाएं"}
                <Gift size={16} className="ml-2 group-hover:animate-heart-beat" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-naughty-purple text-naughty-pink hover:bg-naughty-purple/10">
              <Link to="/couples-quiz">
                {language === 'en' ? "Take Relationship Quiz" : "रिलेशनशिप क्विज लें"}
                <Heart size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black/10 rounded-3xl my-12">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center mb-6 text-gradient font-love">
            {language === 'en' ? "Our Tools" : "हमारे टूल्स"}
          </h2>
          <p className="text-center text-naughty-pink/80 mb-12 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Everything you need to keep your relationship fresh and special 💘"
              : "अपने रिश्ते को ताज़ा और विशेष रखने के लिए सब कुछ 💘"}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <Link key={index} to={tool.link} className="romantic-card p-6 feature-card-hover h-full flex flex-col no-underline">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">{tool.icon}</span>
                </div>
                <h3 className="text-xl mb-3 text-white text-center">{tool.title}</h3>
                <p className="text-naughty-pink/80 mb-4 text-center">
                  {tool.description}
                </p>
                <div className="flex justify-center mt-auto">
                  <span className="text-naughty-purple hover:text-naughty-pink hover:bg-white/5 flex items-center gap-2 transition-colors">
                    {language === 'en' ? "Try Now" : "अभी आज़माएं"}
                    <Heart size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Premium Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-naughty-purpleDark to-naughty-purple rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-love mb-4 text-white">
                  {language === 'en' ? "Upgrade to Premium 💎" : "प्रीमियम में अपग्रेड करें 💎"}
                </h2>
                <p className="text-naughty-pink/90 mb-6">
                  {language === 'en' 
                    ? "Get more relationship tools and features" 
                    : "अधिक रिलेशनशिप टूल्स और फीचर्स पाएं"}
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-white">
                    <span className="mr-2">💖</span> 
                    {language === 'en' ? "Unlimited anniversary ideas" : "असीमित सालगिरह के आइडियाज़"}
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">💝</span> 
                    {language === 'en' ? "Voice messages" : "वॉइस मैसेज"}
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">💌</span> 
                    {language === 'en' ? "Create romantic images" : "रोमांटिक इमेज बनाएं"}
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">💞</span> 
                    {language === 'en' ? "Save your chats" : "अपनी चैट्स सहेजें"}
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">✨</span> 
                    {language === 'en' ? "No ads" : "कोई विज्ञापन नहीं"}
                  </li>
                </ul>
                <Button size="lg" className="bg-white text-naughty-purple hover:bg-white/90">
                  {language === 'en' ? "Upgrade Now" : "अभी अपग्रेड करें"} <Heart size={16} className="ml-2" />
                </Button>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="bg-white/10 p-6 rounded-full h-48 w-48 flex items-center justify-center relative">
                  <span className="text-6xl animate-heart-beat">❤️</span>
                  <span className="absolute -top-6 -right-2 text-3xl animate-floating">💕</span>
                  <span className="absolute -bottom-2 -left-4 text-2xl animate-floating" style={{animationDelay: "1.5s"}}>💘</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-love text-center mb-12 text-gradient">
            {language === 'en' ? "Common Questions" : "आम सवाल"}
          </h2>
          
          <div className="space-y-6">
            <div className="romantic-card p-6">
              <h3 className="text-xl mb-2 text-white">
                {language === 'en' ? "Is it free to use? 💭" : "क्या इसका उपयोग करना मुफ़्त है? 💭"}
              </h3>
              <p className="text-naughty-pink/80">
                {language === 'en'
                  ? "Yes! Basic features are free. Premium features need a subscription."
                  : "हां! बेसिक फीचर्स फ्री हैं। प्रीमियम फीचर्स के लिए सब्सक्रिप्शन की जरूरत है।"}
              </p>
            </div>
            
            <div className="romantic-card p-6">
              <h3 className="text-xl mb-2 text-white">
                {language === 'en' ? "Is my data private and secure? 🔒" : "क्या मेरा डेटा प्राइवेट और सुरक्षित है? 🔒"}
              </h3>
              <p className="text-naughty-pink/80">
                {language === 'en'
                  ? "Yes. We keep your chats private. We don't share your personal messages."
                  : "हां। हम आपकी चैट्स को प्राइवेट रखते हैं। हम आपके निजी संदेशों को शेयर नहीं करते।"}
              </p>
            </div>
            
            <div className="romantic-card p-6">
              <h3 className="text-xl mb-2 text-white">
                {language === 'en' ? "How do I plan a great first date? 💑" : "मैं एक बेहतरीन पहली डेट की योजना कैसे बनाऊं? 💑"}
              </h3>
              <p className="text-naughty-pink/80">
                {language === 'en'
                  ? "Use our First Date Ideas tool with filters for interests, budget, and personality type to get personalized suggestions that will make your first date special."
                  : "अपनी पहली डेट को खास बनाने के लिए हमारे फर्स्ट डेट आइडियाज़ टूल का उपयोग करें, जिसमें रुचियों, बजट और व्यक्तित्व प्रकार के लिए फिल्टर हैं।"}
              </p>
            </div>
            
            <div className="romantic-card p-6">
              <h3 className="text-xl mb-2 text-white">
                {language === 'en' ? "How do I cancel? 💫" : "मैं कैसे कैंसिल करूं? 💫"}
              </h3>
              <p className="text-naughty-pink/80">
                {language === 'en'
                  ? "Cancel anytime in your account settings. You'll keep premium until your billing period ends."
                  : "अपने अकाउंट सेटिंग्स में कभी भी कैंसिल करें। बिलिंग अवधि समाप्त होने तक आपके पास प्रीमियम रहेगा।"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute left-4 top-10 opacity-20 animate-floating" style={{animationDelay: "0.5s"}}>
          <span className="text-5xl">💕</span>
        </div>
        <div className="absolute right-10 bottom-10 opacity-30 animate-floating" style={{animationDelay: "1.2s"}}>
          <span className="text-4xl">💓</span>
        </div>
      
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-love mb-6 text-gradient">
            {language === 'en' ? "Start Your Journey ✨" : "अपनी यात्रा शुरू करें ✨"}
          </h2>
          <p className="text-lg text-naughty-pink/80 mb-8">
            {language === 'en'
              ? "Begin today and make your relationship even more special"
              : "आज ही शुरू करें और अपने रिश्ते को और भी खास बनाएं"}
          </p>
          <Button asChild size="lg" className="romantic-button group">
            <Link to="/couples-quiz">
              {language === 'en' ? "Try It Free" : "फ्री में आज़माएं"} <Heart size={16} className="ml-2 group-hover:animate-heart-beat" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
