"use server";

import { db } from "@/lib/db";
import { goal } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/server";
import { authenticatedAction } from "@/lib/data/safe";
import {
  createGoalSchema,
  deleteGoalSchema,
  updateGoalSchema,
} from "./validation";

export const getGoals = async () => {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  const goals = await db
    .select()
    .from(goal)
    .where(eq(goal.userId, session.user.id))
    .orderBy(desc(goal.createdAt));

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

export const updateGoal = authenticatedAction
  .schema(updateGoalSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user) {
      return null;
    }

    await db
      .update(goal)
      .set({
        description: parsedInput.description,
        completed: parsedInput.completed,
        updatedAt: new Date(),
      })
      .where(eq(goal.id, parsedInput.id));

    revalidatePath("/goals");
    redirect("/goals");
  });

export const deleteGoal = authenticatedAction
  .schema(deleteGoalSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user) {
      return null;
    }

    await db.delete(goal).where(eq(goal.id, parsedInput.goalId));

    revalidatePath("/goals");
    redirect("/goals");
  });

export const getGoal = async (id: string) => {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  const result = await db.select().from(goal).where(eq(goal.id, id)).limit(1);

  return result[0];
};
