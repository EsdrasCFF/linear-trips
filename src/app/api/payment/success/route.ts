import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')!

  if(!signature) {
    return new NextResponse(JSON.stringify({
      error: {
        code: 'STRIPE_SIGNATURE_NOT_FOUND'
      }
    }));
  }

  const text = await request.text()

  const event = stripe.webhooks.constructEvent(text, signature, process.env.SRIPE_WEBHOOK_SECRET_KEY!)

  let paymentUpdate;
  
  let session = event.data.object as any
  
  console.log('METADATA_CHECKOUT:', session.metadata)

  if(event.type === 'checkout.session.completed') {
    
    const tripReservationId = session.metadata.reservationTripId as string

    paymentUpdate = await prisma.tripReservation.update({
      where: {
        id: tripReservationId
      },
      data: {
        paymentStatus: 'PAYMENT_CONFIRMED'
      }
    })
  }


  if(!paymentUpdate) {
    return new NextResponse(JSON.stringify({error: {code: 'FAILED_PAYMENT_TRIP'}}))
  }

  return new NextResponse(JSON.stringify({received: true}), {status: 200})
}