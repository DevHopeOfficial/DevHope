import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, MessageCircle, Lightbulb, UserPlus, Calendar, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import FeatureCard from '../components/FeatureCard';

const Community: React.FC = () => {
  const communityGroups = [
    {
      title: "Financial Support Circle",
      members: 1240,
      discussions: 89,
      description: "A supportive community for discussing financial challenges and solutions.",
      delay: "0.1s"
    },
    {
      title: "Job Seekers Network",
      members: 958,
      discussions: 112,
      description: "Connect with others navigating the job market and share opportunities.",
      delay: "0.2s"
    },
    {
      title: "Small Business Owners",
      members: 684,
      discussions: 76,
      description: "Entrepreneurs sharing experiences and advice on running small businesses.",
      delay: "0.3s"
    },
    {
      title: "Skills Development Group",
      members: 1105,
      discussions: 94,
      description: "Learn from others developing professional skills and share resources.",
      delay: "0.4s"
    }
  ];
  
  const upcomingEvents = [
    {
      title: "Financial Planning Workshop",
      date: "June 15, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual",
      delay: "0.2s"
    },
    {
      title: "Resume Building Webinar",
      date: "June 20, 2023",
      time: "10:00 AM - 11:30 AM",
      location: "Virtual",
      delay: "0.3s"
    },
    {
      title: "Networking Mixer",
      date: "June 25, 2023",
      time: "5:30 PM - 7:30 PM",
      location: "Manila Community Center",
      delay: "0.4s"
    }
  ];
  
  const successStories = [
    {
      name: "Elena Reyes",
      achievement: "Started a successful small business",
      quote: "The community mentorship program gave me the confidence and knowledge to start my food delivery service.",
      image: "https://placehold.co/60x60"
    },
    {
      name: "Marco Santos",
      achievement: "Secured a tech industry job",
      quote: "The peer support and skills development resources helped me transition to a higher-paying career.",
      image: "https://placehold.co/60x60"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-devhope-neutral/10 to-devhope-neutral/30">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-devhope-blue/5 to-devhope-orange/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dtm10i7bj/image/upload/v1741949202/476642127_1322555712286133_2753641883811022212_n_rhytol.png')] opacity-[0.03] bg-repeat-space"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="heading-chip animate-fade-in">Community Support</span>
            <h1 className="text-3xl md:text-5xl mb-6 animate-fade-up font-semibold bg-gradient-to-r from-devhope-blue to-devhope-orange bg-clip-text text-transparent">Connect, Learn, and Grow Together</h1>
            <p className="mb-8 max-w-2xl mx-auto text-devhope-neutral-dark/80 text-base md:text-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Join a supportive community of individuals sharing similar journeys toward financial independence.
              Learn from peers, mentors, and experts who understand your challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <button className="button-primary">Join Community</button>
              <button className="button-outline">Find a Mentor</button>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-devhope-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-devhope-blue/10 rounded-full blur-3xl"></div>
      </section>
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 animate-fade-up font-medium text-devhope-blue">Community Groups</h2>
            <p className="text-devhope-neutral-dark/80 text-base animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Connect with others who share your interests and goals through our specialized community groups.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {communityGroups.map((group, index) => (
              <Card 
                key={index} 
                className="border border-devhope-blue/10 shadow-sm animate-fade-up hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] bg-white rounded-xl overflow-hidden" 
                style={{ animationDelay: group.delay }}
              >
                <div className="h-2 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-devhope-blue/10 flex items-center justify-center text-devhope-blue mr-4">
                      <Users size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-0 text-devhope-blue">{group.title}</h3>
                  </div>
                  <p className="text-devhope-neutral-dark/70 text-sm mb-4">{group.description}</p>
                  
                  <div className="flex justify-between text-sm text-devhope-neutral-dark/60 mb-4 border-t border-devhope-blue/5 pt-4">
                    <div className="flex items-center">
                      <Users size={14} className="mr-1 text-devhope-blue/70" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle size={14} className="mr-1 text-devhope-blue/70" />
                      <span>{group.discussions} discussions</span>
                    </div>
                  </div>
                  
                  <button className="w-full button-outline mt-2 text-sm group hover:bg-devhope-blue hover:text-white transition-all duration-300 flex items-center justify-center">
                    Join Group
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20 bg-gradient-to-br from-devhope-blue/5 to-devhope-neutral/30">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 animate-fade-up font-medium text-devhope-blue">Mentorship Program</h2>
            <p className="text-devhope-neutral-dark/80 text-base animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Connect with experienced mentors who can guide you on your journey to financial independence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border border-devhope-blue/10 shadow-sm animate-fade-up hover:shadow-md transition-all duration-300 bg-white rounded-xl overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <div className="h-2 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-devhope-blue">Find a Mentor</h3>
                  <p className="text-devhope-neutral-dark/80 text-sm">
                    Connect with experienced professionals who volunteer their time to guide individuals
                    on their financial and career journeys.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "One-on-one guidance tailored to your needs",
                      "Regular check-ins to track your progress",
                      "Practical advice from someone who understands your challenges"
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle size={16} className="text-devhope-green mr-2 mt-1 flex-shrink-0" />
                        <span className="text-devhope-neutral-dark/70 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="button-primary w-full">
                  Request a Mentor
                </button>
              </CardContent>
            </Card>
            
            <Card className="border border-devhope-blue/10 shadow-sm animate-fade-up hover:shadow-md transition-all duration-300 bg-white rounded-xl overflow-hidden" style={{ animationDelay: '0.3s' }}>
              <div className="h-2 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-devhope-blue">Become a Mentor</h3>
                  <p className="text-devhope-neutral-dark/80 text-sm">
                    Share your knowledge and experience to help others on their journey toward financial stability
                    and independence.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Make a meaningful impact in someone's life",
                      "Flexible commitment based on your availability",
                      "Structured program with resources and support"
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle size={16} className="text-devhope-blue mr-2 mt-1 flex-shrink-0" />
                        <span className="text-devhope-neutral-dark/70 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="button-outline w-full">
                  Apply as Mentor
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 animate-fade-up font-medium text-devhope-blue">Upcoming Events</h2>
            <p className="text-devhope-neutral-dark/80 text-base animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Join our events to learn, network, and grow with our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card 
                key={index} 
                className="border border-devhope-blue/10 shadow-sm animate-fade-up hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] bg-white rounded-xl overflow-hidden" 
                style={{ animationDelay: event.delay }}
              >
                <div className="h-2 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-devhope-blue/10 flex items-center justify-center text-devhope-blue mb-4">
                    <Calendar size={20} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-devhope-blue">{event.title}</h3>
                  <div className="space-y-2 text-devhope-neutral-dark/70 mb-4 text-sm">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-devhope-blue/70" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2 text-devhope-blue/70" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2 text-devhope-blue/70" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="w-full button-outline mt-2 text-sm group hover:bg-devhope-blue hover:text-white transition-all duration-300 flex items-center justify-center">
                    Register
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Link to="#" className="text-devhope-blue inline-flex items-center group hover:underline">
              View All Events
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20 bg-gradient-to-br from-devhope-blue/5 to-devhope-neutral/20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 animate-fade-up font-medium text-devhope-blue">Community Success Stories</h2>
            <p className="text-devhope-neutral-dark/80 text-base animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Read inspiring stories from community members who have achieved financial milestones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {successStories.map((story, index) => (
              <Card 
                key={index} 
                className="border border-devhope-blue/10 shadow-sm animate-fade-up hover:shadow-md transition-all duration-300 hover:translate-y-[-3px] bg-white" 
                style={{ animationDelay: `0.${index + 2}s` }}
              >
                <div className="w-2 bg-gradient-to-b from-devhope-blue to-devhope-orange rounded-l-lg"></div>
                <CardContent className="p-5 flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-medium mb-1 text-devhope-blue">{story.name}</h3>
                      <div className="chip bg-devhope-green/10 text-devhope-green">
                        {story.achievement}
                      </div>
                    </div>
                  </div>
                  <blockquote className="mt-4 text-devhope-neutral-dark/80 italic text-sm">
                    "{story.quote}"
                  </blockquote>
                  <Link to="#" className="text-devhope-blue inline-flex items-center text-xs mt-4 group-hover:underline">
                    Read Full Story
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm animate-fade-up border border-devhope-orange/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-devhope-orange/5 rounded-full"></div>
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-devhope-blue/5 rounded-full"></div>
            
            <div className="text-center relative z-10">
              <h2 className="text-2xl md:text-3xl mb-4 font-medium text-devhope-blue">Join Our Supportive Community Today</h2>
              <p className="mb-8 max-w-xl mx-auto text-devhope-neutral-dark/80 text-base">
                Connect with peers, find mentors, and access resources that will help you on your journey
                toward financial independence and stability.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="button-primary inline-flex items-center">
                  <UserPlus size={18} className="mr-2" />
                  Create Your Account
                </button>
                <button className="button-outline">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Community;
