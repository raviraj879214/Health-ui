import React, { useState, useEffect, useMemo } from "react";

export function Carousel({ data = [] }) {
  const [current, setCurrent] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  // ✅ Convert API data → grouped surgeries
  const surgeries = useMemo(() => {
    const grouped = {};

    data.forEach((item) => {
      if (!grouped[item.surgeryId]) {
        grouped[item.surgeryId] = {
          id: item.surgeryId,
          before: "",
          after: "",
          treatmentname: "Treatment",
        };
      }

      const imageUrl = `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=surgery/beforeandafter/${item.imageUrl}`;

      if (item.imageType === "before") {
        grouped[item.surgeryId].before = imageUrl;
      } else if (item.imageType === "after") {
        grouped[item.surgeryId].after = imageUrl;
      }
    });

    return Object.values(grouped);
  }, [data]);

  // ✅ Responsive items
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(3);
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);

    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const nextSlide = () => {
    if (current < surgeries.length - visibleItems) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full overflow-hidden p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
      
      {/* ✅ Carousel Track */}
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${(current * 100) / visibleItems}%)`,
        }}
      >
        {surgeries.map((surgery) => (
          <div
            key={surgery.id}
            className={`flex-shrink-0 w-[calc(100%/${visibleItems})] border border-gray-300 dark:border-neutral-600 rounded-lg p-2 flex flex-col`}
          >
            {/* Images */}
            <div className="flex gap-2">
              {/* Before */}
              <div className="relative w-1/2 h-[180px] overflow-hidden rounded bg-gray-100">
                {surgery.before ? (
                  <img
                    src={surgery.before}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-1 left-1 bg-blue-600 text-white px-2 py-0.5 text-xs rounded">
                  Before
                </div>
              </div>

              {/* After */}
              <div className="relative w-1/2 h-[180px] overflow-hidden rounded bg-gray-100">
                {surgery.after ? (
                  <img
                    src={surgery.after}
                    alt="After"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-1 left-1 bg-green-600 text-white px-2 py-0.5 text-xs rounded">
                  After
                </div>
              </div>
            </div>

            
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 dark:bg-black/40 p-2 rounded-full shadow-md"
      >
        ◀
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 dark:bg-black/40 p-2 rounded-full shadow-md"
      >
        ▶
      </button>
    </div>
  );
}