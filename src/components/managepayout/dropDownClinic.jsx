"use client";
import React, { useState, useEffect, useRef } from "react";
import { adminHeaders } from "../utils/adminHeader";

export function DropDownSearchesClinic({ value = null, onChange }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch clinic list
  const fetchTags = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-payout/get-clinic-list`,
        {
          method: "GET",
          headers: await adminHeaders(),
        }
      );

      if (res.ok) {
        const result = await res.json();

        const newTags = result.data.map((item) => ({
          name: item.name,
          code: item.uuid,
        }));

        setTags(newTags);
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // Sync external value
  useEffect(() => {
    if (value) {
      const tag = tags.find((t) => t.code === value.code);
      setSelectedTag(tag || null);
      setQuery(tag?.name || "");
    } else {
      setSelectedTag(null);
      setQuery("");
    }
  }, [value, tags]);

  const filteredTags = tags.filter((tag) =>
    tag?.name?.toLowerCase().includes(query.toLowerCase())
  );

  // Select clinic
  const handleSelect = (tag) => {
    setSelectedTag(tag);
    setQuery(tag.name);
    setIsOpen(false);

    if (onChange) onChange(tag);
  };

  return (
    <div className="mt-6 relative" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Select Clinic"
        value={query}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          setIsOpen(true);

          // 🔥 Clear selection
          if (val === "") {
            setSelectedTag(null);
            if (onChange) onChange(null);
          }
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() =>
          setTimeout(() => {
            setIsOpen(false);

            // 🔒 Reset if invalid text
            if (
              query &&
              !tags.some(
                (t) => t.name.toLowerCase() === query.toLowerCase()
              )
            ) {
              setQuery("");
              setSelectedTag(null);
              if (onChange) onChange(null);
            }
          }, 150)
        }
        className="py-2.5 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm
          focus:border-blue-500 focus:ring-blue-500
          dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
      />

      {isOpen && filteredTags.length > 0 && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1
          dark:bg-neutral-800 dark:border-neutral-700 max-h-60 overflow-auto shadow-lg">
          {filteredTags.map((tag) => (
            <div
              key={tag.code}
              onClick={() => handleSelect(tag)}
              className="flex items-center justify-between cursor-pointer py-2 px-4
                text-sm text-gray-800 hover:bg-gray-100
                dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <span>{tag.name}</span>

              {selectedTag?.code === tag.code && (
                <svg
                  className="w-4 h-4 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
