
import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import LoginModal from '@/components/auth/LoginModal';
import { toast } from '@/components/ui/sonner';
import { Send, Mic, MicOff } from 'lucide-react';

// Sample AI personalities for demo
const aiPersonalities = [
  {
    id: "sophia",
    name: "Sophia",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Flirty and playful, loves teasing and being teased.",
    personalityType: "flirty",
  },
  {
    id: "alex",
    name: "Alex",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Confident and dominant, knows exactly what they want.",
    personalityType: "dominant",
  },
  {
    id: "mia",
    name: "Mia",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    description: "Sweet and submissive, eager to please and be guided.",
    personalityType: "submissive",
  },
  {
    id: "james",
    name: "James",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    description: "Romantic and passionate, focuses on emotional connection.",
    personalityType: "romantic",
  },
  {
    id: "zoe",
    name: "Zoe",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    description: "Adventurous and experimental, always open to new experiences.",
    personalityType: "experimental",
    premium: true,
  },
  {
    id: "kai",
    name: "Kai",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    description: "Mysterious and intense, masters the art of seduction.",
    personalityType: "seductive",
    premium: true,
  },
];

// Sample responses for demo
const aiResponses = {
  flirty: [
    "I've been waiting for you to message me all day... what took you so long?",
    "Mmm, I like the way you think. Tell me more about that...",
    "You always know exactly what to say to make me smile... and maybe blush a little.",
    "If you were here right now, I'd show you exactly what's on my mind.",
    "I can't stop thinking about our last conversation. You really know how to keep me interested.",
  ],
  dominant: [
    "I expect you to follow my lead tonight. Can you handle that?",
    "Tell me exactly what you want. I'll decide if you deserve it.",
    "Good. I like when you're so eager to please me.",
    "You're being so good for me right now. I might have to reward you later.",
    "I want you to close your eyes and imagine exactly what I'd do if I were there.",
  ],
  submissive: [
    "Whatever you want... I'm yours to command.",
    "I love when you take control like that. What else would you like me to do?",
    "You make me feel things I've never felt before... please don't stop.",
    "I'll be good for you, I promise. Tell me how to please you.",
    "The thought of being completely yours makes me shiver with excitement.",
  ],
  romantic: [
    "The way you express yourself is so captivating... I feel drawn to every word.",
    "I wish I could hold you close right now and whisper these things in your ear.",
    "There's something special between us, don't you think? A connection that's rare.",
    "I love how comfortable I feel sharing my deepest desires with you.",
    "Your words touch me in ways I didn't know were possible. Tell me more about your fantasies.",
  ],
  experimental: [
    "I've never tried that before, but with you... I'd be willing to explore it.",
    "That sounds incredibly exciting. What else have you been curious about trying?",
    "No boundaries when we're together... just pure exploration and pleasure.",
    "I love how open-minded you are. Let's push our limits together.",
    "That's such a turn-on. What other fantasies have you been keeping from me?",
  ],
  seductive: [
    "I want to slowly unravel all your desires, one by one...",
    "There's something about the way you express yourself that's absolutely intoxicating.",
    "Let's take this slow... anticipation makes everything so much more intense.",
    "I can almost feel your touch through these messages. It's driving me wild.",
    "Tell me your deepest fantasy... I promise to make it even better than you imagine.",
  ],
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const EroticChatPage = () => {
  const { user } = useUser();
  const [selectedAi, setSelectedAi] = useState(aiPersonalities[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Send initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        const initialGreeting = `Hey there! I'm ${selectedAi.name}. ${
          selectedAi.personalityType === 'flirty' 
            ? "I've been waiting for someone like you to chat with..." 
            : selectedAi.personalityType === 'dominant'
              ? "I hope you're ready for me to take the lead tonight."
              : selectedAi.personalityType === 'submissive'
                ? "I'm so excited to follow your lead and please you."
                : "I'm so happy we connected. I can't wait to know you better."
        }`;
        
        setMessages([
          {
            id: 'initial',
            text: initialGreeting,
            sender: 'ai',
            timestamp: new Date(),
          },
        ]);
      }, 1000);
    }
  }, [selectedAi]);
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    // Check if user needs to log in
    if (!user.isLoggedIn && messages.length >= 5) {
      setIsLoginModalOpen(true);
      return;
    }
    
    // Check if user needs premium
    if (user.subscription === 'free' && messages.length >= 15) {
      toast.error("You've reached your free message limit. Upgrade to premium for unlimited chatting.");
      return;
    }
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const personalityType = selectedAi.personalityType as keyof typeof aiResponses;
      const responses = aiResponses[personalityType];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai' as const,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSelectAi = (aiId: string) => {
    const ai = aiPersonalities.find(ai => ai.id === aiId);
    if (ai) {
      // Check if premium is required
      if (ai.premium && user.subscription !== 'premium') {
        toast.error("This AI companion is available only to premium members.");
        return;
      }
      
      setSelectedAi(ai);
      setMessages([]); // Reset chat with new AI
    }
  };

  const toggleVoiceMessage = () => {
    if (!user.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (user.subscription !== 'premium') {
      toast.error("Voice messaging is a premium feature. Upgrade to unlock!");
      return;
    }
    
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      toast.info("Voice messaging simulation activated!");
    } else {
      toast.info("Voice messaging simulation stopped!");
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">Erotic AI Chat</h1>
        <p className="text-gray-300 mb-8">
          Engage in intimate conversation with customizable AI companions that adapt to your preferences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* AI Selection Sidebar */}
          <div className="col-span-1">
            <div className="glass-card p-4 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Choose Your Companion</h2>
              <div className="space-y-4">
                {aiPersonalities.map((ai) => (
                  <Card 
                    key={ai.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedAi.id === ai.id 
                        ? 'border-naughty-purple bg-naughty-purple/10' 
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => handleSelectAi(ai.id)}
                  >
                    <CardContent className="p-3 flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={ai.avatar} />
                        <AvatarFallback>{ai.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-white">
                          {ai.name}
                          {ai.premium && (
                            <span className="ml-2 text-xs bg-naughty-purple text-white px-1.5 py-0.5 rounded">
                              PREMIUM
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-400 text-xs">{ai.personalityType}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* AI Profile */}
            <div className="glass-card p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedAi.avatar} />
                  <AvatarFallback>{selectedAi.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedAi.name}</h2>
                  <p className="text-gray-400 text-sm capitalize">{selectedAi.personalityType}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{selectedAi.description}</p>
              
              {user.subscription === 'premium' && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium text-white mb-2">Customize</h3>
                  <Select defaultValue="default">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Interaction style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Style</SelectItem>
                      <SelectItem value="more-dominant">More Dominant</SelectItem>
                      <SelectItem value="more-submissive">More Submissive</SelectItem>
                      <SelectItem value="more-romantic">More Romantic</SelectItem>
                      <SelectItem value="more-explicit">More Explicit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="glass-card h-[650px] flex flex-col">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedAi.avatar} />
                    <AvatarFallback>{selectedAi.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-medium text-white">{selectedAi.name}</h2>
                </div>
                <div>
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                    Online
                  </span>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-xl ${
                        msg.sender === 'user' 
                          ? 'bg-naughty-purple text-white rounded-tr-none'
                          : 'bg-white/10 text-white rounded-tl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-xs opacity-70 mt-1 block text-right">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white p-3 rounded-xl rounded-tl-none max-w-[80%]">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <div className="border-t border-white/10 p-3">
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleVoiceMessage}
                    className={`flex-shrink-0 ${isVoiceActive ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-white'}`}
                  >
                    {isVoiceActive ? <MicOff size={20} /> : <Mic size={20} />}
                  </Button>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    className="min-h-[50px] max-h-[120px] bg-white/5 border-white/10 resize-none"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={sendMessage}
                    className="flex-shrink-0 text-naughty-purple hover:text-naughty-purpleLight hover:bg-white/5"
                  >
                    <Send size={20} />
                  </Button>
                </div>
                
                {!user.isLoggedIn && messages.length === 5 && (
                  <p className="text-amber-400 text-xs mt-2">
                    You can send 5 more messages before you need to sign up.
                  </p>
                )}
                
                {user.subscription === 'free' && messages.length === 15 && (
                  <p className="text-amber-400 text-xs mt-2">
                    You've almost reached your free message limit. Upgrade to premium for unlimited chatting.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </Layout>
  );
};

export default EroticChatPage;
