import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteApiURLProps {
  params: {
    userId: string
  }
}

export async function GET(request: Request, {params}: RouteApiURLProps) {
  const {userId} = params

  if(!userId) {
    return new NextResponse(JSON.stringify({
      code: {
        error: 'USER_ID_NOT_FOUND'
      }
    }))
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId,
    },
    include: {
      trip: true
    }
  })

  return new NextResponse(JSON.stringify(reservations), {status: 200})
}