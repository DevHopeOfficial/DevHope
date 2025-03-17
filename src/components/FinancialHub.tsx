
import React from 'react';
import { BookOpen, PiggyBank, BarChart4, TrendingUp } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { Link } from 'react-router-dom';

const FinancialHub: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-devhope-neutral relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-devhope-blue/5 text-devhope-orange text-xs font-medium mb-4 animate-fade-in">Financial Literacy</span>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 animate-fade-up text-devhope-blue">Empowering Through Financial Education</h2>
          <p className="text-devhope-neutral-dark/90 text-base animate-fade-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
            Our Financial Literacy Hub offers practical resources to help you make informed financial decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard 
            icon={BookOpen} 
            title="Financial Basics" 
            description="Learn fundamental concepts about money management and budgeting."
            delay="0.1s"
          />
          <FeatureCard 
            icon={PiggyBank} 
            title="Saving Strategies" 
            description="Discover effective techniques to build savings, even with limited resources."
            delay="0.2s"
          />
          <FeatureCard 
            icon={BarChart4} 
            title="Investment Basics" 
            description="Understand investment options accessible to everyone."
            delay="0.3s"
          />
          <FeatureCard 
            icon={TrendingUp} 
            title="Financial Growth" 
            description="Learn how to grow your financial resources sustainably."
            delay="0.4s"
          />
        </div>

        <div className="text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <Link 
            to="/financial-literacy" 
            className="bg-gradient-to-r from-devhope-orange/90 to-devhope-orange text-white px-6 py-3 rounded-lg text-sm font-medium
            shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]
            hover:bg-opacity-90 active:bg-opacity-100 active:scale-[0.98] inline-flex items-center"
          >
            Explore Financial Literacy Hub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinancialHub;
