import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { CheckCircle, Circle, CircleDashed } from 'lucide-react';
import Link from 'next/link';

export const LessonItemPlaceholder = () => {
  
  return (
  
      <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <CircleDashed size={16} />
        <Skeleton className="h-7 w-full"/>
      </div>
    
  );
};