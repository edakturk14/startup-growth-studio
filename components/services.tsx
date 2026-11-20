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
        <h2 id="services-title">How we help</h2>
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
              0{index + 1}
            </span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
