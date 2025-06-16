import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(1, {message: "Senha inválida."})
})

export type SignInFormData = z.infer<typeof signInFormSchema>;