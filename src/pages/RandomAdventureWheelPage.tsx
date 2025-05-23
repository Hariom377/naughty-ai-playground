import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { generateWithGemini } from '@/utils/geminiApi';
import { toast } from 'sonner';
import { 
  Clock, DollarSign, ThermometerSun, Map, Share2, Check, X 
} from 'lucide-react';

const adventures = [
  {
    title: "Blindfolded Cooking Challenge",
    description: "One partner guides while the other cooks blindfolded. Create a simple dish relying only on verbal instructions and touch.",
    duration: 60,
    budget: 10,
    heatLevel: "PG",
    category: "Home"
  },
  {
    title: "Sunset Scavenger Hunt",
    description: "Create a series of clues hidden around your neighborhood, ending at a scenic spot to watch the sunset together.",
    duration: 120,
    budget: 0,
    heatLevel: "PG",
    category: "Outdoors"
  },
  {
    title: "Memory Lane Drive",
    description: "Visit locations significant to your relationship - first date spot, first kiss location, etc. Bring photos to recreate.",
    duration: 180,
    budget: 30,
    heatLevel: "PG",
    category: "Travel"
  },
  {
    title: "Couple's Massage Workshop",
    description: "Watch online tutorials together and practice giving each other massages with scented oils.",
    duration: 90,
    budget: 25,
    heatLevel: "PG-13",
    category: "Intimacy"
  },
  {
    title: "Secret Fantasy Reveal",
    description: "Write down fantasies anonymously on paper slips. Take turns drawing and discussing each one without judgment.",
    duration: 60,
    budget: 0,
    heatLevel: "R",
    category: "Intimacy"
  },
  {
    title: "Forbidden Touch Game",
    description: "Set a timer for 2 hours where you can't touch each other. Stay close, flirt, and build anticipation.",
    duration: 120,
    budget: 0,
    heatLevel: "R",
    category: "Intimacy"
  },
  {
    title: "Retro Arcade Date",
    description: "Find a local arcade and compete in classic games. Winner gets to choose dinner location.",
    duration: 180,
    budget: 50,
    heatLevel: "PG",
    category: "Entertainment"
  },
  {
    title: "DIY Spa Night",
    description: "Create a home spa with face masks, foot soaks, and relaxing music. Take turns giving each other treatments.",
    duration: 120,
    budget: 40,
    heatLevel: "PG-13",
    category: "Home"
  }
];

