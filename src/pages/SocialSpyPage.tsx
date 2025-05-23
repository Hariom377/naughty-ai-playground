
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { generateWithGemini } from '@/utils/geminiApi';
import { toast } from 'sonner';
import { Search, Users, AlertTriangle, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SocialSpyPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const isEnglish = language === 'en';
  
  const [friendNames, setFriendNames] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Sample data for demonstration
  const sampleResults = {
    topics: [
      { name: "Lisa", interests: ["Pottery", "Indie music", "Vegan cooking"], avoid: ["Politics", "Religion"] },
      { name: "Jake", interests: ["Basketball", "Marvel movies", "Craft beer"], avoid: ["Ex relationships", "Work stress"] },
      { name: "Maya", interests: ["Dogs", "Travel photography", "Yoga"], avoid: ["Family drama", "Diet talk"] }
    ],
    icebreakers: [
      "I heard you've been into pottery lately. What got you started with that?",
      "Jake, what did you think about the latest Marvel release?",
      "Maya, I saw some of your travel photos online - they're amazing! What's been your favorite destination?"
    ],
    groupDynamics: {
      description: "This friend group values authentic conversations and humor. They tend to tease each other affectionately but are supportive when it matters. The group has a long history together from college.",
      insiderJokes: ["The infamous camping trip disaster", "Lisa's pottery class explosion", "Jake's celebrity look-alike"]
    },
    practiceQuestions: [
      { question: "So how do you know [partner's name]?", suggestedAnswer: "We met through a mutual friend at a cooking class. I was immediately drawn to their sense of humor and we connected over our shared love of trying new recipes." },
      { question: "What do you do for work?", suggestedAnswer: "I work in digital marketing, focusing on social media strategies. It's creative and ever-changing, which keeps things interesting! What about you - do you enjoy what you do?" },
      { question: "Have you heard about the latest drama with [celebrity]?", suggestedAnswer: "I've only seen headlines honestly. I'm more into indie films than mainstream celebrity news. What kinds of movies or shows are you all into?" }
    ]
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!friendNames.trim()) {
      toast.error(isEnglish ? 'Please enter friend names' : 'कृपया दोस्तों के नाम दर्ज करें');
      return;
    }
    
    setIsAnalyzing(true);
    setResults(null);
    
    try {
      // In a real app, this would analyze social profiles
      // For now, we'll simulate a delay and use sample data
      setTimeout(() => {
        setResults(sampleResults);
        setIsAnalyzing(false);
      }, 2500);
      
    } catch (error) {
      console.error("Error analyzing social profiles:", error);
      setIsAnalyzing(false);
      toast.error(isEnglish ? 'Error analyzing profiles' : 'प्रोफाइल विश्लेषण में त्रुटि');
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < sampleResults.practiceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Cycle back to the first question
      setCurrentQuestion(0);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            {isEnglish ? 'Social Spy' : 'सोशल स्पाई'}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {isEnglish 
              ? 'Ace your meet-the-friends situations with insider knowledge' 
              : 'अंदरूनी जानकारी के साथ अपने मीट-द-फ्रेंड्स सिचुएशन्स में एक्सेल करें'}
          </p>
        </div>
        
        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Who will you be meeting?' : 'आप किससे मिलेंगे?'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="friend-names" className="text-white mb-2 block">
                {isEnglish ? 'Friend names (separated by commas)' : 'दोस्तों के नाम (कॉमा से अलग)'}
              </Label>
              <Input
                id="friend-names"
                placeholder={isEnglish ? 'e.g., Lisa, Jake, Maya' : 'जैसे, लिसा, जेक, माया'}
                value={friendNames}
                onChange={(e) => setFriendNames(e.target.value)}
                className="romantic-input"
              />
              <p className="text-xs text-gray-400 mt-1">
                {isEnglish 
                  ? 'We\'ll scan public profiles to help you prepare' 
                  : 'हम आपको तैयार करने में मदद के लिए पब्लिक प्रोफाइल को स्कैन करेंगे'}
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full md:w-auto romantic-button"
              disabled={isAnalyzing}
            >
              {isAnalyzing 
                ? (isEnglish ? 'Analyzing profiles...' : 'प्रोफाइल का विश्लेषण कर रहे हैं...') 
                : (isEnglish ? 'Create Friend Cheat Sheet' : 'फ्रेंड चीट शीट बनाएं')}
            </Button>
          </form>
        </div>
        
        {results && (
          <div className="animate-fade-in">
            <Tabs defaultValue="topics">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="topics">
                  {isEnglish ? 'Topics' : 'विषय'}
                </TabsTrigger>
                <TabsTrigger value="icebreakers">
                  {isEnglish ? 'Icebreakers' : 'आइसब्रेकर्स'}
                </TabsTrigger>
                <TabsTrigger value="dynamics">
                  {isEnglish ? 'Group Dynamics' : 'ग्रुप डायनमिक्स'}
                </TabsTrigger>
                <TabsTrigger value="practice">
                  {isEnglish ? 'Practice' : 'अभ्यास'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="topics" className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gradient">
                  {isEnglish ? 'Conversation Topics' : 'बातचीत के विषय'}
                </h3>
                
                <div className="space-y-6">
                  {results.topics.map((person, index) => (
                    <Card key={index} className="bg-white/5 border-naughty-pink/20">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Users className="mr-2 h-5 w-5 text-naughty-pink" />
                          {person.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">
                            {isEnglish ? 'Talk about:' : 'इन पर बात करें:'}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {person.interests.map((interest, i) => (
                              <span 
                                key={i} 
                                className="bg-naughty-purple/20 text-naughty-pink px-2 py-1 rounded text-sm"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                            <AlertTriangle className="mr-1 h-4 w-4 text-amber-500" />
                            {isEnglish ? 'Avoid:' : 'इनसे बचें:'}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {person.avoid.map((topic, i) => (
                              <span 
                                key={i} 
                                className="bg-red-900/20 text-red-300 px-2 py-1 rounded text-sm"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="icebreakers" className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gradient">
                  {isEnglish ? 'Suggested Icebreakers' : 'सुझाए गए आइसब्रेकर्स'}
                </h3>
                
                <div className="space-y-3">
                  {results.icebreakers.map((icebreaker, index) => (
                    <div 
                      key={index} 
                      className="bg-white/5 p-4 rounded-lg flex items-start"
                    >
                      <MessageSquare className="text-naughty-pink mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <p>{icebreaker}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    {isEnglish ? 'Generate More Icebreakers' : 'और आइसब्रेकर जेनरेट करें'}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="dynamics" className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gradient">
                  {isEnglish ? 'Group Dynamics' : 'ग्रुप डायनमिक्स'}
                </h3>
                
                <div className="bg-white/5 p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-2 text-naughty-pink">
                    {isEnglish ? 'Overall Vibe' : 'समग्र वाइब'}
                  </h4>
                  <p>{results.groupDynamics.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3 text-naughty-pink">
                    {isEnglish ? 'Inside Jokes (Be Aware)' : 'इनसाइड जोक्स (सावधान रहें)'}
                  </h4>
                  <ul className="space-y-2">
                    {results.groupDynamics.insiderJokes.map((joke, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-naughty-pink mr-2">•</span>
                        <span>{joke}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="practice" className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gradient">
                  {isEnglish ? 'Practice Q&A' : 'अभ्यास प्रश्नोत्तर'}
                </h3>
                
                <div className="mb-8">
                  <Card className="bg-white/5 border-naughty-pink/20 mb-4">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {isEnglish ? 'Question:' : 'प्रश्न:'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg">{results.practiceQuestions[currentQuestion].question}</p>
                    </CardContent>
                  </Card>
                  
                  {practiceMode && (
                    <Card className="bg-white/5 border-naughty-pink/30">
                      <CardHeader>
                        <CardTitle className="text-lg text-naughty-pink">
                          {isEnglish ? 'Suggested Answer:' : 'सुझाया गया उत्तर:'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{results.practiceQuestions[currentQuestion].suggestedAnswer}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant={practiceMode ? "default" : "outline"} 
                    onClick={() => setPracticeMode(!practiceMode)}
                  >
                    {practiceMode
                      ? (isEnglish ? 'Hide Answer' : 'उत्तर छिपाएं')
                      : (isEnglish ? 'Show Answer' : 'उत्तर दिखाएं')}
                  </Button>
                  
                  <Button onClick={handleNextQuestion}>
                    {isEnglish ? 'Next Question' : 'अगला प्रश्न'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center gap-4 my-8">
              <Button variant="outline">
                {isEnglish ? 'Download Friend Cheat Sheet' : 'फ्रेंड चीट शीट डाउनलोड करें'}
              </Button>
              <Button variant="romantic">
                {isEnglish ? 'Get Deep Dive Report' : 'डीप डाइव रिपोर्ट प्राप्त करें'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SocialSpyPage;
