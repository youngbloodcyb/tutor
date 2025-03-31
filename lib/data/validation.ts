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
