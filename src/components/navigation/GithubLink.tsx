
import React from 'react';
import { Github } from 'lucide-react';

interface GithubLinkProps {
  isMobile?: boolean;
}

const GithubLink: React.FC<GithubLinkProps> = ({ isMobile }) => {
  if (isMobile) {
    return (
      <a 
        href="https://github.com/DevHopeOfficial/DevHope" 
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-devhope-blue hover:bg-devhope-blue/5 hover:text-devhope-orange"
      >
        <div className="rounded-full p-2 bg-devhope-blue/5">
          <Github 
            size={18} 
            className="text-devhope-blue/70 transition-colors" 
          />
        </div>
        <span className="flex-1 text-lg">GitHub</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-devhope-blue/30 transition-colors">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    );
  }
  
  return (
    <a 
      href="https://github.com/DevHopeOfficial/DevHope" 
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-300 text-devhope-blue hover:bg-devhope-blue/5 hover:text-devhope-orange"
      aria-label="DevHope GitHub"
    >
      <Github 
        size={18} 
        className="text-devhope-blue/70 transition-colors" 
      />
      <span>GitHub</span>
    </a>
  );
};

export default GithubLink;
