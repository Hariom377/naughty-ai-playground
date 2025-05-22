
import { useState } from 'react';
import { toast } from "sonner";
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { generateFirstDateIdeas } from '@/utils/geminiApi';
import { MapPin, Calendar, DollarSign, Heart, Share, Bookmark, Star } from 'lucide-react';

// First date ideas types and categories
const interestOptions = [
  { value: "food", label: "Food Lovers" },
  { value: "adventure", label: "Adventure Seekers" },
  { value: "art", label: "Art Enthusiasts" },
  { value: "nature", label: "Nature Lovers" },
  { value: "movies", label: "Movie Buffs" },
  { value: "music", label: "Music Fans" },
  { value: "books", label: "Book Lovers" },
  { value: "games", label: "Gaming" },
];

const budgetOptions = [
  { value: "free", label: "Free" },
  { value: "budget", label: "Budget-friendly ($)" },
  { value: "moderate", label: "Moderate ($$)" },
  { value: "splurge", label: "Special Occasion ($$$)" },
];

const locationOptions = [
  { value: "home", label: "At Home" },
  { value: "local", label: "Local Area" },
  { value: "city", label: "City Center" },
  { value: "outdoors", label: "Outdoors" },
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Café" },
  { value: "bar", label: "Bar" },
];

const seasonOptions = [
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "fall", label: "Fall" },
  { value: "winter", label: "Winter" },
];

const personalityOptions = [
  { value: "shy", label: "Shy/Introverted" },
  { value: "outgoing", label: "Outgoing/Extroverted" },
  { value: "creative", label: "Creative" },
  { value: "intellectual", label: "Intellectual" },
  { value: "active", label: "Active/Sporty" },
];

