"use client"

import { MenuIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";


export function Header() {
  const { status, data } = useSession()
  
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  function handleSignInClick() {
    signIn()
  }
  
  function handleSignOutClick() {
    setMenuIsOpen(false)
    signOut()
  }

  function handleMenuClick() {
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <div className="container mx-auto px-5 h-[93px] flex justify-between items-center" >
      <div className="relative h-[32px] w-[182px]" >
        <Image src="/logo.png" alt="Linear Trips" fill/>
      </div>
      
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
              <button 
                className="z-50 absolute top-14 left-0 right-0 w-full h-full bg-white shadow-md text-sm text-primary rounded-md" 
                onClick={handleSignOutClick}
              >
                Logout
              </button>
            )}
          </div>
        </button>
      )}  
    </div>
  )
}