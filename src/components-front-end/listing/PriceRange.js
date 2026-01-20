"use client";

import { useState } from "react";

export default function PriceRange({
  min = 0,
  max = 1000,
  step = 1,
  defaultMin = 0,
  defaultMax = 0,
}) {
  const [minValue, setMinValue] = useState(defaultMin);
  const [maxValue, setMaxValue] = useState(defaultMax);

  const handleMin = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 10);
    setMinValue(value);
  };

  const handleMax = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 10);
    setMaxValue(value);
  };

  // percentage positions for the fill bar
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="border border-border rounded-thm p-5 mb-5 last:mb-0">
        <h5 className="text-2xl font-bold mb-5">By Price</h5>
        <p className="mb-2.5">
            ${minValue} – ${maxValue}
        </p>
        <div className="relative w-full h-2.5 bg-border rounded-full">
            {/* Active blue range bar */}
            <div
            className="absolute h-2.5 bg-primary rounded-full"
            style={{
                left: `${minPercent}%`,
                right: `${100 - maxPercent}%`,
            }}
            ></div>

            {/* --- Min Thumb --- */}
            <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minValue}
            onChange={handleMin}
            className="absolute w-full appearance-none pointer-events-none h-full
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:pointer-events-auto
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:bg-secondary
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:hover:bg-secondary-dark
            "
            />

            {/* --- Max Thumb --- */}
            <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxValue}
            onChange={handleMax}
            className="absolute w-full appearance-none pointer-events-none h-full
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:pointer-events-auto
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:bg-secondary
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:hover:bg-secondary-dark
            "
            />
        </div>
    </div>
  );
}
