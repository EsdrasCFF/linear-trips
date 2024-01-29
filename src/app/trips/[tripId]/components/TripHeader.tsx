import { priceFormatter } from "@/utils/formatter";
import { Trip } from "@prisma/client";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

interface TripHeaderProps {
  trip: Trip
}

export function TripHeader({trip}: TripHeaderProps) {
  return (
    <div className="flex flex-col" >
      <div className="relative h-[250px] w-full" >
        <Image src={trip.coverImage} alt={trip.name} fill className="absolute" style={{objectFit: 'cover'}}/>
      </div>

      {/* TITULO E INFORMACOES */}
      <div className="flex flex-col p-5">
        <h1 className="font-semibold text-primaryDarker text-xl" >{trip.name}</h1>
      
        <div className="flex items-center gap-1 mt-[3px]">
          <ReactCountryFlag countryCode={trip.countryCode} svg/>
          <p className="text-xs font-medium text-grayLighter underline" >{trip.location}</p>
        </div>

        <p className="text-xs text-grayLighter mt-[3px]" >
          <span className="text-primary font-semibold" >{priceFormatter.format(Number(trip.pricePerDay))}</span> por noite
        </p>
      </div>
    </div>
  )
}