/* =========================================================
   IMMOBILIENBEWERTUNG – WIZARD / NAVIGATION – START
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("valuationForm");
  const mobileButton = document.getElementById("mobileMenuButton");
  const mobileNavigation = document.getElementById("mobileNavigation");

  if (mobileButton && mobileNavigation) {
    mobileButton.addEventListener("click", () => {
      const isOpen = mobileNavigation.classList.toggle("is-open");
      mobileButton.setAttribute("aria-expanded", String(isOpen));
      mobileButton.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
      mobileButton.innerHTML = `<i class="fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}"></i>`;
    });

    mobileNavigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNavigation.classList.remove("is-open");
        mobileButton.setAttribute("aria-expanded", "false");
        mobileButton.setAttribute("aria-label", "Menü öffnen");
        mobileButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  if (!form) return;

  const steps = [...form.querySelectorAll(".form-step")];
  const progressSteps = [...document.querySelectorAll("[data-progress-step]")];
  const propertyOptions = [...form.querySelectorAll("[data-property-type]")];
  const propertyType = document.getElementById("propertyType");
  const propertyTypeError = document.getElementById("propertyTypeError");
  const progressBar = document.getElementById("progressBar");
  const stepLabel = document.getElementById("stepLabel");
  const progressPercent = document.getElementById("progressPercent");
  const successScreen = document.getElementById("successScreen");
  let currentStep = 1;

  const requiredFields = {
    2: ["postalCode", "city", "street"],
    4: ["firstName", "lastName", "email"],
  };

  function setFieldError(field, visible) {
    const group = field.closest(".form-group");
    if (group) group.classList.toggle("invalid", visible);
  }

  function validateStep(stepNumber) {
    if (stepNumber === 1) {
      const valid = Boolean(propertyType.value);
      propertyTypeError.classList.toggle("visible", !valid);
      return valid;
    }

    const names = requiredFields[stepNumber] || [];
    let valid = true;
    names.forEach((name) => {
      const field = form.elements[name];
      const value = field?.value.trim() || "";
      const emailValid = name !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const fieldValid = Boolean(value) && emailValid;
      setFieldError(field, !fieldValid);
      if (!fieldValid) valid = false;
    });
    return valid;
  }

  function updateSummary() {
    const values = (name) => form.elements[name]?.value.trim() || "—";
    document.getElementById("summaryPropertyType").textContent = values("propertyType");
    document.getElementById("summaryLocation").textContent = [values("postalCode"), values("city")].filter((value) => value !== "—").join(" ") || "—";
    document.getElementById("summaryLivingArea").textContent = values("livingArea") === "—" ? "—" : `${values("livingArea")} m²`;
    document.getElementById("summaryLandArea").textContent = values("landArea") === "—" ? "—" : `${values("landArea")} m²`;
    document.getElementById("summaryRooms").textContent = values("rooms");
    document.getElementById("summaryYear").textContent = values("yearBuilt");
  }

  function showStep(stepNumber) {
    currentStep = stepNumber;
    steps.forEach((step) => step.classList.toggle("active", Number(step.dataset.step) === stepNumber));
    progressSteps.forEach((step) => {
      const number = Number(step.dataset.progressStep);
      step.classList.toggle("active", number === stepNumber);
      step.classList.toggle("complete", number < stepNumber);
    });
    const percentage = Math.round((stepNumber / steps.length) * 100);
    progressBar.style.width = `${percentage}%`;
    stepLabel.textContent = `Schritt ${stepNumber} von ${steps.length}`;
    progressPercent.textContent = `${percentage} %`;
    if (stepNumber === 4) updateSummary();
    form.closest(".valuation-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  propertyOptions.forEach((option) => {
    option.addEventListener("click", () => {
      propertyOptions.forEach((item) => item.classList.remove("selected"));
      option.classList.add("selected");
      propertyType.value = option.dataset.propertyType;
      propertyTypeError.classList.remove("visible");
    });
  });

  form.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
      if (validateStep(currentStep)) showStep(Math.min(currentStep + 1, steps.length));
    });
  });

  form.querySelectorAll("[data-prev]").forEach((button) => {
    button.addEventListener("click", () => showStep(Math.max(currentStep - 1, 1)));
  });

  form.querySelectorAll("input").forEach((field) => {
    field.addEventListener("input", () => setFieldError(field, false));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateStep(4)) return;
    const privacy = document.getElementById("privacy");
    document.getElementById("privacyError").classList.toggle("visible", !privacy.checked);
    if (!privacy.checked) return;
    updateSummary();
    form.querySelectorAll(".form-step, .progress-area").forEach((element) => { element.style.display = "none"; });
    successScreen.classList.add("active");
  });

  showStep(1);
});

/* =========================================================
   IMMOBILIENBEWERTUNG – WIZARD / NAVIGATION – ENDE
   ========================================================= */
