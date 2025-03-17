import React from 'react';
import { X, MapPin, Briefcase, Clock, Building, Banknote, BookmarkCheck, Bookmark, Share2, Printer, Facebook, Twitter, Linkedin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: any;
  isJobSaved: boolean;
  onToggleSave: (jobId: number) => void;
  onApply: (job: any) => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  job,
  isJobSaved,
  onToggleSave,
  onApply
}) => {
  const { toast } = useToast();
  
  if (!job) return null;

  const handleShareJob = async (platform?: string) => {
    const jobTitle = encodeURIComponent(job.title);
    const jobCompany = encodeURIComponent(job.company);
    const shareText = `Check out this ${job.title} position at ${job.company}!`;
    const shareUrl = window.location.href.split('?')[0] + `?share=${job.id}`;
    
    try {
      // Social media sharing
      if (platform) {
        let shareLink = '';
        switch (platform) {
          case 'facebook':
            shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
            break;
          case 'twitter':
            shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            break;
          case 'linkedin':
            shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
            break;
          default:
            break;
        }
        
        if (shareLink) {
          window.open(shareLink, '_blank');
          return;
        }
      }
      
      // Web Share API or clipboard fallback
      if (navigator.share) {
        await navigator.share({
          title: `${job.title} at ${job.company}`,
          text: shareText,
          url: shareUrl,
        });
      } else {
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied to clipboard",
          description: "You can now share this job with others."
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  
  const handlePrintJob = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Popup blocked",
        description: "Please allow popups to print job details."
      });
      return;
    }
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${job.title} at ${job.company}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            border-bottom: 2px solid #0066cc;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          h1 {
            color: #0066cc;
            margin-bottom: 5px;
          }
          .company {
            font-size: 18px;
            margin-bottom: 10px;
          }
          .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 20px;
            font-size: 14px;
            color: #666;
          }
          .meta-item {
            display: flex;
            align-items: center;
          }
          .section-title {
            color: #0066cc;
            margin-top: 25px;
            margin-bottom: 10px;
          }
          .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
          }
          .skill {
            background: #e6f3ff;
            color: #0066cc;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 14px;
          }
          ul {
            margin-top: 5px;
          }
          .footer {
            margin-top: 30px;
            border-top: 1px solid #ddd;
            padding-top: 20px;
            font-size: 12px;
            color: #666;
          }
          @media print {
            body {
              padding: 0;
              max-width: 100%;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${job.title}</h1>
          <div class="company">${job.company}</div>
        </div>
        
        <div class="meta">
          <div class="meta-item">📍 Location: ${job.location}</div>
          <div class="meta-item">💼 Type: ${job.type}</div>
          <div class="meta-item">🕒 Posted: ${job.posted}</div>
          <div class="meta-item">💰 Salary: ${job.salary}</div>
        </div>
        
        <h2 class="section-title">Job Description</h2>
        <p>${job.description}</p>
        <p>This position offers competitive compensation and benefits, including healthcare coverage, paid time off, and opportunities for professional development and advancement.</p>
        
        <h2 class="section-title">Required Skills</h2>
        <div class="skills">
          ${job.skills.map((skill: string) => `<span class="skill">${skill}</span>`).join(' ')}
        </div>
        
        <h2 class="section-title">Responsibilities</h2>
        <ul>
          <li>Perform daily tasks related to ${job.title} role</li>
          <li>Collaborate with team members to achieve organizational goals</li>
          <li>Maintain high standards of quality and efficiency</li>
          <li>Participate in regular training and development activities</li>
          <li>Report to supervisor and provide updates on project progress</li>
        </ul>
        
        <h2 class="section-title">Qualifications</h2>
        <ul>
          <li>Previous experience in a similar role is preferred</li>
          <li>Proficiency in required skills: ${job.skills.join(', ')}</li>
          <li>Strong communication and interpersonal skills</li>
          <li>Ability to work independently and as part of a team</li>
          <li>Problem-solving and critical thinking abilities</li>
        </ul>
        
        <div class="footer">
          <p>This job information was printed from DevHope on ${new Date().toLocaleDateString()}.</p>
          <button class="no-print" onclick="window.print();return false;" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Print this page</button>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Add a slight delay to ensure content is loaded before printing
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      toast({
        title: "Print window opened",
        description: "Job details ready to print."
      });
    }, 500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 max-h-[90vh] overflow-y-auto" aria-labelledby="job-detail-title">
        <div className="h-2 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
        
        <DialogHeader className="p-6 pb-0">
          <DialogTitle id="job-detail-title" className="text-xl md:text-2xl font-semibold text-devhope-blue">
            {job.title}
          </DialogTitle>
          <div className="text-devhope-neutral-dark/80 flex items-center mt-1">
            <Building size={16} className="mr-2 text-devhope-blue/70" />
            <span>{job.company}</span>
          </div>
        </DialogHeader>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-4 text-sm text-devhope-neutral-dark/70 mb-6">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1 text-devhope-blue/70" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase size={16} className="mr-1 text-devhope-blue/70" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-devhope-blue/70" />
              <span>Posted {job.posted}</span>
            </div>
            <div className="flex items-center">
              <Banknote size={16} className="mr-1 text-devhope-blue/70" />
              <span>{job.salary}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-devhope-blue">Job Description</h3>
            <p className="text-devhope-neutral-dark/80 mb-4">{job.description}</p>
            <p className="text-devhope-neutral-dark/80">
              This position offers competitive compensation and benefits, including healthcare coverage, paid time off, and opportunities for professional development and advancement.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-devhope-blue">Required Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill: string, idx: number) => (
                <Badge key={idx} className="bg-devhope-green/10 text-devhope-green">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-devhope-blue">Responsibilities</h3>
            <ul className="list-disc list-inside text-devhope-neutral-dark/80 space-y-1">
              <li>Perform daily tasks related to {job.title} role</li>
              <li>Collaborate with team members to achieve organizational goals</li>
              <li>Maintain high standards of quality and efficiency</li>
              <li>Participate in regular training and development activities</li>
              <li>Report to supervisor and provide updates on project progress</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-devhope-blue">Qualifications</h3>
            <ul className="list-disc list-inside text-devhope-neutral-dark/80 space-y-1">
              <li>Previous experience in a similar role is preferred</li>
              <li>Proficiency in required skills: {job.skills.join(', ')}</li>
              <li>Strong communication and interpersonal skills</li>
              <li>Ability to work independently and as part of a team</li>
              <li>Problem-solving and critical thinking abilities</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-3 mt-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    className="bg-gradient-to-r from-devhope-blue to-devhope-orange text-white w-full"
                    onClick={() => onApply(job)}
                    aria-label="Apply for this job"
                  >
                    Apply Now
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Submit your application</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={isJobSaved ? "green" : "outline"}
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => onToggleSave(job.id)}
                    aria-label={isJobSaved ? "Remove from saved jobs" : "Save this job"}
                    aria-pressed={isJobSaved}
                  >
                    {isJobSaved ? (
                      <>
                        <BookmarkCheck size={16} />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark size={16} />
                        <span>Save Job</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isJobSaved ? "Remove from saved jobs" : "Save to your job list"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        aria-label="Share this job"
                      >
                        <Share2 size={16} />
                        <span>Share</span>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share this job</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleShareJob('facebook')}>
                  <Facebook size={16} className="mr-2 text-blue-600" />
                  <span>Facebook</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShareJob('twitter')}>
                  <Twitter size={16} className="mr-2 text-blue-400" />
                  <span>Twitter</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShareJob('linkedin')}>
                  <Linkedin size={16} className="mr-2 text-blue-700" />
                  <span>LinkedIn</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShareJob()}>
                  <Share2 size={16} className="mr-2" />
                  <span>Copy Link</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handlePrintJob}
                    aria-label="Print job details"
                  >
                    <Printer size={16} />
                    <span>Print</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Print job details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
