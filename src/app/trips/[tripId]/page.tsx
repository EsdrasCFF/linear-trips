import { prismaClient } from "@/lib/prisma";
import { TripHeader } from "./components/TripHeader";
import { TripReservation } from "./components/TripReservation";
import { TripDescription } from "./components/TripDescription";
import { TripHighlights } from "./components/TripHighlights";
import { TripLocation } from "./components/TripLocation";


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
      <TripReservation maxGuests={trip.maxGuests} tripStartDate={trip.startDate} tripEndDate={trip.endDate} />
      <TripDescription description={trip.description}/>
      <TripHighlights highlights={trip.highlights} />
      <TripLocation location={trip.location} locationDescription={trip.locationDescription} />
    </div>
  )
}