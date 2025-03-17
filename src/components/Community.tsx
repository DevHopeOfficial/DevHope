
import React from 'react';
import { Users, MessageCircle, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const Community: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-devhope-blue/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-16">
          <span className="heading-chip animate-fade-in">Community Support</span>
          <h2 className="mb-4 animate-fade-up">Connect, Learn, and Grow Together</h2>
          <p className="text-devhope-neutral-dark/80 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Join a supportive community of individuals sharing similar journeys toward financial independence.
            Learn from peers, mentors, and experts who understand your challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-devhope-neutral/20 p-8 rounded-lg shadow-sm border border-devhope-blue/10 hover:border-devhope-orange/20 transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="h-12 w-12 rounded-full bg-devhope-blue/10 flex items-center justify-center text-devhope-blue mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Peer Mentorship</h3>
            <p className="text-devhope-neutral-dark/80">
              Connect with peers who have overcome similar financial challenges and learn from their experiences.
            </p>
          </div>
          
          <div className="bg-devhope-neutral/20 p-8 rounded-lg shadow-sm border border-devhope-blue/10 hover:border-devhope-orange/20 transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="h-12 w-12 rounded-full bg-devhope-blue/10 flex items-center justify-center text-devhope-blue mb-4">
              <MessageCircle size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Discussion Forums</h3>
            <p className="text-devhope-neutral-dark/80">
              Participate in supportive discussions about financial literacy, job seeking, and economic empowerment.
            </p>
          </div>
          
          <div className="bg-devhope-neutral/20 p-8 rounded-lg shadow-sm border border-devhope-blue/10 hover:border-devhope-orange/20 transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="h-12 w-12 rounded-full bg-devhope-blue/10 flex items-center justify-center text-devhope-blue mb-4">
              <Lightbulb size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Success Stories</h3>
            <p className="text-devhope-neutral-dark/80">
              Draw inspiration from community members who have successfully improved their financial situations.
            </p>
          </div>
        </div>

        <div className="bg-devhope-neutral/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center shadow-sm animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-2xl font-medium mb-4">Ready to join our community?</h3>
          <p className="text-devhope-neutral-dark/80 mb-8 max-w-2xl mx-auto">
            Connect with mentors, peers, and experts who understand your journey and are committed to helping you succeed.
          </p>
          <Link to="/community" className="button-primary inline-flex items-center">
            Join the DevHope Community
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Community;
