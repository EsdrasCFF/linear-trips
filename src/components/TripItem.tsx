import { priceFormatter } from "@/utils/formatter"
import { Trip } from "@prisma/client"
import Image from "next/image"
import ReactCountryFlag from "react-country-flag"

interface TripItemProps {
  trip: Trip
}

export function TripItem({trip}: TripItemProps) {
  return (
    <div className="flex flex-col" >

      <div className="relative w-[280px] h-[280px]">
        <Image 
          src={trip.coverImage} alt={trip.name} fill
          className="rounded-2xl shadow-md absolute"
          style={{
            objectFit: 'cover'
          }}
        />
      </div>

      <h3 className="text-primaryDarker font-medium text-sm mt-[10px]">{trip.name}</h3>
      
      <div className="flex items-center gap-1 mt-[3px]">
        <ReactCountryFlag countryCode={trip.countryCode} svg/>
        <p className="text-xs text-grayLighter" >{trip.location}</p>
      </div>

      <p className="text-xs text-grayLighter mt-[3px]" >
        <span className="text-primary font-semibold" >{priceFormatter.format(Number(trip.pricePerDay))}</span> por noite
      </p>
    </div>
  )
}