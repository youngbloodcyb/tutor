"use server";

import { db } from "@/lib/db";
import { progress } from "@/lib/db/schema";
import { authenticatedAction } from "@/lib/data/safe";
import { completeCourseSchema } from "@/lib/data/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, count, and } from "drizzle-orm";
import { getSession } from "@/lib/auth/server";
import { course, goal, user } from "@/lib/db/schema";
import { OpenAI } from "openai";

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

export const evaluatePerformance = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Get user's progress data
    const [coursesProgress, completedGoals, totalCourses] = await Promise.all([
      db.select().from(progress).where(eq(progress.userId, userId)),
      db
        .select()
        .from(goal)
        .where(and(eq(goal.userId, userId), eq(goal.completed, true))),
      db.select().from(course),
    ]);

    // Calculate metrics
    const completionRate = (coursesProgress.length / totalCourses.length) * 100;
    const achievedGoals = completedGoals.length;

    // Create prompt for AI
    const prompt = `As an AI tutor, analyze this student's performance:
- Course Completion Rate: ${completionRate.toFixed(1)}%
- Completed Courses: ${coursesProgress.length} out of ${totalCourses.length}
- Achieved Goals: ${achievedGoals}

Provide a brief, encouraging evaluation of their progress and suggest next steps. 
Keep the response under 200 words and maintain a supportive, motivational tone.`;

    try {
      // Generate AI evaluation
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI tutor providing constructive feedback on student progress.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      const evaluation = completion.choices[0].message.content;

      // Save evaluation to user record
      await db
        .update(user)
        .set({
          evaluation,
          updatedAt: new Date(),
        })
        .where(eq(user.id, userId));

      revalidatePath("/dashboard");
    } catch (error) {
      console.error("AI Evaluation Error:", error);
      throw new Error("Failed to generate evaluation");
    }
  }
);

export const getEvaluation = async () => {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const evaluation = await db.select().from(user).where(eq(user.id, userId));
  return evaluation[0];
};
