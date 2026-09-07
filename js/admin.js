/* =========================================================
  ADMIN.JS – INHALTSVERZEICHNIS
  =========================================================
  ADMIN – LOGIN SECTION
  ADMIN – DASHBOARD SECTION
  ADMIN – IMMOBILIEN-TABELLE SECTION
  ADMIN – MODALS SECTION
  ========================================================= */

/* =========================================================
  ADMIN – LOGIN / DASHBOARD / IMMOBILIEN-TABELLE / MODALS – START
  Hinweis: Der Login ist eine reine Frontend-Demo (kein echtes
  Backend). Für den produktiven Einsatz mit mehreren Nutzern
  wird eine serverseitige Authentifizierung benötigt.
  ========================================================= */

const ADMIN_AUTH_KEY = "makaan_admin_auth";
const ADMIN_PASSCODE = "makaan2026";

function requireAdminAuth() {
  if (sessionStorage.getItem(ADMIN_AUTH_KEY) !== "true") {
    window.location.href = "login.html";
  }
}

function adminLogout() {
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
  window.location.href = "login.html";
}

/* Data stores image paths root-relative (e.g. "img/property-1.jpg") so they
   resolve correctly from every page. Admin pages live one level down in
   /admin/, so relative (non-data-URL, non-absolute) paths need a "../" prefix
   only when displayed inside the admin UI. */
function adminImgSrc(src) {
  if (!src) return "";
  if (
    src.startsWith("data:") ||
    src.startsWith("http") ||
    src.startsWith("../")
  )
    return src;
  return "../" + src;
}

/* Small helper: get a named field within a form container by [name=...]. */
function fld(container, name) {
  return container.querySelector(`[name="${name}"]`);
}

/* ---------------- Login page ---------------- */
function initLoginForm() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;
  if (sessionStorage.getItem(ADMIN_AUTH_KEY) === "true") {
    window.location.href = "dashboard.html";
    return;
  }
  const passcodeInput = fld(form, "passcode");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errEl = document.querySelector("[data-login-error]");
    if (passcodeInput.value === ADMIN_PASSCODE) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
      window.location.href = "dashboard.html";
    } else {
      errEl.textContent = "Falscher Zugangscode. Bitte erneut versuchen.";
      errEl.classList.add("show");
      passcodeInput.focus();
    }
  });
}

/* ---------------- Dashboard page ---------------- */
let uploadedImages = [];
let editingId = null;

function initDashboard() {
  requireAdminAuth();

  renderStats();
  renderTable();

  document
    .querySelector("[data-logout]")
    .addEventListener("click", adminLogout);
  document
    .querySelector("[data-add-btn]")
    .addEventListener("click", () => openModal());
  document
    .querySelectorAll("[data-modal-close]")
    .forEach((btn) => btn.addEventListener("click", closeModal));
  document
    .querySelector("[data-property-form]")
    .addEventListener("submit", handleFormSubmit);
  document
    .querySelector("[data-admin-search]")
    .addEventListener("input", renderTable);
  document
    .querySelector("[data-image-input]")
    .addEventListener("change", handleImageUpload);

  document.querySelector("[data-reset-demo]").addEventListener("click", () => {
    if (confirm("Alle Änderungen verwerfen und Demo-Daten wiederherstellen?")) {
      Store.resetToSeed();
      renderStats();
      renderTable();
      showToast("Demo-Daten wurden zurückgesetzt.");
    }
  });
}

function renderStats() {
  const all = Store.getAll();
  const stats = document.querySelector("[data-stats]");
  stats.innerHTML = `
    <div class="stat-card"><span>Immobilien gesamt</span><b>${all.length}</b></div>
    <div class="stat-card"><span>Zum Verkauf</span><b>${all.filter((p) => p.status === "sale").length}</b></div>
    <div class="stat-card"><span>Zur Miete</span><b>${all.filter((p) => p.status === "rent").length}</b></div>
    <div class="stat-card"><span>Hervorgehoben</span><b>${all.filter((p) => p.featured).length}</b></div>`;
}

function renderTable() {
  const tbody = document.querySelector("[data-admin-tbody]");
  const search = (
    document.querySelector("[data-admin-search]").value || ""
  ).toLowerCase();
  let list = Store.getAll();
  if (search) {
    list = list.filter((p) =>
      (p.title + p.city + p.type).toLowerCase().includes(search),
    );
  }
  document.querySelector("[data-table-count]").textContent =
    `${list.length} Eintrag${list.length === 1 ? "" : "e"}`;

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state">Keine Immobilien gefunden.</div></td></tr>`;
    return;
  }

  tbody.innerHTML = list
    .map(
      (p) => `
    <tr>
      <td>
        <div class="row-thumb">
          <img src="${adminImgSrc(p.images[0])}" alt="">
          <div><strong>${escapeHTML(p.title)}</strong><span>${escapeHTML(p.city)}</span></div>
        </div>
      </td>
      <td>${escapeHTML(p.type)}</td>
      <td><span class="status-pill ${p.status === "rent" ? "rent" : "sale"}">${statusLabel(p.status)}</span></td>
      <td>${formatPriceShort(p)}</td>
      <td>${p.size} m²</td>
      <td>
        <div class="row-actions">
          <a class="icon-btn" href="../property-detail.html?id=${p.id}" target="_blank" title="Ansehen">👁</a>
          <button type="button" class="icon-btn" title="Bearbeiten" data-edit="${p.id}">✎</button>
          <button type="button" class="icon-btn danger" title="Löschen" data-delete="${p.id}">🗑</button>
        </div>
      </td>
    </tr>`,
    )
    .join("");

  tbody
    .querySelectorAll("[data-edit]")
    .forEach((btn) =>
      btn.addEventListener("click", () => openModal(btn.dataset.edit)),
    );
  tbody
    .querySelectorAll("[data-delete]")
    .forEach((btn) =>
      btn.addEventListener("click", () => handleDelete(btn.dataset.delete)),
    );
}

