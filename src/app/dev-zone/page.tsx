"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { isDev } from "@/utils/devEmails";
import { redirect } from "next/navigation";

// Components
import { ProductRegister } from "@/app/dev-zone/Components/ProductRegister";

export default async function DevZone(){

  const session = await  getServerSession(authOptions);

  const user = session?.user? session.user : null;

  if (!user) {
    redirect("/sign-in");
  }

  if(!isDev(user.email!)){
    redirect("/");
  }

  console.log(session)

  return <ProductRegister/>
 
}