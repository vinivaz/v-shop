import Link from "next/link";
import Image from "next/image";

export function Header() {
  return(
    <nav className="w-full h-[45px] fixed top-0 z-2  flex shrink-0 justify-center items-center bg-white">
      <div className="max-w-[1120px] w-full flex justify-between">
        <Link 
          href='/'
          className="font-bold ml-10"
        >
          V-shop
        </Link>
        <div 
          className="flex flex-row mr-10"
        >
          <Link
            href='/search'
            className="mx-1"
          >
            <Image 
              src="/icons/search-icon.svg" 
              alt="magnifying glass icon"
              width={30}
              height={30}
            />
          </Link>
          <Link
            href='/wishlist'
            className="mx-1"
          >
            <Image 
              src="/icons/stroke-heart.svg" 
              alt="magnifying glass icon"
              width={30}
              height={30}
            />
          </Link>
          <Link
            href='/cart'
            className="mx-1"
          >
            <Image 
              src="/icons/bag-icon.svg" 
              alt="magnifying glass icon"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}