
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import LoginModal from '@/components/auth/LoginModal';
import { toast } from '@/components/ui/sonner';
import { Copy, Heart, Flower } from 'lucide-react';
import { generateSextingMessages } from '@/utils/geminiApi';

const tones = [
  { value: 'flirty', label: '💌 Sweet & Flirty' },
  { value: 'romantic', label: '❤️ Deeply Romantic' },
  { value: 'passionate', label: '💕 Passionately Yours' },
  { value: 'teasing', label: '😘 Playfully Teasing' },
  { value: 'explicit', label: '🔥 Intensely Passionate' },
  { value: 'dominant', label: '✨ Confidently Bold' },
  { value: 'submissive', label: '💫 Tenderly Devoted' },
];

const contexts = [
  { value: 'new-relationship', label: '💘 Blossoming Romance' },
  { value: 'long-term', label: '💞 Enduring Love' },
  { value: 'hookup', label: '💋 Spontaneous Connection' },
  { value: 'long-distance', label: '✈️ Love Across Miles' },
  { value: 'rekindling', label: '✨ Reigniting the Spark' },
];

const SextingGeneratorPage = () => {
  const { user } = useUser();
  const [tone, setTone] = useState('flirty');
  const [context, setContext] = useState('new-relationship');
  const [explicitness, setExplicitness] = useState([50]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedTexts, setGeneratedTexts] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Free users can only generate 3 times
    if (!user.isLoggedIn && generationCount >= 2) {
      setIsLoginModalOpen(true);
      setIsGenerating(false);
      return;
    }
    
    if (user.subscription === 'free' && generationCount >= 5) {
      toast.error("You've reached the free limit. Upgrade to premium for unlimited romantic messages ✨");
      setIsGenerating(false);
      return;
    }

    try {
      // Generate messages using Gemini API
      const messages = await generateSextingMessages(
        tone,
        context,
        explicitness[0],
        customPrompt
      );
      
      setGeneratedTexts(messages);
    } catch (error) {
      console.error('Error generating texts:', error);
      toast.error("Had trouble connecting to our love poets. Using sample messages instead 💫");
      
      // Use sample romantic messages as fallback
      setGeneratedTexts([
        "The thought of you makes my heart race. I can't wait to feel your touch again, to get lost in your embrace 💞",
        "Dreaming of your lips against mine, your hands exploring every inch of me. The anticipation is driving me wild 💋",
        "Distance may separate us now, but tonight in my dreams, we'll be together. Let me describe what I have planned for you... ✨"
      ]);
    } finally {
      setIsGenerating(false);
      setGenerationCount(prev => prev + 1);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Message copied! Send it with love 💕");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute -top-10 -left-10 opacity-20 animate-floating">
          <span className="text-4xl">💌</span>
        </div>
        <div className="absolute top-20 -right-10 opacity-20 animate-floating" style={{animationDelay: "1.5s"}}>
          <span className="text-3xl">💕</span>
        </div>
      
        <h1 className="text-3xl md:text-4xl font-love text-gradient mb-2">Romantic Message Creator</h1>
        <p className="text-naughty-pink/80 mb-8">
          Craft heartfelt messages that express your deepest emotions and desires 💖
        </p>
        
        <div className="romantic-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="tone" className="text-white mb-2 block font-romantic">Message Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="romantic-input">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="context" className="text-white mb-2 block font-romantic">Relationship Context</Label>
              <Select value={context} onValueChange={setContext}>
                <SelectTrigger className="romantic-input">
                  <SelectValue placeholder="Select context" />
                </SelectTrigger>
                <SelectContent>
                  {contexts.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-6">
            <Label htmlFor="explicitness" className="text-white mb-2 block font-romantic">
              Passion Intensity: {explicitness[0]}% 💫
            </Label>
            <Slider
              id="explicitness"
              value={explicitness}
              onValueChange={setExplicitness}
              max={100}
              step={1}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-naughty-pink/70">
              <span>💭 Sweet Whispers</span>
              <span>💗 Heartfelt Words</span>
              <span>💋 Passionate Desires</span>
            </div>
          </div>
          
          <div className="mb-6">
            <Label htmlFor="customPrompt" className="text-white mb-2 block font-romantic">Personal Touch (Optional)</Label>
            <Textarea
              id="customPrompt"
              placeholder="Add special memories, inside jokes, or specific desires you'd like to express..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[80px] romantic-input"
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="w-full romantic-button group"
          >
            {isGenerating ? (
              <>Creating Love Messages...</>
            ) : (
              <>Create Romantic Messages <Heart size={16} className="ml-2 group-hover:animate-heart-beat" /></>
            )}
          </Button>

          {!user.isLoggedIn && generationCount === 2 && (
            <p className="text-naughty-pink text-sm mt-2 text-center">
              This is your last free message. Sign up to continue your romantic journey! ✨
            </p>
          )}
          
          {user.subscription === 'free' && generationCount === 5 && (
            <p className="text-naughty-pink text-sm mt-2 text-center">
              You've reached your free limit. Upgrade to premium for unlimited romantic expressions! 💖
            </p>
          )}
        </div>
        
        {generatedTexts.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-love text-gradient mb-4">Your Romantic Messages</h2>
            <div className="space-y-4">
              {generatedTexts.map((text, index) => (
                <Card key={index} className="romantic-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <p className="text-white">{text}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(text)}
                        className="text-naughty-purple hover:text-naughty-pink hover:bg-naughty-purple/10"
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="romantic-card p-6">
          <h2 className="text-xl font-romantic text-white mb-4 text-center">Tips for Heartfelt Expression</h2>
          <ul className="space-y-2 text-naughty-pink/80">
            <li>💌 Begin with a sweet greeting that makes them feel special</li>
            <li>💭 Share a specific memory that's meaningful to both of you</li>
            <li>💗 Use sensory language to create vivid emotional imagery</li>
            <li>💋 Express how they make you feel deep inside</li>
            <li>✨ End with anticipation for your next moment together</li>
          </ul>
        </div>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </Layout>
  );
};

export default SextingGeneratorPage;
