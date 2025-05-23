
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { generateWithGemini } from '@/utils/geminiApi';
import { toast } from 'sonner';
import { Check, Copy, Heart, AlertTriangle, ThumbsUp, MessageSquare } from 'lucide-react';

const FlirtCoachPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const isEnglish = language === 'en';
  
  const [message, setMessage] = useState('');
  const [flirtLevel, setFlirtLevel] = useState([30]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showPracticeMode, setShowPracticeMode] = useState(false);
  const [practiceReply, setPracticeReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [flirtScore, setFlirtScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(isEnglish ? 'Copied to clipboard!' : 'क्लिपबोर्ड पर कॉपी किया गया!');
  };
  
  const winningLines = [
    "Your voice in voicemails... damn, it's like my favorite song on repeat.",
    "I've been thinking about our last conversation all day. You have a way with words that makes me forget mine.",
    "That thing you said yesterday? Still making me smile. You have that effect on me.",
    "Is it weird that I can perfectly picture your smile whenever I read your texts?"
  ];
  
  const generateSuggestions = async () => {
    if (!message.trim()) {
      toast.error(isEnglish ? 'Please enter a message context' : 'कृपया एक संदेश संदर्भ दर्ज करें');
      return;
    }
    
    setIsLoading(true);
    setSuggestions([]);
    setFlirtScore(null);
    setFeedback(null);
    
    try {
      // Generate flirty responses using Gemini
      const prompt = `Generate 3 flirty yet respectful message alternatives based on this context:
"${message}"

Make them progressively more flirtatious, with a flirtation intensity level of ${flirtLevel[0]}/100.
Keep messages authentic, personalized, and not cringy.
Include appropriate emoji placement.
Also rate the user's original message on a flirtiness scale from 1-100 and provide brief constructive feedback.

Return in JSON format with three fields:
"suggestions" - array of 3 message alternatives
"score" - flirtiness score of original message (number)
"feedback" - brief constructive feedback on the original message
`;

      const response = await generateWithGemini({
        prompt,
        temperature: 0.7,
      });
      
      try {
        // Try to parse JSON response
        const parsedResponse = JSON.parse(response);
        setSuggestions(parsedResponse.suggestions || []);
        setFlirtScore(parsedResponse.score);
        setFeedback(parsedResponse.feedback);
      } catch (error) {
        // Fallback if not valid JSON
        const lines = response.split('\n').filter(line => line.trim().length > 0);
        setSuggestions(lines.slice(0, 3));
      }
    } catch (error) {
      console.error("Error generating flirty messages:", error);
      toast.error(isEnglish ? 'Error generating suggestions' : 'सुझाव जेनरेट करने में त्रुटि');
      
      // Fallback suggestions
      setSuggestions([
        "I can't stop thinking about our conversation earlier... what else are you good at? 😉",
        "Just saw something that reminded me of you and instantly smiled. You seem to have that effect on me.",
        "Is it too forward to say I'm already looking forward to seeing you again?"
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePracticeMode = () => {
    setShowPracticeMode(!showPracticeMode);
    if (!showPracticeMode && suggestions.length > 0) {
      // Generate AI response when entering practice mode
      generatePracticeReply(suggestions[0]);
    }
  };
  
  const generatePracticeReply = async (selectedMessage: string) => {
    try {
      // Generate practice reply using Gemini
      const prompt = `Generate a realistic, flirty response as if someone received this message:
"${selectedMessage}"

The response should be flirty but natural, as if from a real person who is interested but not over the top.
Keep it to 1-2 sentences and include an appropriate emoji if relevant.`;

      const response = await generateWithGemini({
        prompt,
        temperature: 0.8,
      });
      
      setPracticeReply(response);
    } catch (error) {
      console.error("Error generating practice reply:", error);
      
      // Fallback reply
      setPracticeReply("Oh, you definitely know how to make me blush! When am I seeing you next? 💕");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            {isEnglish ? 'Flirt Coach' : 'फ्लर्ट कोच'}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {isEnglish 
              ? 'Perfect your flirting game with personalized guidance' 
              : 'व्यक्तिगत मार्गदर्शन के साथ अपने फ्लर्टिंग गेम को परफेक्ट करें'}
          </p>
        </div>
        
        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Create your flirty message' : 'अपना फ्लर्टी मैसेज बनाएं'}
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="message-context" className="text-white mb-2 block">
                {isEnglish ? 'Message context or draft' : 'संदेश संदर्भ या ड्राफ्ट'}
              </Label>
              <Textarea
                id="message-context"
                placeholder={isEnglish ? 'What do you want to say?' : 'आप क्या कहना चाहते हैं?'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="romantic-input min-h-[100px]"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-white">
                  {isEnglish ? 'Flirt intensity' : 'फ्लर्ट इंटेंसिटी'}
                </Label>
                <span className="bg-naughty-purple/20 text-naughty-pink px-2 py-1 rounded text-sm">
                  {flirtLevel[0]}%
                </span>
              </div>
              <Slider
                value={flirtLevel}
                onValueChange={setFlirtLevel}
                max={100}
                step={1}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>{isEnglish ? 'Sweet' : 'मीठा'}</span>
                <span>{isEnglish ? 'Playful' : 'शरारती'}</span>
                <span>{isEnglish ? 'Steamy' : 'गरम'}</span>
              </div>
            </div>
            
            <Button 
              onClick={generateSuggestions} 
              className="w-full md:w-auto romantic-button"
              disabled={isLoading || !message.trim()}
            >
              {isLoading 
                ? (isEnglish ? 'Creating magic...' : 'जादू बना रहे हैं...') 
                : (isEnglish ? 'Generate Flirty Messages' : 'फ्लर्टी मैसेज जेनरेट करें')}
            </Button>
          </div>
        </div>
        
        {suggestions.length > 0 && (
          <div className="glass-card p-6 mb-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-2xl font-semibold text-gradient">
                {isEnglish ? 'Your Flirty Options' : 'आपके फ्लर्टी विकल्प'}
              </h2>
              
              {flirtScore !== null && (
                <div className="mt-2 sm:mt-0 flex items-center bg-white/5 px-3 py-1 rounded-full">
                  <span className="text-sm mr-2">{isEnglish ? 'Your flirt score:' : 'आपका फ्लर्ट स्कोर:'}</span>
                  <span className={`font-bold ${flirtScore > 50 ? 'text-naughty-pink' : 'text-gray-400'}`}>
                    {flirtScore}/100
                  </span>
                </div>
              )}
            </div>
            
            {feedback && (
              <div className="bg-white/5 p-3 rounded-lg mb-6 flex items-start">
                <AlertTriangle className="text-naughty-pink mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{feedback}</p>
              </div>
            )}
            
            <div className="space-y-4 mb-6">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="bg-white/5 border-naughty-pink/20">
                  <CardContent className="p-4">
                    <p className="whitespace-pre-wrap">{suggestion}</p>
                  </CardContent>
                  <CardFooter className="px-4 py-2 bg-black/20 flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-naughty-pink" 
                      onClick={() => showPracticeMode && generatePracticeReply(suggestion)}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {isEnglish ? 'Use This' : 'इसे उपयोग करें'}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(suggestion)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="practice-mode"
                  checked={showPracticeMode}
                  onCheckedChange={togglePracticeMode}
                />
                <Label htmlFor="practice-mode" className="text-white cursor-pointer">
                  {isEnglish ? 'Practice Mode' : 'प्रैक्टिस मोड'}
                </Label>
              </div>
              
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {isEnglish ? 'Save to Library' : 'लाइब्रेरी में सेव करें'}
              </Button>
            </div>
            
            {showPracticeMode && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-naughty-pink/20 animate-fade-in">
                <h3 className="font-medium mb-3 flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-naughty-pink" />
                  {isEnglish ? 'Practice Partner Response' : 'प्रैक्टिस पार्टनर रिस्पॉन्स'}
                </h3>
                <p className="italic text-naughty-pink">{practiceReply}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="glass-card p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gradient">
            {isEnglish ? 'Winning Flirt Lines' : 'विनिंग फ्लर्ट लाइन्स'}
          </h3>
          
          <div className="space-y-3">
            {winningLines.map((line, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg flex justify-between items-center group">
                <p className="mr-2">{line}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(line)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-naughty-pink mb-4">
            {isEnglish 
              ? 'Premium members receive personalized coaching and advanced AI practice sessions!' 
              : 'प्रीमियम सदस्यों को व्यक्तिगत कोचिंग और उन्नत AI प्रैक्टिस सेशन मिलते हैं!'}
          </p>
          <Button variant="romantic">
            {isEnglish ? 'Upgrade for Personal Coach' : 'पर्सनल कोच के लिए अपग्रेड करें'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default FlirtCoachPage;
