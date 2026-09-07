/* =========================================================
   IMMOBILIEN DETAILSEITE
   PREMIUM DETAIL LOGIC
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-detail-root]");

  if (!root) return;

  /* =======================================================
     URL / PROPERTY – START
  ======================================================= */

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const property =
    id && typeof Store !== "undefined" ? Store.getById(id) : null;

  /* =======================================================
     PROPERTY NOT FOUND – START
  ======================================================= */

  if (!property) {
    root.innerHTML = `
      <section class="property-main-section">
        <div class="container">

          <div class="detail-empty-state">

            <h2>
              Immobilie nicht gefunden
            </h2>

            <p>
              Diese Immobilie existiert nicht mehr
              oder wurde entfernt.
            </p>

            <a
              href="property-list.html"
              class="btn btn-primary"
            >
              Zur Immobilienübersicht
            </a>

          </div>

        </div>
      </section>
    `;

    document.title = "Immobilie nicht gefunden — Makaan";

    return;
  }

  /* =======================================================
     PAGE META – START
  ======================================================= */

  document.title = `${property.title} — Makaan`;

  renderDetail(property);

  renderRelated(property);

  setupFavorite(property);

  setupGallery(property);

  /* =======================================================
     PAGE META – ENDE
  ======================================================= */
});

/* =========================================================
   RENDER DETAIL – START
   ========================================================= */

function renderDetail(property) {
  const p = property;

  /* =======================================================
     BREADCRUMB
  ======================================================= */

  const crumbTitle = document.querySelector("[data-crumb-title]");

  if (crumbTitle) {
    crumbTitle.textContent = p.title;
  }

  /* =======================================================
     PAGE TITLE
  ======================================================= */

  const pageTitle = document.querySelector("[data-page-title]");

  if (pageTitle) {
    pageTitle.textContent = p.title;
  }

  /* =======================================================
     ADDRESS
  ======================================================= */

  const address = document.querySelector("[data-detail-addr]");

  if (address) {
    address.textContent = `${p.address || ""}, ${p.zip || ""} ${p.city || ""}`
      .replace(/^,\s*/, "")
      .trim();
  }

  /* =======================================================
     LOCATION TITLE
  ======================================================= */

  const locationTitle = document.querySelector("[data-location-title]");

  if (locationTitle) {
    locationTitle.textContent = `${p.city || "Standort"}`;
  }

  /* =======================================================
     TYPE
  ======================================================= */

  const type = document.querySelector("[data-detail-type]");

  if (type) {
    type.textContent = p.type || "Immobilie";
  }

  /* =======================================================
     STATUS
  ======================================================= */

  const status = document.querySelector("[data-detail-status]");

  if (status) {
    const isRent = String(p.status).toLowerCase() === "rent";

    status.innerHTML = `
      <span class="tag ${isRent ? "tag-rent" : "tag-sale"}">
        ${isRent ? "Zur Miete" : "Zum Verkauf"}
      </span>
    `;
  }

  /* =======================================================
     PRICE
  ======================================================= */

  const price = document.querySelector("[data-detail-price]");

  if (price) {
    price.innerHTML = formatPrice(p);
  }

  /* =======================================================
     PRICE / M²
  ======================================================= */

  const priceSquare = document.querySelector("[data-price-square]");

  if (priceSquare) {
    if (p.price && p.size && Number(p.size) > 0) {
      const numericPrice = Number(String(p.price).replace(/[^\d]/g, ""));

      const squareMeterPrice = numericPrice / Number(p.size);

      priceSquare.textContent = `${Math.round(squareMeterPrice).toLocaleString("de-DE")} €/m²`;
    } else {
      priceSquare.textContent = "Auf Anfrage";
    }
  }

  /* =======================================================
     DESCRIPTION
  ======================================================= */

  const description = document.querySelector("[data-detail-desc]");

  if (description) {
    const text =
      p.description ||
      "Weitere Informationen zu dieser Immobilie erhalten Sie gerne persönlich.";

    description.innerHTML = escapeHTML(text)
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>");

    if (!description.innerHTML.startsWith("<p>")) {
      description.innerHTML = `<p>${description.innerHTML}</p>`;
    }
  }

  /* =======================================================
     PROPERTY FACTS
  ======================================================= */

  renderFacts(p);

  renderInformation(p);

  renderEnergy(p);

  renderFeatures(p);

  renderAgent(p);
}

