"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"


export default function SearchTripsPage() {
  
  const searchParams = useSearchParams()

  const text = searchParams.get('text')
  const budget = searchParams.get('budget')
  const startDate = searchParams.get('startDate')
  
  useEffect(() => {
    const fetchSearchTrips = async ()=> {
      const response = await axios.get(`/api/trips/search?text=${text}&budget=${budget}&startDate=${startDate}`);
      
      console.log(response.data)
    }

    fetchSearchTrips()

  }, [budget, startDate, text])

  return (
    <div className="container mx-auto p-5" >
      Trips
    </div>
  )
}
  
