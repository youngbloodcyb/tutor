"use server";

import { db } from "@/lib/db";
import { course } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { adminAction } from "@/lib/data/safe";
import { createCourseSchema } from "@/lib/data/validation";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
