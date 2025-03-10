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
import { notFound } from 'next/navigation';
import { getAdminLesson } from './lesson.query';
import { LessonDetails } from './form/LessonDetailsForm';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { MdxEditor } from './content/MdxEditor';


  export default async function LessonPage({params}: {params: {lessonId: string}}) {
   
    const session = await getAuthSession();
    
    const lesson = await getAdminLesson(params.lessonId, session.user.id);
    
    
    if (!lesson) {
      notFound();
    }
    return (
      <Layout className='max-w-5xl'>
        <LayoutHeader>
          <LayoutTitle>{lesson.name}</LayoutTitle>
        </LayoutHeader>
        <LayoutActions>
          <Link href={`/admin/courses/${lesson.courseId}/lessons`} className={buttonVariants({size: 'sm', variant: 'secondary'})}>
           Back
          </Link>
        </LayoutActions>
        <LayoutContent className='flex flex-col gap-4 lg:flex-row'>
          <Card className='flex-1'>
            <CardHeader>
                <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <LessonDetails defaultValue={lesson} />
            </CardContent>
          </Card>
          <Card className='flex-[3]'>
            <CardHeader>
                <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
            <MdxEditor lessonId={lesson.id} markdown={lesson.content} />
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    );
  }