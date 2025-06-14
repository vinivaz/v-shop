import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from "bcryptjs";


export async function POST(request: Request) {
  try{

    const { name, email, password } = await request.json()


    if (!name || !email || !password) {
      return NextResponse.json({ message: "Preencha todos os campos" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        user: {
          ...user,
          password:undefined
        }
      },
      {status: 201}
    );
    
  } catch (error) {
    console.log('Erro: ', error);
    return NextResponse.json({ message: "Erro interno", error }, { status: 500 });
  }
}