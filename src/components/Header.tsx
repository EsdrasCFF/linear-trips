"use client"

import { MenuIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export function Header() {
  const { status, data } = useSession()
  
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  function handleSignInClick() {
    signIn()
  }
  
  function handleLogoutClick() {
    setMenuIsOpen(false)
    signOut()
  }

  function handleMenuClick() {
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <div className="container mx-auto px-5 h-[93px] flex justify-between items-center" >
      <Link href='/'>
        <div className="relative h-[32px] w-[182px]" >
          <Image src="/logo.png" alt="Linear Trips" fill/>
        </div>
      </Link>
      
      {status === "unauthenticated" && (
        <button className="text-primary text-sm font-semibold" onClick={handleSignInClick}>
          Login
        </button>
      )}

      {status === "authenticated" && data.user && (
        <button className="flex items-center" onClick={handleMenuClick}>
          <div className=" flex items-center gap-3 border-grayLighter border-[2px] border-solid p-2 px-3 rounded-full relative" >
            <MenuIcon size={16} />
            
            <Image width={35} height={35} alt={data.user?.name!} src={data.user.image!} className="rounded-full shadow-sm" />
          
            {menuIsOpen && (
              <div className="z-50 absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
              <Link href="/my-trips">
                <button className="text-primary pb-2 border-b border-grayLighter border-solid text-sm font-semibold">Minhas Viagens</button>
              </Link>

              <button className="text-primary pt-2 text-sm font-semibold" onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
            )}
          </div>
        </button>
      )}  
    </div>
  )
}