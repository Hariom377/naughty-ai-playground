
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import PremiumBanner from './PremiumBanner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useUser();
  const isHomePage = location.pathname === '/';
  const showPremiumBanner = user.isLoggedIn && user.subscription === 'free' && !isHomePage;

  return (
    <div className="flex flex-col min-h-screen bg-naughty-dark">
      <Navbar />
      {showPremiumBanner && <PremiumBanner />}
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
