"use client";

// Types and Interfaces
import { Session } from "next-auth";

// Next Auth
import { signOut } from "next-auth/react";

// Hooks
import { useState, useRef, useEffect } from "react";

// Components
import Image from "next/image";
import Link from "next/link";


type Props = {
  session: Session | null;
  isDev: boolean;
};

export function UserPopOver({session, isDev}: Props){
  const [open, setOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {!session?
          (
            <div
              className="max-md:hidden flex"
            >
              <Link
                href="/sign-in"
                className="mx-2 flex items-center font-medium"
                onClick={() => setOpen(false)}
              >
                Entrar
              </Link>
              <Link
                href="/sign-up"
                className=" flex items-center font-medium bg-darker text-white mx-2 px-3 rounded-xl"
                onClick={() => setOpen(false)}
              >
                Cadastrar
              </Link>
            </div>
          )
          :
          (
            <div
              className="relative flex items-center"
              ref={popoverRef}
            >
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="mx-2 flex items-center max-md:flex-col"
                >
                  <Image 
                    src="/icons/user-icon.svg" 
                    alt="user glass icon"
                    width={20}
                    height={20}
                  />
                  <span
                    className="ml-1 text-sm text-darker"
                  >
                    Usuário
                  </span>
                </div>
                {open && (
                  <div className="absolute right-0 bottom-14 min-md:top-8 min-md:bottom-auto mt-2 w-40 bg-white shadow-lg rounded-lg z-50 p-2">
                    {/* <Link
                      href="/profile"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Ver perfil
                    </Link> */}
                    <Link
                      href="/users/orders"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      onClick={() => setOpen(false)}
                    >
                      Minhas Compras
                    </Link>
                    { isDev && (
                      <Link
                        href="/dev-zone"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        onClick={() => setOpen(false)}
                      >
                        Dev Zone
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setOpen(false)
                        signOut()
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Sair
                    </button>
                  </div>
                )}
            </div>
          )
        }

        {!session &&
          (
            <div
              className="relative flex md:hidden items-center"
              ref={popoverRef}
            >
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="mx-2 flex items-center max-md:flex-col"
                >
                  <Image 
                    src="/icons/user-icon.svg" 
                    alt="user glass icon"
                    width={20}
                    height={20}
                  />
                  <span
                    className="ml-1 text-sm text-darker"
                  >
                    Usuário
                  </span>
                </div>
                {open && (
                  <div className="absolute right-0 -top-28 min-md:top-8 mt-2 w-40 bg-white shadow-lg rounded-lg z-50 p-2">
                    <Link
                      href="/sign-in"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      onClick={() => setOpen(false)}
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      onClick={() => setOpen(false)}
                    >
                      Cadastrar
                    </Link>
                  </div>
                )}
            </div>
          ) }
    </>
  )
}