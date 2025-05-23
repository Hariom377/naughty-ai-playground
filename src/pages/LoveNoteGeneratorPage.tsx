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
import { Loader2, Copy, Download } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const occasionTypes = [
  { value: "everyday", label: { en: "Just Because", hi: "बस ऐसे ही" } },
  { value: "anniversary", label: { en: "Anniversary", hi: "वर्षगांठ" } },
  { value: "birthday", label: { en: "Birthday", hi: "जन्मदिन" } },
  { value: "apology", label: { en: "Apology", hi: "माफी" } },
  { value: "support", label: { en: "Support During Tough Time", hi: "कठिन समय में समर्थन" } },
  { value: "longDistance", label: { en: "Long Distance", hi: "लंबी दूरी" } }
];

const noteStyles = [
  { value: "sweet", label: { en: "Sweet & Tender", hi: "मीठा और कोमल" } },
  { value: "passionate", label: { en: "Passionate & Intense", hi: "भावुक और तीव्र" } },
  { value: "playful", label: { en: "Playful & Fun", hi: "मस्तिष्क और मजेदार" } },
  { value: "poetic", label: { en: "Poetic", hi: "काव्यात्मक" } },
  { value: "appreciative", label: { en: "Appreciative", hi: "सराहनापूर्ण" } }
];

const lengthOptions = [
  { value: "short", label: { en: "Short & Sweet", hi: "छोटा और मीठा" } },
  { value: "medium", label: { en: "Medium Length", hi: "मध्यम लंबाई" } },
  { value: "long", label: { en: "Long & Detailed", hi: "लंबा और विस्तृत" } }
];

// Sample generated notes for demonstration
const sampleNotes = {
  everyday: {
    sweet: {
      short: {
        en: `My love,

Just wanted to pause for a moment and remind you how much you mean to me. Your smile brightens my days, and your love fills my heart in ways I never thought possible.

Thinking of you always,
[Your Name]`,
        hi: `मेरे प्यार,

बस एक पल के लिए रुकना चाहता/चाहती थी और आपको याद दिलाना चाहता/चाहती थी कि आप मेरे लिए कितने मायने रखते हैं। आपकी मुस्कान मेरे दिनों को उज्ज्वल बनाती है, और आपका प्यार मेरे दिल को ऐसे तरीकों से भर देता है जिनकी मैंने कभी कल्पना नहीं की थी।

हमेशा आपके बारे में सोचते हुए,
[आपका नाम]`
      }
    }
  },
  anniversary: {
    passionate: {
      medium: {
        en: `My incredible [partner name],

Another year together, and my love for you has only deepened with time. When I think about our journey - the laughter we've shared, the challenges we've overcome, the quiet moments of simply being together - I'm filled with overwhelming gratitude that you chose me to walk beside you.

Every day with you feels like a gift. I love the ways you've helped me grow, the dreams we've built together, and even the ordinary moments that become extraordinary because I'm experiencing them with you.

As we celebrate this anniversary, I want you to know that my heart is still completely yours - today, tomorrow, and for all our years to come.

Forever in love with you,
[Your Name]`,
        hi: `मेरे अद्भुत [पार्टनर का नाम],

एक और साल एक साथ, और आपके लिए मेरा प्यार समय के साथ और गहरा हो गया है। जब मैं हमारी यात्रा के बारे में सोचता/सोचती हूं - हमने जो हंसी साझा की है, हमने जिन चुनौतियों पर काबू पाया है, बस एक साथ होने के शांत क्षण - मैं अभिभूत कृतज्ञता से भर जाता/जाती हूं कि आपने मुझे अपने साथ चलने के लिए चुना।

आपके साथ हर दिन एक उपहार जैसा लगता है। मुझे वे तरीके पसंद हैं जिनसे आपने मुझे बढ़ने में मदद की है, वे सपने जो हमने एक साथ बनाए हैं, और यहां तक कि साधारण क्षण भी जो असाधारण हो जाते हैं क्योंकि मैं उन्हें आपके साथ अनुभव कर रहा/रही हूं।

जैसे हम इस वर्षगांठ का जश्न मनाते हैं, मैं चाहता/चाहती हूं कि आप जानें कि मेरा दिल अभी भी पूरी तरह से आपका है - आज, कल, और हमारे आने वाले सभी वर्षों के लिए।

हमेशा आपसे प्यार करते हुए,
[आपका नाम]`
      }
    }
  },
  // Other samples could be added
};

const LoveNoteGeneratorPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const [partnerName, setPartnerName] = useState('');
  const [occasion, setOccasion] = useState('everyday');
  const [style, setStyle] = useState('sweet');
  const [length, setLength] = useState('short');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [generatedNote, setGeneratedNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const isEnglish = language === 'en';
  const title = isEnglish ? "Love Note Generator" : "प्रेम पत्र जनरेटर";
  const description = isEnglish 
    ? "Create heartfelt notes and messages for your partner."
    : "अपने पार्टनर के लिए दिल से निकले नोट्स और संदेश बनाएं।";
  
  const handleGenerate = () => {
    if (!user.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation with setTimeout
    setTimeout(() => {
      let note = '';
      
      // Try to use a sample note if available
      try {
        if (sampleNotes[occasion as keyof typeof sampleNotes] && 
            sampleNotes[occasion as keyof typeof sampleNotes][style as keyof typeof sampleNotes.everyday] &&
            sampleNotes[occasion as keyof typeof sampleNotes][style as keyof typeof sampleNotes.everyday][length as keyof typeof sampleNotes.everyday.sweet]) {
          note = sampleNotes[occasion as keyof typeof sampleNotes][style as keyof typeof sampleNotes.everyday][length as keyof typeof sampleNotes.everyday.sweet][language as 'en' | 'hi'];
        } else {
          // Fall back to the everyday/sweet/short sample
          note = sampleNotes.everyday.sweet.short[language as 'en' | 'hi'];
        }
      } catch (error) {
        // Fall back to the everyday/sweet/short sample
        note = sampleNotes.everyday.sweet.short[language as 'en' | 'hi'];
      }
      
      // Replace placeholder with actual partner name if provided
      if (partnerName) {
        note = note.replace(/\[partner name\]/gi, partnerName);
      }
      
      setGeneratedNote(note);
      setIsGenerating(false);
      toast.success(isEnglish ? "Love note generated!" : "प्रेम पत्र बनाया गया!");
    }, 2000);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNote);
    toast.success(isEnglish ? "Copied to clipboard!" : "क्लिपबोर्ड पर कॉपी किया गया!");
  };
  
  const downloadNote = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedNote], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `love-note-for-${partnerName || "my-love"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(isEnglish ? "Note downloaded!" : "नोट डाउनलोड किया गया!");
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{title}</h1>
        <p className="text-gray-300 mb-8">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>
                {isEnglish ? "Create Your Love Note" : "अपना प्रेम पत्र बनाएं"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-naughty-pink mb-2 block">
                  {isEnglish ? "Partner's Name (Optional)" : "पार्टनर का नाम (वैकल्पिक)"}
                </Label>
                <Input 
                  id="name" 
                  placeholder={isEnglish ? "Enter their name" : "उनका नाम दर्ज करें"}
                  className="bg-black/20 border-white/10"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="occasion" className="text-naughty-pink mb-2 block">
                  {isEnglish ? "Occasion" : "अवसर"}
                </Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger className="bg-black/20 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {occasionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label[language as keyof typeof type.label]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="style" className="text-naughty-pink mb-2 block">
                  {isEnglish ? "Note Style" : "नोट स्टाइल"}
                </Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="bg-black/20 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {noteStyles.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label[language as keyof typeof s.label]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="length" className="text-naughty-pink mb-2 block">
                  {isEnglish ? "Length" : "लंबाई"}
                </Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="bg-black/20 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lengthOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label[language as keyof typeof option.label]}
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
                    ? "Include memories, inside jokes, or specific things you love about them..."
                    : "यादें, अंदरूनी मज़ाक, या विशिष्ट चीजें शामिल करें जो आप उनके बारे में पसंद करते हैं..."}
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
                    {isEnglish ? "Creating Your Note..." : "आपका नोट बनाया जा रहा है..."}
                  </>
                ) : (
                  <>
                    {isEnglish ? "Generate Love Note" : "प्रेम पत्र बनाएं"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {generatedNote ? (
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {isEnglish ? "Your Love Note" : "आपका प्रेम पत्र"}
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
                    onClick={downloadNote}
                  >
                    <Download size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-black/20 p-6 rounded-lg">
                  <pre className="whitespace-pre-line font-sans text-white leading-relaxed">
                    {generatedNote}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>
                  {isEnglish ? "Making a Great Love Note" : "एक शानदार प्रेम पत्र बनाना"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="text-2xl">❤️</div>
                    <div>
                      <h3 className="text-naughty-pink font-semibold mb-1">
                        {isEnglish ? "Be Specific" : "विशिष्ट बनें"}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {isEnglish
                          ? "Mention particular moments, qualities, or memories that are meaningful to both of you."
                          : "विशेष क्षणों, गुणों, या यादों का उल्लेख करें जो आप दोनों के लिए सार्थक हैं।"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="text-2xl">💞</div>
                    <div>
                      <h3 className="text-naughty-pink font-semibold mb-1">
                        {isEnglish ? "Use Sensory Language" : "संवेदी भाषा का प्रयोग करें"}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {isEnglish
                          ? "Describe how they make you feel using all five senses for a more vivid emotional impact."
                          : "वे आपको कैसा महसूस कराते हैं, इसका वर्णन करने के लिए अधिक जीवंत भावनात्मक प्रभाव के लिए सभी पांच इंद्रियों का उपयोग करें।"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="text-2xl">✨</div>
                    <div>
                      <h3 className="text-naughty-pink font-semibold mb-1">
                        {isEnglish ? "Express Gratitude" : "कृतज्ञता व्यक्त करें"}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {isEnglish
                          ? "Share appreciation for specific ways they've positively impacted your life."
                          : "विशिष्ट तरीकों के लिए प्रशंसा साझा करें जिनसे उन्होंने आपके जीवन पर सकारात्मक प्रभाव डाला है।"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="text-2xl">💌</div>
                    <div>
                      <h3 className="text-naughty-pink font-semibold mb-1">
                        {isEnglish ? "Make It Tangible" : "इसे मूर्त बनाएं"}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {isEnglish
                          ? "Consider handwriting your note on special paper or including it with a small gift."
                          : "विशेष कागज पर अपना नोट हाथ से लिखने या इसे एक छोटे उपहार के साथ शामिल करने पर विचार करें।"}
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
              {isEnglish ? "Creative Delivery Ideas" : "रचनात्मक वितरण विचार"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-naughty-pink flex items-center">
                  <span className="mr-2">🧩</span>
                  {isEnglish ? "Puzzle Pieces" : "पहेली के टुकड़े"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Write your note on puzzle pieces they have to assemble to read the full message."
                    : "अपना नोट पहेली के टुकड़ों पर लिखें जिन्हें उन्हें पूरा संदेश पढ़ने के लिए जोड़ना होगा।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-naughty-pink flex items-center">
                  <span className="mr-2">💭</span>
                  {isEnglish ? "Jar of Notes" : "नोट्स का जार"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Create multiple tiny notes in a decorative jar they can pull from anytime."
                    : "एक सजावटी जार में कई छोटे नोट बनाएं जिन्हें वे कभी भी निकाल सकते हैं।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-naughty-pink flex items-center">
                  <span className="mr-2">☕</span>
                  {isEnglish ? "Morning Surprise" : "सुबह का सरप्राइज"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Place the note under their coffee mug or breakfast plate for a sweet morning surprise."
                    : "एक मीठे सुबह के आश्चर्य के लिए उनके कॉफी मग या नाश्ते की प्लेट के नीचे नोट रखें।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-naughty-pink flex items-center">
                  <span className="mr-2">📱</span>
                  {isEnglish ? "Scheduled Text" : "शेड्यूल्ड टेक्स्ट"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Schedule the note to arrive as a text message during their day when they least expect it."
                    : "जब वे सबसे कम उम्मीद करते हैं, तब उनके दिन के दौरान टेक्स्ट मैसेज के रूप में पहुंचने के लिए नोट शेड्यूल करें।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-naughty-pink flex items-center">
                  <span className="mr-2">📖</span>
                  {isEnglish ? "Bookmark" : "बुकमार्क"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Create a beautiful bookmark with your note on it for your book-loving partner."
                    : "अपने किताब प्रेमी पार्टनर के लिए अपने नोट के साथ एक सुंदर बुकमार्क बनाएं।"}
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-naughty-pink flex items-center">
                  <span className="mr-2">🧸</span>
                  {isEnglish ? "Treasure Hunt" : "ट्रेज़र हंट"}
                </h3>
                <p className="text-sm text-gray-300">
                  {isEnglish
                    ? "Create a mini treasure hunt with clues leading to your heartfelt note."
                    : "अपने दिल से निकले नोट तक पहुंचाने वाले सुराग के साथ एक मिनी ट्रेज़र हंट बनाएं।"}
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

export default LoveNoteGeneratorPage;
