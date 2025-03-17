import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, MapPin, Briefcase, Filter, Clock, BookmarkCheck, Bookmark, BookOpen, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FeatureCard from '../components/FeatureCard';
import { filterJobs, saveJob, unsaveJob, isJobSaved, sortJobsByRecency, shareJob } from '../utils/JobUtils';
import SavedJobBadge from '../components/SavedJobBadge';
import { useToast } from '@/hooks/use-toast';
import JobApplicationModal from '../components/JobApplicationModal';
import JobDetailModal from '../components/JobDetailModal';
import { JobListSkeleton } from '../components/JobCardSkeleton';
import JobAlertForm from '../components/JobAlertForm';
import JobPagination from '../components/JobPagination';
import SkillMatchIndicator from '../components/SkillMatchIndicator';
import { AnimatePresence, motion } from 'framer-motion';
import BackToTopButton from '../components/BackToTopButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ITEMS_PER_PAGE = 3; // Number of jobs per page

const Jobs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');
  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userSkills, setUserSkills] = useState<string[]>(['Communication', 'Customer Service']);
  const { toast } = useToast();
  
  const jobs = [
    {
      id: 1,
      title: "Customer Service Representative",
      company: "Global Connect",
      location: "Manila",
      type: "Full-time",
      salary: "₱18,000 - ₱22,000",
      posted: "2 days ago",
      skills: ["Communication", "Customer Service", "English Proficiency"],
      description: "Provide exceptional customer service via phone and email. Resolve customer inquiries and concerns in a timely manner."
    },
    {
      id: 2,
      title: "Administrative Assistant",
      company: "PhilTech Solutions",
      location: "Cebu",
      type: "Full-time",
      salary: "₱16,000 - ₱20,000",
      posted: "3 days ago",
      skills: ["Organization", "MS Office", "Time Management"],
      description: "Support office operations by maintaining files, scheduling meetings, and assisting with administrative tasks."
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "Innovation Labs",
      location: "Remote",
      type: "Full-time",
      salary: "₱25,000 - ₱35,000",
      posted: "1 week ago",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      description: "Develop and maintain websites using modern web technologies. Collaborate with design team to implement UI/UX."
    },
    {
      id: 4,
      title: "Sales Associate",
      company: "Retail Solutions Inc.",
      location: "Davao",
      type: "Part-time",
      salary: "₱12,000 - ₱15,000",
      posted: "5 days ago",
      skills: ["Sales", "Customer Service", "Inventory Management"],
      description: "Assist customers with product selection, process transactions, and maintain store appearance."
    },
    {
      id: 5,
      title: "Data Entry Specialist",
      company: "InfoTech Services",
      location: "Remote",
      type: "Contract",
      salary: "₱18,000 - ₱22,000",
      posted: "4 days ago",
      skills: ["Data Entry", "MS Excel", "Attention to Detail"],
      description: "Input and maintain data in company databases with high accuracy. Generate reports as needed."
    },
    {
      id: 6,
      title: "Social Media Assistant",
      company: "Digital Marketing PH",
      location: "Manila",
      type: "Part-time",
      salary: "₱15,000 - ₱18,000",
      posted: "1 day ago",
      skills: ["Social Media", "Content Creation", "Communication"],
      description: "Create and schedule content for social media platforms. Engage with followers and monitor social media trends."
    }
  ];
  
  const trainingPrograms = [
    {
      title: "Basic Computer Skills",
      provider: "Digital Literacy Foundation",
      duration: "4 weeks",
      format: "Online self-paced"
    },
    {
      title: "Customer Service Excellence",
      provider: "Service Skills Institute",
      duration: "2 weeks",
      format: "Virtual classroom"
    },
    {
      title: "Introduction to Web Development",
      provider: "Code Philippines",
      duration: "8 weeks",
      format: "Blended learning"
    }
  ];

  useEffect(() => {
    const savedFromStorage = localStorage.getItem('savedJobs');
    if (savedFromStorage) {
      setSavedJobIds(JSON.parse(savedFromStorage));
    }
    
    const savedParam = searchParams.get('saved');
    if (savedParam === 'true') {
      setShowOnlySaved(true);
    }
    
    const shareParam = searchParams.get('share');
    if (shareParam) {
      const jobId = parseInt(shareParam, 10);
      const sharedJob = jobs.find(job => job.id === jobId);
      if (sharedJob) {
        setSelectedJob(sharedJob);
        setIsDetailModalOpen(true);
        toast({
          title: "Shared job opened",
          description: `Viewing details for ${sharedJob.title} at ${sharedJob.company}`
        });
      }
    }
  }, [searchParams, toast]);

  const getFilteredAndSortedJobs = () => {
    let result = filterJobs(jobs, searchTerm, locationFilter, jobTypeFilter);
    
    if (showOnlySaved) {
      result = result.filter(job => savedJobIds.includes(job.id));
    }
    
    if (sortOrder === 'recent') {
      result = sortJobsByRecency(result);
    } else if (sortOrder === 'salary-high') {
      result = [...result].sort((a, b) => {
        const getMaxSalary = (salary: string) => {
          const match = salary.match(/₱(\d+),(\d+)/);
          return match ? parseInt(match[1] + match[2], 10) : 0;
        };
        return getMaxSalary(b.salary) - getMaxSalary(a.salary);
      });
    } else if (sortOrder === 'salary-low') {
      result = [...result].sort((a, b) => {
        const getMinSalary = (salary: string) => {
          const match = salary.match(/₱(\d+),(\d+)/);
          return match ? parseInt(match[1] + match[2], 10) : 0;
        };
        return getMinSalary(a.salary) - getMinSalary(b.salary);
      });
    } else if (sortOrder === 'match') {
      result = [...result].sort((a, b) => {
        const calculateMatchScore = (jobSkills: string[]) => {
          if (!jobSkills.length || !userSkills.length) return 0;
          
          let matchCount = 0;
          for (const jobSkill of jobSkills) {
            const isMatch = userSkills.some(
              userSkill => userSkill.toLowerCase().includes(jobSkill.toLowerCase()) || 
                           jobSkill.toLowerCase().includes(userSkill.toLowerCase())
            );
            if (isMatch) matchCount++;
          }
          
          return matchCount / jobSkills.length;
        };
        
        return calculateMatchScore(b.skills) - calculateMatchScore(a.skills);
      });
    }
    
    return result;
  };
  
  const filteredJobs = getFilteredAndSortedJobs();
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );
  
  const recentJobs = jobs.filter(job => 
    job.posted.includes('1 day') || 
    job.posted.includes('2 day') || 
    job.posted.includes('3 day'));
  
  const toggleSaveJob = (jobId: number) => {
    if (savedJobIds.includes(jobId)) {
      unsaveJob(jobId);
      setSavedJobIds(prev => prev.filter(id => id !== jobId));
      toast({
        title: "Job removed from saved list",
        description: "You can add it back anytime.",
      });
    } else {
      saveJob(jobId);
      setSavedJobIds(prev => [...prev, jobId]);
      toast({
        title: "Job saved successfully",
        description: "You can view your saved jobs anytime.",
      });
    }
  };

  const handleSearch = () => {
    setIsLoading(true);
    setCurrentPage(1);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `${filteredJobs.length} jobs found`,
        description: filteredJobs.length > 0 
          ? "Showing matching jobs below." 
          : "Try adjusting your search criteria.",
      });
    }, 800);
  };

  const handleApplyJob = (job: any) => {
    setSelectedJob(job);
    setIsApplicationModalOpen(true);
    setIsDetailModalOpen(false);
  };
  
  const handleViewJobDetails = (job: any) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-devhope-neutral/10 to-devhope-neutral/30">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-devhope-blue/5 to-devhope-orange/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dtm10i7bj/image/upload/v1741949202/476642127_1322555712286133_2753641883811022212_n_rhytol.png')] opacity-[0.03] bg-repeat-space"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="heading-chip animate-fade-in">Job Opportunities</span>
            <h1 className="text-3xl md:text-5xl mb-6 animate-fade-up font-semibold bg-gradient-to-r from-devhope-blue to-devhope-orange bg-clip-text text-transparent">Find Your Path to Financial Stability</h1>
            <p className="mb-8 max-w-2xl mx-auto text-devhope-neutral-dark/80 text-base md:text-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Discover employment opportunities that match your skills and aspirations. We connect you with 
              employers looking for dedicated individuals ready to grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <button className="button-primary">Find Jobs</button>
              <button className="button-outline">Upload Resume</button>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-devhope-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-devhope-blue/10 rounded-full blur-3xl"></div>
      </section>
      
      {recentJobs.length > 0 && (
        <section className="py-8 bg-devhope-green/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-medium text-devhope-green">New Job Opportunities</h2>
                  <Badge className="bg-devhope-green/10 text-devhope-green">Just Posted</Badge>
                </div>
              </div>
              
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                  {recentJobs.map((job) => (
                    <Card 
                      key={`recent-${job.id}`}
                      className="border-l-4 border-l-devhope-green border-t-0 border-b-0 border-r-0 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] bg-white rounded-xl overflow-hidden w-80 flex-shrink-0"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold mb-1 text-devhope-green">{job.title}</h3>
                          <button 
                            onClick={() => toggleSaveJob(job.id)}
                            className="text-devhope-neutral-dark/50 hover:text-devhope-green transition-colors duration-300"
                            aria-label={savedJobIds.includes(job.id) ? "Remove from saved jobs" : "Save job"}
                          >
                            {savedJobIds.includes(job.id) ? (
                              <BookmarkCheck size={18} className="text-devhope-green" />
                            ) : (
                              <Bookmark size={18} />
                            )}
                          </button>
                        </div>
                        
                        <p className="text-devhope-neutral-dark/80 text-sm mb-1">{job.company}</p>
                        <div className="flex items-center text-xs text-devhope-neutral-dark/70 mb-3">
                          <MapPin size={12} className="mr-1" />
                          <span>{job.location}</span>
                          <span className="mx-2">•</span>
                          <Clock size={12} className="mr-1" />
                          <span className="font-medium text-devhope-green">{job.posted}</span>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <button 
                            onClick={() => toggleSaveJob(job.id)}
                            className="button-outline py-2 px-3 text-xs flex-1 flex items-center justify-center gap-1"
                            aria-label={savedJobIds.includes(job.id) ? "Remove from saved jobs" : "Save job"}
                          >
                            {savedJobIds.includes(job.id) ? (
                              <>
                                <BookmarkCheck size={14} />
                                <span>Saved</span>
                              </>
                            ) : (
                              <>
                                <Bookmark size={14} />
                                <span>Save</span>
                              </>
                            )}
                          </button>
                          <button 
                            className="button-primary py-2 px-3 text-xs flex-1"
                            onClick={() => handleViewJobDetails(job)}
                          >
                            View Details
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border border-devhope-blue/10 shadow-md bg-white rounded-xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                
                <div className="mt-4 flex flex-wrap gap-3 justify-between items-center">
                  <div className="flex items-center gap-4 flex-wrap">
                    <button 
                      className={`flex items-center gap-1 text-sm ${showOnlySaved ? 'text-devhope-green' : 'text-devhope-neutral-dark/70 hover:text-devhope-blue'} transition-colors px-2 py-1 rounded-md ${showOnlySaved ? 'bg-devhope-green/10' : 'hover:bg-devhope-blue/5'}`}
                      onClick={() => setShowOnlySaved(!showOnlySaved)}
                      aria-label={showOnlySaved ? "Show all jobs" : "Show saved jobs only"}
                      aria-pressed={showOnlySaved}
                    >
                      <BookmarkCheck size={16} />
                      <span>Saved Jobs ({savedJobIds.length})</span>
                    </button>
                    
                    <div className="flex items-center gap-2 text-sm text-devhope-neutral-dark/70">
                      <span>Sort by:</span>
                      <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-[160px] h-8 text-xs border-devhope-blue/10">
                          <SelectValue placeholder="Sort order" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="salary-high">Highest Salary</SelectItem>
                          <SelectItem value="salary-low">Lowest Salary</SelectItem>
                          <SelectItem value="match">Best Match</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <JobAlertForm 
                      searchTerm={searchTerm} 
                      locationFilter={locationFilter} 
                      jobTypeFilter={jobTypeFilter} 
                    />
                  </div>
                  
                  <button 
                    className="button-primary"
                    onClick={handleSearch}
                    disabled={isLoading}
                    aria-label="Search jobs"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Searching...
                      </span>
                    ) : (
                      'Search Jobs'
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section id="job-listings" className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl mb-4 animate-fade-up font-medium text-devhope-blue">
                {showOnlySaved ? 'Your Saved Jobs' : 'Available Opportunities'}
              </h2>
              <div className="text-devhope-neutral-dark/70 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                Showing <span className="font-medium">{paginatedJobs.length}</span> of <span className="font-medium">{filteredJobs.length}</span> jobs
              </div>
            </div>
            
            {isLoading ? (
              <JobListSkeleton />
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle size={48} className="mx-auto mb-4 text-devhope-orange/70" />
                <h3 className="text-xl mb-2">No jobs found</h3>
                <p className="text-devhope-neutral-dark/70 mb-6">
                  {showOnlySaved 
                    ? "You haven't saved any jobs yet that match your search criteria." 
                    : "No jobs match your current search criteria."}
                </p>
                {showOnlySaved && (
                  <button 
                    className="button-outline"
                    onClick={() => setShowOnlySaved(false)}
                  >
                    View All Jobs
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6 mb-12">
                <AnimatePresence mode="wait">
                  {paginatedJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card 
                        className="border border-devhope-blue/10 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] bg-white rounded-xl overflow-hidden relative"
                      >
                        <div className="h-2 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="mb-4 md:mb-0">
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-semibold mb-3 text-devhope-blue">{job.title}</h3>
                                {savedJobIds.includes(job.id) && <SavedJobBadge />}
                              </div>
                              <p className="text-devhope-neutral-dark/80 mb-2">{job.company}</p>
                              
                              <div className="flex flex-wrap gap-4 text-sm text-devhope-neutral-dark/70">
                                <div className="flex items-center">
                                  <MapPin size={14} className="mr-1 text-devhope-blue/70" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <Briefcase size={14} className="mr-1 text-devhope-blue/70" />
                                  <span>{job.type}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock size={14} className="mr-1 text-devhope-blue/70" />
                                  <span>Posted {job.posted}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                              <div className="chip bg-devhope-blue/10 text-devhope-blue h-fit">
                                {job.salary}
                              </div>
                              <SkillMatchIndicator 
                                jobSkills={job.skills} 
                                userSkills={userSkills}
                              />
                            </div>
                          </div>
                          
                          <div className="my-4">
                            <p className="text-devhope-neutral-dark/80 text-sm">{job.description}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.map((skill: string, idx: number) => (
                              <span key={idx} className="chip bg-devhope-green/10 text-devhope-green">
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                              className="button-primary group"
                              onClick={() => handleApplyJob(job)}
                            >
                              Apply Now
                            </button>
                            <button 
                              className={`${
                                savedJobIds.includes(job.id) 
                                  ? 'bg-devhope-green/10 text-devhope-green border-devhope-green/20' 
                                  : 'button-outline'
                              } flex items-center justify-center gap-2`}
                              onClick={() => toggleSaveJob(job.id)}
                              aria-pressed={savedJobIds.includes(job.id)}
                            >
                              {savedJobIds.includes(job.id) ? (
                                <>
                                  <BookmarkCheck size={16} className="transition-transform duration-300 group-hover:scale-110" />
                                  <span>Saved</span>
                                </>
                              ) : (
                                <>
                                  <Bookmark size={16} className="transition-transform duration-300 group-hover:scale-110" />
                                  <span>Save Job</span>
                                </>
                              )}
                            </button>
                            <button 
                              className="button-outline flex items-center justify-center gap-2"
                              onClick={() => handleViewJobDetails(job)}
                            >
                              View Details
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {totalPages > 1 && (
                  <JobPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            )}
            
            {filteredJobs.length > 0 && currentPage === totalPages && (
              <div className="text-center animate-fade-up" style={{ animationDelay: '0.7s' }}>
                <p className="text-devhope-neutral-dark/70 mb-4">
                  You've reached the end of the job listings.
                </p>
                <button 
                  className="button-outline group inline-flex items-center justify-center"
                  onClick={() => setCurrentPage(1)}
                >
                  Back to Top
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20 bg-gradient-to-br from-devhope-blue/5 to-devhope-neutral/30">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 animate-fade-up font-medium text-devhope-blue">Skills Development</h2>
            <p className="text-devhope-neutral-dark/80 text-base animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Access free and low-cost training programs to develop the skills employers are looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {trainingPrograms.map((program, index) => (
              <FeatureCard 
                key={index} 
                icon={BookOpen} 
                title={program.title} 
                description={`Provider: ${program.provider} | Duration: ${program.duration} | Format: ${program.format}`}
                delay={`0.${index + 2}s`}
              />
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto text-center bg-white p-10 md:p-14 animate-fade-up rounded-xl shadow-sm border-l-2 border-devhope-orange">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-devhope-blue">Not sure which skills to develop?</h2>
            <p className="mb-8 max-w-xl mx-auto text-base text-devhope-blue/70 leading-relaxed">
              Take our skills assessment to discover which training programs will best enhance your employability.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link to="/skills-assessment" className="button-primary">Take Skills Assessment</Link>
              <button className="button-outline group inline-flex items-center justify-center">
                Browse All Programs
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 animate-fade-up font-medium text-devhope-blue">Success Stories</h2>
            <p className="text-devhope-neutral-dark/80 text-base animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Read about individuals who have found employment and improved their financial situations through DevHope.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Maria Santos",
                from: "Quezon City",
                job: "Customer Service Representative",
                image: "https://placehold.co/100x100"
              },
              {
                name: "Juan Reyes",
                from: "Cebu City",
                job: "Administrative Assistant",
                image: "https://placehold.co/100x100"
              }
            ].map((story, index) => (
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
                      <p className="text-devhope-neutral-dark/70 mb-2 text-sm">{story.from}</p>
                      <div className="chip bg-devhope-green/10 text-devhope-green">
                        Now: {story.job}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-devhope-neutral-dark/80 text-sm">
                    "DevHope helped me develop the skills I needed to secure a stable job. 
                    The financial literacy resources also taught me how to manage my income effectively."
                  </p>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-medium text-devhope-blue">Are You an Employer?</h2>
              <p className="mb-8 max-w-xl mx-auto text-devhope-neutral-dark/80 text-base">
                Partner with DevHope to connect with motivated individuals eager to contribute to your organization.
                Post job opportunities and find qualified candidates.
              </p>
              <button className="button-primary group bg-gradient-to-r from-devhope-orange to-devhope-orange/90 hover:from-devhope-orange/90 hover:to-devhope-orange shadow-md hover:shadow-lg transition-all duration-300">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {selectedJob && (
        <>
          <JobApplicationModal 
            isOpen={isApplicationModalOpen}
            onClose={() => setIsApplicationModalOpen(false)}
            job={selectedJob}
          />
          
          <JobDetailModal 
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            job={selectedJob}
            isJobSaved={savedJobIds.includes(selectedJob.id)}
            onToggleSave={toggleSaveJob}
            onApply={handleApplyJob}
          />
        </>
      )}
      
      <BackToTopButton />
    </div>
  );
};

export default Jobs;
