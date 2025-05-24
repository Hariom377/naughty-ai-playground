
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import PremiumBanner from './PremiumBanner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useUser();
  const { language } = useLanguage();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const showPremiumBanner = user.isLoggedIn && user.subscription === 'free' && !isHomePage;

  React.useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar />
      {showPremiumBanner && <PremiumBanner />}
      <main className="flex-grow w-full">
        {isHomePage ? (
          // For home page, render children directly without padding
          children
        ) : (
          // For other pages, add container and padding
          <div className="w-full py-6 md:py-10">
            {children}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
