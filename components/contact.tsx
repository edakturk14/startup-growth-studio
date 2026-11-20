"use client";

import { useState } from "react";
import { site } from "@/lib/content";

export function CopyEmail() {
  const [feedback, setFeedback] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setFeedback("Email copied!");
    } catch {
      setFeedback(`Please copy: ${site.email}`);
    }
  }
  return (
    <div className="email-copy">
      <button onClick={copy} className="text-button">
        {site.email}
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <path d="M12 4V3H3v9h1" />
        </svg>
        <span className="sr-only"> — copy email</span>
      </button>
      <span role="status" className="copy-feedback">
        {feedback}
      </span>
    </div>
  );
}
