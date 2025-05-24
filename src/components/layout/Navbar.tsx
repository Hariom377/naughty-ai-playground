
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoginModal from '../auth/LoginModal';
import LanguageSelector from '../language/LanguageSelector';
import { Menu, X, List, DollarSign, Book, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useUser();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleOpenLoginModal = () => {
    closeMenu();
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-gradient font-bold text-xl">NaughtyyAI</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors flex items-center">
                <Home size={16} className="mr-2" /> {t('home')}
              </Link>
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors flex items-center">
                <List size={16} className="mr-2" /> {t('features')}
              </Link>
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors flex items-center">
                <DollarSign size={16} className="mr-2" /> {t('pricing')}
              </Link>
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors flex items-center">
                <Book size={16} className="mr-2" /> {t('blog')}
              </Link>
            </div>
          </div>
          
          {/* Auth Buttons and Language Selector */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            {user.isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/70">
                  {user.subscription === 'premium' ? (
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-naughty-purple rounded-full animate-pulse-soft"></span>
                      Premium
                    </span>
                  ) : 'Free Account'}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-naughty-purple text-naughty-purple hover:bg-naughty-purple hover:text-white"
                onClick={handleOpenLoginModal}
              >
                {t('login')}
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector variant="compact" />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 flex items-center"
            >
              <Home size={16} className="mr-2" /> {t('home')}
            </Link>
            <Link
              to="/"
              onClick={closeMenu}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 flex items-center"
            >
              <List size={16} className="mr-2" /> {t('features')}
            </Link>
            <Link
              to="/"
              onClick={closeMenu}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 flex items-center"
            >
              <DollarSign size={16} className="mr-2" /> {t('pricing')}
            </Link>
            <Link
              to="/"
              onClick={closeMenu}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 flex items-center"
            >
              <Book size={16} className="mr-2" /> {t('blog')}
            </Link>
            <div className="pt-4 pb-3 border-t border-white/10">
              {user.isLoggedIn ? (
                <div className="flex flex-col space-y-2 px-3">
                  <div className="text-sm text-white/70">
                    {user.subscription === 'premium' ? (
                      <span className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 bg-naughty-purple rounded-full animate-pulse-soft"></span>
                        Premium Account
                      </span>
                    ) : 'Free Account'}
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start">
                    {t('logout')}
                  </Button>
                </div>
              ) : (
                <div className="px-3">
                  <Button
                    onClick={handleOpenLoginModal}
                    className="w-full border-naughty-purple text-naughty-purple hover:bg-naughty-purple hover:text-white"
                    variant="outline"
                  >
                    {t('login')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </nav>
  );
};

export default Navbar;
