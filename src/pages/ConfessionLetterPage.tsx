
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import LoginModal from '@/components/auth/LoginModal';
import { Loader2, Copy, Download, Heart } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const relationshipTypes = [
  { value: "crush", label: { en: "Crush or Secret Admirer", hi: "क्रश या गुप्त प्रशंसक" } },
  { value: "new", label: { en: "New Relationship", hi: "नया रिश्ता" } },
  { value: "serious", label: { en: "Serious Relationship", hi: "गंभीर रिश्ता" } },
  { value: "longterm", label: { en: "Long-term Partner", hi: "लंबी अवधि का पार्टनर" } },
  { value: "breakup", label: { en: "After a Breakup", hi: "ब्रेकअप के बाद" } },
  { value: "reunion", label: { en: "Seeking Reconciliation", hi: "सुलह की तलाश" } }
];

const tones = [
  { value: "romantic", label: { en: "Romantic", hi: "रोमांटिक" } },
  { value: "passionate", label: { en: "Passionate", hi: "भावुक" } },
  { value: "sincere", label: { en: "Sincere & Honest", hi: "ईमानदार और सच्चा" } },
  { value: "poetic", label: { en: "Poetic", hi: "काव्यात्मक" } },
  { value: "humorous", label: { en: "Lighthearted & Humorous", hi: "हल्का और हास्यपूर्ण" } },
  { value: "dramatic", label: { en: "Dramatic", hi: "नाटकीय" } }
];

