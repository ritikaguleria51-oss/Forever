import { Link } from "react-router-dom";
import "./Footer.css";

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/" },
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "Twitter", href: "https://twitter.com/" },
  { name: "GitHub", href: "https://github.com/" },
  { name: "Pinterest", href: "https://www.pinterest.com/" },
  { name: "YouTube", href: "https://www.youtube.com/" },
];

const footerColumns = [
  {
    title: "Links",
    links: [
      { label: "Home", to: "/" },
      { label: "Collections", to: "/collections" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Cart", to: "/cart" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Clothing", to: "/collections" },
      { label: "New arrivals", to: "/collections" },
      { label: "Everyday style", to: "/collections" },
      { label: "Best deals", to: "/collections" },
    ],
  },
  {
    title: "Socials",
    links: socialLinks.map(({ name, href }) => ({ label: name, to: href, external: true })),
  },
  {
    title: "Collections",
    links: [
      { label: "Women", to: "/" },
      { label: "Men", to: "/" },
      { label: "Essentials", to: "/" },
      { label: "Sale", to: "/" },
    ],
  },
];

function SocialIcon({ name }) {
  const iconPaths = {
    Facebook: <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />,
    Instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.8" r="1" className="footer-icon-dot" />
      </>
    ),
    Twitter: <path d="M22 5.9a8 8 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.2 8.2 0 0 1-2.7 1 4.1 4.1 0 0 0-7 3.7 11.7 11.7 0 0 1-8.5-4.3 4.1 4.1 0 0 0 1.3 5.5 4 4 0 0 1-1.9-.5v.1a4.1 4.1 0 0 0 3.3 4 4 4 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.2 8.2 0 0 1 2 18.5a11.6 11.6 0 0 0 6.3 1.8c7.6 0 11.8-6.3 11.8-11.8v-.5A8.4 8.4 0 0 0 22 5.9Z" />,
    GitHub: <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.9.1-.7.4-1.1.6-1.4-2.2-.2-4.5-1.1-4.5-4.8 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.7-2.3 4.6-4.5 4.8.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" />,
    Pinterest: <path d="M12 2.5a9.5 9.5 0 0 0-3.5 18.3c0-.8 0-1.8.2-2.7l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.3 1 .5 1.8 1.5 1.8 1.8 0 3-2.3 3-5 0-2.1-1.4-3.7-4-3.7-2.9 0-4.7 2.2-4.7 4.6 0 .8.2 1.4.6 1.9.2.2.2.3.1.6l-.2.8c-.1.3-.3.4-.6.3-1.3-.5-1.9-1.9-1.9-3.5 0-2.6 2.2-5.8 6.9-5.8 3.7 0 6.1 2.7 6.1 5.6 0 3.9-2.2 6.8-5.4 6.8-1.1 0-2.1-.6-2.4-1.2l-.7 2.8c-.2 1-.7 1.9-1.1 2.6A9.5 9.5 0 1 0 12 2.5Z" />,
    YouTube: <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

export function SocialLinks({ compact = false }) {
  return (
    <div className={`footer-socials${compact ? " footer-socials-compact" : ""}`}>
      {socialLinks.map(({ name, href }) => (
        <a
          aria-label={name}
          href={href}
          key={name}
          rel="noreferrer"
          target="_blank"
        >
          <SocialIcon name={name} />
        </a>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about">
          <Link className="footer-brand" to="/" aria-label="Forever home">
            FOREVER<span aria-hidden="true">.</span>
          </Link>
          <p>
            Discover thoughtfully chosen styles made for everyday life. Find your next favorite
            and enjoy a little more comfort, confidence and joy in what you wear.
          </p>
          <SocialLinks />
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          {footerColumns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map(({ label, to, external }) => (
                  <li key={label}>
                    {external ? (
                      <a href={to} rel="noreferrer" target="_blank">{label}</a>
                    ) : to.startsWith("mailto:") ? (
                      <a href={to}>{label}</a>
                    ) : (
                      <Link to={to}>{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <p>Copyright © {new Date().getFullYear()} Forever — All rights reserved.</p>
        <SocialLinks compact />
      </div>
    </footer>
  );
}

export default Footer;