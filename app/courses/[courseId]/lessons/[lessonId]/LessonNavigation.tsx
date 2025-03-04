import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export type LessonNavigationProps = {

}
export const LessonNavigation = (props: LessonNavigationProps)=> {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Lessons
            </CardTitle>
        </CardHeader>
    </Card>
  )
}
