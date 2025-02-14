import { prisma } from "@/lib/prisma";

export const getAdminCourses = async (courseId: string, userId: string,page: number) => {
    const courses = await prisma.course.findUnique({
        where: {
            creatorId: userId,
            id: courseId
        },
        select: {
            id: true,
            name: true,
            image: true,
            presentation: true,
            users: {
                take: 5,
                skip: Math.max(0, page * 5),
                select: {
                    canceledAt: true,
                    id: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true
                        }
                }
            }
            },
            _count: {
                select:{
                    lessons: true,
                    users: true
                }
            }
        }
    });
    
    const users = courses?.users.map((user) => {
        return {
            canceled : user.canceledAt ? true : false,
            ...user.user,
        };
    });
    return {
        ...courses,
        users,
        
    };
}