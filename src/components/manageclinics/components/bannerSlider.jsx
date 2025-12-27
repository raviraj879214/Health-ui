"use client";

import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";

export function BannerSlider({ id }) {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch images when id changes
  useEffect(() => {
    if (!id) return;
    fetchImages();
  }, [id]);

  // Auto slide only when slides exist
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const fetchImages = async () => {
     


    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-banner/${id}`,
        {
          method: "GET",
          headers:await adminHeaders(),
        }
      );

      if (res.ok) {

         
        const result = await res.json();
        
        const images = result.data.map((item) =>`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/clinic/banner/${item.Images}`);


        setSlides(images);

        setCurrent(0);
        
      }
    } catch (error) {
      console.error("Failed to load banner images", error);
    }
  };



  if (slides.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border rounded">
        No banners found
      </div>
    );
  }

  return (
    <div className="p-1">
      <div className="border border-default rounded h-64 overflow-hidden relative">
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-700 h-full"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-full h-full object-contain flex-shrink-0 bg-black"
                alt=""
              />
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={() =>
              setCurrent((current - 1 + slides.length) % slides.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
          >
            ❮
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => setCurrent((current + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
          >
            ❯
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-3 w-3 rounded-full ${
                  current === i ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
