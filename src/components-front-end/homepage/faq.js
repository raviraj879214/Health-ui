"use client";

import Image from "next/image";
import Link from "next/link";

import plusIcon from "../../icons/plus.svg";
import minusIcon from "../../icons/minus.svg";

import React, { useState, useRef, useEffect } from "react";

function useHeightAnimation(isOpen) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.overflow = "hidden";
    el.style.transition =
      "height 320ms cubic-bezier(.2,.8,.2,1), opacity 200ms";

    if (isOpen) {
      // --- OPEN ---
      el.style.height = "0px";
      el.style.opacity = "0";

      requestAnimationFrame(() => {
        const fullH = el.scrollHeight + "px";
        el.style.height = fullH;
        el.style.opacity = "1";

        const end = () => {
          el.style.height = 'auto';
          el.removeEventListener("transitionend", end);
        };

        el.addEventListener("transitionend", end);
      });
    } else {
      el.removeAttribute('style'); 
      // --- CLOSE ---
      const fullH = el.scrollHeight + "px";

      // step 1: set fixed height
      el.style.height = fullH;
      el.style.opacity = "1";
      el.style.overflow = "hidden";
      el.style.transition =
        "height 320ms cubic-bezier(.2,.8,.2,1), opacity 200ms";

      // force reflow to lock height BEFORE changing to 0
      void el.offsetHeight;

      // step 2: animate to 0
      requestAnimationFrame(() => {
        el.style.height = "0px";
        el.style.opacity = "0";
      });
    }
  }, [isOpen]);

  return ref;
}



export function AccordionItem({ id, title, children, isOpen, onToggle }) {

  const contentRef = useHeightAnimation(isOpen);

  return (
    <div className={`border rounded-thm md:py-5.5 md:px-7.5 px-5 py-5 mb-5 last:mb-0 ${isOpen ? "border-primary shadow-[0px_0px_40px_0px_#234BBE33]" : "border-border"}`}>
      <h3 className="h4">
        <button
          aria-controls={`accordion-panel-${id}`}
          aria-expanded={isOpen}
          onClick={() => onToggle(id)}
          className="btn btn-none w-full flex items-center justify-between text-start"
        >
          <span className="font-bold">{title}</span>

          {/* {(isOpen ? minusIcon : plusIcon) && (
  <Image
    src={isOpen ? minusIcon : plusIcon}
    alt="toggle question"
    width={24}
    height={24}
  />
)} */}

        </button>
      </h3>

      <div
        id={`accordion-panel-${id}`}
        ref={contentRef}
        className="overflow-hidden"
        style={{
          height: isOpen ? "auto" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pt-3 [&_>_*:last-child]:mb-0">{children}</div>
      </div>
    </div>
  );
}



export default function FAQ({ items = [], multiple = false, defaultOpen = null }) {
    const [openIds, setOpenIds] = useState(() => {
        if (items.length === 0) return [];

        // MULTIPLE MODE
        if (multiple) {
            if (Array.isArray(defaultOpen)) return defaultOpen;
            if (defaultOpen !== null) return [defaultOpen];
            return [items[0].id]; // open first
        }

        // SINGLE MODE
        if (defaultOpen !== null) return [defaultOpen];
        return [items[0].id]; // open first
    });

  const handleToggle = (id) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (multiple) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      }
      // single mode
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className="md:my-18 my-16">
        <div className="container">
            <h2 className="h2 text-center mb-7">FAQ’s</h2>
            <div className="max-w-3xl mx-auto">
                {items.map((it) => (
                    <AccordionItem
                    key={it.id}
                    id={it.id}
                    title={it.title}
                    isOpen={openIds.includes(it.id)}
                    onToggle={handleToggle}
                    >
                    {it.content}
                    </AccordionItem>
                ))}
            </div>
           
        </div>
    </div>
  );
}
