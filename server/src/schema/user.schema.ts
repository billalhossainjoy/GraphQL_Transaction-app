import z from "zod";

export const usernameSchema = z.string().min(3, "Min 3 characters long.");

export const passwordSchema = z.string().min(4, "Min 8 characters long."); // TODO: change the length

export const SignUpSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  name: z.string(),
  gender: z.enum(["male", "female", "other"]),
});

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type SignUpSchemaType  = z.infer<typeof SignUpSchema>
export type LoginSchemaType = z.infer<typeof LoginSchema>;
