"use client"

import { Prisma } from "@prisma/client"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { UserReservationItem } from "./components/UserReservationItem"
import Button from "@/components/Button"
import Link from "next/link"


export default function MyTripsPage() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: {trip: true}
    }>[]
  >([])

  const session = useSession()
  const router = useRouter()
  
  const fetchTrips = async () => {
    const response = await axios.get(`/api/users/${session.data?.user.id}/reservations`)

    setReservations(response.data)
  }

  useEffect(() => {
    if(session.status === 'unauthenticated') {
      
      router.push('/')
    
      toast.error('Você precisa fazer login!', {position: 'top-center'})
    }

    fetchTrips()
  }, [session])

  return (
    <div className="container mx-auto p-5" >
      <h1 className="text-primaryDarker font-semibold text-xl" >Minhas viagens</h1>
      
      {reservations.length > 0 ?
        (
          reservations.map((reservation) => (
            <UserReservationItem key={reservation.id} tripReservation={reservation} fetchTrips={fetchTrips}/>
          ))
        ) : (
          <>
            <h3 className="mt-5" >Você ainda não tem nenhuma reserva! :/ </h3>
            <div className="flex justify-end">
              <Link href='/' >
                <Button className="mt-5" >  Faça uma reserva! </Button>
              </Link>
            </div>
          </>
        )}

      
    </div>
  )
}