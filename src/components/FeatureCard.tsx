
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = "0s" }) => {
  return (
    <div 
      className="bg-white p-8 rounded-xl shadow-sm 
                border border-devhope-blue/10 transition-all duration-300 
                hover:border-devhope-orange/20 hover:shadow-md hover:translate-y-[-5px] animate-fade-up"
      style={{ animationDelay: delay }}
    >
      <div className="flex flex-col items-start gap-5">
        <div className="bg-gradient-to-br from-devhope-orange/10 to-devhope-orange/20 h-14 w-14 rounded-full flex items-center justify-center shrink-0 text-devhope-orange mb-2">
          <Icon size={26} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3 text-devhope-blue">{title}</h3>
          <p className="text-devhope-blue/70 text-base leading-relaxed mb-4">{description}</p>
          <div className="mt-4 h-1 bg-devhope-blue/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-devhope-orange/50 to-devhope-orange/70 rounded-full transition-all duration-1000" 
              style={{ width: '85%', animationDelay: delay }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
