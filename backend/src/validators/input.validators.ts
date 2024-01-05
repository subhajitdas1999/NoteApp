import { z } from "zod";

const signUpInput = z.object({
  email: z.string().min(1).max(50),
  password: z.string().min(1).max(10),
});

export { signUpInput };
