
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import LoginModal from '@/components/auth/LoginModal';
import { toast } from '@/components/ui/sonner';

// Sample quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "What is your partner's favorite way to relax after a long day?",
    category: "Preferences"
  },
  {
    id: 2,
    question: "What would your partner say was your first fight about?",
    category: "Memory"
  },
  {
    id: 3,
    question: "What is something your partner is insecure about?",
    category: "Emotional"
  },
  {
    id: 4,
    question: "What would your partner say is your most annoying habit?",
    category: "Self-Awareness"
  },
  {
    id: 5,
    question: "What was your partner wearing on your first date?",
    category: "Memory"
  },
  {
    id: 6,
    question: "What is your partner's biggest goal for the next five years?",
    category: "Future"
  },
];

const CouplesQuizPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const title = language === 'en' ? "Couple's Quiz Show" : "कपल्स क्विज शो";
  const description = language === 'en' 
    ? "Test your knowledge of each other and strengthen your bond with fun questions."
    : "मज़ेदार सवालों के साथ एक-दूसरे के बारे में अपने ज्ञान का परीक्षण करें और अपने बॉन्ड को मजबूत बनाएं।";

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      toast.success(language === 'en' ? "Quiz completed!" : "क्विज़ पूरा हुआ!");
      setCurrentQuestion(0);
    }
  };

  const handleStartQuiz = () => {
    if (!user.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setCurrentQuestion(0);
    toast.success(language === 'en' ? "Quiz started!" : "क्विज़ शुरू हुआ!");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{title}</h1>
        <p className="text-gray-300 mb-8">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card col-span-2">
            <CardHeader>
              <CardTitle>{language === 'en' ? "Current Question" : "वर्तमान प्रश्न"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/20 p-6 rounded-lg">
                <span className="text-xs text-naughty-pink mb-2 block">
                  {quizQuestions[currentQuestion]?.category || ""}
                </span>
                <h3 className="text-xl mb-4">
                  {quizQuestions[currentQuestion]?.question || 
                  (language === 'en' ? "Click 'Start Quiz' to begin" : "शुरू करने के लिए 'क्विज़ शुरू करें' पर क्लिक करें")}
                </h3>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleNextQuestion} 
                    className="romantic-button"
                  >
                    {language === 'en' ? "Next Question" : "अगला प्रश्न"}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 flex justify-between">
              <div>
                {language === 'en' 
                  ? `Question ${currentQuestion + 1} of ${quizQuestions.length}`
                  : `प्रश्न ${currentQuestion + 1} / ${quizQuestions.length}`}
              </div>
              <Button 
                variant="outline" 
                className="border-naughty-pink text-naughty-pink"
                onClick={handleStartQuiz}
              >
                {language === 'en' ? "Restart Quiz" : "क्विज़ रिस्टार्ट करें"}
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{language === 'en' ? "How To Play" : "कैसे खेलें"}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• {language === 'en' ? "Take turns answering questions" : "बारी-बारी से सवालों के जवाब दें"}</li>
                  <li>• {language === 'en' ? "Be honest with your answers" : "अपने जवाबों में ईमानदार रहें"}</li>
                  <li>• {language === 'en' ? "Discuss your responses" : "अपने जवाबों पर चर्चा करें"}</li>
                  <li>• {language === 'en' ? "No judgment, only understanding" : "कोई निर्णय नहीं, केवल समझ"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{language === 'en' ? "Quiz Categories" : "क्विज़ श्रेणियाँ"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-naughty-purple/30 text-white px-2 py-1 rounded text-xs">
                    {language === 'en' ? "Preferences" : "प्राथमिकताएँ"}
                  </span>
                  <span className="bg-naughty-pink/30 text-white px-2 py-1 rounded text-xs">
                    {language === 'en' ? "Memory" : "स्मृति"}
                  </span>
                  <span className="bg-naughty-purpleDark/30 text-white px-2 py-1 rounded text-xs">
                    {language === 'en' ? "Emotional" : "भावनात्मक"}
                  </span>
                  <span className="bg-naughty-purple/30 text-white px-2 py-1 rounded text-xs">
                    {language === 'en' ? "Future" : "भविष्य"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>{language === 'en' ? "Tips for a Great Quiz Experience" : "बेहतरीन क्विज़ अनुभव के लिए टिप्स"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/10 p-4 rounded">
                <h3 className="font-semibold mb-2 text-naughty-pink">
                  {language === 'en' ? "Create the Right Atmosphere" : "सही माहौल बनाएं"}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'en'
                    ? "Find a comfortable space free from distractions where you can focus on each other."
                    : "एक आरामदायक जगह खोजें जहां आप एक-दूसरे पर ध्यान केंद्रित कर सकें।"}
                </p>
              </div>
              <div className="bg-black/10 p-4 rounded">
                <h3 className="font-semibold mb-2 text-naughty-pink">
                  {language === 'en' ? "Listen Actively" : "सक्रिय रूप से सुनें"}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'en'
                    ? "Focus on understanding rather than preparing your next response."
                    : "अपने अगले जवाब की तैयारी करने के बजाय समझने पर ध्यान दें।"}
                </p>
              </div>
              <div className="bg-black/10 p-4 rounded">
                <h3 className="font-semibold mb-2 text-naughty-pink">
                  {language === 'en' ? "Be Vulnerable" : "भावनात्मक रूप से खुलें"}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'en'
                    ? "Opening up creates deeper connection and intimacy."
                    : "खुलकर बात करने से गहरा कनेक्शन और अंतरंगता बनती है।"}
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

export default CouplesQuizPage;
