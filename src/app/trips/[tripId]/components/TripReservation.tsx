"use client"

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { FormError } from "@/components/FormError";

interface TripReservationProps {
  trip: Trip;
}

const TripReservationSchema = z.object({
  guests: z.number().min(1, {message: 'Informe pelo menos 1 hóspede!'}).max(5, 'Informe no máximo 5 hóspedes'),
  startDate: z.union([z.date(), z.null()]),
  endDate: z.union([z.date(), z.null()])
})

type TripReservationFormData = z.infer<typeof TripReservationSchema>

export function TripReservation({trip}:TripReservationProps) {

  const {register, handleSubmit, formState: {isSubmitting, errors}, control} = useForm<TripReservationFormData>({
    resolver: zodResolver(TripReservationSchema),
  });
  
  function handleFormSubmit(data: TripReservationFormData) {
    console.log(data)
  }

  console.log(errors.endDate)

  return (
    
    <div className="flex flex-col px-5" >
      <div className="flex gap-3" >
        <Controller
          name="startDate"
          rules={{ required: {value: true, message: 'Data inicial é obritatória!'}}}
          control={control}
          render={({field}) => (
            <DatePicker 
              placeholderText="Data de Início" onChange={field.onChange} className="w-full" 
              error={!!errors.startDate}
              errorMessage={errors.startDate?.type == 'invalid_type' ? 'Campo obrigatório' : errors.startDate?.message}
              selected={field.value}
            />
          )}
        />

        <Controller
          name="endDate"
          rules={{ required: {value: true, message: 'Data inicial é obritatória!'}}}
          control={control}
          render={({field}) => (
            <DatePicker 
              placeholderText="Data Final" onChange={field.onChange} className="w-full" 
              error={!!errors.endDate}
              errorMessage={errors.endDate?.type == 'invalid_type' ? 'Campo obrigatório' : errors.startDate?.message}
              selected={field.value}
            />
          )}
        />
        
      </div>

      <div>
        <Input {...register('guests', {valueAsNumber: true})} 
          type="number" placeholder={`Número de hospedes (max: ${trip.maxGuests})`} className="mt-[10px]"
        />
        
        {errors.guests?.type == 'invalid_type' ? (
          <FormError message='Hóspedes são obrigatórios. Informe a quantidade' />
        ): (
          <FormError message={errors.guests?.message!} />
        )}
      </div>
    
      <div className="flex justify-between mt-[10px]" >
        <p className="text-primaryDarker font-medium" >Total (7 noites)</p>
        <p className="text-primaryDarker font-medium" >R$ 2.160 </p>
      </div>

      <Button className="mt-[10px]" onClick={handleSubmit(handleFormSubmit)} disabled={isSubmitting} >Reservar Agora</Button>

      <div className="my-10 border text-grayLighter" ></div>

    </div>
  )
}