import { prisma } from "@/lib/prisma"; // ou como você configura o Prisma
import { compare } from "bcryptjs";

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

const rootURL = process.env.NEXT_PUBLIC_URL;


export async function loginUserWithEmail(email?: string, password?: string) {
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
}

export const findUserOrCreate = async(user: UserProps) => {
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
}

export async function signUp(data: SignUpFormData) {
  const res = await fetch(`${rootURL}/api/auth/sign-up`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // if (!res.ok) throw new Error('Erro ao tentar cadastrar');
  
  return await res.json();
}


export async function sendEmailMessageWithToken(data:{email: string}) {
  const res = await fetch(`${rootURL}/api/auth/send-email`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
}

export async function verifyToken(data:{email: string, token: string}) {
  const res = await fetch(`${rootURL}/api/auth/verify-token`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res;
}

export async function resetPassword(data:{email: string, password: string}) {
  const res = await fetch(`${rootURL}/api/auth/reset-password`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
}