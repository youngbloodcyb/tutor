import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const createCourseSchema = z.object({
  name: z.string().min(1),
  id: z.string().uuid(),
  blocks: z.array(z.any()),
});

export const updateCourseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  blocks: z.array(z.any()),
});

export const completeCourseSchema = z.object({
  courseId: z.string(),
});

export const deleteUserSchema = z.object({
  userId: z.string(),
});

export const createGoalSchema = z.object({
  description: z.string().min(1),
});

export const updateGoalSchema = z.object({
  id: z.string(),
  description: z.string().min(1),
  completed: z.boolean(),
});

export const deleteGoalSchema = z.object({
  goalId: z.string(),
});
