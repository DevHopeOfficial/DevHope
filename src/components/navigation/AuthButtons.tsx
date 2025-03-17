
import React from 'react';
import { Button } from '../ui/button';

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile }) => {
  if (isMobile) {
    return (
      <div className="border-t border-devhope-blue/5 p-4 space-y-3">
        <Button variant="outline" className="w-full bg-white hover:bg-devhope-blue/5 justify-start">
          Sign In
        </Button>
        <Button variant="orange" className="w-full flex items-center justify-center">
          <span>Sign Up</span>
        </Button>
        <div className="mt-4 text-xs text-center text-devhope-blue/60">
          DevHope &copy; {new Date().getFullYear()}
        </div>
      </div>
    );
  }
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="outline" className="bg-white hover:bg-devhope-blue/5">Sign In</Button>
      <Button variant="orange" className="flex items-center">
        <span>Sign Up</span>
      </Button>
    </div>
  );
};

export default AuthButtons;
