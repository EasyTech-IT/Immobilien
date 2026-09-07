/* =========================================================
   MAKAAN – MAIN JAVASCRIPT
   ========================================================= */

/* =========================================================
   GLOBAL – INITIALISIERUNG – START
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  ensureGlobalFooter();
  initLegalModal();
  initNavigation();
  initTypeGrid();
  initFeaturedTabs();
  initHeroSearch();

  // Homepage-Erweiterungen
  initHomepageReveal();
  initValuationForm();
  initNewsletterForm();
});

/* =========================================================
   GLOBAL – FOOTER – START
   FIX: Footer auf allen öffentlichen Seiten synchronisiert
   ========================================================= */

function ensureGlobalFooter() {
  const existingFooter = document.querySelector("footer");
  if (!existingFooter || document.body.dataset.globalFooterReady === "true")
    return;

  existingFooter.outerHTML = `
    <footer class="makaan-footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-brand">
            <a href="index.html" class="footer-logo"><span class="footer-logo-mark">M</span><span class="footer-logo-text">Makaan</span></a>
            <p class="footer-tagline">Immobilien sind Vertrauenssache.</p>
            <p class="footer-description">Persönliche Immobilienberatung, fundierte Marktanalyse und eine klare Strategie für Ihren Immobilienverkauf.</p>
            <a href="propertyanalyse.html" class="footer-main-cta">Immobilie bewerten <i class="fa-solid fa-arrow-right"></i></a>
          </div>
          <div class="footer-column"><h3>Leistungen</h3><ul>
            <li><a href="immobilie-verkaufen.html">Immobilie verkaufen</a></li>
            <li><a href="propertyanalyse.html">Immobilienanalyse</a></li>
            <li><a href="propertyanalyse.html">Immobilienbewertung</a></li>
            <li><a href="property-list.html">Immobilie kaufen</a></li>
            <li><a href="leistungen.html">Alle Leistungen</a></li>
          </ul></div>
          <div class="footer-column"><h3>Immobilien</h3><ul>
            <li><a href="property-list.html">Immobilienangebote</a></li>
            <li><a href="property-list.html?type=Wohnung">Wohnungen</a></li>
            <li><a href="property-list.html?type=Haus">Häuser</a></li>
            <li><a href="property-list.html?type=Grundstück">Grundstücke</a></li>
            <li><a href="property-list.html?type=Büro">Gewerbeimmobilien</a></li>
          </ul></div>
          <div class="footer-column"><h3>Unternehmen</h3><ul>
            <li><a href="about.html">Über uns</a></li>
            <li><a href="contact.html">Kontakt</a></li>
            <li><a href="propertyanalyse.html">Property Analyse</a></li>
            <li><a href="immobilie-verkaufen.html">Für Eigentümer</a></li>
            <li><a href="contact.html">Karriere</a></li>
            <li><a href="admin/login.html">Admin Login</a></li>
          </ul></div>
          <div class="footer-column footer-contact"><h3>Kontakt</h3>
            <a href="tel:+49123455678" class="footer-contact-item"><span class="footer-contact-icon"><i class="fa-solid fa-phone"></i></span><span><small>Telefon</small>+49 123 455 678</span></a>
            <a href="mailto:info@makaan-immobilien.de" class="footer-contact-item"><span class="footer-contact-icon"><i class="fa-regular fa-envelope"></i></span><span><small>E-Mail</small>info@makaan-immobilien.de</span></a>
            <div class="footer-contact-item"><span class="footer-contact-icon"><i class="fa-solid fa-location-dot"></i></span><span><small>Standort</small>Rhein-Main-Gebiet</span></div>
          </div>
        </div>
        <div class="footer-region"><div class="footer-region-heading"><span>Immobilienmakler für</span><i class="fa-solid fa-location-dot"></i></div><p>Frankfurt am Main · Bad Homburg · Oberursel · Kronberg · Königstein · Friedberg · Bad Vilbel · Karben · Offenbach · Eschborn · Bad Soden · Schwalbach · Neu-Isenburg · Dreieich · Hanau · Rüsselsheim am Main · Wiesbaden · Mainz · Darmstadt · Rhein-Main-Gebiet</p></div>
        <div class="footer-bottom"><div class="footer-copyright">© 2026 Makaan Immobilien</div><div class="footer-legal"><a href="impressum.html" data-legal="impressum">Impressum</a><a href="datenschutz.html" data-legal="datenschutz">Datenschutz</a><a href="agb.html" data-legal="agb">AGB</a></div><div class="footer-social"><a href="https://www.instagram.com/" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a><a href="https://www.facebook.com/" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a><a href="https://www.linkedin.com/" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a></div></div>
      </div>
    </footer>`;
  document.body.dataset.globalFooterReady = "true";
}

