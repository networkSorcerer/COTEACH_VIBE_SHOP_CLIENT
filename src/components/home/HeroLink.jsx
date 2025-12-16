function HeroLink({ href, title, subtitle, eyebrow }) {
  return (
    <a
      href={href}
      target="_self"
      aria-label={title}
      className="hero hero-nike hero-full hero-link"
    >
      <div className="hero-overlay">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
    </a>
  );
}

export default HeroLink;

