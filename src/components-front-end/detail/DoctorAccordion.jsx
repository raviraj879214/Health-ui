"use client";

import DoctorAccordionItem from "./DoctorAccordionItem";

export default function DoctorAccordion({ items = [] }) {
  return (
    <div>
      {items.map((doc) => (
        <DoctorAccordionItem key={doc.id} doc={doc} />
      ))}
    </div>
  );
}
