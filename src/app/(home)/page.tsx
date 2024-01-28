"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { TripSearch } from "./components/TripSearch";
import { QuickSearch } from "./components/QuickSearch";

export default function Home() {

  
  return (
    <main>
     <TripSearch/>
     <QuickSearch/>
    </main>
  )
}
