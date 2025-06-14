import { prisma } from "@/lib/prisma"; // ou como você configura o Prisma
import { compare } from "bcryptjs";

//types
type SignUpFormData = {
  name: string;
  email: string;
  password: string;
}

const rootURL = process.env.NEXT_PUBLIC_URL;


export async function loginUserWithEmail(email?: string, password?: string) {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) return null;

  const isValid = await compare(password, user.password);

  if (!isValid) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
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
