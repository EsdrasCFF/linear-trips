import { TripItem } from "@/components/TripItem"
import { prismaClient } from "@/lib/prisma"

async function getTrips() {
  const trips = await prismaClient.trip.findMany();

  return trips
}

export async function RecommenderTrips() {
  const trips = await getTrips()
  
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center" >
        <div className="w-full h-[1px] bg-grayLighter" />
        <h2 className="text-grayPrimary whitespace-nowrap px-3 text-base font-medium" >Destinos Recomendados</h2>
        <div className="w-full h-[1px] bg-grayLighter" />
      </div>
      
      <div className="flex flex-col items-center mt-5 gap-5" >
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>

    </div>
  )
}