import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react'
import { CoursePlaceholder } from '../../../courses/[courseId]/CoursePlaceholder';

export default function CourseLoading() {
  return (
    <Dialog
        open={true}
        
    >
        <DialogContent className='max-h-screen overflow-auto max-w-3xl'>
            <DialogHeader>
                <DialogTitle>
                    Loading...
                </DialogTitle>
            </DialogHeader>
            <CoursePlaceholder />
        </DialogContent>
    </Dialog>
  )
}
