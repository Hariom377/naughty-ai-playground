
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Crown } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  className?: string;
  isPremium?: boolean;
  newFeature?: boolean;
  featured?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  to, 
  className,
  isPremium = false,
  newFeature = false,
  featured = false
}) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  
  return (
    <Link to={to} className={cn("block group", className)}>
      <Card className={cn(
        "h-full transition-all duration-300 overflow-hidden border-0",
        "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg",
        "hover:from-white/10 hover:to-white/15 hover:scale-[1.02]",
        "shadow-lg hover:shadow-xl hover:shadow-naughty-purple/20",
        featured && "ring-2 ring-naughty-purple/30 shadow-naughty-purple/20"
      )}>
        <div className="relative">
          {/* Badges */}
          <div className="absolute top-0 right-0 z-10 flex flex-col gap-1">
            {featured && (
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg font-semibold flex items-center gap-1">
                <Star className="w-3 h-3" />
                {isEnglish ? 'FEATURED' : 'फीचर्ड'}
              </div>
            )}
            {newFeature && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-bl-lg font-semibold">
                {isEnglish ? 'NEW' : 'नया'}
              </div>
            )}
            {isPremium && (
              <div className="bg-gradient-to-r from-naughty-purple to-naughty-purpleDark text-white text-xs px-2 py-1 rounded-bl-lg font-semibold flex items-center gap-1">
                <Crown className="w-3 h-3" />
                {isEnglish ? 'PREMIUM' : 'प्रीमियम'}
              </div>
            )}
          </div>
          
          <CardHeader className="pb-4">
            <div className="mb-3 flex justify-center">
              <div className={cn(
                "flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
                "bg-gradient-to-br from-naughty-purple/20 to-naughty-pink/20",
                "group-hover:from-naughty-purple/30 group-hover:to-naughty-pink/30",
                "group-hover:scale-110 text-naughty-pink"
              )}>
                <div className="w-6 h-6" role="img" aria-label={`${title} icon`}>
                  {icon}
                </div>
              </div>
            </div>
            <h3 className={cn(
              "font-bold text-center transition-colors",
              featured ? "text-xl text-white" : "text-lg text-gray-100",
              "group-hover:text-white"
            )}>
              {title}
            </h3>
          </CardHeader>
          
          <CardContent className="pb-6">
            <p className="text-center text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
              {description}
            </p>
          </CardContent>
          
          <CardFooter className="flex justify-center pb-4">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "transition-all duration-300 font-medium",
                "hover:bg-naughty-purple/20 hover:text-white hover:scale-105",
                isPremium ? "text-naughty-purple" : "text-gray-300"
              )}
            >
              {isPremium ? (
                <>
                  <Crown className="w-4 h-4 mr-1" />
                  {isEnglish ? 'Premium Feature' : 'प्रीमियम फीचर'}
                </>
              ) : (
                isEnglish ? 'Try Now →' : 'अभी आज़माएं →'
              )}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default FeatureCard;
