
import React, { useState, useEffect } from 'react';

const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx * 100;
      setScrollProgress(scrolled);
    };
    
    // Initial calculation
    updateScrollProgress();
    
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);
  
  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 z-40 bg-devhope-neutral/10">
      <div 
        className="h-full bg-gradient-to-r from-devhope-blue via-devhope-orange to-devhope-green rounded-r-full transition-all duration-200 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      {scrollProgress > 2 && (
        <div 
          className="absolute h-3 w-3 bg-white border-2 border-devhope-orange rounded-full -top-[3px] transition-all duration-150 ease-out shadow-sm"
          style={{ left: `calc(${scrollProgress}% - 6px)` }}
        />
      )}
    </div>
  );
};

export default ScrollProgressBar;
