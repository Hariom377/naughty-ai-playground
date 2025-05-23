
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateWithGemini } from '@/utils/geminiApi';
import { toast } from 'sonner';
import { Heart, Shield, Trash2, RefreshCw, CheckCircle, X } from 'lucide-react';

const ExDetoxPage = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  
  const [exName, setExName] = useState('');
  const [situation, setSituation] = useState('');
  const [feelings, setFeelings] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detoxPlan, setDetoxPlan] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const detoxSteps = [
    { title: 'Digital Cleanse', icon: <Trash2 className="h-5 w-5" /> },
    { title: 'Emotional Processing', icon: <Heart className="h-5 w-5" /> },
    { title: 'Mindset Shift', icon: <RefreshCw className="h-5 w-5" /> },
    { title: 'Self-Care Routine', icon: <Shield className="h-5 w-5" /> },
    { title: 'Moving Forward', icon: <CheckCircle className="h-5 w-5" /> }
  ];

  const handleAnalyze = async () => {
    if (!situation.trim() || !feelings.trim()) {
      toast.error(isEnglish ? 'Please describe your situation and feelings' : 'कृपया अपनी स्थिति और भावनाओं का वर्णन करें');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const prompt = `Create a personalized ex-detox plan for someone dealing with:

Ex's name: ${exName || 'Ex'}
Situation: ${situation}
Current feelings: ${feelings}

Provide a comprehensive detox plan with:
1. Immediate actions to take (digital cleanup, physical reminders)
2. Emotional processing techniques
3. Mindset reframing exercises
4. Self-care activities
5. Long-term healing strategies
6. Red flags to watch for
7. Daily affirmations

Return in JSON format with fields: immediateActions (array), emotionalTechniques (array), mindsetShifts (array), selfCare (array), longTerm (array), redFlags (array), affirmations (array)`;

      const response = await generateWithGemini({
        prompt,
        temperature: 0.7,
      });
      
      try {
        const parsedResponse = JSON.parse(response);
        setDetoxPlan(parsedResponse);
      } catch (error) {
        // Fallback plan
        setDetoxPlan({
          immediateActions: [
            "Delete or archive photos together",
            "Unfollow on social media platforms",
            "Remove their contact information",
            "Put away physical reminders and gifts"
          ],
          emotionalTechniques: [
            "Journal your feelings without judgment",
            "Practice the 5-4-3-2-1 grounding technique when overwhelmed",
            "Allow yourself to feel emotions but set time limits",
            "Talk to trusted friends or a therapist"
          ],
          mindsetShifts: [
            "Focus on what you learned from the relationship",
            "Remember your worth isn't defined by this relationship",
            "View this as an opportunity for growth",
            "Practice gratitude for the good memories without dwelling"
          ],
          selfCare: [
            "Establish a morning routine that energizes you",
            "Try a new hobby or return to an old passion",
            "Exercise regularly to boost endorphins",
            "Prioritize sleep and nutrition"
          ],
          longTerm: [
            "Build a support network of friends and family",
            "Work on personal goals and aspirations",
            "Consider therapy if feelings persist",
            "Take time before entering new relationships"
          ],
          redFlags: [
            "Constantly checking their social media",
            "Trying to make them jealous",
            "Reaching out when feeling lonely",
            "Comparing new potential partners to them"
          ],
          affirmations: [
            "I am worthy of love and respect",
            "This ending makes space for something better",
            "I am growing stronger every day",
            "My happiness comes from within"
          ]
        });
      }
    } catch (error) {
      console.error("Error creating detox plan:", error);
      toast.error(isEnglish ? 'Error creating detox plan' : 'डिटॉक्स प्लान बनाने में त्रुटि');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const completeStep = () => {
    if (currentStep < detoxSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      toast.success(isEnglish ? 'Step completed!' : 'चरण पूरा!');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            {isEnglish ? 'Ex Detox' : 'एक्स डिटॉक्स'}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {isEnglish 
              ? 'Overcome jealousy and comparisons to exes with a personalized healing plan' 
              : 'व्यक्तिगत उपचार योजना के साथ पूर्व प्रेमियों से ईर्ष्या और तुलना पर काबू पाएं'}
          </p>
        </div>

        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Create Your Detox Plan' : 'अपना डिटॉक्स प्लान बनाएं'}
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="ex-name" className="text-white mb-2 block">
                {isEnglish ? 'Ex\'s Name (Optional)' : 'एक्स का नाम (वैकल्पिक)'}
              </Label>
              <Input
                id="ex-name"
                placeholder={isEnglish ? "Their name" : "उनका नाम"}
                value={exName}
                onChange={(e) => setExName(e.target.value)}
                className="romantic-input"
              />
            </div>
            
            <div>
              <Label htmlFor="situation" className="text-white mb-2 block">
                {isEnglish ? 'Describe your situation' : 'अपनी स्थिति का वर्णन करें'}
              </Label>
              <Textarea
                id="situation"
                placeholder={isEnglish ? "What happened? How long were you together? Current relationship status..." : "क्या हुआ? आप कितने समय तक साथ थे? वर्तमान रिश्ते की स्थिति..."}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="romantic-input min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="feelings" className="text-white mb-2 block">
                {isEnglish ? 'How are you feeling right now?' : 'आप अभी कैसा महसूस कर रहे हैं?'}
              </Label>
              <Textarea
                id="feelings"
                placeholder={isEnglish ? "Describe your emotions, triggers, what you're struggling with..." : "अपनी भावनाओं, ट्रिगर्स का वर्णन करें, आप किस चीज़ से जूझ रहे हैं..."}
                value={feelings}
                onChange={(e) => setFeelings(e.target.value)}
                className="romantic-input min-h-[100px]"
              />
            </div>
            
            <Button 
              onClick={handleAnalyze} 
              className="w-full md:w-auto romantic-button"
              disabled={isAnalyzing || !situation.trim() || !feelings.trim()}
            >
              {isAnalyzing 
                ? (isEnglish ? 'Creating your plan...' : 'आपका प्लान बना रहे हैं...') 
                : (isEnglish ? 'Create Detox Plan' : 'डिटॉक्स प्लान बनाएं')}
            </Button>
          </div>
        </div>

        {detoxPlan && (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-white/5 border-naughty-pink/20">
              <CardHeader>
                <CardTitle className="text-gradient">
                  {isEnglish ? 'Your Healing Journey' : 'आपकी उपचार यात्रा'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      {isEnglish ? 'Progress' : 'प्रगति'}
                    </span>
                    <span className="text-sm text-gray-400">
                      {currentStep + 1}/{detoxSteps.length}
                    </span>
                  </div>
                  <Progress value={((currentStep + 1) / detoxSteps.length) * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {detoxSteps.map((step, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg text-center ${
                        index <= currentStep 
                          ? 'bg-naughty-purple/20 text-naughty-pink' 
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        {index < currentStep ? <CheckCircle className="h-5 w-5" /> : step.icon}
                      </div>
                      <p className="text-xs">{step.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {currentStep === 0 && (
              <Card className="bg-white/5 border-naughty-pink/20">
                <CardHeader>
                  <CardTitle>{isEnglish ? 'Step 1: Digital Cleanse' : 'चरण 1: डिजिटल सफाई'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {detoxPlan.immediateActions.map((action: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <X className="text-red-400 mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={completeStep} variant="outline">
                    {isEnglish ? 'Complete Digital Cleanse' : 'डिजिटल सफाई पूरी करें'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 1 && (
              <Card className="bg-white/5 border-naughty-pink/20">
                <CardHeader>
                  <CardTitle>{isEnglish ? 'Step 2: Emotional Processing' : 'चरण 2: भावनात्मक प्रसंस्करण'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {detoxPlan.emotionalTechniques.map((technique: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Heart className="text-pink-400 mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{technique}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={completeStep} variant="outline">
                    {isEnglish ? 'Practice Emotional Techniques' : 'भावनात्मक तकनीकों का अभ्यास करें'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="bg-white/5 border-naughty-pink/20">
                <CardHeader>
                  <CardTitle>{isEnglish ? 'Step 3: Mindset Shift' : 'चरण 3: मानसिकता में बदलाव'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {detoxPlan.mindsetShifts.map((shift: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <RefreshCw className="text-blue-400 mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{shift}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={completeStep} variant="outline">
                    {isEnglish ? 'Embrace New Mindset' : 'नई मानसिकता अपनाएं'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="bg-white/5 border-naughty-pink/20">
                <CardHeader>
                  <CardTitle>{isEnglish ? 'Step 4: Self-Care Routine' : 'चरण 4: स्व-देखभाल दिनचर्या'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {detoxPlan.selfCare.map((care: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Shield className="text-green-400 mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{care}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={completeStep} variant="outline">
                    {isEnglish ? 'Start Self-Care Routine' : 'स्व-देखभाल दिनचर्या शुरू करें'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card className="bg-white/5 border-naughty-pink/20">
                <CardHeader>
                  <CardTitle>{isEnglish ? 'Step 5: Moving Forward' : 'चरण 5: आगे बढ़ना'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {detoxPlan.longTerm.map((strategy: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-purple-400 mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{strategy}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-naughty-pink mb-2">
                      {isEnglish ? 'Daily Affirmations' : 'दैनिक प्रेरणाएं'}
                    </h4>
                    <ul className="space-y-1">
                      {detoxPlan.affirmations.map((affirmation: string, index: number) => (
                        <li key={index} className="text-sm italic">"{affirmation}"</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-white/5 border-red-400/20">
              <CardHeader>
                <CardTitle className="text-red-400">
                  {isEnglish ? 'Red Flags to Watch For' : 'चेतावनी के संकेत'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {detoxPlan.redFlags.map((flag: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="text-red-400 mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExDetoxPage;
