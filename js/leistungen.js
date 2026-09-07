/* =========================================================
   MAKAAN – LEISTUNGEN
   JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   DOM READY – START
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initHeaderScroll();
  initSmoothScroll();
  initRevealAnimations();
  initCurrentYear();
});

/* =========================================================
   DOM READY – ENDE
   ========================================================= */

/* =========================================================
   MOBILE NAVIGATION – START
   ========================================================= */

function initMobileNavigation() {
  const toggle = document.getElementById("mobileMenuToggle");
  const navigation = document.getElementById("mainNavigation");

  if (!toggle || !navigation) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    toggle.classList.toggle("is-active", isOpen);

    toggle.setAttribute("aria-expanded", String(isOpen));

    document.body.classList.toggle("menu-open", isOpen);
  });

  const navigationLinks = navigation.querySelectorAll("a");

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");

      toggle.classList.remove("is-active");

      toggle.setAttribute("aria-expanded", "false");

      document.body.classList.remove("menu-open");
    });
  });
}

/* =========================================================
   MOBILE NAVIGATION – ENDE
   ========================================================= */

/* =========================================================
   HEADER SCROLL – START
   ========================================================= */

function initHeaderScroll() {
  const header = document.getElementById("siteHeader");

  if (!header) {
    return;
  }

  const updateHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });
}

/* =========================================================
   HEADER SCROLL – ENDE
   ========================================================= */

/* =========================================================
   SMOOTH SCROLL – START
   ========================================================= */

function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const header = document.getElementById("siteHeader");

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
}

/* =========================================================
   SMOOTH SCROLL – ENDE
   ========================================================= */

/* =========================================================
   REVEAL ANIMATIONS – START
   ========================================================= */

function initRevealAnimations() {
  const elements = document.querySelectorAll(
    ".service-card, " +
      ".service-detail-content, " +
      ".service-detail-visual, " +
      ".buyer-card, " +
      ".process-step, " +
      ".why-item, " +
      ".rental-box, " +
      ".cta-inner",
  );

  if (!elements.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  elements.forEach((element) => {
    element.classList.add("reveal-element");
  });

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
      rootMargin: "0px 0px -50px 0px",
    },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

/* =========================================================
   REVEAL ANIMATIONS – ENDE
   ========================================================= */

/* =========================================================
   CURRENT YEAR – START
   ========================================================= */

function initCurrentYear() {
  const year = document.getElementById("currentYear");

  if (!year) {
    return;
  }

  year.textContent = new Date().getFullYear();
}

/* =========================================================
   CURRENT YEAR – ENDE
   ========================================================= */

/* =========================================================
   DYNAMIC REVEAL CSS – START
   ========================================================= */

const revealStyle = document.createElement("style");

revealStyle.textContent = `

  .reveal-element {
    opacity: 0;
    transform: translateY(24px);

    transition:
      opacity 0.7s ease,
      transform 0.7s cubic-bezier(
        0.22,
        1,
        0.36,
        1
      );
  }

  .reveal-element.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .service-card:nth-child(2),
  .buyer-card:nth-child(2),
  .why-item:nth-child(2) {
    transition-delay: 0.08s;
  }

  .service-card:nth-child(3),
  .buyer-card:nth-child(3),
  .why-item:nth-child(3) {
    transition-delay: 0.14s;
  }

  .service-card:nth-child(4),
  .buyer-card:nth-child(4),
  .why-item:nth-child(4) {
    transition-delay: 0.20s;
  }

`;

document.head.appendChild(revealStyle);

/* =========================================================
   DYNAMIC REVEAL CSS – ENDE
   ========================================================= */
