"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {

  const { data } = useSession()

  const isActiveSession = data?.user;
  console.log(data?.user?.image)
  return (
    <main className="flex flex-col justify-center items-center gap-3" >
      HOME PAGE

      <div className="flex flex-col" >
        
        {
          isActiveSession ?
          (
            <button onClick={() => signOut()} >Logout</button>
          ):(
            <button onClick={() => signIn()} >Login</button>
          )
        }
      </div>

      <Image src={data?.user?.image ?? ""} alt="" width={50} height={50}/>
    </main>
  )
}
