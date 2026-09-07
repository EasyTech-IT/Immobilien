/* =========================================================
   LIST.JS – INHALTSVERZEICHNIS
   =========================================================

   01. STATE
   02. DOM
   03. HELPERS
   04. FILTERING
   05. SORTING
   06. PROPERTY CARD
   07. RENDER
   08. PAGINATION
   09. SEARCH
   10. QUICK FILTERS
   11. FAVORITES
   12. MOBILE FILTER
   13. SEARCH PROFILE MODAL
   14. RESET
   15. INIT
   ========================================================= */

/* =========================================================
   01. STATE – START
   ========================================================= */

const PropertyList = {
  properties: [],
  filteredProperties: [],

  currentPage: 1,
  perPage: 6,

  filters: {
    city: "",
    types: [],
    status: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    sort: "newest",
  },
};

/* 01. STATE – ENDE */

/* =========================================================
   02. DOM – START
   ========================================================= */

const listGrid = document.querySelector("[data-list-grid]");

const resultsCount = document.querySelector("[data-results-count]");

const resultsDescription = document.querySelector("[data-results-description]");

const pagination = document.querySelector("[data-pagination]");

const emptyState = document.querySelector("[data-empty-state]");

const filterForm = document.querySelector("#filterForm");

const sortSelect = document.querySelector("#f-sort");

const heroSearchForm = document.querySelector("#heroSearchForm");

const heroCity = document.querySelector("#heroCity");

const heroType = document.querySelector("#heroType");

const heroPrice = document.querySelector("#heroPrice");

const propertyFilter = document.querySelector("#propertyFilter");

const profileModal = document.querySelector("#profileModal");

const profileForm = document.querySelector("#profileForm");

/* 02. DOM – ENDE */

/* =========================================================
   03. HELPERS – START
   ========================================================= */

function getProperties() {
  if (typeof Store !== "undefined" && typeof Store.getAll === "function") {
    return Store.getAll();
  }

  return [];
}

function formatNumber(number) {
  return new Intl.NumberFormat("de-DE").format(Number(number || 0));
}

function getPrice(property) {
  const price = formatNumber(property.price);

  if (property.status === "rent") {
    return `${price} € <span>/ Monat</span>`;
  }

  return `${price} €`;
}

function getStatusLabel(status) {
  return status === "rent" ? "Zur Miete" : "Zum Verkauf";
}

