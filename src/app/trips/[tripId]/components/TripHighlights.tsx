import { CheckCircle2 } from "lucide-react";

interface TripHighlightsProps {
  highlights: string[];
}

export function TripHighlights({highlights}: TripHighlightsProps) {
  return (
    <div className="flex flex-col px-5" >
      <h1 className="font-semibold text-base text-primaryDarker" >Destaques</h1>
    
      <div className="grid grid-cols-2 gap-2 mt-[10px]" >
        {highlights.map((highlight, index) => (
          <div className="flex text-xs items-center text-grayPrimary gap-1" key={index} >
            <CheckCircle2 size={15} color="#590BD8" /> {highlight}
          </div>
        ))}
      </div>
    </div>
  )
}