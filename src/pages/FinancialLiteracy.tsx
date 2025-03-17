
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Book, DollarSign, Wallet, PiggyBank, LineChart, Clock, CheckCircle2, Coins, BadgeDollarSign, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import FeatureCard from '../components/FeatureCard';
import ScrollProgressBar from '../components/ScrollProgressBar';

const FinancialLiteracy: React.FC = () => {
  const courses = [
    {
      title: "Financial Basics 101",
      description: "Learn the fundamentals of personal finance and budgeting.",
      icon: Book,
      level: "Beginner",
      duration: "2 hours",
      modules: 5,
      delay: "0.1s"
    },
    {
      title: "Budgeting on Limited Income",
      description: "Practical strategies for effective budgeting with constrained resources.",
      icon: DollarSign,
      level: "Beginner",
      duration: "1.5 hours",
      modules: 4,
      delay: "0.2s"
    },
    {
      title: "Saving Strategies",
      description: "Learn how to build savings habits even with a limited income.",
      icon: PiggyBank,
      level: "Intermediate",
      duration: "2 hours",
      modules: 6,
      delay: "0.3s"
    },
    {
      title: "Debt Management",
      description: "Understand how to manage and reduce debt while building financial stability.",
      icon: Wallet,
      level: "Intermediate", 
      duration: "2.5 hours",
      modules: 7,
      delay: "0.4s"
    },
    {
      title: "Introduction to Investing",
      description: "Learn the basics of investing with minimal resources.",
      icon: LineChart,
      level: "Advanced",
      duration: "3 hours",
      modules: 8,
      delay: "0.5s"
    }
  ];

  const tools = [
    {
      title: "Budget Calculator",
      description: "Create and manage your personal budget with our easy-to-use calculator.",
      icon: BadgeDollarSign,
      delay: "0.2s"
    },
    {
      title: "Savings Goal Tracker",
      description: "Set savings goals and track your progress over time.",
      icon: PiggyBank,
      delay: "0.3s"
    },
    {
      title: "Debt Reduction Planner",
      description: "Create a personalized plan to reduce debt and improve financial health.",
      icon: Wallet,
      delay: "0.4s"
    }
  ];

  const principles = [
    { title: "Save First", icon: Coins },
    { title: "Track Expenses", icon: DollarSign },
    { title: "Avoid Debt", icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-devhope-neutral/10 to-devhope-neutral/30">
      <Navbar />
      <ScrollProgressBar />
      
      {/* Hero Section with improved gradient background */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-devhope-blue/5 to-devhope-orange/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dtm10i7bj/image/upload/v1741949202/476642127_1322555712286133_2753641883811022212_n_rhytol.png')] opacity-[0.03] bg-repeat-space"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="heading-chip animate-fade-in">Financial Literacy Hub</span>
            <h1 className="text-3xl md:text-5xl mb-6 animate-fade-up font-semibold bg-gradient-to-r from-devhope-blue to-devhope-orange bg-clip-text text-transparent">Empower Your Financial Future</h1>
            <p className="mb-8 max-w-2xl mx-auto text-devhope-neutral-dark/80 text-base md:text-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Access free educational resources, practical tools, and expert guidance to improve your financial literacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <button className="button-primary">Get Started</button>
              <button className="button-outline">Learn More</button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-devhope-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-devhope-blue/10 rounded-full blur-3xl"></div>
      </section>
      
      {/* Financial Principles with icons */}
      <section className="py-8 md:py-12 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {principles.map((principle, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-4 animate-fade-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-devhope-blue/10 to-devhope-orange/10 flex items-center justify-center mb-3 hover:shadow-md transition-all duration-300">
                  <principle.icon size={30} className="text-devhope-blue" />
                </div>
                <h3 className="text-lg font-medium text-devhope-blue">{principle.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Courses Section with improved cards */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 animate-fade-up font-medium text-devhope-blue">Educational Courses</h2>
            <p className="text-devhope-neutral-dark/80 text-base animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Free, self-paced courses designed to build financial knowledge from the ground up.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card 
                key={index} 
                className="border border-devhope-blue/10 shadow-sm animate-fade-up hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] bg-white rounded-xl overflow-hidden group" 
                style={{ animationDelay: course.delay }}
              >
                <div className="h-2 bg-gradient-to-r from-devhope-blue to-devhope-orange group-hover:from-devhope-orange group-hover:to-devhope-blue transition-all duration-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-devhope-blue/10 flex items-center justify-center text-devhope-blue mr-4 group-hover:scale-110 transition-transform duration-300">
                      <course.icon size={24} />
                    </div>
                    <div>
                      <span className={`chip text-xs font-semibold ${
                        course.level === "Beginner" ? "bg-devhope-green-light text-devhope-green" :
                        course.level === "Intermediate" ? "bg-devhope-blue-light/30 text-devhope-blue" :
                        "bg-devhope-orange/20 text-devhope-orange"
                      }`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-devhope-blue">{course.title}</h3>
                  <p className="text-devhope-neutral-dark/70 text-sm mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-devhope-neutral-dark/60 mb-4 border-t border-devhope-blue/5 pt-4">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1 text-devhope-blue/70" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Book size={14} className="mr-1 text-devhope-blue/70" />
                      <span>{course.modules} modules</span>
                    </div>
                  </div>
                  
                  <button className="w-full button-outline mt-2 text-sm group hover:bg-devhope-blue hover:text-white transition-all duration-300 flex items-center justify-center">
                    Start Learning
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tools Section with feature cards */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-devhope-blue/5 to-devhope-neutral/30">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 animate-fade-up font-medium text-devhope-blue">Financial Tools</h2>
            <p className="text-devhope-neutral-dark/80 text-base animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Practical tools to help you implement what you've learned and take control of your finances.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {tools.map((tool, index) => (
              <FeatureCard 
                key={index}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                delay={tool.delay}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Additional Resources with improved cards */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 animate-fade-up font-medium text-devhope-blue">Additional Resources</h2>
            <p className="text-devhope-neutral-dark/80 text-base animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Explore our collection of articles, guides, and videos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { title: "Understanding Banking Services", type: "Guide", icon: Wallet },
              { title: "Emergency Fund Basics", type: "Article", icon: PiggyBank },
              { title: "How to Build Credit Responsibly", type: "Video", icon: DollarSign },
              { title: "Protecting Yourself from Financial Scams", type: "Guide", icon: CheckCircle2 }
            ].map((resource, index) => (
              <Card 
                key={index} 
                className="border border-devhope-blue/10 shadow-sm animate-fade-up hover:shadow-md transition-all duration-300 bg-white flex group hover:translate-y-[-3px]" 
                style={{ animationDelay: `0.${index + 1}s` }}
              >
                <div className="w-2 bg-gradient-to-b from-devhope-blue to-devhope-orange rounded-l-lg group-hover:from-devhope-orange group-hover:to-devhope-blue transition-all duration-500"></div>
                <CardContent className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-devhope-blue/10 flex items-center justify-center text-devhope-blue mr-3 group-hover:scale-110 transition-transform duration-300">
                        <resource.icon size={16} />
                      </div>
                      <h3 className="text-base font-medium text-devhope-blue">{resource.title}</h3>
                    </div>
                    <span className="chip bg-devhope-blue-light/30 text-devhope-blue text-xs">
                      {resource.type}
                    </span>
                  </div>
                  <Link to="#" className="text-devhope-blue inline-flex items-center text-xs group-hover:underline">
                    View Resource
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <button className="button-primary group">
              Browse All Resources
            </button>
          </div>
        </div>
      </section>
      
      {/* Ask Expert Section with improved design */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-devhope-blue/5 to-devhope-neutral/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm animate-fade-up border border-devhope-orange/10 relative overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-devhope-orange/5 rounded-full"></div>
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-devhope-blue/5 rounded-full"></div>
            
            <div className="text-center relative z-10">
              <h2 className="text-2xl md:text-3xl mb-4 font-medium text-devhope-blue">Have Financial Questions?</h2>
              <p className="mb-8 max-w-xl mx-auto text-devhope-neutral-dark/80 text-base">
                Our financial experts are available to answer your questions and provide personalized guidance.
              </p>
              <button className="button-primary group bg-gradient-to-r from-devhope-orange to-devhope-orange/90 hover:from-devhope-orange/90 hover:to-devhope-orange shadow-md hover:shadow-lg transition-all duration-300">
                Ask an Expert
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FinancialLiteracy;
