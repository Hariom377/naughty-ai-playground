
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Flower, MessageCircleHeart, Calculator } from 'lucide-react';

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
          <h1 className="text-4xl md:text-6xl mb-6 text-gradient leading-tight font-love">
            Grow Your Relationship
          </h1>
          <p className="text-lg md:text-xl text-naughty-pink mb-8 max-w-2xl mx-auto">
            Simple tools to help couples connect, communicate better, and strengthen their bond ✨
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="romantic-button group">
              <Link to="/sexting-generator">
                Send Love Notes <Heart size={16} className="ml-2 group-hover:animate-heart-beat" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-naughty-purple text-naughty-pink hover:bg-naughty-purple/10">
              <Link to="/erotic-chat">
                Get Relationship Advice <MessageCircleHeart size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black/10 rounded-3xl my-12">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center mb-6 text-gradient font-love">Our Tools</h2>
          <p className="text-center text-naughty-pink/80 mb-12 max-w-2xl mx-auto">
            Everything you need to keep your relationship fresh and exciting 💘
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="romantic-card p-6 feature-card-hover">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">💌</span>
              </div>
              <h3 className="text-xl mb-3 text-white text-center">Love Messages</h3>
              <p className="text-naughty-pink/80 mb-4 text-center">
                Create sweet messages for your partner
              </p>
              <div className="flex justify-center">
                <Button asChild variant="ghost" className="text-naughty-purple hover:text-naughty-pink hover:bg-white/5">
                  <Link to="/sexting-generator">
                    Write Now <Heart size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="romantic-card p-6 feature-card-hover">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">💋</span>
              </div>
              <h3 className="text-xl mb-3 text-white text-center">Couple Talks</h3>
              <p className="text-naughty-pink/80 mb-4 text-center">
                Find the right words for intimate moments
              </p>
              <div className="flex justify-center">
                <Button asChild variant="ghost" className="text-naughty-purple hover:text-naughty-pink hover:bg-white/5">
                  <Link to="/dirty-talk-ideas">
                    Get Ideas <Flower size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="romantic-card p-6 feature-card-hover">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">💞</span>
              </div>
              <h3 className="text-xl mb-3 text-white text-center">Relationship Chat</h3>
              <p className="text-naughty-pink/80 mb-4 text-center">
                Get advice for your relationship questions
              </p>
              <div className="flex justify-center">
                <Button asChild variant="ghost" className="text-naughty-purple hover:text-naughty-pink hover:bg-white/5">
                  <Link to="/erotic-chat">
                    Chat Now <MessageCircleHeart size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="romantic-card p-6 feature-card-hover">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-xl mb-3 text-white text-center">Creator Calculator</h3>
              <p className="text-naughty-pink/80 mb-4 text-center">
                Calculate potential income from content
              </p>
              <div className="flex justify-center">
                <Button asChild variant="ghost" className="text-naughty-purple hover:text-naughty-pink hover:bg-white/5">
                  <Link to="/income-calculator">
                    Calculate <Calculator size={16} className="ml-2" />
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
                  Get more relationship tools and features
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-white">
                    <span className="mr-2">💖</span> Unlimited messages
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">💝</span> Voice messages
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">💌</span> Create romantic images
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">💞</span> Save your chats
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">✨</span> No ads
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
          <h2 className="text-3xl font-love text-center mb-12 text-gradient">Common Questions</h2>
          
          <div className="space-y-6">
            <div className="romantic-card p-6">
              <h3 className="text-xl mb-2 text-white">Is it free to use? 💭</h3>
              <p className="text-naughty-pink/80">
                Yes! Basic features are free. Premium features need a subscription.
              </p>
            </div>
            
            <div className="romantic-card p-6">
              <h3 className="text-xl mb-2 text-white">Is my data private? 🔒</h3>
              <p className="text-naughty-pink/80">
                Yes. We keep your chats private. We don't share your personal messages.
              </p>
            </div>
            
            <div className="romantic-card p-6">
              <h3 className="text-xl mb-2 text-white">Can I use it on my phone? 📱</h3>
              <p className="text-naughty-pink/80">
                Yes! Works on all phones, tablets, and computers.
              </p>
            </div>
            
            <div className="romantic-card p-6">
              <h3 className="text-xl mb-2 text-white">How do I cancel? 💫</h3>
              <p className="text-naughty-pink/80">
                Cancel anytime in your account settings. You'll keep premium until your billing period ends.
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
          <h2 className="text-3xl font-love mb-6 text-gradient">Start Your Journey ✨</h2>
          <p className="text-lg text-naughty-pink/80 mb-8">
            Begin today and strengthen your relationship in new ways
          </p>
          <Button asChild size="lg" className="romantic-button group">
            <Link to="/sexting-generator">
              Try It Free <Heart size={16} className="ml-2 group-hover:animate-heart-beat" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
