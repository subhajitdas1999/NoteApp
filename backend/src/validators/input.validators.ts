import { z } from "zod";

export const signUpInput = z.object({
  email: z.string().min(1).max(50),
  password: z.string().min(1).max(10),
});

export const logInInput = z.object({
  email: z.string().min(1).max(50),
  password: z.string().min(1).max(10),
});

export const createNotesInput = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const updateNotesInput = z.object({
  title: z.optional(z.string()),
  description: z.optional(z.string()),
});
