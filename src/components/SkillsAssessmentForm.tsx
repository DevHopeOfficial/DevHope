
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Lightbulb, ListChecks, Star, ThumbsUp, BookOpen } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Schema for form validation
const formSchema = z.object({
  skills: z.array(z.string()).min(1, {
    message: "Please select at least one skill.",
  }),
  experienceYears: z.number().min(0).max(30),
  educationLevel: z.string().optional(),
  preferredJobTypes: z.array(z.string()).min(1, {
    message: "Please select at least one preferred job type.",
  }),
  preferredLocations: z.array(z.string()).min(1, {
    message: "Please select at least one preferred location.",
  }),
  softSkills: z.array(z.string()),
  interestAreas: z.array(z.string()),
  salaryRange: z.array(z.number()).length(2),
  customSkill: z.string().optional(),
});

// Available skill options for the form
const skillOptions = [
  { id: "javascript", label: "JavaScript" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "react", label: "React" },
  { id: "nodejs", label: "Node.js" },
  { id: "php", label: "PHP" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "csharp", label: "C#" },
  { id: "cplusplus", label: "C++" },
  { id: "sql", label: "SQL" },
  { id: "mongodb", label: "MongoDB" },
  { id: "communication", label: "Communication" },
  { id: "customer-service", label: "Customer Service" },
  { id: "ms-office", label: "Microsoft Office" },
  { id: "excel", label: "Excel" },
  { id: "data-entry", label: "Data Entry" },
  { id: "bookkeeping", label: "Bookkeeping" },
  { id: "writing", label: "Writing" },
  { id: "editing", label: "Editing" },
  { id: "sales", label: "Sales" },
  { id: "marketing", label: "Marketing" },
  { id: "social-media", label: "Social Media" },
  { id: "project-management", label: "Project Management" },
  { id: "organization", label: "Organization" },
  { id: "time-management", label: "Time Management" },
  { id: "english", label: "English Proficiency" },
];

const softSkillOptions = [
  { id: "communication", label: "Communication" },
  { id: "teamwork", label: "Teamwork" },
  { id: "problem-solving", label: "Problem Solving" },
  { id: "critical-thinking", label: "Critical Thinking" },
  { id: "adaptability", label: "Adaptability" },
  { id: "leadership", label: "Leadership" },
  { id: "time-management", label: "Time Management" },
  { id: "creativity", label: "Creativity" },
  { id: "attention-to-detail", label: "Attention to Detail" },
  { id: "conflict-resolution", label: "Conflict Resolution" },
];

const locationOptions = [
  { id: "manila", label: "Manila" },
  { id: "cebu", label: "Cebu" },
  { id: "davao", label: "Davao" },
  { id: "remote", label: "Remote" },
  { id: "abroad", label: "Abroad" },
];

const jobTypeOptions = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
  { id: "freelance", label: "Freelance" },
];

const educationLevelOptions = [
  { id: "high-school", label: "High School" },
  { id: "vocational", label: "Vocational/Technical" },
  { id: "associate", label: "Associate Degree" },
  { id: "bachelor", label: "Bachelor's Degree" },
  { id: "master", label: "Master's Degree" },
  { id: "doctorate", label: "Doctorate" },
];

const interestOptions = [
  { id: "technology", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "finance", label: "Finance" },
  { id: "marketing", label: "Marketing" },
  { id: "design", label: "Design" },
  { id: "customer-service", label: "Customer Service" },
  { id: "retail", label: "Retail" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "hospitality", label: "Hospitality" },
];

const SkillsAssessmentForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [newSkill, setNewSkill] = useState("");
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [],
      experienceYears: 0,
      educationLevel: "high-school", // Set a default value
      preferredJobTypes: [],
      preferredLocations: [],
      softSkills: [],
      interestAreas: [],
      salaryRange: [15000, 30000],
      customSkill: "",
    },
  });

  // Handle tab navigation
  const handleNextTab = () => {
    if (activeTab === "skills") {
      if (form.getValues().skills.length === 0) {
        toast({
          title: "Please select at least one skill",
          description: "You need to select at least one skill to proceed",
          variant: "destructive"
        });
        return;
      }
      setActiveTab("preferences");
    } else if (activeTab === "preferences") {
      if (form.getValues().preferredJobTypes.length === 0) {
        toast({
          title: "Please select at least one job type",
          description: "You need to select at least one job type to proceed",
          variant: "destructive"
        });
        return;
      }
      if (form.getValues().preferredLocations.length === 0) {
        toast({
          title: "Please select at least one location",
          description: "You need to select at least one preferred location to proceed",
          variant: "destructive"
        });
        return;
      }
      setActiveTab("background");
    } else if (activeTab === "background") {
      if (!form.getValues().educationLevel) {
        toast({
          title: "Please select your education level",
          description: "You need to select your education level to complete the assessment",
          variant: "destructive"
        });
        return;
      }
      
      try {
        const data = form.getValues();
        handleSubmit(data);
      } catch (error) {
        console.error("Form validation error:", error);
        toast({
          title: "Form submission error",
          description: "Please check your entries and try again",
          variant: "destructive"
        });
      }
    }
  };

  const handlePrevTab = () => {
    if (activeTab === "background") setActiveTab("preferences");
    else if (activeTab === "preferences") setActiveTab("skills");
  };

  // Handle custom skill addition
  const addCustomSkill = () => {
    if (newSkill.trim() && !form.getValues().skills.includes(newSkill.trim())) {
      const currentSkills = form.getValues().skills;
      form.setValue("skills", [...currentSkills, newSkill.trim()]);
      setNewSkill("");
      toast({
        title: "Skill added",
        description: `${newSkill.trim()} has been added to your skills list.`,
      });
    }
  };

  // Form submission handler
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data submitted:", data);
    
    // Calculate job matches and recommendations
    const jobMatches = calculateJobMatches(data);
    const trainingRecommendations = generateTrainingRecommendations(data);
    
    setAssessmentResults({
      jobMatches,
      trainingRecommendations,
      skillAssessment: {
        totalSkills: data.skills.length + data.softSkills.length,
        strengthAreas: identifyStrengthAreas(data),
        developmentAreas: identifyDevelopmentAreas(data),
      }
    });
    
    setAssessmentCompleted(true);
    
    toast({
      title: "Assessment completed",
      description: "Your skills assessment has been processed successfully!",
    });
  };

  // Mock calculations for job matches
  const calculateJobMatches = (data: any) => {
    // This would be replaced with actual matching algorithm
    return [
      {
        title: "Customer Service Representative",
        company: "Global Connect",
        matchPercentage: 92,
        skills: ["Communication", "Customer Service", "English Proficiency"],
        location: "Manila",
        type: "Full-time",
        salary: "₱18,000 - ₱22,000"
      },
      {
        title: "Administrative Assistant",
        company: "PhilTech Solutions",
        matchPercentage: 85,
        skills: ["Organization", "MS Office", "Time Management"],
        location: "Cebu",
        type: "Full-time",
        salary: "₱16,000 - ₱20,000"
      },
      {
        title: "Data Entry Specialist",
        company: "InfoTech Services",
        matchPercentage: 78,
        skills: ["Data Entry", "MS Excel", "Attention to Detail"],
        location: "Remote",
        type: "Contract",
        salary: "₱18,000 - ₱22,000"
      }
    ];
  };

  // Mock training recommendations
  const generateTrainingRecommendations = (data: any) => {
    // This would be replaced with actual recommendation algorithm
    return [
      {
        title: "Advanced Customer Service Skills",
        provider: "Service Excellence Institute",
        duration: "4 weeks",
        format: "Online, self-paced",
        relevance: "High",
        description: "Enhance your customer service skills with advanced techniques in conflict resolution and customer retention."
      },
      {
        title: "Microsoft Office Specialist Certification",
        provider: "TechSkills Academy",
        duration: "8 weeks",
        format: "Blended learning",
        relevance: "Medium",
        description: "Become certified in Microsoft Office applications to increase your employability in administrative roles."
      },
      {
        title: "Data Entry and Processing Fundamentals",
        provider: "Digital Processing Institute",
        duration: "3 weeks",
        format: "Online, instructor-led",
        relevance: "Medium",
        description: "Learn efficient data entry techniques and quality control processes for information management."
      }
    ];
  };

  // Identify areas of strength based on assessment
  const identifyStrengthAreas = (data: any) => {
    // Simplified logic - would be more comprehensive in production
    const strengths = [];
    
    if (data.skills.includes("communication") || data.softSkills.includes("communication")) {
      strengths.push("Communication Skills");
    }
    
    if (data.skills.includes("customer-service")) {
      strengths.push("Customer Service");
    }
    
    if (data.softSkills.includes("teamwork") && data.softSkills.includes("adaptability")) {
      strengths.push("Collaborative Work");
    }
    
    if (data.experienceYears > 2) {
      strengths.push("Professional Experience");
    }
    
    return strengths.length > 0 ? strengths : ["Not enough data to determine strengths"];
  };

  // Identify areas for development based on assessment
  const identifyDevelopmentAreas = (data: any) => {
    // Simplified logic - would be more comprehensive in production
    const developmentAreas = [];
    
    if (!data.skills.includes("excel") && !data.skills.includes("ms-office")) {
      developmentAreas.push("Office Productivity Software");
    }
    
    if (!data.softSkills.includes("leadership") && !data.softSkills.includes("problem-solving")) {
      developmentAreas.push("Leadership & Problem Solving");
    }
    
    if (data.skills.length < 5) {
      developmentAreas.push("Technical Skill Diversification");
    }
    
    return developmentAreas.length > 0 ? developmentAreas : ["No specific development areas identified"];
  };
  
  const viewJobMatches = () => {
    // Save assessment results to local storage for use across the app
    localStorage.setItem('skillAssessmentResults', JSON.stringify(assessmentResults));
    navigate('/jobs');
    
    toast({
      title: "Navigating to Job Matches",
      description: "Redirecting you to view matching job opportunities.",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      {!assessmentCompleted ? (
        <Form {...form}>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (activeTab === "background") {
              handleSubmit(form.getValues());
            }
          }} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="skills" className="data-[state=active]:bg-devhope-blue data-[state=active]:text-white">
                  Skills
                </TabsTrigger>
                <TabsTrigger value="preferences" className="data-[state=active]:bg-devhope-blue data-[state=active]:text-white">
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="background" className="data-[state=active]:bg-devhope-blue data-[state=active]:text-white">
                  Background
                </TabsTrigger>
              </TabsList>
              
              {/* Skills tab content */}
              <TabsContent value="skills" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Technical & Professional Skills</h3>
                    <FormField
                      control={form.control}
                      name="skills"
                      render={() => (
                        <FormItem>
                          <FormLabel>Select your skills (select all that apply)</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {skillOptions.map((skill) => (
                              <FormField
                                key={skill.id}
                                control={form.control}
                                name="skills"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={skill.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-devhope-blue/5 transition-colors"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(skill.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, skill.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== skill.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {skill.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Input 
                              placeholder="Add custom skill..." 
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
                              className="max-w-xs"
                            />
                            <Button 
                              type="button" 
                              onClick={addCustomSkill}
                              variant="outline"
                            >
                              Add
                            </Button>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {form.getValues().skills.map((skill, index) => (
                              <Badge 
                                key={index} 
                                className="bg-devhope-blue/10 text-devhope-blue hover:bg-devhope-blue/20"
                              >
                                {skillOptions.find(s => s.id === skill)?.label || skill}
                              </Badge>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Soft skills section */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Soft Skills</h3>
                    <FormField
                      control={form.control}
                      name="softSkills"
                      render={() => (
                        <FormItem>
                          <FormLabel>Select your soft skills</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {softSkillOptions.map((skill) => (
                              <FormField
                                key={skill.id}
                                control={form.control}
                                name="softSkills"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={skill.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-devhope-green/5 transition-colors"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(skill.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, skill.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== skill.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {skill.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <div></div>
                  <Button type="button" onClick={handleNextTab} className="bg-devhope-blue">
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              {/* Preferences tab content */}
              <TabsContent value="preferences" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Job Preferences</h3>
                    
                    <FormField
                      control={form.control}
                      name="preferredJobTypes"
                      render={() => (
                        <FormItem className="mb-6">
                          <FormLabel>Preferred Job Types</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {jobTypeOptions.map((jobType) => (
                              <FormField
                                key={jobType.id}
                                control={form.control}
                                name="preferredJobTypes"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={jobType.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-devhope-blue/5 transition-colors"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(jobType.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, jobType.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== jobType.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {jobType.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="preferredLocations"
                      render={() => (
                        <FormItem className="mb-6">
                          <FormLabel>Preferred Locations</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {locationOptions.map((location) => (
                              <FormField
                                key={location.id}
                                control={form.control}
                                name="preferredLocations"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={location.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-devhope-blue/5 transition-colors"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(location.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, location.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== location.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {location.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="interestAreas"
                      render={() => (
                        <FormItem className="mb-6">
                          <FormLabel>Areas of Interest</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {interestOptions.map((interest) => (
                              <FormField
                                key={interest.id}
                                control={form.control}
                                name="interestAreas"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={interest.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-devhope-blue/5 transition-colors"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(interest.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, interest.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== interest.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {interest.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="salaryRange"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Expected Salary Range (₱)</FormLabel>
                          <FormControl>
                            <Slider
                              defaultValue={[15000, 30000]}
                              max={100000}
                              min={10000}
                              step={1000}
                              value={field.value}
                              onValueChange={field.onChange}
                              className="mt-6"
                            />
                          </FormControl>
                          <div className="flex justify-between mt-2">
                            <FormDescription>
                              Min: ₱{field.value[0].toLocaleString()}
                            </FormDescription>
                            <FormDescription>
                              Max: ₱{field.value[1].toLocaleString()}
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button type="button" onClick={handlePrevTab} variant="outline">
                    Previous
                  </Button>
                  <Button type="button" onClick={handleNextTab} className="bg-devhope-blue">
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              {/* Background tab content */}
              <TabsContent value="background" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Education & Experience</h3>
                    
                    <FormField
                      control={form.control}
                      name="educationLevel"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Highest Education Level</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {educationLevelOptions.map((option) => (
                              <FormItem key={option.id} className="flex items-center space-x-2">
                                <FormControl>
                                  <input
                                    type="radio"
                                    value={option.id}
                                    id={`education-${option.id}`}
                                    checked={field.value === option.id}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="form-radio h-4 w-4 text-devhope-blue border-gray-300 focus:ring-devhope-blue"
                                  />
                                </FormControl>
                                <FormLabel htmlFor={`education-${option.id}`} className="font-normal cursor-pointer">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experienceYears"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Years of Work Experience</FormLabel>
                          <FormControl>
                            <Slider
                              defaultValue={[0]}
                              max={30}
                              min={0}
                              step={1}
                              value={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                              className="mt-6"
                            />
                          </FormControl>
                          <FormDescription className="mt-2">
                            {field.value} {field.value === 1 ? 'year' : 'years'} of experience
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button type="button" onClick={handlePrevTab} variant="outline">
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => handleSubmit(form.getValues())}
                    className="bg-devhope-green text-white"
                  >
                    Complete Assessment
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-devhope-green/10 text-devhope-green mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-devhope-blue">Skills Assessment Complete!</h2>
            <p className="text-devhope-neutral-dark/70 mt-2">
              Based on your responses, we've analyzed your skills and prepared recommendations for you.
            </p>
          </div>
          
          {/* Assessment results grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Skills Profile Card */}
            <div className="bg-gradient-to-br from-devhope-blue/5 to-devhope-blue/10 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Star className="text-devhope-blue mr-2" />
                <h3 className="text-lg font-medium text-devhope-blue">Your Skills Profile</h3>
              </div>
              <p className="text-sm text-devhope-neutral-dark/80 mb-4">
                You have indicated {assessmentResults.skillAssessment.totalSkills} different skills and competencies.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Areas of Strength:</h4>
                  <ul className="list-disc list-inside text-sm text-devhope-neutral-dark/90">
                    {assessmentResults.skillAssessment.strengthAreas.map((strength: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <ThumbsUp className="h-4 w-4 mr-2 text-devhope-green flex-shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Areas for Development:</h4>
                  <ul className="list-disc list-inside text-sm text-devhope-neutral-dark/90">
                    {assessmentResults.skillAssessment.developmentAreas.map((area: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <Lightbulb className="h-4 w-4 mr-2 text-devhope-orange flex-shrink-0 mt-0.5" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Job Matches Card */}
            <div className="bg-gradient-to-br from-devhope-green/5 to-devhope-green/10 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <ListChecks className="text-devhope-green mr-2" />
                <h3 className="text-lg font-medium text-devhope-green">Top Job Matches</h3>
              </div>
              <p className="text-sm text-devhope-neutral-dark/80 mb-4">
                Based on your skills and preferences, these jobs are a good match for you.
              </p>
              <div className="space-y-4">
                {assessmentResults.jobMatches.map((job: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-md p-3 shadow-sm">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-devhope-blue">{job.title}</h4>
                      <Badge className="bg-devhope-green/10 text-devhope-green">
                        {job.matchPercentage}% Match
                      </Badge>
                    </div>
                    <p className="text-xs text-devhope-neutral-dark/70 mb-2">{job.company} • {job.location}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {job.skills.map((skill: string, i: number) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="text-xs bg-devhope-blue/5 text-devhope-blue"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button onClick={viewJobMatches} className="bg-devhope-green text-white">
                  View All Job Matches
                </Button>
              </div>
            </div>
            
            {/* Training Recommendations Card */}
            <div className="bg-gradient-to-br from-devhope-blue/5 to-devhope-green/5 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <BookOpen className="text-devhope-blue mr-2" />
                <h3 className="text-lg font-medium text-devhope-blue">Training Recommendations</h3>
              </div>
              <p className="text-sm text-devhope-neutral-dark/80 mb-4">
                These training programs can help you develop skills that are in-demand for your preferred jobs.
              </p>
              <div className="space-y-4">
                {assessmentResults.trainingRecommendations.map((training: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-md p-3 shadow-sm">
                    <h4 className="font-medium text-devhope-blue">{training.title}</h4>
                    <p className="text-xs text-devhope-neutral-dark/70">{training.provider}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <span className="text-devhope-neutral-dark/80">Duration: {training.duration}</span>
                      <span className="text-devhope-neutral-dark/80">Format: {training.format}</span>
                    </div>
                    <p className="text-xs mt-2 text-devhope-neutral-dark/90">{training.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" className="border-devhope-blue text-devhope-blue">
                  Explore All Training Options
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-devhope-neutral-dark/70 mb-4">
              Would you like to share your assessment results with potential employers?
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="border-devhope-blue text-devhope-blue">
                Update My Profile
              </Button>
              <Button className="bg-devhope-blue">
                Share With Employers
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsAssessmentForm;
