"use client";

import { useEffect, useRef } from "react";
import Footer from "../shared/footer";

export default function FooterWrapper() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(
          new CustomEvent("footer-visibility", {
            detail: { visible: entry.isIntersecting },
          })
        );
      },
      { threshold: 0.1 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return <Footer ref={footerRef} />;
}
