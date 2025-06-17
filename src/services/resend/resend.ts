"use server"

import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async({to, token}: {to: string, token: string}) => {

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 20px">
      <h2>Redefinição de senha</h2>
      <p>Olá! Recebemos uma solicitação para redefinir sua senha.</p>
      <p>
        Copie o codigo abaixo para criar uma nova senha. Esse link expira em 1 hora.
      </p>
      <span style="
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background-color: #2563eb;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
      ">${token}</span>
      <p style="margin-top: 30px; font-size: 12px; color: #555">
        Se você não solicitou isso, pode ignorar este e-mail.
      </p>
    </div>
  `;

  const newEmailMessage = await resend.emails.send({
    to,
    from: "v-shop <onboarding@resend.dev>",
    subject: "Solicitação de código para redefinir senha.",
    html: htmlContent
  })
  return newEmailMessage;
}