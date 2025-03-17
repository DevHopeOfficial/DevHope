
import React from 'react';
import Hero from '../components/Hero';
import FinancialHub from '../components/FinancialHub';
import JobBoard from '../components/JobBoard';
import Community from '../components/Community';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectGallery from '../components/ProjectGallery';
import { BookOpen, Briefcase, Users, BarChart4, Star } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import Testimonials from '../components/Testimonials';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-devhope-neutral/10 to-devhope-neutral/30">
      <Navbar />
      <Hero />
      
      {/* Features Section with improved styling */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-devhope-blue/5 to-devhope-neutral/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-xl mx-auto text-center mb-12">
            <span className="heading-chip animate-fade-in">Our Approach</span>
            <h2 className="text-2xl md:text-3xl font-medium mb-4 animate-fade-up text-devhope-blue">
              Comprehensive Economic Empowerment
            </h2>
            <p className="text-devhope-neutral-dark/80 text-base animate-fade-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
              DevHope provides a holistic platform addressing poverty through education, opportunity, and community support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={BookOpen} 
              title="Financial Literacy" 
              description="Practical lessons on budgeting, saving, and investing to build financial independence."
              delay="0.1s"
            />
            <FeatureCard 
              icon={Briefcase} 
              title="Job Matching" 
              description="Real-time job listings and upskilling programs tailored to your skills and aspirations."
              delay="0.2s"
            />
            <FeatureCard 
              icon={Users} 
              title="Community Support" 
              description="Mentorship, networking, and peer-to-peer learning from others on similar journeys."
              delay="0.3s"
            />
            <FeatureCard 
              icon={BarChart4} 
              title="Smart Insights" 
              description="Personalized advice and data-driven recommendations for financial and career growth."
              delay="0.4s"
            />
          </div>
        </div>
      </section>
      
      <ProjectGallery />
      <FinancialHub />
      <JobBoard />
      <Community />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* CTA Section with improved styling */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-devhope-blue/5 to-devhope-neutral/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-3xl mx-auto text-center bg-white p-10 md:p-14 animate-fade-up rounded-xl shadow-sm border border-devhope-orange/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-devhope-orange/5 rounded-full"></div>
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-devhope-blue/5 rounded-full"></div>
            
            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-devhope-blue">Ready to Start Your Journey?</h2>
            <p className="mb-8 max-w-xl mx-auto text-devhope-neutral-dark/80 text-base">
              Join DevHope today and take the first step toward financial independence with our tools, 
              resources, and community support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Button variant="orange" asChild>
                <Link to="/financial-literacy">Create Your Account</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/skills-assessment">Take Skills Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
