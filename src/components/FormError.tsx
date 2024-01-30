"use client"

interface FormErrorProps {
  message: string;
}

export function FormError({message}:FormErrorProps ) {
  return (
    <p className="text-red-700 text-xs mt-1" >{message}</p>
  )
}