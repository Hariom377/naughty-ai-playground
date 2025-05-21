
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Flower, Kiss, Wine } from 'lucide-react';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 relative">
        <div className="absolute top-10 left-10 opacity-30 animate-floating">
          <span className="text-4xl">💕</span>
        </div>
        <div className="absolute top-20 right-20 opacity-20 animate-floating" style={{animationDelay: "1s"}}>
          <span className="text-3xl">💘</span>
        </div>
        <div className="absolute bottom-10 left-1/4 opacity-30 animate-floating" style={{animationDelay: "2s"}}>
          <span className="text-4xl">💖</span>
        </div>
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-love mb-6 text-gradient leading-tight">
            Experience the Romance <br className="hidden md:block" /> of Digital Intimacy
          </h1>
          <p className="text-lg md:text-xl text-naughty-pink mb-8 max-w-2xl mx-auto">
            LoveWhisper provides intelligent, personalized tools for exploring and enhancing your romantic conversations and deepest fantasies. 💫
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="romantic-button group">
              <Link to="/sexting-generator">
                Try For Free <Heart size={16} className="ml-2 group-hover:animate-heart-beat" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-naughty-purple text-naughty-pink hover:bg-naughty-purple/10">
              <Link to="/erotic-chat">
                Explore Intimate Chat <Kiss size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black/10 rounded-3xl my-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-love text-center mb-6 text-gradient">Our Enchanting Features</h2>
          <p className="text-center text-naughty-pink/80 mb-12 max-w-2xl mx-auto">
            Discover tools designed to ignite passion and create memorable moments between you and your partner 💘
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="romantic-card p-6 feature-card-hover">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">💌</span>
              </div>
              <h3 className="text-xl font-romantic mb-3 text-white text-center">Love Message Generator</h3>
              <p className="text-naughty-pink/80 mb-4 text-center">
                Create flirty, passionate, or deeply romantic messages tailored to express your deepest feelings.
              </p>
              <div className="flex justify-center">
                <Button asChild variant="ghost" className="text-naughty-purple hover:text-naughty-pink hover:bg-white/5">
                  <Link to="/sexting-generator">
                    Create Messages <Heart size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="romantic-card p-6 feature-card-hover">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">💋</span>
              </div>
              <h3 className="text-xl font-romantic mb-3 text-white text-center">Sweet Talk Ideas</h3>
              <p className="text-naughty-pink/80 mb-4 text-center">
                Browse a collection of romantic phrases to express your feelings and ignite passion in your relationship.
              </p>
              <div className="flex justify-center">
                <Button asChild variant="ghost" className="text-naughty-purple hover:text-naughty-pink hover:bg-white/5">
                  <Link to="/dirty-talk-ideas">
                    Explore Ideas <Flower size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="romantic-card p-6 feature-card-hover">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">💞</span>
              </div>
              <h3 className="text-xl font-romantic mb-3 text-white text-center">Romantic AI Chat</h3>
              <p className="text-naughty-pink/80 mb-4 text-center">
                Engage in heartfelt conversations with AI companions that adapt to your romantic style and preferences.
              </p>
              <div className="flex justify-center">
                <Button asChild variant="ghost" className="text-naughty-purple hover:text-naughty-pink hover:bg-white/5">
                  <Link to="/erotic-chat">
                    Start Chatting <Kiss size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-naughty-purpleDark to-naughty-purple rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-love mb-4 text-white">Upgrade to Premium 💎</h2>
                <p className="text-naughty-pink/90 mb-6">
                  Elevate your romantic experience with exclusive premium features designed to deepen your connection.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-white">
                    <span className="mr-2">💖</span> Unlimited message generation
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">💝</span> Voice message support
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">💌</span> Romantic image generation
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">💞</span> Save conversation history
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">✨</span> No advertisements
                  </li>
                </ul>
                <Button size="lg" className="bg-white text-naughty-purple hover:bg-white/90">
                  Upgrade Now <Heart size={16} className="ml-2" />
                </Button>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="bg-white/10 p-6 rounded-full h-48 w-48 flex items-center justify-center relative">
                  <span className="text-6xl animate-heart-beat">❤️</span>
                  <span className="absolute -top-6 -right-2 text-3xl animate-floating">💕</span>
                  <span className="absolute -bottom-2 -left-4 text-2xl animate-floating" style={{animationDelay: "1.5s"}}>💘</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-love text-center mb-12 text-gradient">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="romantic-card p-6">
              <h3 className="text-xl font-romantic mb-2 text-white">Is LoveWhisper really free to use? 💭</h3>
              <p className="text-naughty-pink/80">
                Yes! Basic features are available for free. Premium features require a subscription for unlimited access to enhance your romantic experience.
              </p>
            </div>
            
            <div className="romantic-card p-6">
              <h3 className="text-xl font-romantic mb-2 text-white">Is my intimate data private and secure? 🔒</h3>
              <p className="text-naughty-pink/80">
                Absolutely. We prioritize your privacy and security. All conversations are encrypted and we never store or share your personal content.
              </p>
            </div>
            
            <div className="romantic-card p-6">
              <h3 className="text-xl font-romantic mb-2 text-white">Can I use LoveWhisper on my mobile device? 📱</h3>
              <p className="text-naughty-pink/80">
                Yes! LoveWhisper is designed to work beautifully on all modern devices, including smartphones and tablets.
              </p>
            </div>
            
            <div className="romantic-card p-6">
              <h3 className="text-xl font-romantic mb-2 text-white">How do I cancel my premium subscription? 💫</h3>
              <p className="text-naughty-pink/80">
                You can cancel your subscription anytime from your account settings. Your premium access will continue until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute left-4 top-10 opacity-20 animate-floating" style={{animationDelay: "0.5s"}}>
          <span className="text-5xl">💕</span>
        </div>
        <div className="absolute right-10 bottom-10 opacity-30 animate-floating" style={{animationDelay: "1.2s"}}>
          <span className="text-4xl">💓</span>
        </div>
      
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-love mb-6 text-gradient">Ready to Ignite the Romance? ✨</h2>
          <p className="text-lg text-naughty-pink/80 mb-8">
            Start your journey into AI-powered intimacy today and discover a new world of heartfelt connections.
          </p>
          <Button asChild size="lg" className="romantic-button group">
            <Link to="/sexting-generator">
              Begin Your Love Journey <Heart size={16} className="ml-2 group-hover:animate-heart-beat" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