/* =========================================================
   PROPERTY FACTS – START
   ========================================================= */

function renderFacts(p) {
  const wrap = document.querySelector("[data-spec-strip]");

  if (!wrap) return;

  const facts = [
    {
      icon: "fa-ruler-combined",
      value: p.size ? `${p.size} m²` : "—",
      label: "Wohnfläche",
    },

    {
      icon: "fa-door-open",
      value: p.bedrooms ?? "—",
      label: "Zimmer",
    },

    {
      icon: "fa-bath",
      value: p.bathrooms ?? "—",
      label: "Badezimmer",
    },

    {
      icon: "fa-calendar",
      value: p.yearBuilt ?? "—",
      label: "Baujahr",
    },
  ];

  wrap.innerHTML = facts
    .map(
      (fact) => `
        <div class="property-fact">

          <i class="fa-solid ${fact.icon}"></i>

          <strong>
            ${escapeHTML(String(fact.value))}
          </strong>

          <span>
            ${escapeHTML(fact.label)}
          </span>

        </div>
      `,
    )
    .join("");
}

/* =========================================================
   INFORMATION GRID – START
   ========================================================= */

function renderInformation(p) {
  const fields = {
    "[data-info-type]": p.type || "—",

    "[data-info-year]": p.yearBuilt || "—",

    "[data-info-size]": p.size ? `${p.size} m²` : "—",

    "[data-info-rooms]": p.bedrooms || "—",

    "[data-info-bathrooms]": p.bathrooms || "—",

    "[data-info-land]": p.landSize ? `${p.landSize} m²` : "—",
  };

  Object.entries(fields).forEach(([selector, value]) => {
    const element = document.querySelector(selector);

    if (element) {
      element.textContent = value;
    }
  });
}

/* =========================================================
   FEATURES – START
   ========================================================= */

function renderFeatures(p) {
  const wrap = document.querySelector("[data-feature-list]");

  if (!wrap) return;

  const features = Array.isArray(p.features) ? p.features : [];

  if (!features.length) {
    wrap.innerHTML = `
      <div class="property-feature">
        <i class="fa-solid fa-circle-info"></i>
        <span>
          Ausstattung auf Anfrage.
        </span>
      </div>
    `;

    return;
  }

  wrap.innerHTML = features
    .map(
      (feature) => `
          <div class="property-feature">

            <i class="fa-solid fa-check"></i>

            <span>
              ${escapeHTML(feature)}
            </span>

          </div>
        `,
    )
    .join("");
}

/* =========================================================
   ENERGY – START
   ========================================================= */

function renderEnergy(p) {
  const wrap = document.querySelector("[data-energy]");

  if (!wrap) return;

  const energy = p.energy || {};

  const values = {
    Energieausweis: energy.certificate || "Auf Anfrage",

    Energiebedarf: energy.consumption || "Auf Anfrage",

    Effizienzklasse: energy.class || "Auf Anfrage",
  };

  wrap.innerHTML = Object.entries(values)
    .map(
      ([label, value]) => `
          <div>

            <span>
              ${escapeHTML(label)}
            </span>

            <strong>
              ${escapeHTML(String(value))}
            </strong>

          </div>
        `,
    )
    .join("");
}

/* =========================================================
   AGENT – START
   ========================================================= */

