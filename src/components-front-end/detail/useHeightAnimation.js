import { useRef, useEffect } from "react";

export default function useHeightAnimation(isOpen) {
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
      const fullH = el.scrollHeight + "px";
      el.style.height = fullH;
      el.style.opacity = "1";
      void el.offsetHeight;

      requestAnimationFrame(() => {
        el.style.height = "0px";
        el.style.opacity = "0";
      });
    }
  }, [isOpen]);

  return ref;
}
