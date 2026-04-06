import React, { useEffect } from "react";

const Carousel = () => {
  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, []);

  const slides = [
    { title: "First Slide", bg: "bg-gradient-to-br from-blue-500 to-indigo-600" },
    { title: "Second Slide", bg: "bg-gradient-to-br from-pink-500 to-rose-500" },
    { title: "Third Slide", bg: "bg-gradient-to-br from-green-500 to-emerald-600" },
    { title: "Fourth Slide", bg: "bg-gradient-to-br from-yellow-400 to-orange-500" },
    { title: "Fifth Slide", bg: "bg-gradient-to-br from-purple-500 to-violet-600" },
    { title: "Sixth Slide", bg: "bg-gradient-to-br from-cyan-500 to-sky-600" },
  ];

  return (
    <div
      id="hs-carousel"
      className="relative w-full"
      data-hs-carousel='{
        "loadingClasses": "opacity-0",
        "dotsItemClasses": "hs-carousel-active:bg-blue-600 hs-carousel-active:border-blue-600 size-3 border border-gray-300 rounded-full cursor-pointer",
        "isDraggable": true,
        "slidesQty": {"xs": 1,"sm": 2,"md": 3}
      }'
    >
      {/* Carousel */}
      <div className="hs-carousel relative w-full min-h-[320px] overflow-hidden">
        <div className="hs-carousel-body flex absolute top-0 bottom-0 start-0 transition-transform duration-700 -mx-2 opacity-0">
          {slides.map((slide, index) => (
            <div key={index} className="hs-carousel-slide px-2">
              <div
                className={`h-full rounded-2xl shadow-lg text-white flex flex-col justify-end p-6 ${slide.bg}`}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {slide.title}
                </h3>
                <p className="text-sm opacity-90">
                  This is a sample description for {slide.title}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev Button */}
      <button className="hs-carousel-prev absolute top-1/2 left-2 -translate-y-1/2 size-10 flex items-center justify-center bg-white/80 backdrop-blur rounded-full shadow hover:bg-white">
        ❮
      </button>

      {/* Next Button */}
      <button className="hs-carousel-next absolute top-1/2 right-2 -translate-y-1/2 size-10 flex items-center justify-center bg-white/80 backdrop-blur rounded-full shadow hover:bg-white">
        ❯
      </button>

      {/* Pagination */}
      <div className="hs-carousel-pagination flex justify-center gap-2 mt-4"></div>
    </div>
  );
};

export default Carousel;