/* =========================================================
   PROPERTY ANALYSE – START
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("propertyAnalysisForm");

  if (!form) return;

  /* =========================================================
     STATE – START
  ========================================================== */

  const state = {
    currentStep: 1,
    totalSteps: 12,

    propertyType: "",
    propertySubtype: "",
    livingArea: "",
    plotArea: "",
    rooms: "",
    buildYear: "",
    modernization: "",
    quality: "",
    usage: "",
    saleTime: "",
    street: "",
    zip: "",
    city: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    privacy: false,
  };

  /* STATE – ENDE */

  /* =========================================================
     ELEMENTE – START
  ========================================================== */

  const steps = [...document.querySelectorAll(".analysis-step")];

  const currentStepElement = document.getElementById("currentStep");

  const progressPercentElement = document.getElementById("progressPercent");

  const progressBar = document.getElementById("progressBar");

  const backButton = document.getElementById("backButton");

  const nextButton = document.getElementById("nextButton");

  const submitButton = document.getElementById("submitButton");

  const subtypeContainer = document.getElementById("propertySubtypeOptions");

  /* ELEMENTE – ENDE */

  /* =========================================================
     UNTERARTEN – START
  ========================================================== */

  const subtypeData = {
    Wohnung: [
      {
        title: "Eigentumswohnung",
        description: "Klassische Wohnung innerhalb eines Mehrfamilienhauses",
        icon: "fa-building",
      },
      {
        title: "Penthouse",
        description: "Exklusive Wohnung mit besonderer Lage",
        icon: "fa-city",
      },
      {
        title: "Maisonette",
        description: "Wohnung über mehrere Ebenen",
        icon: "fa-stairs",
      },
      {
        title: "Dachgeschosswohnung",
        description: "Wohnung im Dachgeschoss",
        icon: "fa-house",
      },
      {
        title: "Erdgeschosswohnung",
        description: "Wohnung im Erdgeschoss",
        icon: "fa-door-open",
      },
      {
        title: "Sonstige Wohnung",
        description: "Andere Wohnungsart",
        icon: "fa-building",
      },
    ],

    Haus: [
      {
        title: "Einfamilienhaus",
        description: "Freistehendes Haus für eine Familie",
        icon: "fa-house",
      },
      {
        title: "Doppelhaushälfte",
        description: "Eine von zwei verbundenen Haushälften",
        icon: "fa-house",
      },
      {
        title: "Reihenhaus",
        description: "Haus innerhalb einer Reihenhausanlage",
        icon: "fa-house-chimney",
      },
      {
        title: "Mehrfamilienhaus",
        description: "Haus mit mehreren Wohneinheiten",
        icon: "fa-building",
      },
      {
        title: "Villa",
        description: "Großzügiges und hochwertiges Wohnhaus",
        icon: "fa-landmark",
      },
      {
        title: "Bungalow",
        description: "Einstöckiges Wohnhaus",
        icon: "fa-house",
      },
      {
        title: "Sonstiges Haus",
        description: "Andere Hausart",
        icon: "fa-house",
      },
    ],

    Grundstück: [
      {
        title: "Baugrundstück",
        description: "Grundstück mit möglicher Bebauung",
        icon: "fa-map",
      },
      {
        title: "Freizeitgrundstück",
        description: "Grundstück zur Freizeitnutzung",
        icon: "fa-tree",
      },
      {
        title: "Landwirtschaftliches Grundstück",
        description: "Landwirtschaftlich genutzte Fläche",
        icon: "fa-wheat-awn",
      },
      {
        title: "Sonstiges Grundstück",
        description: "Andere Grundstücksart",
        icon: "fa-map-location-dot",
      },
    ],

    Gewerbeimmobilie: [
      {
        title: "Büro",
        description: "Büro- oder Praxisfläche",
        icon: "fa-briefcase",
      },
      {
        title: "Ladenfläche",
        description: "Einzelhandels- oder Verkaufsfläche",
        icon: "fa-shop",
      },
      {
        title: "Gastronomie",
        description: "Restaurant, Café oder Gastronomiefläche",
        icon: "fa-utensils",
      },
      {
        title: "Halle",
        description: "Hallen- oder Lagerfläche",
        icon: "fa-warehouse",
      },
      {
        title: "Gewerbegrundstück",
        description: "Grundstück für gewerbliche Nutzung",
        icon: "fa-industry",
      },
      {
        title: "Sonstige Gewerbeimmobilie",
        description: "Andere gewerbliche Immobilie",
        icon: "fa-building",
      },
    ],
  };

  /* UNTERARTEN – ENDE */

  /* =========================================================
     UNTERART RENDERN – START
  ========================================================== */

  function renderSubtypes() {
    if (!subtypeContainer) return;

    const type = state.propertyType;

    const options = subtypeData[type] || [
      {
        title: "Sonstige",
        description: "Andere Immobilienart",
        icon: "fa-building",
      },
    ];

    subtypeContainer.innerHTML = "";

    options.forEach((option) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "selection-card";

      button.dataset.value = option.title;
      button.dataset.field = "propertySubtype";

      button.innerHTML = `
        <span class="selection-icon">
          <i class="fa-solid ${option.icon}"></i>
        </span>

        <span class="selection-content">
          <strong>${option.title}</strong>
          <small>${option.description}</small>
        </span>

        <i class="fa-solid fa-arrow-right"></i>
      `;

      subtypeContainer.appendChild(button);
    });

    attachSelectionEvents();
  }

  /* UNTERART RENDERN – ENDE */

  /* =========================================================
     PROGRESS – START
  ========================================================== */

  function updateProgress() {
    const progress = (state.currentStep / state.totalSteps) * 100;

    currentStepElement.textContent = state.currentStep;

    progressPercentElement.textContent = `${Math.round(progress)} %`;

    progressBar.style.width = `${progress}%`;
  }

  /* PROGRESS – ENDE */

  /* =========================================================
     STEP ANZEIGEN – START
  ========================================================== */

  function showStep(stepNumber) {
    state.currentStep = stepNumber;

    steps.forEach((step) => {
      const stepValue = Number(step.dataset.step);

      step.classList.toggle("active", stepValue === stepNumber);
    });

    updateProgress();

    updateNavigation();

    window.scrollTo({
      top: document.querySelector(".analysis-section").offsetTop - 80,
      behavior: "smooth",
    });
  }

  /* STEP ANZEIGEN – ENDE */

  /* =========================================================
     NAVIGATION – START
  ========================================================== */

  function updateNavigation() {
    if (state.currentStep === 1) {
      backButton.style.visibility = "hidden";
    } else {
      backButton.style.visibility = "visible";
    }

    if (state.currentStep === state.totalSteps) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-flex";
    } else {
      nextButton.style.display = "inline-flex";
      submitButton.style.display = "none";
    }
  }

  /* NAVIGATION – ENDE */

  /* =========================================================
     FELDWERTE SPEICHERN – START
  ========================================================== */

  function syncInputs() {
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      if (!input.name) return;

      if (input.type === "checkbox") {
        state[input.name] = input.checked;
      } else {
        state[input.name] = input.value.trim();
      }
    });
  }

  /* FELDWERTE SPEICHERN – ENDE */

  /* =========================================================
     SELECTION EVENTS – START
  ========================================================== */

  function attachSelectionEvents() {
    const selectionButtons = document.querySelectorAll(
      ".selection-card[data-field]",
    );

    selectionButtons.forEach((button) => {
      if (button.dataset.bound === "true") {
        return;
      }

      button.dataset.bound = "true";

      button.addEventListener("click", () => {
        const field = button.dataset.field;

        const value = button.dataset.value;

        document
          .querySelectorAll(`.selection-card[data-field="${field}"]`)
          .forEach((item) => {
            item.classList.remove("selected");
          });

        button.classList.add("selected");

        state[field] = value;

        if (state.currentStep < state.totalSteps) {
          setTimeout(() => {
            showStep(state.currentStep + 1);
          }, 220);
        }
      });
    });
  }

  /* SELECTION EVENTS – ENDE */

  /* =========================================================
     ZIMMER – START
  ========================================================== */

  document.querySelectorAll(".room-option").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".room-option").forEach((item) => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      state.rooms = button.dataset.value;

      setTimeout(() => {
        showStep(6);
      }, 220);
    });
  });

  /* ZIMMER – ENDE */

  /* =========================================================
     SKIP BUTTON – START
  ========================================================== */

  document.querySelectorAll("[data-skip]").forEach((button) => {
    button.addEventListener("click", () => {
      const field = button.dataset.skip;

      state[field] = "";

      showStep(state.currentStep + 1);
    });
  });

  /* SKIP BUTTON – ENDE */

  /* =========================================================
     VALIDIERUNG – START
  ========================================================== */

  function clearErrors() {
    form.querySelectorAll(".field-error").forEach((field) => {
      field.classList.remove("field-error");
    });

    form.querySelectorAll(".analysis-error").forEach((error) => {
      error.remove();
    });
  }

  function addError(message, element) {
    if (element) {
      element.classList.add("field-error");
      element.focus();
    }

    const error = document.createElement("div");

    error.className = "analysis-error";

    error.textContent = message;

    const activeStep = document.querySelector(".analysis-step.active");

    activeStep.appendChild(error);
  }

  function validateCurrentStep() {
    clearErrors();

    syncInputs();

    switch (state.currentStep) {
      case 1:
        if (!state.propertyType) {
          addError("Bitte wählen Sie eine Immobilienart.");

          return false;
        }

        break;

      case 2:
        if (!state.propertySubtype) {
          addError("Bitte wählen Sie eine Unterart.");

          return false;
        }

        break;

      case 3:
        if (!state.livingArea || Number(state.livingArea) <= 0) {
          addError(
            "Bitte geben Sie die Wohn- bzw. Nutzfläche an.",
            document.getElementById("livingArea"),
          );

          return false;
        }

        break;

      case 4:
        if (state.plotArea !== "" && Number(state.plotArea) < 0) {
          addError(
            "Bitte geben Sie eine gültige Grundstücksfläche an.",
            document.getElementById("plotArea"),
          );

          return false;
        }

        break;

      case 5:
        if (!state.rooms) {
          addError("Bitte wählen Sie die Anzahl der Zimmer.");

          return false;
        }

        break;

      case 6:
        if (
          !state.buildYear ||
          Number(state.buildYear) < 1800 ||
          Number(state.buildYear) > 2026
        ) {
          addError(
            "Bitte geben Sie ein gültiges Baujahr an.",
            document.getElementById("buildYear"),
          );

          return false;
        }

        break;

      case 7:
        if (!state.modernization) {
          addError("Bitte wählen Sie den Zeitraum der letzten Modernisierung.");

          return false;
        }

        break;

      case 8:
        if (!state.quality) {
          addError("Bitte wählen Sie die Ausstattungsqualität.");

          return false;
        }

        break;

      case 9:
        if (!state.usage) {
          addError("Bitte wählen Sie die aktuelle Nutzung.");

          return false;
        }

        break;

      case 10:
        if (!state.saleTime) {
          addError("Bitte wählen Sie den gewünschten Verkaufszeitpunkt.");

          return false;
        }

        break;

      case 11:
        if (!state.zip || !state.city) {
          addError("Bitte geben Sie mindestens PLZ und Ort an.");

          return false;
        }

        break;

      case 12:
        if (!state.firstName || !state.lastName || !state.email) {
          addError("Bitte füllen Sie alle Pflichtfelder aus.");

          return false;
        }

        if (!isValidEmail(state.email)) {
          addError(
            "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
            document.getElementById("email"),
          );

          return false;
        }

        if (!state.privacy) {
          addError("Bitte bestätigen Sie die Datenschutzerklärung.");

          return false;
        }

        break;
    }

    return true;
  }

  /* VALIDIERUNG – ENDE */

  /* =========================================================
     EMAIL VALIDIERUNG – START
  ========================================================== */

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* EMAIL VALIDIERUNG – ENDE */

  /* =========================================================
     WEITER – START
  ========================================================== */

  nextButton.addEventListener("click", () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (state.currentStep < state.totalSteps) {
      showStep(state.currentStep + 1);
    }
  });

  /* WEITER – ENDE */

  /* =========================================================
     ZURÜCK – START
  ========================================================== */

  backButton.addEventListener("click", () => {
    clearErrors();

    if (state.currentStep > 1) {
      showStep(state.currentStep - 1);
    }
  });

  /* ZURÜCK – ENDE */

  /* =========================================================
     INPUT EVENTS – START
  ========================================================== */

  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      state[input.name] = input.value.trim();

      input.classList.remove("field-error");
    });

    input.addEventListener("change", () => {
      if (input.type === "checkbox") {
        state[input.name] = input.checked;
      }
    });
  });

  /* INPUT EVENTS – ENDE */

  /* =========================================================
     FORM SUBMIT – START
  ========================================================== */

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    syncInputs();

    const analysisData = {
      immobilienart: state.propertyType,
      unterart: state.propertySubtype,
      wohnNutzflaeche: state.livingArea,
      grundstuecksflaeche: state.plotArea,
      zimmer: state.rooms,
      baujahr: state.buildYear,
      letzteModernisierung: state.modernization,
      ausstattungsqualitaet: state.quality,
      aktuelleNutzung: state.usage,
      gewuenschterVerkaufszeitpunkt: state.saleTime,
      lage: {
        strasse: state.street,
        plz: state.zip,
        ort: state.city,
      },
      kontakt: {
        vorname: state.firstName,
        nachname: state.lastName,
        email: state.email,
        telefon: state.phone,
      },
    };

    console.log("Property Analyse:", analysisData);

    showSuccessScreen();
  });

  /* FORM SUBMIT – ENDE */

  /* =========================================================
     ERFOLG – START
  ========================================================== */

  function showSuccessScreen() {
    const card = document.querySelector(".analysis-card");

    card.innerHTML = `

      <div class="analysis-success">

        <div class="success-icon">
          <i class="fa-solid fa-check"></i>
        </div>

        <span class="sidebar-label">
          ANALYSE ERFOLGREICH ERFASST
        </span>

        <h2>
          Vielen Dank, ${escapeHTML(state.firstName)}.
        </h2>

        <p>
          Ihre Angaben wurden vollständig erfasst.
          Wir können Ihre Immobilie nun anhand der
          angegebenen Objekt-, Nutzungs- und Lagedaten
          vorbereiten.
        </p>

        <div class="success-summary">

          <div>
            <span>Immobilienart</span>
            <strong>${escapeHTML(state.propertyType)}</strong>
          </div>

          <div>
            <span>Wohn-/Nutzfläche</span>
            <strong>
              ${escapeHTML(state.livingArea)} m²
            </strong>
          </div>

          <div>
            <span>Zimmer</span>
            <strong>${escapeHTML(state.rooms)}</strong>
          </div>

          <div>
            <span>Lage</span>
            <strong>
              ${escapeHTML(state.zip)}
              ${escapeHTML(state.city)}
            </strong>
          </div>

        </div>

        <a
          href="index.html"
          class="success-button"
        >
          Zur Startseite
          <i class="fa-solid fa-arrow-right"></i>
        </a>

      </div>
    `;
  }

  /* ERFOLG – ENDE */

  /* =========================================================
     ESCAPE HTML – START
  ========================================================== */

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ESCAPE HTML – ENDE */

  /* =========================================================
     SUCCESS CSS DYNAMISCH – START
  ========================================================== */

  const successStyles = document.createElement("style");

  successStyles.textContent = `

    .analysis-success {
      min-height: 540px;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }

    .success-icon {
      width: 64px;
      height: 64px;

      display: grid;
      place-items: center;

      margin-bottom: 25px;

      border-radius: 18px;

      background: var(--pa-green);
      color: #fff;

      font-size: 22px;

      box-shadow:
        0 15px 35px rgba(18,53,47,0.18);
    }

    .analysis-success .sidebar-label {
      margin: 0;
      color: var(--pa-gold);

      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.18em;
    }

    .analysis-success h2 {
      margin-top: 12px;
      margin-bottom: 15px;
    }

    .analysis-success > p {
      max-width: 560px;

      color: var(--pa-muted);
      font-size: 14px;
      line-height: 1.8;
    }

    .success-summary {
      width: 100%;

      display: grid;
      grid-template-columns:
        repeat(2, 1fr);

      gap: 10px;

      margin-top: 25px;
    }

    .success-summary > div {
      padding: 15px;

      border: 1px solid var(--pa-border);
      border-radius: 11px;
    }

    .success-summary span {
      display: block;

      margin-bottom: 5px;

      color: var(--pa-muted);
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .success-summary strong {
      color: var(--pa-text);
      font-size: 12px;
    }

    .success-button {
      height: 50px;

      display: inline-flex;
      align-items: center;
      gap: 10px;

      margin-top: 25px;
      padding: 0 21px;

      border-radius: 10px;

      background: var(--pa-green);
      color: #fff;

      font-size: 11px;
      font-weight: 800;

      text-decoration: none;

      transition: 0.2s ease;
    }

    .success-button:hover {
      background: var(--pa-green-dark);
      transform: translateY(-1px);
    }

    @media (max-width: 520px) {

      .success-summary {
        grid-template-columns: 1fr;
      }

    }

  `;

  document.head.appendChild(successStyles);

  /* SUCCESS CSS DYNAMISCH – ENDE */

  /* =========================================================
     INITIALISIERUNG – START
  ========================================================== */

  renderSubtypes();
  attachSelectionEvents();
  updateProgress();
  updateNavigation();

  /* INITIALISIERUNG – ENDE */
});

/* =========================================================
   PROPERTY ANALYSE – ENDE
========================================================= */
