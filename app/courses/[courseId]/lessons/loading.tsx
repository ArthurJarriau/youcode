import { LessonsNavigationSkeleton } from './[lessonId]/LessonNavigationSkeleton';
import { LessonSkeleton } from './[lessonId]/LessonSkeleton';


export default function LessonLoading() {
  return (
    <div className="flex items-start gap-4 p-4">
      <LessonsNavigationSkeleton />
      <LessonSkeleton />
    </div>
  );
}