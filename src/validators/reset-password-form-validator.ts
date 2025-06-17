
import { z } from "zod";


export const emailFormSchema = z.object({email: z.string().email("E-mail inválido.")});

export const tokenFormSchema = z.object({token: z.string().nonempty({message: "Insira o código"})});

export const resetPasswordFormSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "As senhas não coincidem",
});

export type EmailFormData = z.infer<typeof emailFormSchema>;
export type TokenFormData = z.infer<typeof tokenFormSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;