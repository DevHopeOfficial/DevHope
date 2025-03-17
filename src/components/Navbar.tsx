
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Home, BookOpen, Briefcase, Users } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useIsMobile } from '../hooks/use-mobile';
import NavItem from './navigation/NavItem';
import GithubLink from './navigation/GithubLink';
import Logo from './navigation/Logo';
import AuthButtons from './navigation/AuthButtons';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Update scroll state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scrolling when menu is open on mobile
  useEffect(() => {
    if (isMobile) {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, isMobile]);

  // Navigation items with their icons
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/financial-literacy', label: 'Financial Literacy', icon: BookOpen },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/community', label: 'Community', icon: Users },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-apple-easing ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavItem 
                key={item.path} 
                path={item.path} 
                label={item.label} 
                icon={item.icon} 
              />
            ))}
            
            {/* GitHub Icon in Navigation Bar */}
            <GithubLink />
          </nav>

          {/* Auth Buttons for Desktop */}
          <AuthButtons />

          {/* Mobile Menu Toggle - Using Sheet from shadcn/ui */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button 
                  className="text-devhope-neutral-dark p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-devhope-orange/20"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs pt-16 p-0 bg-white">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b border-devhope-blue/5 p-4">
                    <Logo size="small" />
                  </div>
                  
                  <div className="flex-1 overflow-y-auto py-4">
                    <nav className="flex flex-col space-y-1 px-2">
                      {navItems.map((item) => (
                        <NavItem 
                          key={item.path} 
                          path={item.path} 
                          label={item.label} 
                          icon={item.icon}
                          isMobile 
                        />
                      ))}
                      
                      {/* GitHub Link in Mobile Menu */}
                      <GithubLink isMobile />
                    </nav>
                  </div>
                  
                  <AuthButtons isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
