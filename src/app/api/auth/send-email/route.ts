import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from "bcryptjs";
import { sendEmail } from '@/services/resend/resend';
const crypto = require('crypto');


export async function POST(request: Request) {
  try{

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "E-mail é obrigatório" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 });
    }

    if(!user.password){
      return NextResponse.json({ error: "Esta conta foi criada com login social. Entre com o Google."}, { status: 401 });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await prisma.user.update({
      where: {email},
      data: {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    })

    const newEmailMessage = await sendEmail({to:email, token});

    if(newEmailMessage.error){
      return NextResponse.json({ error: "Falha no envio do código, tente novamente."}, { status: 401 });
    }

    return NextResponse.json({
      message: "Código enviado para seu endereço de e-mail, verifique sua caixa de entrada."
    }, { status: 200 });
  } catch (error) {
    console.log('Erro: ', error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}