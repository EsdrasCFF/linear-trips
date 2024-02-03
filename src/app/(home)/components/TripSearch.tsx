"use client"

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker"
import Input from "@/components/Input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const TripReservationFormSchema = z.object({
  text: z.string().min(1),
  startDate: z.date().optional(),
  budget: z.string().optional(),
})

type TripReservationFormData = z.infer<typeof TripReservationFormSchema>

export function TripSearch() {

  const { register, handleSubmit, formState: {isSubmitting, errors}, control, watch, setError } = useForm<TripReservationFormData>({
    resolver: zodResolver(TripReservationFormSchema)
  })

  const router = useRouter()

  function handleSubmitForm(data: TripReservationFormData) {
    const { text, budget, startDate } = data
    
    const startDateString = String(startDate)

    router.push(`/trips/search?text=${text}&budget=${budget}&startDate=${startDateString}`)
    
  }

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="text-primaryDarker font-semibold text-xl text-center">
        Encontre sua próxima <span className="text-primary"> viagem!</span>
      </h1>

      <div className="flex flex-col mt-4 gap-4" >
        <Input 
          {...register('text',{required: true})} error={!!errors.text} errorMessage="Campo obrigatório! Informe o destino da sua viagem." 
          placeholder="Onde você quer ir?"
        />

        <div className="flex flex-row gap-4" >

          <Controller
            name="startDate"
            control={control}
            render={({field}) => (
              <DatePicker dateFormat='dd/MM/yyyy' placeholderText="Data da ida?" onChange={field.onChange} selected={field.value} minDate={new Date()} className="w-full"/>
            )}
          />
          
          <Controller
            name="budget"
            control={control}
            render={({field}) => (
              <CurrencyInput allowDecimals placeholder="Orçamento?"  onBlur={field.onBlur} onChange={field.onChange} onValueChange={field.onChange}/>
            )}
          />
          
        </div>

        <Button onClick={handleSubmit(handleSubmitForm)} >Buscar</Button>
      </div>
    </div>
  )
}