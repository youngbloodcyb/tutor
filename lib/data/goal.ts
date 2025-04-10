"use server";

import { db } from "@/lib/db";
import { course, goal, progress } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/server";
import { authenticatedAction } from "@/lib/data/safe";
import { createGoalSchema } from "./validation";

export const getGoals = async () => {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  const goals = await db
    .select()
    .from(goal)
    .where(eq(goal.userId, session.user.id))
    .orderBy(goal.createdAt);

  return goals;
};

export const createGoal = authenticatedAction
  .schema(createGoalSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user) {
      return null;
    }

    await db.insert(goal).values({
      id: crypto.randomUUID(),
      description: parsedInput.description,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath("/goals");
    redirect("/goals");
  });
