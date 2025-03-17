
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkillsAssessmentForm from '../components/SkillsAssessmentForm';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, GraduationCap, Lightbulb, UserCheck } from 'lucide-react';

const SkillsAssessment: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-devhope-neutral/10 to-devhope-neutral/30">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-devhope-blue/5 to-devhope-green/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dtm10i7bj/image/upload/v1741949202/476642127_1322555712286133_2753641883811022212_n_rhytol.png')] opacity-[0.03] bg-repeat-space"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="heading-chip animate-fade-in">Skills Assessment</span>
            <h1 className="text-3xl md:text-5xl mb-6 animate-fade-up font-semibold bg-gradient-to-r from-devhope-blue to-devhope-green bg-clip-text text-transparent">
              Discover Your Career Potential
            </h1>
            <p className="mb-8 max-w-2xl mx-auto text-devhope-neutral-dark/80 text-base md:text-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Complete this assessment to identify your strengths, match with suitable job opportunities, 
              and receive personalized training recommendations to enhance your employability.
            </p>
          </div>
        </div>
        
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-devhope-green/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-devhope-blue/10 rounded-full blur-3xl"></div>
      </section>
      
      <section className="py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-devhope-blue/10 p-6 md:p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div className="col-span-1 md:col-span-3">
                  <h2 className="text-2xl font-semibold text-devhope-blue mb-4">Why Take This Assessment?</h2>
                  <p className="text-devhope-neutral-dark/80 mb-4">
                    This skills assessment helps identify your strengths and areas for growth, 
                    matching you with suitable job opportunities and training programs that can 
                    enhance your employability and career prospects.
                  </p>
                  <p className="text-devhope-neutral-dark/80">
                    The assessment takes approximately 5-10 minutes to complete and covers your 
                    technical skills, soft skills, work preferences, and professional background.
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-devhope-blue/5 to-devhope-green/5 rounded-lg p-5">
                  <h3 className="text-lg font-medium text-devhope-blue mb-3">What You'll Receive:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-devhope-blue/10 p-1.5 rounded-md mr-3 text-devhope-blue">
                        <UserCheck size={16} />
                      </div>
                      <span className="text-sm">Personalized skills profile analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-devhope-blue/10 p-1.5 rounded-md mr-3 text-devhope-blue">
                        <Briefcase size={16} />
                      </div>
                      <span className="text-sm">Job matches based on your skill set</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-devhope-blue/10 p-1.5 rounded-md mr-3 text-devhope-blue">
                        <GraduationCap size={16} />
                      </div>
                      <span className="text-sm">Customized training recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-devhope-blue/10 p-1.5 rounded-md mr-3 text-devhope-blue">
                        <Lightbulb size={16} />
                      </div>
                      <span className="text-sm">Insights into your professional strengths and growth areas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SkillsAssessmentForm />
            </motion.div>
            
            <div className="mt-16 max-w-3xl mx-auto text-center bg-white p-8 rounded-xl shadow-sm border border-devhope-blue/10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-devhope-blue/10 text-devhope-blue mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-devhope-blue mb-3">Need More Guidance?</h2>
              <p className="text-devhope-neutral-dark/80 mb-6">
                Our career advisors are available to help you interpret your assessment results
                and guide you toward the right job opportunities and training programs.
              </p>
              <button className="button-primary bg-gradient-to-r from-devhope-blue to-devhope-blue/90">
                Book a Career Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SkillsAssessment;
