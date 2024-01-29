import { prismaClient } from "@/lib/prisma";
import { TripHeader } from "./components/TripHeader";
import { TripReservation } from "./components/TripReservation";
import { TripDescription } from "./components/TripDescription";


interface TripDetailsPageProps {
  params: {
    tripId: string;
  }
}

function getTripsDetails(tripId: string) {
  const trip = prismaClient.trip.findUnique({
    where: {
      id: tripId
    }
  })

  return trip
}

export default async function TripDeatailsPage({params}: TripDetailsPageProps) {
  const trip = await getTripsDetails(params.tripId)
  
  if(!trip) return null

  return (
    <div className="container mx-auto" >
      <TripHeader trip={trip} />
      <TripReservation trip={trip} />
      <TripDescription description={trip.description}/>
    </div>
  )
}