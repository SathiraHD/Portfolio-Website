const header = document.querySelector(".header")
const mobileNavToggle = document.querySelector(".mobile-nav-toggle")
const themeToggle = document.querySelector(".theme-toggle")
const navLinks = document.querySelectorAll(".nav-link, .nav-link-active")
const sections = document.querySelectorAll("section")
const filterBtns = document.querySelectorAll(".filter-btn")
const subFilterBtns = document.querySelectorAll(".sub-filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const contactForm = document.getElementById("contact-form")
const designSubFilter = document.getElementById("design-sub-filter")
const nav = document.querySelector(".nav")

// Mobile navigation toggle
mobileNavToggle.addEventListener("click", () => {
  nav.classList.toggle("active")

  // We're removing the line that prevents scrolling
  // This allows the main window to scroll even when the navigation is open
})

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
      nav.classList.remove("active")
    }
  })
})

// Theme toggle functionality
const icon = themeToggle.querySelector("i")

// Check for saved theme preference or use device preference
const savedTheme = localStorage.getItem("theme")
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

// Apply the right theme based on saved preference or device preference
if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
  document.documentElement.classList.add("light")
  icon.classList.remove("fa-sun")
  icon.classList.add("fa-moon")
} else {
  document.documentElement.classList.remove("light")
  icon.classList.add("fa-sun")
  icon.classList.remove("fa-moon")
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  const html = document.documentElement
  const isLight = html.classList.toggle("light")

  // Update icon
  if (isLight) {
    icon.classList.remove("fa-sun")
    icon.classList.add("fa-moon")
    localStorage.setItem("theme", "light")
  } else {
    icon.classList.remove("fa-moon")
    icon.classList.add("fa-sun")
    localStorage.setItem("theme", "dark")
  }
})

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Update active nav link based on scroll position
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  // Update desktop nav
  navLinks.forEach((link) => {
    link.classList.remove("nav-link-active")
    link.classList.add("nav-link")

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.remove("nav-link")
      link.classList.add("nav-link-active")
    }
  })
})

// Project filtering - Main categories
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")

    // Show/hide design sub-filter
    if (filter === "design") {
      designSubFilter.classList.add("show")
    } else {
      designSubFilter.classList.remove("show")
    }

    // Filter projects with animation
    projectCards.forEach((card) => {
      if (filter === "all") {
        card.classList.remove("hide")
        setTimeout(() => {
          card.classList.add("show")
        }, 100)
      } else if (card.getAttribute("data-category") === filter) {
        card.classList.remove("hide")
        setTimeout(() => {
          card.classList.add("show")
        }, 100)
      } else {
        card.classList.remove("show")
        card.classList.add("hide")
      }
    })

    // If design category is selected, apply sub-filter
    if (filter === "design") {
      const activeSubFilter = document.querySelector(".sub-filter-btn.active")
      const subFilter = activeSubFilter ? activeSubFilter.getAttribute("data-subfilter") : "all"

      applySubFilter(subFilter)
    }
  })
})

// Project filtering - Sub-categories
subFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all sub-filter buttons
    subFilterBtns.forEach((b) => b.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    const subFilter = btn.getAttribute("data-subfilter")
    applySubFilter(subFilter)
  })
})

// Apply sub-filter function with animation
function applySubFilter(subFilter) {
  const designProjects = document.querySelectorAll('.project-card[data-category="design"]')

  designProjects.forEach((card) => {
    if (subFilter === "all") {
      card.classList.remove("hide")
      setTimeout(() => {
        card.classList.add("show")
      }, 100)
    } else if (card.getAttribute("data-subcategory") === subFilter) {
      card.classList.remove("hide")
      setTimeout(() => {
        card.classList.add("show")
      }, 100)
    } else {
      card.classList.remove("show")
      card.classList.add("hide")
    }
  })
}

// Form submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Here you would typically send the data to a server
    // For demo purposes, we'll just log it and show an alert
    console.log({ name, email, subject, message })

    // Show success message
    alert("Thank you for your message! I'll get back to you soon.")

    // Reset form
    contactForm.reset()
  })
}

