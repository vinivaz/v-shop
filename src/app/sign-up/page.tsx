"use client"

// Components
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";
import Image from "next/image";

export default function SignIn(){
  return(
    <div
     className="flex flew-row items-center  my-5 bg-white overflow-hidden h-auto rounded-3xl w-full max-w-[805px] max-md:flex-col  max-md:max-w-[452px]"
    >
      {/* sign in illustration */}
      <div
        className="relative min-md:h-[520px] min-md:flex items-center w-1/2 bg-darker max-md:w-full max-md:bg-transparent"
      >
        <Image
          className="min-md:hidden absolute w-full h-auto object-cover z-0"
          src="/illustrations/sign-in-sign-up-mobile-background.svg"
          width={398}
          height={274}
          alt="dark background"
        />
        <div
         className="flex flex-col items-center w-full max-md:h-full"
        >
          <Image
            className="w-[43%] h-auto object-contain z-1"
            src="/illustrations/sign-in-illustration.png"
            width={224.98}
            height={269.07}
            quality={100}
            alt="dark background"
          />
          <h1
           className="text-white text-left w-full font-bold text-2xl pl-15 mt-5 z-1 min-md:hidden"
          >
            Cadastrar
          </h1>
        </div>
      </div>
      <div
        className="flex flex-col items-center w-1/2  max-md:w-full z-1 mt-9 px-9 pb-5"
      >
        <Input
          type="text"
          label="Nome"
          placeholder="Digite seu nome"
        />

        <Input
          type="email"
          label="E-mail"
          placeholder="Digite seu E-mail"
        />

        <Input
          type="password"
          label="Senha"
          placeholder="Insira uma senha"
        />

        <Input
          type="password"
          label="Confirme a senha"
          placeholder="Digite a senha novamente"
        />

        <Button>
          Concluir
        </Button>

        <span
         className="text-dark-text font-medium my-5"
        >
          ou
        </span>

        <Button
          variant="transparent"
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

      </div>
    </div>
  )
}