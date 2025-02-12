/* eslint-disable @next/next/no-img-element */
import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
  } from '@/components/layout/layout';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Typography } from '@/components/ui/typography';
  import { getAuthSession } from '@/lib/auth';
  import { PrismaClient } from "@prisma/client";
import { getLessons } from './lesson.query';
import { notFound } from 'next/navigation';
import LessonItem from './LessonItem';
  export default async function CoursesPage({params}: {params: {courseId: string}}) {
    const prisma = new PrismaClient();
    const session = await getAuthSession();
    const course = params.courseId;
    const courseLessons = await getLessons(course,session?.user.id)
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
                <LessonItem lesson={lesson} key={lesson.id}/>
              ))}
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    );
  }