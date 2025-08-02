import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from "bcryptjs";


export async function POST(request: Request) {
  try{

    const { email, newPassword, token } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Insira o E-mail." }, { status: 400 });
    }

    if (!newPassword) {
      return NextResponse.json({ error: "Insira a nova senha." }, { status: 400 });
    }

    if (!token) {
      return NextResponse.json({ error: "Código é obrigatório para continuar." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 });
    }

    if(!user.password){
      return NextResponse.json({ error: "Esta conta foi criada com login social. Entre com o Google."}, { status: 401 });
    }

    if(!user.passwordResetToken || !user.passwordResetExpires){
      return NextResponse.json({ error: "Erro ao verificar, solicite código novamente."}, { status: 401 });
    }

    if(token !== user.passwordResetToken) {
      return NextResponse.json({ error: "Código inválido."}, { status: 401 });
    }

    const now = new Date();

    if(now > user.passwordResetExpires){
      return NextResponse.json({ error: "Código expirado, solicite o código e insira ele novamente."}, { status: 401 });
    }

    const hashedPassword = await hash(newPassword, 10);

    await prisma.user.update({
      where:{
        email
      },
      data:{
        password: hashedPassword,
        passwordResetExpires: null,
        passwordResetToken: null
      }
    })

    return NextResponse.json({message: "Sua senha foi redefinida com sucesso."}, { status: 201 });
  } catch (error) {
    console.log('Erro: ', error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}