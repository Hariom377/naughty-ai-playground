
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';

const loveLanguages = [
  {
    id: "words",
    name: { en: "Words of Affirmation", hi: "प्रशंसा के शब्द" },
    description: { 
      en: "You value verbal acknowledgments of affection, including frequent 'I love you's, compliments, words of appreciation, verbal encouragement, and kind and humble words.",
      hi: "आप स्नेह के मौखिक स्वीकृतियों को महत्व देते हैं, जिसमें लगातार 'मैं आपसे प्यार करता/करती हूँ', प्रशंसा, सराहना के शब्द, मौखिक प्रोत्साहन, और दयालु शब्द शामिल हैं।"
    },
    icon: "💬"
  },
  {
    id: "quality",
    name: { en: "Quality Time", hi: "गुणवत्तापूर्ण समय" },
    description: { 
      en: "You value giving someone your undivided attention, sharing quality conversation, creating quality memories, spending time together, and experiencing quality activities together.",
      hi: "आप किसी को अपना पूरा ध्यान देने, गुणवत्तापूर्ण बातचीत साझा करने, गुणवत्तापूर्ण यादें बनाने, एक साथ समय बिताने और एक साथ गुणवत्तापूर्ण गतिविधियों का अनुभव करने को महत्व देते हैं।"
    },
    icon: "⏰"
  },
  {
    id: "gifts",
    name: { en: "Receiving Gifts", hi: "उपहार प्राप्त करना" },
    description: { 
      en: "You value the thoughtfulness, effort, and love behind gifts. It's not about materialism, but about the symbolic thought that goes into the gesture.",
      hi: "आप उपहारों के पीछे की सोच, प्रयास और प्यार को महत्व देते हैं। यह भौतिकवाद के बारे में नहीं है, बल्कि इस इशारे के पीछे की प्रतीकात्मक सोच के बारे में है।"
    },
    icon: "🎁"
  },
  {
    id: "service",
    name: { en: "Acts of Service", hi: "सेवा के कार्य" },
    description: { 
      en: "You value when someone shows their love by helping you with tasks, easing your burden and showing they care through actions.",
      hi: "आप महत्व देते हैं जब कोई आपको कामों में मदद करके, आपका बोझ कम करके और कार्यों के माध्यम से देखभाल दिखाकर अपना प्यार दिखाता है।"
    },
    icon: "🛠️"
  },
  {
    id: "touch",
    name: { en: "Physical Touch", hi: "शारीरिक स्पर्श" },
    description: { 
      en: "You value appropriate touch as a powerful communicator of love. Hugs, holding hands, thoughtful touches on the arm or shoulder, or a simple presence can be reassuring.",
      hi: "आप प्यार के शक्तिशाली संवादक के रूप में उचित स्पर्श को महत्व देते हैं। गले लगाना, हाथ पकड़ना, बांह या कंधे पर विचारपूर्ण स्पर्श, या एक साधारण उपस्थिति आश्वस्त कर सकती है।"
    },
    icon: "🤗"
  }
];

