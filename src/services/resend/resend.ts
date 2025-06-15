"use server"

import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(to:string) => {
  await resend.emails.send({
    to,
    from: "v-shop <onboarding@resend.dev>",
    subject: "",
    html: "<p>abubleh</p>"
  })
}