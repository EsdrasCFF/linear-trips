import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ReservationBodyProps {
  startDate: string;
  endDate: string;
  tripId: string;
}


export async function POST(request: Request) {
  const body: ReservationBodyProps = await request.json()

  const reservation = await prismaClient.tripReservation.findMany({
    where: {
      tripId: body.tripId,
      startDate: {
        lte: new Date(body.endDate)
      },
      endDate: {
        gte: new Date(body.startDate)
      },
    },
  });

  if(reservation.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'TRIP_ALREADY_REVERVED'
        },
      })
    );
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
    })
  )
}