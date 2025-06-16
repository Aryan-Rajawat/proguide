// Global variables
let currentStep = 1
let skills = []
const experiences = []
let isRecording = false
let currentQuestion = 0
let interviewQuestions = []
let timer = null
let timeElapsed = 0

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Initialize navigation
  initializeNavigation()

  // Initialize dashboard features
  if (document.querySelector(".dashboard-body")) {
    initializeDashboard()
  }

  // Initialize resume generator
  if (document.querySelector(".resume-generator")) {
    initializeResumeGenerator()
  }

  // Initialize mock interview
  if (document.querySelector(".interview-container")) {
    initializeMockInterview()
  }

  // Initialize career insights
  if (document.querySelector(".insights-container")) {
    initializeCareerInsights()
  }

  // Initialize auth forms
  if (document.querySelector(".auth-body")) {
    initializeAuth()
  }
}

// Navigation Functions
function initializeNavigation() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const sidebarToggle = document.querySelector(".sidebar-toggle")
  const sidebar = document.querySelector(".sidebar")

  // Mobile navigation toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Sidebar toggle
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })
  }

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (sidebar && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("active")
    }
  })
}

// Dashboard Functions
function initializeDashboard() {
  // Animate progress rings
  animateProgressRings()

  // Initialize charts if needed
  initializeCharts()
}

function animateProgressRings() {
  const progressRings = document.querySelectorAll(".progress-ring-circle")
  progressRings.forEach((ring) => {
    const progress = 85 // Example progress
    const circumference = 2 * Math.PI * 50 // radius = 50
    const offset = circumference - (progress / 100) * circumference
    ring.style.strokeDashoffset = offset
  })
}

function initializeCharts() {
  // Placeholder for chart initialization
  // You can integrate Chart.js or other charting libraries here
}

// Resume Generator Functions
function initializeResumeGenerator() {
  // Initialize step navigation
  initializeSteps()

  // Initialize form handlers
  initializeFormHandlers()
}

function initializeSteps() {
  const steps = document.querySelectorAll(".step")
  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      if (index + 1 <= currentStep) {
        goToStep(index + 1)
      }
    })
  })
}

function initializeFormHandlers() {
  // Skills input handler
  const skillInput = document.getElementById("skill-input")
  if (skillInput) {
    skillInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        addSkill()
      }
    })
  }
}

function nextStep() {
  if (currentStep < 4) {
    currentStep++
    updateStepDisplay()
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--
    updateStepDisplay()
  }
}

function goToStep(step) {
  currentStep = step
  updateStepDisplay()
}

function updateStepDisplay() {
  // Update step indicators
  const steps = document.querySelectorAll(".step")
  const stepContents = document.querySelectorAll(".step-content")

  steps.forEach((step, index) => {
    step.classList.remove("active", "completed")
    if (index + 1 === currentStep) {
      step.classList.add("active")
    } else if (index + 1 < currentStep) {
      step.classList.add("completed")
    }
  })

  // Update step content
  stepContents.forEach((content, index) => {
    content.classList.remove("active")
    if (index + 1 === currentStep) {
      content.classList.add("active")
    }
  })
}

function addSkill() {
  const skillInput = document.getElementById("skill-input")
  const skillsContainer = document.getElementById("skills-container")

  if (skillInput && skillsContainer) {
    const skill = skillInput.value.trim()
    if (skill && !skills.includes(skill)) {
      skills.push(skill)

      const skillTag = document.createElement("div")
      skillTag.className = "skill-tag"
      skillTag.innerHTML = `
                ${skill}
                <span class="remove" onclick="removeSkill('${skill}')">×</span>
            `

      skillsContainer.appendChild(skillTag)
      skillInput.value = ""
    }
  }
}

function removeSkill(skill) {
  skills = skills.filter((s) => s !== skill)
  updateSkillsDisplay()
}

function updateSkillsDisplay() {
  const skillsContainer = document.getElementById("skills-container")
  if (skillsContainer) {
    skillsContainer.innerHTML = ""
    skills.forEach((skill) => {
      const skillTag = document.createElement("div")
      skillTag.className = "skill-tag"
      skillTag.innerHTML = `
                ${skill}
                <span class="remove" onclick="removeSkill('${skill}')">×</span>
            `
      skillsContainer.appendChild(skillTag)
    })
  }
}