// Animation on scroll (simple implementation)
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".skill-item, .project-card, .contact-card")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.3

    if (elementPosition < screenPosition) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

// Initial setup
window.addEventListener("DOMContentLoaded", () => {
  // Set initial opacity and transform for animation elements
  const elements = document.querySelectorAll(".skill-item, .project-card, .contact-card")
  elements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Trigger animation on initial load
  setTimeout(animateOnScroll, 300)

  // Check if we should show design sub-filter initially
  const activeMainFilter = document.querySelector(".filter-btn.active")
  if (activeMainFilter && activeMainFilter.getAttribute("data-filter") === "design") {
    designSubFilter.classList.add("show")
  }
})

// Typing effect
const typingText = document.getElementById("typing-text")
const phrases = ["Software Developer", "UI/UX Designer", "Front-end Developer"]
let phraseIndex = 0
let letterIndex = 0
let currentPhrase = ""
let isDeleting = false
let typeSpeed = 100

function typeEffect() {
  const currentPhraseText = phrases[phraseIndex]

  if (isDeleting) {
    currentPhrase = currentPhraseText.substring(0, letterIndex - 1)
    letterIndex--
    typeSpeed = 50
  } else {
    currentPhrase = currentPhraseText.substring(0, letterIndex + 1)
    letterIndex++
    typeSpeed = 100
  }

  typingText.textContent = currentPhrase

  if (!isDeleting && letterIndex === currentPhraseText.length) {
    // Pause at the end of typing
    isDeleting = true
    typeSpeed = 1000
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false
    // Move to the next phrase
    phraseIndex = (phraseIndex + 1) % phrases.length
    typeSpeed = 300
  }

  setTimeout(typeEffect, typeSpeed)
}

// Start the typing effect
setTimeout(typeEffect, 1000)

// Project modal functionality
const modal = document.getElementById("project-modal")
const modalImg = document.getElementById("modal-img")
const modalTitle = document.getElementById("modal-title")
const modalDescription = document.getElementById("modal-description")
const modalTech = document.getElementById("modal-tech")
const closeModal = document.querySelector(".close-modal")