const RandomAdventureWheelPage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const isEnglish = language === 'en';
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState(null);
  const [duration, setDuration] = useState<[number, number]>([0, 240]);
  const [budget, setBudget] = useState<[number, number]>([0, 100]);
  const [heatLevel, setHeatLevel] = useState<string>("All");
  const [filteredAdventures, setFilteredAdventures] = useState(adventures);
  const [adventureHistory, setAdventureHistory] = useState<typeof adventures>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Filter adventures based on criteria
  useEffect(() => {
    const filtered = adventures.filter(adventure => 
      adventure.duration >= duration[0] && 
      adventure.duration <= duration[1] &&
      adventure.budget >= budget[0] &&
      adventure.budget <= budget[1] &&
      (heatLevel === "All" || adventure.heatLevel === heatLevel)
    );
    setFilteredAdventures(filtered);
  }, [duration, budget, heatLevel]);
  
  // Draw the wheel
  useEffect(() => {
    if (!canvasRef.current || filteredAdventures.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw wheel segments
    const segmentAngle = (2 * Math.PI) / filteredAdventures.length;
    
    filteredAdventures.forEach((_, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = startAngle + segmentAngle;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Alternate colors
      ctx.fillStyle = index % 2 === 0 ? '#9F7AEA' : '#D53F8C';
      ctx.fill();
      
      // Add segment number
      ctx.save();
      ctx.translate(
        centerX + (radius * 0.7) * Math.cos(startAngle + segmentAngle / 2),
        centerY + (radius * 0.7) * Math.sin(startAngle + segmentAngle / 2)
      );
      ctx.rotate(startAngle + segmentAngle / 2 + Math.PI / 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText((index + 1).toString(), 0, 0);
      ctx.restore();
    });
    
    // Draw center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#2D3748';
    ctx.fill();
    ctx.stroke();
    
    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX - 10, centerY - radius + 10);
    ctx.lineTo(centerX + 10, centerY - radius + 10);
    ctx.closePath();
    ctx.fillStyle = '#FC8181';
    ctx.fill();
    
  }, [filteredAdventures, isSpinning]);
  
  const spinWheel = () => {
    if (filteredAdventures.length === 0) {
      toast.error(isEnglish ? "No adventures match your filters" : "कोई साहसिक कार्य आपके फ़िल्टर से मेल नहीं खाता");
      return;
    }
    
    setIsSpinning(true);
    setSelectedAdventure(null);
    
    // Simulate wheel spinning
    const spinDuration = 3000; // 3 seconds
    const startTime = Date.now();
    
    const spin = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      if (progress < 1) {
        // Keep spinning
        requestAnimationFrame(spin);
      } else {
        // Spinning complete, select random adventure
        const randomIndex = Math.floor(Math.random() * filteredAdventures.length);
        const selected = filteredAdventures[randomIndex];
        
        setSelectedAdventure(selected);
        setAdventureHistory(prev => [...prev, selected]);
        setIsSpinning(false);
      }
    };
    
    requestAnimationFrame(spin);
  };
  
  const generateCustomAdventure = async () => {
    try {
      const prompt = `Create a unique, creative date adventure for couples with the following parameters:
Duration: ${duration[0]}-${duration[1]} minutes
Budget: $${budget[0]}-$${budget[1]}
Heat Level: ${heatLevel}

The response should include:
1. A catchy title (10 words or less)
2. A brief description (2-3 sentences)
3. Approximate duration in minutes
4. Estimated budget in dollars
5. Heat level (PG, PG-13, or R)
6. Category (Home, Outdoors, Travel, Entertainment, or Intimacy)

Make it fun, specific, and practical for couples to implement.`;

      setIsSpinning(true);
      
      const response = await generateWithGemini({
        prompt,
        temperature: 0.8,
      });
      
      // Parse the response
      try {
        // Try to extract structured information from the text
        const titleMatch = response.match(/^(.*?)(?:\n|$)/);
        const title = titleMatch ? titleMatch[1].trim() : "Custom Adventure";
        
        const descriptionMatch = response.match(/(?:description:|^(?!.*?:))(.*?)(?=duration:|budget:|heat level:|category:|$)/is);
        const description = descriptionMatch ? descriptionMatch[1].trim() : response;
        
        const durationMatch = response.match(/duration:?\s*(\d+)/i);
        const extractedDuration = durationMatch ? parseInt(durationMatch[1]) : Math.floor((duration[0] + duration[1]) / 2);
        
        const budgetMatch = response.match(/budget:?\s*\$?(\d+)/i);
        const extractedBudget = budgetMatch ? parseInt(budgetMatch[1]) : Math.floor((budget[0] + budget[1]) / 2);
        
        const heatMatch = response.match(/heat level:?\s*(PG|PG-13|R)/i);
        const extractedHeat = heatMatch ? heatMatch[1] : heatLevel === "All" ? "PG" : heatLevel;
        
        const categoryMatch = response.match(/category:?\s*(Home|Outdoors|Travel|Entertainment|Intimacy)/i);
        const extractedCategory = categoryMatch ? categoryMatch[1] : "Home";
        
        const customAdventure = {
          title,
          description,
          duration: extractedDuration,
          budget: extractedBudget,
          heatLevel: extractedHeat,
          category: extractedCategory
        };
        
        setSelectedAdventure(customAdventure);
        setAdventureHistory(prev => [...prev, customAdventure]);
      } catch (error) {
        console.error("Error parsing custom adventure:", error);
        setSelectedAdventure({
          title: "Custom Adventure",
          description: response,
          duration: Math.floor((duration[0] + duration[1]) / 2),
          budget: Math.floor((budget[0] + budget[1]) / 2),
          heatLevel: heatLevel === "All" ? "PG" : heatLevel,
          category: "Home"
        });
      }
      
    } catch (error) {
      console.error("Error generating custom adventure:", error);
      toast.error(isEnglish ? "Failed to generate custom adventure" : "कस्टम एडवेंचर जेनरेट करने में विफल");
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            {isEnglish ? 'Random Adventure Wheel' : 'रैंडम एडवेंचर व्हील'}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {isEnglish 
              ? 'Spin for surprising adventures that break your routine' 
              : 'अपनी दिनचर्या को तोड़ने वाले आश्चर्यजनक रोमांच के लिए स्पिन करें'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="glass-card p-6 mb-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">
                {isEnglish ? 'Adventure Settings' : 'एडवेंचर सेटिंग्स'}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-white">
                      {isEnglish ? 'Duration (minutes)' : 'अवधि (मिनट)'}
                    </Label>
                    <span className="text-sm">
                      {duration[0]} - {duration[1]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setDuration([10, 60])}
                      className={duration[0] === 10 && duration[1] === 60 ? "bg-naughty-purple/30" : ""}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {isEnglish ? 'Quick' : 'जल्दी'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setDuration([60, 120])}
                      className={duration[0] === 60 && duration[1] === 120 ? "bg-naughty-purple/30" : ""}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {isEnglish ? 'Medium' : 'मध्यम'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setDuration([120, 240])}
                      className={duration[0] === 120 && duration[1] === 240 ? "bg-naughty-purple/30" : ""}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {isEnglish ? 'Long' : 'लंबे'}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-white">
                      {isEnglish ? 'Budget ($)' : 'बजट ($)'}
                    </Label>
                    <span className="text-sm">
                      ${budget[0]} - ${budget[1]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setBudget([0, 20])}
                      className={budget[0] === 0 && budget[1] === 20 ? "bg-naughty-purple/30" : ""}
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      {isEnglish ? 'Free/Cheap' : 'फ्री/सस्ता'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setBudget([20, 50])}
                      className={budget[0] === 20 && budget[1] === 50 ? "bg-naughty-purple/30" : ""}
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      {isEnglish ? 'Moderate' : 'मध्यम'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setBudget([50, 500])}
                      className={budget[0] === 50 && budget[1] === 500 ? "bg-naughty-purple/30" : ""}
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      {isEnglish ? 'Splurge' : 'धन खर्च'}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-white">
                      {isEnglish ? 'Heat Level' : 'हीट लेवल'}
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setHeatLevel("PG")}
                      className={heatLevel === "PG" ? "bg-naughty-purple/30" : ""}
                    >
                      <ThermometerSun className="h-4 w-4 mr-1" />
                      PG
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setHeatLevel("PG-13")}
                      className={heatLevel === "PG-13" ? "bg-naughty-purple/30" : ""}
                    >
                      <ThermometerSun className="h-4 w-4 mr-1" />
                      PG-13
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setHeatLevel("R")}
                      className={heatLevel === "R" ? "bg-naughty-purple/30" : ""}
                    >
                      <ThermometerSun className="h-4 w-4 mr-1" />
                      R
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full" onClick={() => setHeatLevel("All")}>
                  {isEnglish ? 'Reset Filters' : 'फिल्टर रीसेट करें'}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="glass-card p-6 mb-6 text-center">
              <div className="mb-6">
                <canvas 
                  ref={canvasRef}
                  width={300}
                  height={300}
                  className={`mx-auto ${isSpinning ? 'animate-spin' : ''}`}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="romantic" 
                  onClick={spinWheel}
                  disabled={isSpinning || filteredAdventures.length === 0}
                  className="px-8"
                >
                  {isEnglish ? 'Spin the Wheel!' : 'व्हील घुमाएँ!'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={generateCustomAdventure}
                  disabled={isSpinning}
                >
                  {isEnglish ? 'Generate Custom Adventure' : 'कस्टम एडवेंचर जेनरेट करें'}
                </Button>
              </div>
              
              {filteredAdventures.length === 0 && (
                <p className="mt-4 text-amber-400">
                  {isEnglish 
                    ? 'No adventures match your filters. Try different settings.' 
                    : 'कोई साहसिक कार्य आपके फ़िल्टर से मेल नहीं खाता। अलग सेटिंग्स आज़माएँ।'}
                </p>
              )}
            </div>
            
            {selectedAdventure && (
              <div className="glass-card p-6 mb-6 animate-fade-in">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gradient">
                    {selectedAdventure.title}
                  </h2>
                </div>
                
                <p className="mb-6 text-lg">
                  {selectedAdventure.description}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 p-3 rounded-lg flex items-center">
                    <Clock className="text-naughty-pink mr-2 h-4 w-4" />
                    <div>
                      <span className="text-xs text-gray-400 block">
                        {isEnglish ? 'Duration' : 'अवधि'}
                      </span>
                      <span>{selectedAdventure.duration} {isEnglish ? 'mins' : 'मिनट'}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg flex items-center">
                    <DollarSign className="text-naughty-pink mr-2 h-4 w-4" />
                    <div>
                      <span className="text-xs text-gray-400 block">
                        {isEnglish ? 'Budget' : 'बजट'}
                      </span>
                      <span>${selectedAdventure.budget}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg flex items-center">
                    <ThermometerSun className="text-naughty-pink mr-2 h-4 w-4" />
                    <div>
                      <span className="text-xs text-gray-400 block">
                        {isEnglish ? 'Heat Level' : 'हीट लेवल'}
                      </span>
                      <span>{selectedAdventure.heatLevel}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    {isEnglish ? 'Share' : 'शेयर करें'}
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Map className="mr-2 h-4 w-4" />
                    {isEnglish ? 'Find Nearby' : 'पास में खोजें'}
                  </Button>
                  
                  <Button variant="default" size="sm">
                    <Check className="mr-2 h-4 w-4" />
                    {isEnglish ? 'Mark Complete' : 'पूर्ण चिह्नित करें'}
                  </Button>
                </div>
              </div>
            )}
            
            {adventureHistory.length > 0 && (
              <div className="mb-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full justify-between"
                >
                  <span>{isEnglish ? 'Adventure History' : 'एडवेंचर हिस्ट्री'}</span>
                  <span>{showHistory ? '▲' : '▼'}</span>
                </Button>
                
                {showHistory && (
                  <div className="bg-white/5 rounded-lg p-4 mt-2 max-h-96 overflow-auto">
                    {adventureHistory.map((adventure, index) => (
                      <div 
                        key={index} 
                        className="border-b border-white/10 py-3 last:border-0 flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-medium text-naughty-pink">{adventure.title}</h4>
                          <p className="text-sm text-gray-400">{adventure.category} • {adventure.heatLevel}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => setSelectedAdventure(adventure)}
                          >
                            {isEnglish ? 'View' : 'देखें'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-400"
                            onClick={() => setAdventureHistory(prev => prev.filter((_, i) => i !== index))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RandomAdventureWheelPage;
