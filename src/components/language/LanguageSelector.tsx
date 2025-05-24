
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
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  ];

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language) || languages[0];
  };

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
            <span className="flex items-center gap-1">
              <span>{getCurrentLanguage().flag}</span>
              <span>{getCurrentLanguage().code.toUpperCase()}</span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-64 overflow-y-auto">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            onClick={() => handleLanguageChange(lang.code as LanguageType)}
            className={language === lang.code ? "bg-muted" : ""}
          >
            <span className="flex items-center gap-2 w-full">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
