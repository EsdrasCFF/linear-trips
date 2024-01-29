interface TripDescriptionProps {
  description: string;
}

export function TripDescription({description}: TripDescriptionProps) {
  return (
    <div className="flex flex-col px-5 mb-10" >
      <h1 className="font-semibold text-base text-primaryDarker" >Sobre a Viagem</h1>
    
      <p className="text-xs leading-5 mt-1 text-primaryDarker" >{description}</p>
    </div>
  )
}