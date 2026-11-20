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
          <div className="hero-message">
            <h1 id="hero-title">
              A growth studio
              <br className="desktop-break" /> for <span>startups.</span>
            </h1>
            <p className="hero-copy">
              We help startups grow through community, content, and strategy.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="button button-primary">
                Let’s talk <Arrow diagonal />
              </a>
              <a href="#services" className="underlined-link">
                Explore our services <Arrow />
              </a>
            </div>
          </div>
          <div className="signal-art" aria-hidden="true">
            <span className="signal-orbit orbit-outer" />
            <span className="signal-orbit orbit-middle" />
            <span className="signal-orbit orbit-inner" />
            <div className="signal-art-center">
              <span className="signal-mark"><i /><i /><i /></span>
            </div>
            <span className="signal-point" />
          </div>
          <div className="hero-footnote" aria-hidden="true">
            <span><small>01</small> Community</span>
            <span><small>02</small> Content</span>
            <span><small>03</small> Strategy</span>
          </div>
        </section>
        <div className="container">
          <section id="work" className="section work-section" data-reveal>
            <div className="section-heading">
              <div>
                <span className="eyebrow section-kicker">Selected work / 01</span>
                <h2>Work behind the studio</h2>
                <p>Selected projects led or co-created by our founder.</p>
              </div>
            </div>
            <WorkCarousel />
          </section>
          {showTestimonials && (
            <Testimonials entries={testimonials} preview={testimonialPreview} />
          )}
          <Services />
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
              <span className="eyebrow">Experience</span>
              <h2>Hi, I’m {site.founder.firstName}!</h2>
              <p>
                I’m the founder of {site.brandName}. I work with startups on
                community building, content, and growth strategy. I help teams
                shape their story and bring people together around what they’re
                building.
              </p>
              <p>
                I joined Hyperlane as its first DevRel hire, later moving into
                product and partner engineering. At BuidlGuidl, I helped launch
                developer programs and bring people together to build.
              </p>
              <div className="experience">
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
          <section id="faq" className="section faq-section" data-reveal>
            <div className="faq-intro">
              <span className="eyebrow section-kicker">Good questions / 04</span>
              <h2>A little clarity.</h2>
            </div>
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
            <span className="eyebrow section-kicker">Let’s make a connection / 05</span>
            <h2>Tell us what you're building.</h2>
            <p>Let's find the right way to bring it to market.</p>
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
