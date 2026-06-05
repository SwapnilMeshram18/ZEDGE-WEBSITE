// Dropdown and Modal utilities
function toggleDD() {
  const dd = document.getElementById("servicesDD");
  if (dd) {
    dd.classList.toggle("open");
  }
}

document.addEventListener("click", function (e) {
  const parent = document.getElementById("servicesParent");
  const dd = document.getElementById("servicesDD");
  if (parent && dd && !e.target.closest("#servicesParent")) {
    dd.classList.remove("open");
  }
});

function openModal(chip) {
  const m = document.getElementById("bookingModal");
  if (m) {
    m.classList.add("open");
    document.body.style.overflow = "hidden";
    if (chip) {
      document.querySelectorAll(".chip").forEach(function (c) {
        c.classList.remove("active");
        if (
          c.textContent.trim().toLowerCase().indexOf(chip.toLowerCase()) > -1
        ) {
          c.classList.add("active");
        }
      });
    }
  }
}

function closeModal() {
  const m = document.getElementById("bookingModal");
  if (m) {
    m.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function chipSelect(el) {
  if (el.classList.contains("contact-chip")) {
    const chipGroup = el.parentElement || document;
    chipGroup.querySelectorAll(".contact-chip").forEach(function (c) {
      c.classList.remove("active");
    });
    el.classList.add("active");
    return;
  }

  const chipGroup = el.parentElement || document;
  const wasActive = el.classList.contains("active");

  chipGroup.querySelectorAll(".chip").forEach(function (c) {
    c.classList.remove("active");
  });

  if (!wasActive) {
    el.classList.add("active");
  }
}

function chipSel(el) {
  chipSelect(el);
}

// Add event listener to close modal on background click
const bookingModalEl = document.getElementById("bookingModal");
if (bookingModalEl) {
  bookingModalEl.addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });
}

// Mark active navigation links across desktop, dropdown, and mobile navs.
function normalizePath(path) {
  const decodedPath = decodeURIComponent(path || "");

  return decodedPath
    .replace(/\\/g, "/")
    .replace(/\/index\.html$/i, "/")
    .replace(/\/$/, "");
}

function pageKeyFromPath(path) {
  const normalized = normalizePath(path).toLowerCase();
  const fileName = normalized.split("/").pop();

  if (!normalized || normalized.endsWith("/z edge website")) return "home";
  if (!fileName || fileName === "index.html") return "home";
  if (normalized.indexOf("/services/") > -1 || normalized.endsWith("/services"))
    return "services";
  if (normalized.endsWith("/resources.html")) return "resources";
  if (normalized.endsWith("/about-us.html")) return "about";
  if (normalized.endsWith("/our-team.html")) return "team";
  if (normalized.endsWith("/contact-us.html")) return "contact";
  return "";
}

function markActiveNavigation() {
  const currentPath = normalizePath(location.pathname);
  const currentKey = pageKeyFromPath(currentPath);

  document.querySelectorAll("header a, header button").forEach(function (el) {
    el.classList.remove("nav-active", "active-link");
    el.removeAttribute("aria-current");
  });

  document.querySelectorAll("header a[href]").forEach(function (link) {
    if (link.querySelector("img")) return;

    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const linkUrl = new URL(href, location.href);
    const linkPath = normalizePath(linkUrl.pathname);
    const linkKey = pageKeyFromPath(linkPath);
    const isExactPage = linkPath === currentPath;
    const isSectionParent =
      linkKey &&
      linkKey === currentKey &&
      !link.classList.contains("dropdown-item");
    const isActive = isExactPage || isSectionParent;

    if (isActive) {
      link.classList.add(
        link.classList.contains("dropdown-item") ? "active-link" : "nav-active",
      );
      link.setAttribute("aria-current", "page");
    }
  });

  if (currentKey === "services") {
    const servicesButton = document.querySelector("#servicesParent > button");
    const mobileServicesButton = document.querySelector(
      "button[onclick='toggleMobileServices()']",
    );

    if (servicesButton) {
      servicesButton.classList.add("nav-active");
      servicesButton.setAttribute("aria-current", "page");
    }

    if (mobileServicesButton) {
      mobileServicesButton.classList.add("nav-active");
      mobileServicesButton.setAttribute("aria-current", "page");
    }
  }
}

markActiveNavigation();

