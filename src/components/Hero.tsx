
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from './ui/button';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  
  const scrollToStats = () => {
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative bg-gradient-to-b from-devhope-neutral/50 to-white py-16 md:py-24 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-devhope-orange/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-devhope-blue/5 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-devhope-green/5 blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full bg-devhope-blue/5 blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <Badge 
              className="bg-devhope-orange/10 text-devhope-orange hover:bg-devhope-orange/15 px-4 py-1.5 text-xs font-medium mb-6 animate-fade-up" 
              style={{ animationDelay: '0.05s' }}
            >
              Bridging Poverty and Financial Independence
            </Badge>
            
            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-devhope-blue to-devhope-blue/80">
                Economic Empowerment Through 
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-devhope-orange to-devhope-orange/90 block mt-2">
                Digital Innovation
              </span>
            </h1>
            
            <p className="mb-8 text-base md:text-lg text-devhope-blue/80 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              DevHope connects underserved communities with essential financial and employment resources, 
              breaking the cycle of poverty through technology and education.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="orange" size="lg" className="shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]" asChild>
                <Link to="/financial-literacy">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/70 border-devhope-blue/10 text-devhope-blue hover:bg-devhope-blue/5 shadow-sm hover:shadow-md transition-all duration-300" asChild>
                <Link to="/skills-assessment">Take Skills Assessment</Link>
              </Button>
            </div>
            
            <div className="mt-12 hidden lg:flex gap-8 justify-start animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {[
                { value: '15K+', label: 'People Empowered' },
                { value: '250+', label: 'Community Partners' },
                { value: '75%', label: 'Increased Income' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-devhope-orange mb-1">{stat.value}</div>
                  <div className="text-xs text-devhope-blue/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 animate-fade-up relative" style={{ animationDelay: '0.4s' }}>
            <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-devhope-green/10 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-devhope-orange/10 animate-pulse" style={{ animationDuration: '6s' }}></div>
            
            <div className="bg-transparent backdrop-blur-sm overflow-hidden transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center p-6">
              <div className="p-0 flex items-center justify-center">
                {isMobile ? (
                  <img 
                    src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1741949202/476642127_1322555712286133_2753641883811022212_n_rhytol.png" 
                    alt="DevHope Logo" 
                    className="w-64 h-auto"
                  />
                ) : (
                  <img 
                    src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1742122243/483999427_1014935860689032_2790789491086650242_n_1_aengnx.png"
                    alt="DevHope Desktop View" 
                    className="w-[115%] h-auto rounded-lg shadow-md"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce opacity-70 hover:opacity-100 transition-opacity">
        <button 
          onClick={scrollToStats} 
          aria-label="Scroll to statistics" 
          className="text-devhope-blue hover:text-devhope-orange transition-colors duration-300 bg-white/90 p-2.5 rounded-full shadow-md hover:shadow-lg"
        >
          <ArrowDown size={24} />
        </button>
      </div>
      
      {/* Stats section below hero */}
      <div id="stats-section" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {[
          { number: "24M+", label: "Filipinos living below the poverty line", value: 85 },
          { number: "22.4%", label: "Of the population struggles financially", value: 65 },
          { number: "100%", label: "Committed to creating sustainable change", value: 100 }
        ].map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg 
                     border-t-4 border-devhope-orange transition-all duration-300 
                     hover:translate-y-[-5px] text-center animate-fade-up" 
            style={{ animationDelay: `${0.4 + (index * 0.1)}s` }}
          >
            <div className="text-3xl font-bold text-devhope-orange mb-2">{stat.number}</div>
            <div className="text-devhope-blue font-medium text-sm mb-3">{stat.label}</div>
            <div className="mt-2 h-2 bg-devhope-blue/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-devhope-orange/70 to-devhope-orange rounded-full transition-all duration-1000" 
                style={{ width: `${stat.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
