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
import { notFound } from 'next/navigation';
import { getAdminLesson } from './lesson.query';
import { LessonDetails } from './form/LessonDetailsForm';

  export default async function LessonPage({params}: {params: {lessonId: string}}) {
   
    const session = await getAuthSession();
    
    const lesson = await getAdminLesson(params.lessonId, session.user.id);
    
    
    if (!lesson) {
      notFound();
    }
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>{lesson.name}</LayoutTitle>
        </LayoutHeader>
        <LayoutContent className='flex flex-col gap-4 lg:flex-row'>
          <Card className='flex-[2]'>
            <CardHeader>
                <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <LessonDetails defaultValue={lesson} />
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    );
  }