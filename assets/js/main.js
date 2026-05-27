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
  document.querySelectorAll(".chip").forEach(function (c) {
    c.classList.remove("active");
  });
  el.classList.add("active");
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
