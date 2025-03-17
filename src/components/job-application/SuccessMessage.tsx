
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface SuccessMessageProps {
  job: {
    title: string;
    company: string;
  };
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ job, onClose }) => {
  return (
    <div className="px-6 py-10 text-center">
      <div className="w-16 h-16 bg-devhope-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={32} className="text-devhope-green" />
      </div>
      <h3 className="text-xl font-medium text-devhope-blue mb-2">Application Submitted!</h3>
      <p className="text-devhope-neutral-dark/70 mb-6">
        Thank you for applying to {job.title} at {job.company}. We'll notify you when the employer responds.
      </p>
      <Button 
        onClick={onClose}
        className="bg-gradient-to-r from-devhope-blue to-devhope-green text-white"
      >
        Close
      </Button>
    </div>
  );
};

export default SuccessMessage;
