import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getAdminCourses } from "./adminCourses.query";
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "@/components/layout/layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { CoursePaginationButton } from "@/features/pagination/PaginationButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toggleUserCourseStatus } from "./courses.action";

export default async function Page({params,searchParams}: {params: {courseId: string}, searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
    const slug = params.courseId;
    const page = Number(searchParams.page ?? 0); 
    const courseId = slug;
    const session = await getAuthSession();
    const prisma = new PrismaClient();
    
    const course = await getAdminCourses(courseId, session.user.id,page);
   
    return (
        <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex gap-4 flex-col md:flex-row">
        <Card className="flex-[2]">
            <CardHeader>
                <CardTitle>Users</CardTitle>
            </CardHeader>
          <CardContent>
            <Table>
            <TableHeader>
                <TableRow> 
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-end'>Actions</TableHead>
                </TableRow>
                </TableHeader>
              <TableBody>
                {course?.users?.map((user) => (
                  <TableRow>
                    <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                        {user.image && (
                          <AvatarImage src={user.image} alt={user.name ?? ''} />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/users/${user.id}`}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {user.canceled ? 'Canceled' : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell className='flex flex-row-reverse'>
                     <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button size='sm' variant="secondary" asChild>
                          <span>
                            <Menu size={16} />
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent >
                        <DropdownMenuItem asChild>
                        <form >
                          <button type="submit" formAction={async () => {
                            "use server";
                          await toggleUserCourseStatus(params.courseId, user.id);
                        }}>
                            {user.canceled ? 'Activate' : 'Cancel'}
                          </button>
                        </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                     </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CoursePaginationButton totalPage={course._count?.users ?? 0 / 5} page={page} baseUrl={`/admin/courses/${course.id}`} />
          </CardContent>
        </Card>
        <Card className="flex-1">
            <CardHeader className="flex-row items-center gap-4 space-x-0">
                    <Avatar className="rounded">
                        <AvatarFallback>{course.name?.[0]}</AvatarFallback>
                        {course.image && (
                          <AvatarImage src={course.image} alt={course.name ?? ''} />
                        )}
                      </Avatar>
                    <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
                <Badge className="w-fit">{course.state}</Badge>
                <Typography>{course._count?.users} users</Typography>
                <Typography>{course._count?.lessons} lessons</Typography>
                <Link className={buttonVariants({variant: "outline"})} href={`/admin/courses/${course.id}/edit`}>Edit</Link>
                <Link className={buttonVariants({variant: "outline"})} href={`/admin/courses/${course.id}/lessons`}>Edit lessons</Link>
            </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
    )
}