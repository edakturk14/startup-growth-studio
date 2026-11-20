"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useEffect, useRef, useState } from "react";
import { type Testimonial } from "@/lib/content";
import { PlaybackIcon, Arrow } from "./icons";
import { useMotionState } from "./motion";

function QuoteCard({ entry }: { entry: Testimonial | null }) {
  return (
    <article className={`quote-card ${entry ? "" : "placeholder-card"}`}>
      <span className="quote-mark" aria-hidden="true">
        “
      </span>
      {entry ? (
        <>
          <blockquote>{entry.quote}</blockquote>
          <div className="quote-author">
            <Image
              src={entry.avatar}
              alt=""
              width={36}
              height={36}
              unoptimized
            />
            <div>
              <p>{entry.author}</p>
              <span>{entry.handle}</span>
              {(entry.role || entry.company) && (
                <span>
                  {[entry.role, entry.company].filter(Boolean).join(" · ")}
                </span>
              )}
            </div>
          </div>
          <div className="quote-source">
            <span>
              {entry.context === "founder-work"
                ? "Founder’s work"
                : "Studio work"}
              {entry.date && (
                <>
                  {" "}
                  · <time dateTime={entry.date}>{entry.date}</time>
                </>
              )}
            </span>
            <a href={entry.postUrl} target="_blank" rel="noreferrer">
              View original post <Arrow diagonal />
            </a>
          </div>
        </>
      ) : (
        <>
          <p className="placeholder-label">Testimonial placeholder</p>
          <p className="placeholder-copy">
            A verified quote and its original post will appear here.
          </p>
          <div className="quote-author">
            <span className="avatar-placeholder" aria-hidden="true" />
            <div>
              <p>Author details</p>
              <span>Not an endorsement</span>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

function QuoteColumn({
  entries,
  index,
  paused,
}: {
  entries: (Testimonial | null)[];
  index: number;
  paused: boolean;
}) {
  const [viewport, api] = useEmblaCarousel(
    {
      axis: "y",
      loop: true,
      dragFree: true,
      align: "start",
      containScroll: false,
      breakpoints: { "(max-width: 700px)": { active: false } },
    },
    [
      AutoScroll({
        speed: 0.24,
        direction: index % 2 ? "backward" : "forward",
        playOnInit: false,
        startDelay: 0,
        stopOnInteraction: true,
        stopOnFocusIn: false,
      }),
    ],
  );
  useEffect(() => {
    if (!api) return;
    const playback = () => {
      // Inactive mobile engines have no plugins; single-slide engines do not
      // initialize AutoScroll. Keep undersized columns readable and static.
      const autoScroll = api.plugins()?.autoScroll;
      if (!autoScroll || api.scrollSnapList().length <= 1) return;
      if (paused || !api.internalEngine().options.loop) autoScroll.stop();
      else autoScroll.play(0);
    };
    playback();
    api.on("reInit", playback);
    return () => {
      api.off("reInit", playback);
    };
  }, [api, paused]);
  return (
    <div ref={viewport} className="quote-column">
      <div className="quote-track">
        {entries.map((entry, row) => (
          <QuoteCard entry={entry} key={entry?.id ?? row} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials({
  entries,
  preview,
}: {
  entries: Testimonial[];
  preview: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  const { reduced, visible, tabVisible } = useMotionState(root);
  const [manualPause, setManualPause] = useState(false);
  const [motionOptIn, setMotionOptIn] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [focused, setFocused] = useState(false);
  const preferencePaused = reduced && !motionOptIn;
  const paused =
    manualPause ||
    preferencePaused ||
    interacting ||
    focused ||
    !visible ||
    !tabVisible;
  const rows: (Testimonial | null)[] =
    preview && entries.length === 0
      ? Array.from({ length: 9 }, () => null)
      : entries;
  const count = Math.min(3, rows.length);
  const columns = Array.from({ length: count }, (_, index) =>
    rows.filter((_, row) => row % count === index),
  );
  useEffect(() => setMotionOptIn(false), [reduced]);

  return (
    <section
      ref={root}
      id="testimonials"
      className="section testimonials-section"
      data-reveal
      data-paused={paused}
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">Feedback on our founder’s work.</span>
          <h2>In their words.</h2>
        </div>
        <button
          className="playback-button testimonial-playback"
          onClick={() => {
            if (manualPause || preferencePaused) {
              setManualPause(false);
              setMotionOptIn(true);
            } else setManualPause(true);
          }}
          aria-label={`${manualPause || preferencePaused ? "Play" : "Pause"} testimonials`}
        >
          <PlaybackIcon paused={manualPause || preferencePaused} />
          {manualPause || preferencePaused ? "Play" : "Pause"}
        </button>
      </div>
      {preview && (
        <p className="preview-notice">
          Development preview — neutral placeholders, not real testimonials.
        </p>
      )}
      <div
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node))
            setFocused(false);
        }}
        onPointerDown={() => setManualPause(true)}
      >
        <div
          className="quote-wall"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
          {columns.map((column, index) => (
            <QuoteColumn
              entries={column}
              index={index}
              paused={paused}
              key={index}
            />
          ))}
        </div>
        <div className="quote-mobile">
          {rows.map((entry, index) => (
            <QuoteCard entry={entry} key={entry?.id ?? index} />
          ))}
        </div>
      </div>
      <noscript>
        <style>{`.quote-wall{height:auto!important;mask-image:none!important}.quote-column{height:auto!important;overflow:visible!important}.testimonial-playback{display:none}`}</style>
      </noscript>
    </section>
  );
}
