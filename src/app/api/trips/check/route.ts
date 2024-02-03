import { prisma } from "@/lib/prisma";
import { differenceInDays, isBefore } from "date-fns";
import { NextResponse } from "next/server";

interface ReservationBodyProps {
  startDate: string;
  endDate: string;
  tripId: string;
}


export async function POST(request: Request) {
  const body: ReservationBodyProps = await request.json()

  const trip = await prisma.trip.findUnique({
    where: {
      id: body.tripId
    }
  })

  if(!trip) {
    return new NextResponse(JSON.stringify({
      error: {
        code: 'TRIP_NOT_FOUND'
      }
    }))
  }

  if(isBefore(new Date(body.startDate), new Date(trip.startDate))) {
    return new NextResponse(JSON.stringify({
      error: {
        code: 'INVALID_START_DATE'
      }
    }))
  }

  const reservation = await prisma.tripReservation.findMany({
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
          code: 'TRIP_ALREADY_RESERVED'
        },
      })
    );
  }

  const totalPrice = Number(differenceInDays(new Date(body.endDate), new Date(body.startDate)) * Number(trip.pricePerDay))

  return new NextResponse(
    JSON.stringify({
      success: true,
      trip,
      totalPrice,
    })
  )
}