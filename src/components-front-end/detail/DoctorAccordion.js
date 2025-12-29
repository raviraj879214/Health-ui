"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

// --------------------------------------------------------
//  Height Animation Hook
// --------------------------------------------------------
function useHeightAnimation(isOpen) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.overflow = "hidden";
    el.style.transition =
      "height 320ms cubic-bezier(.2,.8,.2,1), opacity 200ms";

    if (isOpen) {
      el.style.height = "0px";
      el.style.opacity = "0";

      requestAnimationFrame(() => {
        const fullH = el.scrollHeight + "px";
        el.style.height = fullH;
        el.style.opacity = "1";

        const end = () => {
          el.style.height = "auto";
          el.removeEventListener("transitionend", end);
        };
        el.addEventListener("transitionend", end);
      });
    } else {
      el.removeAttribute('style'); 
      const fullH = el.scrollHeight + "px";
      el.style.height = fullH;
      el.style.opacity = "1";
      el.style.overflow = "hidden";
      el.style.transition =
        "height 320ms cubic-bezier(.2,.8,.2,1), opacity 200ms";
      void el.offsetHeight;

      requestAnimationFrame(() => {
        el.style.height = "0px";
        el.style.opacity = "0";
      });
    }
  }, [isOpen]);

  return ref;
}

// --------------------------------------------------------
//  MAIN ACCORDION COMPONENT (MULTIPLE OPEN ENABLED)
// --------------------------------------------------------
export default function DoctorAccordion({ items = [] }) {

  const [openIds, setOpenIds] = useState(() => items.map((it) => it.id));

  const toggle = (id) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      // multiple mode always ON
      return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };
  // console.log(openIds);
  return (
    <div>
      {items.map((doc) => {
        const isOpen = openIds.includes(doc.id);
        const contentRef = useHeightAnimation(isOpen);

        return (
          <div
            key={doc.id}
            className="border border-border rounded-thm mb-5"
          >
            {/* HEADER BUTTON */}
            <button
              type="button"
              onClick={() => toggle(doc.id)}
              className="h4 btn btn-none md:px-7.5 px-4 py-5 flex justify-between items-center w-full font-bold"
            >
              <span>{doc.title}</span>

              <span
                className={`inline-block flex-none md:ms-5 ms-4 transition-transform duration-300 ${
                  isOpen ? "" : "rotate-180"
                }`}
              >
                <svg width="18" height="9" viewBox="0 0 18 9" fill="none" className="md:w-[18px] w-[15px]">
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
              className="slide-toggle md:px-7.5 px-4 overflow-hidden"
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
                  <div className="thumb-wrap md:w-[100px] w-[70px] flex-none me-5">
                    <div className="w-full relative overflow-hidden pb-[100%] rounded-thm">
                      <Image
                        src={child.image}
                        alt={child.name}
                        width={100}
                        height={100}
                        className="absolute w-full h-full object-cover top-0 left-0"
                      />
                    </div>
                  </div>

                  <div className="grow flex md:flex-nowrap flex-wrap justify-between md:gap-5 gap-0 items-center">
                    <div className="m-0">
                      <h4 className="font-bold mb-1.5 h4">{child.name}</h4>
                      <p className="mb-2.5 text-primary font-bold leading-none">
                        {child.speciality}
                      </p>
                      <p>{child.description}</p>
                    </div>

                    <Link href="#" className="btn btn-secondary md:px-5 md:py-2 px-3 py-1.5 md:text-[1em] text-[0.8em]">
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
