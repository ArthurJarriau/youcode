import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { string } from "zod";

export type CourseCardProps = {
    course:{
        name: string;
        image: string;
        creator:{
            name?: string | null;
            image?: string | null;
        }
    }
}
export const CourseCard = (props: CourseCardProps) => {
    return(
        <Card>
            <CardHeader className="space-y-0 flex flex-row gap-2">
                <Avatar>
                    <AvatarFallback>{props.course.name[0]}</AvatarFallback>
                    {props.course.image && (
                        <AvatarImage src={props.course.image} alt={props.course.name} />
                    )}
                </Avatar>
                <div>
                    <CardTitle>
                        {props.course.name}
                    </CardTitle>
                   <div>
                        <Avatar>
                            <AvatarFallback>{props.course.creator.name?.[0]}</AvatarFallback>
                            {props.course.creator.image && (
                                <AvatarImage src={props.course.creator.image} alt={props.course.creator.name || "creator"} />
                            )}
                            
                        </Avatar>
                        <Typography variant="small">{props.course.creator.name}</Typography>
                   </div>
                </div>
            </CardHeader>
        </Card>
    )
}
