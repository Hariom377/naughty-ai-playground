
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  className?: string;
  isPremium?: boolean;
  newFeature?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  to, 
  className,
  isPremium = false,
  newFeature = false
}) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  
  return (
    <Link to={to} className={cn("block", className)}>
      <Card className="h-full glass-card feature-card-hover transition-all overflow-hidden">
        <div className="relative">
          {newFeature && (
            <div className="absolute top-0 right-0">
              <span className="inline-block bg-naughty-purple text-white text-xs px-2 py-1 rounded-br-lg">
                {isEnglish ? 'NEW' : 'नया'}
              </span>
            </div>
          )}
          
          <CardHeader>
            <div className="mb-2 flex justify-center">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-naughty-purple/20 text-naughty-pink">
                {icon}
              </span>
            </div>
            <h3 className="font-bold text-xl text-center">{title}</h3>
          </CardHeader>
          
          <CardContent>
            <p className="text-center text-gray-300">{description}</p>
          </CardContent>
          
          <CardFooter className="flex justify-center pb-4">
            <Button variant="ghost" className="hover:bg-naughty-purple/20">
              {isPremium ? (
                <>
                  <span className="mr-1">✦</span>
                  {isEnglish ? 'Premium Feature' : 'प्रीमियम फीचर'}
                </>
              ) : (
                isEnglish ? 'Try Now' : 'अभी आज़माएं'
              )}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default FeatureCard;
