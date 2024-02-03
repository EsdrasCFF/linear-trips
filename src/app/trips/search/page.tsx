"use client"

import { TripItem } from "@/components/TripItem"
import { Trip } from "@prisma/client"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function SearchTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([])

  const searchParams = useSearchParams()

  const text = searchParams.get('text')
  const budget = searchParams.get('budget')
  const startDate = searchParams.get('startDate')
  
  useEffect(() => {
    const fetchSearchTrips = async ()=> {
      const response = await axios.get(`/api/trips/search?text=${text}&budget=${budget}&startDate=${startDate}`);
      
      setTrips(response.data)
    }

    fetchSearchTrips()

  }, [budget, startDate, text])

  return (
    <div className="container mx-auto p-5 flex flex-col items-center" >
      <h1 className="font-semibold text-xl text-primaryDarker" >Hospedagens Encontradas</h1>
      <p className="text-grayPrimary font-medium text-base mb-5">
        {trips.length > 0 ? 'Listamos os melhores locais para você!' : 'Nenhuma hospedagem encontrada :/'}
      </p>

      <div className="flex flex-col gap-5">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>

    </div>
  )
}
  