function handleDelete(id) {
  const p = Store.getById(id);
  if (!p) return;
  if (
    confirm(
      `„${p.title}“ wirklich löschen? Dies kann nicht rückgängig gemacht werden.`,
    )
  ) {
    Store.remove(id);
    renderStats();
    renderTable();
    showToast("Immobilie gelöscht.");
  }
}

function openModal(id) {
  editingId = id || null;
  const modal = document.querySelector("[data-modal]");
  const form = document.querySelector("[data-property-form]");
  form.reset();
  uploadedImages = [];

  document.querySelector("[data-modal-title]").textContent = editingId
    ? "Immobilie bearbeiten"
    : "Neue Immobilie";

  if (editingId) {
    const p = Store.getById(editingId);
    fld(form, "title").value = p.title;
    fld(form, "type").value = p.type;
    fld(form, "status").value = p.status;
    fld(form, "price").value = p.price;
    fld(form, "city").value = p.city;
    fld(form, "address").value = p.address;
    fld(form, "zip").value = p.zip;
    fld(form, "size").value = p.size;
    fld(form, "bedrooms").value = p.bedrooms;
    fld(form, "bathrooms").value = p.bathrooms;
    fld(form, "yearBuilt").value = p.yearBuilt;
    fld(form, "description").value = p.description;
    fld(form, "features").value = (p.features || []).join(", ");
    fld(form, "featured").checked = !!p.featured;
    uploadedImages = [...(p.images || [])];
  }
  renderImageThumbs();
  modal.classList.add("open");
}

function closeModal() {
  document.querySelector("[data-modal]").classList.remove("open");
  editingId = null;
}

function handleImageUpload(e) {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      uploadedImages.push(ev.target.result);
      renderImageThumbs();
    };
    reader.readAsDataURL(file);
  });
  e.target.value = "";
}

function renderImageThumbs() {
  const row = document.querySelector("[data-image-thumbs]");
  row.innerHTML = uploadedImages
    .map(
      (src, i) => `
    <div class="img-thumb">
      <img src="${adminImgSrc(src)}" alt="">
      <button type="button" data-remove-img="${i}">✕</button>
    </div>`,
    )
    .join("");
  row.querySelectorAll("[data-remove-img]").forEach((btn) => {
    btn.addEventListener("click", () => {
      uploadedImages.splice(parseInt(btn.dataset.removeImg, 10), 1);
      renderImageThumbs();
    });
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

  if (!uploadedImages.length) {
    uploadedImages = ["img/property-1.jpg"];
  }

  const existingAgent = editingId
    ? (Store.getById(editingId) || {}).agent
    : null;

  const record = {
    title: fld(form, "title").value.trim(),
    type: fld(form, "type").value,
    status: fld(form, "status").value,
    price: parseFloat(fld(form, "price").value) || 0,
    city: fld(form, "city").value.trim(),
    address: fld(form, "address").value.trim(),
    zip: fld(form, "zip").value.trim(),
    size: parseFloat(fld(form, "size").value) || 0,
    bedrooms: parseInt(fld(form, "bedrooms").value, 10) || 0,
    bathrooms: parseInt(fld(form, "bathrooms").value, 10) || 0,
    yearBuilt:
      parseInt(fld(form, "yearBuilt").value, 10) || new Date().getFullYear(),
    description: fld(form, "description").value.trim(),
    features: fld(form, "features")
      .value.split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    featured: fld(form, "featured").checked,
    images: uploadedImages,
    agent: existingAgent || {
      name: "Sofia Brandt",
      role: "Immobilienmaklerin",
      phone: "030 1234 567",
      email: "sofia.brandt@makaan-immobilien.de",
      photo: "img/team-1.jpg",
    },
  };

  if (editingId) {
    Store.update(editingId, record);
    showToast("Immobilie aktualisiert.");
  } else {
    Store.add(record);
    showToast("Immobilie hinzugefügt.");
  }

  closeModal();
  renderStats();
  renderTable();
}

/* =========================================================
  ADMIN – LOGIN / DASHBOARD / IMMOBILIEN-TABELLE / MODALS – ENDE
  ========================================================= */
