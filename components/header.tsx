"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { Arrow } from "./icons";

export function Wordmark() {
  return (
    <span className="wordmark">
      <svg
        className="brand-mark"
        width="30"
        height="28"
        viewBox="0 0 30 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="10.5" cy="14" r="7" />
        <circle cx="19.5" cy="14" r="7" />
      </svg>
      <span className="wordmark-type">
        <span className="wordmark-name">{site.brandName.toLowerCase()}</span>
        {site.brandSuffix && (
          <span className="wordmark-suffix">{site.brandSuffix}</span>
        )}
      </span>
    </span>
  );
}

export function Header({ showTestimonials }: { showTestimonials: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const links = [
    { href: "#work", label: "Work" },
    { href: "#services", label: "Services" },
    ...(showTestimonials
      ? [{ href: "#testimonials", label: "Testimonials" }]
      : []),
    { href: "#about", label: "About" },
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const resize = () => {
      if (window.innerWidth > 700) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", update);
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <header
      ref={header}
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setOpen(false);
      }}
    >
      <a
        href="#top"
        aria-label={`${site.fullBrandName}, home`}
        onClick={() => setOpen(false)}
      >
        <Wordmark />
      </a>
      <nav aria-label="Main navigation" className="desktop-nav">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a
        className="header-contact"
        href="#contact"
        onClick={() => setOpen(false)}
      >
        Let’s talk
      </a>
      <button
        ref={menuButton}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        <span /> <span />
      </button>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="mobile-nav"
        hidden={!open}
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <Arrow diagonal />
          </a>
        ))}
      </nav>
      <noscript>
        <style>{`.menu-toggle { display:none } @media(max-width:700px){.desktop-nav{display:flex;flex-wrap:wrap;gap:12px;font-size:12px}.header-contact{display:none}.site-header{gap:16px}}`}</style>
      </noscript>
    </header>
  );
}
