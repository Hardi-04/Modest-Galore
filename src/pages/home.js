export function HomePage() {
  return `
    <section id="hero" class="hero">
      <div class="hero-bg"></div>
      <div class="hero-inner">
        <div class="hero-content">
          <h1 class="hero-title">MODEST GALORE</h1>
          <p class="hero-tagline">Hey, we Make Modest Fashion for Everyday, Discover.</p>
          <div class="hero-buttons">
            <a href="/shop" class="btn btn-solid">Shop Now</a>
            <a href="#gallery" class="btn btn-outline">View Our Gallery</a>
          </div>
          <div class="hero-reviews">
            <div class="hero-avatars" aria-hidden="true">
              <span class="avatar"></span>
              <span class="avatar"></span>
              <span class="avatar"></span>
            </div>
            <p>1,230+ Happy Customer</p>
          </div>
        </div>
        <div class="hero-image-wrap">
          <img src="/images/hero.png" alt="Modest fashion" class="hero-image" />
          <span class="hero-badge">40% OFF</span>
        </div>
      </div>
    </section>

    <section id="about" class="about">
      <div class="about-inner">
        <div class="about-text-block">
          <h2 class="section-title">MODEST GALORE</h2>
          <p class="about-subtitle">Modest Women</p>
          <p class="about-text">We believe in beauty that doesn’t shout—grace that speaks softly. Modest Galore is for those who choose refinement over excess. Timeless modest wear for the modern soul.</p>
          <div class="about-lines" aria-hidden="true">
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="about-image-wrap">
          <img src="/images/da0e02115c4bc4936d139daf41e4df26.jpg" alt="About Modest Galore" class="about-image" />
        </div>
      </div>
    </section>

    <section id="categories" class="categories">
      <div class="categories-inner">
        <a href="/category/Everyday%20Abayas" class="category-card">
          <img src="/images/ba554afb0c2cdba91299e0a2000d7ab7.jpg" alt="Everyday Abayas" />
          <div class="category-overlay">
            <span class="category-name">EVERYDAY ABAYAS</span>
            <span class="category-watch"><span class="play-icon">▶</span> Shop</span>
          </div>
        </a>
        <a href="/category/Luxury%20Abayas" class="category-card">
          <img src="/images/fc6cf8a75b82482ff62243e9e3fafc51.jpg" alt="Luxury Abayas" />
          <div class="category-overlay">
            <span class="category-name">LUXURY ABAYAS</span>
            <span class="category-watch"><span class="play-icon">▶</span> Shop</span>
          </div>
        </a>
        <a href="/category/Eid%20Collection" class="category-card">
          <img src="/images/b6a9d67831eec9bdceeb21b9519703bc.jpg" alt="Eid Collection" />
          <div class="category-overlay">
            <span class="category-name">EID COLLECTION</span>
            <span class="category-watch"><span class="play-icon">▶</span> Shop</span>
          </div>
        </a>
        <a href="/category/New%20Arrivals" class="category-card">
          <img src="/images/d77e1257b3736c6ab9d8dc4e3888ef48.jpg" alt="New Arrivals" />
          <div class="category-overlay">
            <span class="category-name">NEW ARRIVALS</span>
            <span class="category-watch"><span class="play-icon">▶</span> Shop</span>
          </div>
        </a>
      </div>
    </section>

    <section id="reviews" class="reviews">
      <h2 class="section-title section-title--center">CUSTOMER REVIEW</h2>
      <div class="reviews-grid">
        <article class="review-card">
          <div class="review-avatar" aria-hidden="true"></div>
          <h3 class="review-name">Maria Khan</h3>
          <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
          <p class="review-text">This Text Will Show Your Text. This Text Will Show Your Text. This Text Will Show Your Text. That Was The Story.</p>
        </article>
        <article class="review-card">
          <div class="review-avatar" aria-hidden="true"></div>
          <h3 class="review-name">Maria Khan</h3>
          <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
          <p class="review-text">This Text Will Show Your Text. This Text Will Show Your Text. This Text Will Show Your Text. That Was The Story.</p>
        </article>
        <article class="review-card">
          <div class="review-avatar" aria-hidden="true"></div>
          <h3 class="review-name">Maria Khan</h3>
          <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
          <p class="review-text">This Text Will Show Your Text. This Text Will Show Your Text. This Text Will Show Your Text. That Was The Story.</p>
        </article>
      </div>
      <div class="reviews-cta">
        <a href="/about" class="btn btn-light-blue">Learn More</a>
      </div>
    </section>

    <section id="gallery" class="gallery">
      <h2 class="section-title">GALLERY</h2>
      <div class="gallery-grid">
        <div class="gallery-item gallery-item--large">
          <img src="/images/4fb9a5378b6b8f886d0784a7894261be.jpg" alt="Modest Galore collection" />
        </div>
        <div class="gallery-item">
          <img src="/images/da0e02115c4bc4936d139daf41e4df26.jpg" alt="Abaya style" />
        </div>
        <div class="gallery-item">
          <img src="/images/ba554afb0c2cdba91299e0a2000d7ab7.jpg" alt="Everyday abayas" />
        </div>
        <div class="gallery-item">
          <img src="/images/fc6cf8a75b82482ff62243e9e3fafc51.jpg" alt="Luxury abayas" />
        </div>
        <div class="gallery-item">
          <img src="/images/65d87207ba15ee741eba31a7dca18fe2.jpg" alt="Modest fashion" />
        </div>
      </div>
    </section>

    ${contactSection()}
  `;
}

export function contactSection() {
  return `
    <section id="contact" class="contact">
      <div class="contact-shape" aria-hidden="true"></div>
      <h2 class="contact-title">CONTACT</h2>
      <div class="contact-buttons">
        <a href="https://wa.me/233256459524" target="_blank" rel="noopener noreferrer" class="btn btn-contact">Message Us On Whatsapp</a>
        <a href="https://wa.me/233256459524" target="_blank" rel="noopener noreferrer" class="btn btn-contact">Contact Us</a>
      </div>
      <p class="muted" style="position:relative; z-index:1; max-width: 60ch; margin: 1.25rem auto 0;">
        We reply fastest on WhatsApp.
      </p>
    </section>
  `;
}

