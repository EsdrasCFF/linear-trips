"use client"

import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker"
import Input from "@/components/Input"


export function TripSearch() {

  function handleDate() {

  }
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-primaryDarker font-semibold text-xl text-center">
        Encontre sua próxima <span className="text-primary"> viagem!</span>
      </h1>

      <div className="flex flex-col mt-4 gap-4" >
        <Input placeholder="Onde você quer ir?"/>

        <div className="flex flex-row gap-4" >
          <DatePicker placeholderText="Data da ida?" onChange={() => handleDate} className="w-full"/>
          <CurrencyInput placeholder="Orçamento?" />
        </div>

      </div>

    </div>
  )
}