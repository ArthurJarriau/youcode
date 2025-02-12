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
  import { getAuthSession } from '@/lib/auth';
  import { PrismaClient } from "@prisma/client";

import { notFound } from 'next/navigation';
import { CourseCard } from '../courses/CourseCard';

  export default async function CoursesPage({params}: {params: {courseId: string}}) {
    const prisma = new PrismaClient();
    const session = await getAuthSession();
    const courses = await prisma.course.findMany({
        select: {
            name: true,
            image: true,
            id: true,
            creator: {
                select: {
                    name: true ,
                    image: true,
                }
            }
        },
    });
    
    if (!session) {
      notFound();
    }
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Explorer</LayoutTitle>
        </LayoutHeader>
        <LayoutContent className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4'>
          {courses?.map((course) => (
            <CourseCard course={course} key={course.name}/>
            ))}
        </LayoutContent>
      </Layout>
    );
  }