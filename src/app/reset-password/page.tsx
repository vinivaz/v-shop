"use client"

// Components
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/Components/Modal";
// Hooks
import { useForm } from "react-hook-form";

import { useWarningMessageStore } from "../../../store/warningMessageStore";

import { emailFormSchema, resetPasswordFormSchema, EmailFormData, ResetPasswordFormData } from "@/validators/reset-password-form-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmailMessageWithToken, resetPassword } from "@/lib/api/auth";

export default function ResetPassword(){

  const emailInitialFormValue = {
    email: '',
  }

  const resetPasswordInitialFormValue = {
    token: '',
    newPassword: '',
    confirmPassword: ''
  }

  const { 
    register: emailRegister,
    handleSubmit: handleEmailSubmit,
    reset: emailFormReset,
    formState: {
      errors: emailErrors,
      isSubmitting: isEmailSubmitting
    },
    watch: watchEmail,
  } = useForm<EmailFormData>({
    defaultValues: emailInitialFormValue,
    resolver: zodResolver(emailFormSchema)
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
    resolver: zodResolver(resetPasswordFormSchema)
  })

  const show = useWarningMessageStore((state) => state.show)

  const email = watchEmail("email")

  const onEmailSubmit = async(data: EmailFormData) => {
    if(isEmailSubmitting)return;

    try{

      const {message, error} = await sendEmailMessageWithToken(data);

      if (error) {
        console.log(error);
        show("Houve um erro", error);
        return;
      }

      show("Código enviado", message!)

    }catch(error){
      console.log(error);
      show("Houve um erro", "infelizmente houve uma falha no envio do e-mail, tente novamente");
    }
  }



  const onResetPasswordSubmit = async(data: ResetPasswordFormData) => {
    if(isResetPasswordSubmitting)return;

    if(!email){
      show("Houve um erro.", "Por favor insira o seu e-mail.");
      return;
    }

    try{
      const {message, error} = await resetPassword({token:data.token, email, newPassword: data.newPassword})

      // console.log(resetPassowordAttepmt)
      if(error){
        show("Houve um erro", error)
        return;
      }

      if(message){
        emailFormReset(emailInitialFormValue)
        resetPasswordFormReset(resetPasswordInitialFormValue)
        show("Deu certo!", message)
      }

    }catch(err){
      console.log(err)
      show("Houve um erro.","Erro ao tentar redefinir a senha, por favor tente novamente.")
    }
  }


  return(
    <div
     className="flex flex-auto flex-col justify-center items-center min-md:h-[90vh] max-md:max-h-[800px] min-md:max-h-[692px] my-5 max-md:py-5 bg-white overflow-hidden rounded-3xl w-full max-w-[400px]"
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
        className="flex flex-col items-center w-full z-1 mt-3 px-9 max-[400px]:px-4 pb-3"
      >
        <div
         className="mb-2"
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
          className="flex flex-row w-full gap-2"
        >
          <Input
            type="email"
            label="E-mail"
            placeholder="Digite seu E-mail"
            
            error={emailErrors.email?.message || ""}
            {...emailRegister("email", {required: true})}
            containerClass="mb-0"
          />

          <Button
            customStyle="max-w-[58px] h-[40px] text-sm mt-7"
            onClick={() => handleEmailSubmit(onEmailSubmit)()}
          >
            Enviar
          </Button>
        </div>

        {!email || email.length > 0 &&(
          <div
            className="w-full mt-3 pt-3 border-t-1 border-t-secondary-border"
          >
            <Input
              type="text"
              label="Insira o código"
              placeholder="Digite o código recebido de seu e-mail"
              error={resetPasswordErrors.token?.message || ""}
              {...resetPasswordRegister("token", {required: true})}
            />

            <Input
              type="password"
              label="Nova senha"
              placeholder="Digite a nova senha"
              error={resetPasswordErrors.newPassword?.message || ""}
              {...resetPasswordRegister("newPassword", {required: true, minLength: 6})}
            />

            <Input
              type="password"
              label="Confirme a senha"
              placeholder="Digite a nova senha novamente"
              error={resetPasswordErrors.confirmPassword?.message || ""}
              {...resetPasswordRegister("confirmPassword", {required: true, minLength: 6})}
            />

            <Button
              onClick={() => handleResetPasswordSubmit(onResetPasswordSubmit)()}
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
    </div>
  )
}