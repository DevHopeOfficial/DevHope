
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { DialogFooter } from '../ui/dialog';

interface ApplicationFormProps {
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  onClose: () => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  setResume: (file: File) => void;
  coverLetter: string;
  setCoverLetter: (value: string) => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onSubmit,
  isSubmitting,
  onClose,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  setResume,
  coverLetter,
  setCoverLetter,
}) => {
  return (
    <form onSubmit={onSubmit} className="px-6 py-4">
      <div className="space-y-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-devhope-blue"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-devhope-blue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
            <input
              id="phone"
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-devhope-blue"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="resume" className="block text-sm font-medium mb-1">Resume/CV</label>
          <input
            id="resume"
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-devhope-blue"
            accept=".pdf,.doc,.docx"
            onChange={(e) => e.target.files && setResume(e.target.files[0])}
            required
          />
        </div>
        
        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium mb-1">Cover Letter (Optional)</label>
          <textarea
            id="coverLetter"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-devhope-blue"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>
        </div>
      </div>
      
      <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
        <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto order-2 sm:order-1">
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-devhope-blue to-devhope-orange text-white w-full sm:w-auto order-1 sm:order-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            <span className="flex items-center">
              <Send size={16} className="mr-2" />
              Submit Application
            </span>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ApplicationForm;
