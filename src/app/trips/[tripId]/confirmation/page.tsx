"use client"

import { api } from "@/lib/axios";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { priceFormatter } from "@/utils/formatter";
import Button from "@/components/Button";
import ptBR from 'date-fns/locale/pt-BR'
import { format } from "date-fns";

interface TripConfirmationPageProps {
  params: {
    tripId: string;
  }
}

export default function TripConfirmationPage({params}: TripConfirmationPageProps) {
  const [trip, setTrip] = useState<Trip | null>()
  const [totalPrice, setTotalPrice] = useState<number | null>()
  
  const searchParams = useSearchParams()

  const startDateString = searchParams.get('startDate')
  const endDateString = searchParams.get('endDate')
  const guestsString = searchParams.get('guests')
  
  const tripStartDate = startDateString && format(new Date(startDateString), 'dd-MMM', {locale: ptBR})
  const tripEndDate = endDateString && format(new Date(endDateString), 'dd-MMM', {locale: ptBR})
  const tripGuests = guestsString && guestsString
  
  useEffect(() => {
    const fetchTrip = async () => {
      const response = await api.post('/trips/check', {
        startDate: searchParams.get('startDate'),
        endDate: searchParams.get('endDate'),
        tripId: params.tripId
      })
      
      
      setTrip(response.data.trip)
      setTotalPrice(Number(response.data.totalPrice))    
    }
    
    fetchTrip()
  },[])
  
  if(!trip) return null
  
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-semibold text-primaryDarker" >Sua viagem</h1>

      <div className="flex flex-col gap-5 p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg" >
        <div className="flex items-center gap-5">
          <div className="relative h-[106px] w-[124px]" >
            <Image src={trip.coverImage} alt={trip?.name} fill style={{objectFit: 'cover'}} className="rounded-xl shadow-md" />
          </div>

          <div className="my-auto">
            <h2 className="text-base font-semibold text-primaryDarker" >{trip.name}</h2>
            <p className="text-grayPrimary text-xs font-medium underline" > <ReactCountryFlag countryCode={trip.countryCode} svg/> {trip.location}</p>
          </div>
        </div>

        <div className="border border-grayLighter w-full" ></div>

        <h3 className="font-semibold text-primaryDarker text-sm" >Informações do preço</h3>

        <div className="flex justify-between items-center">
          <span className="text-sm text-primaryDarker" >Total</span>
          <span className="text-sm text-primaryDarker font-semibold" >{totalPrice ? priceFormatter.format(totalPrice) : 'R$ 0,00'}</span>
        </div>
      </div>

      <div className="flex flex-col text-sm text-primaryDarker">
        <h3 className="mt-5" >Data</h3>
        <p className="mt-1" >{`${tripStartDate} a ${tripEndDate}`}</p>
      
        <h3 className="mt-5">Hóspedes</h3>
        <p className="mt-1" >{tripGuests} Hóspedes</p>
      </div>

      <Button></Button>
    </div>
  )
}