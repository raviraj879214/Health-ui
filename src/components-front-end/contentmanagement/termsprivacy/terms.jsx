"use client";

import { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";

export function TermsAndCondition() {
  const [content, setContent] = useState("");

  useEffect(() => {
    getCms();
  }, []);

  const getCms = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-cms/Terms`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const result = await res.json();
        setContent(result.data.content);
      }
    } catch (error) {
      console.error("Error fetching CMS content:", error);
    }
  };

  return (
    <div
     className="cms-content mx-auto my-8 max-w-7xl px-6"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}