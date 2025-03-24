// DOM Elements
const header = document.querySelector(".header")
const mobileNavToggle = document.querySelector(".mobile-nav-toggle")
const nav = document.querySelector(".nav")
const themeToggle = document.querySelector(".theme-toggle")
const backToTop = document.querySelector(".back-to-top")
const contactForm = document.getElementById("contactForm")
const formStatus = document.getElementById("formStatus")
const currentYearEl = document.getElementById("currentYear")
const designFilters = document.getElementById("designFilters")

const typingText = document.getElementById("typing-text");
const cursor = document.querySelector(".cursor");

const roles = [" Undergraduate ", " UI/UX Designer ", " Frontend Developer "];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex--);
  } else {
    typingText.textContent = currentRole.substring(0, charIndex++);
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 500);
});

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear()

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("scrolled")
    backToTop.classList.add("visible")
  } else {
    header.classList.remove("scrolled")
    backToTop.classList.remove("visible")
  }
})

// Mobile navigation toggle
mobileNavToggle.addEventListener("click", () => {
  nav.classList.toggle("active")

  // Update icon
  const icon = mobileNavToggle.querySelector("i")
  if (nav.classList.contains("active")) {
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-times")
  } else {
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
})

// Close mobile nav when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active")
    const icon = mobileNavToggle.querySelector("i")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  })
})

document.getElementById("downloadCV").addEventListener("click", function (event) {
  event.preventDefault();
  const link = document.createElement("a");
  link.href = "assets/files/Sathira_Dahanayaka.pdf";
  link.setAttribute("download", "Sathira_Dahanayaka_CV.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark")

  // Update icon
  const icon = themeToggle.querySelector("i")
  if (document.documentElement.classList.contains("dark")) {
    icon.classList.remove("fa-moon")
    icon.classList.add("fa-sun")
  } else {
    icon.classList.remove("fa-sun")
    icon.classList.add("fa-moon")
  }

  // Save preference to localStorage
  const theme = document.documentElement.classList.contains("dark") ? "dark" : "light"
  localStorage.setItem("theme", theme)
})

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark")
    themeToggle.querySelector("i").classList.remove("fa-moon")
    themeToggle.querySelector("i").classList.add("fa-sun")
  } else {
    document.documentElement.classList.remove("dark")
    themeToggle.querySelector("i").classList.remove("fa-sun")
    themeToggle.querySelector("i").classList.add("fa-moon")
  }
}

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalBtnText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  // Simulate form submission (replace with actual form submission in production)
  setTimeout(() => {
    // Reset form
    contactForm.reset()

    // Show success message
    formStatus.textContent = "Your message has been sent successfully!"
    formStatus.classList.add("success")

    // Reset button
    submitBtn.innerHTML = originalBtnText
    submitBtn.disabled = false

    // Clear success message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = ""
      formStatus.classList.remove("success")
    }, 5000)
  }, 1500)
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
      }
    }
  })
})

// Initialize theme icon on page load
window.addEventListener("DOMContentLoaded", () => {
  const isDark = document.documentElement.classList.contains("dark")
  const themeIcon = themeToggle.querySelector("i")

  if (isDark) {
    themeIcon.classList.remove("fa-moon")
    themeIcon.classList.add("fa-sun")
  } else {
    themeIcon.classList.remove("fa-sun")
    themeIcon.classList.add("fa-moon")
  }
})

// Add animation to skills and projects when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".skill-card, .project-card")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.2

    if (elementPosition < screenPosition) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

// Set initial state for animation
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".skill-card, .project-card")

  elements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Trigger animation for elements already in view
  animateOnScroll()
})

// Listen for scroll to trigger animations
window.addEventListener("scroll", animateOnScroll)

// Update active navigation link based on scroll position
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100 // Offset for header height

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", updateActiveNavLink)
window.addEventListener("DOMContentLoaded", updateActiveNavLink)

// Project filtering functionality
const filterButtons = document.querySelectorAll(".projects .filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const designFilterButtons = document.querySelectorAll(".design-filter-btn")

// Initialize projects (show all)
function initializeProjects() {
  projectCards.forEach((card) => {
    card.classList.add("show")
    card.classList.remove("hide")
  })
}

// Filter projects based on category
function filterProjects(category) {
  // Show/hide design filters based on category
  if (category === "designs") {
    designFilters.classList.add("visible")
  } else {
    designFilters.classList.remove("visible")
    // Reset design filters when switching to a different main category
    designFilterButtons.forEach((btn) => {
      if (btn.getAttribute("data-design-filter") === "all") {
        btn.classList.add("active")
      } else {
        btn.classList.remove("active")
      }
    })
  }

  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category")

    if (category === "all" || cardCategory === category) {
      card.classList.remove("hide")
      setTimeout(() => {
        card.classList.add("show")
      }, 10)
    } else {
      card.classList.remove("show")
      card.classList.add("hide")
    }
  })
}

// Filter design projects based on design type
function filterDesignProjects(designType) {
  projectCards.forEach((card) => {
    // Only filter cards that are in the designs category
    if (card.getAttribute("data-category") === "designs") {
      const cardDesignType = card.getAttribute("data-design-type")

      if (designType === "all" || cardDesignType === designType) {
        card.classList.remove("hide")
        setTimeout(() => {
          card.classList.add("show")
        }, 10)
      } else {
        card.classList.remove("show")
        card.classList.add("hide")
      }
    }
  })
}

// Add click event listeners to main filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Filter projects
    const category = button.getAttribute("data-filter")
    filterProjects(category)
  })
})

// Add click event listeners to design filter buttons
designFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active button
    designFilterButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Filter design projects
    const designType = button.getAttribute("data-design-filter")
    filterDesignProjects(designType)
  })
})

// Initialize projects on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeProjects()

  // Check if we should show design filters initially
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get("category") === "designs") {
    filterButtons.forEach((btn) => {
      if (btn.getAttribute("data-filter") === "designs") {
        btn.click()
      }
    })
  }
})

