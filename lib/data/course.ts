"use server";

import { db } from "@/lib/db";
import { course } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { adminAction } from "@/lib/data/safe";
import { createCourseSchema, updateCourseSchema } from "@/lib/data/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/server";

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

  return await db.select().from(course).orderBy(course.createdAt);
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
