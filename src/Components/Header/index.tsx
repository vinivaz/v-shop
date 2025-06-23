import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";


export async function Header() {

  const session = await getServerSession(authOptions);

  return(
    <nav className=" z-9 w-full h-[var(--navbar-height)] fixed top-0 max-md:bottom-0 max-md:top-auto flex shrink-0 justify-center items-center bg-white">
      <div className="max-w-[1120px] w-full flex justify-between">
        <Link 
          href='/'
          className="font-bold ml-10 max-md:hidden"
        >
            <Image 
              src="/logo.svg" 
              alt="magnifying glass icon"
              width={64}
              height={29}
            />
        </Link>
        <div 
          className="flex flex-row mr-10 max-md:mr-0 max-md:w-full max-md:justify-evenly"
        >

          <Link
            href='/'
            className="mx-2 flex items-center max-md:flex-col min-md:hidden"
          >
            <Image 
              src="/icons/home-icon.svg" 
              alt="home icon"
              width={20}
              height={20}
            />
            <span
              className="ml-1 text-sm text-darker"
            >
              Home
            </span>
          </Link>
          <Link
            href='/search'
            className="mx-2 flex items-center max-md:flex-col"
          >
            <Image 
              src="/icons/search-icon.svg" 
              alt="magnifying glass icon"
              width={20}
              height={20}
            />
            <span
              className="ml-1 text-sm text-darker"
            >
              Search
            </span>
          </Link>
          <Link
            href='/wishlist'
            className="mx-2 flex items-center max-md:flex-col"
          >
            <Image 
              src="/icons/stroke-heart.svg" 
              alt="magnifying glass icon"
              width={20}
              height={20}
            />
            <span
              className="ml-1 text-sm text-darker"
            >
              Wishlist
            </span>
          </Link>
          <Link
            href='/cart'
            className="mx-2 flex items-center max-md:flex-col"
          >
            <Image 
              src="/icons/bag-icon.svg" 
              alt="magnifying glass icon"
              width={20}
              height={20}
            />
            <span
              className="ml-1 text-sm text-darker"
            >
              Cart
            </span>
          </Link>

          {!session?
          (
            <>
              <Link
                href="/sign-in"
                className="mx-2 flex items-center font-medium"
              >
                Entrar
              </Link>
              <Link
                href="/sign-up"
                className=" flex items-center font-medium bg-darker text-white mx-2 px-3 rounded-xl"
              >
                Cadastrar
              </Link>
            </>
          )
          :
          (
            <div
  
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
                User
              </span>
            </div>
          )
        }

        </div>
      </div>
    </nav>
  )
}