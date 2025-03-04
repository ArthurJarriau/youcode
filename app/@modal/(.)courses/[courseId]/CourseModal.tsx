"use client";
import React, { PropsWithChildren } from 'react'
import { CourseType } from '../../../courses/[courseId]/course.query'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { usePathname, useRouter } from 'next/navigation'



export type CourseModalProps = PropsWithChildren<{
    course: CourseType
}>

export const CourseModal = (props: CourseModalProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const isCoursePage = pathname?.split('/').filter(Boolean).length === 2;

  return (
    <Dialog
        open={isCoursePage}
        onOpenChange={() => {
            router.back();
        }
    }
    >
        <DialogContent className='max-h-screen overflow-auto max-w-3xl'>
            <DialogHeader>
                <DialogTitle>
                    {props.course.title}
                </DialogTitle>
            </DialogHeader>
            {props.children}
        </DialogContent>
    </Dialog>
  )
}
