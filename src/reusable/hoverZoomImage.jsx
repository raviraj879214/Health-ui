"use client";
import { useState } from "react";

const HoverZoomImage = ({
  src,
  alt,
  size = 180,
  borderRadius = "10px",
  className = "",
}) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [origin, setOrigin] = useState("center center");

  const handleEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const previewSize = 320;
    const gap = 12;

    const placeRight = rect.right + previewSize + gap < window.innerWidth;

    setPosition({
      top: rect.top,
      left: placeRight
        ? rect.right + gap
        : rect.left - previewSize - gap,
    });

    setShow(true);
  };

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <>
      {/* Thumbnail */}
      <div
        className={`cursor-pointer ${className}`}
        style={{ width: size, height: size }}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setShow(false)}
        onMouseMove={handleMove}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-lg"
           style={{
            borderRadius: borderRadius,
          }}
        />
      </div>

      {/* Floating Preview (FIXED) */}
      {show && (
        <div
          className="fixed z-[9999] bg-white rounded-xl shadow-2xl border overflow-hidden"
          style={{
            top: position.top,
            left: position.left,
            width: 320,
            height: 320,
          }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: "scale(3)",
              transformOrigin: origin,
            }}
          />
        </div>
      )}
    </>
  );
};

export default HoverZoomImage;
