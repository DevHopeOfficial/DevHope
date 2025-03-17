
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  path: string;
  label: string;
  icon: LucideIcon;
  isMobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ path, label, icon: Icon, isMobile }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  if (isMobile) {
    return (
      <Link 
        to={path} 
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-devhope-orange/10 text-devhope-orange font-medium' 
            : 'text-devhope-blue hover:bg-devhope-blue/5 hover:text-devhope-orange'
        }`}
      >
        <div className={`rounded-full p-2 ${isActive ? 'bg-devhope-orange/10' : 'bg-devhope-blue/5'}`}>
          <Icon 
            size={18} 
            className={`${isActive ? 'text-devhope-orange' : 'text-devhope-blue/70'} transition-colors`} 
          />
        </div>
        <span className="flex-1 text-lg">{label}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isActive ? 'text-devhope-orange' : 'text-devhope-blue/30'} transition-colors`}>
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    );
  }
  
  return (
    <Link 
      to={path} 
      className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-300 ${
        isActive 
          ? 'bg-devhope-orange/10 text-devhope-orange font-medium shadow-sm' 
          : 'text-devhope-blue hover:bg-devhope-blue/5 hover:text-devhope-orange'
      }`}
    >
      <Icon 
        size={18} 
        className={`${isActive ? 'text-devhope-orange' : 'text-devhope-blue/70'} transition-colors`} 
      />
      <span>{label}</span>
      {isActive && (
        <span className="absolute inset-0 rounded-full bg-devhope-orange/5 animate-pulse opacity-70 pointer-events-none"></span>
      )}
    </Link>
  );
};

export default NavItem;
