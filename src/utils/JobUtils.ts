
// Utility functions for job-related features

// Save a job to localStorage
export const saveJob = (jobId: number): void => {
  const savedJobs = getSavedJobs();
  if (!savedJobs.includes(jobId)) {
    savedJobs.push(jobId);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }
};

// Remove a job from saved jobs
export const unsaveJob = (jobId: number): void => {
  let savedJobs = getSavedJobs();
  savedJobs = savedJobs.filter(id => id !== jobId);
  localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
};

// Get all saved jobs
export const getSavedJobs = (): number[] => {
  const savedJobsString = localStorage.getItem('savedJobs');
  return savedJobsString ? JSON.parse(savedJobsString) : [];
};

// Check if a job is saved
export const isJobSaved = (jobId: number): boolean => {
  return getSavedJobs().includes(jobId);
};

// Create a shareable URL for a job
export const createShareableJobUrl = (jobId: number): string => {
  return window.location.href.split('?')[0] + `?share=${jobId}`;
};

// Create formatted job sharing text with more job details
export const createJobSharingText = (job: any): string => {
  return `Check out this ${job.title} position at ${job.company}!\n\nLocation: ${job.location}\nSalary: ${job.salary}\nType: ${job.type}\n\nRequired skills: ${job.skills.join(', ')}`;
};

// Share a job using Web Share API or fallback to clipboard
export const shareJob = async (job: any, toast: any): Promise<void> => {
  const shareText = createJobSharingText(job);
  const shareUrl = createShareableJobUrl(job.id);
  
  try {
    if (navigator.share) {
      await navigator.share({
        title: `${job.title} at ${job.company}`,
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      toast({
        title: "Job details copied to clipboard",
        description: "You can now share this job with others."
      });
    }
  } catch (error) {
    console.error("Error sharing:", error);
  }
};

// Subscribe to job alerts
export const subscribeToJobAlerts = (
  email: string, 
  filters: { 
    searchTerm?: string, 
    location?: string, 
    jobType?: string 
  },
  toast: any
): void => {
  // In a real app, this would call an API to save the subscription
  // For now, we'll just simulate it with localStorage
  const subscriptions = getJobAlertSubscriptions();
  const newSubscription = {
    id: Date.now(),
    email,
    filters,
    created: new Date().toISOString()
  };
  
  subscriptions.push(newSubscription);
  localStorage.setItem('jobAlertSubscriptions', JSON.stringify(subscriptions));
  
  toast({
    title: "Job Alert Created",
    description: "You'll receive notifications for matching jobs."
  });
};

// Get all job alert subscriptions
export const getJobAlertSubscriptions = (): any[] => {
  const subscriptionsString = localStorage.getItem('jobAlertSubscriptions');
  return subscriptionsString ? JSON.parse(subscriptionsString) : [];
};

// Filter jobs based on search criteria
export const filterJobs = (
  jobs: any[],
  searchTerm: string,
  locationFilter: string,
  jobTypeFilter: string
): any[] => {
  return jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === '' || job.location === locationFilter;
    const matchesJobType = jobTypeFilter === '' || job.type === jobTypeFilter;
    
    return matchesSearch && matchesLocation && matchesJobType;
  });
};

// Sort jobs by recency (assuming posted field is in format like "2 days ago")
export const sortJobsByRecency = (jobs: any[]): any[] => {
  return [...jobs].sort((a, b) => {
    // Extract the number from strings like "2 days ago"
    const getNumberFromPosted = (posted: string) => {
      const match = posted.match(/(\d+)/);
      return match ? parseInt(match[0], 10) : 0;
    };
    
    const aNum = getNumberFromPosted(a.posted);
    const bNum = getNumberFromPosted(b.posted);
    
    // Sort by the numeric part (smaller is more recent)
    return aNum - bNum;
  });
};