function getPropertyImage(property) {
  if (Array.isArray(property.images) && property.images.length) {
    return property.images[0];
  }

  return "img/property-1.jpg";
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* 03. HELPERS – ENDE */

/* =========================================================
   04. FILTERING – START
   ========================================================= */

function applyFilters() {
  let result = [...PropertyList.properties];

  const filters = PropertyList.filters;

  /* Standort */

  if (filters.city.trim()) {
    const search = filters.city.trim().toLowerCase();

    result = result.filter((property) => {
      const searchable = [
        property.city,
        property.address,
        property.zip,
        property.title,
        property.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(search);
    });
  }

  /* Immobilientyp */

  if (filters.types.length) {
    result = result.filter((property) => filters.types.includes(property.type));
  }

  /* Status */

  if (filters.status) {
    result = result.filter((property) => property.status === filters.status);
  }

  /* Mindestpreis */

  if (filters.priceMin !== "") {
    const min = Number(filters.priceMin);

    result = result.filter((property) => Number(property.price) >= min);
  }

  /* Maximalpreis */

  if (filters.priceMax !== "") {
    const max = Number(filters.priceMax);

    result = result.filter((property) => Number(property.price) <= max);
  }

  /* Zimmer */

  if (filters.bedrooms !== "") {
    const rooms = Number(filters.bedrooms);

    result = result.filter((property) => Number(property.bedrooms) >= rooms);
  }

  PropertyList.filteredProperties = result;

  applySorting();
}

/* 04. FILTERING – ENDE */

/* =========================================================
   05. SORTING – START
   ========================================================= */

function applySorting() {
  const sort = PropertyList.filters.sort;

  const result = PropertyList.filteredProperties;

  if (sort === "newest") {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (sort === "price-asc") {
    result.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sort === "price-desc") {
    result.sort((a, b) => Number(b.price) - Number(a.price));
  }

  if (sort === "size-desc") {
    result.sort((a, b) => Number(b.size) - Number(a.size));
  }

  PropertyList.currentPage = 1;

  render();
}

/* 05. SORTING – ENDE */

/* =========================================================
   06. PROPERTY CARD – START
   ========================================================= */

function createPropertyCard(property) {
  const image = getPropertyImage(property);

  const title = escapeHTML(property.title);

  const city = escapeHTML(property.city);

  const type = escapeHTML(property.type);

  const address = escapeHTML(property.address || "");

  const status = getStatusLabel(property.status);

  const price = getPrice(property);

  return `
    <article
      class="property-card"
      data-property-id="${escapeHTML(property.id)}"
    >

      <div class="property-card-image">

        <img
          src="${escapeHTML(image)}"
          alt="${title}"
          loading="lazy"
        />

        <div class="property-card-overlay"></div>

        ${
          property.featured
            ? `
              <span class="property-badge">
                Exklusiv
              </span>
            `
            : ""
        }

        <span class="property-status">
          ${status}
        </span>

        <button
          type="button"
          class="property-favorite"
          data-favorite="${escapeHTML(property.id)}"
          aria-label="Immobilie merken"
        >
          <i class="fa-regular fa-heart"></i>
        </button>

      </div>


      <div class="property-card-body">

        <div class="property-location">

          <i class="fa-solid fa-location-dot"></i>

          <span>
            ${city}
            ${address ? ` · ${address}` : ""}
          </span>

        </div>


        <h3 class="property-card-title">
          ${title}
        </h3>


        <div
          class="property-card-price"
        >
          ${price}
        </div>


        <div class="property-specs">

          <div class="property-spec">

            <i class="fa-solid fa-ruler-combined"></i>

            <span>
              ${formatNumber(property.size)} m²
            </span>

          </div>


          ${
            Number(property.bedrooms) > 0
              ? `
                <div class="property-spec">

                  <i class="fa-solid fa-bed"></i>

                  <span>
                    ${property.bedrooms} Zimmer
                  </span>

                </div>
              `
              : ""
          }


          <div class="property-spec">

            <i class="fa-solid fa-bath"></i>

            <span>
              ${property.bathrooms || 0}
            </span>

          </div>

        </div>


        <div class="property-card-footer">

          <span class="property-type">
            ${type}
          </span>

          <a
            href="property-detail.html?id=${encodeURIComponent(property.id)}"
            class="property-detail-link"
          >
            Details ansehen
            <i class="fa-solid fa-arrow-right"></i>
          </a>

        </div>

      </div>

    </article>
  `;
}

/* 06. PROPERTY CARD – ENDE */

/* =========================================================
   07. RENDER – START
   ========================================================= */

function render() {
  const properties = PropertyList.filteredProperties;

  if (!properties.length) {
    listGrid.innerHTML = "";

    emptyState.hidden = false;

    resultsCount.textContent = "0 Immobilien";

    if (pagination) {
      pagination.innerHTML = "";
    }

    return;
  }

  emptyState.hidden = true;

  const total = properties.length;

  const totalPages = Math.ceil(total / PropertyList.perPage);

  if (PropertyList.currentPage > totalPages) {
    PropertyList.currentPage = totalPages;
  }

  const start = (PropertyList.currentPage - 1) * PropertyList.perPage;

  const end = start + PropertyList.perPage;

  const visible = properties.slice(start, end);

  listGrid.innerHTML = visible.map(createPropertyCard).join("");

  resultsCount.textContent = `${total} ${total === 1 ? "Immobilie" : "Immobilien"}`;

  if (resultsDescription) {
    if (total === 0) {
      resultsDescription.textContent =
        "Keine Immobilien entsprechen Ihrer aktuellen Suche.";
    } else {
      resultsDescription.textContent = `Wir haben ${total} passende ${
        total === 1 ? "Immobilie" : "Immobilien"
      } für Sie gefunden.`;
    }
  }

  renderPagination(totalPages);

  updateFavorites();
}

/* 07. RENDER – ENDE */

/* =========================================================
   08. PAGINATION – START
   ========================================================= */

function renderPagination(totalPages) {
  if (!pagination) {
    return;
  }

  if (totalPages <= 1) {
    pagination.innerHTML = "";

    return;
  }

  let html = "";

  for (let page = 1; page <= totalPages; page++) {
    html += `
      <button
        type="button"
        class="${page === PropertyList.currentPage ? "active" : ""}"
        data-page="${page}"
      >
        ${page}
      </button>
    `;
  }

  pagination.innerHTML = html;
}

/* 08. PAGINATION – ENDE */

/* =========================================================
   09. SEARCH – START
   ========================================================= */

if (heroSearchForm) {
  heroSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    PropertyList.filters.city = heroCity.value.trim();

    PropertyList.filters.types = heroType.value ? [heroType.value] : [];

    PropertyList.filters.priceMax = heroPrice.value;

    const activeTab = document.querySelector(".search-tab.active");

    PropertyList.filters.status = activeTab ? activeTab.dataset.statusTab : "";

    syncFilterForm();

    applyFilters();

    document.querySelector(".property-main")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

/* 09. SEARCH – ENDE */

/* =========================================================
   10. QUICK FILTERS – START
   ========================================================= */

document.addEventListener("click", (event) => {
  const typeButton = event.target.closest("[data-quick-type]");

  const statusButton = event.target.closest("[data-quick-status]");

  const resetButton = event.target.closest("[data-reset-all]");

  if (typeButton) {
    resetFilters(false);

    PropertyList.filters.types = [typeButton.dataset.quickType];

    syncFilterForm();
    applyFilters();

    return;
  }

  if (statusButton) {
    resetFilters(false);

    PropertyList.filters.status = statusButton.dataset.quickStatus;

    syncFilterForm();
    applyFilters();

    return;
  }

  if (resetButton) {
    resetFilters(true);
  }
});

/* Search tabs */

document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-status-tab]");

  if (!tab) {
    return;
  }

  document.querySelectorAll(".search-tab").forEach((button) => {
    button.classList.remove("active");
  });

  tab.classList.add("active");
});

/* 10. QUICK FILTERS – ENDE */

/* =========================================================
   11. FAVORITES – START
   ========================================================= */

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("makaan_favorites") || "[]");
  } catch {
    return [];
  }
}

