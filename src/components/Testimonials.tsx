
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  imageSrc?: string;
  rating: number;
  delay: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, role, imageSrc, rating, delay }) => {
  return (
    <Card className="border border-devhope-blue/5 bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up hover:border-devhope-blue/20 hover:translate-y-[-5px] group overflow-hidden" style={{ animationDelay: delay }}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-devhope-orange to-devhope-blue"></div>
      <CardContent className="p-6 md:p-8 relative">
        <div className="absolute top-6 right-6 text-devhope-orange/80">
          <Quote size={30} className="opacity-20" />
        </div>
        
        <div className="flex items-center mb-4">
          {imageSrc ? (
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-devhope-blue/10">
              <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-devhope-orange/10 flex items-center justify-center mr-4 text-devhope-orange font-medium">
              {name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-devhope-neutral-dark/70">{role}</p>
          </div>
        </div>
        
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < rating 
                  ? 'text-devhope-orange fill-devhope-orange' 
                  : 'text-devhope-neutral-dark/20'
              }`}
            />
          ))}
        </div>
        
        <p className="italic text-devhope-neutral-dark/90">"{quote}"</p>
      </CardContent>
    </Card>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "DevHope's financial literacy courses helped me understand budgeting and saving for the first time. I've built my first emergency fund!",
      name: "Maria Santos",
      role: "Program Participant",
      rating: 5,
      delay: "0.1s"
    },
    {
      quote: "Through DevHope's job matching platform, I found employment that matched my skills and increased my income by 40%.",
      name: "Juan Reyes",
      role: "Community Member",
      rating: 5,
      delay: "0.2s"
    },
    {
      quote: "The mentorship I received through DevHope's community has been invaluable. I'm now financially stable for the first time in my life.",
      name: "Sophia Garcia",
      role: "Program Graduate",
      rating: 4,
      delay: "0.3s"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-devhope-neutral/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-xl mx-auto text-center mb-16">
          <Badge variant="outline" className="bg-primary/10 text-primary mb-4 animate-fade-in">
            Success Stories
          </Badge>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 animate-fade-up text-devhope-blue">
            From Our Community
          </h2>
          <p className="text-devhope-neutral-dark/80 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Real stories from people who have transformed their lives through DevHope's resources and community support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              rating={testimonial.rating}
              delay={testimonial.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
