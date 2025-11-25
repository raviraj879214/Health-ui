"use client"
import ComponentCard from "@/components/common/ComponentCard";



export function ListofDoctor() {






    return (<>



<ComponentCard title="Doctors">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    <div className="border theme-border rounded overflow-hidden shadow-lg cursor-pointer flex items-center justify-center h-40 sm:h-54">
      <p className="text-4xl sm:text-5xl font-bold text-[var(--primary-dark)]">+</p>
    </div>

    <div className="relative border theme-border rounded overflow-hidden shadow-lg cursor-pointer p-4 flex flex-col h-40 sm:h-54">
      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-lg">
        <button className="text-gray-500 hover:text-[var(--primary-dark)]">👁</button>
        <button className="text-gray-500 hover:text-[var(--primary-dark)]">✎</button>
        <button className="text-red-500 hover:text-red-700">🗑</button>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-7 h-4 sm:w-9 sm:h-5 bg-gray-300 rounded-full peer-checked:bg-[var(--primary-dark)] relative 
          after:content-[''] after:absolute after:top-[1px] after:left-[1px] 
          after:w-3 after:h-3 sm:after:w-4 sm:after:h-4 after:bg-white after:rounded-full after:transition-all 
          peer-checked:after:translate-x-full"></div>
        </label>
      </div>

      <div className="flex items-center gap-3 mt-6 sm:mt-8">
        <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" src="https://nationaldoctorsday.org/wp-content/uploads/2025/02/2025-national-doctors-day-about.jpg"/>
        <div>
          <p className="text-sm sm:text-lg font-semibold">Dr. John Doe</p>
          <p className="text-xs sm:text-sm text-white-600 background-theme rounded-2xl text-center font-semibold px-2">Cardiologist</p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-gray-700 my-1 sm:my-2">
        Specialized in heart treatments and preventive cardiology.
      </p>

      <div className="mt-auto pt-1 sm:pt-2 text-xs sm:text-sm text-gray-600">
        <p>Experience: 10 Years</p>
        <p>London, UK</p>
      </div>
    </div>
  </div>
</ComponentCard>

    </>);
}