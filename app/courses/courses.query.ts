import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCourses = async (userId?: string) => {
    return await prisma.course.findMany({
        where: userId ? {
            users: { 
                some: {
                    userId: userId 
                }
            }
        } : undefined,
        select: {
            id: true,
            name: true,
            image: true,
            creator: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    });
}


export type CoursesCard = Prisma.PromiseReturnType<typeof getCourses>[number];