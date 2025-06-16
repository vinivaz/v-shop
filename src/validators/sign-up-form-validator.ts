
import { z } from "zod";


export const signUpFormSchema = z.object({
  name: z.string({message: "Campo obrigatório."}).min(2, {message: "Pelo menos 2 carateres necessários.",}),
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, {message: "Pelo menos 6 carateres necessários."}),
  confirmPassword: z.string().min(6, {message: "Pelo menos 6 carateres necessários."}) 
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export type SignInFormData = z.infer<typeof signUpFormSchema>;