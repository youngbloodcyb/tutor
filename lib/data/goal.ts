"use server";

import { db } from "@/lib/db";
import { course, goal, progress } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/server";

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