function setFavorites(favorites) {
  localStorage.setItem("makaan_favorites", JSON.stringify(favorites));
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-favorite]");

  if (!button) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const id = button.dataset.favorite;

  const favorites = getFavorites();

  const index = favorites.indexOf(id);

  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }

  setFavorites(favorites);

  updateFavorites();
});

function updateFavorites() {
  const favorites = getFavorites();

  document.querySelectorAll("[data-favorite]").forEach((button) => {
    const id = button.dataset.favorite;

    const active = favorites.includes(id);

    button.classList.toggle("active", active);

    button.innerHTML = active
      ? `<i class="fa-solid fa-heart"></i>`
      : `<i class="fa-regular fa-heart"></i>`;
  });
}

/* 11. FAVORITES – ENDE */

/* =========================================================
   12. MOBILE FILTER – START
   ========================================================= */

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-open-filter]")) {
    propertyFilter?.classList.add("open");

    document.body.style.overflow = "hidden";
  }

  if (event.target.closest("[data-close-filter]")) {
    propertyFilter?.classList.remove("open");

    document.body.style.overflow = "";
  }
});

/* 12. MOBILE FILTER – ENDE */

/* =========================================================
   13. SEARCH PROFILE MODAL – START
   ========================================================= */

function openProfileModal() {
  if (!profileModal) {
    return;
  }

  profileModal.classList.add("open");

  profileModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeProfileModal() {
  if (!profileModal) {
    return;
  }

  profileModal.classList.remove("open");

  profileModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-open-profile]")) {
    openProfileModal();
  }

  if (event.target.closest("[data-close-profile]")) {
    closeProfileModal();
  }
});

