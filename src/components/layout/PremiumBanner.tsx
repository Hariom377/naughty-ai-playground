
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { X } from 'lucide-react';

const PremiumBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { upgradeToPremium } = useUser();

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleUpgrade = () => {
    upgradeToPremium();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-naughty-purpleDark to-naughty-purple text-white py-2 px-4 relative animate-fade-in">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm sm:text-base text-center sm:text-left mb-2 sm:mb-0">
          <span className="font-medium">Upgrade to Premium</span> for unlimited messages, image generation and more!
        </p>
        <div className="flex items-center gap-4">
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={handleUpgrade}
            className="bg-white text-naughty-purpleDark hover:bg-white/90"
          >
            Upgrade Now
          </Button>
        </div>
        <button 
          onClick={handleClose}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
          aria-label="Close banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default PremiumBanner;
