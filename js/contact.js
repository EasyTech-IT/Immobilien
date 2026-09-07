```javascript
/* =========================================================
   MAKAAN – CONTACT PAGE JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     CONTACT FORM – START
     ======================================================= */

  const contactForm =
    document.getElementById("contactForm");

  const contactMsg =
    document.getElementById("contactMsg");


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        /*
         * ===================================================
         * FORMULAR – LIVE ANBINDUNG
         * ===================================================
         *
         * Das Formular ist aktuell als Frontend-Demo
         * vorbereitet.
         *
         * Für den Live-Betrieb hier später:
         *
         * - eigenes Backend
         * - Formspree
         * - Netlify Forms
         * - Resend
         * - eigene API
         *
         * anschließen.
         */


        if (contactMsg) {

          contactMsg.textContent =
            "Vielen Dank für Ihre Nachricht. Wir melden uns persönlich bei Ihnen.";

          contactMsg.classList.add("show");

        }


        contactForm.reset();


      }
    );

  }

  /* =======================================================
     CONTACT FORM – ENDE
     ======================================================= */



  /* =======================================================
     SMOOTH SCROLL – START
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(targetId);


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });

  /* =======================================================
     SMOOTH SCROLL – ENDE
     ======================================================= */

});
```;
