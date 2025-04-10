"use server";

import { db } from "@/lib/db";
import { progress } from "@/lib/db/schema";
import { authenticatedAction } from "@/lib/data/safe";
import { completeCourseSchema } from "@/lib/data/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth/server";

export const completeCourse = authenticatedAction
  .schema(completeCourseSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    console.log("completeCourse", parsedInput, userId);
    await db.insert(progress).values({
      id: crypto.randomUUID(),
      courseId: parsedInput.courseId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath(`/courses/${parsedInput.courseId}`);
    redirect(`/courses/${parsedInput.courseId}`);
  });

export const getProgress = async (courseId: string) => {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const rows = await db
    .select()
    .from(progress)
    .where(eq(progress.courseId, courseId))
    .limit(1);

  return rows[0];
};
