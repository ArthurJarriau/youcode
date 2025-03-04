import React from 'react'
import { getLesson } from './lesson.query'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { LessonNavigation } from './LessonNavigation'
import { Card } from '@/components/ui/card'

export default async function LessonPage({params}:{params:{courseId:string,lessonId:string}}) {
  const session = await getAuthSession()
  const isAuthorized = await prisma.course.findUnique({
    where:{
      id:params.courseId,
    },
    select:{
      users:{
        where:{
         userId:session?.user.id ?? '-',
         canceledAt:null
        }
      }
    }
  })
  
  const lesson = await getLesson(params.lessonId,session?.user.id )
  if (!lesson) {
    return notFound()
  }
  if (lesson.state !== 'PUBLIC' && !isAuthorized?.users.length) {
    return <p>Not Authorized</p>
  }
  return (
    <div>
      <LessonNavigation />
      <Card>
        
      </Card>
    </div>
  )
}
