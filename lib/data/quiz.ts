"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/server";
import { authenticatedAction } from "@/lib/data/safe";
import { saveQuizStatusSchema } from "./validation";

export const getQuizStatus = async () => {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  const quizStatus = await db
    .select({ status: user.quizCompleted })
    .from(user)
    .where(eq(user.id, session.user.id));

  return quizStatus[0].status;
};

export const saveQuizStatus = authenticatedAction
  .schema(saveQuizStatusSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user) {
      return null;
    }

    await db
      .update(user)
      .set({
        quizScore: parsedInput.score,
        quizCompleted: true,
        quizResults: parsedInput.results,
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id));

    revalidatePath("/");
  });
