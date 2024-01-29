"use client"
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";

interface TripReservationProps {
  trip: Trip;
}

export function TripReservation({trip}:TripReservationProps) {
  return (
    
    <div className="flex flex-col px-5" >
      <div className="flex gap-3" >
        <DatePicker placeholderText="Data de Início" onChange={() => {}} className="w-full" />
        <DatePicker placeholderText="Data Final" onChange={() => {}} className="w-full" />
      </div>

      <Input placeholder={`Número de hospedes (max: ${trip.maxGuests})`} className="mt-[10px]"/>
    
      <div className="flex justify-between mt-[10px]" >
        <p className="text-primaryDarker font-medium" >Total (7 noites)</p>
        <p className="text-primaryDarker font-medium" >R$ 2.160 </p>
      </div>

      <Button className="mt-[10px]" >Reservar Agora</Button>
    </div>
  )
}