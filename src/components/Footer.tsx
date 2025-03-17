
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-devhope-neutral/20 border-t border-gray-100 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1741949202/476642127_1322555712286133_2753641883811022212_n_rhytol.png" 
                alt="DevHope Logo" 
                className="h-8 w-auto"
              />
              <span className="text-2xl font-semibold text-devhope-blue">DevHope</span>
            </div>
            <p className="text-devhope-neutral-dark/70 mb-6">
              Bridging the gap between poverty and financial independence through digital innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-devhope-neutral-dark/60 hover:text-devhope-orange transition-colors p-2 bg-white rounded-full shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-devhope-neutral-dark/60 hover:text-devhope-orange transition-colors p-2 bg-white rounded-full shadow-sm">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-devhope-neutral-dark/60 hover:text-devhope-orange transition-colors p-2 bg-white rounded-full shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-devhope-neutral-dark/60 hover:text-devhope-orange transition-colors p-2 bg-white rounded-full shadow-sm">
                <Mail size={18} />
              </a>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-medium text-devhope-blue">Subscribe to Newsletter</h3>
              </div>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 rounded-l-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-devhope-orange/20"
                />
                <Button 
                  variant="orange" 
                  className="rounded-l-none"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-devhope-blue">Resources</h3>
            <ul className="space-y-3">
              {[
                { to: "/financial-literacy", label: "Financial Literacy" },
                { to: "/jobs", label: "Job Opportunities" },
                { to: "/community", label: "Community Support" },
                { to: "#", label: "Skills Training" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-devhope-neutral-dark/70 hover:text-devhope-orange transition-colors flex items-center group"
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-devhope-blue">Company</h3>
            <ul className="space-y-3">
              {[
                { to: "#", label: "About Us" },
                { to: "#", label: "Our Mission" },
                { to: "#", label: "Team" },
                { to: "#", label: "Contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-devhope-neutral-dark/70 hover:text-devhope-orange transition-colors flex items-center group"
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-devhope-blue">Legal</h3>
            <ul className="space-y-3">
              {[
                { to: "#", label: "Privacy Policy" },
                { to: "#", label: "Terms of Service" },
                { to: "#", label: "Cookie Policy" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-devhope-neutral-dark/70 hover:text-devhope-orange transition-colors flex items-center group"
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-devhope-neutral-dark/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DevHope. All rights reserved.
          </div>
          <div className="text-devhope-neutral-dark/60 text-sm">
            Created by Daniah Asunio, Hassan Maricor, Abdul Mikunug, Harvey Parente
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
