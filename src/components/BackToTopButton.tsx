
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Show button when user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 transition-all duration-500 z-40 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      role="complementary"
      aria-label="Scroll to top of page"
    >
      <Button
        size="icon"
        variant="orange"
        className={`rounded-full shadow-lg transition-all duration-300 w-12 h-12 flex items-center justify-center ${
          isHovered 
            ? 'bg-devhope-orange shadow-xl scale-110' 
            : 'hover:shadow-xl hover:scale-110'
        }`}
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Back to top"
      >
        <ArrowUp 
          size={20} 
          className={`text-white transition-transform duration-300 ${
            isHovered ? 'transform -translate-y-1' : ''
          }`} 
        />
      </Button>
    </div>
  );
};

export default BackToTopButton;
