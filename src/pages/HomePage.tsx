
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient leading-tight">
            Experience AI-Powered <br className="hidden md:block" /> Digital Intimacy
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            NaughtyyAI provides intelligent, personalized tools for exploring and enhancing your sensual conversations and fantasies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-naughty-purple hover:bg-naughty-purpleDark text-white">
              <Link to="/sexting-generator">
                Try For Free <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-naughty-purple text-naughty-purple hover:bg-naughty-purple hover:text-white">
              <Link to="/erotic-chat">
                Explore AI Chat
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black/20 rounded-2xl my-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-6 feature-card-hover">
              <h3 className="text-xl font-semibold mb-3 text-white">AI Sexting Generator</h3>
              <p className="text-gray-300 mb-4">
                Create flirty, suggestive, or explicitly seductive messages tailored to different scenarios and preferences.
              </p>
              <Button asChild variant="ghost" className="text-naughty-purple hover:text-naughty-purpleLight hover:bg-white/5">
                <Link to="/sexting-generator">
                  Try It Now <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card p-6 feature-card-hover">
              <h3 className="text-xl font-semibold mb-3 text-white">Dirty Talk Ideas</h3>
              <p className="text-gray-300 mb-4">
                Browse categorized phrases based on tone, kink, and roleplay scenarios to spice up your intimate conversations.
              </p>
              <Button asChild variant="ghost" className="text-naughty-purple hover:text-naughty-purpleLight hover:bg-white/5">
                <Link to="/dirty-talk-ideas">
                  Explore Ideas <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-card p-6 feature-card-hover">
              <h3 className="text-xl font-semibold mb-3 text-white">Erotic AI Chat</h3>
              <p className="text-gray-300 mb-4">
                Engage in interactive conversations with customizable AI companions that adapt to your preferences.
              </p>
              <Button asChild variant="ghost" className="text-naughty-purple hover:text-naughty-purpleLight hover:bg-white/5">
                <Link to="/erotic-chat">
                  Chat Now <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-naughty-purpleDark to-naughty-purple rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">Upgrade to Premium</h2>
                <p className="text-gray-200 mb-6">
                  Get unlimited access to all features, no restrictions, and enhance your experience with exclusive premium content.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-white">
                    <span className="mr-2">✓</span> Unlimited message generation
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">✓</span> Voice message support
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">✓</span> NSFW image generation
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">✓</span> Save chat history
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">✓</span> No ads
                  </li>
                </ul>
                <Button size="lg" className="bg-white text-naughty-purpleDark hover:bg-white/90">
                  Upgrade Now
                </Button>
              </div>
              <div className="hidden md:block">
                <div className="flex justify-center">
                  <div className="bg-white/10 p-4 rounded-full h-48 w-48 flex items-center justify-center">
                    <span className="text-5xl">🔥</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (could be added in a future iteration) */}
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">Is NaughtyyAI really free to use?</h3>
              <p className="text-gray-300">
                Yes! Basic features are available for free. Premium features require a subscription for unlimited access.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">Is my data private and secure?</h3>
              <p className="text-gray-300">
                Absolutely. We prioritize your privacy and security. All conversations are encrypted and we never store or share your personal content.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">Can I use NaughtyyAI on my mobile device?</h3>
              <p className="text-gray-300">
                Yes! NaughtyyAI is fully responsive and works on all modern devices, including smartphones and tablets.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">How do I cancel my premium subscription?</h3>
              <p className="text-gray-300">
                You can cancel your subscription anytime from your account settings. Your premium access will continue until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Explore?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Start your journey into AI-powered intimacy today and discover a new world of digital connections.
          </p>
          <Button asChild size="lg" className="bg-naughty-purple hover:bg-naughty-purpleDark text-white">
            <Link to="/sexting-generator">
              Get Started Now <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
