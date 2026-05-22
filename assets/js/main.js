
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
                if (c.textContent.trim().toLowerCase().indexOf(chip.toLowerCase()) > -1) {
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


// Mark active nav link
document.querySelectorAll(".dropdown-item").forEach(function (a) {
    const href = a.getAttribute("href");
    if (href && location.href.indexOf(href) > -1) {
        a.classList.add("active-link");
    }
});

// Change navbar background on scroll
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (header) {
        const scrolled = window.scrollY > 20 || document.documentElement.scrollTop > 20;
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
        if (!e.target.closest("#mobileMenu") && !e.target.closest("#mobileMenuBtn")) {
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