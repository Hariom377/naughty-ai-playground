
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
  const isHomePage = location.pathname === '/';
  const showPremiumBanner = user.isLoggedIn && user.subscription === 'free' && !isHomePage;

  React.useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-naughty-dark">
      <Navbar />
      {showPremiumBanner && <PremiumBanner />}
      <main className="flex-grow w-full px-4 py-6 md:py-10">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
