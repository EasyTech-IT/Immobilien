/* =========================================================
   MAKAAN – IMMOBILIENBEWERTUNG
   12-SCHRITT-WIZARD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     STATE – START
     ======================================================= */

  const state = {

    currentStep: 1,

    totalSteps: 12,

    data: {

      propertyType: "",
      propertySubtype: "",
      livingArea: "",
      landArea: "",
      rooms: "",
      year: "",
      modernization: "",
      quality: "",
      usage: "",
      saleTime: "",
      location: "",

      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",

      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      privacy: false

    }

  };

  /* =======================================================
     STATE – ENDE
     ======================================================= */


  /* =======================================================
     DOM – START
     ======================================================= */

  const form =
    document.getElementById("valuationForm");

  const steps =
    document.querySelectorAll(".question-step");

  const stepLabel =
    document.getElementById("stepLabel");

  const progressPercent =
    document.getElementById("progressPercent");

  const progressBar =
    document.getElementById("progressBar");

  const backButton =
    document.getElementById("backButton");

  const nextButton =
    document.getElementById("nextButton");

  const successSection =
    document.getElementById("successSection");

  const subtypeOptions =
    document.getElementById("subtypeOptions");

  const subtypeQuestion =
    document.getElementById("subtypeQuestion");

  const modernizationInput =
    document.getElementById("modernizationInput");

  const skipModernization =
    document.getElementById("skipModernization");

  /* =======================================================
     DOM – ENDE
     ======================================================= */


  /* =======================================================
     SUBTYPES – START
     ======================================================= */

  const subtypeData = {

    Wohnung: {
      question: "Um welche Art von Wohnung handelt es sich?",

      options: [
        {
          title: "Souterrain",
          description: "Wohnung im Untergeschoss",
          icon: "fa-solid fa-building"
        },
        {
          title: "Erdgeschoss",
          description: "Wohnung im Erdgeschoss",
          icon: "fa-solid fa-building"
        },
        {
          title: "Etagenwohnung",
          description: "Wohnung innerhalb eines Mehrfamilienhauses",
          icon: "fa-solid fa-layer-group"
        },
        {
          title: "Dachgeschoss",
          description: "Dachgeschoss oder Penthouse",
          icon: "fa-solid fa-house"
        },
        {
          title: "Maisonette",
          description: "Wohnung über mehrere Ebenen",
          icon: "fa-solid fa-stairs"
        },
        {
          title: "Loft",
          description: "Offener, großzügiger Grundriss",
          icon: "fa-solid fa-vector-square"
        }
      ]
    },


    Haus: {
      question: "Um welche Art von Haus handelt es sich?",

      options: [
        {
          title: "Einfamilienhaus",
          description: "Freistehendes Haus",
          icon: "fa-solid fa-house"
        },
        {
          title: "Doppelhaushälfte",
          description: "Eine von zwei Haushälften",
          icon: "fa-solid fa-house"
        },
        {
          title: "Reihenhaus",
          description: "Haus innerhalb einer Reihenbebauung",
          icon: "fa-solid fa-house"
        },
        {
          title: "Villa",
          description: "Großzügige, hochwertige Immobilie",
          icon: "fa-solid fa-landmark"
        },
        {
          title: "Bungalow",
          description: "Eingeschossiges Wohnhaus",
          icon: "fa-solid fa-house"
        }
      ]
    },


    Grundstück: {
      question: "Welche Art von Grundstück möchten Sie bewerten?",

      options: [
        {
          title: "Baugrundstück",
          description: "Grundstück zur Bebauung",
          icon: "fa-solid fa-building"
        },
        {
          title: "Freizeitgrundstück",
          description: "Grundstück für Freizeitnutzung",
          icon: "fa-solid fa-tree"
        },
        {
          title: "Gewerbegrundstück",
          description: "Grundstück für gewerbliche Nutzung",
          icon: "fa-solid fa-industry"
        },
        {
          title: "Sonstiges Grundstück",
          description: "Andere Grundstücksart",
          icon: "fa-solid fa-map"
        }
      ]
    },


    Mehrfamilienhaus: {
      question: "Welche Art von Mehrfamilienhaus liegt vor?",

      options: [
        {
          title: "2–3 Wohneinheiten",
          description: "Kleines Mehrfamilienhaus",
          icon: "fa-solid fa-building"
        },
        {
          title: "4–6 Wohneinheiten",
          description: "Mittlere Anzahl an Einheiten",
          icon: "fa-solid fa-building"
        },
        {
          title: "7–10 Wohneinheiten",
          description: "Größeres Mehrfamilienhaus",
          icon: "fa-solid fa-city"
        },
        {
          title: "Mehr als 10 Wohneinheiten",
          description: "Großes Mehrfamilienhaus",
          icon: "fa-solid fa-city"
        }
      ]
    }

  };

  /* =======================================================
     SUBTYPES – ENDE
     ======================================================= */


  /* =======================================================
     INIT – START
     ======================================================= */

  init();

  function init() {

    renderSubtypeOptions();

    bindOptionButtons();

    bindNavigation();

    bindModernization();

    bindSalutation();

    updateUI();

  }

  /* =======================================================
     INIT – ENDE
     ======================================================= */


  /* =======================================================
     OPTION BUTTONS – START
     ======================================================= */

  function bindOptionButtons() {

    document.addEventListener("click", (event) => {

      const button =
        event.target.closest(
          ".option-card, .quality-card"
        );

      if (!button) return;

      const field =
        button.dataset.field;

      const value =
        button.dataset.value;

      if (!field || !value) return;

      state.data[field] = value;

      selectButton(button);

      updateHiddenField(field, value);

      /*
       * Automatisch zum nächsten Schritt
       */
      setTimeout(() => {

        if (state.currentStep < state.totalSteps) {

          goToStep(
            state.currentStep + 1
          );

        }

      }, 180);

    });

  }


  function selectButton(button) {

    const parent =
      button.parentElement;

    if (!parent) return;

    parent
      .querySelectorAll(
        ".option-card, .quality-card"
      )
      .forEach((item) => {

        item.classList.remove("selected");

      });

    button.classList.add("selected");

  }


  function updateHiddenField(field, value) {

    const hidden =
      document.getElementById(field);

    if (!hidden) return;

    hidden.value = value;

  }

  /* =======================================================
     OPTION BUTTONS – ENDE
     ======================================================= */


  /* =======================================================
     SUBTYPE RENDERING – START
     ======================================================= */

  function renderSubtypeOptions() {

    const propertyType =
      state.data.propertyType;

    const config =
      subtypeData[propertyType];

    subtypeOptions.innerHTML = "";

    if (!config) {

      subtypeQuestion.textContent =
        "Welche Art von Immobilie handelt es sich?";

      return;

    }

    subtypeQuestion.textContent =
      config.question;


    config.options.forEach((option) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className = "option-card";

      button.dataset.field =
        "propertySubtype";

      button.dataset.value =
        option.title;

      button.innerHTML = `

        <span class="option-icon">

          <i class="${option.icon}"></i>

        </span>

        <span class="option-content">

          <strong>
            ${option.title}
          </strong>

          <small>
            ${option.description}
          </small>

        </span>

        <i class="fa-solid fa-arrow-right option-arrow"></i>

      `;

      subtypeOptions.appendChild(button);

    });

  }

  /* =======================================================
     SUBTYPE RENDERING – ENDE
     ======================================================= */


  /* =======================================================
     NAVIGATION – START
     ======================================================= */

  function bindNavigation() {

    backButton.addEventListener(
      "click",
      () => {

        if (state.currentStep > 1) {

          goToStep(
            state.currentStep - 1
          );

        }

      }
    );


    nextButton.addEventListener(
      "click",
      () => {

        if (!validateCurrentStep()) {
          return;
        }

        if (
          state.currentStep <
          state.totalSteps
        ) {

          goToStep(
            state.currentStep + 1
          );

          return;

        }

        submitValuation();

      }
    );

  }

  /* =======================================================
     NAVIGATION – ENDE
     ======================================================= */


  /* =======================================================
     STEP NAVIGATION – START
     ======================================================= */

  function goToStep(step) {

    if (
      step < 1 ||
      step > state.totalSteps
    ) {
      return;
    }

    state.currentStep =
      step;

    steps.forEach((item) => {

      const itemStep =
        Number(
          item.dataset.step
        );

      item.classList.toggle(
        "active",
        itemStep === step
      );

    });

    /*
     * Bei Schritt 2 die Optionen
     * anhand der Immobilienart neu aufbauen.
     */
    if (step === 2) {

      renderSubtypeOptions();

    }

    updateUI();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

  /* =======================================================
     STEP NAVIGATION – ENDE
     ======================================================= */


  /* =======================================================
     UPDATE UI – START
     ======================================================= */

  function updateUI() {

    const current =
      state.currentStep;

    const total =
      state.totalSteps;

    const percentage =
      Math.round(
        (current / total) * 100
      );

    stepLabel.textContent =
      `Schritt ${current} von ${total}`;

    progressPercent.textContent =
      `${percentage} %`;

    progressBar.style.width =
      `${percentage}%`;

    backButton.disabled =
      current === 1;


    if (
      current === total
    ) {

      nextButton.innerHTML = `
        Bewertung anfordern
        <i class="fa-solid fa-check"></i>
      `;

      nextButton.classList.add(
        "submit"
      );

    } else {

      nextButton.innerHTML = `
        Weiter
        <i class="fa-solid fa-arrow-right"></i>
      `;

      nextButton.classList.remove(
        "submit"
      );

    }

  }

  /* =======================================================
     UPDATE UI – ENDE
     ======================================================= */


  /* =======================================================
     MODERNISIERUNG – START
     ======================================================= */

  function bindModernization() {

    modernizationInput.addEventListener(
      "input",
      () => {

        const value =
          modernizationInput.value.trim();

        state.data.modernization =
          value;

        document.getElementById(
          "modernization"
        ).value = value;

      }
    );


    skipModernization.addEventListener(
      "click",
      () => {

        state.data.modernization =
          "Keine Angabe";

        document.getElementById(
          "modernization"
        ).value =
          "Keine Angabe";

        goToStep(8);

      }
    );

  }

  /* =======================================================
     MODERNISIERUNG – ENDE
     ======================================================= */


  /* =======================================================
     SALUTATION – START
     ======================================================= */

  function bindSalutation() {

    document
      .querySelectorAll(
        ".salutation-card"
      )
      .forEach((button) => {

        button.addEventListener(
          "click",
          () => {

            document
              .querySelectorAll(
                ".salutation-card"
              )
              .forEach((item) => {

                item.classList.remove(
                  "selected"
                );

              });

            button.classList.add(
              "selected"
            );

            state.data.salutation =
              button.dataset.salutation;

          }
        );

      });

  }

  /* =======================================================
     SALUTATION – ENDE
     ======================================================= */


  /* =======================================================
     VALIDATION – START
     ======================================================= */

  function validateCurrentStep() {

    const step =
      state.currentStep;


    /*
     * Schritt 1
     */
    if (step === 1) {

      if (!state.data.propertyType) {

        showValidation(
          "Bitte wählen Sie eine Immobilienart."
        );

        return false;

      }

    }


    /*
     * Schritt 2
     */
    if (step === 2) {

      if (!state.data.propertySubtype) {

        showValidation(
          "Bitte wählen Sie eine Immobilienart."
        );

        return false;

      }

    }


    /*
     * Schritt 3
     */
    if (step === 3) {

      if (!state.data.livingArea) {

        showValidation(
          "Bitte wählen Sie die ungefähre Wohnfläche."
        );

        return false;

      }

    }


    /*
     * Schritt 4
     */
    if (step === 4) {

      if (!state.data.landArea) {

        showValidation(
          "Bitte wählen Sie die Grundstücksgröße."
        );

        return false;

      }

    }


    /*
     * Schritt 5
     */
    if (step === 5) {

      if (!state.data.rooms) {

        showValidation(
          "Bitte wählen Sie die Zimmeranzahl."
        );

        return false;

      }

    }


    /*
     * Schritt 6
     */
    if (step === 6) {

      if (!state.data.year) {

        showValidation(
          "Bitte wählen Sie das ungefähre Baujahr."
        );

        return false;

      }

    }


    /*
     * Schritt 7
     */
    if (step === 7) {

      const value =
        modernizationInput.value.trim();

      if (!value) {

        showValidation(
          "Bitte geben Sie ein Jahr ein oder wählen Sie „Keine Modernisierung bekannt“."
        );

        modernizationInput.focus();

        return false;

      }

      state.data.modernization =
        value;

    }


    /*
     * Schritt 8
     */
    if (step === 8) {

      if (!state.data.quality) {

        showValidation(
          "Bitte wählen Sie die Ausstattungsqualität."
        );

        return false;

      }

    }


    /*
     * Schritt 9
     */
    if (step === 9) {

      if (!state.data.usage) {

        showValidation(
          "Bitte wählen Sie die aktuelle Nutzung."
        );

        return false;

      }

    }


    /*
     * Schritt 10
     */
    if (step === 10) {

      if (!state.data.saleTime) {

        showValidation(
          "Bitte wählen Sie Ihren gewünschten Verkaufszeitpunkt."
        );

        return false;

      }

    }


    /*
     * Schritt 11
     */
    if (step === 11) {

      if (
        !document
          .getElementById("postalCode")
          .value.trim()
      ) {

        showValidation(
          "Bitte geben Sie mindestens Ihre Postleitzahl ein."
        );

        document
          .getElementById("postalCode")
          .focus();

        return false;

      }

      if (
        !document
          .getElementById("city")
          .value.trim()
      ) {

        showValidation(
          "Bitte geben Sie Ihren Ort ein."
        );

        document
          .getElementById("city")
          .focus();

        return false;

      }

      saveLocation();

    }


    /*
     * Schritt 12
     */
    if (step === 12) {

      return validateContact();

    }


    return true;

  }

  /* =======================================================
     VALIDATION – ENDE
     ======================================================= */


  /* =======================================================
     LOCATION – START
     ======================================================= */

  function saveLocation() {

    state.data.street =
      document
        .getElementById("street")
        .value
        .trim();

    state.data.houseNumber =
      document
        .getElementById("houseNumber")
        .value
        .trim();

    state.data.postalCode =
      document
        .getElementById("postalCode")
        .value
        .trim();

    state.data.city =
      document
        .getElementById("city")
        .value
        .trim();

    state.data.location =
      [
        state.data.street,
        state.data.houseNumber,
        state.data.postalCode,
        state.data.city
      ]
      .filter(Boolean)
      .join(", ");

    document.getElementById(
      "location"
    ).value =
      state.data.location;

  }

  /* =======================================================
     LOCATION – ENDE
     ======================================================= */


  /* =======================================================
     CONTACT VALIDATION – START
     ======================================================= */

  function validateContact() {

    const firstName =
      document
        .getElementById("firstName")
        .value
        .trim();

    const lastName =
      document
        .getElementById("lastName")
        .value
        .trim();

    const email =
      document
        .getElementById("email")
        .value
        .trim();

    const phone =
      document
        .getElementById("phone")
        .value
        .trim();

    const privacy =
      document
        .getElementById("privacy")
        .checked;


    if (!firstName) {

      showValidation(
        "Bitte geben Sie Ihren Vornamen ein."
      );

      document
        .getElementById("firstName")
        .focus();

      return false;

    }


    if (!lastName) {

      showValidation(
        "Bitte geben Sie Ihren Nachnamen ein."
      );

      document
        .getElementById("lastName")
        .focus();

      return false;

    }


    if (
      !email ||
      !isValidEmail(email)
    ) {

      showValidation(
        "Bitte geben Sie eine gültige E-Mail-Adresse ein."
      );

      document
        .getElementById("email")
        .focus();

      return false;

    }


    if (!phone) {

      showValidation(
        "Bitte geben Sie Ihre Telefonnummer ein."
      );

      document
        .getElementById("phone")
        .focus();

      return false;

    }


    if (!privacy) {

      showValidation(
        "Bitte stimmen Sie der Datenschutzerklärung zu."
      );

      return false;

    }


    state.data.firstName =
      firstName;

    state.data.lastName =
      lastName;

    state.data.email =
      email;

    state.data.phone =
      phone;

    state.data.privacy =
      true;


    return true;

  }


  function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  }

  /* =======================================================
     CONTACT VALIDATION – ENDE
     ======================================================= */


  /* =======================================================
     SUBMIT – START
     ======================================================= */

  function submitValuation() {

    if (!validateCurrentStep()) {
      return;
    }

    nextButton.classList.add(
      "loading"
    );

    nextButton.innerHTML = `
      Anfrage wird vorbereitet
      <i class="fa-solid fa-spinner"></i>
    `;


    /*
     * Alle Daten nochmals sichern.
     */
    saveAllData();


    /*
     * Kurze Verzögerung für
     * einen realistischen Submit-Zustand.
     */
    setTimeout(() => {

      /*
       * Hier später Backend/API anschließen.
       *
       * Beispiel:
       *
       * fetch("/api/bewertung", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json"
       *   },
       *   body: JSON.stringify(state.data)
       * });
       */

      form.style.display =
        "none";

      document
        .querySelector(".valuation-sidebar")
        ?.remove();

      successSection.hidden =
        false;

      successSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      console.log(
        "Makaan Bewertungsanfrage:",
        state.data
      );

    }, 850);

  }

  /* =======================================================
     SUBMIT – ENDE
     ======================================================= */


  /* =======================================================
     SAVE ALL DATA – START
     ======================================================= */

  function saveAllData() {

    const fields = [

      "firstName",
      "lastName",
      "email",
      "phone",
      "street",
      "houseNumber",
      "postalCode",
      "city"

    ];

    fields.forEach((id) => {

      const element =
        document.getElementById(id);

      if (!element) return;

      state.data[id] =
        element.value.trim();

    });


    state.data.privacy =
      document.getElementById(
        "privacy"
      ).checked;


    saveLocation();

  }

  /* =======================================================
     SAVE ALL DATA – ENDE
     ======================================================= */


  /* =======================================================
     VALIDATION MESSAGE – START
     ======================================================= */

  function showValidation(message) {

    let toast =
      document.getElementById(
        "valuationToast"
      );


    if (!toast) {

      toast =
        document.createElement(
          "div"
        );

      toast.id =
        "valuationToast";

      toast.style.position =
        "fixed";

      toast.style.left =
        "50%";

      toast.style.bottom =
        "25px";

      toast.style.transform =
        "translateX(-50%)";

      toast.style.zIndex =
        "9999";

      toast.style.maxWidth =
        "calc(100% - 30px)";

      toast.style.padding =
        "13px 18px";

      toast.style.borderRadius =
        "10px";

      toast.style.background =
        "#17382f";

      toast.style.color =
        "#ffffff";

      toast.style.fontFamily =
        '"DM Sans", sans-serif';

      toast.style.fontSize =
        "13px";

      toast.style.fontWeight =
        "600";

      toast.style.boxShadow =
        "0 15px 40px rgba(0,0,0,.18)";

      document.body.appendChild(
        toast
      );

    }


    toast.innerHTML = `
      <i class="fa-solid fa-circle-exclamation"></i>
      ${message}
    `;


    clearTimeout(
      toast._timeout
    );


    toast._timeout =
      setTimeout(() => {

        toast.remove();

      }, 3200);

  }

  /* =======================================================
     VALIDATION MESSAGE – ENDE
     ======================================================= */

});