/* =========================================================
   GLOBAL – RECHTLICHES POP-UP – START
   FIX: Impressum, Datenschutz und AGB zentral geöffnet
   ========================================================= */

function initLegalModal() {
  if (document.querySelector("[data-legal-modal]")) return;

  const content = {
    impressum: {
      title: "Impressum",
      body: `<p><strong>Makaan Immobilien</strong></p><p>Rhein-Main-Gebiet<br>Deutschland</p><p>Telefon: <a href="tel:+49123455678">+49 123 455 678</a><br>E-Mail: <a href="mailto:info@makaan-immobilien.de">info@makaan-immobilien.de</a></p><p>Verantwortlich für den Inhalt gemäß den geltenden gesetzlichen Vorschriften ist der Betreiber dieser Website.</p>`,
    },
    datenschutz: {
      title: "Datenschutz",
      body: `<p>Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir verarbeiten personenbezogene Daten nur, soweit dies für den Betrieb dieser Website, die Bearbeitung Ihrer Anfrage oder aufgrund einer gesetzlichen Verpflichtung erforderlich ist.</p><h3>Kontaktanfragen</h3><p>Wenn Sie uns per Formular, E-Mail oder Telefon kontaktieren, verwenden wir Ihre Angaben ausschließlich zur Bearbeitung Ihres Anliegens und zur weiteren Kommunikation.</p><h3>Ihre Rechte</h3><p>Sie können jederzeit Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung oder Widerspruch gegen die Verarbeitung Ihrer Daten verlangen.</p><p>Kontakt: <a href="mailto:info@makaan-immobilien.de">info@makaan-immobilien.de</a></p>`,
    },
    agb: {
      title: "Allgemeine Geschäftsbedingungen",
      body: `<p>Diese allgemeinen Hinweise gelten für die Nutzung der Makaan-Website und die Kontaktaufnahme zu unseren Immobilienangeboten und Beratungsleistungen.</p><h3>Informationen und Angebote</h3><p>Die Inhalte und Immobilienangaben werden nach bestem Wissen bereitgestellt. Eine verbindliche Vereinbarung kommt erst durch eine separate schriftliche Vereinbarung zustande.</p><h3>Anfragen</h3><p>Eine Anfrage über die Website ist unverbindlich und stellt noch keinen Maklervertrag oder Kaufvertrag dar.</p><h3>Haftung</h3><p>Für die Vollständigkeit und Aktualität externer Inhalte übernehmen wir keine Verantwortung. Gesetzliche Rechte bleiben unberührt.</p>`,
    },
  };

  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="legal-modal" data-legal-modal aria-hidden="true"><div class="legal-modal-backdrop" data-legal-close></div><section class="legal-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title"><div class="legal-modal-head"><span class="legal-modal-kicker">Makaan Immobilien</span><button type="button" class="legal-modal-close" data-legal-close aria-label="Fenster schließen"><i class="fa-solid fa-xmark"></i></button></div><div class="legal-modal-body"><h2 id="legal-modal-title"></h2><div data-legal-content></div></div></section></div>`,
  );

  const modal = document.querySelector("[data-legal-modal]");
  const title = modal.querySelector("#legal-modal-title");
  const body = modal.querySelector("[data-legal-content]");

  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("legal-modal-open");
  }

  document.addEventListener("click", (event) => {
    const legalLink = event.target.closest("a[data-legal]");
    if (legalLink) {
      event.preventDefault();
      const item = content[legalLink.dataset.legal];
      if (!item) return;
      title.textContent = item.title;
      body.innerHTML = item.body;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("legal-modal-open");
      modal.querySelector(".legal-modal-close").focus();
    }
    if (event.target.closest("[data-legal-close]")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

/* =========================================================
   GLOBAL – RECHTLICHES POP-UP – ENDE
   ========================================================= */

/* =========================================================
   GLOBAL – FOOTER – ENDE
   ========================================================= */

/* =========================================================
   GLOBAL – INITIALISIERUNG – ENDE
   ========================================================= */

/* =========================================================
   NAVIGATION – START
   ========================================================= */

function initNavigation() {
  const header = document.querySelector("#siteHeader");
  const navToggle = document.querySelector("#navToggle");
  const nav = document.querySelector("#mainNav");

  syncGlobalNavigation(document.querySelector("#mainNav, .main-navigation"));
  syncGlobalHeaderCTA();
  if (!header) return;

  syncGlobalNavigation(nav);

  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 30) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }

      if (currentScrollY > lastScrollY && currentScrollY > 180) {
        header.classList.add("is-hidden");
      } else {
        header.classList.remove("is-hidden");
      }

      lastScrollY = currentScrollY;
    },
    { passive: true },
  );

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");

      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }
}

/* =========================================================
   GLOBAL – NAVIGATION – SYNCHRONISIERUNG – START
   FIX: Einheitliche Menüziele und aktive Seite
   ========================================================= */

function syncGlobalNavigation(nav) {
  if (!nav) return;
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = [
    ["index.html", "Home"],
    ["property-list.html", "Immobilien"],
    ["property-sell.html", "Verkaufen"],
    ["leistungen.html", "Leistungen"],
    ["about.html", "Über uns"],
    ["contact.html", "Kontakt"],
  ];
  nav.innerHTML = links
    .map(
      ([href, label]) =>
        `<a href="${href}"${currentPage === href ? ' class="active"' : ""}>${label}</a>`,
    )
    .join("");
}

function syncGlobalHeaderCTA() {
  const cta = document.querySelector(".header-cta .btn");
  if (!cta) return;
  cta.href = "propertyanalyse.html";
  cta.innerHTML = '<i class="fa-regular fa-calendar"></i> Kostenlose Analyse';
}

/* =========================================================
   GLOBAL – NAVIGATION – SYNCHRONISIERUNG – ENDE
   ========================================================= */

/* =========================================================
   NAVIGATION – ENDE
   ========================================================= */

/* =========================================================
   IMMOBILIEN – PROPERTY CARD – START
   ========================================================= */

function createPropertyCard(property) {
  if (!property) return "";

  const image =
    property.image || property.images?.[0] || "img/property-placeholder.jpg";

  const title = property.title || property.name || "Immobilie";

  const location = property.location || property.city || "";

  const price = property.priceFormatted || property.price || "";

  const type = property.type || property.category || "";

  const status = property.status || "";

  const id = property.id || property.slug || "";

  return `
    <article class="property-card" data-property-id="${escapeHTML(id)}">

      <a
        href="property-detail.html?id=${encodeURIComponent(id)}"
        class="property-card-image"
        aria-label="${escapeHTML(title)} ansehen"
      >
        <img
          src="${escapeHTML(image)}"
          alt="${escapeHTML(title)}"
          loading="lazy"
        />

        ${
          status
            ? `<span class="property-status">${escapeHTML(status)}</span>`
            : ""
        }

        ${type ? `<span class="property-type">${escapeHTML(type)}</span>` : ""}
      </a>

      <div class="property-card-content">

        <div class="property-card-price">
          ${escapeHTML(price)}
        </div>

        <h3 class="property-card-title">
          <a href="property-detail.html?id=${encodeURIComponent(id)}">
            ${escapeHTML(title)}
          </a>
        </h3>

        ${
          location
            ? `
              <p class="property-card-location">
                <i class="fa-solid fa-location-dot"></i>
                ${escapeHTML(location)}
              </p>
            `
            : ""
        }

        <div class="property-card-meta">

          ${
            property.rooms
              ? `
                <span>
                  <i class="fa-solid fa-door-open"></i>
                  ${escapeHTML(property.rooms)} Zi.
                </span>
              `
              : ""
          }

          ${
            property.area
              ? `
                <span>
                  <i class="fa-solid fa-ruler-combined"></i>
                  ${escapeHTML(property.area)} m²
                </span>
              `
              : ""
          }

          ${
            property.year
              ? `
                <span>
                  <i class="fa-regular fa-calendar"></i>
                  ${escapeHTML(property.year)}
                </span>
              `
              : ""
          }

        </div>

      </div>

    </article>
  `;
}

/* =========================================================
   IMMOBILIEN – PROPERTY CARD – ENDE
   ========================================================= */

/* =========================================================
   IMMOBILIEN – PROPERTY TYPE GRID – START
   ========================================================= */

function initTypeGrid() {
  const container = document.querySelector("[data-type-grid]");

  if (!container) return;

  if (typeof PROPERTY_TYPES === "undefined" || !Array.isArray(PROPERTY_TYPES)) {
    return;
  }

  container.innerHTML = PROPERTY_TYPES.map((type) => {
    const name = type.key;
    const slug = name;
    const icon = type.icon;
    const count = Store.countByType(name);

    return `
      <a
        href="property-list.html?type=${encodeURIComponent(slug)}"
        class="type-card"
      >

        <div class="type-card-top"><div class="type-icon"><img src="${escapeHTML(icon)}" alt="" loading="lazy"></div><span class="type-arrow"><i class="fa-solid fa-arrow-up-right"></i></span></div>
        <div class="type-card-content"><strong>${escapeHTML(name)}</strong><span>${count} ${count === 1 ? "Immobilie" : "Immobilien"}</span></div>

      </a>
    `;
  }).join("");
}

/* =========================================================
   IMMOBILIEN – PROPERTY TYPE GRID – ENDE
   ========================================================= */

/* =========================================================
   IMMOBILIEN – FEATURED TABS – START
   ========================================================= */

function createPropertyCard(property) {
  const id = property.id || "";
  const title = property.title || "Immobilie";
  const image = property.images?.[0] || "img/property-1.jpg";
  const specs =
    property.type === "Büro"
      ? `<span><i class="fa-solid fa-ruler-combined"></i>${property.size} m²</span><span><i class="fa-solid fa-bath"></i><b>${property.bathrooms}</b> Bäder</span>`
      : `<span><i class="fa-solid fa-ruler-combined"></i>${property.size} m²</span><span><i class="fa-solid fa-bed"></i><b>${property.bedrooms}</b> Zimmer</span><span><i class="fa-solid fa-bath"></i><b>${property.bathrooms}</b> Bäder</span>`;

  return `<article class="p-card" data-property-id="${escapeHTML(id)}">
    <a href="property-detail.html?id=${encodeURIComponent(id)}" class="p-media" aria-label="${escapeHTML(title)} ansehen">
      <img src="${escapeHTML(image)}" alt="${escapeHTML(title)}" loading="lazy">
      <div class="p-tags"><span class="tag ${property.status === "rent" ? "tag-rent" : "tag-sale"}">${statusLabel(property.status)}</span></div>
      <span class="p-media-arrow"><i class="fa-solid fa-arrow-up-right"></i></span>
    </a>
    <div class="p-body">
      <div class="p-type-badge"><i class="fa-solid fa-building"></i>${escapeHTML(property.type)}</div>
      <div class="p-price">${formatPrice(property)}</div>
      <a class="p-title" href="property-detail.html?id=${encodeURIComponent(id)}">${escapeHTML(title)}</a>
      <div class="p-addr"><i class="fa-solid fa-location-dot"></i><span>${escapeHTML(property.address)}, ${escapeHTML(property.city)}</span></div>
      <div class="p-specs">${specs}</div>
    </div>
  </article>`;
}

function propertyCardHTML(property) {
  return createPropertyCard(property);
}

function initFeaturedTabs() {
  const section = document.querySelector("[data-featured]");
  if (!section || typeof Store === "undefined") return;

  const grid = section.querySelector(".listing-grid");
  const tabs = [...section.querySelectorAll("[data-tab]")];
  if (!grid || !tabs.length) return;

  function render(filter) {
    let properties = Store.getAll();
    if (filter === "featured")
      properties = properties.filter((property) => property.featured);
    if (filter === "sale")
      properties = properties.filter((property) => property.status === "sale");
    if (filter === "rent")
      properties = properties.filter((property) => property.status === "rent");
    grid.innerHTML = properties.slice(0, 6).map(createPropertyCard).join("");
  }

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      render(tab.dataset.tab || "featured");
    }),
  );

  render(section.querySelector("[data-tab].active")?.dataset.tab || "featured");
}

/* =========================================================
   HERO – IMMOBILIEN-SUCHE – START
   ========================================================= */

function initHeroSearch() {
  const form = document.querySelector("[data-hero-search]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    ["city", "type", "status"].forEach((name) => {
      const value = form.querySelector(`[name="${name}"]`)?.value.trim();
      if (value) params.set(name, value);
    });
    window.location.href = `property-list.html${params.toString() ? `?${params}` : ""}`;
  });
}

/* =========================================================
   HERO – IMMOBILIEN-SUCHE – ENDE
   ========================================================= */

/* =========================================================
   HOMEPAGE – SCROLL REVEAL – START
   ========================================================= */

function initHomepageReveal() {
  const items = document.querySelectorAll("[data-reveal]");

  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => {
      item.classList.add("is-visible");
    });

    return;
  }

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => {
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;

    observer.observe(item);
  });
}

/* =========================================================
   HOMEPAGE – SCROLL REVEAL – ENDE
   ========================================================= */

/* =========================================================
   HOMEPAGE – IMMOBILIENBEWERTUNG – START
   ========================================================= */

function initValuationForm() {
  const form = document.querySelector("[data-valuation-form]");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const type =
      form.querySelector("[name='valuationType']")?.value.trim() || "";

    const location =
      form.querySelector("[name='valuationLocation']")?.value.trim() || "";

    const params = new URLSearchParams();

    if (type) {
      params.set("immobilientyp", type);
    }

    if (location) {
      params.set("ort", location);
    }

    params.set("anliegen", "Immobilienbewertung");

    showToast("Ihre Bewertungsanfrage ist vorbereitet.");

    window.setTimeout(() => {
      window.location.href = "contact.html?" + params.toString();
    }, 450);
  });
}

/* =========================================================
   HOMEPAGE – IMMOBILIENBEWERTUNG – ENDE
   ========================================================= */

/* =========================================================
   HOMEPAGE – NEWSLETTER – START
   ========================================================= */

function initNewsletterForm() {
  const form = document.querySelector("[data-newsletter-form]");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    showToast("Danke für Ihre Anmeldung.");

    form.reset();
  });
}

/* =========================================================
   HOMEPAGE – NEWSLETTER – ENDE
   ========================================================= */

/* =========================================================
   TOAST / BENACHRICHTIGUNG – START
   ========================================================= */

function showToast(message) {
  if (!message) return;

  let toast = document.querySelector("[data-toast]");

  if (!toast) {
    toast = document.createElement("div");

    toast.className = "toast";
    toast.dataset.toast = "";

    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <i class="fa-solid fa-circle-check"></i>
    <span>${escapeHTML(message)}</span>
  `;

  toast.classList.add("is-visible");

  window.clearTimeout(toast._timeout);

  toast._timeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

/* =========================================================
   TOAST / BENACHRICHTIGUNG – ENDE
   ========================================================= */

/* =========================================================
   UTILITY – HTML ESCAPING – START
   ========================================================= */

function escapeHTML(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   UTILITY – HTML ESCAPING – ENDE
   ========================================================= */
