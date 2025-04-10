"use server";

import { db } from "@/lib/db";
import { progress } from "@/lib/db/schema";
import { authenticatedAction } from "@/lib/data/safe";
import { completeCourseSchema } from "@/lib/data/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, count, and } from "drizzle-orm";
import { getSession } from "@/lib/auth/server";
import { course, goal } from "@/lib/db/schema";

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

export const getAllUserProgress = async () => {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const [totalCourses, completedCourses, achievedGoals] = await Promise.all([
    // Get total number of courses
    db
      .select({ value: count() })
      .from(course)
      .then((res) => res[0].value),

    // Get number of courses with progress for this user
    db
      .select({ value: count() })
      .from(progress)
      .where(eq(progress.userId, userId))
      .then((res) => res[0].value),

    // Get number of completed goals for this user
    db
      .select({ value: count() })
      .from(goal)
      .where(and(eq(goal.userId, userId), eq(goal.completed, true)))
      .then((res) => res[0].value),
  ]);

  return {
    totalCourses,
    completedCourses,
    achievedGoals,
  };
};
