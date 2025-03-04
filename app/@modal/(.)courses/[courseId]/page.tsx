import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
  } from '@/components/layout/layout';
  import { getAuthSession } from '@/lib/auth';
  import { notFound } from 'next/navigation';
import { getCourse } from '../../../courses/[courseId]/course.query';
import { CourseModal } from './CourseModal';
import { Course } from '../../../courses/[courseId]/Course';


  export default async function CoursePage({
    params,
  }: {
    params: {
      courseId: string;
    };
  }) {
    const session = await getAuthSession();
    const course = await getCourse({
      courseId: params.courseId,
      userId: session?.user.id,
    });
    const userId = session?.user.id;
    
    if (!course) {
      notFound();
    }
    return (
      <CourseModal course={course}>
        <Course course={course} userId={userId} />
      </CourseModal>
    );
  }