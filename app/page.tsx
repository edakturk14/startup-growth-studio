import Image from "next/image";
import experience from "@/content/experience.json";
import faq from "@/content/faq.json";
import {
  site,
  showTestimonials,
  testimonials,
  testimonialPreview,
} from "@/lib/content";
import { Header, Wordmark } from "@/components/header";
import { Arrow } from "@/components/icons";
import { CopyEmail } from "@/components/contact";
import { WorkCarousel } from "@/components/work-carousel";
import { Testimonials } from "@/components/testimonials";
import { ScrollReveals } from "@/components/motion";
import { Services } from "@/components/services";

export default function Home() {
  return (
    <div id="top">
      <Header showTestimonials={showTestimonials} />
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <h1 id="hero-title">
            A growth studio for
            <br className="desktop-break" /> technical startups.
          </h1>
          <p className="hero-copy">
            We turn complex ideas into clear stories that help people understand
            your product and start using it.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button button-primary">
              Let’s talk <Arrow diagonal />
            </a>
            <a href="#services" className="underlined-link">
              Explore our services <Arrow />
            </a>
          </div>
        </section>
        <div className="container">
          <section id="work" className="section work-section" data-reveal>
            <div className="section-heading">
              <div>
                <h2>Work behind the studio</h2>
                <p>Selected projects led or co-created by our founder.</p>
              </div>
            </div>
            <WorkCarousel />
          </section>
          {showTestimonials && (
            <Testimonials entries={testimonials} preview={testimonialPreview} />
          )}
          <section id="about" className="section about-section" data-reveal>
            <div className="founder-image">
              <Image
                src={site.founder.image}
                alt={`${site.founder.name} speaking at Cryptİst`}
                fill
                sizes="(max-width: 700px) 240px, 300px"
              />
            </div>
            <div className="about-copy">
              <span className="eyebrow">About the studio</span>
              <h2>Hi, I’m {site.founder.firstName}!</h2>
              <p>
                I’m the founder of {site.brandName}. I make technical products
                easier to understand, use, and adopt.
                I work with technical teams on product communications, technical
                content, developer experience, and community building.
              </p>
              <p>
                I joined Hyperlane as its first DevRel hire, later moving into
                product and partner engineering. At BuidlGuidl, I helped launch
                developer programs and bring people together to build.
              </p>
              <div className="experience">
                <span className="eyebrow">Experience</span>
                <ul aria-label="Professional experience">
                  {experience.map((company) => (
                    <li key={company.name}>
                      <Image
                        src={company.logo}
                        alt={company.wordmark ? company.name : ""}
                        width={company.width}
                        height={company.height}
                        className="experience-logo"
                      />
                      {!company.wordmark && <span>{company.name}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <Services />
          <section id="faq" className="section faq-section" data-reveal>
            <h2>FAQs</h2>
            <div className="faq-list">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="faq-item"
                  name="collaboration"
                >
                  <summary>
                    <h3>{item.question}</h3>
                    <span className="faq-icon" aria-hidden="true" />
                  </summary>
                  <p className="faq-answer">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section id="contact" className="section contact-section" data-reveal>
            <h2>Tell us what you’re building.</h2>
            <p>Let’s find the right way to bring it to market.</p>
            <a
              href={site.bookingUrl || `mailto:${site.email}`}
              className="button button-primary"
            >
              Start a conversation <Arrow diagonal />
            </a>
            <CopyEmail />
          </section>
          <footer className="site-footer">
            <a href="#top" aria-label={`${site.fullBrandName}, back to top`}>
              <Wordmark />
            </a>
            <div className="footer-location">
              <span className="location-dot" />
              {site.location}
            </div>
            {Object.entries(site.socialLinks).length > 0 && (
              <nav aria-label="Social links" className="footer-socials">
                {Object.entries(site.socialLinks).map(([label, url]) => (
                  <a
                    key={label}
                    href={String(url)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            )}
            <span className="footer-name">{site.fullBrandName}</span>
          </footer>
        </div>
      </main>
      <ScrollReveals />
    </div>
  );
}
