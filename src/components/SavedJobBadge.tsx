
import React from 'react';
import { BookmarkCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SavedJobBadgeProps {
  className?: string;
}

const SavedJobBadge: React.FC<SavedJobBadgeProps> = ({ className }) => {
  return (
    <Badge variant="outline" className={`bg-devhope-green/10 text-devhope-green flex items-center gap-1 ${className}`}>
      <BookmarkCheck size={14} />
      <span>Saved</span>
    </Badge>
  );
};

export default SavedJobBadge;
