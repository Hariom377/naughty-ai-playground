
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import LoginModal from '@/components/auth/LoginModal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Mic, MicOff, Upload, Loader2, AlertCircle, Check } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Mock data for demonstration
const exampleTranscript = "Hey, I just wanted to tell you that I had a really good time last night. I loved how we could talk about everything and nothing. You make me laugh like nobody else. I'm looking forward to seeing you again soon. Take care and have a wonderful day!";

const moodAnalysisExample = {
  raw: {
    positive: 72,
    negative: 8,
    neutral: 20,
    emotions: {
      happiness: 65,
      affection: 80,
      excitement: 55,
      calm: 40,
      interest: 75,
      annoyance: 5,
      disappointment: 3
    }
  },
  interpretation: {
    en: "This voice message has a very positive emotional tone (72% positive). The speaker expresses significant affection (80%) and happiness (65%), with high interest (75%) in the conversation or subject. There's some excitement (55%) balanced with calm (40%). Negative emotions like annoyance and disappointment are minimal. Overall, this message conveys warmth, fondness, and anticipation of future connection.",
    hi: "इस वॉइस मैसेज में बहुत सकारात्मक भावनात्मक स्वर है (72% सकारात्मक)। स्पीकर महत्वपूर्ण स्नेह (80%) और खुशी (65%) व्यक्त करता है, बातचीत या विषय में उच्च रुचि (75%) के साथ। कुछ उत्साह (55%) शांति (40%) के साथ संतुलित है। चिढ़ और निराशा जैसी नकारात्मक भावनाएँ न्यूनतम हैं। कुल मिलाकर, यह संदेश गर्मजोशी, स्नेह और भविष्य के कनेक्शन की प्रत्याशा व्यक्त करता है।"
  }
};

// Prepare modified data with fill colors directly assigned
const prepareChartData = () => {
  return [
    { name: "Positive", value: moodAnalysisExample.raw.positive, fill: "#9F7AEA" },
    { name: "Neutral", value: moodAnalysisExample.raw.neutral, fill: "#A0AEC0" },
    { name: "Negative", value: moodAnalysisExample.raw.negative, fill: "#F56565" }
  ];
};

const VoiceMessageMoodPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<typeof moodAnalysisExample | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const isEnglish = language === 'en';
  const title = isEnglish ? "Voice Message Mood Detector" : "वॉइस मैसेज मूड डिटेक्टर";
  const description = isEnglish 
    ? "Analyze the emotional undertones in voice messages to better understand what's being communicated."
    : "वॉइस मैसेज में भावनात्मक अंडरटोन का विश्लेषण करें ताकि बेहतर समझ सकें कि क्या संवाद किया जा रहा है।";
  
  const handleStartRecording = () => {
    if (!user.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    toast.info(isEnglish ? "Recording started..." : "रिकॉर्डिंग शुरू हुई...");
    setIsRecording(true);
  };
  
  const handleStopRecording = () => {
    toast.success(isEnglish ? "Recording saved!" : "रिकॉर्डिंग सहेजी गई!");
    setIsRecording(false);
    // In a real app, we'd save the audio recording here
    // For demo purposes, we'll just set a transcript
    setTranscript(exampleTranscript);
  };
  
  const handleUpload = () => {
    if (!user.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      setTranscript(exampleTranscript);
      toast.success(isEnglish ? "Voice message uploaded!" : "वॉइस मैसेज अपलोड किया गया!");
    }, 2000);
  };
  
  const handleAnalyze = () => {
    if (!transcript.trim()) {
      toast.error(isEnglish ? "Please record or upload a voice message first" : "कृपया पहले एक वॉइस मैसेज रिकॉर्ड करें या अपलोड करें");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResult(moodAnalysisExample);
      setIsAnalyzing(false);
      toast.success(isEnglish ? "Analysis complete!" : "विश्लेषण पूर्ण!");
    }, 3000);
  };
  
  // Format chart data
  const emotionChartData = analysisResult ? Object.entries(analysisResult.raw.emotions)
    .map(([key, value]) => ({ 
      name: key.charAt(0).toUpperCase() + key.slice(1), 
      value,
      fill: "#9F7AEA" 
    })) : [];
  
  // Use prepared data with fill colors
  const sentimentData = analysisResult ? prepareChartData().map(item => {
    // Translate names if needed
    if (language === 'hi') {
      if (item.name === 'Positive') return { ...item, name: 'सकारात्मक' };
      if (item.name === 'Neutral') return { ...item, name: 'तटस्थ' };
      if (item.name === 'Negative') return { ...item, name: 'नकारात्मक' };
    }
    return item;
  }) : [];
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{title}</h1>
        <p className="text-gray-300 mb-8">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>
                {isEnglish ? "Voice Message Input" : "वॉइस मैसेज इनपुट"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center my-6">
                {!transcript ? (
                  <>
                    <Button 
                      variant={isRecording ? "destructive" : "secondary"}
                      size="lg"
                      className="mx-2"
                      onClick={isRecording ? handleStopRecording : handleStartRecording}
                    >
                      {isRecording ? (
                        <>
                          <MicOff size={18} className="mr-2" />
                          {isEnglish ? "Stop Recording" : "रिकॉर्डिंग बंद करें"}
                        </>
                      ) : (
                        <>
                          <Mic size={18} className="mr-2" />
                          {isEnglish ? "Start Recording" : "रिकॉर्डिंग शुरू करें"}
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="lg"
                      className="mx-2 border-white/20"
                      onClick={handleUpload}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 size={18} className="mr-2 animate-spin" />
                          {isEnglish ? "Uploading..." : "अपलोड हो रहा है..."}
                        </>
                      ) : (
                        <>
                          <Upload size={18} className="mr-2" />
                          {isEnglish ? "Upload Voice Message" : "वॉइस मैसेज अपलोड करें"}
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center text-naughty-pink gap-2">
                    <Check size={18} />
                    <span>
                      {isEnglish ? "Voice message successfully processed" : "वॉइस मैसेज सफलतापूर्वक प्रोसेस किया गया"}
                    </span>
                  </div>
                )}
              </div>
              
              {transcript && (
                <div>
                  <Label className="text-naughty-pink mb-2 block">
                    {isEnglish ? "Transcript" : "ट्रांसक्रिप्ट"}
                  </Label>
                  <Textarea 
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="h-40 bg-black/20 border-white/10"
                    placeholder={isEnglish ? "Voice message transcript..." : "वॉइस मैसेज ट्रांसक्रिप्ट..."}
                  />
                </div>
              )}
              
              {user.subscription !== 'premium' && (
                <Alert variant="default" className="bg-black/20 border-naughty-pink">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    {isEnglish ? "Premium Feature" : "प्रीमियम फीचर"}
                  </AlertTitle>
                  <AlertDescription>
                    {isEnglish 
                      ? "Free users can analyze up to 3 voice messages. Upgrade to Premium for unlimited analysis."
                      : "फ्री यूजर्स 3 वॉइस मैसेज तक का विश्लेषण कर सकते हैं। असीमित विश्लेषण के लिए प्रीमियम में अपग्रेड करें।"}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-4">
              <Button 
                onClick={handleAnalyze} 
                disabled={!transcript || isAnalyzing} 
                className="romantic-button w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    <div className="flex flex-col items-center">
                      <span>{isEnglish ? "Analyzing" : "विश्लेषण हो रहा है"}...</span>
                      <Progress value={isAnalyzing ? 70 : 0} className="mt-1 h-1 w-24" />
                    </div>
                  </>
                ) : (
                  <>
                    {isEnglish ? "Analyze Emotional Tone" : "भावनात्मक स्वर का विश्लेषण करें"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {analysisResult ? (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>
                  {isEnglish ? "Emotional Analysis Results" : "भावनात्मक विश्लेषण परिणाम"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-naughty-pink font-semibold mb-2">
                    {isEnglish ? "Overall Sentiment" : "समग्र भावना"}
                  </h3>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={sentimentData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" />
                      <Bar 
                        dataKey="value" 
                        radius={[0, 4, 4, 0]}
                        label={{ fill: 'white', fontSize: 12, position: 'right' }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-naughty-pink font-semibold mb-2">
                    {isEnglish ? "Specific Emotions Detected" : "विशिष्ट भावनाएं पहचानी गईं"}
                  </h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={emotionChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis domain={[0, 100]} stroke="#999" />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg">
                  <h3 className="text-naughty-pink font-semibold mb-2">
                    {isEnglish ? "Interpretation" : "व्याख्या"}
                  </h3>
                  <p className="text-gray-300">
                    {analysisResult.interpretation[language as keyof typeof analysisResult.interpretation]}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>
                  {isEnglish ? "Why Use Voice Analysis?" : "वॉइस एनालिसिस का उपयोग क्यों करें?"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="text-2xl">🗣️</div>
                    <div>
                      <h3 className="text-naughty-pink font-semibold mb-1">
                        {isEnglish ? "Detect Hidden Emotions" : "छिपी भावनाओं का पता लगाएं"}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {isEnglish
                          ? "Voice contains emotional cues that text alone can't convey. Understand what someone is really feeling."
                          : "आवाज़ में भावनात्मक संकेत होते हैं जिन्हें केवल टेक्स्ट नहीं बता सकता। समझें कि कोई वास्तव में क्या महसूस कर रहा है।"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="text-2xl">❤️</div>
                    <div>
                      <h3 className="text-naughty-pink font-semibold mb-1">
                        {isEnglish ? "Improve Communication" : "संचार में सुधार करें"}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {isEnglish
                          ? "Better understand how your partner communicates to avoid misinterpretations and deepen connection."
                          : "गलत व्याख्याओं से बचने और कनेक्शन को गहरा करने के लिए अपने पार्टनर के संचार को बेहतर ढंग से समझें।"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="text-2xl">🧠</div>
                    <div>
                      <h3 className="text-naughty-pink font-semibold mb-1">
                        {isEnglish ? "Identify Relationship Patterns" : "रिश्ते के पैटर्न की पहचान करें"}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {isEnglish
                          ? "Track emotional patterns in communication over time to understand relationship dynamics."
                          : "रिश्ते की गतिशीलता को समझने के लिए समय के साथ संचार में भावनात्मक पैटर्न का पता लगाएं।"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>
              {isEnglish ? "How It Works" : "यह कैसे काम करता है"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/10 p-4 rounded-lg flex flex-col items-center text-center">
                <div className="text-3xl mb-4">🎙️</div>
                <h3 className="font-semibold mb-2 text-naughty-pink">
                  {isEnglish ? "1. Audio Input" : "1. ऑडियो इनपुट"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Record directly or upload a voice message you've received. Our system transcribes it to text."
                    : "सीधे रिकॉर्ड करें या अपनी प्राप्त वॉइस मैसेज अपलोड करें। हमारा सिस्टम इसे टेक्स्ट में ट्रांसक्राइब करता है।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg flex flex-col items-center text-center">
                <div className="text-3xl mb-4">✨</div>
                <h3 className="font-semibold mb-2 text-naughty-pink">
                  {isEnglish ? "2. Advanced Analysis" : "2. उन्नत विश्लेषण"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Our AI examines vocal tone, pitch, pace, and linguistic cues to identify emotional patterns."
                    : "हमारा AI भावनात्मक पैटर्न की पहचान के लिए वोकल टोन, पिच, गति और भाषाई संकेतों की जांच करता है।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg flex flex-col items-center text-center">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-semibold mb-2 text-naughty-pink">
                  {isEnglish ? "3. Detailed Results" : "3. विस्तृत परिणाम"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Get a comprehensive breakdown of emotions detected and an interpretation of the underlying sentiment."
                    : "पता लगाई गई भावनाओं का व्यापक ब्रेकडाउन और अंतर्निहित भावना की व्याख्या प्राप्त करें।"}
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

export default VoiceMessageMoodPage;
