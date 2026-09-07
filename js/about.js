/* =========================================================
   IMMOBILIEN GHUMMAN
   ÜBER UNS – PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     MOBILE NAVIGATION – START
     ======================================================= */

  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      navToggle.setAttribute("aria-expanded", String(isOpen));

      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Menü schließen" : "Menü öffnen",
      );

      const icon = navToggle.querySelector("i");

      if (icon) {
        icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });

    /* Menü nach Klick auf Link schließen */

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");

        navToggle.setAttribute("aria-expanded", "false");

        navToggle.setAttribute("aria-label", "Menü öffnen");

        const icon = navToggle.querySelector("i");

        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      });
    });
  }

  /* =======================================================
     MOBILE NAVIGATION – ENDE
     ======================================================= */

  /* =======================================================
     HEADER SCROLL EFFECT – START
     ======================================================= */

  const header = document.getElementById("siteHeader");

  const handleHeaderScroll = () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  handleHeaderScroll();

  /* =======================================================
     HEADER SCROLL EFFECT – ENDE
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
     INTERSECTION ANIMATION – START
     ======================================================= */

  const animatedElements = document.querySelectorAll(
    ".principle-card, .region-point, .trust-item, .process-step, .team-feature",
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");

          observerInstance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
      },
    );

    animatedElements.forEach((element) => {
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });
  }

  /* =======================================================
     INTERSECTION ANIMATION – ENDE
     ======================================================= */
});
