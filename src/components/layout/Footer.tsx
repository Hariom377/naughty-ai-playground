
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">NaughtyyAI</h3>
            <p className="text-gray-400 text-sm">
              AI-powered intimacy tools for adults. Explore digital intimacy in a safe, 
              private, and fun environment.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('features')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sexting-generator" className="text-gray-400 hover:text-naughty-purple text-sm transition-colors">
                  {t('sextingGenerator')}
                </Link>
              </li>
              <li>
                <Link to="/dirty-talk-ideas" className="text-gray-400 hover:text-naughty-purple text-sm transition-colors">
                  {t('dirtyTalkIdeas')}
                </Link>
              </li>
              <li>
                <Link to="/erotic-chat" className="text-gray-400 hover:text-naughty-purple text-sm transition-colors">
                  {t('eroticChat')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-naughty-purple text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-naughty-purple text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-naughty-purple text-sm transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-naughty-purple text-sm transition-colors">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            {t('copyright')}
          </p>
          <div className="flex space-x-4">
            <Link to="#" className="text-gray-500 hover:text-naughty-purple text-sm transition-colors">
              {t('contactUs')}
            </Link>
            <Link to="#" className="text-gray-500 hover:text-naughty-purple text-sm transition-colors">
              {t('support')}
            </Link>
            <Link to="#" className="text-gray-500 hover:text-naughty-purple text-sm transition-colors">
              {t('faq')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
