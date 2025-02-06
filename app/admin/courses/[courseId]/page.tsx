import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";

export default async function Page({params}: {params: {courseId: string}}) {
    const slug = params.courseId;
    // console.log(slug);
    const courseId = slug;
    // console.log(courseId);
    const prisma = new PrismaClient();
    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        }
    });
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {course.name}
                </CardTitle>
                <Image src={course.image} alt={course.title} width={200} height={200}/>
                
            </CardHeader>
        </Card>
    )
}