const questions = [
  {
    id: 1,
    text: { 
      en: "After a long day, I would prefer my partner to:", 
      hi: "एक लंबे दिन के बाद, मैं चाहूंगा/चाहूंगी कि मेरा पार्टनर:" 
    },
    options: [
      { value: "words", text: { en: "Tell me how much they appreciate me", hi: "मुझे बताए कि वे मेरी कितनी सराहना करते हैं" } },
      { value: "quality", text: { en: "Spend time with me without distractions", hi: "बिना किसी व्यवधान के मेरे साथ समय बिताएं" } },
      { value: "gifts", text: { en: "Surprise me with something small they know I'd like", hi: "मुझे कुछ छोटी चीज़ से सरप्राइज़ करें जो वे जानते हैं कि मुझे पसंद आएगी" } },
      { value: "service", text: { en: "Help me with a chore that needs to be done", hi: "मुझे एक ऐसे काम में मदद करें जिसे किया जाना है" } },
      { value: "touch", text: { en: "Give me a massage or a long hug", hi: "मुझे मालिश करें या लंबे समय तक गले लगाएं" } }
    ]
  },
  {
    id: 2,
    text: { 
      en: "I feel most loved when my partner:", 
      hi: "मुझे सबसे ज्यादा प्यार महसूस होता है जब मेरा पार्टनर:" 
    },
    options: [
      { value: "service", text: { en: "Does something helpful for me", hi: "मेरे लिए कुछ मददगार करता/करती है" } },
      { value: "gifts", text: { en: "Gives me a thoughtful gift", hi: "मुझे एक विचारपूर्ण उपहार देता/देती है" } },
      { value: "words", text: { en: "Compliments me or says kind words", hi: "मेरी प्रशंसा करता/करती है या दयालु शब्द कहता/कहती है" } },
      { value: "quality", text: { en: "Gives me their undivided attention", hi: "मुझे अपना पूरा ध्यान देता/देती है" } },
      { value: "touch", text: { en: "Holds my hand or touches me affectionately", hi: "मेरा हाथ पकड़ता/पकड़ती है या स्नेहपूर्वक मुझे छूता/छूती है" } }
    ]
  },
  {
    id: 3,
    text: { 
      en: "When I've had a tough day, what would make me feel better is:", 
      hi: "जब मेरा दिन कठिन रहा हो, जो मुझे बेहतर महसूस कराएगा वह है:" 
    },
    options: [
      { value: "quality", text: { en: "Spending quiet time together", hi: "एक साथ शांत समय बिताना" } },
      { value: "touch", text: { en: "Physical comfort like a hug or cuddle", hi: "गले लगाने या सटकर बैठने जैसा शारीरिक आराम" } },
      { value: "service", text: { en: "My partner taking care of a responsibility for me", hi: "मेरा पार्टनर मेरे लिए किसी जिम्मेदारी का ख्याल रखना" } },
      { value: "words", text: { en: "Hearing encouraging words", hi: "प्रोत्साहक शब्द सुनना" } },
      { value: "gifts", text: { en: "Receiving a small gift or token", hi: "एक छोटा उपहार या प्रतीक प्राप्त करना" } }
    ]
  },
  {
    id: 4,
    text: { 
      en: "I'm most likely to remember and cherish when my partner:", 
      hi: "मैं सबसे अधिक याद रखूंगा/रखूंगी और संजोऊंगा/संजोऊंगी जब मेरा पार्टनर:" 
    },
    options: [
      { value: "gifts", text: { en: "Gives me something that shows they were thinking of me", hi: "मुझे कुछ ऐसा देता/देती है जो दिखाता है कि वे मेरे बारे में सोच रहे थे" } },
      { value: "words", text: { en: "Writes me a heartfelt note or message", hi: "मुझे एक दिल से लिखा नोट या संदेश लिखता/लिखती है" } },
      { value: "touch", text: { en: "Shows physical affection in a meaningful moment", hi: "एक अर्थपूर्ण पल में शारीरिक स्नेह दिखाता/दिखाती है" } },
      { value: "service", text: { en: "Goes out of their way to help me", hi: "मेरी मदद करने के लिए अपने रास्ते से हट जाता/जाती है" } },
      { value: "quality", text: { en: "Creates a special experience for us to share", hi: "हमारे साझा करने के लिए एक विशेष अनुभव बनाता/बनाती है" } }
    ]
  },
  {
    id: 5,
    text: { 
      en: "In an argument, what would make me feel most cared for:", 
      hi: "एक बहस में, जो मुझे सबसे अधिक देखभाल महसूस कराएगा:" 
    },
    options: [
      { value: "touch", text: { en: "A reassuring hug or touch", hi: "एक आश्वासक गले या स्पर्श" } },
      { value: "service", text: { en: "Them taking action to address the issue", hi: "उनका समस्या को हल करने के लिए कार्रवाई करना" } },
      { value: "quality", text: { en: "Them giving me their full attention as we discuss", hi: "जब हम चर्चा करते हैं तो वे मुझे अपना पूरा ध्यान देते हैं" } },
      { value: "gifts", text: { en: "A peace offering of some kind", hi: "किसी प्रकार का शांति प्रस्ताव" } },
      { value: "words", text: { en: "Hearing them say 'I understand' or 'I'm sorry'", hi: "उन्हें 'मैं समझता/समझती हूं' या 'मुझे खेद है' कहते सुनना" } }
    ]
  }
];