// Sample confession letters for demonstration
const sampleConfessions = {
  crush: {
    romantic: {
      en: `Dear [Name],

I've been trying to find the right words to express how I feel about you, and I've realized that sometimes the simplest truth is the most powerful. I have feelings for you – feelings that have grown stronger with each conversation we share and every smile you send my way.

There's something special about the way you see the world, the way you laugh, and how you make everyone around you feel valued. I find myself looking forward to the moments we spend together, no matter how brief.

I understand this might come as a surprise, and I don't expect anything from you. I simply wanted to be honest about how much you mean to me. Whatever happens next, I value your presence in my life.

If you feel something too, I'd love to explore what could be. If not, I hope we can continue our friendship without awkwardness.

With affection,
[Your Name]`,
      hi: `प्रिय [नाम],

मैं आपके प्रति अपनी भावनाओं को व्यक्त करने के लिए सही शब्द खोजने की कोशिश कर रहा/रही हूँ, और मुझे एहसास हुआ है कि कभी-कभी सबसे सरल सत्य सबसे शक्तिशाली होता है। मेरे आपके लिए भावनाएँ हैं – ऐसी भावनाएँ जो हर बातचीत के साथ और हर मुस्कान के साथ जो आप मेरी ओर भेजते हैं, मजबूत होती जा रही हैं।

आप जिस तरह से दुनिया को देखते हैं, जिस तरह से आप हँसते हैं, और आप अपने आस-पास के हर व्यक्ति को कैसे महत्वपूर्ण महसूस कराते हैं, उसमें कुछ खास है। मैं उन पलों की प्रतीक्षा करता/करती हूँ जो हम एक साथ बिताते हैं, चाहे वे कितने भी संक्षिप्त क्यों न हों।

मुझे पता है कि यह आपके लिए एक आश्चर्य हो सकता है, और मुझे आपसे कुछ भी उम्मीद नहीं है। मैं बस इस बारे में ईमानदार होना चाहता/चाहती थी कि आप मेरे लिए कितने मायने रखते हैं। आगे जो भी हो, मैं अपने जीवन में आपकी उपस्थिति को महत्व देता/देती हूँ।

अगर आप भी कुछ महसूस करते हैं, तो मुझे यह जानना अच्छा लगेगा कि क्या हो सकता है। यदि नहीं, तो मुझे आशा है कि हम बिना किसी अजीबता के अपनी दोस्ती जारी रख सकते हैं।

स्नेह सहित,
[आपका नाम]`
    },
    sincere: {
      en: `Dear [Name],

I've been gathering my courage to write this letter for some time now. There's something I need to tell you, and I believe honesty is the best approach.

I have genuine feelings for you. I'm not sure exactly when it happened – maybe it was during our conversations about [shared interest], or perhaps it was seeing your kindness when you [specific memory]. All I know is that my admiration for you has grown into something deeper.

I value our [friendship/connection] immensely, which is why I've hesitated to share this. I don't want to risk what we already have, but I also believe in being truthful about my feelings.

I'm not asking for an immediate response or putting any pressure on you. I simply wanted you to know how special you are to me. Whatever you feel in return – whether it's similar feelings, friendship, or you need time to process – I'll respect that completely.

Thank you for being you.

Sincerely,
[Your Name]`,
      hi: `प्रिय [नाम],

मैं इस पत्र को लिखने के लिए कुछ समय से अपना साहस जुटा रहा/रही हूँ। कुछ ऐसा है जो मुझे आपको बताने की जरूरत है, और मुझे विश्वास है कि ईमानदारी सबसे अच्छा तरीका है।

मेरी आपके लिए वास्तविक भावनाएँ हैं। मुझे यकीन नहीं है कि यह ठीक कब हुआ – शायद यह [साझा रुचि] के बारे में हमारी बातचीत के दौरान था, या शायद यह आपकी दयालुता को देखकर था जब आपने [विशिष्ट यादें] किया था। मुझे बस इतना पता है कि आपके लिए मेरा सम्मान कुछ गहरे में बदल गया है।

मैं हमारी [मित्रता/संबंध] को बहुत महत्व देता/देती हूँ, इसीलिए मैंने इसे साझा करने में हिचकिचाहट महसूस की है। मैं जो हमारे पास पहले से है उसे जोखिम में नहीं डालना चाहता/चाहती, लेकिन मुझे अपनी भावनाओं के बारे में सच्चा होने में भी विश्वास है।

मैं तत्काल प्रतिक्रिया की मांग या आप पर कोई दबाव नहीं डाल रहा/रही हूँ। मैं बस चाहता/चाहती था कि आप जानें कि आप मेरे लिए कितने विशेष हैं। आप जो भी बदले में महसूस करते हैं – चाहे वह समान भावनाएँ हों, मित्रता हो, या आपको समझने के लिए समय की आवश्यकता हो – मैं उसका पूरी तरह से सम्मान करूंगा/करूंगी।

आप होने के लिए धन्यवाद।

सच्चाई से,
[आपका नाम]`
    }
  },
  longterm: {
    passionate: {
      en: `My darling [Name],

As I sit here thinking about you, I'm overwhelmed by the depth of what I feel for you. Every day with you feels like a gift I unwrap with reverence and joy.

I love the way your eyes crinkle when you laugh. I love how you listen intently when I speak, making me feel like the most important person in your world. I love the passion you bring to everything you do, from [specific hobby] to the way you care for those around you.

Our journey together hasn't always been easy, but it's been real and raw and beautiful. You've seen me at my worst and somehow loved me even more. You've witnessed my highest moments and celebrated with genuine happiness.

When I think about the future, you are always there – your hand in mine, your voice in my ear, your heartbeat next to mine. I cannot imagine a life without the love we've built together.

I want you to know that I choose you – today and every day. I choose your flaws alongside your strengths. I choose our struggles alongside our triumphs. I choose the person you are and the person you're becoming.

Forever yours,
[Your Name]`,
      hi: `मेरे प्यारे [नाम],

जैसे मैं यहाँ बैठकर आपके बारे में सोच रहा/रही हूँ, मैं आपके लिए जो महसूस करता/करती हूँ उसकी गहराई से अभिभूत हूँ। आपके साथ हर दिन एक उपहार की तरह लगता है जिसे मैं श्रद्धा और खुशी के साथ खोलता/खोलती हूँ।

मुझे पसंद है कि जब आप हँसते हैं तो आपकी आँखें सिकुड़ जाती हैं। मुझे पसंद है कि जब मैं बोलता/बोलती हूँ तो आप ध्यान से सुनते हैं, मुझे ऐसा महसूस कराते हैं जैसे मैं आपकी दुनिया में सबसे महत्वपूर्ण व्यक्ति हूँ। मुझे वह जुनून पसंद है जो आप हर चीज में लाते हैं, [विशिष्ट शौक] से लेकर जिस तरह से आप अपने आस-पास के लोगों की देखभाल करते हैं।

एक साथ हमारी यात्रा हमेशा आसान नहीं रही है, लेकिन यह वास्तविक और कच्ची और सुंदर रही है। आपने मुझे मेरे सबसे बुरे समय में देखा है और किसी तरह मुझसे और भी ज्यादा प्यार किया है। आपने मेरे उच्चतम क्षणों को देखा है और वास्तविक खुशी के साथ जश्न मनाया है।

जब मैं भविष्य के बारे में सोचता/सोचती हूँ, आप हमेशा वहाँ हैं – आपका हाथ मेरे हाथ में, आपकी आवाज़ मेरे कान में, आपकी धड़कन मेरे पास। मैं हमारे द्वारा मिलकर बनाए गए प्यार के बिना एक जीवन की कल्पना नहीं कर सकता/सकती।

मैं चाहता/चाहती हूँ कि आप जानें कि मैं आपको चुनता/चुनती हूँ – आज और हर दिन। मैं आपकी ताकत के साथ-साथ आपकी कमजोरियों को भी चुनता/चुनती हूँ। मैं हमारी सफलताओं के साथ-साथ हमारे संघर्षों को भी चुनता/चुनती हूँ। मैं उस व्यक्ति को चुनता/चुनती हूँ जो आप हैं और वह व्यक्ति जो आप बन रहे हैं।

हमेशा आपका/आपकी,
[आपका नाम]`
    }
  }
  // Additional samples could be added for other combinations
};

const ConfessionLetterPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const [recipientName, setRecipientName] = useState('');
  const [relationship, setRelationship] = useState('crush');
  const [tone, setTone] = useState('romantic');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const isEnglish = language === 'en';
  const title = isEnglish ? "Confession Letter Generator" : "इकबाल पत्र जनरेटर";
  const description = isEnglish 
    ? "Create heartfelt letters to express your feelings to someone special."
    : "किसी खास व्यक्ति के लिए अपनी भावनाओं को व्यक्त करने के लिए दिल से निकले पत्र बनाएं।";
  
  const handleGenerate = () => {
    if (!user.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation with setTimeout
    setTimeout(() => {
      // Use sample confession if available, or generate a new one
      let letter = '';
      try {
        // The relationship and tone values are guaranteed to exist in the sample data
        if (sampleConfessions[relationship as keyof typeof sampleConfessions] && 
            sampleConfessions[relationship as keyof typeof sampleConfessions][tone as keyof typeof sampleConfessions.crush]) {
          letter = sampleConfessions[relationship as keyof typeof sampleConfessions][tone as keyof typeof sampleConfessions.crush][language as 'en' | 'hi'];
        } else {
          // Fallback to the crush/romantic sample
          letter = sampleConfessions.crush.romantic[language as 'en' | 'hi'];
        }
      } catch (error) {
        // Fallback to the crush/romantic sample
        letter = sampleConfessions.crush.romantic[language as 'en' | 'hi'];
      }
      
      // Replace placeholder with actual recipient name if provided
      if (recipientName) {
        letter = letter.replace(/\[Name\]/g, recipientName);
      }
      
      setGeneratedLetter(letter);
      setIsGenerating(false);
      toast.success(isEnglish ? "Letter generated successfully!" : "पत्र सफलतापूर्वक बनाया गया!");
    }, 2000);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success(isEnglish ? "Copied to clipboard!" : "क्लिपबोर्ड पर कॉपी किया गया!");
  };
  
  const downloadLetter = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedLetter], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `confession-letter-for-${recipientName || "someone-special"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(isEnglish ? "Letter downloaded!" : "पत्र डाउनलोड किया गया!");
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{title}</h1>
        <p className="text-gray-300 mb-8">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>
                  {isEnglish ? "Create Your Letter" : "अपना पत्र बनाएं"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-naughty-pink mb-2 block">
                    {isEnglish ? "Recipient's Name (Optional)" : "प्राप्तकर्ता का नाम (वैकल्पिक)"}
                  </Label>
                  <Input 
                    id="name" 
                    placeholder={isEnglish ? "Enter their name" : "उनका नाम दर्ज करें"}
                    className="bg-black/20 border-white/10"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="relationship" className="text-naughty-pink mb-2 block">
                    {isEnglish ? "Relationship Type" : "रिश्ते का प्रकार"}
                  </Label>
                  <Select value={relationship} onValueChange={setRelationship}>
                    <SelectTrigger className="bg-black/20 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label[language as keyof typeof type.label]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tone" className="text-naughty-pink mb-2 block">
                    {isEnglish ? "Letter Tone" : "पत्र का स्वर"}
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-black/20 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label[language as keyof typeof t.label]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="additional" className="text-naughty-pink mb-2 block">
                    {isEnglish ? "Additional Details (Optional)" : "अतिरिक्त विवरण (वैकल्पिक)"}
                  </Label>
                  <Textarea 
                    id="additional"
                    placeholder={isEnglish 
                      ? "Include specific memories, shared interests, or feelings you want to express..."
                      : "विशिष्ट यादें, साझा रुचियाँ, या भावनाएँ शामिल करें जिन्हें आप व्यक्त करना चाहते हैं..."}
                    className="h-24 bg-black/20 border-white/10"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4">
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating} 
                  className="romantic-button w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      {isEnglish ? "Creating Your Letter..." : "आपका पत्र बनाया जा रहा है..."}
                    </>
                  ) : (
                    <>
                      <Heart size={16} className="mr-2" />
                      {isEnglish ? "Create Confession Letter" : "इकबाल पत्र बनाएं"}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>
                  {isEnglish ? "Tips" : "टिप्स"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex gap-2">
                    <span>💌</span>
                    <span>{isEnglish 
                      ? "Be honest but thoughtful in your expression"
                      : "अपनी अभिव्यक्ति में ईमानदार लेकिन विचारशील रहें"}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>💭</span>
                    <span>{isEnglish 
                      ? "Include specific details about what you appreciate"
                      : "आप जिस चीज की सराहना करते हैं उसके बारे में विशिष्ट विवरण शामिल करें"}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>🌹</span>
                    <span>{isEnglish 
                      ? "Keep expectations open and respect their response"
                      : "अपेक्षाओं को खुला रखें और उनकी प्रतिक्रिया का सम्मान करें"}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>✍️</span>
                    <span>{isEnglish 
                      ? "Consider handwriting the final letter for a personal touch"
                      : "व्यक्तिगत स्पर्श के लिए अंतिम पत्र को हाथ से लिखने पर विचार करें"}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>💘</span>
                    <span>{isEnglish 
                      ? "End with clarity about what you hope for next"
                      : "आगे आप क्या चाहते हैं, इसके बारे में स्पष्टता के साथ समाप्त करें"}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {generatedLetter && (
          <Card className="glass-card mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {isEnglish ? "Your Confession Letter" : "आपका इकबाल पत्र"}
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-white" 
                  onClick={copyToClipboard}
                >
                  <Copy size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-white"
                  onClick={downloadLetter}
                >
                  <Download size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-black/20 p-6 rounded-lg">
                <pre className="whitespace-pre-line font-sans text-white leading-relaxed">
                  {generatedLetter}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>
              {isEnglish ? "Why Write a Confession Letter?" : "इकबाल पत्र क्यों लिखें?"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-naughty-pink flex items-center">
                  <span className="mr-2">💭</span>
                  {isEnglish ? "Process Your Feelings" : "अपनी भावनाओं को संसाधित करें"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Writing helps organize and understand your own emotions, giving clarity to complex feelings."
                    : "लेखन आपकी अपनी भावनाओं को व्यवस्थित करने और समझने में मदद करता है, जटिल भावनाओं को स्पष्टता प्रदान करता है।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-naughty-pink flex items-center">
                  <span className="mr-2">💌</span>
                  {isEnglish ? "Express Thoughtfully" : "विचारपूर्वक अभिव्यक्त करें"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "A letter allows you to choose your words carefully without the pressure of an immediate response."
                    : "एक पत्र आपको तत्काल प्रतिक्रिया के दबाव के बिना अपने शब्दों को सावधानी से चुनने की अनुमति देता है।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-naughty-pink flex items-center">
                  <span className="mr-2">✨</span>
                  {isEnglish ? "Create a Keepsake" : "एक यादगार बनाएं"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Whether the response is positive or not, a heartfelt letter becomes a meaningful momento of your courage."
                    : "चाहे प्रतिक्रिया सकारात्मक हो या नहीं, एक दिल से निकला पत्र आपके साहस का एक सार्थक स्मृति चिन्ह बन जाता है।"}
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

export default ConfessionLetterPage;
