"use server"

import { prisma } from "@/lib/prisma";

interface createTripReservationProps {
  tripId: string;
  userId: string;
  startDate: Date | string;
  endDate: Date | string;
  totalPaid: number;
  guests: number;
}

export async function createTripReservation({tripId, userId, startDate, endDate, totalPaid, guests}: createTripReservationProps) {
  
  const tripReservation = await prisma.tripReservation.create({
    data: {
      tripId,
      userId,
      startDate,
      endDate,
      totalPaid,
      guests,
      paymentStatus: 'WAITING_FOR_PAYMENT'
    }
  })

  return tripReservation;

}