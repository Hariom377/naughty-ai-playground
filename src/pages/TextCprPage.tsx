
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { Textarea } from '@/components/ui/textarea';
import { generateWithGemini } from '@/utils/geminiApi';
import { toast } from 'sonner';
import { Check, Copy, MessageSquare, Smile, Clock } from 'lucide-react';

const TextCprPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const isEnglish = language === 'en';
  
  const [originalText, setOriginalText] = useState('');
  const [improvedText, setImprovedText] = useState('');
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  
  const examples = [
    { original: "Nice", improved: "Nice... like 'nice butt' nice? 😏" },
    { original: "How was your day?", improved: "Tell me about your day! Did that crazy coworker of yours try to steal your lunch again? 😂" },
    { original: "Want to hang out?", improved: "I've got two tickets to that comedy show you mentioned last week. Up for some laughs tomorrow night? 🎭" }
  ];
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(isEnglish ? 'Copied to clipboard!' : 'क्लिपबोर्ड पर कॉपी किया गया!');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!originalText.trim()) {
      toast.error(isEnglish ? 'Please enter a text message' : 'कृपया एक टेक्स्ट मैसेज दर्ज करें');
      return;
    }
    
    setIsLoading(true);
    setSentiment(null);
    setImprovedText('');
    
    try {
      const prompt = `Transform this bland text message into an engaging, witty, and interesting one. Add personality, humor where appropriate, and make it conversation-starting. Keep it authentic and not cringy.

Original message: "${originalText}"

Also provide a brief sentiment analysis of the original message.

Return in this format:
IMPROVED: [the improved message with emojis if appropriate]
SENTIMENT: [brief analysis of the original message]`;

      const response = await generateWithGemini({
        prompt,
        temperature: 0.8,
      });
      
      console.log('Gemini response:', response);
      
      // Parse the response
      const improvedMatch = response.match(/IMPROVED:\s*(.*?)(?=SENTIMENT:|$)/s);
      const sentimentMatch = response.match(/SENTIMENT:\s*(.*?)$/s);
      
      if (improvedMatch) {
        setImprovedText(improvedMatch[1].trim());
      } else {
        // Fallback: use the entire response as improved text
        setImprovedText(response.trim());
      }
      
      if (sentimentMatch) {
        setSentiment(sentimentMatch[1].trim());
      } else {
        setSentiment('Neutral tone detected');
      }
      
      setShowBeforeAfter(true);
    } catch (error) {
      console.error("Error improving text:", error);
      toast.error(isEnglish ? 'Error improving your message. Please try again.' : 'आपके संदेश में सुधार करने में त्रुटि। कृपया पुनः प्रयास करें।');
      
      // Enhanced fallback
      const fallbacks = [
        `${originalText} - but with more personality! What do you think? 😊`,
        `${originalText}... and I'm already looking forward to your answer! ✨`,
        `So, ${originalText.toLowerCase()} - tell me everything! 💭`
      ];
      
      setImprovedText(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
      setSentiment('Could use more personality and engagement');
      setShowBeforeAfter(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const useExample = (example: typeof examples[0]) => {
    setOriginalText(example.original);
    setImprovedText(example.improved);
    setSentiment('Example message - basic and needs improvement');
    setShowBeforeAfter(true);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            {isEnglish ? 'Text CPR' : 'टेक्स्ट सीपीआर'}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {isEnglish 
              ? 'Resuscitate dying conversations with engaging message rewrites' 
              : 'जीवंत संदेश पुनर्लेखन के साथ मरती बातचीत को पुनर्जीवित करें'}
          </p>
        </div>
        
        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Transform your messages' : 'अपने संदेशों को बदलें'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="original-text" className="text-white mb-2 block">
                {isEnglish ? 'Your original message' : 'आपका मूल संदेश'}
              </Label>
              <Textarea
                id="original-text"
                placeholder={isEnglish ? 'Type your message here...' : 'अपना संदेश यहां टाइप करें...'}
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                className="romantic-input min-h-[100px]"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full md:w-auto romantic-button"
              disabled={isLoading}
            >
              {isLoading 
                ? (isEnglish ? 'Improving message...' : 'संदेश में सुधार हो रहा है...') 
                : (isEnglish ? 'Breathe Life Into My Text' : 'मेरे टेक्स्ट में जान फूंकें')}
            </Button>
          </form>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">
            {isEnglish ? 'Need inspiration? Try these examples:' : 'प्रेरणा की जरूरत है? ये उदाहरण आज़माएं:'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {examples.map((example, index) => (
              <Card key={index} className="bg-white/5 border-naughty-pink/20 hover:bg-white/10 cursor-pointer transition-colors" onClick={() => useExample(example)}>
                <CardContent className="p-4">
                  <p className="font-medium text-sm mb-2 text-gray-400">{isEnglish ? 'Original:' : 'मूल:'}</p>
                  <p className="mb-3">{example.original}</p>
                  <div className="h-0.5 w-full bg-white/10 my-2"></div>
                  <p className="font-medium text-sm mb-2 text-naughty-pink">{isEnglish ? 'Improved:' : 'बेहतर:'}</p>
                  <p>{example.improved}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {showBeforeAfter && (
          <div className="glass-card p-6 mb-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4 text-gradient">
              {isEnglish ? 'Your Text Makeover' : 'आपका टेक्स्ट मेकओवर'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" /> 
                      {isEnglish ? 'Original' : 'मूल'}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(originalText)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="whitespace-pre-wrap">{originalText}</p>
                  
                  {sentiment && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-start text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <p>{sentiment}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-naughty-pink/30">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-naughty-pink flex items-center">
                      <Smile className="mr-2 h-4 w-4" />
                      {isEnglish ? 'Improved' : 'बेहतर'}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(improvedText)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="whitespace-pre-wrap">{improvedText}</p>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-start text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <p>{isEnglish ? 'Best time to send: Evening (7-9pm)' : 'भेजने का सबसे अच्छा समय: शाम (7-9बजे)'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline">
                <Check className="mr-2 h-4 w-4" />
                {isEnglish ? 'Save To My Winning Lines' : 'मेरी विनिंग लाइन्स में सेव करें'}
              </Button>
            </div>
          </div>
        )}
        
        <div className="text-center mb-8">
          <p className="text-naughty-pink mb-4">
            {isEnglish 
              ? 'Premium users get 3x more rewrites and advanced tone settings!' 
              : 'प्रीमियम उपयोगकर्ताओं को 3x अधिक रीराइट और उन्नत टोन सेटिंग मिलती हैं!'}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TextCprPage;
