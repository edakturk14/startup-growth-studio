import Image from "next/image";
import services from "@/content/services.json";
import experience from "@/content/experience.json";
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
          <section
            id="services"
            className="section services-section"
            data-reveal
          >
            <div className="section-heading">
              <h2>How we help</h2>
              <span className="eyebrow section-index">01 / Services</span>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className="service"
                  data-reveal
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <span className="service-index">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </section>
          <section id="work" className="section work-section" data-reveal>
            <div className="section-heading">
              <div>
                <h2>Work behind the studio</h2>
                <p>Selected projects led or co-created by our founder.</p>
              </div>
              <span className="eyebrow section-index">02 / Selected work</span>
            </div>
            <WorkCarousel />
          </section>
          {showTestimonials && (
            <Testimonials entries={testimonials} preview={testimonialPreview} />
          )}
          <section className="section partnership-section" data-reveal>
            <span className="eyebrow">Ways to work together</span>
            <h2>
              A focused project.
              <br className="mobile-break" /> An ongoing partnership.
            </h2>
            <div className="partnership-grid">
              <p>
                <span className="small-arrow" aria-hidden="true">
                  ↗
                </span>
                For a specific launch, content series, or onboarding review.
              </p>
              <p>
                <span className="small-arrow" aria-hidden="true">
                  ↗
                </span>
                For consistent support across content, DevRel, and growth.
              </p>
            </div>
          </section>
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
                I make technical products easier to understand, use, and adopt.
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
