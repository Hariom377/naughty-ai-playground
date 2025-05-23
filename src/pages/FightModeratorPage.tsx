import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { Textarea } from '@/components/ui/textarea';
import { generateWithGemini } from '@/utils/geminiApi';
import { toast } from 'sonner';
import { 
  AlertTriangle, RefreshCw, ArrowRight, Copy, ThumbsUp, 
  ThumbsDown, Clock, HeartHandshake 
} from 'lucide-react';

const FightModeratorPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const isEnglish = language === 'en';
  
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toxicityScore, setToxicityScore] = useState<number | null>(null);
  const [improvedMessage, setImprovedMessage] = useState('');
  const [toxicElements, setToxicElements] = useState<string[]>([]);
  const [repairScript, setRepairScript] = useState('');
  const [timeout, setTimeout] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(isEnglish ? 'Copied to clipboard!' : 'क्लिपबोर्ड पर कॉपी किया गया!');
  };
  
  const analyzeMessage = async () => {
    if (!message.trim()) {
      toast.error(isEnglish ? 'Please enter a message' : 'कृपया एक संदेश दर्ज करें');
      return;
    }
    
    setIsAnalyzing(true);
    setToxicityScore(null);
    setImprovedMessage('');
    setToxicElements([]);
    setRepairScript('');
    setTimeout('');
    
    try {
      // Analyze message using Gemini
      const prompt = `Analyze this message that was sent during an argument or conflict:
"${message}"

Provide a comprehensive analysis with the following:
1. A toxicity score from 0-100
2. A list of specific elements that make it toxic or unhelpful (absolutes, sarcasm, accusations, etc.)
3. A rewritten version that conveys the same concern but in a more constructive way
4. A recommended timeout duration if needed (in minutes)
5. A brief repair script to use after the argument to reconnect

Return the analysis in JSON format with these fields: toxicityScore, toxicElements (array), improvedMessage, timeout, repairScript.`;

      const response = await generateWithGemini({
        prompt,
        temperature: 0.7,
      });
      
      try {
        // Try to parse JSON response
        const parsedResponse = JSON.parse(response);
        setToxicityScore(parsedResponse.toxicityScore);
        setToxicElements(parsedResponse.toxicElements || []);
        setImprovedMessage(parsedResponse.improvedMessage || '');
        setTimeout(parsedResponse.timeout || '');
        setRepairScript(parsedResponse.repairScript || '');
      } catch (error) {
        console.error("Error parsing JSON response:", error);
        
        // Try to extract information from text response
        const scoreMatch = response.match(/toxicity score:?\s*(\d+)/i);
        if (scoreMatch) setToxicityScore(parseInt(scoreMatch[1]));
        
        const improvedMatch = response.match(/improved message:?\s*(.*?)(?=toxic elements:|timeout:|repair script:|$)/is);
        if (improvedMatch) setImprovedMessage(improvedMatch[1].trim());
        
        const toxicMatch = response.match(/toxic elements:?\s*(.*?)(?=improved message:|timeout:|repair script:|$)/is);
        if (toxicMatch) {
          const elements = toxicMatch[1].split(/[\n•-]+/).map(item => item.trim()).filter(Boolean);
          setToxicElements(elements);
        }
        
        const timeoutMatch = response.match(/timeout:?\s*(\d+)/i);
        if (timeoutMatch) setTimeout(`${timeoutMatch[1]} minutes`);
        
        const repairMatch = response.match(/repair script:?\s*(.*?)(?=$)/is);
        if (repairMatch) setRepairScript(repairMatch[1].trim());
      }
      
      // Scroll to results
      globalThis.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (error) {
      console.error("Error analyzing message:", error);
      toast.error(isEnglish ? 'Error analyzing message' : 'संदेश विश्लेषण में त्रुटि');
      
      // Fallback for demo
      setToxicityScore(75);
      setToxicElements([
        "Using absolute language ('always', 'never')",
        "Accusatory tone",
        "Sarcasm that diminishes partner's feelings"
      ]);
      setImprovedMessage("I feel frustrated when plans change at the last minute without discussion. It's important to me that we communicate about schedule changes. Could we agree to give each other a heads-up for future plan adjustments?");
      setTimeout("15 minutes");
      setRepairScript("I want to apologize for how I communicated earlier. I was feeling frustrated, but I didn't express it well. I care about our relationship and would like to talk calmly about what happened.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getToxicityColor = () => {
    if (toxicityScore === null) return 'bg-gray-500';
    if (toxicityScore < 30) return 'bg-green-500';
    if (toxicityScore < 60) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  const commonMessages = [
    "You ALWAYS do this! You NEVER think about how your actions affect me!",
    "Fine. Whatever. Do what you want. You will anyway.",
    "If you actually cared about me, you wouldn't have forgotten.",
    "I can't believe I'm stuck with someone so selfish."
  ];
  
  const useCommonMessage = (msg: string) => {
    setMessage(msg);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            {isEnglish ? 'Fight Moderator' : 'फाइट मॉडरेटर'}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {isEnglish 
              ? 'De-escalate conflicts with real-time message analysis' 
              : 'रीयल-टाइम मैसेज एनालिसिस के साथ कॉन्फ्लिक्ट्स को कम करें'}
          </p>
        </div>
        
        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Test your message' : 'अपने मैसेज का परीक्षण करें'}
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="conflict-message" className="text-white mb-2 block">
                {isEnglish ? 'Enter a message you\'re considering sending' : 'एक संदेश दर्ज करें जिसे आप भेजने पर विचार कर रहे हैं'}
              </Label>
              <Textarea
                id="conflict-message"
                placeholder={isEnglish ? "Type your message here..." : "अपना संदेश यहां टाइप करें..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="romantic-input min-h-[100px]"
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-300 mb-2">
                {isEnglish ? 'Or try one of these common conflict messages:' : 'या इनमें से एक आम कॉन्फ्लिक्ट मैसेज आज़माएं:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {commonMessages.map((msg, index) => (
                  <button 
                    key={index}
                    className="text-left bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => useCommonMessage(msg)}
                  >
                    <p className="text-sm">{msg}</p>
                  </button>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={analyzeMessage} 
              className="w-full md:w-auto romantic-button"
              disabled={isAnalyzing || !message.trim()}
            >
              {isAnalyzing 
                ? (isEnglish ? 'Analyzing message...' : 'संदेश का विश्लेषण कर रहे हैं...') 
                : (isEnglish ? 'Analyze Message' : 'संदेश का विश्लेषण करें')}
            </Button>
          </div>
        </div>
        
        {toxicityScore !== null && (
          <div ref={resultRef} className="animate-fade-in space-y-8">
            <Card className="bg-white/5 border-naughty-pink/20 overflow-hidden">
              <div className="h-2 w-full" style={{ backgroundColor: getToxicityColor() }}></div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{isEnglish ? 'Toxicity Analysis' : 'टॉक्सिसिटी एनालिसिस'}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getToxicityColor()} text-white`}>
                    {toxicityScore}/100
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-medium text-naughty-pink mb-3 flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    {isEnglish ? 'Problematic Elements Detected' : 'समस्यात्मक तत्व का पता चला'}
                  </h3>
                  <ul className="space-y-2">
                    {toxicElements.map((element, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>{element}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {timeout && (
                  <div className="mb-6 p-3 bg-black/20 rounded-lg flex items-center">
                    <Clock className="text-amber-500 mr-3 h-5 w-5 flex-shrink-0" />
                    <p>
                      {isEnglish 
                        ? `Recommended timeout before responding: ${timeout}` 
                        : `प्रतिक्रिया देने से पहले अनुशंसित टाइमआउट: ${timeout}`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-naughty-pink/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="mr-2 h-5 w-5 text-naughty-pink" />
                  {isEnglish ? 'Suggested Rewrite' : 'सुझाए गए पुनर्लेखन'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start mb-6">
                  <div className="flex-1 bg-white/10 p-3 rounded-lg">
                    <p className="mb-2 text-gray-400">{isEnglish ? 'Original:' : 'मूल:'}</p>
                    <p>{message}</p>
                  </div>
                  <ArrowRight className="mx-4 flex-shrink-0 text-naughty-pink" />
                  <div className="flex-1 bg-naughty-purple/20 p-3 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <p className="text-naughty-pink">{isEnglish ? 'Better alternative:' : 'बेहतर विकल्प:'}</p>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(improvedMessage)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p>{improvedMessage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-naughty-pink/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeartHandshake className="mr-2 h-5 w-5 text-naughty-pink" />
                  {isEnglish ? 'Repair Script' : 'रिपेयर स्क्रिप्ट'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white/10 p-4 rounded-lg mb-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-300">{isEnglish ? 'To use after the conflict:' : 'कॉन्फ्लिक्ट के बाद उपयोग करने के लिए:'}</p>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(repairScript)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="italic">{repairScript}</p>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button variant="ghost" size="sm">
                    <ThumbsDown className="mr-1 h-4 w-4" />
                    {isEnglish ? 'Not helpful' : 'सहायक नहीं'}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {isEnglish ? 'Helpful' : 'सहायक'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center gap-4 my-8">
              <Button variant="outline" onClick={() => analyzeMessage()}>
                {isEnglish ? 'Analyze Another Message' : 'एक और संदेश का विश्लेषण करें'}
              </Button>
              <Button variant="romantic">
                {isEnglish ? 'Track Conflict Patterns' : 'कॉन्फ्लिक्ट पैटर्न ट्रैक करें'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FightModeratorPage;
