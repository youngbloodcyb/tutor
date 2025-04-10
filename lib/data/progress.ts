import { db } from "@/lib/db";
import { progress } from "@/lib/db/schema";
import { authenticatedAction } from "@/lib/data/safe";
import { completeCourseSchema } from "@/lib/data/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const completeCourse = authenticatedAction
  .schema(completeCourseSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
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
