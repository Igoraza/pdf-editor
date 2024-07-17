import Marquee from "react-fast-marquee";
import { IoSparklesSharp } from "react-icons/io5";


export default function BrandBanner() {
  return (
    <section className='w-full mb-6 h-16 p-2 bg-green-500 text-white flex items-center justify-between overflow-hidden'>
    <Marquee>
      {Array.from({length: 12}).map((_,index) => (
        <span key={index} className="mr-14 font-bold text-2xl flex items-center "><IoSparklesSharp/> <span>PDF TOOL</span></span>
      ))}
    </Marquee>
    </section>
  )
}