function renderAgent(p) {
  const wrap = document.querySelector("[data-agent]");

  if (!wrap) return;

  const agent = p.agent || {};

  const name = agent.name || "Makaan Immobilien";

  const role = agent.role || "Immobilienberatung";

  const phone = agent.phone || "0123 455 678";

  const email = agent.email || "info@makaan-immobilien.de";

  const photo = agent.photo || "img/team-1.jpg";

  wrap.innerHTML = `

    <img
      src="${escapeAttribute(photo)}"
      alt="${escapeAttribute(name)}"
    >

    <div>

      <h4>
        ${escapeHTML(name)}
      </h4>

      <span class="role">
        ${escapeHTML(role)}
      </span>

      <div class="agent-contact">

        <span>
          <i class="fa-solid fa-phone"></i>
          ${escapeHTML(phone)}
        </span>

        <span>
          <i class="fa-regular fa-envelope"></i>
          ${escapeHTML(email)}
        </span>

      </div>

    </div>

  `;
}

/* =========================================================
   GALLERY – START
   ========================================================= */

function setupGallery(p) {
  const gallery = document.querySelector("[data-gallery]");

  if (!gallery) return;

  const images =
    p.images && p.images.length ? p.images : ["img/property-1.jpg"];

  gallery.innerHTML = `

    <div class="gallery-main">

      <img
        src="${escapeAttribute(images[0])}"
        alt="${escapeAttribute(p.title)}"
        data-main-img
      >

      <div class="gallery-count">
        1 / ${images.length}
      </div>

    </div>

    <div class="gallery-side">

      ${images
        .slice(1, 3)
        .map(
          (image, index) => `
              <img
                src="${escapeAttribute(image)}"
                alt="${escapeAttribute(p.title)}"
                data-gallery-thumb
                data-index="${index + 1}"
              >
            `,
        )
        .join("")}

    </div>

  `;

  const mainImage = gallery.querySelector("[data-main-img]");

  const count = gallery.querySelector(".gallery-count");

  gallery.querySelectorAll("[data-gallery-thumb]").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = Number(thumb.dataset.index);

      if (!images[index]) return;

      mainImage.src = images[index];

      count.textContent = `${index + 1} / ${images.length}`;
    });
  });
}

/* =========================================================
   FAVORITE – START
   ========================================================= */

function setupFavorite(p) {
  const button = document.querySelector("[data-favorite]");

  if (!button) return;

  const storageKey = `makaan-favorite-${p.id}`;

  const saved = localStorage.getItem(storageKey) === "true";

  if (saved) {
    button.classList.add("active");

    button.innerHTML = `<i class="fa-solid fa-heart"></i>`;
  }

  button.addEventListener("click", () => {
    const active = button.classList.toggle("active");

    localStorage.setItem(storageKey, String(active));

    button.innerHTML = active
      ? `<i class="fa-solid fa-heart"></i>`
      : `<i class="fa-regular fa-heart"></i>`;
  });
}

/* =========================================================
   RELATED PROPERTIES – START
   ========================================================= */

function renderRelated(current) {
  const wrap = document.querySelector("[data-related]");

  if (!wrap) return;

  if (typeof Store === "undefined") return;

  const related = Store.getAll()
    .filter(
      (property) =>
        String(property.id) !== String(current.id) &&
        (property.city === current.city || property.type === current.type),
    )
    .slice(0, 3);

  if (!related.length) {
    const section = wrap.closest(".similar-properties");

    if (section) {
      section.style.display = "none";
    }

    return;
  }

  wrap.innerHTML = related.map(propertyCardHTML).join("");
}

/* =========================================================
   CONTACT FORM – START
   ========================================================= */

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-contact-form]");

  if (!form) return;

  event.preventDefault();

  const message = form.querySelector("[data-form-msg]");

  if (!message) return;

  message.textContent =
    "Vielen Dank für Ihre Anfrage. Wir melden uns schnellstmöglich persönlich bei Ihnen.";

  message.className = "form-msg show ok";

  const submitButton = form.querySelector("button[type=submit]");

  if (submitButton) {
    submitButton.disabled = true;

    submitButton.innerHTML = `
        <span>
          Anfrage gesendet
        </span>

        <i class="fa-solid fa-check"></i>
      `;
  }
});

/* =========================================================
   ESCAPE HELPERS – START
   ========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value);
}

/* =========================================================
   IMMOBILIEN DETAILSEITE – ENDE
   ========================================================= */
