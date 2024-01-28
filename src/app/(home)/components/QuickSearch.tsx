import Image from "next/image"

export function QuickSearch() {
  return (
    <div className="container mx-auto" >
      <div className="flex items-center" >
        <div className="w-full h-[1px] bg-grayLighter" />
        <h2 className="text-grayPrimary whitespace-nowrap px-3 text-base font-medium" >Tente pesquisar por</h2>
        <div className="w-full h-[1px] bg-grayLighter" />
      </div>

      <div className="flex w-full justify-between mt-5 px-5" >
        <div className="flex flex-col items-center gap-1" >
          <Image width={30} height={30} alt="Chalé" src="/cottage-icon.png" />

          <p className="text-sm text-grayPrimary" >Chalé</p>
        </div>
        
        <div className="flex flex-col items-center gap-1" >
          <Image width={30} height={30} alt="Fazenda" src="/farm-icon.png" />

          <p className="text-sm text-grayPrimary" >Fazenda</p>
        </div>
        
        <div className="flex flex-col items-center gap-1" >
          <Image width={30} height={30} alt="Hotel" src="/hotel-icon.png" />

          <p className="text-sm text-grayPrimary" >Hotel</p>
        </div>
        
        <div className="flex flex-col items-center gap-1" >
          <Image width={30} height={30} alt="Hotel" src="/inn-icon.png" />

          <p className="text-sm text-grayPrimary" >Pousada</p>
        </div>
      </div>
    </div>
  )
}