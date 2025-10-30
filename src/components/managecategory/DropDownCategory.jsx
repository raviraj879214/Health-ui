"use client";
import React, { useState, useEffect, useRef } from "react";

export function DropDownSearchesCategory({ value = null, onChange, onData, trigger }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔁 Fetch categories from API
  const fetchTags = async () => {
    try {
      const resToken = await fetch("/api/auth/get-token");
      const { token } = await resToken.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/categories/get-category`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 403) return;

      if (res.ok) {
        const result = await res.json();
        const newTags = result.data.map((item) => ({
          name: item.name,
          code: item.id,
          level: item.level || 1,
        }));

        setTags(newTags);
        if (onData) onData(newTags);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // 🔁 Re-fetch tags whenever trigger changes
  useEffect(() => {
 
    fetchTags();
  }, [trigger]);

  // 🧭 When `value` changes externally
  useEffect(() => {
    if (value && tags.length > 0) {
      const tag = tags.find((t) => t.code === value);
      setSelectedTag(tag || null);
      setQuery(tag?.name || "");
    } else if (!value) {
      setSelectedTag(null);
      setQuery("");
    }
  }, [value, tags]);

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (tag) => {
    setSelectedTag(tag);
    setQuery(tag.name);
    setIsOpen(false);
    if (onChange) onChange(tag);
  };

  // 🌈 Category display (indent + color by level)
  const getDisplay = (opt) => {
    const prefix = opt.level > 1 ? "│   ".repeat(opt.level - 2) + "└── " : "";
    const colors = [
      "#000000", // level 1
      "#1E88E5", // level 2
      "#43A047", // level 3
      "#FB8C00", // level 4
      "#E53935", // level 5
    ];
    const color = colors[opt.level - 1] || "#757575";
    return { prefix, color };
  };

  return (
    <div className="mt-1 relative" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Select category"
        value={query}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          setIsOpen(true);
          if (val === "") {
            setSelectedTag(null);
            if (onChange) onChange(null);
          }
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="py-2.5 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm 
          focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 
          dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      />

      {isOpen && filteredTags.length > 0 && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 
          dark:bg-neutral-800 dark:border-neutral-700 max-h-60 overflow-auto shadow-lg">
          {filteredTags.map((tag) => {
            const { prefix, color } = getDisplay(tag);
            return (
              <div
                key={tag.code}
                onClick={() => handleSelect(tag)}
                className="flex items-center justify-between cursor-pointer py-2 px-4 text-sm 
                  hover:bg-gray-100 dark:hover:bg-neutral-700"
                style={{
                  color,
                  paddingLeft: `${tag.level * 10}px`,
                  fontWeight: tag.level === 1 ? "bold" : "normal",
                  fontFamily: "monospace",
                }}
              >
                <span>
                  {prefix}
                  {tag.name}
                </span>
                {selectedTag?.code === tag.code && (
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
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
            );
          })}
        </div>
      )}
    </div>
  );
}
