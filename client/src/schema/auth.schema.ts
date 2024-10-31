import z from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(3, "Min 3 characters long."),
  password: z.string().min(4, "Min 8 characters long."), // TODO: change the length
  name: z.string(),
  gender: z.enum(["male", "female", "other"]),
});

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