const FirstDateIdeasPage = () => {
  const [location, setLocation] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [interest, setInterest] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [personality, setPersonality] = useState<string>("");
  const [isFirstDate, setIsFirstDate] = useState<boolean>(true);
  const [dateIdeas, setDateIdeas] = useState<string[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("generate");
  const [manualLocation, setManualLocation] = useState<string>("");

  // Function to generate date ideas
  const generateIdeas = async () => {
    try {
      const ideas = await generateFirstDateIdeas(
        interest,
        budget,
        location || manualLocation,
        season,
        personality,
        isFirstDate
      );
      setDateIdeas(ideas);
      setActiveTab("results");
      toast.success("Date ideas generated successfully!");
    } catch (error) {
      console.error("Error generating date ideas:", error);
      toast.error("Failed to generate date ideas. Please try again.");
    }
  };

  const saveDateIdea = (idea: string) => {
    if (!savedIdeas.includes(idea)) {
      setSavedIdeas([...savedIdeas, idea]);
      toast.success("Idea saved to favorites!");
    } else {
      toast.info("This idea is already in your favorites!");
    }
  };

  const shareIdea = (idea: string) => {
    navigator.clipboard.writeText(idea);
    toast.success("Copied to clipboard! Now you can share it.");
  };

  // Query for popular date ideas
  const { data: popularIdeas, isLoading: isLoadingPopular } = useQuery({
    queryKey: ['popularDateIdeas'],
    queryFn: async () => {
      return [
        "Coffee shop hop - visit 2-3 different local cafés and sample their signature drinks",
        "Art gallery tour followed by a discussion over wine at a nearby bistro",
        "Picnic in the park with homemade sandwiches and fresh fruit",
        "Cooking class where you learn to make a cuisine you both enjoy",
        "Sunset walk along the waterfront with ice cream or hot chocolate",
      ];
    },
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-love mb-4 text-gradient leading-tight">First Date Idea Generator</h1>
          <p className="text-naughty-pink/80 max-w-2xl mx-auto">
            Plan the perfect first date based on your interests, budget, and preferences. 
            Make your first impression unforgettable!
          </p>
        </div>

        <Tabs defaultValue="generate" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="generate">Generate Ideas</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="saved">Saved Ideas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate">
            <Card className="romantic-card">
              <CardHeader>
                <CardTitle>Tell Us About Your Ideal First Date</CardTitle>
                <CardDescription>Fill in your preferences to get personalized date ideas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interest">Interests</Label>
                    <Select value={interest} onValueChange={setInterest}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any interest</SelectItem>
                        {interestOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any budget</SelectItem>
                        {budgetOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location Type</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any location</SelectItem>
                        {locationOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location-input">Specific Location (Optional)</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-naughty-purple" />
                      <Input
                        id="location-input"
                        placeholder="e.g., New York City, Paris..."
                        value={manualLocation}
                        onChange={(e) => setManualLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="season">Season</Label>
                    <Select value={season} onValueChange={setSeason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any season</SelectItem>
                        {seasonOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personality">Personality Type</Label>
                    <Select value={personality} onValueChange={setPersonality}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select personality type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any personality</SelectItem>
                        {personalityOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox 
                    id="is-first-date" 
                    checked={isFirstDate}
                    onCheckedChange={(checked) => setIsFirstDate(checked as boolean)}
                  />
                  <Label htmlFor="is-first-date">This is for a first date</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={generateIdeas} 
                  className="w-full romantic-button"
                >
                  Generate Date Ideas <Heart className="ml-2" size={16} />
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-center mb-4">Popular First Date Ideas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoadingPopular ? (
                  <p className="text-center col-span-full">Loading popular ideas...</p>
                ) : (
                  popularIdeas?.map((idea, index) => (
                    <Card key={index} className="feature-card-hover">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{idea.split(' - ')[0]}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-naughty-pink/80">{idea.split(' - ')[1] || idea}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => saveDateIdea(idea)}
                        >
                          <Bookmark size={16} className="mr-1" /> Save
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => shareIdea(idea)}
                        >
                          <Share size={16} className="mr-1" /> Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-love">Your Personalized Date Ideas</h2>
                <Button variant="outline" onClick={() => setActiveTab("generate")}>
                  Customize Again
                </Button>
              </div>

              {dateIdeas.length === 0 ? (
                <Card className="romantic-card p-8 text-center">
                  <p>No date ideas generated yet. Fill out the form to get personalized suggestions.</p>
                  <Button 
                    className="mt-4 romantic-button"
                    onClick={() => setActiveTab("generate")}
                  >
                    Go to Generator
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {dateIdeas.map((idea, index) => (
                    <Card key={index} className="romantic-card feature-card-hover">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{idea.split('\n')[0]}</CardTitle>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-naughty-pink/90">{idea.split('\n').slice(1).join('\n')}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            {budget && (
                              <span className="inline-flex items-center text-xs bg-black/20 text-naughty-pink px-2 py-1 rounded">
                                <DollarSign size={12} className="mr-1" /> 
                                {budget === "free" ? "Free" : budget === "budget" ? "$" : budget === "moderate" ? "$$" : "$$$"}
                              </span>
                            )}
                            {location && location !== "any" && (
                              <span className="inline-flex items-center text-xs bg-black/20 text-naughty-pink px-2 py-1 rounded">
                                <MapPin size={12} className="mr-1" /> {locationOptions.find(l => l.value === location)?.label || location}
                              </span>
                            )}
                            {season && season !== "any" && (
                              <span className="inline-flex items-center text-xs bg-black/20 text-naughty-pink px-2 py-1 rounded">
                                <Calendar size={12} className="mr-1" /> {seasonOptions.find(s => s.value === season)?.label || season}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => saveDateIdea(idea)}
                        >
                          <Bookmark size={16} className="mr-1" /> Save
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => shareIdea(idea)}
                        >
                          <Share size={16} className="mr-1" /> Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="space-y-6">
              <h2 className="text-2xl font-love">Saved Date Ideas</h2>

              {savedIdeas.length === 0 ? (
                <Card className="romantic-card p-8 text-center">
                  <p>You haven't saved any date ideas yet.</p>
                  <Button 
                    className="mt-4 romantic-button"
                    onClick={() => setActiveTab("generate")}
                  >
                    Generate Some Ideas
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {savedIdeas.map((idea, index) => (
                    <Card key={index} className="feature-card-hover">
                      <CardHeader>
                        <CardTitle className="text-lg">{idea.split('\n')[0]}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-naughty-pink/90">{idea.split('\n').slice(1).join('\n')}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setSavedIdeas(savedIdeas.filter(i => i !== idea));
                            toast.success("Removed from saved ideas");
                          }}
                        >
                          Remove
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => shareIdea(idea)}
                        >
                          <Share size={16} className="mr-1" /> Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Popular Date Types Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-love text-center mb-8">Explore Date Ideas by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Romantic First Date Ideas", url: "#", icon: "❤️" },
              { title: "Budget-Friendly Dates", url: "#", icon: "💰" },
              { title: "Creative Dates for Shy People", url: "#", icon: "🌟" },
              { title: "Foodie Date Ideas", url: "#", icon: "🍽️" },
              { title: "Movie Buff Dates", url: "#", icon: "🎬" },
              { title: "Nature Lover Adventures", url: "#", icon: "🌲" },
            ].map((category, idx) => (
              <Card key={idx} className="hover:bg-black/20 transition-colors">
                <CardHeader className="pb-2">
                  <span className="text-2xl mb-2">{category.icon}</span>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" className="w-full" onClick={() => {
                    setActiveTab("generate");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>
                    Explore Ideas
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-love text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <Card className="romantic-card">
              <CardHeader>
                <CardTitle>How do I plan a memorable first date?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>A memorable first date comes from thoughtful planning around shared interests. Choose an activity that allows conversation, consider their interests, pick a comfortable environment, and have a backup plan. Our generator helps you find the perfect option based on your preferences!</p>
              </CardContent>
            </Card>
            
            <Card className="romantic-card">
              <CardHeader>
                <CardTitle>What if I'm on a tight budget?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Many wonderful first dates don't require much money! Consider coffee shops, parks, free museum days, hiking trails, or cooking together at home. Our generator has a "budget" filter specifically for affordable options that still create meaningful connections.</p>
              </CardContent>
            </Card>
            
            <Card className="romantic-card">
              <CardHeader>
                <CardTitle>How do I deal with first date nerves?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>First date anxiety is normal! Choose an activity you're comfortable with, prepare a few conversation topics, arrive early, focus on getting to know them rather than impressing them, and remember - they're probably nervous too! Our generator has options specifically for shy people.</p>
              </CardContent>
            </Card>
            
            <Card className="romantic-card">
              <CardHeader>
                <CardTitle>How long should a first date last?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>A good rule is 1-2 hours for a first date. This gives you enough time to get to know each other without the pressure of a long commitment. If things are going well, you can always extend, but having a natural endpoint allows either person to gracefully conclude the date.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FirstDateIdeasPage;
