
import React, { useState } from 'react';
import { Bell, BellRing, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { subscribeToJobAlerts } from '../utils/JobUtils';
import { useToast } from '@/hooks/use-toast';

interface JobAlertFormProps {
  searchTerm: string;
  locationFilter: string;
  jobTypeFilter: string;
}

const JobAlertForm: React.FC<JobAlertFormProps> = ({ searchTerm, locationFilter, jobTypeFilter }) => {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    setTimeout(() => {
      subscribeToJobAlerts(
        email, 
        {
          searchTerm: searchTerm || undefined,
          location: locationFilter || undefined,
          jobType: jobTypeFilter || undefined
        },
        toast
      );
      setIsSubmitting(false);
      setIsOpen(false);
      setEmail('');
    }, 800); // Simulate API call delay
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-devhope-orange hover:text-devhope-orange hover:bg-devhope-orange/10 transition-colors" 
          aria-label="Create job alert"
        >
          <BellRing size={16} className="text-devhope-orange" />
          <span>Create Job Alert</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-devhope-blue flex items-center gap-2">
            <Bell className="h-5 w-5 text-devhope-orange" />
            Create Job Alert
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="text-sm text-devhope-neutral-dark/80 mb-4">
                Get notified when new jobs match your search criteria:
              </p>
              <div className="space-y-2 mb-4">
                {searchTerm && (
                  <div className="chip bg-devhope-blue/10 text-devhope-blue">
                    Keywords: {searchTerm}
                  </div>
                )}
                {locationFilter && (
                  <div className="chip bg-devhope-blue/10 text-devhope-blue">
                    Location: {locationFilter}
                  </div>
                )}
                {jobTypeFilter && (
                  <div className="chip bg-devhope-blue/10 text-devhope-blue">
                    Job Type: {jobTypeFilter}
                  </div>
                )}
                {!searchTerm && !locationFilter && !jobTypeFilter && (
                  <div className="chip bg-devhope-blue/10 text-devhope-blue">
                    All new jobs
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-devhope-neutral-dark/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-devhope-orange to-devhope-orange/90 hover:from-devhope-orange hover:to-devhope-orange/80 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Alert...
                  </span>
                ) : (
                  'Create Job Alert'
                )}
              </Button>
            </div>
            
            <p className="text-xs text-devhope-neutral-dark/60 mt-4">
              By creating a job alert, you agree to receive email notifications. You can unsubscribe at any time.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobAlertForm;
