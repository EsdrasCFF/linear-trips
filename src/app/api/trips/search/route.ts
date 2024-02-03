import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const text = searchParams.get('text') 
  const budget = searchParams.get('budget') 
  const startDate = searchParams.get('startDate')

  if(!text) {
    return new NextResponse(JSON.stringify({error: {code: 'TEXT_NOT_FOUND'}}), {status: 400})
  }


  if(text && startDate != 'undefined' && budget != 'undefined') {

    let price = Number(budget)
    console.log(text)
    console.log(price)

    const trips = await prisma.trip.findMany({
      where: {
        name: text,
        pricePerDay: {lte: price},
      },
    })

    console.log('Entrou aqui')
    console.log(trips)

    return new NextResponse(JSON.stringify({trips}), {status: 200})
  }

  const trips = await prisma.trip.findMany({
    where: {
      OR: [
        {name: {search: text}},
        {description: {search: text}},
        {location: {search: text}}
      ]
    }
  })

  return new NextResponse(JSON.stringify({trips}), {status: 200})
}