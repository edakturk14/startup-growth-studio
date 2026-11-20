import config from "@/content/site-config.json";
import projectData from "@/content/projects.json";
import testimonialData from "@/content/testimonials.json";

export const site = config;
export type Project = (typeof projectData)[number];
export const projects: Project[] = projectData;

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  handle: string;
  avatar: string;
  role?: string;
  company?: string;
  postUrl: string;
  date?: string;
  context: "founder-work" | "studio-work";
  verified: boolean;
};

// Verification is an editorial decision. Incomplete records never reach the public page.
export const testimonials = (testimonialData as Testimonial[]).filter(
  (entry) =>
    entry.verified &&
    entry.quote &&
    entry.author &&
    entry.handle &&
    entry.avatar &&
    /^https:\/\/(x\.com|twitter\.com)\/.+\/status\/\d+/.test(entry.postUrl),
);
export const testimonialPreview =
  process.env.NODE_ENV === "development" &&
  (site.showTestimonialPlaceholders || process.env.TESTIMONIAL_PREVIEW === "1");
export const showTestimonials = testimonials.length > 0 || testimonialPreview;
export const description =
  "A growth studio for startups. We help teams grow through community building, content, and strategy—from shaping your story to bringing people together.";
