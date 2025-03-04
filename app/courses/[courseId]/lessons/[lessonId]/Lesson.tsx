import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { LessonType } from './lesson.query'
import { MdxRemote } from './MdxRemote'

export const Lesson = ({lesson}: {lesson: LessonType}) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
               {lesson.name}
            </CardTitle>
        </CardHeader>
        <CardContent>
        <MdxRemote></MdxRemote>
        </CardContent>
    </Card>
  )
}
