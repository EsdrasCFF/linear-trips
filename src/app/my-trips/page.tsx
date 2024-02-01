"use client"

import { Prisma } from "@prisma/client"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { UserReservationItem } from "./components/UserReservationItem"


export default function MyTripsPage() {
  const [reservations, setReservations] = useState<
  Prisma.TripReservationGetPayload<{
    include: {trip: true}
  }>[]
  >([])

  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session.status === 'unauthenticated') {
      
      router.push('/')
    
      toast.error('Você precisa fazer login!', {position: 'top-center'})
    }

    const fetchTrips = async () => {
      const response = await axios.get(`/api/users/${session.data?.user.id}/reservations`)

      setReservations(response.data)
    }

    fetchTrips()
  }, [session, router])

  return (
    <div className="container mx-auto p-5" >
      <h1 className="text-primaryDarker font-semibold text-xl" >Minhas viagens</h1>

      {reservations?.map((reservation) => (
        <UserReservationItem key={reservation.id} tripReservation={reservation}/>
      ))}
    </div>
  )
}