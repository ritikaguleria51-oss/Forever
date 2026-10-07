import "./About.css";
import aboutImage from "../assest/images/fuorpwlcskoaiznjee2q.png";

const benefits = [
  {
    title: "Expertise",
    description:
      "Years of experience help us bring you thoughtful designs and a smooth shopping experience.",
    icon: (
      <>
        <path d="m12 3 2.2 1.7 2.8-.1.8 2.7 2.2 1.7-1 2.6 1 2.6-2.2 1.7-.8 2.7-2.8-.1L12 20l-2.2-1.7-2.8.1-.8-2.7L4 14l1-2.6-1-2.6 2.2-1.7.8-2.7 2.8.1L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Quality",
    description:
      "We choose quality fabrics and carefully made pieces you can feel good wearing every day.",
    icon: (
      <>
        <path d="M12 3 4.5 6v5.2c0 4.6 3.2 8 7.5 9.8 4.3-1.8 7.5-5.2 7.5-9.8V6L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Customer Service",
    description:
      "Our friendly team is here to help you find your fit and make every order a little easier.",
    icon: (
      <>
        <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 12H3v5h3v-5H4Zm16 0h1v5h-3v-5h2ZM17 18a5 5 0 0 1-5 3h-2" />
      </>
    ),
  },
];

function About() {
  return (
    <main className="about-page">
      <header className="about-heading">
        <h1>ABOUT US</h1>
        <p>We are a team of professionals who are dedicated to providing the best service to our clients.</p>
      </header>

      <section className="about-story" aria-label="Our story">
        <img
          className="about-story-image"
          src={aboutImage}
          alt="A timeless everyday look from our clothing collection"
        />

        <div className="about-story-copy">
          <article>
            <h2>Our Story</h2>
            <p>
              We are a team of professionals dedicated to providing the best service to our clients.
              With over 10 years of experience, our team brings together expertise in marketing,
              design and development. We are passionate about what we do and committed to helping
              our clients achieve their goals.
            </p>
          </article>
          <article>
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide our clients with the best service possible. We are
              committed to helping our clients achieve their goals and grow their businesses.
              Contact us today to learn more about how we can help you succeed.
            </p>
          </article>
          <article>
            <h2>Our Vision</h2>
            <p>
              Our vision is to be a leading provider of marketing, design and development services.
              We are committed to providing the best service possible and helping our clients
              achieve their goals.
            </p>
          </article>
        </div>
      </section>

      <section className="about-benefits" aria-labelledby="about-benefits-title">
        <header className="about-section-heading">
          <h2 id="about-benefits-title">WHY CHOOSE US</h2>
          <p>We are dedicated to providing the best service to our clients.</p>
        </header>

        <div className="about-benefit-list">
          {benefits.map((benefit) => (
            <article className="about-benefit" key={benefit.title}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {benefit.icon}
              </svg>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-newsletter" aria-labelledby="about-newsletter-title">
        <div className="about-newsletter-content">
          <svg className="about-newsletter-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 3h13v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V3Z" />
            <path d="M18 5h2v3a4 4 0 0 1-4 4M4 21h16" />
          </svg>
          <h2 id="about-newsletter-title">Subscribe now &amp; get 20% off</h2>
          <p>Join our mailing list for the latest arrivals, offers and everyday style.</p>
          <div className="about-newsletter-form">
            <label className="about-visually-hidden" htmlFor="about-newsletter-email">
              Your email address
            </label>
            <input
              id="about-newsletter-email"
              type="email"
              placeholder="Enter your email address"
            />
            <button type="button">SUBSCRIBE</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;