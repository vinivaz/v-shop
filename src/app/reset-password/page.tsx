"use client"

// Components
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/Components/Modal";
// Hooks
import { useForm } from "react-hook-form";
import { useState } from "react";

import { signIn } from "next-auth/react";

// Types
type EmailFormData = {
  email: string;
}

type TokenFormData = {
  token: string;
}

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword(){

  const emailInitialFormValue = {
    email: '',
  }

  const tokenInitialFormValue = {
    token: '',
  }

  const resetPasswordInitialFormValue = {
    password: '',
    confirmPassword: ''
  }

  const [ emailSent, setEmailSent ] = useState(false)

  const [ changingPassword, setChangingPassword ] = useState(false)

  const { 
    register: emailRegister,
    handleSubmit: handleEmailSubmit,
    reset: emailFormReset,
    formState: {
      errors: emailErrors,
      isSubmitting: isEmailSubmitting
    } 
  } = useForm<EmailFormData>({
    defaultValues: emailInitialFormValue,
  })

  const { 
    register: tokenRegister,
    handleSubmit: handleTokenSubmit,
    reset: tokenFormReset,
    formState: {
      errors: tokenErrors,
      isSubmitting: isTokenSubmitting
    } 
  } = useForm<TokenFormData>({
    defaultValues: tokenInitialFormValue,
  })

  const { 
    register: resetPasswordRegister,
    handleSubmit: handleResetPasswordSubmit,
    reset: resetPasswordFormReset,
    formState: {
      errors: resetPasswordErrors,
      isSubmitting: isResetPasswordSubmitting
    } 
  } = useForm<ResetPasswordFormData>({
    defaultValues: resetPasswordInitialFormValue,
  })

  const onEmailSubmit = async(data: EmailFormData) => {
    console.log(data)
    // try{

    //   const res = await signIn("credentials", {
    //     email: data.email,
    //     password: data.password,
    //     redirect: false,
    //   });

    //   console.log(res)
      
    // if (res?.ok) {

    //   window.location.href = "/";
    // } else {
    //   if (res?.error === "CredentialsSignin") {
    //     console.log("E-mail ou senha inválidos.");
    //   } else {
    //     console.log("Erro ao entrar. Tente novamente.");
    //   }
    // }

    // }catch(error){
    //   console.log(error)
    // }
  }

  const onTokenSubmit = async(data: TokenFormData) => {
    console.log(data)
    // try{

    //   const res = await signIn("credentials", {
    //     email: data.email,
    //     password: data.password,
    //     redirect: false,
    //   });

    //   console.log(res)
      
    // if (res?.ok) {

    //   window.location.href = "/";
    // } else {
    //   if (res?.error === "CredentialsSignin") {
    //     console.log("E-mail ou senha inválidos.");
    //   } else {
    //     console.log("Erro ao entrar. Tente novamente.");
    //   }
    // }

    // }catch(error){
    //   console.log(error)
    // }
  }

  const onResetPasswordSubmit = async(data: ResetPasswordFormData) => {
    console.log(data)

  }


  return(
    <div
     className="flex flex-auto flex-col justify-center items-center min-md:h-[90vh] max-md:max-h-[800px] min-md:max-h-[692px] my-5 bg-white overflow-hidden rounded-3xl w-full max-w-[400px]"
    >
      {/* sign in illustration */}
      <Image
        src="/illustrations/forgot-password-illustration.svg"
        width={100}
        height={56}
        alt="e-mail illustration"
        quality={100}
      />
      
      <div
        className="flex flex-col items-center w-full z-1 mt-6 px-9 max-[400px]:px-4 pb-5"
      >
        <div
         className="mb-5"
        >
          <h2
           className="w-full text-left text-lg text-primary-text font-bold"
          >
            Esqueceu sua senha?
          </h2>
          <p
           className="w-full text-sm text-left text-primary-text leading-4.5"
          >
            Digite seu e-mail, enviaremos um código para redefinir sua senha.
          </p>
        </div>

        <div
          className="items-end flex flex-row w-full gap-2"
        >
          <Input
            type="email"
            label="E-mail"
            placeholder="Digite seu E-mail"
            {...emailRegister("email", {required: true})}
            containerClass="mb-0"
          />

          <Button
            customStyle="max-w-[58px] h-[40px] text-sm"
            onClick={() => handleEmailSubmit(onEmailSubmit)()}
          >
            Enviar
          </Button>
        </div>

        {!emailSent? (
          <div
            className="w-full flex items-start"
          >
            <Button 
              variant="transparent"
              customStyle="max-w-[150px] text-sm font-semibold pl-0 text-blue-600"
              onClick={() => setEmailSent(true)}
            >
              Já tenho o codigo.
            </Button>          
          </div>
        ):(
          <div
            className="w-full mt-9 pt-4 border-t-1 border-t-secondary-border"
          >
            <Input
              type="text"
              label="Insira o código"
              placeholder="Digite o código recebido de seu e-mail"
              {...tokenRegister("token", {required: true})}
            />
            <Button
              onClick={() => handleTokenSubmit(onTokenSubmit)()}
            >
              Concluir
            </Button>
          </div>
        )}

        <div
          className="w-full flex flex-row justify-evenly mt-7"
        >
          <Link className="text-dark-text font-medium" href={"/sign-in"}>Entrar</Link>
          <Link className="text-dark-text font-medium" href={"/sign-up"}>Cadastrar</Link>
        </div>
      </div>

      {changingPassword && (
        <Modal
          showing={changingPassword}
          setShowing={setChangingPassword}
          closeButton={false}
        >
          <div
           className="w-full flex flex-col items-center justify-center p-7 max-[400px]:px-2"
          >
            <div
              className="w-full flex  items-center justify-center"
            >
              <Image
                src="/illustrations/change-password-illustration.svg"
                width={92}
                height={92}
                alt="e-mail illustration"
                quality={100}
              />
            </div>

            <h2
            className="w-full text-left text-base text-primary-text font-bold my-8"
            >
              Redefinir sua senha
            </h2>

            <Input
              type="password"
              label="Nova senha"
              placeholder="Digite a nova senha"
              {...resetPasswordRegister("password", {required: true, minLength: 6})}
            />

            <Input
              type="password"
              label="Confirme a senha"
              placeholder="Digite a nova senha novamente"
              {...resetPasswordRegister("confirmPassword", {required: true, minLength: 6})}
            />

            <Button
              onClick={() => handleResetPasswordSubmit(onResetPasswordSubmit)()}
            >
              Concluir
            </Button>

            <div
              className="w-full flex flex-row justify-start mt-7"
            >
              <Button
                className="text-black font-medium"
                variant="transparent"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  )
}