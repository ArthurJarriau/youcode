"use server";
import { getAuthSession } from '@/lib/auth';
import { PrismaClient } from "@prisma/client";
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createLesson(formData: FormData) {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");

  const courseId = formData.get("courseId") as string;
  const course = await prisma.course.findFirstOrThrow({
    where: { id: courseId, creatorId: session.user.id },
  });

  const lesson = await prisma.lesson.create({
    data: {
      name: "New Lesson",
      rank: "aaaa",
      state: "HIDDEN",
      courseId: course.id,
      content: "## Default Content",
    },
  });

  redirect(`/admin/courses/${courseId}/lessons/${lesson.id}`);
}
