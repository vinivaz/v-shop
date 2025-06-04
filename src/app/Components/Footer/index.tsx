import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return(
    <footer className="z-1 w-full h-[300px] flex shrink-0 justify-center items-center bg-darker">
      <div className="max-w-[1120px] w-full flex flex-col items-center">
        <span className="text-white w-full max-w-150 text-center">Nota: Este é um projeto demonstrativo de e-commerce, desenvolvido por Vinicius Vaz para fins de aprendizado e apresentação profissional. Todos os produtos, preços e informações exibidas são fictícios.</span>
        <div className="mt-10 text-stone-500">
          <Link
            href="/terms"
            className="px-5"
          >
            Termos de Serviços
          </Link>

          <Link
            href="/terms"
            className="px-5"
          >
            Política de Privacidade
          </Link>

          <Link
            href="/terms"
            className="px-5"
          >
            Política de Cookies
          </Link>

          <Link
            href="/about"
            className="px-5"
          >
            Sobre
          </Link>
        </div>
      </div>
    </footer>
  )
}