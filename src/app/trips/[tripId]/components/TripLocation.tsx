import Button from "@/components/Button";
import Image from "next/image";

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

export function TripLocation({location, locationDescription}: TripLocationProps) {
  return (
    <div className="flex flex-col p-5 mt-5" >
      <h1 className="font-semibold text-base text-primaryDarker" >Localização</h1>

      <div className="relative h-[280px] w-full mt-5" >
        <Image src="/map-mobile.png" alt={location} fill style={{objectFit: 'cover'}} />
      </div>

      <h2 className="text-sm font-semibold mt-5 text-primaryDarker" >{location}</h2>

      <p className="text-xs leading-5 mt-1" >{`${location},  ${locationDescription}`}</p>

      <Button variant="outlined" className="mt-5" > Ver no Google Maps </Button>
    </div>
  )
}