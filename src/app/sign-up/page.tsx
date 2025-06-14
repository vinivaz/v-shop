"use client"

// Components
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";
import Image from "next/image";

// Hooks
import { useForm } from "react-hook-form";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { signUp } from "@/lib/api/auth";

// Types
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp(){

  const initialFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const { register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm<FormData>({
    defaultValues: initialFormValues,
  })

  const onSubmit = async(data: FormData) => {
    console.log(data)
    try{

      const res = await signUp({
        name: data.name,
        email: data.email,
        password: data.password
      })

      console.log(res)

      if(!res.error && res.user){
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        });
      }

      reset(initialFormValues);

    }catch(error){
      console.log(error)
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
           className="text-white text-left w-full font-bold text-xl pl-15 mt-2 z-1 min-md:hidden"
          >
            Cadastrar
          </h1>
        </div>
      </div>
      <div
        className="flex flex-col items-center w-1/2  max-md:w-full z-1 mt-7 px-9 pb-5"
      >
          <h1
           className="text-darker-text  font-bold max-md:hidden "
          >
            Cadastrar
          </h1>
        <Input
          type="text"
          label="Nome"
          placeholder="Digite seu nome"
          {...register("name", {required: true, minLength: 7})}
        />

        <Input
          type="email"
          label="E-mail"
          placeholder="Digite seu E-mail"
          {...register("email", {required: true})}
        />

        <Input
          type="password"
          label="Senha"
          placeholder="Insira uma senha"
          {...register("password", {required: true, minLength: 7})}
        />

        <Input
          type="password"
          label="Confirme a senha"
          placeholder="Digite a senha novamente"
          {...register("confirmPassword", {required: true, minLength: 7})}
        />

        <Button
         onClick={() => handleSubmit(onSubmit)()}
        >
          Concluir
        </Button>

        <span
         className="text-dark-text font-medium my-2"
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
            Já tem uma conta? <Link className="text-dark-text font-medium" href={"/sign-in"}>Clique aqui</Link>
          </p>
        </div>

      </div>
    </div>
  )
}