// Animate hero stats when the page loads.
function startStatsCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  counters.forEach(function (counter) {
    const target = Number(counter.dataset.target || "0");
    const suffix = counter.dataset.suffix || "";

    if (counter.dataset.animated === "true") return;
    counter.dataset.animated = "true";

    if (reduceMotion) {
      counter.textContent = target + suffix;
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    function updateCounter(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(target * easedProgress);

      counter.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startStatsCounters);
} else {
  startStatsCounters();
}

// Change navbar background on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (header) {
    const scrolled =
      window.scrollY > 20 || document.documentElement.scrollTop > 20;
    if (scrolled) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// Mobile menu toggle utilities
function toggleMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    const isOpen = menu.classList.contains("menu-open");
    if (isOpen) {
      menu.classList.remove("menu-open");
      btn.classList.remove("open");
      menu.style.display = "none";
    } else {
      menu.classList.add("menu-open");
      btn.classList.add("open");
      menu.style.display = "flex";
    }
  }
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  if (menu && btn && menu.classList.contains("menu-open")) {
    if (
      !e.target.closest("#mobileMenu") &&
      !e.target.closest("#mobileMenuBtn")
    ) {
      menu.classList.remove("menu-open");
      btn.classList.remove("open");
      menu.style.display = "none";
    }
  }
});

function toggleMobileServices() {
  const links = document.getElementById("mobileServicesLinks");
  const arrow = document.getElementById("mobileServicesArrow");
  if (links && arrow) {
    links.classList.toggle("hidden");
    links.classList.toggle("flex");
    arrow.classList.toggle("rotate-180");
  }
}

function playVideo(button) {
  const container = button.parentElement;
  const thumbnail = container.querySelector(".thumbnail");
  const posterElements = container.querySelectorAll(".videoPoster");
  const video = container.querySelector(".videoPlayer");

  if (!video) return;
  document.querySelectorAll(".videoPlayer").forEach(function (otherVideo) {
    if (otherVideo === video) return;

    const otherContainer = otherVideo.parentElement;
    const otherThumbnail = otherContainer.querySelector(".thumbnail");
    const otherPosterElements = otherContainer.querySelectorAll(".videoPoster");
    const otherButton = otherContainer.querySelector("button");

    otherVideo.pause();
    otherVideo.currentTime = 0;
    otherVideo.removeAttribute("controls");

    otherPosterElements.forEach(function (posterElement) {
      posterElement.classList.remove("hidden");
    });

    if (otherThumbnail) {
      otherThumbnail.classList.remove("hidden");
      otherVideo.classList.add("hidden");
    }

    if (otherButton) {
      otherButton.classList.remove("hidden");
    }
  });

  posterElements.forEach(function (posterElement) {
    posterElement.classList.add("hidden");
  });

  if (thumbnail) thumbnail.classList.add("hidden");
  button.classList.add("hidden");

  video.classList.remove("hidden");
  video.setAttribute("controls", "controls");
  video.play();
}

function setupHorizontalCarousel(sliderId, prevId, nextId, cardSelector) {
  const slider = document.getElementById(sliderId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);

  if (!slider || !prev || !next) return;

  function getScrollAmount() {
    const firstCard = slider.querySelector(cardSelector);
    if (!firstCard) return slider.clientWidth;

    const styles = window.getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;

    return firstCard.getBoundingClientRect().width + gap;
  }

  next.addEventListener("click", function () {
    slider.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });

  prev.addEventListener("click", function () {
    slider.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });
}

setupHorizontalCarousel(
  "shortsSlider",
  "shortsPrev",
  "shortsNext",
  ".shorts-card",
);
setupHorizontalCarousel(
  "youtubeSlider",
  "youtubePrev",
  "youtubeNext",
  ".youtube-card",
);

const INQUIRY_API_URL = "http://localhost:5000/send-inquiry";

function getActiveChipText(container) {
  const activeChip = container.querySelector(
    ".chip.active, .contact-chip.active",
  );
  return activeChip ? activeChip.textContent.trim() : "";
}

function getFieldValue(container, selector) {
  const field = container.querySelector(selector);
  return field ? field.value.trim() : "";
}

function setButtonLoading(button, isLoading) {
  if (!button) return;

  if (isLoading) {
    button.dataset.originalHtml = button.innerHTML;
    button.disabled = true;
    button.style.opacity = "0.75";
    button.style.cursor = "not-allowed";
    button.textContent = "Sending...";
    return;
  }

  button.disabled = false;
  button.style.opacity = "";
  button.style.cursor = "";
  if (button.dataset.originalHtml) {
    button.innerHTML = button.dataset.originalHtml;
  }
}

function isValidInquiry(data) {
  if (!data.name || !data.email || !data.phone) {
    alert("Please fill name, email, and phone number.");
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  return true;
}

async function sendInquiry(data, button, onSuccess) {
  if (!isValidInquiry(data)) return;

  setButtonLoading(button, true);

  try {
    const response = await fetch(INQUIRY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to send inquiry.");
    }

    alert("Inquiry sent successfully! We will contact you shortly.");
    if (typeof onSuccess === "function") onSuccess();
  } catch (err) {
    console.error(err);
    alert(
      `Unable to send inquiry. ${
        err.message || "Please make sure the backend server is running."
      }`,
    );
  } finally {
    setButtonLoading(button, false);
  }
}

function setupInquiryForm() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      source: "Contact page inquiry form",
      service: getActiveChipText(form) || "General inquiry",
      name: getFieldValue(form, "#name"),
      email: getFieldValue(form, "#email"),
      phone: getFieldValue(form, "#phone"),
      message: getFieldValue(form, "#message"),
    };

    sendInquiry(data, form.querySelector("[type='submit']"), function () {
      form.reset();
      const firstChip = form.querySelector(".contact-chip");
      if (firstChip) chipSelect(firstChip);
    });
  });
}

