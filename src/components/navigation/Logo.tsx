
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'normal';
}

const Logo: React.FC<LogoProps> = ({ size = 'normal' }) => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="overflow-hidden relative">
        <img 
          src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1741949202/476642127_1322555712286133_2753641883811022212_n_rhytol.png" 
          alt="DevHope Logo" 
          className={`${size === 'small' ? 'h-8 w-auto' : 'h-10 w-auto'} transition-all duration-300 
            group-hover:scale-105 group-hover:drop-shadow-md relative z-10`}
        />
      </div>
      <div className="overflow-hidden">
        <span 
          className={`${size === 'small' ? 'text-xl' : 'text-2xl'} font-semibold 
            bg-clip-text text-transparent bg-gradient-to-r from-devhope-blue to-devhope-orange 
            transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-devhope-orange 
            group-hover:to-devhope-blue inline-block transform group-hover:translate-y-[-2px]`}
        >
          DevHope
        </span>
      </div>
    </Link>
  );
};

export default Logo;
