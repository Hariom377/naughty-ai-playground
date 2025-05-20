
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import LoginModal from '@/components/auth/LoginModal';
import { Copy, Heart } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Sample data for demonstration
const dirtyTalkCategories = {
  beginner: [
    { id: 1, text: "I can't stop thinking about touching you...", tags: ["mild", "romantic", "teasing"] },
    { id: 2, text: "The things I want to do to you right now...", tags: ["mild", "suggestive", "teasing"] },
    { id: 3, text: "You have no idea how much I want you right now.", tags: ["suggestive", "passionate", "tension"] },
    { id: 4, text: "I love the way your body feels against mine.", tags: ["romantic", "sensual", "mild"] },
    { id: 5, text: "I've been thinking about our last time together all day...", tags: ["suggestive", "flirty", "reminiscing"] },
    { id: 6, text: "I want to kiss every inch of your body slowly.", tags: ["sensual", "passionate", "romantic"] },
  ],
  intermediate: [
    { id: 7, text: "I want to feel your hands exploring my body.", tags: ["sensual", "explicit", "descriptive"] },
    { id: 8, text: "I'm getting wet just thinking about you.", tags: ["explicit", "arousal", "female"] },
    { id: 9, text: "I want to hear you moan my name when you come.", tags: ["explicit", "climax", "vocal"] },
    { id: 10, text: "I'm so hard thinking about what we're going to do later.", tags: ["explicit", "arousal", "male"] },
    { id: 11, text: "I want to taste you and make you squirm.", tags: ["explicit", "oral", "teasing"] },
    { id: 12, text: "Tell me exactly how you want me to touch you.", tags: ["interactive", "control", "explicit"] },
  ],
  advanced: [
    { id: 13, text: "I want you to pin me down and take what's yours.", tags: ["dominant", "submissive", "rough"] },
    { id: 14, text: "Get on your knees and show me how much you want it.", tags: ["dominant", "submissive", "commands"] },
    { id: 15, text: "I want you to use me however you want tonight.", tags: ["submissive", "consent", "ownership"] },
    { id: 16, text: "I'm going to make you beg for it before I let you come.", tags: ["dominant", "teasing", "orgasm control"] },
    { id: 17, text: "You've been so bad. I think you need to be punished.", tags: ["dominant", "punishment", "roleplay"] },
    { id: 18, text: "I want you to pull my hair and tell me I'm yours.", tags: ["rough", "possessive", "submissive"] },
  ],
  roleplay: [
    { id: 19, text: "I've been a very naughty student. How will you discipline me, professor?", tags: ["student/teacher", "punishment", "authority"] },
    { id: 20, text: "I need a full physical examination, doctor. Don't miss any spots...", tags: ["doctor/patient", "examination", "taboo"] },
    { id: 21, text: "This is my first time, sir. Will you be gentle with me?", tags: ["innocence", "first-time", "gentle dom"] },
    { id: 22, text: "Your wish is my command, master. How may I serve you tonight?", tags: ["master/servant", "obedience", "service"] },
    { id: 23, text: "I've caught you trespassing on private property. Now you'll have to deal with me, officer.", tags: ["cop/criminal", "authority", "punishment"] },
    { id: 24, text: "I need you to fix something under my sink... and maybe something else while you're down there.", tags: ["handyman", "suggestive", "service"] },
  ]
};

const DirtyTalkIdeasPage = () => {
  const { user } = useUser();
  const [category, setCategory] = useState('beginner');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleFavorite = (id: number) => {
    if (!user.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const categoryData = dirtyTalkCategories[category as keyof typeof dirtyTalkCategories] || [];
  const isPremiumLocked = category === 'advanced' || category === 'roleplay';
  const showLockOverlay = isPremiumLocked && user.subscription !== 'premium';

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">Dirty Talk Ideas</h1>
        <p className="text-gray-300 mb-8">
          Browse phrases by category and find the perfect lines to spice up your intimate conversations.
        </p>

        <Tabs defaultValue="beginner" value={category} onValueChange={setCategory} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">
              Advanced
              {user.subscription !== 'premium' && (
                <span className="ml-1 text-xs">🔒</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="roleplay">
              Roleplay
              {user.subscription !== 'premium' && (
                <span className="ml-1 text-xs">🔒</span>
              )}
            </TabsTrigger>
          </TabsList>

          {Object.keys(dirtyTalkCategories).map((catKey) => (
            <TabsContent key={catKey} value={catKey} className="relative">
              {showLockOverlay && catKey === category ? (
                <div className="glass-card p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Premium Content</h3>
                  <p className="text-gray-300 mb-6">
                    This content is available exclusively to premium members.
                  </p>
                  <Button 
                    className="bg-naughty-purple hover:bg-naughty-purpleDark text-white"
                    onClick={() => {
                      if (user.isLoggedIn) {
                        toast.info("Upgrade feature will be available soon!");
                      } else {
                        setIsLoginModalOpen(true);
                      }
                    }}
                  >
                    {user.isLoggedIn ? "Upgrade to Premium" : "Sign Up Now"}
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dirtyTalkCategories[catKey as keyof typeof dirtyTalkCategories].map((idea) => (
                    <Card key={idea.id} className="glass-card border-white/10">
                      <CardHeader className="pb-2">
                        <div className="flex flex-wrap gap-2">
                          {idea.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-white/5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white">{idea.text}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleFavorite(idea.id)}
                          className={favorites.includes(idea.id) 
                            ? "text-naughty-purple" 
                            : "text-gray-400 hover:text-naughty-purple"}
                        >
                          <Heart size={16} className={favorites.includes(idea.id) ? "fill-naughty-purple" : ""} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(idea.text)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Copy size={16} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Tips for Effective Dirty Talk</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Start with what feels comfortable and authentic for you</li>
            <li>• Read your partner's reactions and adjust accordingly</li>
            <li>• Use descriptive language that engages multiple senses</li>
            <li>• Don't be afraid to ask what your partner likes to hear</li>
            <li>• Practice makes perfect - it gets easier with time</li>
          </ul>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </Layout>
  );
};

export default DirtyTalkIdeasPage;
