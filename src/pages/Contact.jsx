import { SocialLinks } from "../Footer";
import contactImage from "../assest/images/fuorpwlcskoaiznjee2q.png";
import "./Contact.css";

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(formData.get("subject"));
    const body = encodeURIComponent(
      `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`
    );

    window.location.href = `mailto:hello@forever.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="contact-page">
      <header className="contact-heading">
        <h1>CONTACT US</h1>
        <p>We are dedicated to providing the best service to our clients.</p>
      </header>

      <section className="contact-content" aria-label="Contact Forever">
        <div className="contact-image-wrap">
          <img
            src={contactImage}
            alt="A look from the Forever everyday collection"
          />
        </div>

        <div className="contact-details">
          <h2>Contact Us</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-visually-hidden" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Name"
              autoComplete="name"
              required
            />

            <label className="contact-visually-hidden" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
            />

            <label className="contact-visually-hidden" htmlFor="contact-subject">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="Subject"
              required
            />

            <label className="contact-visually-hidden" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Message"
              rows="4"
              required
            />

            <button type="submit">Send Message</button>
          </form>

          <div className="contact-information">
            <h2>Customer Care</h2>
            <p>Questions about an order, sizing or returns? We’re here to help.</p>
            <a href="mailto:hello@forever.com">hello@forever.com</a>
            <SocialLinks />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;