function setupHomepageContactForm() {
  const form = document.querySelector("#contact form");
  if (!form || form.id === "inquiryForm") return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      source: "Homepage contact form",
      service: "General inquiry",
      name: getFieldValue(form, "input[type='text']"),
      email: getFieldValue(form, "input[type='email']"),
      phone: getFieldValue(form, "input[type='tel']"),
      message: getFieldValue(form, "textarea"),
    };

    sendInquiry(data, form.querySelector("button"), function () {
      form.reset();
    });
  });
}

function setupBookingModalForm() {
  const modal = document.getElementById("bookingModal");
  if (!modal) return;

  const submitButton =
    modal.querySelector(".book-btn") ||
    Array.from(modal.querySelectorAll("button")).find(function (button) {
      return button.textContent
        .trim()
        .toLowerCase()
        .includes("request appointment");
    });

  if (!submitButton) return;

  submitButton.setAttribute("type", "button");
  submitButton.addEventListener("click", function () {
    const data = {
      source: "Book appointment modal",
      service: getActiveChipText(modal) || "General counselling",
      name: getFieldValue(modal, "input[type='text']"),
      email: getFieldValue(modal, "input[type='email']"),
      phone: getFieldValue(modal, "input[type='tel']"),
      message: getFieldValue(modal, "textarea"),
    };

    sendInquiry(data, submitButton, function () {
      modal.querySelectorAll("input, textarea").forEach(function (field) {
        field.value = "";
      });
      closeModal();
    });
  });
}

setupInquiryForm();
setupHomepageContactForm();
setupBookingModalForm();

function setupServicesAccordion() {
  const accordion = document.getElementById("servicesAccordion");
  if (!accordion) return;

  const cards = accordion.querySelectorAll(".service-card");
  if (!cards.length) return;

  function activate(activeCard) {
    cards.forEach((card) => {
      const header = card.querySelector(".service-card-header");
      const vertical = card.querySelector(".service-card-vertical");
      const expanded = card.querySelector(".service-card-expanded");

      if (card === activeCard) {
        card.classList.add("active");

        // Container styling
        card.classList.remove(
          "lg:flex-[0.42]",
          "bg-[#DDE5CF]",
          "text-[#5D7A4E]",
          "min-h-[140px]",
          "sm:min-h-[220px]",
        );
        card.classList.add(
          "lg:flex-[1.1]",
          "bg-[#95AE7E]",
          "text-white",
          "min-h-[420px]",
        );

        // Header styling
        if (header) {
          header.classList.remove(
            "bg-[#C8D4B6]",
            "justify-center",
            "text-[#5D7A4E]",
          );
          header.classList.add("bg-[#A8BE95]", "px-10", "text-white");
        }

        // Vertical text
        if (vertical) {
          vertical.classList.remove("opacity-100");
          vertical.classList.add("opacity-0", "pointer-events-none", "hidden");
        }

        // Expanded content
        if (expanded) {
          expanded.classList.remove(
            "hidden",
            "opacity-0",
            "pointer-events-none",
          );
          expanded.classList.add("flex", "opacity-100");
        }
      } else {
        card.classList.remove("active");

        // Container styling
        card.classList.remove(
          "lg:flex-[1.1]",
          "bg-[#95AE7E]",
          "text-white",
          "min-h-[420px]",
        );
        card.classList.add(
          "lg:flex-[0.42]",
          "bg-[#DDE5CF]",
          "text-[#5D7A4E]",
          "min-h-[140px]",
          "sm:min-h-[220px]",
        );

        // Header styling
        if (header) {
          header.classList.remove("bg-[#A8BE95]", "px-10", "text-white");
          header.classList.add(
            "bg-[#C8D4B6]",
            "justify-center",
            "text-[#5D7A4E]",
          );
        }

        // Vertical text
        if (vertical) {
          vertical.classList.remove(
            "opacity-0",
            "pointer-events-none",
            "hidden",
          );
          vertical.classList.add("opacity-100");
        }

        // Expanded content
        if (expanded) {
          expanded.classList.remove("flex", "opacity-100");
          expanded.classList.add("hidden", "opacity-0", "pointer-events-none");
        }
      }
    });
  }

  cards.forEach((card) => {
    // Intercept clicks
    card.addEventListener("click", function (e) {
      if (!card.classList.contains("active")) {
        e.preventDefault();
        e.stopPropagation();
        activate(card);
      }
    });

    // Hover effect for desktop
    card.addEventListener("mouseenter", function () {
      if (window.innerWidth >= 1024) {
        activate(card);
      }
    });
  });
}

// Initialize accordion on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupServicesAccordion);
} else {
  setupServicesAccordion();
}
