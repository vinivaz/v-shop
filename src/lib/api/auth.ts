import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { fetchWithHandler } from "../fetchWithHandler";

//types
type SignUpFormData = {
  name: string;
  email: string;
  password: string;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  image?: string;
}

type User =  {
  id: string;
  email: string;
  password: string | null;
  name: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  avatar: string | null;
  provider: string | null;
}

const rootURL = process.env.NEXT_PUBLIC_URL;


export async function loginUserWithEmail(email?: string, password?: string) {
  try{
    if (!email || !password) throw new Error("Preencha todos os campos.");

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error("Usuário não encontrado.");

    if (!user.password) throw new Error("Esta conta foi criada com login social. Entre com o Google.");

    const isValid = await compare(password, user.password);

    if (!isValid) throw new Error("Senha incorreta.");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }catch(error){
    console.log(error)
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

}

export const findUserOrCreate = async(user: UserProps) => {

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email! },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          avatar: user.image,
          provider: 'google',
        },
      });
    }
  } catch (error) {
    console.error("Erro ao buscar ou criar usuário:", error);
    throw new Error("Erro ao registrar login do Google.");
  }
}

export async function signUp(data: SignUpFormData) {
  return await fetchWithHandler<User>(`${rootURL}/api/auth/sign-up`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


export async function sendEmailMessageWithToken(data:{email: string}) {
  return await fetchWithHandler<undefined>(`${rootURL}/api/auth/send-email`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function resetPassword(data:{token: string, email: string, newPassword: string}) {
  return await fetchWithHandler<undefined>(`${rootURL}/api/auth/reset-password`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}