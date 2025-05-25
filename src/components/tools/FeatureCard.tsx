
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  className?: string;
  isPremium?: boolean;
  newFeature?: boolean;
  onPreview?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  to, 
  className,
  isPremium = false,
  newFeature = false,
  onPreview
}) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  
  return (
    <Card className={cn("h-full glass-card feature-card-hover transition-all duration-300 overflow-hidden group", className)}>
      <div className="relative">
        {newFeature && (
          <div className="absolute top-0 right-0 z-10">
            <span className="inline-block bg-gradient-to-r from-naughty-purple to-naughty-pink text-white text-xs px-3 py-1 rounded-bl-lg font-medium shadow-lg">
              {isEnglish ? 'NEW' : 'नया'}
            </span>
          </div>
        )}
        
        <CardHeader className="pb-4">
          <div className="mb-3 flex justify-center">
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-naughty-purple/20 to-naughty-pink/20 text-naughty-pink group-hover:scale-110 transition-transform duration-300">
              {icon}
            </span>
          </div>
          <h3 className="font-bold text-xl text-center group-hover:text-naughty-pink transition-colors duration-300">
            {title}
          </h3>
        </CardHeader>
        
        <CardContent className="pb-4">
          <p className="text-center text-gray-300 leading-relaxed">{description}</p>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-2 pb-6">
          <div className="flex gap-2 w-full">
            <Button 
              asChild 
              className="flex-1 romantic-button hover:shadow-lg transition-all duration-300"
            >
              <Link to={to} className="flex items-center justify-center gap-2">
                {isPremium ? (
                  <>
                    <span className="text-lg">✦</span>
                    {isEnglish ? 'Premium' : 'प्रीमियम'}
                  </>
                ) : (
                  <>
                    {isEnglish ? 'Try Now' : 'अभी आज़माएं'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Link>
            </Button>
            
            {onPreview && (
              <Button 
                variant="outline" 
                size="icon"
                onClick={onPreview}
                className="border-naughty-pink/30 hover:bg-naughty-purple/20 hover:border-naughty-pink transition-all duration-300"
                aria-label={isEnglish ? 'Preview tool' : 'टूल पूर्वावलोकन'}
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {isPremium && (
            <p className="text-xs text-naughty-pink/70 text-center mt-1">
              {isEnglish ? 'Advanced features available' : 'उन्नत सुविधाएं उपलब्ध'}
            </p>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default FeatureCard;
