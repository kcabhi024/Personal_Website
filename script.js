// Toggle Mobile Navigation
const menuIcon = document.getElementById("menu-icon");
const navList = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  // accessibility
  menuIcon.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// Close menu when a link is clicked
document.querySelectorAll(".navlist a").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
  });
});

// Active link on scroll (dynamic highlighting)
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header .navlist li a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Scroll animation observer for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all boxes and portfolio items
document.querySelectorAll(".box, .row").forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.transition = "all 0.6s ease-out";
  observer.observe(element);
});

// Smooth button click animation with open/close effect
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("mousedown", function () {
    this.style.animation =
      "collapseButton 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards";
  });

  button.addEventListener("mouseup", function () {
    this.style.animation =
      "expandButton 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";
  });

  button.addEventListener("mouseleave", function () {
    this.style.animation = "";
  });
});

// Add parallax effect with scroll-based background color shift
window.addEventListener("scroll", () => {
  const homeSection = document.querySelector(".home");
  if (homeSection) {
    const scrollPosition = window.pageYOffset;
    homeSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;

    // Live background color effect based on scroll
    const scrollPercentage =
      (scrollPosition /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    const hue = (scrollPercentage * 3.6) % 360; // Cycle through colors
    const lightness = 45 + scrollPercentage * 0.1; // Slight lightness change
    homeSection.style.filter = `hue-rotate(${hue}deg) brightness(${1 + scrollPercentage * 0.002})`;
  }
});

// Header background on scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 60) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// Flow typing effect for name
const typeWriter = () => {
  const nameElement = document.querySelector(".home-text h1");
  const fullName = "Abhishek K C";
  if (!nameElement) return;

  const typingSpeed = 160; // slower for smoothness
  const deletingSpeed = 80;
  const pauseAfterTyping = 1200;
  const pauseAfterDeleting = 400;

  let index = 0;
  let isDeleting = false;

  // ensure empty
  nameElement.textContent = "";

  // ensure caret visible during type/delete
  const setCaret = (on) => {
    if (on) nameElement.classList.add("typing");
    else nameElement.classList.remove("typing");
  };

  const loop = () => {
    setCaret(true);
    if (!isDeleting) {
      // type forward
      if (index < fullName.length) {
        const charSpan = document.createElement("span");
        charSpan.textContent = fullName.charAt(index);
        charSpan.classList.add("flow-char");
        charSpan.style.animationDelay = `${index * 0.06}s`;
        nameElement.appendChild(charSpan);
        index++;
        setTimeout(loop, typingSpeed);
      } else {
        // finished typing
        setCaret(false);
        setTimeout(() => {
          isDeleting = true;
          setCaret(true);
          setTimeout(loop, deletingSpeed);
        }, pauseAfterTyping);
      }
    } else {
      // deleting
      if (nameElement.lastElementChild) {
        nameElement.removeChild(nameElement.lastElementChild);
        index = Math.max(0, index - 1);
        setTimeout(loop, deletingSpeed);
      } else {
        // finished deleting, pause then type again
        setCaret(false);
        isDeleting = false;
        setTimeout(loop, pauseAfterDeleting);
      }
    }
  };

  // touch support: toggle gradient on touch
  nameElement.addEventListener(
    "touchstart",
    () => {
      nameElement.classList.add("touch");
      clearTimeout(nameElement._touchTimeout);
      nameElement._touchTimeout = setTimeout(
        () => nameElement.classList.remove("touch"),
        2000,
      );
    },
    { passive: true },
  );

  // start after small delay
  setTimeout(loop, 600);
};

// Initialize typing effect when page loads
window.addEventListener("load", typeWriter);

// Click contact-list-item to populate contact form fields
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".contact-list-item");
  const emailInput = document.querySelector(
    '.contact-form input[type="email"]',
  );
  const phoneInput = document.querySelector('.contact-form input[type="tel"]');

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const kind = item.getAttribute("data-fill");
      const value = item.getAttribute("data-value");
      if (kind === "email" && emailInput) {
        emailInput.value = value;
        emailInput.focus();
      }
      if (kind === "phone" && phoneInput) {
        phoneInput.value = value.replace(/\s+/g, "");
        phoneInput.focus();
      }
      // flash effect
      item.style.transition = "transform 0.15s ease";
      item.style.transform = "scale(0.995)";
      setTimeout(() => (item.style.transform = ""), 160);
    });

    // keyboard activation (Enter / Space)
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });
});
