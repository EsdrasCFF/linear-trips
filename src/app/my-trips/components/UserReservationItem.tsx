import Button from "@/components/Button"
import { priceFormatter } from "@/utils/formatter"
import { Prisma } from "@prisma/client"
import { format } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR'
import Image from "next/image"
import ReactCountryFlag from "react-country-flag"

interface UserReservationItemProps {
  tripReservation: Prisma.TripReservationGetPayload<{
    include: {trip: true}
  }>
}

export function UserReservationItem({tripReservation}: UserReservationItemProps) {
  
  const {trip} = tripReservation

  const tripStartDate = format(tripReservation.startDate, 'dd-MMM', {locale: ptBR})
  const tripEndDate = format(tripReservation.endDate, 'dd-MMM', {locale: ptBR})
  const tripGuests = tripReservation.guests
  
  return (
    <div className="flex flex-col gap-5 p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg" >
      {/* {IMAGEM} */}
      <div className="flex items-center gap-5">
        <div className="relative h-[106px] w-[124px]" >
          <Image src={trip.coverImage} alt={trip.name} fill style={{objectFit: 'cover'}} className="rounded-xl shadow-md" />
        </div>

        <div className="my-auto">
          <h2 className="text-base font-semibold text-primaryDarker" >{trip.name}</h2>
          <p className="text-grayPrimary text-xs font-medium underline" > <ReactCountryFlag countryCode={trip.countryCode} svg/> {trip.location}</p>
        </div>
      </div>

      {/* {SEPARATOR} */}
      <div className="border border-gray-200 border-separate" ></div>

      <h2 className="text-primaryDarker font-semibold" >Sobre a viagem</h2>

      {/* { SOBRE A VIAGEM } */}
      <div className="flex flex-col text-sm text-primaryDarker">
        <h3 className="mt-2 " >Data</h3>
        <p className="mt-1" >{`${tripStartDate} a ${tripEndDate}`}</p>
      
        <h3 className="mt-5">Hóspedes</h3>
        <p className="mt-1" >{tripGuests} Hóspedes</p>
      </div>

      {/* {SEPARATOR} */}
      <div className="border border-gray-200 border-separate" ></div>

      <h2 className="text-primaryDarker font-semibold" >Informações do pagamento</h2>

      {/* { PAGAMENTO } */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-primaryDarker" >Total</span>
        <span className="text-sm text-primaryDarker font-bold" >{ priceFormatter.format(Number(tripReservation.totalPaid))}</span>
      </div>

      {/* { BOTAO } */}
      <Button variant="outlined" className="text-red-700 font-bold border-red-700 hover:bg-red-700 hover:text-white " > Cancelar </Button>

    </div>
  )
}