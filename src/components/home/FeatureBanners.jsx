function FeatureBanners({ banners }) {
  if (!banners?.length) return null;
  return (
    <section className="feature-list">
      {banners.map((card) => (
        <a
          key={card.title}
          href={card.href}
          className="feature-hero"
          style={{ backgroundImage: `url(${card.image})` }}
          aria-label={card.title}
        >
          <div className="feature-hero-overlay">
            <h2>{card.title}</h2>
          </div>
        </a>
      ))}
    </section>
  );
}

export default FeatureBanners;

