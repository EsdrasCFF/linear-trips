import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ReservationBodyProps{
  startDate: string;
  endDate: string;
  userId: string;
  tripId: string;
  totalPaid: number;
  guests: number;
}


export async function POST(request:Request) {
  const body: ReservationBodyProps = await request.json()

  const { startDate,endDate, tripId, userId, totalPaid, guests } = body;

  const trip = await prismaClient.trip.findUnique({
    where: {
      id: tripId
    }
  })

  if(!trip) {
    return new NextResponse(JSON.stringify({
      error: {
        code: 'TRIP_NOT_FOUND'
      }
    }))
  }

  await prismaClient.tripReservation.create({
    data: {
      tripId,
      userId,
      startDate,
      endDate,
      totalPaid,
      guests
    }
  })

  return new NextResponse(JSON.stringify({
    success: true
  }),{status: 201})
}