// Sample project data for graphic design and UI/UX projects
const graphicProjects = [
  // UI/UX Projects
  {
    title: "Grab-IT",
    description:
      "A comprehensive UI/UX design for the Grab-IT mobile application. This project involved creating a user-friendly interface for a food delivery service with a focus on seamless ordering experience. The design includes user flow mapping, wireframing, prototyping, and final UI design. Special attention was given to accessibility and intuitive navigation to ensure users of all abilities can easily use the app. The color scheme and visual elements were carefully selected to convey trust, speed, and reliability.",
    image: "Assests/GrabIT.png",
    tech: ["Figma", "User Research", "Wireframing", "Prototyping", "UI Design"],
    category: "uiux",
  },
  {
    title: "Route",
    description:
      "A navigation application designed to provide users with the most efficient routes while considering traffic conditions, public transportation options, and walking paths. The UI/UX design focuses on providing clear, real-time information with minimal distractions for users on the go. The interface includes intuitive map interactions, voice-guided navigation, and customizable route preferences. The design process included extensive user testing to ensure the interface is easy to use even in stressful situations.",
    image: "Assests/Route.png",
    tech: ["Figma", "User Testing", "Information Architecture", "Interaction Design", "Usability Testing"],
    category: "uiux",
  },
  {
    title: "SailsCare",
    description:
      "A healthcare platform designed to connect patients with healthcare providers for remote consultations and health monitoring. The UI/UX design prioritizes accessibility, privacy, and ease of use for users of all ages and technical abilities. The interface includes features for scheduling appointments, secure messaging, medication reminders, and health data visualization. The design process involved collaboration with healthcare professionals to ensure the platform meets both patient and provider needs while complying with healthcare regulations.",
    image: "Assests/SailsCare.png",
    tech: ["Figma", "Healthcare UX", "Accessibility Design", "Data Visualization", "User Research"],
    category: "uiux",
  },
  // Design Projects
  {
    title: "Event Flyer Collection",
    description:
      "A series of eye-catching flyers designed for various events, promotions, and marketing campaigns. Each flyer is carefully crafted to capture attention and convey essential information in a visually appealing way. The designs incorporate strategic use of typography, color, and imagery to create a strong visual hierarchy and guide the viewer's eye to key information. These flyers have been used for corporate events, product launches, concerts, and community gatherings.",
    image: "https://via.placeholder.com/600x400",
    tech: ["Photoshop", "InDesign", "Print Design", "Typography", "Color Theory"],
    category: "flyers",
  },
  {
    title: "Newsletter Design",
    description:
      "Professional newsletter designs for corporate communications with clean layouts and engaging visuals. These newsletters are designed to effectively communicate company updates, industry news, and employee highlights in a format that is both informative and visually engaging. The designs feature consistent branding elements while allowing for flexibility in content presentation. Special attention is given to readability, with carefully selected typography and column structures that enhance the reading experience.",
    image: "https://via.placeholder.com/600x400",
    tech: ["Photoshop", "News Letter Design", "Booklet Design"],
    category: "newsletter",
  },
  {
    title: "Newsletter Design",
    description:
      "Professional newsletter designs for corporate communications with clean layouts and engaging visuals. These newsletters are designed to effectively communicate company updates, industry news, and employee highlights in a format that is both informative and visually engaging. The designs feature consistent branding elements while allowing for flexibility in content presentation. Special attention is given to readability, with carefully selected typography and column structures that enhance the reading experience.",
    image: "https://via.placeholder.com/600x400",
    tech: ["Photoshop", "News Letter Design", "Booklet Design"],
    category: "newsletter",
  },
  {
    title: "Sports Team Jersey",
    description:
      "Custom jersey designs for sports teams featuring dynamic graphics, team colors, and sponsor placements. These designs balance aesthetic appeal with practical considerations for athletic wear. Each jersey is designed to represent the team's identity and create a sense of unity among players. The designs account for visibility of numbers and names from a distance, durability in various weather conditions, and comfort during physical activity. The collection includes designs for basketball, soccer, and volleyball teams.",
    image: "https://via.placeholder.com/600x400",
    tech: ["Illustrator", "Photoshop", "Apparel Design", "Color Theory"],
    category: "jersey",
  },
  {
    title: "Cuztomized Gaming Jersey",
    description:
      "Custom jersey designs for sports teams featuring dynamic graphics, team colors, and sponsor placements. These designs balance aesthetic appeal with practical considerations for athletic wear. Each jersey is designed to represent the team's identity and create a sense of unity among players. The designs account for visibility of numbers and names from a distance, durability in various weather conditions, and comfort during physical activity. The collection includes designs for basketball, soccer, and volleyball teams.",
    image: "https://via.placeholder.com/600x400",
    tech: ["Illustrator", "Photoshop", "Apparel Design", "Color Theory"],
    category: "jersey",
  },
  {
    title: "Schoolify Website Logo",
    description:
      "A collection of custom logo designs created for various businesses and organizations. Each logo is carefully crafted to represent the brand's identity, values, and vision. The design process involves thorough research, conceptualization, and refinement to create unique and memorable visual identities that stand out in competitive markets. These logos are designed to work across multiple platforms and applications, from digital interfaces to print materials and merchandise.",
    image: "https://via.placeholder.com/600x400",
    tech: ["Illustrator", "Photoshop", "Brand Identity", "Vector Design", "Color Theory"],
    category: "logos",
  },
]

