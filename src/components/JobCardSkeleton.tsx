
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';

const JobCardSkeleton: React.FC = () => {
  return (
    <Card className="border border-devhope-blue/10 shadow-sm bg-white rounded-xl overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300"></div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0 w-full md:w-2/3">
            <Skeleton className="h-7 w-3/4 mb-3" />
            <Skeleton className="h-4 w-1/3 mb-3" />
            
            <div className="flex flex-wrap gap-4 mt-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-8 w-32" />
        </div>
        
        <div className="my-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Skeleton className="h-10 w-full sm:w-1/2" />
          <Skeleton className="h-10 w-full sm:w-1/2" />
        </div>
      </CardContent>
    </Card>
  );
};

export const JobListSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default JobCardSkeleton;
