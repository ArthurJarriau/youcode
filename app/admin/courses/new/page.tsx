import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
  } from '@/components/layout/layout';
  import { Card, CardContent } from '@/components/ui/card';
  import { getAuthSession } from '@/lib/auth';
  import { prisma } from '@/lib/prisma';
  import { notFound } from 'next/navigation';
import { CourseForm } from '../[courseId]/edit/CourseForm';

  
  
  export default async function CoursePage() {
    const session = await getAuthSession();
  
 
  
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Courses</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Card className="flex-[2]">
            <CardContent className="mt-6">
              <CourseForm  />
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    );
  }