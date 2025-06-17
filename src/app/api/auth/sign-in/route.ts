import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from "bcryptjs";


export async function POST(request: Request) {
  try{

    const { email, password } = await request.json()


    if (!email || !password) {
      return NextResponse.json({ error: "E-mail e senha são obrigatórios" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 });
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: "Usuário ou senha incorreta" }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log('Erro: ', error);
    return NextResponse.json({ error: "Erro interno"}, { status: 500 });
  }
}