// Open modal when clicking on project eye icon
document.querySelectorAll(".project-link").forEach((link) => {
  if (
    link.querySelector("i").classList.contains("fa-eye")
  ) {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Get the parent project card
      const projectCard = this.closest(".project-card")

      // Get project category and subcategory
      const category = projectCard.dataset.category
      const subcategory = projectCard.dataset.subcategory

      // Get project title to help with matching
      const projectTitle = projectCard.querySelector(".project-title").textContent.trim()

      // Get project image source - ensure we get the full URL
      const projectImgSrc = projectCard.querySelector(".project-img img").src

      // Find matching project data
      let projectData = null

      if (category === "uiux") {
        // For UI/UX projects, try to match by title
        projectData = graphicProjects.find(
          (project) =>
            (project.category === "uiux" && project.title.includes(projectTitle)) ||
            projectTitle.includes(project.title),
        )
      } else if (category === "design" && subcategory) {
        // For design projects, match by subcategory and title if possible
        projectData = graphicProjects.find(
          (project) =>
            project.category === subcategory &&
            (project.title === projectTitle ||
              project.title.includes(projectTitle) ||
              projectTitle.includes(project.title)),
        )

        // If no match by title, just use the first project with matching subcategory
        if (!projectData) {
          projectData = graphicProjects.find((project) => project.category === subcategory)
        }
      }

      // Set modal content
      if (projectData) {
        // Preload the image to ensure it's loaded before showing the modal
        const img = new Image()
        img.onload = () => {
          // Set modal content after image is loaded
          modalImg.src = projectData.image
          modalTitle.textContent = projectData.title
          modalDescription.textContent = projectData.description

          // Clear and add tech tags
          modalTech.innerHTML = ""
          projectData.tech.forEach((tech) => {
            const techTag = document.createElement("span")
            techTag.className = "tech-tag"
            techTag.textContent = tech
            modalTech.appendChild(techTag)
          })

          // Show modal
          modal.style.display = "flex"
          setTimeout(() => {
            modal.classList.add("show")
          }, 10)
          document.body.style.overflow = "hidden" // Prevent scrolling
        }

        img.onerror = () => {
          // If image fails to load, use the image from the card
          modalImg.src = projectImgSrc
          modalTitle.textContent = projectData.title
          modalDescription.textContent = projectData.description

          // Show modal
          modal.style.display = "flex"
          setTimeout(() => {
            modal.classList.add("show")
          }, 10)
          document.body.style.overflow = "hidden" // Prevent scrolling
        }

        // Start loading the image
        img.src = projectData.image
      } else {
        // If no matching project data is found, use the image from the card
        modalImg.src = projectImgSrc
        modalTitle.textContent = projectTitle
        modalDescription.textContent = projectCard.querySelector(".project-description").textContent.trim()

        // Clear and add tech tags from the card
        modalTech.innerHTML = ""
        const techTags = projectCard.querySelectorAll(".tech-tag")
        techTags.forEach((tag) => {
          const techTag = document.createElement("span")
          techTag.className = "tech-tag"
          techTag.textContent = tag.textContent
          modalTech.appendChild(techTag)
        })

        // Show modal
        modal.style.display = "flex"
        setTimeout(() => {
          modal.classList.add("show")
        }, 10)
        document.body.style.overflow = "hidden" // Prevent scrolling
      }
    })
  }
})

// Add image zoom functionality
modalImg.addEventListener("click", function () {
  this.classList.toggle("zoomed")
})

// Close modal when clicking the close button
closeModal.addEventListener("click", () => {
  modal.classList.remove("show")
  setTimeout(() => {
    modal.style.display = "none"
    document.body.style.overflow = "" // Re-enable scrolling
  }, 300)
})

// Close modal when clicking outside the modal content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show")
    setTimeout(() => {
      modal.style.display = "none"
      document.body.style.overflow = "" // Re-enable scrolling
    }, 300)
  }
})

// Add keyboard support for closing modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    modal.classList.remove("show")
    setTimeout(() => {
      modal.style.display = "none"
      document.body.style.overflow = "" // Re-enable scrolling
    }, 300)
  }
})

// Show modal initially
modal.style.display = "none"

// Trigger animation on scroll
window.addEventListener("scroll", animateOnScroll)

// Handle resize events for responsive adjustments
window.addEventListener("resize", () => {
  // Check if mobile nav should be hidden on larger screens
  if (window.innerWidth > 992 && nav.classList.contains("active")) {
    nav.classList.remove("active")
    document.body.style.overflow = ""
  }
})
