"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { getSession } from "@/lib/auth/server";
import { eq } from "drizzle-orm";
import { adminAction } from "@/lib/data/safe";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteUserSchema } from "./validation";

export const getAllUsers = async () => {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const users = await db.select().from(user);

  return users;
};

export const deleteUser = adminAction
  .schema(deleteUserSchema)
  .action(async ({ parsedInput }) => {
    await db.delete(user).where(eq(user.id, parsedInput.userId));

    revalidatePath("/admin/users");
    redirect("/admin/users");
  });
