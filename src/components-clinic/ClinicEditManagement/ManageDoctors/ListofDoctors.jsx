"use client"
import ComponentCard from "@/components/common/ComponentCard";



export function ListofDoctor() {



    return (<>
        <ComponentCard  title="Doctors">


<div class="grid grid-cols-4 gap-6">


    <div class="border theme-border rounded overflow-hidden shadow-lg cursor-pointer flex items-center justify-center h-54">
        <p class="text-5xl font-bold text-[var(--primary-dark)]">+</p>
    </div>

   <div class="relative border theme-border rounded overflow-hidden shadow-lg cursor-pointer p-4 flex flex-col h-54">

    <div class="absolute top-2 right-2 flex items-center gap-2">
        <button class="text-gray-500 hover:text-[var(--primary-dark)] text-lg">👁</button>
        <button class="text-gray-500 hover:text-[var(--primary-dark)] text-lg">✎</button>
        <button class="text-red-500 hover:text-red-700 text-lg">🗑</button>

        <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" />
            <div class="w-9 h-5 bg-gray-300 rounded-full peer-checked:bg-[var(--primary-dark)] relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
        </label>
    </div>

    <div class="flex items-center gap-3 mt-8">
        <img class="w-12 h-12 rounded-full" src="https://nationaldoctorsday.org/wp-content/uploads/2025/02/2025-national-doctors-day-about.jpg" />
        <div>
            <p class="text-lg font-semibold">Dr. John Doe</p>
            <p class="text-sm text-white-600 background-theme rounded-2xl text-center font-semibold">Cardiologist</p>
        </div>
    </div>

    <p class="text-sm text-gray-700 my-2">
        Specialized in heart treatments and preventive cardiology.
    </p>

    <div class="mt-auto pt-2 text-sm text-gray-600">
        <p>Experience: 10 Years</p>
        <p>London, UK</p>
    </div>
</div>




</div>


        





        </ComponentCard>
    </>);
}