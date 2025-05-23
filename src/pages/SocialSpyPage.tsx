
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
import { Users, Search, MessageSquare, Camera, AlertTriangle } from 'lucide-react';

const SocialSpyPage = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  
  const [partnerName, setPartnerName] = useState('');
  const [friendGroup, setFriendGroup] = useState('');
  const [occasion, setOccasion] = useState('');
  const [concerns, setConcerns] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [spyReport, setSpyReport] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!partnerName.trim() || !friendGroup.trim()) {
      toast.error(isEnglish ? 'Please fill in the required fields' : 'कृपया आवश्यक फ़ील्ड भरें');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const prompt = `Create a social intelligence guide for meeting a partner's friend group:

Partner's name: ${partnerName}
Friend group type: ${friendGroup}
Occasion: ${occasion || 'casual meetup'}
Specific concerns: ${concerns || 'making a good impression'}

Provide comprehensive advice including:
1. Conversation starters specific to this group
2. Topics to avoid or be careful with
3. How to show interest in their stories and inside jokes
4. Ways to bond with different personality types in the group
5. Red flags to watch for in group dynamics
6. How to handle awkward moments gracefully
7. Post-meetup follow-up strategies

Return in JSON format with fields: conversationStarters (array), topicsToAvoid (array), bondingTips (array), redFlags (array), awkwardMomentTips (array), followUpTips (array)`;

      const response = await generateWithGemini({
        prompt,
        temperature: 0.7,
      });
      
      try {
        const parsedResponse = JSON.parse(response);
        setSpyReport(parsedResponse);
      } catch (error) {
        // Fallback report
        setSpyReport({
          conversationStarters: [
            `"${partnerName} has told me so much about you all! I've been looking forward to meeting you."`,
            "What's the most embarrassing story you have about [partner's name]?",
            "How did you all become such close friends?",
            "What's your favorite memory together as a group?"
          ],
          topicsToAvoid: [
            "Past relationships or dating history",
            "Personal financial situations",
            "Controversial political topics",
            "Criticizing anyone not present"
          ],
          bondingTips: [
            "Ask follow-up questions to show genuine interest",
            "Share a funny story about yourself to break the ice",
            "Compliment something specific rather than generic praise",
            "Remember details they share and reference them later"
          ],
          redFlags: [
            "Friends seem overly protective or suspicious",
            "Constant inside jokes that exclude you deliberately",
            "Negative comments about your partner's past relationships",
            "Pressure to drink or participate in activities you're uncomfortable with"
          ],
          awkwardMomentTips: [
            "Use humor to deflect uncomfortable situations",
            "Ask your partner for help if you feel overwhelmed",
            "Excuse yourself briefly if you need a moment",
            "Focus on one person at a time rather than the whole group"
          ],
          followUpTips: [
            "Send a group message thanking them for including you",
            "Share photos from the event if appropriate",
            "Suggest a future activity you could all do together",
            "Follow them on social media if they seem receptive"
          ]
        });
      }
    } catch (error) {
      console.error("Error generating social spy report:", error);
      toast.error(isEnglish ? 'Error generating report' : 'रिपोर्ट जेनरेट करने में त्रुटि');
    } finally {
      setIsAnalyzing(false);
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
              ? 'Ace meet-the-friends scenarios with insider knowledge and social intelligence' 
              : 'अंदरूनी जानकारी और सामाजिक बुद्धिमत्ता के साथ दोस्तों से मिलने के परिदृश्य में उत्कृष्टता प्राप्त करें'}
          </p>
        </div>

        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Prepare for the Social Mission' : 'सामाजिक मिशन की तैयारी करें'}
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="partner-name" className="text-white mb-2 block">
                  {isEnglish ? 'Partner\'s Name *' : 'साथी का नाम *'}
                </Label>
                <Input
                  id="partner-name"
                  placeholder={isEnglish ? "Your partner's name" : "आपके साथी का नाम"}
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="romantic-input"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="occasion" className="text-white mb-2 block">
                  {isEnglish ? 'Type of Event' : 'इवेंट का प्रकार'}
                </Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger className="romantic-input">
                    <SelectValue placeholder={isEnglish ? "Select event type" : "इवेंट का प्रकार चुनें"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dinner-party">{isEnglish ? 'Dinner Party' : 'डिनर पार्टी'}</SelectItem>
                    <SelectItem value="casual-hangout">{isEnglish ? 'Casual Hangout' : 'कैज़ुअल हैंगआउट'}</SelectItem>
                    <SelectItem value="birthday-party">{isEnglish ? 'Birthday Party' : 'जन्मदिन पार्टी'}</SelectItem>
                    <SelectItem value="wedding-event">{isEnglish ? 'Wedding/Formal Event' : 'शादी/औपचारिक इवेंट'}</SelectItem>
                    <SelectItem value="group-vacation">{isEnglish ? 'Group Vacation' : 'ग्रुप वेकेशन'}</SelectItem>
                    <SelectItem value="first-meeting">{isEnglish ? 'First Time Meeting' : 'पहली बार मिलना'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="friend-group" className="text-white mb-2 block">
                {isEnglish ? 'Describe the friend group *' : 'मित्र समूह का वर्णन करें *'}
              </Label>
              <Textarea
                id="friend-group"
                placeholder={isEnglish ? "College friends, work colleagues, childhood friends, etc. Include ages, interests, personalities..." : "कॉलेज के दोस्त, कार्यक्षेत्र के सहयोगी, बचपन के दोस्त, आदि। उम्र, रुचियां, व्यक्तित्व शामिल करें..."}
                value={friendGroup}
                onChange={(e) => setFriendGroup(e.target.value)}
                className="romantic-input min-h-[100px]"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="concerns" className="text-white mb-2 block">
                {isEnglish ? 'Any specific concerns or goals?' : 'कोई विशिष्ट चिंताएं या लक्ष्य?'}
              </Label>
              <Textarea
                id="concerns"
                placeholder={isEnglish ? "What are you worried about? What impression do you want to make? Any known group dynamics..." : "आप किस बात से चिंतित हैं? आप क्या प्रभाव डालना चाहते हैं? कोई ज्ञात समूह गतिशीलता..."}
                value={concerns}
                onChange={(e) => setConcerns(e.target.value)}
                className="romantic-input min-h-[80px]"
              />
            </div>
            
            <Button 
              onClick={handleAnalyze} 
              className="w-full md:w-auto romantic-button"
              disabled={isAnalyzing || !partnerName.trim() || !friendGroup.trim()}
            >
              <Search className="mr-2 h-4 w-4" />
              {isAnalyzing 
                ? (isEnglish ? 'Gathering intel...' : 'जानकारी इकट्ठा कर रहे हैं...') 
                : (isEnglish ? 'Generate Social Intelligence Report' : 'सामाजिक बुद्धिमत्ता रिपोर्ट जेनरेट करें')}
            </Button>
          </div>
        </div>

        {spyReport && (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-white/5 border-naughty-pink/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-naughty-pink" />
                  {isEnglish ? 'Conversation Starters' : 'बातचीत शुरू करने वाले'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {spyReport.conversationStarters.map((starter: string, index: number) => (
                    <div key={index} className="bg-white/5 p-3 rounded-lg">
                      <p className="italic">"{starter}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-yellow-400/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-400" />
                  {isEnglish ? 'Topics to Avoid' : 'बचने योग्य विषय'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {spyReport.topicsToAvoid.map((topic: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-400 mr-2">⚠️</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-green-400/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-green-400" />
                  {isEnglish ? 'Bonding Strategies' : 'बंधन रणनीतियां'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {spyReport.bondingTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-400 mr-2">✅</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-red-400/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                  {isEnglish ? 'Red Flags to Watch For' : 'चेतावनी के संकेत'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {spyReport.redFlags.map((flag: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-400 mr-2">🚩</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-blue-400/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5 text-blue-400" />
                  {isEnglish ? 'Handling Awkward Moments' : 'अजीब पलों को संभालना'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {spyReport.awkwardMomentTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-2">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-purple-400/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-purple-400" />
                  {isEnglish ? 'Post-Event Follow-Up' : 'इवेंट के बाद फॉलो-अप'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {spyReport.followUpTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-400 mr-2">📱</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button variant="romantic">
                {isEnglish ? 'Save My Social Strategy' : 'मेरी सामाजिक रणनीति सेव करें'}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-naughty-pink mb-4">
            {isEnglish 
              ? 'Premium users get detailed personality analysis and custom conversation scripts!' 
              : 'प्रीमियम उपयोगकर्ताओं को विस्तृत व्यक्तित्व विश्लेषण और कस्टम बातचीत स्क्रिप्ट मिलती हैं!'}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SocialSpyPage;
