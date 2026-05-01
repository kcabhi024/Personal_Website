// Toggle Mobile Navigation
const menuIcon = document.getElementById("menu-icon");
const navList = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
  navList.classList.toggle("open");
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

// Flow typing effect for name
const typeWriter = () => {
  const nameElement = document.querySelector(".home-text h1");
  const fullName = "Abhishek K C";
  let index = 0;

  // Clear the element
  nameElement.textContent = "";
  nameElement.style.opacity = "1";

  const type = () => {
    if (index < fullName.length) {
      // Create span for each character for flow effect
      const charSpan = document.createElement("span");
      charSpan.textContent = fullName.charAt(index);
      charSpan.classList.add("flow-char");
      charSpan.style.animationDelay = `${index * 0.08}s`;
      nameElement.appendChild(charSpan);
      index++;
      setTimeout(type, 100); // Typing speed
    }
  };

  // Start typing after a short delay
  setTimeout(type, 500);
};

// Initialize typing effect when page loads
window.addEventListener("load", typeWriter);
