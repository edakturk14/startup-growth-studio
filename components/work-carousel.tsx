"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { projects } from "@/lib/content";
import { Arrow, PlaybackIcon } from "./icons";
import { useMotionState } from "./motion";

export function WorkCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { reduced, visible, tabVisible } = useMotionState(root);
  const [enhanced, setEnhanced] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const [motionOptIn, setMotionOptIn] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [selected, setSelected] = useState(0);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(
    null,
  );
  const suppressClick = useRef(false);
  const preferencePaused = reduced && !motionOptIn;
  const detailsVisible =
    manualPause || preferencePaused || hovered !== null || focused !== null;
  const paused = detailsVisible || !visible || !tabVisible;

  useEffect(() => setEnhanced(true), []);
  useEffect(() => {
    setMotionOptIn(false);
  }, [reduced]);
  useEffect(() => {
    if (paused || !track.current) return;
    let frame: number;
    let previous: number | null = null;
    let position = track.current.scrollLeft;
    const tick = (now: number) => {
      const element = track.current;
      if (element) {
        const first = element.children[0] as HTMLElement;
        const clone = element.children[projects.length] as HTMLElement;
        const loopWidth = clone.offsetLeft - first.offsetLeft;
        if (previous !== null) position += Math.min(now - previous, 50) * 0.025;
        if (loopWidth > 0 && position >= loopWidth) position -= loopWidth;
        element.scrollLeft = position;
        previous = now;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  function select(index: number, scroll = false) {
    const next = (index + projects.length) % projects.length;
    setSelected(next);
    setManualPause(true);
    if (scroll && track.current) {
      const card = track.current.children[next] as HTMLElement;
      track.current.scrollTo({
        left:
          card.offsetLeft -
          (track.current.children[0] as HTMLElement).offsetLeft,
        behavior: reduced ? "instant" : "smooth",
      });
    }
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      (event.target as HTMLElement).closest("a")
    )
      return;
    drag.current = {
      x: event.clientX,
      scroll: track.current!.scrollLeft,
      moved: false,
    };
    suppressClick.current = false;
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || !track.current) return;
    const distance = event.clientX - drag.current.x;
    if (Math.abs(distance) > 5) {
      drag.current.moved = true;
      suppressClick.current = true;
      track.current.setPointerCapture(event.pointerId);
      track.current.scrollLeft = drag.current.scroll - distance;
      setManualPause(true);
    }
  }
  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.moved && track.current) {
      const cards = Array.from(track.current.children).slice(
        0,
        projects.length,
      ) as HTMLElement[];
      const origin = cards[0].offsetLeft;
      const closest = cards.reduce(
        (best, card, index) =>
          Math.abs(card.offsetLeft - origin - track.current!.scrollLeft) <
          Math.abs(cards[best].offsetLeft - origin - track.current!.scrollLeft)
            ? index
            : best,
        0,
      );
      setSelected(closest);
    }
    if (track.current?.hasPointerCapture(event.pointerId))
      track.current.releasePointerCapture(event.pointerId);
    drag.current = null;
  }

  return (
    <div
      ref={root}
      className={`work-carousel ${enhanced ? "enhanced" : ""}`}
      data-paused={paused}
      aria-roledescription="carousel"
      aria-label="Selected founder projects"
    >
      <div className="carousel-toolbar">
        <p className="carousel-hint">
          A few things we’ve helped bring to life.
          <span> Hover or tap to explore.</span>
        </p>
        <div className="carousel-controls">
          <button
            className="playback-button"
            onClick={() => {
              if (manualPause || preferencePaused) {
                setManualPause(false);
                setMotionOptIn(true);
              } else {
                const element = track.current;
                if (element) {
                  const step =
                    (element.children[1] as HTMLElement).offsetLeft -
                    (element.children[0] as HTMLElement).offsetLeft;
                  setSelected(
                    Math.floor(element.scrollLeft / step) % projects.length,
                  );
                }
                setManualPause(true);
              }
            }}
            aria-label={
              manualPause || preferencePaused
                ? "Play project carousel"
                : "Pause project carousel"
            }
          >
            <PlaybackIcon paused={manualPause || preferencePaused} />
            {manualPause || preferencePaused ? "Play" : "Pause"}
          </button>
          <button
            className="icon-button previous"
            onClick={() => select(selected - 1, true)}
            aria-label="Previous project"
          >
            <Arrow />
          </button>
          <button
            className="icon-button"
            onClick={() => select(selected + 1, true)}
            aria-label="Next project"
          >
            <Arrow />
          </button>
        </div>
      </div>
      <div
        ref={track}
        className="project-track"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchStart={() => setManualPause(true)}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(selected + (event.key === "ArrowRight" ? 1 : -1), true);
          }
        }}
      >
        {[...projects, ...projects].map((project, index) => {
          const clone = index >= projects.length;
          const show = !enhanced || (index === selected && detailsVisible);
          return (
            <article
              key={`${project.id}-${index}`}
              className={`project-card ${clone ? "project-clone" : ""} ${show ? "show-details" : ""}`}
              aria-hidden={clone || undefined}
              inert={clone || undefined}
              onMouseEnter={() => {
                if (!clone) {
                  setHovered(index);
                  setSelected(index);
                }
              }}
              onMouseLeave={() => setHovered(null)}
              onFocusCapture={() => {
                setFocused(index);
                setSelected(index);
              }}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node))
                  setFocused(null);
              }}
            >
              <button
                className="project-select"
                onClick={() => select(index % projects.length, clone)}
                aria-label={`Explore ${project.title}`}
                aria-expanded={show}
                aria-controls={`project-details-${index}`}
                tabIndex={clone ? -1 : 0}
              >
                <span className="project-image">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 700px) 85vw, (max-width: 1100px) 48vw, 480px"
                    draggable={false}
                  />
                  <span className="project-image-arrow">
                    <Arrow diagonal />
                  </span>
                </span>
                <span className="project-caption">
                  <span>
                    <span className="project-title">{project.title}</span>
                    <span className="project-category">{project.category}</span>
                  </span>
                  <span className="project-number">
                    {String((index % projects.length) + 1).padStart(2, "0")}
                  </span>
                </span>
              </button>
              <div
                className="project-details"
                id={`project-details-${index}`}
                aria-hidden={!show || clone}
              >
                <p className="project-role">{project.role}</p>
                <p>{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={show && !clone ? 0 : -1}
                >
                  View project <Arrow diagonal />
                  <span className="sr-only">
                    : {project.title} (opens in a new tab)
                  </span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <div className="work-bottom">
        <span className="eyebrow">Founder-led. Builder-minded.</span>
        <span className="carousel-count" aria-live="polite">
          {String(selected + 1).padStart(2, "0")}{" "}
          <span>/ {String(projects.length).padStart(2, "0")}</span>
        </span>
      </div>
    </div>
  );
}
