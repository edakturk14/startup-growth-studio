"use client";

import { useEffect, useRef, useState } from "react";
import services from "@/content/services.json";

export function Services() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const rows = Array.from(root.current?.querySelectorAll(".service") ?? []);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    const configure = () => {
      observer?.disconnect();
      setEnhanced(!preference.matches);
      if (preference.matches) return;
      const margin = Math.round(window.innerHeight * 0.3);
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          const center = window.innerHeight / 2;
          const distances = rows.map((row) => {
            const rect = row.getBoundingClientRect();
            return Math.abs(rect.top + rect.height / 2 - center);
          });
          setActive(distances.indexOf(Math.min(...distances)));
        },
        {
          rootMargin: `-${margin}px 0px -${margin}px 0px`,
          threshold: [0, 0.25, 0.5, 0.75, 1],
        },
      );
      rows.forEach((row) => observer?.observe(row));
    };

    configure();
    preference.addEventListener("change", configure);
    window.addEventListener("resize", configure);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      window.removeEventListener("resize", configure);
    };
  }, []);

  return (
    <section
      ref={root}
      id="services"
      className={`section services-section service-story${enhanced ? " enhanced" : ""}`}
      aria-labelledby="services-title"
      data-reveal
    >
      <div className="services-intro">
        <span className="eyebrow section-label"><span>02</span> Our practice</span>
        <h2 id="services-title">How we help</h2>
        <p className="services-description">The right pieces.<br />Thoughtfully put together.</p>
        <div className="services-progress" aria-hidden="true">
          <span key={active}>{String(active + 1).padStart(2, "0")}</span>
          <span>/ {String(services.length).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="services-list">
        {services.map((service, index) => (
          <article
            className="service"
            data-active={active === index}
            key={service.title}
          >
            <span className="service-index" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                {index === 0 ? <><path d="M6 6h12v12H6zM14 14h12v12H14z" /><path d="M10 22H6v4h4M22 10h4V6h-4" /></> : index === 1 ? <><path d="M6 5h20v22H6zM11 11h10M11 16h10M11 21h6" /></> : <><path d="M5 26 26 5M7 5h19v19M5 16v10h10" /><path d="M12 5H7v5M26 20v5h-5" /></>}
              </svg>
            </span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <span className="service-number" aria-hidden="true">0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
