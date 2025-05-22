
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import LoginModal from '../auth/LoginModal';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useUser();
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
    <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-gradient font-bold text-xl">LoveConnect</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/sexting-generator" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                Love Messages
              </Link>
              <Link to="/dirty-talk-ideas" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                Couple Talks
              </Link>
              <Link to="/erotic-chat" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                Relationship Chat
              </Link>
              <Link to="/income-calculator" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                Creator Calculator
              </Link>
            </div>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:block">
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
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-naughty-purple text-naughty-purple hover:bg-naughty-purple hover:text-white"
                onClick={handleOpenLoginModal}
              >
                Log In / Sign Up
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
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
              to="/sexting-generator"
              onClick={closeMenu}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
            >
              Love Messages
            </Link>
            <Link
              to="/dirty-talk-ideas"
              onClick={closeMenu}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
            >
              Couple Talks
            </Link>
            <Link
              to="/erotic-chat"
              onClick={closeMenu}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
            >
              Relationship Chat
            </Link>
            <Link
              to="/income-calculator"
              onClick={closeMenu}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
            >
              Creator Calculator
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
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3">
                  <Button
                    onClick={handleOpenLoginModal}
                    className="w-full border-naughty-purple text-naughty-purple hover:bg-naughty-purple hover:text-white"
                    variant="outline"
                  >
                    Log In / Sign Up
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
