"use client";
import { useState, useRef } from "react";
import ComponentCard from "@/components/common/ComponentCard";

import {ClinicNameUpdates} from "../ClinicEditManagement/ClinicNameUpdate";

export function HeroSectionbanner({name,clinicuuid , location}) {
  const [banners, setBanners] = useState([null, null, null, null, null]);
  const hiddenInput = useRef(null);
  const [indexToUpdate, setIndexToUpdate] = useState(null);






  const openFilePicker = (index) => {
    setIndexToUpdate(index);
    hiddenInput.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBanners((prev) => {
      const updated = [...prev];
      updated[indexToUpdate] = { file, url };
      return updated;
    });
  };

  const removeImage = (index) => {
    setBanners((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  return (
    <ComponentCard title="Hospital Images">
      
      <div className="w-full bg-white border rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 h-[420px]">
          <div
            className="col-span-2 border flex items-center justify-center relative cursor-pointer hover:border-blue-500"
            onClick={() => openFilePicker(0)}>
            {!banners[0] ? <EmptyBlock /> : <Preview img={banners[0].url} remove={() => removeImage(0)} />}
          </div>

        
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border flex items-center justify-center relative cursor-pointer hover:border-blue-500"
                onClick={() => openFilePicker(i)}
              >
                {!banners[i] ? <EmptyBlock /> : <Preview img={banners[i].url} remove={() => removeImage(i)} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <input
        ref={hiddenInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

<ClinicNameUpdates clinicnames={name} clinicuuid={clinicuuid} location={location} ></ClinicNameUpdates>


    











    </ComponentCard>
  );
}


const EmptyBlock = () => (
  <div className="text-center text-gray-400">
    <svg className="w-10 h-10 mx-auto mb-1" fill="none" stroke="gray" strokeWidth={1.2} viewBox="0 0 24 24">
      <path d="M4 5h16v14H4z" />
      <path d="M4 15l4-4 3 3 5-5 4 4" />
    </svg>
    <p className="text-sm">Click to upload</p>
  </div>
);


const Preview = ({ img, remove }) => (
  <div className="relative w-full h-full">
    <img src={img} className="w-full h-full object-cover rounded-md" />
    <button
      onClick={remove}
      className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
    >
      ✕
    </button>
  </div>
);
