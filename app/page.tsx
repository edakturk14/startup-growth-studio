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
          <div className="hero-main">
            <p className="hero-eyebrow"><span /> Independent growth studio</p>
            <h1 id="hero-title">
              A growth studio<br /> <span>for startups.</span>
            </h1>
            <p className="hero-copy">
              We help startups grow through community, content, and strategy.
              Good ideas deserve to find their people.
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
          <div className="growth-study" aria-hidden="true">
            <span className="study-caption">The way we grow</span>
            <svg viewBox="0 0 440 350" fill="none">
              <circle className="growth-ring ring-one" cx="165" cy="135" r="96" />
              <circle className="growth-ring ring-two" cx="275" cy="135" r="96" />
              <circle className="growth-ring ring-three" cx="220" cy="225" r="96" />
              <path className="growth-spark" d="M220 144C220 167 214 177 194 177C214 177 220 187 220 210C220 187 226 177 246 177C226 177 220 167 220 144Z" />
              <text x="112" y="136" textAnchor="middle">Community</text>
              <text x="330" y="136" textAnchor="middle">Content</text>
              <text x="220" y="284" textAnchor="middle">Strategy</text>
            </svg>
            <p>Different disciplines.<br /><span>One shared direction.</span></p>
          </div>
          <div className="hero-footnote">
            <span>Rooted in community. Made for what’s next.</span>
            <a href="#work">A closer look <Arrow /></a>
          </div>
        </section>
        <div className="container">
          <section id="work" className="section work-section" data-reveal>
            <div className="section-heading">
              <div>
                <span className="section-kicker">01 / Selected work</span>
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
              <span className="founder-caption">Eda Akturk <span>Founder</span></span>
            </div>
            <div className="about-copy">
              <span className="section-kicker">03 / A personal approach</span>
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
          <section id="faq" className="section faq-section" data-reveal>
            <div className="faq-intro">
              <span className="section-kicker">04 / Before we begin</span>
              <h2>A few good questions.</h2>
              <p>Every collaboration starts<br />with a conversation.</p>
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
            <span className="section-kicker">Have something in mind?</span>
            <h2>Big ideas.<br /><span>Let’s grow them together.</span></h2>
            <p>Tell us what you’re building. We’ll take it from there.</p>
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
