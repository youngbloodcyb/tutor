"use server";

import { db } from "@/lib/db";
import { course, progress } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { adminAction } from "@/lib/data/safe";
import { createCourseSchema, updateCourseSchema } from "@/lib/data/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/server";
import { and, exists } from "drizzle-orm";

export const createCourse = adminAction
  .schema(createCourseSchema)
  .action(async ({ parsedInput }) => {
    const { name, id, blocks } = parsedInput;

    await db.insert(course).values({
      name,
      id,
      content: blocks,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    redirect(`/admin/courses/edit/${id}`);
  });

export async function getAllCourses() {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  return await db.select().from(course).orderBy(desc(course.createdAt));
}

export const getCourse = async (id: string) => {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const firstCourse = await db
    .select()
    .from(course)
    .where(eq(course.id, id))
    .limit(1);

  return firstCourse[0];
};

export const updateCourse = adminAction
  .schema(updateCourseSchema)
  .action(async ({ parsedInput }) => {
    const { id, name, blocks } = parsedInput;

    await db
      .update(course)
      .set({ name, content: blocks, updatedAt: new Date() })
      .where(eq(course.id, id));

    revalidatePath(`/admin/courses/edit/${id}`);
  });

export const getCoursesWithProress = async () => {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const courses = await db
    .select({
      id: course.id,
      name: course.name,
      createdAt: course.createdAt,
      hasProgress: exists(
        db.select().from(progress).where(eq(progress.courseId, course.id))
      ).mapWith(Boolean),
    })
    .from(course)
    .leftJoin(
      progress,
      and(eq(progress.courseId, course.id), eq(progress.userId, userId))
    )
    .orderBy(desc(course.createdAt));

  return courses;
};
