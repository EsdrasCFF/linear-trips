"use client"

import { TripReservation } from "@prisma/client"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function MyTripsPage() {
  const [reservations, setReservations] = useState<TripReservation | null>()


  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session.status === 'unauthenticated') {
      
      router.push('/')
    
      toast.error('Você precisa fazer login!', {position: 'top-center'})
    }

    const fetchTrips = async () => {
      const response = await axios.get(`/api/users/${session.data?.user.id}/reservations`)

      console.log(response.data)

      setReservations(response.data.reservations)
    }

    fetchTrips()
  }, [session, router])

  return (
    <div>My Trips</div>
  )
}