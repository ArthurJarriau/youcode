/* eslint-disable @next/next/no-img-element */
import {
    Layout,
    LayoutActions,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
  } from '@/components/layout/layout';

  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

  import { getAuthSession } from '@/lib/auth';
  import { PrismaClient } from "@prisma/client";
import { getCourseLessons } from './lessons.query';
import { notFound, redirect } from 'next/navigation';
import { AdminLessonItem } from './LessonItem';
import { SubmitButton } from '@/components/form/SubmitButton';
import { getSession } from 'next-auth/react';
import { createLesson } from './lesson.action';
import Link from 'next/link';


  export default async function CoursesPage({params}: {params: {courseId: string}}) {
    const prisma = new PrismaClient();
    const session = await getAuthSession();
    const course = params.courseId;
  
    const courseLessons = await getCourseLessons({courseId: course, userId: session?.user.id})
    
    const lessons = courseLessons?.lessons;
   
    
    if (!session) {
      notFound();
    }
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Lessons - {courseLessons?.name}</LayoutTitle>
        </LayoutHeader>
        
        <LayoutContent className='flex flex-col gap-4 lg:flex-row'>
          <Card className='flex-[2]'>
            <CardHeader>
                <CardTitle>Lessons</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {lessons?.map((lesson) => (
                <AdminLessonItem lesson={lesson} key={lesson.id}/>
              ))}
              <form action={createLesson}>
                <input type="hidden" name="courseId" value={params.courseId} />
                <SubmitButton size="sm" variant="secondary">
                  Create Lesson
                </SubmitButton>
              </form>
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    );
  }