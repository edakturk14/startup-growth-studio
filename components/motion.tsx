"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useMotionState(ref: RefObject<HTMLElement | null>) {
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    const visibility = () => setTabVisible(!document.hidden);
    update();
    visibility();
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [ref]);
  return { reduced, visible, tabVisible };
}

export function ScrollReveals() {
  const mounted = useRef(false);
  useEffect(() => {
    if (
      mounted.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    mounted.current = true;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-ready");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      // Never conceal content already in view or make no-JS rendering dependent on motion.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("reveal-ready");
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
