
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateWithGemini } from '@/utils/geminiApi';
import { toast } from 'sonner';
import { Heart, Copy, FileText, Send } from 'lucide-react';

const ConfessionLetterPage = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  
  const [recipientName, setRecipientName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [tone, setTone] = useState('');
  const [feelings, setFeelings] = useState('');
  const [memories, setMemories] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(isEnglish ? 'Letter copied to clipboard!' : 'पत्र क्लिपबोर्ड पर कॉपी किया गया!');
  };

  const handleGenerate = async () => {
    if (!recipientName.trim() || !feelings.trim()) {
      toast.error(isEnglish ? 'Please fill in the required fields' : 'कृपया आवश्यक फ़ील्ड भरें');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const prompt = `Write a heartfelt confession letter with these details:

Recipient: ${recipientName}
Relationship: ${relationship || 'someone special'}
Tone: ${tone || 'romantic and sincere'}
Feelings to express: ${feelings}
${memories ? `Special memories to include: ${memories}` : ''}

Create a beautiful, personalized letter that:
- Expresses genuine emotions
- Is appropriate for the relationship context
- Includes personal touches based on the provided information
- Has a warm, authentic tone
- Is around 200-300 words long

Make it heartfelt and meaningful.`;

      const response = await generateWithGemini({
        prompt,
        temperature: 0.8,
      });
      
      setGeneratedLetter(response);
    } catch (error) {
      console.error("Error generating letter:", error);
      toast.error(isEnglish ? 'Error generating letter' : 'पत्र जेनरेट करने में त्रुटि');
      
      // Fallback letter
      setGeneratedLetter(`Dear ${recipientName},

I've been trying to find the right words to express how I feel, but nothing seems adequate enough for what you mean to me.

${feelings}

Every moment we've shared has been precious to me, and I find myself thinking about you more and more each day. You bring such joy and warmth into my life, and I wanted you to know how deeply I care about you.

${memories ? `I especially treasure ${memories.toLowerCase()}, and how it made me realize just how special you are.` : ''}

I hope these words find their way to your heart, because that's where my feelings come from - deep within mine.

With all my love,
[Your name]`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            {isEnglish ? 'Confession Letter Generator' : 'कन्फेशन लेटर जनरेटर'}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {isEnglish 
              ? 'Craft the perfect letter to express your feelings' 
              : 'अपनी भावनाओं को व्यक्त करने के लिए एकदम सही पत्र लिखें'}
          </p>
        </div>

        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Create Your Letter' : 'अपना पत्र बनाएं'}
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="recipient-name" className="text-white mb-2 block">
                  {isEnglish ? 'Recipient\'s Name *' : 'प्राप्तकर्ता का नाम *'}
                </Label>
                <Input
                  id="recipient-name"
                  placeholder={isEnglish ? "Their name" : "उनका नाम"}
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="romantic-input"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="relationship" className="text-white mb-2 block">
                  {isEnglish ? 'Your Relationship' : 'आपका रिश्ता'}
                </Label>
                <Select value={relationship} onValueChange={setRelationship}>
                  <SelectTrigger className="romantic-input">
                    <SelectValue placeholder={isEnglish ? "Select relationship" : "रिश्ता चुनें"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friend">{isEnglish ? 'Close Friend' : 'करीबी दोस्त'}</SelectItem>
                    <SelectItem value="crush">{isEnglish ? 'Crush' : 'क्रश'}</SelectItem>
                    <SelectItem value="dating">{isEnglish ? 'Dating' : 'डेटिंग'}</SelectItem>
                    <SelectItem value="longtime-friend">{isEnglish ? 'Long-time Friend' : 'पुराना दोस्त'}</SelectItem>
                    <SelectItem value="colleague">{isEnglish ? 'Colleague' : 'सहकर्मी'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="tone" className="text-white mb-2 block">
                {isEnglish ? 'Letter Tone' : 'पत्र का टोन'}
              </Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="romantic-input">
                  <SelectValue placeholder={isEnglish ? "Select tone" : "टोन चुनें"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="romantic">{isEnglish ? 'Romantic & Passionate' : 'रोमांटिक और जुनूनी'}</SelectItem>
                  <SelectItem value="sweet">{isEnglish ? 'Sweet & Gentle' : 'मीठा और कोमल'}</SelectItem>
                  <SelectItem value="heartfelt">{isEnglish ? 'Heartfelt & Sincere' : 'दिल से और सच्चा'}</SelectItem>
                  <SelectItem value="playful">{isEnglish ? 'Playful & Light' : 'शरारती और हल्का'}</SelectItem>
                  <SelectItem value="deep">{isEnglish ? 'Deep & Emotional' : 'गहरा और भावनात्मक'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="feelings" className="text-white mb-2 block">
                {isEnglish ? 'What do you want to express? *' : 'आप क्या व्यक्त करना चाहते हैं? *'}
              </Label>
              <Textarea
                id="feelings"
                placeholder={isEnglish ? "Describe your feelings, what you love about them, how they make you feel..." : "अपनी भावनाओं का वर्णन करें, आप उनमें क्या पसंद करते हैं..."}
                value={feelings}
                onChange={(e) => setFeelings(e.target.value)}
                className="romantic-input min-h-[100px]"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="memories" className="text-white mb-2 block">
                {isEnglish ? 'Special memories to include (Optional)' : 'शामिल करने की विशेष यादें (वैकल्पिक)'}
              </Label>
              <Textarea
                id="memories"
                placeholder={isEnglish ? "Describe special moments you've shared together..." : "एक साथ बिताए गए विशेष पलों का वर्णन करें..."}
                value={memories}
                onChange={(e) => setMemories(e.target.value)}
                className="romantic-input min-h-[80px]"
              />
            </div>
            
            <Button 
              onClick={handleGenerate} 
              className="w-full md:w-auto romantic-button"
              disabled={isGenerating || !recipientName.trim() || !feelings.trim()}
            >
              <FileText className="mr-2 h-4 w-4" />
              {isGenerating 
                ? (isEnglish ? 'Crafting your letter...' : 'आपका पत्र तैयार कर रहे हैं...') 
                : (isEnglish ? 'Generate Letter' : 'पत्र जेनरेट करें')}
            </Button>
          </div>
        </div>

        {generatedLetter && (
          <Card className="bg-white/5 border-naughty-pink/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-gradient flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  {isEnglish ? 'Your Letter' : 'आपका पत्र'}
                </span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(generatedLetter)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="whitespace-pre-wrap text-gray-100 leading-relaxed">
                  {generatedLetter}
                </div>
              </div>
              
              <div className="mt-6 flex justify-center gap-4">
                <Button variant="outline" onClick={handleGenerate}>
                  {isEnglish ? 'Generate Another Version' : 'दूसरा वर्शन जेनरेट करें'}
                </Button>
                <Button variant="romantic">
                  {isEnglish ? 'Save to My Letters' : 'मेरे पत्रों में सेव करें'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <p className="text-naughty-pink mb-4">
            {isEnglish 
              ? 'Premium users get unlimited letters and advanced customization options!' 
              : 'प्रीमियम उपयोगकर्ताओं को असीमित पत्र और उन्नत अनुकूलन विकल्प मिलते हैं!'}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ConfessionLetterPage;
