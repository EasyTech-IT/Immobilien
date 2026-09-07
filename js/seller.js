/* =========================================================
   MAKAAN – SELLER PAGE JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     SOLD / SUCCESS PROPERTIES – START
     ======================================================= */

  const successGrid = document.getElementById("seller-success-grid");

  if (successGrid && typeof Store !== "undefined") {
    const properties = Store.getAll ? Store.getAll() : [];

    const soldProperties = properties
      .filter((property) => {
        const status = String(property.status || "").toLowerCase();

        return (
          status.includes("sold") ||
          status.includes("verkauft") ||
          status.includes("vermarktet")
        );
      })
      .slice(0, 3);

    if (soldProperties.length) {
      successGrid.innerHTML = soldProperties
        .map(createSellerPropertyCard)
        .join("");
    } else {
      successGrid.innerHTML = `
        <div class="seller-empty-state">
          <i class="fa-regular fa-building"></i>

          <h3>
            Erfolgreiche Verkäufe
          </h3>

          <p>
            Hier können später ausgewählte,
            erfolgreich verkaufte Immobilien
            präsentiert werden.
          </p>
        </div>
      `;
    }
  }

  /* =======================================================
     SOLD / SUCCESS PROPERTIES – ENDE
     ======================================================= */

  /* =======================================================
     CONTACT FORM – START
     ======================================================= */

  const sellerForm = document.getElementById("seller-contact-form");

  const sellerMessage = document.getElementById("seller-form-message");

  if (sellerForm) {
    sellerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      /*
       * ===================================================
       * LIVE-BETRIEB
       * ===================================================
       *
       * Hier später Backend / Formspree / Netlify Forms /
       * eigenen API-Endpunkt anschließen.
       *
       * Aktuell wird nur die UI-Erfolgsmeldung angezeigt.
       */

      if (sellerMessage) {
        sellerMessage.style.display = "block";

        sellerMessage.textContent =
          "Vielen Dank. Ihre Anfrage wurde erfasst. Wir melden uns persönlich bei Ihnen.";
      }

      sellerForm.reset();
    });
  }

  /* =======================================================
     CONTACT FORM – ENDE
     ======================================================= */

  /* =======================================================
     SMOOTH SCROLL – START
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =======================================================
     SMOOTH SCROLL – ENDE
     ======================================================= */

  /* =======================================================
     SELLER PROPERTY CARD – START
     ======================================================= */

  function createSellerPropertyCard(property) {
    const image = property.images?.[0] || "img/property-placeholder.jpg";

    const title = property.title || "Immobilie";

    const city = property.city || property.address || "Rhein-Main";

    const type = property.type || "Immobilie";

    const size = property.size ? `${property.size} m²` : "";

    const rooms = property.rooms
      ? `${property.rooms} Zimmer`
      : property.bedrooms
        ? `${property.bedrooms} Schlafzimmer`
        : "";

    return `
      <article class="seller-property-card">

        <a
          href="property-detail.html?id=${encodeURIComponent(property.id)}"
          class="seller-property-image"
        >

          <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(title)}"
            loading="lazy"
          />

          <span class="seller-property-status">
            Erfolgreich verkauft
          </span>

        </a>


        <div class="seller-property-content">

          <span class="seller-property-type">
            ${escapeHTML(type)}
          </span>

          <h3>
            ${escapeHTML(title)}
          </h3>

          <p class="seller-property-location">
            <i class="fa-solid fa-location-dot"></i>
            ${escapeHTML(city)}
          </p>


          <div class="seller-property-meta">

            ${
              size
                ? `
                  <span>
                    <i class="fa-solid fa-ruler-combined"></i>
                    ${escapeHTML(size)}
                  </span>
                `
                : ""
            }

            ${
              rooms
                ? `
                  <span>
                    <i class="fa-regular fa-square"></i>
                    ${escapeHTML(rooms)}
                  </span>
                `
                : ""
            }

          </div>

        </div>

      </article>
    `;
  }

  /* =======================================================
     SELLER PROPERTY CARD – ENDE
     ======================================================= */

  /* =======================================================
     ESCAPE HTML – START
     ======================================================= */

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* =======================================================
     ESCAPE HTML – ENDE
     ======================================================= */
});
