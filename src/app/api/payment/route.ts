import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Stripe from 'stripe'
import { NextResponse } from "next/server";
import { createTripReservation } from "@/actions/create-reservation";

interface BodyParamsProps {
  tripId: string;
  totalPrice: string;
  name: string;
  coverImage: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  guests: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function POST(request: Request) {

  const userSession = await getServerSession(authOptions);

  const userId = userSession?.user.id as string

  const bodyParams: BodyParamsProps = await request.json()

  const {tripId, totalPrice, name, description, coverImage, startDate, endDate, guests} = bodyParams;

  const reservationTrip = await createTripReservation({tripId,userId,startDate, endDate, guests, totalPaid: Number(totalPrice)})


  console.log('RESERVATIONTRIP_ID:', reservationTrip.id)
  
  const session = await stripe.checkout.sessions.create({
    // @ts-ignore
    success_url: 'http://localhost:3000/my-trips',
    cancel_url: 'http://localhost:3000',
    metadata: {
      tripId,
      startDate,
      endDate,
      guests,
      userId: (userSession?.user.id as string),
      totalPrice,
      reservationTripId: reservationTrip.id,
    },
    line_items: [
      {
        price_data: {
          currency: 'brl',
          unit_amount: Number(totalPrice) * 100,
          product_data: {
            name,
            description,
            images: [coverImage],
          }
        },
        quantity: 1
      },
    ],
    mode: 'payment',
    payment_method_types: ['card']
  })

  console.log(session.metadata)

  return new NextResponse(JSON.stringify({session, reservationTrip}), {status: 200})
}