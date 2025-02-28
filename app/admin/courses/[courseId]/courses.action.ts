"use server";

import { getAuthSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function toggleUserCourseStatus(courseId: string, userId: string) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const courseOnUser = await prisma.courseOnUser.findFirst({
    where: {
      userId: userId,
      course: {
        id: courseId,
        creatorId: session.user.id,
      },
    },
  });

  if (!courseOnUser) return;

  await prisma.courseOnUser.update({
    where: { id: courseOnUser.id },
    data: { canceledAt: courseOnUser.canceledAt ? null : new Date() },
  });

  revalidatePath(`/admin/courses/${courseId}`);
}
