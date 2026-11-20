"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/content";
import { Arrow, PlaybackIcon } from "./icons";
import { useMotionState } from "./motion";

export function WorkCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const { reduced, visible, tabVisible } = useMotionState(root);
  const [manualPause, setManualPause] = useState(false);
  const [motionOptIn, setMotionOptIn] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [selected, setSelected] = useState(0);
  const [position, setPosition] = useState(0);
  const pointerSelectionPending = useRef(false);
  const [viewport, api] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start", containScroll: false },
    [
      AutoScroll({
        speed: 25 / 60,
        playOnInit: false,
        startDelay: 0,
        stopOnInteraction: true,
        // Stop synchronously before Embla jumps to a keyboard-focused slide.
        stopOnFocusIn: true,
      }),
    ],
  );
  const preferencePaused = reduced && !motionOptIn;
  const detailsVisible =
    manualPause || preferencePaused || hovered !== null || focused !== null;
  const paused = detailsVisible || !visible || !tabVisible;

  useEffect(() => {
    setMotionOptIn(false);
  }, [reduced]);
  useEffect(() => {
    if (!api) return;
    const synchronize = () => setPosition(api.selectedScrollSnap());
    const interact = () => {
      pointerSelectionPending.current = true;
      setManualPause(true);
      setSelected(api.selectedScrollSnap());
    };
    const settle = () => {
      if (pointerSelectionPending.current) {
        pointerSelectionPending.current = false;
        setSelected(api.selectedScrollSnap());
      }
    };
    synchronize();
    api
      .on("select", synchronize)
      .on("reInit", synchronize)
      .on("pointerDown", interact)
      .on("settle", settle);
    return () => {
      api
        .off("select", synchronize)
        .off("reInit", synchronize)
        .off("pointerDown", interact)
        .off("settle", settle);
    };
  }, [api]);
  useEffect(() => {
    if (!api) return;
    const playback = () => {
      if (paused) api.plugins().autoScroll.stop();
      else api.plugins().autoScroll.play(0);
    };
    playback();
    api.on("reInit", playback);
    return () => {
      api.off("reInit", playback);
    };
  }, [api, paused]);

  function navigate(direction: number, moveFocus = false) {
    if (!api) return;
    pointerSelectionPending.current = false;
    const next =
      (api.selectedScrollSnap() + direction + projects.length) %
      projects.length;
    setManualPause(true);
    setSelected(next);
    setPosition(next);
    api.scrollTo(next, reduced || moveFocus);
    // Viewport arrow keys move both the visible project and its focus ring.
    // Toolbar buttons retain focus so they can be pressed repeatedly.
    if (moveFocus) {
      root.current
        ?.querySelectorAll<HTMLButtonElement>(".project-select")
        [next]?.focus({ preventScroll: true });
    }
  }

  return (
    <div
      ref={root}
      className={`work-carousel ${api ? "enhanced" : ""}`}
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
              pointerSelectionPending.current = false;
              if (manualPause || preferencePaused) {
                setManualPause(false);
                setMotionOptIn(true);
              } else {
                setSelected(api?.selectedScrollSnap() ?? 0);
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
            onClick={() => navigate(-1)}
            aria-label="Previous project"
          >
            <Arrow />
          </button>
          <button
            className="icon-button"
            onClick={() => navigate(1)}
            aria-label="Next project"
          >
            <Arrow />
          </button>
        </div>
      </div>
      <div
        ref={viewport}
        className="project-viewport"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            navigate(event.key === "ArrowRight" ? 1 : -1, true);
          }
        }}
      >
        <div className="project-track">
          {projects.map((project, index) => {
            const show = !api || (index === selected && detailsVisible);
            return (
              <article
                key={project.id}
                className={`project-card ${show ? "show-details" : ""}`}
                onMouseEnter={() => {
                  pointerSelectionPending.current = false;
                  setHovered(index);
                  setSelected(index);
                }}
                onMouseLeave={() => setHovered(null)}
                onFocusCapture={() => {
                  pointerSelectionPending.current = false;
                  setFocused(index);
                  setSelected(index);
                }}
                onBlurCapture={(event) => {
                  if (
                    !event.currentTarget.contains(event.relatedTarget as Node)
                  )
                    setFocused(null);
                }}
              >
                <button
                  className="project-select"
                  onClick={() => {
                    pointerSelectionPending.current = false;
                    setSelected(index);
                    setManualPause(true);
                  }}
                  aria-label={`Explore ${project.title}`}
                  aria-expanded={show}
                  aria-controls={`project-details-${index}`}
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
                      <span className="project-category">
                        {project.category}
                      </span>
                    </span>
                    <span className="project-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                </button>
                <div
                  className="project-details"
                  id={`project-details-${index}`}
                  aria-hidden={!show}
                >
                  <p className="project-role">{project.role}</p>
                  <p>{project.description}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={show ? 0 : -1}
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
      </div>
      <div className="work-bottom">
        <span className="carousel-count">
          {String(position + 1).padStart(2, "0")}{" "}
          <span>/ {String(projects.length).padStart(2, "0")}</span>
        </span>
      </div>
    </div>
  );
}
