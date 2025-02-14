import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { string } from "zod";
import { CoursesCard } from "./courses.query";

export type CourseCardProps = {
    course: CoursesCard;
}
export const CourseCard = (props: CourseCardProps) => {
    return(
        <Link href={`/courses/${props.course.id}`}>
            <Card className="hover:bg-accent">
                <CardHeader className="space-y-0 flex flex-row gap-3">
                    <Avatar className="rounded h-14 w-14">
                        <AvatarFallback>{props.course.name[0]}</AvatarFallback>
                        {props.course.image && (
                            <AvatarImage src={props.course.image} alt={props.course.name} />
                        )}
                    </Avatar>
                    <div className="flex flex-col gap-3">
                        <CardTitle>
                            {props.course.name}
                        </CardTitle>
                    <div className="flex flex-row gap-2">
                            <Avatar className="rounded h-8 w-8">
                                <AvatarFallback>{props.course.creator.name?.[0]}</AvatarFallback>
                                {props.course.creator.image && (
                                    <AvatarImage src={props.course.creator.image} alt={props.course.creator.name || "creator"} />
                                )}
                                
                            </Avatar>
                            <Typography variant="large" className="text-muted-foreground">{props.course.creator.name}</Typography>
                    </div>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    )
}
