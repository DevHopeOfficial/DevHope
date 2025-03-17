
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const ProjectGallery: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-24 bg-gradient-to-b from-devhope-neutral/20 to-devhope-neutral/40">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-16">
          <Badge 
            variant="outline" 
            className="bg-devhope-orange/10 text-devhope-orange border-devhope-orange/20 px-4 py-1.5 mb-4 animate-fade-in"
          >
            Our Project
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up text-devhope-blue">
            DevHope: A Vision of Financial Empowerment
          </h2>
          <p className="text-lg text-devhope-neutral-dark/80 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Our platform adapts seamlessly to all devices, ensuring everyone can access financial empowerment tools
            no matter their technology.
          </p>
        </div>
        
        <div className="animate-fade-up max-w-6xl mx-auto" style={{ animationDelay: '0.2s' }}>
          <div className="relative group overflow-hidden rounded-xl shadow-2xl hover-lift transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-devhope-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
            
            <img 
              src={isMobile 
                ? "https://res.cloudinary.com/dtm10i7bj/image/upload/v1741949250/483999427_1014935860689032_2790789491086650242_n_j8ts6w.png"
                : "https://res.cloudinary.com/dtm10i7bj/image/upload/v1741949244/483360777_1856887071792855_4809180369198625288_n_scprb7.png"
              }
              alt={isMobile ? "DevHope Mobile View" : "DevHope Desktop View"} 
              className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold mb-2">Adaptive Design</h3>
              <p className="text-white/90">Works seamlessly across all devices to maximize accessibility</p>
            </div>
          </div>
        </div>
        
        {/* Project Description Section */}
        <Card className="mt-24 bg-white border border-devhope-blue/10 p-6 rounded-xl animate-fade-up shadow-xl max-w-5xl mx-auto transform hover:translate-y-[-5px] transition-all duration-300" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-devhope-blue">Responsive Design Philosophy</h3>
                <p className="mb-6 text-lg text-devhope-neutral-dark/80">
                  DevHope's interface is carefully crafted to work seamlessly across all devices, from desktop computers 
                  to mobile phones, ensuring that financial education and resources are accessible to everyone regardless 
                  of their technology.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="chip bg-devhope-blue/10 text-devhope-blue px-4 py-2">User-Centered</span>
                  <span className="chip bg-devhope-green/10 text-devhope-green px-4 py-2">Accessible</span>
                  <span className="chip bg-devhope-blue-light/20 text-devhope-blue px-4 py-2">Responsive</span>
                  <span className="chip bg-devhope-blue/5 text-devhope-blue px-4 py-2">Inclusive</span>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-devhope-blue/10 to-devhope-blue/5 flex items-center justify-center">
                    <img 
                      src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1741949202/476642127_1322555712286133_2753641883811022212_n_rhytol.png" 
                      alt="DevHope Logo" 
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-devhope-green/10 animate-pulse" style={{ animationDuration: '4s' }}></div>
                  <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full bg-devhope-blue-light/10 animate-pulse" style={{ animationDuration: '5s' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProjectGallery;
