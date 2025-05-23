
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { generateWithGemini } from '@/utils/geminiApi';
import { Heart, Music, Film, Instagram, Share2, MessageSquare } from 'lucide-react';

// Example data for the interest overlap
const exampleData = {
  musicOverlap: [
    { name: 'Indie Rock', value: 85 },
    { name: 'Jazz', value: 60 },
    { name: 'Pop', value: 40 },
    { name: 'Electronic', value: 75 },
  ],
  activityOverlap: [
    { name: 'Hiking', value: 90 },
    { name: 'Movies', value: 80 },
    { name: 'Cooking', value: 50 },
    { name: 'Gaming', value: 30 },
  ],
  compatibilityScore: 78,
  conversationStarters: [
    "Have you been to any indie rock concerts lately?",
    "What hiking trails have you explored around here?",
    "I noticed we both like Wes Anderson films. What's your favorite?",
    "Both of us have saved Bali travel guides. Have you been planning a trip there?"
  ],
  dateIdeas: [
    "Vinyl shopping at Record Paradise followed by coffee",
    "Day hike at Sunset Ridge Trail",
    "Indie film festival this weekend",
    "Cooking class focusing on Thai cuisine"
  ],
  surprisingConnections: [
    "Both saved posts about underwater photography",
    "Similar taste in sci-fi books",
    "Liked the same obscure coffee shops in town",
    "Both follow several astronomy accounts"
  ]
};

const COLORS = ['#9F7AEA', '#F56565', '#68D391', '#4FD1C5', '#63B3ED', '#FC8181'];

const InterestOverlapFinderPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const isEnglish = language === 'en';
  
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show loading state
    setIsAnalyzing(true);
    
    try {
      // In a real app, you would analyze social accounts
      // For now, we'll use our example data
      setTimeout(() => {
        setResult(exampleData);
        setIsAnalyzing(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error analyzing interests:", error);
      setIsAnalyzing(false);
    }
  };

  const generateMoreSuggestions = async () => {
    try {
      const prompt = `Generate 3 more unique date ideas based on these shared interests: Indie Rock, Hiking, Movies, and Travel. Make each suggestion specific and actionable.`;
      
      const response = await generateWithGemini({
        prompt,
        temperature: 0.8,
      });
      
      const newIdeas = response.split('\n').filter(idea => idea.trim().length > 0);
      
      if (result && newIdeas.length > 0) {
        setResult({
          ...result,
          dateIdeas: [...result.dateIdeas, ...newIdeas].slice(0, 8) // Keep max 8 ideas
        });
      }
    } catch (error) {
      console.error("Error generating suggestions:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            {isEnglish ? 'Interest Overlap Finder' : 'रुचि ओवरलैप फाइंडर'}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {isEnglish 
              ? 'Discover shared passions and hidden connections with your partner' 
              : 'अपने साथी के साथ साझा जुनून और छिपे हुए कनेक्शन खोजें'}
          </p>
          
          <div className="glass-card p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="partner1" className="text-white mb-2 block">
                    {isEnglish ? 'Your Name' : 'आपका नाम'}
                  </Label>
                  <Input
                    id="partner1"
                    placeholder={isEnglish ? 'Your name' : 'आपका नाम'}
                    value={partner1}
                    onChange={(e) => setPartner1(e.target.value)}
                    className="romantic-input"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="partner2" className="text-white mb-2 block">
                    {isEnglish ? 'Partner\'s Name' : 'साथी का नाम'}
                  </Label>
                  <Input
                    id="partner2"
                    placeholder={isEnglish ? 'Partner\'s name' : 'साथी का नाम'}
                    value={partner2}
                    onChange={(e) => setPartner2(e.target.value)}
                    className="romantic-input"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center bg-white/10 p-3 rounded-lg">
                  <Music className="text-naughty-pink mr-2" />
                  <span>{isEnglish ? 'Spotify' : 'स्पॉटिफाई'}</span>
                </div>
                <div className="flex items-center bg-white/10 p-3 rounded-lg">
                  <Film className="text-naughty-pink mr-2" />
                  <span>{isEnglish ? 'Netflix' : 'नेटफ्लिक्स'}</span>
                </div>
                <div className="flex items-center bg-white/10 p-3 rounded-lg">
                  <Instagram className="text-naughty-pink mr-2" />
                  <span>{isEnglish ? 'Instagram' : 'इंस्टाग्राम'}</span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto romantic-button" 
                disabled={isAnalyzing || !partner1 || !partner2}
              >
                {isAnalyzing 
                  ? (isEnglish ? 'Finding Connections...' : 'कनेक्शन खोज रहे हैं...') 
                  : (isEnglish ? 'Find Shared Interests' : 'साझा रुचियां खोजें')}
              </Button>
            </form>
          </div>
          
          {result && (
            <div>
              <div className="glass-card p-6 mb-8">
                <div className="flex justify-center mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-naughty-pink mb-2">{result.compatibilityScore}%</div>
                    <div className="text-lg">{isEnglish ? 'Compatibility Score' : 'संगतता स्कोर'}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <Button 
                    variant={activeTab === 'overview' ? 'default' : 'outline'} 
                    onClick={() => setActiveTab('overview')}
                  >
                    {isEnglish ? 'Overview' : 'अवलोकन'}
                  </Button>
                  <Button 
                    variant={activeTab === 'music' ? 'default' : 'outline'} 
                    onClick={() => setActiveTab('music')}
                  >
                    {isEnglish ? 'Music' : 'संगीत'}
                  </Button>
                  <Button 
                    variant={activeTab === 'activities' ? 'default' : 'outline'} 
                    onClick={() => setActiveTab('activities')}
                  >
                    {isEnglish ? 'Activities' : 'गतिविधियां'}
                  </Button>
                  <Button 
                    variant={activeTab === 'conversations' ? 'default' : 'outline'} 
                    onClick={() => setActiveTab('conversations')}
                  >
                    {isEnglish ? 'Conversation Starters' : 'बातचीत स्टार्टर'}
                  </Button>
                </div>
                
                {activeTab === 'overview' && (
                  <div>
                    <div className="bg-white/5 rounded-lg p-4 mb-4">
                      <h3 className="text-xl font-semibold mb-3 text-gradient">
                        {isEnglish ? 'Surprising Connections' : 'आश्चर्यजनक कनेक्शन'}
                      </h3>
                      <ul className="space-y-2">
                        {result.surprisingConnections.map((connection, index) => (
                          <li key={index} className="flex items-center">
                            <Heart className="text-naughty-pink mr-2 h-4 w-4" />
                            <span>{connection}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gradient">
                        {isEnglish ? 'Connection Map' : 'कनेक्शन मैप'}
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={result.musicOverlap.concat(result.activityOverlap)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name}) => name}
                            >
                              {result.musicOverlap.concat(result.activityOverlap).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'music' && (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={result.musicOverlap}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#999" />
                        <YAxis stroke="#999" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Overlap %" fill="#9F7AEA" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                
                {activeTab === 'activities' && (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={result.activityOverlap}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#999" />
                        <YAxis stroke="#999" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Overlap %" fill="#4FD1C5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                
                {activeTab === 'conversations' && (
                  <div className="space-y-4">
                    {result.conversationStarters.map((starter, index) => (
                      <div key={index} className="bg-white/5 p-3 rounded-lg flex items-start">
                        <MessageSquare className="text-naughty-pink mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <p>{starter}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="glass-card p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gradient">
                  {isEnglish ? 'Personalized Date Ideas' : 'व्यक्तिगत डेट आइडियास'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {result.dateIdeas.map((idea, index) => (
                    <Card key={index} className="bg-white/5 border-naughty-pink/20">
                      <CardContent className="pt-6">
                        <p>{idea}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={generateMoreSuggestions}
                    variant="outline"
                  >
                    {isEnglish ? 'Surprise Me With More Ideas' : 'मुझे और आइडियास से आश्चर्यचकित करें'}
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mb-4">
                <Button variant="ghost">
                  <Share2 className="mr-2" />
                  {isEnglish ? 'Share Results' : 'परिणाम शेयर करें'}
                </Button>
                <Button variant="romantic">
                  {isEnglish ? 'Get Detailed Report' : 'विस्तृत रिपोर्ट प्राप्त करें'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InterestOverlapFinderPage;
