"use server";
import { z } from "zod"
import { LessonDetailsSchema } from "./form/lesson.schema"
import { authenticatedAction } from "@/lib/action"
import { prisma } from "@/lib/prisma"

const lessonEditDetailsSchema = z.object({
    lessonId: z.string(),
    data:LessonDetailsSchema,
})

export const lessonEditDetails = authenticatedAction(
    lessonEditDetailsSchema,
    async (props, {userId}) => {
        const lesson = await prisma.lesson.update({
            where: {
                id: props.lessonId,
                course:{
                    creatorId: userId,
                },
            },
            data: props.data,
        })

        return {
            message: "Lesson updated successfully",
            lesson,
        }
    })