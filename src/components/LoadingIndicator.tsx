import React, { useEffect, useState } from 'react';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    if (isLoading) {
      setShow(true);
    } else {
      // Keep indicator visible for a short time after loading is complete
      const timer = setTimeout(() => {
        setShow(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (!show) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1.5">
      <div 
        className={`h-full bg-gradient-to-r from-devhope-blue via-devhope-orange to-devhope-green animate-[loading_1.5s_ease-in-out_infinite] rounded-full shadow-sm ${isLoading ? 'opacity-100' : 'opacity-0 transition-opacity duration-300'}`}
      ></div>
    </div>
  );
};

export default LoadingIndicator;
