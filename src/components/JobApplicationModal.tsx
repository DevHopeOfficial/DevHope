
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence } from 'framer-motion';
import ApplicationForm from './job-application/ApplicationForm';
import SuccessMessage from './job-application/SuccessMessage';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: number;
    title: string;
    company: string;
  };
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ 
  isOpen, 
  onClose, 
  job 
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      toast({
        title: "Application submitted successfully!",
        description: "We'll notify you when the employer responds.",
      });
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    // Reset form after animation completes
    setTimeout(() => {
      if (step === 'success') setStep('form');
      setName('');
      setEmail('');
      setPhone('');
      setResume(null);
      setCoverLetter('');
    }, 300);
  };

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="h-2 bg-gradient-to-r from-devhope-blue to-devhope-orange"></div>
        
        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.div key="form" {...motionProps}>
              <DialogHeader className="px-6 pt-6 pb-2">
                <DialogTitle className="text-xl sm:text-2xl font-semibold text-devhope-blue">
                  Apply for {job.title}
                </DialogTitle>
                <p className="text-sm text-devhope-neutral-dark/70">at {job.company}</p>
              </DialogHeader>

              <ApplicationForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onClose={handleClose}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                setResume={(file) => setResume(file)}
                coverLetter={coverLetter}
                setCoverLetter={setCoverLetter}
              />
            </motion.div>
          ) : (
            <motion.div key="success" {...motionProps}>
              <SuccessMessage job={job} onClose={handleClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationModal;
