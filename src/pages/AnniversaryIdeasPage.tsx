
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { CalendarHeart, Gift, PartyPopper, CakeSlice } from 'lucide-react';
import { generateWithGemini } from '@/utils/geminiApi';

const anniversaryTypes = [
  { id: 'romantic', label: 'Romantic Ideas', icon: <CalendarHeart className="mr-2 h-4 w-4" /> },
  { id: 'unique', label: 'Unique Celebrations', icon: <PartyPopper className="mr-2 h-4 w-4" /> },
  { id: 'milestones', label: '5+ Year Ideas', icon: <CakeSlice className="mr-2 h-4 w-4" /> },
  { id: 'home', label: 'Date Night at Home', icon: <CalendarHeart className="mr-2 h-4 w-4" /> },
  { id: 'distance', label: 'Long-Distance Ideas', icon: <Gift className="mr-2 h-4 w-4" /> },
  { id: 'budget', label: 'Budget-Friendly', icon: <Gift className="mr-2 h-4 w-4" /> },
  { id: 'party', label: 'Party with Friends', icon: <PartyPopper className="mr-2 h-4 w-4" /> },
  { id: 'surprise', label: 'Surprise Ideas', icon: <Gift className="mr-2 h-4 w-4" /> },
];

const budgetOptions = [
  { value: 'free', label: 'Free' },
  { value: 'budget', label: '$1-$50' },
  { value: 'moderate', label: '$50-$150' },
  { value: 'premium', label: '$150-$300' },
  { value: 'luxury', label: '$300+' }
];

const milestoneOptions = [
  { value: '1', label: '1st Anniversary' },
  { value: '5', label: '5th Anniversary' },
  { value: '10', label: '10th Anniversary' },
  { value: '15', label: '15th Anniversary' },
  { value: '20', label: '20th Anniversary' },
  { value: '25', label: 'Silver (25th)' },
  { value: '30', label: '30th Anniversary' },
  { value: '40', label: '40th Anniversary' },
  { value: '50', label: 'Golden (50th)' }
];

const seasonOptions = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'fall', label: 'Fall' },
  { value: 'winter', label: 'Winter' },
  { value: 'holiday', label: 'Holiday Season' }
];

