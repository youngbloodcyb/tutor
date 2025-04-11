"use server";

import { db } from "@/lib/db";
import { course, progress } from "@/lib/db/schema";
import { eq, desc, and, exists } from "drizzle-orm";
import { adminAction } from "@/lib/data/safe";
import {
  createCourseSchema,
  updateCourseSchema,
  createAICourseSchema,
} from "@/lib/data/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/server";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const baseBlockSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  title: z.string(),
});

// Schema for quiz options
const quizOptionSchema = z.object({
  text: z.string(),
  correct: z.boolean(),
  selected: z.boolean(),
});

// Schema for quiz questions
const quizQuestionSchema = z.object({
  text: z.string(),
  options: z.array(quizOptionSchema),
});

// Schema for quiz blocks
const quizBlockSchema = baseBlockSchema.extend({
  type: z.literal("quiz"),
  questions: z.array(quizQuestionSchema),
});

// Schema for tiptap blocks
const tiptapBlockSchema = baseBlockSchema.extend({
  type: z.literal("tiptap"),
  content: z.string(),
  maxHeight: z.number().optional(),
  showToolbar: z.boolean().optional(),
});

// Combined schema for any type of block
const courseBlockSchema = z.discriminatedUnion("type", [
  tiptapBlockSchema,
  quizBlockSchema,
]);

// Schema for the entire course content array
const courseContentSchema = z.object({
  blocks: z.array(courseBlockSchema),
});

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

export async function getAllCourses() {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  return await db.select().from(course).orderBy(desc(course.createdAt));
}

export const getCourse = async (id: string) => {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const firstCourse = await db
    .select()
    .from(course)
    .where(eq(course.id, id))
    .limit(1);

  return firstCourse[0];
};

export const updateCourse = adminAction
  .schema(updateCourseSchema)
  .action(async ({ parsedInput }) => {
    const { id, name, blocks } = parsedInput;

    await db
      .update(course)
      .set({ name, content: blocks, updatedAt: new Date() })
      .where(eq(course.id, id));

    revalidatePath(`/admin/courses/edit/${id}`);
  });

export const getCoursesWithProgress = async () => {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const courses = await db
    .select({
      id: course.id,
      name: course.name,
      createdAt: course.createdAt,
      hasProgress: exists(
        db.select().from(progress).where(eq(progress.courseId, course.id))
      ).mapWith(Boolean),
    })
    .from(course)
    .leftJoin(
      progress,
      and(eq(progress.courseId, course.id), eq(progress.userId, userId))
    )
    .orderBy(desc(course.createdAt));

  return courses;
};

export const createAICourse = adminAction
  .schema(createAICourseSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { content } = parsedInput;

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `
        You are a helpful assistant in creating a course to help students learn. 
        Make it simple and easy to understand. 
        You may need to create some simple quizes. 
        Here is an example format of a course you could create:
  
              [
          {
            "id": "ddbdb4fe-93f8-4af9-99a8-059d2c740224",
            "type": "tiptap",
            "title": "Text Block",
            "content": "<h1>Pre-Algebra &amp; Solving Equations: A Simple Course</h1><p>Welcome to your beginner-friendly guide to Pre-Algebra! This course will help you understand the basics of algebra and teach you how to solve simple equations.</p><hr><h2>📘 Lesson 1: What is Pre-Algebra?</h2><p>Pre-Algebra is the foundation of all math that comes after basic arithmetic. It introduces:</p><ul><li><p>Variables (like x or y)</p></li><li><p>Expressions</p></li><li><p>Simple equations</p></li><li><p>Properties of numbers</p></li></ul><hr><h2>✏️ Lesson 2: Understanding Variables</h2><p>A <strong>variable</strong> is a letter that represents a number you don't know yet.</p><p><strong>Example:</strong></p><pre><code>x = 5\n</code></pre><p>This means the variable <code>x</code> has a value of 5.</p><hr><h2> Lesson 3: Writing Simple Expressions</h2><p>An <strong>expression</strong> is a math phrase that can contain numbers, variables, and operators (+, -, x, ÷).</p><p><strong>Examples:</strong></p><pre><code>x + 3\n2y - 7\n</code></pre><p>These do NOT have equal signs.</p><hr><h2> Lesson 4: Equations and Equal Signs</h2><p>An <strong>equation</strong> is like a balance scale. It shows that two things are equal.</p><p><strong>Examples:</strong></p><pre><code>x + 3 = 5\n2y - 7 = 1\n</code></pre><p>Your goal is to find what the variable equals.</p><hr><h2>🧩 Lesson 5: Solving 1-Step Equations</h2><p>To solve, do the <strong>opposite operation</strong> to both sides of the equation.</p><p><strong>Example:</strong></p><pre><code>x + 3 = 5\nSubtract 3 from both sides:\nx = 2\n</code></pre><p><strong>Another Example:</strong></p><pre><code>x - 4 = 7\nAdd 4 to both sides:\nx = 11\n</code></pre><hr><h2>✖️ Lesson 6: Solving Equations with Multiplication or Division</h2><p><strong>Example:</strong></p><pre><code>2x = 10\nDivide both sides by 2:\nx = 5\n</code></pre><p><strong>Example:</strong></p><pre><code>x / 4 = 3\nMultiply both sides by 4:\nx = 12\n</code></pre><hr><h2>🔁 Lesson 7: Checking Your Work</h2><p>Always plug your answer back into the original equation.</p><p><strong>Example:</strong></p><pre><code>If x = 5 in 2x = 10:\n2(5) = 10 ✔️\n</code></pre><hr><h2>🎯 Final Tips</h2><ul><li><p>Whatever you do to one side of the equation, do to the other.</p></li><li><p>Always check your answer.</p></li><li><p>Take it one step at a time.</p></li></ul><p>Great job! You're on your way to becoming an algebra pro!</p>",
            "maxHeight": 300,
            "showToolbar": true
          },
          {
            "id": "91cbc562-0a68-4da9-9203-79ecb76cc011",
            "type": "quiz",
            "title": "Quiz",
            "questions": [
              {
                "text": "What is the value of x? x + 4 = 9",
                "options": [
                  {
                    "text": "13",
                    "correct": false,
                    "selected": false
                  },
                  {
                    "text": "5",
                    "correct": true,
                    "selected": false
                  },
                  {
                    "text": "4",
                    "correct": false,
                    "selected": false
                  },
                  {
                    "text": "9",
                    "correct": false,
                    "selected": false
                  }
                ]
              }
            ]
          }
        ]
  
        ${content}`,
      });

      const { object } = await generateObject({
        model: openai("gpt-4o"),
        schema: courseContentSchema,
        prompt: `Generate a course based on the following content: ${text}`,
      });

      console.log(JSON.stringify(object, null, 2));
      return object.blocks;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create course");
    }
  });
