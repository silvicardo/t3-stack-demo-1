import { z } from "zod";

export const createTodoSchema = z.object({
  text: z.string().min(1, { message: "Please enter a valid text" }),
});
