import { LessonState } from "@prisma/client";
import { z } from "zod";

export const LESSON_STATE = ["HIDDEN","PUBLIC","PUBLISHED"] as const;
export const LessonDetailsSchema = z.object({
    name: z.string(),
    state: z.enum(LESSON_STATE),
    });

export type LessonDetailsSchema = z.infer<typeof LessonDetailsSchema>;