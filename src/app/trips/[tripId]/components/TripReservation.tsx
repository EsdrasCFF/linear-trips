"use client"

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { FormError } from "@/components/FormError";
import { priceFormatter } from "@/utils/formatter";
import { differenceInDays } from "date-fns";
import { api } from "@/lib/axios";


interface TripReservationProps {
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
  tripId: string;
}

const TripReservationSchema = z.object({
  guests: z.number().min(1, {message: 'Informe pelo menos 1 hóspede!'}).max(5, 'Informe no máximo 5 hóspedes'),
  startDate: z.union([z.date(), z.null()]),
  endDate: z.union([z.date(), z.null()])
})

type TripReservationFormData = z.infer<typeof TripReservationSchema>

export function TripReservation({tripId, maxGuests,tripStartDate, tripEndDate, pricePerDay}:TripReservationProps) {

  const {register, handleSubmit, formState: {isSubmitting, errors}, control, watch, setError} = useForm<TripReservationFormData>({
    resolver: zodResolver(TripReservationSchema),
  });
  
  const selectedStartDate = watch('startDate')
  const selectedEndDate = watch('endDate')

  const totalDays = selectedEndDate && selectedStartDate ? differenceInDays(selectedEndDate, selectedStartDate) : 0

  async function handleFormSubmit(data: TripReservationFormData) {
    
    const response = await api.post('/trips/check', {
      startDate: data.startDate,
      endDate: data.endDate,
      tripId: tripId,
    })

    console.log(response.data.error.code)

    if(response.data.error.code == 'TRIP_ALREADY_RESERVED') {
      setError('startDate', {
        type: 'manual',
        message: 'Esta da já está reservada.'
      })
    }

    if(response.data.error.code == 'TRIP_ALREADY_RESERVED') {
      setError('endDate', {
        type: 'manual',
        message: 'Esta da já está reservada.'
      })
    }

    if(response.data.error.code == 'INVALID_START_DATE') {
      setError('startDate', {
        type: 'manual',
        message: 'Data inválida.'
      })
    }

    if(response.data.error.code == 'INVALID_START_DATE') {
      setError('endDate', {
        type: 'manual',
        message: 'Data inválida.'
      })
    }
  }


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
              minDate={tripStartDate}
              dateFormat='dd/MM/yyyy'
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
              maxDate={tripEndDate}
              minDate={selectedStartDate}
              dateFormat='dd/MM/yyyy'
            />
          )}
        />
        
      </div>

      <div>
        <Input {...register('guests', {valueAsNumber: true})} 
          type="number" placeholder={`Número de hospedes (max: ${maxGuests})`} className="mt-[10px]"
        />
        
        {errors.guests?.type == 'invalid_type' ? (
          <FormError message='Hóspedes são obrigatórios. Informe a quantidade' />
        ): (
          <FormError message={errors.guests?.message!} />
        )}
      </div>
    
      <div className="flex justify-between mt-[10px]" >
        <p className="text-primaryDarker font-medium" >Total ({`${totalDays} noites`})</p>
        <p className="text-primaryDarker font-medium" > 
          {(selectedStartDate && selectedEndDate) ? priceFormatter.format(pricePerDay * totalDays) : 'R$ 0,00'} 
        </p>
      </div>

      <Button className="mt-[10px]" onClick={handleSubmit(handleFormSubmit)} disabled={isSubmitting} >Reservar Agora</Button>

      <div className="my-10 border text-grayLighter" ></div>

    </div>
  )
}