'use client'

import useParallax from "@/hooks/useParallax";
import Image from "next/image";

const EquipmentIntro = () => {
   const offset = useParallax(0.15);

  return (
    <section className="relative w-full flex flex-col items-center px-10 overflow-hidden">
      <h1 className="text-6xl font-light text-center max-sm:text-5xl">
        Управління Обладнанням
      </h1>

      <span className="absolute left-0 right-0 bottom-0 mx-auto block h-90 bg-(--color-artichoke) rounded-4xl" />

      <div className="mt-10 w-full max-w-5xl rounded-3xl shadow-xl z-1 translate-y-7 max-sm:max-w-[290px]">
        <div className="relative border-10 border-black rounded-3xl overflow-hidden" style={{ transform: `translateY(${offset}px)` }}>
          <div className="w-full h-130 max-sm:h-110">
            <Image src="/equipmentIntro.jpg"
                alt="Monitoring"
                width={2000}
                height={2000}
                className="w-full h-150 object-cover transform -translate-y-10"
            />
          </div>

          <div className="absolute inset-0 flex flex-col justify-between px-8 py-12 text-white bg-gradient-to-t from-black/60 max-sm:px-4 max-sm:justify-center">
            <p className="text-sm mb-3 opacity-90">
              Газове Обладнання › Моніторинг
            </p>
            <div>
                <h2 className="text-7xl font-semibold mb-4 max-sm:text-6xl">92%</h2>

                <h3 className="text-2xl font-medium mb-3 max-sm:text-xl">
                Надійність Обслуговування
                </h3>

                <p className="max-w-2xl leading-relaxed text-sm md:text-base opacity-95 max-sm:text-xs">
                Професійне обслуговування компресорів, насосів та газового обладнання. 
                Гарантуємо безперебійну роботу та своєчасне технічне обслуговування.
                </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default EquipmentIntro