const LoveLanguageDecoderPage = () => {
  const { language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [primaryLanguage, setPrimaryLanguage] = useState<string | null>(null);
  
  const isEnglish = language === 'en';
  const title = isEnglish ? "Love Language Decoder" : "प्रेम भाषा डिकोडर";
  const description = isEnglish 
    ? "Discover your primary love language and better understand how you prefer to give and receive love."
    : "अपनी प्राथमिक प्रेम भाषा का पता लगाएं और बेहतर तरीके से समझें कि आप प्यार देना और प्राप्त करना कैसे पसंद करते हैं।";

  const handleSelectOption = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<number, string>) => {
    // Count occurrences of each love language
    const counts: Record<string, number> = {
      words: 0,
      quality: 0, 
      gifts: 0,
      service: 0,
      touch: 0
    };
    
    Object.values(finalAnswers).forEach(answer => {
      counts[answer] += 1;
    });
    
    setResults(counts);
    
    // Find primary love language (highest score)
    let maxCount = 0;
    let primary: string | null = null;
    
    Object.entries(counts).forEach(([lang, count]) => {
      if (count > maxCount) {
        maxCount = count;
        primary = lang;
      }
    });
    
    setPrimaryLanguage(primary);
    toast.success(isEnglish ? "Analysis complete!" : "विश्लेषण पूरा!");
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
    setPrimaryLanguage(null);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    
    return (
      <Card className="glass-card mb-8">
        <CardHeader>
          <CardTitle className="text-center">
            {isEnglish ? `Question ${currentQuestion + 1} of ${questions.length}` : `प्रश्न ${currentQuestion + 1} / ${questions.length}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl mb-6">
            {question.text[language as keyof typeof question.text]}
          </h3>
          
          <RadioGroup 
            defaultValue={answers[currentQuestion]} 
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div key={index} 
                className="flex items-center p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => handleSelectOption(option.value)}
              >
                <RadioGroupItem value={option.value} id={`q${currentQuestion}-option-${index}`} className="mr-3" />
                <Label htmlFor={`q${currentQuestion}-option-${index}`} className="cursor-pointer w-full">
                  {option.text[language as keyof typeof option.text]}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-4">
          <div>
            <Progress value={(currentQuestion / questions.length) * 100} className="w-[200px]" />
          </div>
          <Button 
            variant="default"
            className="romantic-button"
            onClick={() => {
              if (answers[currentQuestion]) {
                if (currentQuestion < questions.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else {
                  calculateResults(answers);
                }
              } else {
                toast.error(isEnglish ? "Please select an option" : "कृपया एक विकल्प चुनें");
              }
            }}
          >
            {isEnglish ? "Next" : "अगला"}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderResults = () => {
    if (!results || !primaryLanguage) return null;
    
    const primaryLangData = loveLanguages.find(lang => lang.id === primaryLanguage);
    
    return (
      <div className="space-y-8">
        <Card className="glass-card">
          <CardHeader className="text-center">
            <CardTitle className="text-gradient">
              {isEnglish ? "Your Love Language Results" : "आपके प्रेम भाषा परिणाम"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{primaryLangData?.icon}</div>
              <h3 className="text-2xl font-semibold text-naughty-pink mb-2">
                {primaryLangData?.name[language as keyof typeof primaryLangData.name]}
              </h3>
              <p className="text-gray-300">
                {primaryLangData?.description[language as keyof typeof primaryLangData.description]}
              </p>
            </div>
            
            <div className="space-y-4">
              {loveLanguages.map(lang => (
                <div key={lang.id} className="flex items-center">
                  <div className="mr-3 text-xl">{lang.icon}</div>
                  <div className="min-w-[180px]">{lang.name[language as keyof typeof lang.name]}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-naughty-purple" 
                        style={{width: `${(results[lang.id] / questions.length) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-3 min-w-[30px] text-right">
                    {Math.round((results[lang.id] / questions.length) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-white/10 pt-4 flex justify-center">
            <Button onClick={restartQuiz} variant="outline" className="border-naughty-pink text-naughty-pink">
              {isEnglish ? "Retake Quiz" : "क्विज़ फिर से लें"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{isEnglish ? "What This Means For Your Relationship" : "इसका आपके रिश्ते के लिए क्या मतलब है"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-300">
              {isEnglish
                ? "Understanding your love language helps you communicate your needs better to your partner. It also gives you insight into how to show love in a way that resonates most deeply with you."
                : "अपनी प्रेम भाषा को समझने से आपको अपनी जरूरतों को अपने पार्टनर को बेहतर तरीके से बताने में मदद मिलती है। यह आपको यह अंतर्दृष्टि भी देता है कि प्यार कैसे दिखाया जाए जो आपके साथ सबसे गहराई से जुड़े।"}
            </p>
            <div className="bg-black/10 p-4 rounded-lg">
              <h3 className="text-naughty-pink font-semibold mb-2">
                {isEnglish ? "Next Steps" : "अगले कदम"}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• {isEnglish ? "Share your results with your partner" : "अपने परिणाम अपने पार्टनर के साथ साझा करें"}</li>
                <li>• {isEnglish ? "Ask your partner to take the quiz too" : "अपने पार्टनर से भी क्विज़ लेने के लिए कहें"}</li>
                <li>• {isEnglish ? "Discuss how you can better meet each other's needs" : "चर्चा करें कि आप एक-दूसरे की जरूरतों को कैसे बेहतर तरीके से पूरा कर सकते हैं"}</li>
                <li>• {isEnglish ? "Remember that love languages can change over time" : "याद रखें कि प्रेम भाषाएँ समय के साथ बदल सकती हैं"}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{title}</h1>
        <p className="text-gray-300 mb-8">{description}</p>

        {results ? renderResults() : renderQuestion()}
      </div>
    </Layout>
  );
};

export default LoveLanguageDecoderPage;
