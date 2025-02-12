import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { Lesson } from '@prisma/client'
import React from 'react'

export type LessonItemProps = {
    lesson: Lesson
    }


export default function LessonItem(props: LessonItemProps) {
  return (
    <div className='border border-border hover:bg-accent transition-colors bg-card px-2 py-1 rounded flex items-center'>
        
        <Typography variant="large">
            {props.lesson.name}
        </Typography>
        <Badge className='ml-auto'>
            {props.lesson.state}
        </Badge>
    </div>
  )
}