function addExperience() {
  const experienceContainer = document.getElementById("experience-container")
  if (experienceContainer) {
    const experienceItem = document.createElement("div")
    experienceItem.className = "experience-item"
    experienceItem.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" placeholder="Senior Software Engineer">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" placeholder="Tech Corp">
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month">
                    <div class="checkbox-group">
                        <input type="checkbox" id="current-job-${experiences.length}">
                        <label for="current-job-${experiences.length}">Current Position</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Key Achievements</label>
                <textarea rows="4" placeholder="• Led a team of 5 developers..."></textarea>
            </div>
            <button type="button" class="btn btn-outline btn-small" onclick="removeExperience(this)">Remove</button>
        `
    experienceContainer.appendChild(experienceItem)
    experiences.push({})
  }
}

function removeExperience(button) {
  const experienceItem = button.closest(".experience-item")
  if (experienceItem) {
    experienceItem.remove()
  }
}

function generateResume() {
  // Show loading state
  const loadingState = document.getElementById("loading-state")
  if (loadingState) {
    loadingState.style.display = "flex"

    // Simulate AI generation
    setTimeout(() => {
      loadingState.style.display = "none"
      nextStep() // Go to results step
    }, 3000)
  }
}

// Mock Interview Functions
function initializeMockInterview() {
  // Initialize interview setup
  setupInterviewHandlers()
}

function setupInterviewHandlers() {
  const recordBtn = document.getElementById("record-btn")
  if (recordBtn) {
    recordBtn.addEventListener("click", toggleRecording)
  }
}

function startInterview() {
  const interviewType = document.getElementById("interview-type").value
  const targetRole = document.getElementById("target-role").value

  if (!interviewType || !targetRole) {
    alert("Please select both interview type and target role")
    return
  }

  // Generate questions based on type
  generateInterviewQuestions(interviewType, targetRole)

  // Show interview session
  document.getElementById("interview-setup").style.display = "none"
  document.getElementById("interview-session").style.display = "block"

  // Start timer
  startTimer()

  // Update UI
  updateInterviewUI()
}

function generateInterviewQuestions(type, role) {
  const questions = {
    technical: [
      "Explain the difference between let, const, and var in JavaScript.",
      "How would you optimize a slow-performing database query?",
      "Describe the concept of closures in JavaScript with an example.",
      "What are the principles of RESTful API design?",
      "How would you handle state management in a large React application?",
    ],
    behavioral: [
      "Tell me about a time when you had to work with a difficult team member.",
      "Describe a situation where you had to meet a tight deadline.",
      "How do you handle constructive criticism?",
      "Tell me about a project you're particularly proud of.",
      "Describe a time when you had to learn a new technology quickly.",
    ],
    "case-study": [
      "How would you design a system to handle 1 million concurrent users?",
      "A client wants to increase their e-commerce conversion rate by 20%. What would you recommend?",
      "How would you prioritize features for a new mobile app with limited resources?",
      "Design a recommendation system for a streaming platform.",
      "How would you approach reducing customer churn for a SaaS product?",
    ],
  }

  interviewQuestions = questions[type] || questions.technical
  currentQuestion = 0
}

function updateInterviewUI() {
  const badge = document.getElementById("interview-badge")
  const currentQuestionEl = document.getElementById("current-question")
  const totalQuestionsEl = document.getElementById("total-questions")
  const questionTextEl = document.getElementById("current-question-text")
  const progressEl = document.getElementById("interview-progress")

  if (badge)
    badge.textContent = document.getElementById("interview-type").value.toUpperCase().replace("-", " ") + " INTERVIEW"
  if (currentQuestionEl) currentQuestionEl.textContent = currentQuestion + 1
  if (totalQuestionsEl) totalQuestionsEl.textContent = interviewQuestions.length
  if (questionTextEl) questionTextEl.textContent = interviewQuestions[currentQuestion]
  if (progressEl) progressEl.style.width = `${((currentQuestion + 1) / interviewQuestions.length) * 100}%`
}

function toggleRecording() {
  const recordBtn = document.getElementById("record-btn")
  const recordingIndicator = document.getElementById("recording-indicator")

  isRecording = !isRecording

  if (isRecording) {
    recordBtn.innerHTML = '<i class="fas fa-stop"></i> <span>Stop Recording</span>'
    recordBtn.classList.add("recording")
    if (recordingIndicator) recordingIndicator.style.display = "flex"
  } else {
    recordBtn.innerHTML = '<i class="fas fa-microphone"></i> <span>Start Recording</span>'
    recordBtn.classList.remove("recording")
    if (recordingIndicator) recordingIndicator.style.display = "none"
  }
}

function nextQuestion() {
  if (currentQuestion < interviewQuestions.length - 1) {
    currentQuestion++
    updateInterviewUI()
  } else {
    finishInterview()
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--
    updateInterviewUI()
  }
}

function finishInterview() {
  // Stop timer
  if (timer) {
    clearInterval(timer)
  }

  // Show results
  document.getElementById("interview-session").style.display = "none"
  document.getElementById("interview-results").style.display = "block"

  // Animate score circle
  animateScoreCircle()
}

function animateScoreCircle() {
  const scoreProgress = document.querySelector(".score-progress")
  if (scoreProgress) {
    const score = 85 // Example score
    const circumference = 2 * Math.PI * 50
    const offset = circumference - (score / 100) * circumference
    scoreProgress.style.strokeDashoffset = offset
  }
}

function startNewInterview() {
  // Reset state
  currentQuestion = 0
  isRecording = false
  timeElapsed = 0

  // Show setup
  document.getElementById("interview-results").style.display = "none"
  document.getElementById("interview-setup").style.display = "block"
}

function startTimer() {
  timer = setInterval(() => {
    timeElapsed++
    updateTimerDisplay()
  }, 1000)
}

function updateTimerDisplay() {
  const timerEl = document.getElementById("timer")
  if (timerEl) {
    const minutes = Math.floor(timeElapsed / 60)
    const seconds = timeElapsed % 60
    timerEl.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
}

// Career Insights Functions
function initializeCareerInsights() {
  // Initialize tabs
  initializeTabs()

  // Initialize location selector
  initializeLocationSelector()

  // Animate skill progress bars
  animateSkillBars()
}

function initializeTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab")

      // Remove active class from all tabs
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab
      btn.classList.add("active")
      const targetContent = document.getElementById(tabId)
      if (targetContent) {
        targetContent.classList.add("active")
      }
    })
  })
}

function initializeLocationSelector() {
  const locationSelect = document.getElementById("location-select")
  if (locationSelect) {
    locationSelect.addEventListener("change", (e) => {
      // Update insights based on location
      updateInsightsForLocation(e.target.value)
    })
  }
}

function updateInsightsForLocation(location) {
  // Placeholder for location-based updates
  console.log("Updating insights for:", location)
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar) => {
    const width = bar.style.width || "0%"
    bar.style.width = "0%"
    setTimeout(() => {
      bar.style.width = width
    }, 500)
  })
}

// Auth Functions
function initializeAuth() {
  // Initialize tab switching
  initializeAuthTabs()

  // Initialize password toggles
  initializePasswordToggles()

  // Initialize password strength
  initializePasswordStrength()
}

function initializeAuthTabs() {
  const tabBtns = document.querySelectorAll(".auth-tabs .tab-btn")
  const authForms = document.querySelectorAll(".auth-form")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab")

      // Remove active class from all tabs
      tabBtns.forEach((b) => b.classList.remove("active"))
      authForms.forEach((f) => f.classList.remove("active"))

      // Add active class to clicked tab
      btn.classList.add("active")
      const targetForm = document.getElementById(tabId)
      if (targetForm) {
        targetForm.classList.add("active")
      }
    })
  })
}

function initializePasswordToggles() {
  const passwordToggles = document.querySelectorAll(".password-toggle")
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.previousElementSibling
      const icon = toggle.querySelector("i")

      if (input.type === "password") {
        input.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        input.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })
}

function initializePasswordStrength() {
  const passwordInput = document.getElementById("signup-password")
  const strengthBar = document.querySelector(".strength-fill")
  const strengthText = document.querySelector(".strength-text")

  if (passwordInput && strengthBar && strengthText) {
    passwordInput.addEventListener("input", (e) => {
      const password = e.target.value
      const strength = calculatePasswordStrength(password)

      strengthBar.style.width = `${strength.percentage}%`
      strengthBar.style.background = strength.color
      strengthText.textContent = strength.text
    })
  }
}

function calculatePasswordStrength(password) {
  let score = 0

  if (password.length >= 8) score += 25
  if (/[a-z]/.test(password)) score += 25
  if (/[A-Z]/.test(password)) score += 25
  if (/[0-9]/.test(password)) score += 25
  if (/[^A-Za-z0-9]/.test(password)) score += 25

  if (score <= 25) {
    return { percentage: 25, color: "#ef4444", text: "Weak" }
  } else if (score <= 50) {
    return { percentage: 50, color: "#f59e0b", text: "Fair" }
  } else if (score <= 75) {
    return { percentage: 75, color: "#3b82f6", text: "Good" }
  } else {
    return { percentage: 100, color: "#10b981", text: "Strong" }
  }
}

function signIn() {
  // Simulate sign in
  const email = document.getElementById("signin-email").value
  const password = document.getElementById("signin-password").value

  if (!email || !password) {
    alert("Please fill in all fields")
    return
  }

  // Show loading state
  const btn = event.target
  const originalText = btn.innerHTML
  btn.innerHTML = "Signing in..."
  btn.disabled = true

  // Simulate API call
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1500)
}

function signUp() {
  // Simulate sign up
  const firstName = document.getElementById("first-name").value
  const lastName = document.getElementById("last-name").value
  const email = document.getElementById("signup-email").value
  const password = document.getElementById("signup-password").value
  const confirmPassword = document.getElementById("confirm-password").value

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert("Please fill in all fields")
    return
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match")
    return
  }

  // Show loading state
  const btn = event.target
  const originalText = btn.innerHTML
  btn.innerHTML = "Creating account..."
  btn.disabled = true

  // Simulate API call
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1500)
}

// Utility Functions
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading states to buttons
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn[data-loading]")) {
    const btn = e.target
    const originalText = btn.innerHTML
    const loadingText = btn.getAttribute("data-loading")

    btn.innerHTML = loadingText
    btn.disabled = true

    // Reset after 3 seconds (adjust as needed)
    setTimeout(() => {
      btn.innerHTML = originalText
      btn.disabled = false
    }, 3000)
  }
})
