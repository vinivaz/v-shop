"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { isDev } from "@/utils/devEmails";
import { redirect } from "next/navigation";

// Components
import { ProductRegister } from "@/Components/ProductRegister";

export default async function DevZone(){

  const session = await  getServerSession(authOptions);

  const user = session?.user? session.user : null;

  if (!user) {
    redirect("/sign-in");
  }

  if(!isDev(user.email!)){
    console.warn("Essa conta não é de um desenvolvedor.")
  }

  console.log(session)

  return <ProductRegister/>
 
}