
import React, { useState } from 'react';
import { Star, StarHalf, BadgeCheck, BadgeAlert, Info } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface SkillMatchIndicatorProps {
  jobSkills: string[];
  userSkills?: string[];
  className?: string;
  editable?: boolean;
}

const SkillMatchIndicator: React.FC<SkillMatchIndicatorProps> = ({ 
  jobSkills, 
  userSkills = [],
  className = "",
  editable = false
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [localUserSkills, setLocalUserSkills] = useState<string[]>(userSkills);
  const [newSkill, setNewSkill] = useState("");
  
  // Calculate match percentage between job skills and user skills
  const calculateMatchPercentage = (skills: string[] = localUserSkills): number => {
    if (!jobSkills.length || !skills.length) return 0;
    
    let matchCount = 0;
    for (const jobSkill of jobSkills) {
      // Check if any user skill contains this job skill (case insensitive)
      const isMatch = skills.some(
        userSkill => userSkill.toLowerCase().includes(jobSkill.toLowerCase()) || 
                     jobSkill.toLowerCase().includes(userSkill.toLowerCase())
      );
      if (isMatch) matchCount++;
    }
    
    return Math.round((matchCount / jobSkills.length) * 100);
  };
  
  // Get stars rating based on match percentage
  const getStarRating = (skills: string[] = localUserSkills): number => {
    const percentage = calculateMatchPercentage(skills);
    const stars = Math.round((percentage / 100) * 5 * 2) / 2; // Half-star precision
    return stars;
  };
  
  const renderStars = (skills: string[] = localUserSkills) => {
    const starRating = getStarRating(skills);
    const fullStars = Math.floor(starRating);
    const hasHalfStar = starRating % 1 !== 0;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          size={16} 
          className="fill-yellow-400 text-yellow-400 transition-all duration-300 hover:scale-110" 
        />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf 
          key="half" 
          size={16} 
          className="fill-yellow-400 text-yellow-400 transition-all duration-300 hover:scale-110" 
        />
      );
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          size={16} 
          className="text-gray-300 transition-all duration-300 hover:scale-110" 
        />
      );
    }
    
    return stars;
  };
  
  const addSkill = () => {
    if (newSkill.trim() && !localUserSkills.includes(newSkill.trim())) {
      setLocalUserSkills([...localUserSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  
  const removeSkill = (skillToRemove: string) => {
    setLocalUserSkills(localUserSkills.filter(skill => skill !== skillToRemove));
  };
  
  const matchPercentage = calculateMatchPercentage();
  
  let matchLabel = "Low Match";
  let bgColor = "bg-gray-200";
  let textColor = "text-gray-700";
  let borderColor = "border-gray-300";
  let pulseEffect = "";
  
  if (matchPercentage > 80) {
    matchLabel = "Excellent Match";
    bgColor = "bg-devhope-green/10";
    textColor = "text-devhope-green";
    borderColor = "border-devhope-green/20";
    pulseEffect = "animate-pulse";
  } else if (matchPercentage > 60) {
    matchLabel = "Good Match";
    bgColor = "bg-devhope-blue/10";
    textColor = "text-devhope-blue";
    borderColor = "border-devhope-blue/20";
  } else if (matchPercentage > 40) {
    matchLabel = "Fair Match";
    bgColor = "bg-devhope-orange/10";
    textColor = "text-devhope-orange";
    borderColor = "border-devhope-orange/20";
  }
  
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`flex items-center space-x-1 ${className} ${editable ? 'cursor-pointer' : ''}`} 
                 aria-label={`${matchLabel}: ${matchPercentage}% skill match`}
                 onClick={() => editable && setIsDialogOpen(true)}>
              <Badge 
                className={`${bgColor} ${textColor} border ${borderColor} shadow-sm ${matchPercentage > 80 ? pulseEffect : ''} transition-all duration-300 hover:shadow group`}
              >
                {editable && 
                  <Info size={12} className="mr-1 opacity-70 group-hover:opacity-100" />
                }
                {matchLabel} {matchPercentage > 0 ? `${matchPercentage}%` : ''}
              </Badge>
              {localUserSkills.length > 0 && (
                <div className="flex">{renderStars()}</div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-3 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs">
            <p className="font-medium text-sm mb-1">Based on your skills vs. job requirements</p>
            {localUserSkills.length > 0 && (
              <div className="mt-2 text-xs space-y-1">
                <div className="flex gap-1 flex-wrap">
                  <span className="font-medium">Your skills:</span> 
                  {localUserSkills.map((skill, index) => (
                    <span key={index} className="px-1.5 py-0.5 bg-devhope-blue/10 text-devhope-blue rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-1 flex-wrap">
                  <span className="font-medium">Job requires:</span> 
                  {jobSkills.map((skill, index) => {
                    const isMatch = localUserSkills.some(
                      userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()) || 
                                  skill.toLowerCase().includes(userSkill.toLowerCase())
                    );
                    return (
                      <span 
                        key={index} 
                        className={`px-1.5 py-0.5 rounded text-xs ${
                          isMatch 
                            ? 'bg-devhope-green/10 text-devhope-green' 
                            : 'bg-devhope-orange/10 text-devhope-orange'
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-1.5 rounded-full ${
                        matchPercentage > 80 ? 'bg-devhope-green' :
                        matchPercentage > 60 ? 'bg-devhope-blue' :
                        matchPercentage > 40 ? 'bg-devhope-orange' : 'bg-gray-400'
                      }`}
                      style={{ width: `${matchPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            {editable && (
              <div className="mt-3 pt-2 border-t border-gray-100">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-xs text-devhope-blue"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Edit your skills
                </Button>
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Skills Management Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Your Skills</DialogTitle>
            <DialogDescription>
              Add or remove skills to see how they match with job requirements.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="skills">Add a new skill</Label>
              <div className="flex gap-2">
                <Input
                  id="skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., JavaScript, Communication"
                  className="col-span-3"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button type="button" onClick={addSkill}>Add</Button>
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Your Skills</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {localUserSkills.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No skills added yet.</p>
                ) : (
                  localUserSkills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="px-2 py-1 bg-devhope-blue/5 hover:bg-devhope-blue/10 transition-colors group"
                    >
                      {skill}
                      <button 
                        onClick={() => removeSkill(skill)} 
                        className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </div>
            
            <div className="mt-2">
              <Label className="mb-2 block">Match Analysis</Label>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {renderStars()}
                </div>
                <span className="text-sm font-medium">
                  {matchPercentage}% match
                </span>
                {matchPercentage > 60 ? (
                  <BadgeCheck size={16} className="text-devhope-green" />
                ) : (
                  <BadgeAlert size={16} className="text-devhope-orange" />
                )}
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    matchPercentage > 80 ? 'bg-gradient-to-r from-devhope-green to-devhope-green/80' :
                    matchPercentage > 60 ? 'bg-gradient-to-r from-devhope-blue to-devhope-blue/80' :
                    matchPercentage > 40 ? 'bg-gradient-to-r from-devhope-orange to-devhope-orange/80' : 
                    'bg-gray-400'
                  }`}
                  style={{ width: `${matchPercentage}%` }}
                ></div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Job Skills Required:</h4>
                <div className="flex flex-wrap gap-2">
                  {jobSkills.map((skill, index) => {
                    const isMatch = localUserSkills.some(
                      userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()) || 
                                  skill.toLowerCase().includes(userSkill.toLowerCase())
                    );
                    return (
                      <Badge 
                        key={index} 
                        variant="outline"
                        className={`${
                          isMatch 
                            ? 'bg-devhope-green/10 text-devhope-green border-devhope-green/20' 
                            : 'bg-devhope-orange/10 text-devhope-orange border-devhope-orange/20'
                        }`}
                      >
                        {skill} {isMatch && <BadgeCheck size={12} className="ml-1" />}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SkillMatchIndicator;
