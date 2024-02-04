import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')!

  const text = await request.text()

  const event = stripe.webhooks.constructEvent(text, signature, process.env.SRIPE_WEBHOOK_SECRET_KEY!)

  let bookedTrip;

  if(event.type === 'checkout.session.completed') {
    
    const session = event.data.object as any

    bookedTrip = await prisma.tripReservation.create({
      data: {
        startDate: new Date(session.metadata.startDate),
        endDate: new Date(session.metadata.endDate),
        userId: session.metadata.userId,
        totalPaid: Number(session.metadata.totalPrice),
        guests: Number(session.metadata.guests),
        tripId: session.metadata.tripId
      }
    })
  }

  if(!bookedTrip) {
    return new NextResponse(JSON.stringify({error: {code: 'Failed reserved trip'}}))
  }

  return new NextResponse(JSON.stringify({received: true}), {status: 200})
}