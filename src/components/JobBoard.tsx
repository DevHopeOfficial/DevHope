
import React, { useState, useEffect } from 'react';
import { Briefcase, BookOpen, BadgeCheck, Search, MapPin, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import SkillMatchIndicator from './SkillMatchIndicator';

const JobBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>(['Communication', 'Customer Service']);

  // Sample job listings
  const jobs = [
    {
      id: 1,
      title: "Customer Service Representative",
      company: "Global Connect",
      location: "Manila / Remote",
      type: "Full-time",
      skills: ["Communication", "Customer Service"],
      delay: "0.1s"
    },
    {
      id: 2,
      title: "Administrative Assistant",
      company: "PhilTech Solutions",
      location: "Cebu",
      type: "Full-time",
      skills: ["Organization", "MS Office"],
      delay: "0.2s"
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "Innovation Labs",
      location: "Remote",
      type: "Full-time",
      skills: ["HTML", "CSS", "JavaScript"],
      delay: "0.3s"
    },
    {
      id: 4,
      title: "Sales Associate",
      company: "Retail Solutions Inc.",
      location: "Davao",
      type: "Part-time",
      skills: ["Sales", "Customer Service"],
      delay: "0.4s"
    }
  ];

  // Filter jobs based on search criteria
  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = !locationFilter || job.location.includes(locationFilter);
      const matchesType = !jobTypeFilter || job.type === jobTypeFilter;
      
      return matchesSearch && matchesLocation && matchesType;
    });
    
    setFilteredJobs(filtered);
  }, [searchTerm, locationFilter, jobTypeFilter]);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-16">
          <Badge variant="outline" className="bg-primary/10 text-primary mb-4 animate-fade-in">
            Employment Opportunities
          </Badge>
          <h2 className="mb-4 animate-fade-up">Find Your Path to Financial Stability</h2>
          <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Connect with employers and discover opportunities that match your skills and aspirations.
            Our job platform is designed to help you find stable employment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border border-devhope-blue/10 shadow-md bg-white rounded-xl overflow-hidden mb-8">
            <div className="h-1 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-devhope-neutral-dark/50" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-devhope-blue focus:ring-1 focus:ring-devhope-blue outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search by job title or keyword"
                  />
                </div>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-devhope-neutral-dark/50" />
                  <select
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-devhope-blue focus:ring-1 focus:ring-devhope-blue outline-none transition-all appearance-none"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    aria-label="Filter by location"
                  >
                    <option value="">All Locations</option>
                    <option value="Manila">Manila</option>
                    <option value="Cebu">Cebu</option>
                    <option value="Davao">Davao</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="relative">
                  <Briefcase size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-devhope-neutral-dark/50" />
                  <select
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-devhope-blue focus:ring-1 focus:ring-devhope-blue outline-none transition-all appearance-none"
                    value={jobTypeFilter}
                    onChange={(e) => setJobTypeFilter(e.target.value)}
                    aria-label="Filter by job type"
                  >
                    <option value="">All Job Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              
              <div className="text-sm text-devhope-neutral-dark/70">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredJobs.map((job, index) => (
            <Card 
              key={job.id} 
              className="border border-devhope-blue/5 bg-devhope-neutral/20 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up group hover:border-devhope-blue/20 hover:translate-y-[-5px]"
              style={{ animationDelay: job.delay }}
            >
              <CardHeader className="pb-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-devhope-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h3 className="text-xl font-medium group-hover:text-devhope-blue transition-colors duration-300">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors duration-300">
                    {job.type}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-muted-foreground mt-2 relative z-10">
                    <MapPin size={16} className="mr-2 group-hover:text-devhope-orange transition-colors duration-300" />
                    <span>{job.location}</span>
                  </div>
                  
                  <SkillMatchIndicator 
                    jobSkills={job.skills} 
                    userSkills={userSkills}
                    className="mt-2"
                    editable={true}
                  />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="bg-devhope-neutral/40 text-secondary-foreground group-hover:bg-devhope-orange/10 group-hover:text-devhope-orange transition-colors duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-4 h-1 bg-devhope-blue/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary/50 rounded-full transition-all duration-1000 group-hover:bg-primary/70" 
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full group-hover:shadow-sm transition-all duration-300" asChild>
                  <Link to={`/jobs?jobId=${job.id}`} className="w-full">View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border border-devhope-blue/5 bg-devhope-neutral/20 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up hover:border-devhope-blue/20 hover:translate-y-[-5px] group" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <BookOpen size={24} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-medium group-hover:text-devhope-blue transition-colors duration-300">Skills Training</h3>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Access free and affordable training programs to develop valuable job skills and improve your employability.
              </p>
              <div className="mt-4 h-1 bg-devhope-blue/5 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-primary/70 rounded-full transition-all duration-1000 group-hover:bg-primary/90" 
                  style={{ width: '65%' }}
                ></div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group-hover:shadow-sm transition-all duration-300" variant="default" asChild>
                <Link to="/skills-assessment">Take Skills Assessment</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border border-devhope-blue/5 bg-devhope-neutral/20 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up hover:border-devhope-blue/20 hover:translate-y-[-5px] group" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                <BadgeCheck size={24} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-medium group-hover:text-devhope-blue transition-colors duration-300">Career Development</h3>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Get guidance on building a sustainable career path with growth opportunities and long-term stability.
              </p>
              <div className="mt-4 h-1 bg-devhope-blue/5 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-secondary/70 rounded-full transition-all duration-1000 group-hover:bg-secondary/90" 
                  style={{ width: '75%' }}
                ></div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group-hover:shadow-sm transition-all duration-300" variant="secondary" asChild>
                <Link to="/jobs">Get Career Advice</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center animate-fade-up" style={{ animationDelay: '0.7s' }}>
          <Button asChild className="hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-md">
            <Link to="/jobs" className="inline-flex items-center">
              Browse All Job Opportunities
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobBoard;
