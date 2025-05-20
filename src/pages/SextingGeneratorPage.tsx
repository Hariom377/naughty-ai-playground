
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
import { Copy } from 'lucide-react';

const tones = [
  { value: 'flirty', label: 'Flirty' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'passionate', label: 'Passionate' },
  { value: 'teasing', label: 'Teasing' },
  { value: 'explicit', label: 'Explicit' },
  { value: 'dominant', label: 'Dominant' },
  { value: 'submissive', label: 'Submissive' },
];

const contexts = [
  { value: 'new-relationship', label: 'New Relationship' },
  { value: 'long-term', label: 'Long-term Relationship' },
  { value: 'hookup', label: 'Casual Hookup' },
  { value: 'long-distance', label: 'Long Distance' },
  { value: 'rekindling', label: 'Rekindling the Spark' },
];

// Sample generated texts for demonstration
const sampleTexts = {
  flirty: [
    "Can't stop thinking about our last kiss. Maybe we should create some new memories tonight?",
    "Just got out of the shower and thought of you... wish you were here to help me dry off 😉",
    "I keep replaying our last time together in my head. You have no idea what you do to me...",
  ],
  romantic: [
    "My body aches for your touch tonight. I want to feel your warmth against me, skin to skin.",
    "I've been fantasizing about your lips all day... the way they feel against mine, the way they taste.",
    "When you hold me close, I feel like I'm exactly where I belong. I can't wait to be in your arms again.",
  ],
  passionate: [
    "The things I want to do to you right now would make even the stars blush.",
    "I want your hands all over me, exploring every inch. Take your time, we have all night.",
    "I'm wearing that thing you like. Come over and I'll let you take it off... slowly.",
  ],
  teasing: [
    "I've got a surprise for you when you get home. Hint: it involves very little clothing.",
    "Just bought something new and lacy. Want a preview or should I make you wait until tonight?",
    "Thinking about that thing you did last time... I might need a refresher course later.",
  ],
  explicit: [
    "I want to feel you inside me tonight, filling me completely until I can't take anymore.",
    "I'm touching myself thinking of you right now. Wish it was your fingers instead of mine.",
    "I want you to push me against the wall when I get home and have your way with me. Don't be gentle.",
  ],
  dominant: [
    "When you get home, I want you on your knees. You know what to do next.",
    "Tonight, you're all mine. I'm going to use you exactly how I want, and you're going to love every second.",
    "I expect you ready and waiting for me. Don't make me punish you... unless that's what you want.",
  ],
  submissive: [
    "I've been so bad today. I think I need to be taught a lesson when you get home.",
    "I'm yours to command tonight. Tell me exactly what you want me to do to please you.",
    "I want to surrender completely to you. Take control and use me however you desire.",
  ],
};

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

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Free users can only generate 3 times
    if (!user.isLoggedIn && generationCount >= 2) {
      setIsLoginModalOpen(true);
      setIsGenerating(false);
      return;
    }
    
    if (user.subscription === 'free' && generationCount >= 5) {
      toast.error("You've reached the free limit. Upgrade to premium for unlimited generations.");
      setIsGenerating(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      // For the demo, we'll use the sample texts based on tone
      const selectedTone = tone as keyof typeof sampleTexts;
      setGeneratedTexts(sampleTexts[selectedTone]);
      setIsGenerating(false);
      setGenerationCount(prev => prev + 1);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">AI Sexting Generator</h1>
        <p className="text-gray-300 mb-8">
          Create personalized, flirty, or explicitly seductive messages for any situation.
        </p>
        
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="tone" className="text-white mb-2 block">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-white/5 border-white/10">
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
              <Label htmlFor="context" className="text-white mb-2 block">Relationship Context</Label>
              <Select value={context} onValueChange={setContext}>
                <SelectTrigger className="bg-white/5 border-white/10">
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
            <Label htmlFor="explicitness" className="text-white mb-2 block">
              Explicitness Level: {explicitness[0]}%
            </Label>
            <Slider
              id="explicitness"
              value={explicitness}
              onValueChange={setExplicitness}
              max={100}
              step={1}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Subtle</span>
              <span>Moderate</span>
              <span>Explicit</span>
            </div>
          </div>
          
          <div className="mb-6">
            <Label htmlFor="customPrompt" className="text-white mb-2 block">Custom Details (Optional)</Label>
            <Textarea
              id="customPrompt"
              placeholder="Add specific details, scenarios, or preferences..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[80px] bg-white/5 border-white/10"
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="w-full bg-naughty-purple hover:bg-naughty-purpleDark text-white"
          >
            {isGenerating ? "Generating..." : "Generate Texts"}
          </Button>

          {!user.isLoggedIn && generationCount === 2 && (
            <p className="text-amber-400 text-sm mt-2">
              This is your last free generation. Sign up to continue!
            </p>
          )}
          
          {user.subscription === 'free' && generationCount === 5 && (
            <p className="text-amber-400 text-sm mt-2">
              You've reached your free limit. Upgrade to premium for unlimited generations!
            </p>
          )}
        </div>
        
        {generatedTexts.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-semibold text-white mb-4">Generated Messages</h2>
            <div className="space-y-4">
              {generatedTexts.map((text, index) => (
                <Card key={index} className="glass-card border-white/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <p className="text-white">{text}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(text)}
                        className="text-naughty-purple hover:text-white hover:bg-naughty-purple"
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
        
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Tips for Effective Sexting</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Start slowly and build tension gradually</li>
            <li>• Use descriptive language that appeals to all senses</li>
            <li>• Ask questions to keep the conversation flowing</li>
            <li>• Pay attention to what gets positive responses</li>
            <li>• Always respect boundaries and consent</li>
          </ul>
        </div>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </Layout>
  );
};

export default SextingGeneratorPage;
