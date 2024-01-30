import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-walterWhite h-[86px] flex flex-col items-center justify-center" >
      <Image src="/logo.png" alt="Lienar Stack Week" width={133} height={23} />

      <p className="mt-1 text-primaryDarker font-medium text-xs" >Todos os direitos reservados</p>
    </footer>
  )
}