if (profileForm) {
  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = profileForm.querySelector('button[type="submit"]');

    submitButton.innerHTML = `
          <i class="fa-solid fa-check"></i>
          Suchprofil gespeichert
        `;

    submitButton.disabled = true;

    setTimeout(() => {
      closeProfileModal();

      profileForm.reset();

      submitButton.innerHTML = `
            Suchprofil speichern
            <i class="fa-solid fa-arrow-right"></i>
          `;

      submitButton.disabled = false;
    }, 1500);
  });
}

/* ESC */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProfileModal();

    propertyFilter?.classList.remove("open");

    document.body.style.overflow = "";
  }
});

/* 13. SEARCH PROFILE MODAL – ENDE */

/* =========================================================
   14. RESET – START
   ========================================================= */

function resetFilters(renderNow = true) {
  PropertyList.filters = {
    city: "",
    types: [],
    status: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    sort: "newest",
  };

  PropertyList.currentPage = 1;

  syncFilterForm();

  document.querySelectorAll(".search-tab").forEach((tab, index) => {
    tab.classList.toggle("active", index === 0);
  });

  if (renderNow) {
    applyFilters();
  }
}

function syncFilterForm() {
  if (!filterForm) {
    return;
  }

  const city = filterForm.querySelector('[name="city"]');

  if (city) {
    city.value = PropertyList.filters.city;
  }

  filterForm.querySelectorAll('[name="type"]').forEach((input) => {
    input.checked = PropertyList.filters.types.includes(input.value);
  });

  filterForm.querySelectorAll('[name="status"]').forEach((input) => {
    input.checked = input.value === PropertyList.filters.status;
  });

  const priceMin = filterForm.querySelector('[name="priceMin"]');

  const priceMax = filterForm.querySelector('[name="priceMax"]');

  if (priceMin) {
    priceMin.value = PropertyList.filters.priceMin;
  }

  if (priceMax) {
    priceMax.value = PropertyList.filters.priceMax;
  }

  filterForm.querySelectorAll('[name="bedrooms"]').forEach((input) => {
    input.checked = input.value === PropertyList.filters.bedrooms;
  });

  if (sortSelect) {
    sortSelect.value = PropertyList.filters.sort;
  }
}

/* 14. RESET – ENDE */

/* =========================================================
   15. FILTER EVENTS – START
   ========================================================= */

if (filterForm) {
  filterForm.addEventListener("input", () => {
    readFilterForm();

    applyFilters();
  });

  filterForm.addEventListener("change", () => {
    readFilterForm();

    applyFilters();
  });
}

function readFilterForm() {
  const formData = new FormData(filterForm);

  PropertyList.filters.city = formData.get("city") || "";

  PropertyList.filters.types = formData.getAll("type");

  PropertyList.filters.status = formData.get("status") || "";

  PropertyList.filters.priceMin = formData.get("priceMin") || "";

  PropertyList.filters.priceMax = formData.get("priceMax") || "";

  PropertyList.filters.bedrooms = formData.get("bedrooms") || "";

  PropertyList.filters.sort = sortSelect?.value || "newest";
}

/* Pagination */

document.addEventListener("click", (event) => {
  const pageButton = event.target.closest("[data-page]");

  if (!pageButton) {
    return;
  }

  PropertyList.currentPage = Number(pageButton.dataset.page);

  render();

  document.querySelector(".property-main")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

/* Sort */

if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    PropertyList.filters.sort = sortSelect.value;

    applyFilters();
  });
}

/* 15. FILTER EVENTS – ENDE */

/* =========================================================
   16. INIT – START
   ========================================================= */

function initPropertyList() {
  PropertyList.properties = getProperties();

  PropertyList.filteredProperties = [...PropertyList.properties];

  syncFilterForm();

  applyFilters();
}

/* =========================================================
   GLOBAL – INIT
   ========================================================= */

document.addEventListener("DOMContentLoaded", initPropertyList);
