import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Stripe from 'stripe'
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function POST(request: Request) {

  const userSession = await getServerSession(authOptions)

  const bodyParams = await request.json()

  const {tripId, totalPrice, name, description, coverImage, startDate, endDate, guests} = bodyParams;

  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
    metadata: {
      tripId,
      startDate,
      endDate,
      guests,
      userUd: (userSession?.user.id as string),
      totalPrice
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

  return new NextResponse(JSON.stringify({session}), {status: 200})
}