"use client"

// Components
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";
import Image from "next/image";

// Hooks
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useWarningMessageStore } from "../../../store/warningMessageStore";

import { signIn, signOut } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";

import { SignInFormData, signInFormSchema } from "@/validators/sign-in-form-validator";

export default function SignIn(){

  const initialFormValues = {
    email: '',
    password: '',
  }

  const show = useWarningMessageStore((state) => state.show)

  const { register, handleSubmit, reset, formState: {errors, isSubmitting}, clearErrors  } = useForm<SignInFormData>({
    defaultValues: initialFormValues,
    resolver: zodResolver(signInFormSchema)
  })

  const onSubmit = async(data: SignInFormData) => {
    try{

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      
      
      if (res?.ok) {
        window.location.href = "/";
        return;
      }
      
      if (res?.error) {
        console.log(res?.error);
        show("Houve um erro", res.error);
      }
      
    }catch(error){
      console.log(error)
      show("Houve um erro", "Erro ao entrar. Tente novamente.")
    }
  }

  return(
    <div
     className="flex flex-auto flew-row items-center min-md:h-[90vh] max-md:max-h-[800px] min-md:max-h-[692px] my-5 bg-white overflow-hidden  rounded-3xl w-full max-w-[805px] max-md:flex-col max-md:max-w-[452px]"
    >
      {/* sign in illustration */}
      <div
        className="relative h-full min-md:flex-auto min-md:flex items-center w-1/2 min-md:bg-linear-59 from-[#272727] to-[#1A1A1A] max-md:w-full max-md:bg-transparent"
      >
        <Image
          className="min-md:hidden absolute w-full h-auto object-cover z-0"
          src="/illustrations/sign-in-sign-up-mobile-background.svg"
          width={398}
          height={274}
          alt="dark background"
        />
        <Image
          className="max-md:hidden absolute -right-5 w-full h-auto object-cover z-1"
          src="/illustrations/sign-up-effects.png"
          width={406.44}
          height={552.06}
          alt="dark background"
        />
        <div
         className="flex flex-col items-center min-md:justify-center w-full max-md:h-full"
        >
          <Image
            className="w-[43%] max-md:w-[35%] h-auto object-contain z-1"
            src="/illustrations/sign-in-illustration.png"
            width={224.98}
            height={269.07}
            quality={100}
            alt="dark background"
          />
          <h1
            onClick={() => signOut()}
            className="text-white text-left w-full font-bold text-xl pl-15 mt-2 z-1 min-md:hidden"
          >
            Entrar
          </h1>
        </div>
      </div>
      <div
        className="flex flex-col items-center w-1/2  max-md:w-full z-1 mt-8 px-9 max-[400px]:px-5 pb-5"
      >
          <h1
           className="text-darker-text  font-bold max-md:hidden "
          >
            Entrar
          </h1>

        <Input
          type="email"
          label="E-mail"
          placeholder="Digite seu E-mail"
          error={errors.email?.message || ""}
          {...register("email")}

        />

        <Input
          type="password"
          label="Senha"
          placeholder="Insira uma senha"
          error={errors.password?.message || ""}
          {...register("password")}
        />
        <Button
         onClick={() => handleSubmit(onSubmit)()}
        >
          Concluir
        </Button>

        <Link className="text-dark-text text-sm font-medium mt-4" href={"/reset-password"}>Esqueci minha senha</Link>

        <span
         className="text-dark-text font-medium my-4"
        >
          ou
        </span>

        <Button
          variant="transparent"
          customStyle="mt-0"
          onClick={() => signIn("google")}
        > 
          <Image
            src="/icons/google-icon.svg"
            width={20}
            height={20}
            alt="google icon"
          />
          <span className="ml-3 text-base text-fading-text">
            Entrar com Google
          </span>
        </Button>

        <div>
          <p
            className="text-sm text-gray-500 mt-5"
          >
            Ainda não uma conta? <Link className="text-dark-text font-medium" href={"/sign-up"}>Clique aqui</Link>
          </p>
        </div>

      </div>
    </div>
  )
}