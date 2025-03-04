import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
  } from '@/components/layout/layout';
  import { getAuthSession } from '@/lib/auth';
  import { notFound } from 'next/navigation';
  import { Course } from './Course';
  import { getCourse } from './course.query';
import { CoursePlaceholder } from './CoursePlaceholder';
  export default async function CoursePage(
    ) {
    
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Course</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <CoursePlaceholder />
        </LayoutContent>
      </Layout>
    );
  }