"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { type Testimonial } from "@/lib/content";
import { PlaybackIcon, Arrow } from "./icons";
import { useMotionState } from "./motion";

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
  const columns = Array.from({ length: 3 }, (_, index) =>
    rows.filter((_, row) => row % 3 === index),
  );

  function card(entry: Testimonial | null, index: number, clone = false) {
    return (
      <article
        className={`quote-card ${entry ? "" : "placeholder-card"}`}
        key={`${entry?.id ?? index}-${clone}`}
      >
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
              <a
                href={entry.postUrl}
                target="_blank"
                rel="noreferrer"
                tabIndex={clone ? -1 : 0}
              >
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
          className="playback-button"
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
        className="testimonial-wall"
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node))
            setFocused(false);
        }}
        onTouchStart={() => setManualPause(true)}
      >
        {columns.map((column, index) => (
          <div className="testimonial-column" key={index}>
            <div className="testimonial-roll">
              <div className="testimonial-group">
                {column.map((entry, row) => card(entry, row))}
              </div>
              <div
                className="testimonial-group testimonial-clone"
                aria-hidden="true"
                inert
              >
                {column.map((entry, row) => card(entry, row, true))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <noscript>
        <style>{`.testimonial-roll{animation:none!important}.testimonial-clone{display:none!important}.testimonial-wall{height:auto!important;mask-image:none!important}.testimonial-column{height:auto!important}`}</style>
      </noscript>
    </section>
  );
}
