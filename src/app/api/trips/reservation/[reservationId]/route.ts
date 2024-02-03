import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteApiURLProps {
  params: {
    reservationId: string
  }
}

export async function DELETE(request: Request, {params}: RouteApiURLProps) {
  const {reservationId} = params

  if(!reservationId) {
    return new NextResponse(JSON.stringify({
      code: {
        error: 'RESERVATION_ID_NOT_FOUND'
      }
    }))
  }

  const reservationDeleted = await prisma.tripReservation.delete({
    where: {
      id: reservationId
    }
  })

  if(!reservationDeleted) {
    return new NextResponse(JSON.stringify({
      code: {
        error: 'RESERVATION_NOT_FOUND'
      }
    }))
  }

  return new NextResponse(JSON.stringify(reservationDeleted), {status: 200})
}