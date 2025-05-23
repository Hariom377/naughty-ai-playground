
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import LoginModal from '@/components/auth/LoginModal';
import { Loader2, SendHorizonal } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const mediationResponses = [
  {
    issue: "partner always on phone",
    advice: {
      en: "It sounds like you're feeling disconnected when your partner is on their phone. Consider establishing phone-free times during the day where you both put away devices and connect with each other. Express how you feel using 'I' statements rather than accusations. For example, 'I feel overlooked when we're together but your attention is on your phone' instead of 'You're always ignoring me for your phone.' Ask your partner if there's something specific they're doing on their phone that's important to them, and see if you can find a compromise.",
      hi: "ऐसा लगता है कि जब आपका पार्टनर फोन पर होता है तो आपको अलग-थलग महसूस होता है। दिन के दौरान फोन-मुक्त समय स्थापित करने पर विचार करें जहां आप दोनों डिवाइस को दूर रखते हैं और एक-दूसरे से जुड़ते हैं। आरोप लगाने के बजाय 'मैं' कथनों का उपयोग करके अपनी भावनाओं को व्यक्त करें। उदाहरण के लिए, 'जब हम साथ होते हैं लेकिन आपका ध्यान आपके फोन पर होता है तो मुझे अनदेखा महसूस होता है' इसके बजाय 'आप हमेशा अपने फोन के लिए मुझे नजरअंदाज करते हैं।' अपने पार्टनर से पूछें कि क्या वे अपने फोन पर कुछ विशेष कर रहे हैं जो उनके लिए महत्वपूर्ण है, और देखें कि क्या आप कोई समझौता कर सकते हैं।"
    }
  },
  {
    issue: "disagreements about money",
    advice: {
      en: "Financial disagreements are one of the most common sources of relationship conflict. Start by setting aside a calm time to discuss your financial values and goals without judgment. Create a budget together that respects both partners' priorities. Consider having both joint and individual accounts for different purposes. Schedule regular 'money dates' to review finances and adjust your approach as needed. Remember that financial management styles often come from our upbringing, so understanding each other's money backgrounds can help build empathy.",
      hi: "वित्तीय असहमति रिश्ते के संघर्ष के सबसे आम स्रोतों में से एक है। बिना किसी निर्णय के अपने वित्तीय मूल्यों और लक्ष्यों पर चर्चा करने के लिए एक शांत समय निर्धारित करके शुरू करें। एक साथ एक बजट बनाएं जो दोनों पार्टनर्स की प्राथमिकताओं का सम्मान करता हो। विभिन्न उद्देश्यों के लिए संयुक्त और व्यक्तिगत दोनों खाते रखने पर विचार करें। वित्त की समीक्षा करने और आवश्यकतानुसार अपने दृष्टिकोण को समायोजित करने के लिए नियमित 'मनी डेट्स' शेड्यूल करें। याद रखें कि वित्तीय प्रबंधन शैलियाँ अक्सर हमारे पालन-पोषण से आती हैं, इसलिए एक-दूसरे की धन पृष्ठभूमि को समझना सहानुभूति बनाने में मदद कर सकता है।"
    }
  },
  {
    issue: "different communication styles",
    advice: {
      en: "Different communication styles can create misunderstandings. One person might need to process their thoughts privately before discussing, while the other prefers to talk through issues immediately. Try to identify your communication patterns and share them with each other. When conflicts arise, use a 'speaker-listener' technique where one person speaks uninterrupted while the other listens actively, then switch roles. Validate each other's feelings even when you disagree with their perspective. Consider taking a communication styles quiz together to better understand your differences.",
      hi: "अलग-अलग संचार शैलियाँ गलतफहमी पैदा कर सकती हैं। एक व्यक्ति को चर्चा करने से पहले अपने विचारों को निजी तौर पर संसाधित करने की आवश्यकता हो सकती है, जबकि दूसरा व्यक्ति तुरंत मुद्दों पर बात करना पसंद करता है। अपने संचार पैटर्न की पहचान करने और उन्हें एक-दूसरे के साथ साझा करने का प्रयास करें। जब संघर्ष उत्पन्न होते हैं, तो 'स्पीकर-लिसनर' तकनीक का उपयोग करें जहां एक व्यक्ति बिना रुकावट के बोलता है जबकि दूसरा सक्रिय रूप से सुनता है, फिर भूमिकाएं बदलें। भले ही आप उनके दृष्टिकोण से असहमत हों, एक-दूसरे की भावनाओं को मान्य करें। अपनी विभिन्नताओं को बेहतर ढंग से समझने के लिए एक साथ एक संचार शैली क्विज लेने पर विचार करें।"
    }
  },
  {
    issue: "division of household chores",
    advice: {
      en: "Conflicts over household responsibilities are common. Start by listing all household tasks and how much time each takes. Then have an honest conversation about which tasks each of you prefers or dislikes. Create a fair division based on preferences, skills, and available time rather than gender roles. Consider rotating disliked chores so one person isn't always stuck with them. Express appreciation when your partner completes tasks, and avoid criticizing their method if the result is acceptable. Schedule a monthly check-in to see if the arrangement is working for both of you.",
      hi: "घरेलू जिम्मेदारियों पर संघर्ष आम हैं। सभी घरेलू कार्यों और प्रत्येक में कितना समय लगता है, इसकी सूची बनाकर शुरू करें। फिर इस बारे में ईमानदार बातचीत करें कि आप में से प्रत्येक कौन से कार्य पसंद करता है या नापसंद करता है। लिंग भूमिकाओं के बजाय प्राथमिकताओं, कौशल और उपलब्ध समय के आधार पर एक निष्पक्ष विभाजन बनाएं। नापसंदीदा कामों को रोटेट करने पर विचार करें ताकि एक व्यक्ति हमेशा उनके साथ फंसा न रहे। जब आपका पार्टनर कार्य पूरा करता है तो प्रशंसा व्यक्त करें, और यदि परिणाम स्वीकार्य है तो उनके तरीके की आलोचना करने से बचें। यह देखने के लिए मासिक चेक-इन शेड्यूल करें कि क्या व्यवस्था आप दोनों के लिए काम कर रही है।"
    }
  },
  {
    issue: "jealousy",
    advice: {
      en: "Jealousy often stems from insecurity or past hurt. If you're feeling jealous, try to identify the specific fear behind it - are you afraid of being abandoned, betrayed, or not being enough? Share your feelings with your partner without making accusations. If your partner is jealous, listen with empathy and ask what would help them feel more secure. Work together to establish reasonable boundaries that respect both individuals' needs for security and independence. Consider whether there are ways you can build trust through transparency and consistent behavior.",
      hi: "ईर्ष्या अक्सर असुरक्षा या पिछले दर्द से उत्पन्न होती है। यदि आपको ईर्ष्या महसूस हो रही है, तो उसके पीछे के विशिष्ट भय की पहचान करने का प्रयास करें - क्या आपको त्याग दिए जाने, धोखा दिए जाने, या पर्याप्त न होने का डर है? आरोप लगाए बिना अपनी भावनाओं को अपने पार्टनर के साथ साझा करें। यदि आपका पार्टनर ईर्ष्यालु है, तो सहानुभूति के साथ सुनें और पूछें कि उन्हें अधिक सुरक्षित महसूस करने में क्या मदद करेगा। दोनों व्यक्तियों की सुरक्षा और स्वतंत्रता की आवश्यकताओं का सम्मान करने वाली उचित सीमाएं स्थापित करने के लिए एक साथ काम करें। विचार करें कि क्या ऐसे तरीके हैं जिनसे आप पारदर्शिता और सुसंगत व्यवहार के माध्यम से विश्वास बना सकते हैं।"
    }
  }
];

const ArgumentMediatorPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const [person1Input, setPerson1Input] = useState('');
  const [person2Input, setPerson2Input] = useState('');
  const [issue, setIssue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mediationResult, setMediationResult] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const isEnglish = language === 'en';
  const title = isEnglish ? "Argument Mediator AI" : "तर्क मध्यस्थ AI";
  const description = isEnglish 
    ? "Get help resolving relationship disagreements with a neutral third perspective."
    : "एक तटस्थ तीसरे दृष्टिकोण के साथ रिश्ते के मतभेदों को हल करने में मदद प्राप्त करें।";

  const handleSubmit = () => {
    if (!user.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!issue.trim()) {
      toast.error(isEnglish ? "Please describe the issue" : "कृपया समस्या का वर्णन करें");
      return;
    }

    setIsGenerating(true);

    // Find a matching response or use default
    setTimeout(() => {
      let foundResponse = mediationResponses.find(res => 
        issue.toLowerCase().includes(res.issue)
      );

      if (foundResponse) {
        setMediationResult(foundResponse.advice[language as keyof typeof foundResponse.advice]);
      } else {
        // Default response if no matching issue found
        setMediationResult(isEnglish 
          ? "Consider setting aside a time to discuss this issue when you're both calm. Use 'I' statements to express how you feel without blaming each other. Try to understand each other's perspective before proposing solutions. Remember that compromise often means both parties need to adjust their expectations. Focus on the specific issue at hand rather than bringing up past conflicts. Take breaks if the conversation becomes too heated, and return to it when you're both ready to listen."
          : "इस मुद्दे पर चर्चा करने के लिए तब समय निकालने पर विचार करें जब आप दोनों शांत हों। एक-दूसरे को दोष दिए बिना अपनी भावनाओं को व्यक्त करने के लिए 'मैं' कथनों का उपयोग करें। समाधान प्रस्तावित करने से पहले एक-दूसरे के दृष्टिकोण को समझने का प्रयास करें। याद रखें कि समझौता अक्सर इसका मतलब होता है कि दोनों पक्षों को अपनी अपेक्षाओं को समायोजित करने की आवश्यकता होती है। पिछले संघर्षों को लाए बिना हाथ में मौजूद विशिष्ट मुद्दे पर ध्यान केंद्रित करें। यदि बातचीत बहुत गर्म हो जाती है तो ब्रेक लें, और जब आप दोनों सुनने के लिए तैयार हों तो इसे फिर से शुरू करें।"
        );
      }

      setIsGenerating(false);
    }, 1500);
  };

  const resetForm = () => {
    setPerson1Input('');
    setPerson2Input('');
    setIssue('');
    setMediationResult(null);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{title}</h1>
        <p className="text-gray-300 mb-8">{description}</p>

        <div className="mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>
                {isEnglish ? "Describe Your Disagreement" : "अपने मतभेद का वर्णन करें"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="person1" className="text-naughty-pink mb-2 block">
                  {isEnglish ? "Person 1 Perspective (optional)" : "व्यक्ति 1 का दृष्टिकोण (वैकल्पिक)"}
                </Label>
                <Textarea 
                  id="person1"
                  placeholder={isEnglish ? "I feel that..." : "मुझे लगता है कि..."}
                  className="h-24 bg-black/20 border-white/10"
                  value={person1Input}
                  onChange={(e) => setPerson1Input(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="person2" className="text-naughty-pink mb-2 block">
                  {isEnglish ? "Person 2 Perspective (optional)" : "व्यक्ति 2 का दृष्टिकोण (वैकल्पिक)"}
                </Label>
                <Textarea 
                  id="person2"
                  placeholder={isEnglish ? "I believe that..." : "मेरा मानना है कि..."}
                  className="h-24 bg-black/20 border-white/10"
                  value={person2Input}
                  onChange={(e) => setPerson2Input(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="issue" className="text-naughty-pink mb-2 block">
                  {isEnglish ? "Main Issue or Topic of Disagreement" : "मतभेद का मुख्य मुद्दा या विषय"}
                </Label>
                <Textarea 
                  id="issue"
                  placeholder={isEnglish ? "Briefly describe what you're disagreeing about..." : "संक्षेप में वर्णन करें कि आप किस बारे में असहमत हैं..."}
                  className="h-24 bg-black/20 border-white/10"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-4">
              <Button 
                onClick={handleSubmit} 
                disabled={isGenerating || !issue.trim()} 
                className="romantic-button w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    {isEnglish ? "Analyzing..." : "विश्लेषण हो रहा है..."}
                  </>
                ) : (
                  <>
                    <SendHorizonal size={16} className="mr-2" />
                    {isEnglish ? "Get Mediation Advice" : "मध्यस्थता सलाह प्राप्त करें"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {mediationResult && (
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>
                {isEnglish ? "Mediation Advice" : "मध्यस्थता सलाह"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/20 p-6 rounded-lg">
                <p className="text-white whitespace-pre-line leading-relaxed">
                  {mediationResult}
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-4 flex justify-end">
              <Button
                variant="outline"
                className="border-naughty-pink text-naughty-pink"
                onClick={resetForm}
              >
                {isEnglish ? "Start New Mediation" : "नई मध्यस्थता शुरू करें"}
              </Button>
            </CardFooter>
          </Card>
        )}

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>
              {isEnglish ? "Healthy Conflict Resolution Tips" : "स्वस्थ संघर्ष समाधान टिप्स"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="text-naughty-pink font-semibold mb-2">
                  {isEnglish ? "Listen Actively" : "सक्रिय रूप से सुनें"}
                </h3>
                <p className="text-gray-300 text-sm">
                  {isEnglish
                    ? "Give your full attention, maintain eye contact, and try to understand their perspective without interrupting."
                    : "अपना पूरा ध्यान दें, आंखों का संपर्क बनाए रखें, और बिना बाधा डाले उनके दृष्टिकोण को समझने का प्रयास करें।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="text-naughty-pink font-semibold mb-2">
                  {isEnglish ? "Use 'I' Statements" : "'मैं' कथनों का उपयोग करें"}
                </h3>
                <p className="text-gray-300 text-sm">
                  {isEnglish
                    ? "Express feelings using 'I feel...' rather than 'You always...' to avoid blame and defensiveness."
                    : "दोष और रक्षात्मकता से बचने के लिए 'आप हमेशा...' के बजाय 'मुझे लगता है...' का उपयोग करके भावनाओं को व्यक्त करें।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="text-naughty-pink font-semibold mb-2">
                  {isEnglish ? "Take Breaks When Needed" : "जब आवश्यक हो ब्रेक लें"}
                </h3>
                <p className="text-gray-300 text-sm">
                  {isEnglish
                    ? "If emotions escalate, agree to pause and return when both parties are calmer."
                    : "यदि भावनाएं बढ़ जाती हैं, तो रुकने और जब दोनों पक्ष शांत हों तब वापस आने पर सहमत हों।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="text-naughty-pink font-semibold mb-2">
                  {isEnglish ? "Focus on One Issue" : "एक मुद्दे पर ध्यान केंद्रित करें"}
                </h3>
                <p className="text-gray-300 text-sm">
                  {isEnglish
                    ? "Address one problem at a time rather than bringing up multiple past issues."
                    : "कई पिछले मुद्दों को उठाने के बजाय एक समय में एक समस्या का समाधान करें।"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </Layout>
  );
};

export default ArgumentMediatorPage;