const AnniversaryIdeasPage = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('romantic');
  const [budget, setBudget] = useState('moderate');
  const [milestone, setMilestone] = useState('5');
  const [season, setSeason] = useState('');
  const [interests, setInterests] = useState('');
  const [memories, setMemories] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [generatedIdeas, setGeneratedIdeas] = useState(false);

  const handleGenerate = async () => {
    if (!user.isLoggedIn) {
      toast({
        variant: "destructive",
        title: "Login required",
        description: "Please log in to generate anniversary ideas"
      });
      return;
    }

    // Limit generations for free users
    if (user.subscription === 'free' && generatedIdeas) {
      toast({
        title: "Usage limit reached",
        description: "Upgrade to Premium for unlimited idea generations",
        variant: "default"
      });
      return;
    }

    setLoading(true);

    try {
      const prompt = `Generate 3 creative anniversary ideas for couples with these parameters:
      - Type of ideas: ${anniversaryTypes.find(t => t.id === activeTab)?.label || 'Romantic'}
      - Anniversary milestone: ${milestone} years
      - Budget: ${budget}
      ${season ? `- Season/time of year: ${season}` : ''}
      ${interests ? `- Interests/hobbies: ${interests}` : ''}
      ${memories ? `- Special memories to incorporate: ${memories}` : ''}

      Each idea should include:
      1. A title/heading
      2. A brief description (2-3 sentences)
      3. Estimated cost or budget range
      4. A suggested gift that pairs well with the idea (if applicable)

      Make ideas practical, specific, and ready to implement. Format each idea clearly with line breaks between sections.`;

      const response = await generateWithGemini({
        prompt,
        temperature: 0.8,
        maxOutputTokens: 1000,
      });

      // Split the response into separate ideas and trim each one
      const ideaList = response.split(/\n\n(?=\d\.|\w+:|\*\*|\#)/).map(idea => idea.trim());
      setIdeas(ideaList.slice(0, 3));
      setGeneratedIdeas(true);
    } catch (error) {
      console.error("Error generating anniversary ideas:", error);
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "Unable to generate anniversary ideas. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-love mb-4 text-gradient">Anniversary Ideas Generator</h1>
          <p className="text-naughty-pink/80 max-w-2xl mx-auto">
            Create special anniversary plans tailored to your relationship. Get unique ideas for gifts, trips, and celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Options Panel */}
          <div className="md:col-span-1">
            <Card className="bg-black/20 border-naughty-purple/30">
              <CardHeader>
                <CardTitle className="text-white text-xl">Customize Your Ideas</CardTitle>
                <CardDescription className="text-naughty-pink/80">
                  Fill in the details to get personalized suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="milestone">Anniversary Year</Label>
                  <Select value={milestone} onValueChange={setMilestone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select milestone" />
                    </SelectTrigger>
                    <SelectContent>
                      {milestoneOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="season">Season (Optional)</Label>
                  <Select value={season} onValueChange={setSeason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any season</SelectItem>
                      {seasonOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests/Hobbies (Optional)</Label>
                  <Input 
                    id="interests"
                    placeholder="Travel, cooking, hiking..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="memories">Special Memories (Optional)</Label>
                  <Textarea 
                    id="memories"
                    placeholder="First date location, favorite trip..."
                    value={memories}
                    onChange={(e) => setMemories(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleGenerate} 
                  className="w-full romantic-button" 
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Ideas"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Ideas Panel */}
          <div className="md:col-span-2">
            <Card className="bg-black/20 border-naughty-purple/30 h-full">
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-black/50">
                    {anniversaryTypes.map((type) => (
                      <TabsTrigger key={type.id} value={type.id} className="flex items-center">
                        {type.icon}
                        <span className="hidden sm:inline">{type.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                {ideas.length > 0 ? (
                  <div className="space-y-4">
                    {ideas.map((idea, index) => (
                      <Card key={index} className="bg-black/30 border-naughty-purple/20 hover:border-naughty-purple/50 transition-all">
                        <CardContent className="pt-6">
                          <div className="whitespace-pre-line text-white/90">{idea}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PartyPopper className="h-12 w-12 mx-auto text-naughty-purple/50 mb-4" />
                    <h3 className="text-xl text-white mb-2">No ideas generated yet</h3>
                    <p className="text-naughty-pink/70">
                      Select your preferences and click "Generate Ideas" to create custom anniversary suggestions
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="my-12">
          <h2 className="text-2xl font-love mb-6 text-center text-gradient">Common Questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="q1" className="border-b border-naughty-purple/30">
              <AccordionTrigger className="text-white">How to plan a 10th anniversary?</AccordionTrigger>
              <AccordionContent className="text-naughty-pink/80">
                For a 10th anniversary, consider blending tradition (tin/aluminum) with personal touches. Start by reflecting on a decade together and choose a meaningful location. Create a timeline of your relationship highlights, plan an activity you've always wanted to try together, and choose a gift that represents your journey. For the best experience, balance nostalgia with new experiences.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q2" className="border-b border-naughty-purple/30">
              <AccordionTrigger className="text-white">What are some budget-friendly anniversary ideas?</AccordionTrigger>
              <AccordionContent className="text-naughty-pink/80">
                Create a memory jar with notes about favorite moments, plan a picnic in a special spot, recreate your first date, make a playlist of songs from your relationship, cook a fancy dinner at home, or take a free local tour. The most meaningful celebrations often focus on thoughtfulness rather than cost.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q3" className="border-b border-naughty-purple/30">
              <AccordionTrigger className="text-white">How can we celebrate our anniversary while long-distance?</AccordionTrigger>
              <AccordionContent className="text-naughty-pink/80">
                Plan a virtual date night with the same meal and movie, send surprise gifts to arrive on your anniversary, create a digital scrapbook to share, play online games together, or plan a future reunion. You can also arrange for local experiences like spa treatments to happen simultaneously while you video chat.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q4" className="border-b border-naughty-purple/30">
              <AccordionTrigger className="text-white">What are traditional anniversary gifts by year?</AccordionTrigger>
              <AccordionContent className="text-naughty-pink/80">
                Traditional gifts include: 1st (paper), 5th (wood), 10th (tin/aluminum), 15th (crystal), 20th (china), 25th (silver), 30th (pearl), 40th (ruby), 50th (gold), and 60th (diamond). Modern alternatives exist too, like clocks for the 1st and silverware for the 5th anniversary.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q5" className="border-b border-naughty-purple/30">
              <AccordionTrigger className="text-white">How do we include family in our anniversary celebration?</AccordionTrigger>
              <AccordionContent className="text-naughty-pink/80">
                Host a casual gathering or dinner party, renew your vows with loved ones present, create a photo slideshow of your journey, organize an activity everyone can enjoy like a picnic or game night, or take a family trip. You might also consider asking family members to share their favorite memories of you as a couple.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default AnniversaryIdeasPage;
