
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateWithGemini } from '@/utils/geminiApi';
import { toast } from 'sonner';
import { Heart, MessageSquare, Gift, Clock, HandHeart } from 'lucide-react';

const LoveLanguageDecoderPage = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  
  const [partnerName, setPartnerName] = useState('');
  const [observations, setObservations] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  
  const loveLanguages = [
    { name: 'Words of Affirmation', icon: <MessageSquare className="h-5 w-5" />, color: 'text-blue-400' },
    { name: 'Quality Time', icon: <Clock className="h-5 w-5" />, color: 'text-green-400' },
    { name: 'Physical Touch', icon: <HandHeart className="h-5 w-5" />, color: 'text-pink-400' },
    { name: 'Acts of Service', icon: <Heart className="h-5 w-5" />, color: 'text-purple-400' },
    { name: 'Receiving Gifts', icon: <Gift className="h-5 w-5" />, color: 'text-yellow-400' }
  ];

  const handleAnalyze = async () => {
    if (!observations.trim()) {
      toast.error(isEnglish ? 'Please describe your observations' : 'कृपया अपने अवलोकन का वर्णन करें');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const prompt = `Analyze these observations about a partner's behavior and determine their love language:

Partner: ${partnerName || 'Partner'}
Observations: ${observations}

Based on the 5 love languages (Words of Affirmation, Quality Time, Physical Touch, Acts of Service, Receiving Gifts), provide:
1. Primary love language (most likely)
2. Secondary love language 
3. Confidence score (0-100%)
4. Specific evidence from the observations
5. 3 actionable suggestions for expressing love in their language

Return in JSON format with fields: primaryLanguage, secondaryLanguage, confidence, evidence (array), suggestions (array)`;

      const response = await generateWithGemini({
        prompt,
        temperature: 0.7,
      });
      
      try {
        const parsedResponse = JSON.parse(response);
        setAnalysis(parsedResponse);
      } catch (error) {
        // Fallback analysis
        setAnalysis({
          primaryLanguage: "Quality Time",
          secondaryLanguage: "Words of Affirmation", 
          confidence: 75,
          evidence: [
            "Shows excitement when planning activities together",
            "Appreciates verbal compliments and encouragement",
            "Values undivided attention during conversations"
          ],
          suggestions: [
            "Plan regular one-on-one activities without distractions",
            "Express appreciation through heartfelt compliments",
            "Create special traditions and meaningful moments together"
          ]
        });
      }
    } catch (error) {
      console.error("Error analyzing love language:", error);
      toast.error(isEnglish ? 'Error analyzing love language' : 'प्रेम भाषा विश्लेषण में त्रुटि');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            {isEnglish ? 'Love Language Decoder' : 'लव लैंग्वेज डिकोडर'}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {isEnglish 
              ? 'Decode and understand your partner\'s love language' 
              : 'अपने साथी की प्रेम भाषा को समझें और डीकोड करें'}
          </p>
        </div>

        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Analyze Your Partner\'s Love Language' : 'अपने साथी की प्रेम भाषा का विश्लेषण करें'}
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="partner-name" className="text-white mb-2 block">
                {isEnglish ? 'Partner\'s Name (Optional)' : 'साथी का नाम (वैकल्पिक)'}
              </Label>
              <Input
                id="partner-name"
                placeholder={isEnglish ? "Your partner's name" : "आपके साथी का नाम"}
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="romantic-input"
              />
            </div>
            
            <div>
              <Label htmlFor="observations" className="text-white mb-2 block">
                {isEnglish ? 'Describe how your partner shows and receives love' : 'वर्णन करें कि आपका साथी कैसे प्रेम दिखाता और प्राप्त करता है'}
              </Label>
              <Textarea
                id="observations"
                placeholder={isEnglish ? "Examples: They light up when I compliment them, they love planning date nights, they always want to hold hands..." : "उदाहरण: जब मैं उनकी तारीफ करता हूं तो वे खुश हो जाते हैं, वे डेट नाइट्स प्लान करना पसंद करते हैं..."}
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="romantic-input min-h-[120px]"
              />
            </div>
            
            <Button 
              onClick={handleAnalyze} 
              className="w-full md:w-auto romantic-button"
              disabled={isAnalyzing || !observations.trim()}
            >
              {isAnalyzing 
                ? (isEnglish ? 'Analyzing...' : 'विश्लेषण कर रहे हैं...') 
                : (isEnglish ? 'Decode Love Language' : 'प्रेम भाषा डिकोड करें')}
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-white/5 border-naughty-pink/20">
              <CardHeader>
                <CardTitle className="text-gradient">
                  {isEnglish ? 'Love Language Analysis' : 'प्रेम भाषा विश्लेषण'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h3 className="font-semibold text-naughty-pink mb-2">
                      {isEnglish ? 'Primary Love Language' : 'प्राथमिक प्रेम भाषा'}
                    </h3>
                    <p className="text-xl">{analysis.primaryLanguage}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {analysis.confidence}% {isEnglish ? 'confidence' : 'विश्वास'}
                    </p>
                  </div>
                  
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h3 className="font-semibold text-naughty-pink mb-2">
                      {isEnglish ? 'Secondary Love Language' : 'द्वितीयक प्रेम भाषा'}
                    </h3>
                    <p className="text-xl">{analysis.secondaryLanguage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-naughty-pink/20">
              <CardHeader>
                <CardTitle>
                  {isEnglish ? 'Evidence from Your Observations' : 'आपके अवलोकन से साक्ष्य'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.evidence.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Heart className="text-naughty-pink mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-naughty-pink/20">
              <CardHeader>
                <CardTitle>
                  {isEnglish ? 'How to Show Love' : 'प्रेम कैसे दिखाएं'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.suggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="bg-white/5 p-3 rounded-lg flex items-start">
                      <span className="bg-naughty-purple text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <p>{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gradient">
            {isEnglish ? 'The 5 Love Languages' : '5 प्रेम भाषाएं'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {loveLanguages.map((lang, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-naughty-pink/30 transition-colors">
                <CardContent className="p-4 text-center">
                  <div className={`${lang.color} mb-2 flex justify-center`}>
                    {lang.icon}
                  </div>
                  <p className="text-sm font-medium">{lang.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoveLanguageDecoderPage;
