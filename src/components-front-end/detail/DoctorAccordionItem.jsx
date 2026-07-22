"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useHeightAnimation from "./useHeightAnimation";

export default function DoctorAccordionItem({ doc }) {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useHeightAnimation(isOpen);

  return (
    <div className="border border-border rounded-thm mb-5">
      
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="h4 btn btn-none md:px-7.5 px-4 py-5 flex justify-between items-center w-full font-bold"
      >
        <span>{doc.title}</span>

        <span
          className={`inline-block transition-transform duration-300 ${
            isOpen ? "" : "rotate-180"
          }`}
        >
          <svg width="18" height="9" viewBox="0 0 18 9" fill="none">
            <path
              d="M17 8L9.06611 1L0.999999 8"
              stroke="#2DA9F4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="md:px-7.5 px-4 overflow-hidden"
        style={{
          height: isOpen ? "auto" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {doc.children.map((child, index) => (
          <div
            key={index}
            className="border-b border-border last:border-b-0 flex pb-5 mb-5 last:pb-0"
          >
            <div className="md:w-[100px] w-[70px] flex-none me-5">
              <div className="relative pb-[100%] rounded-thm overflow-hidden">
                <img
                  src={child.image}
                  alt={child.name}
                  width={100}
                  height={100}
                  className="absolute inset-0 object-cover"
                />
              </div>
            </div>

            <div className="grow flex justify-between items-center gap-5">
              <div>
                <h4 className="font-bold mb-1.5 h4">{child.name}</h4>
                <p className="text-primary font-bold mb-2">
                  {child.speciality}
                </p>
                <p className="line-clamp-2">{child.description}</p>
              </div>

              <Link
                href={`/doctor-info/${child.slug}`}
                className="btn btn-secondary md:px-5 md:py-2 px-3 py-1.5"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
