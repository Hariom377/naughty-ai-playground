
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useLanguage, LanguageType } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'default' | 'compact';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'default' }) => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
  ];

  const handleLanguageChange = (lang: LanguageType) => {
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={variant === 'compact' ? 'sm' : 'default'} 
          className="flex items-center gap-2"
        >
          <Globe size={variant === 'compact' ? 16 : 18} />
          {variant === 'default' && (
            <span>{language === 'en' ? 'EN' : 'हिं'}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            onClick={() => handleLanguageChange(lang.code as LanguageType)}
            className={language === lang.code ? "bg-muted" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
