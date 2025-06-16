// AI Chatbot Implementation
class CareerAIChatbot {
  constructor() {
    this.isOpen = false
    this.messages = []
    this.isTyping = false
    this.currentContext = this.detectCurrentPage()

    this.init()
  }

  init() {
    this.createChatbotElements()
    this.bindEvents()
    this.loadInitialMessage()
  }

  detectCurrentPage() {
    const path = window.location.pathname
    if (path.includes("dashboard")) return "dashboard"
    if (path.includes("resume-generator")) return "resume"
    if (path.includes("mock-interview")) return "interview"
    if (path.includes("career-insights")) return "insights"
    if (path.includes("auth")) return "auth"
    return "landing"
  }

  createChatbotElements() {
    // Elements are already in HTML, just get references
    this.toggle = document.getElementById("chatbot-toggle")
    this.window = document.getElementById("chatbot-window")
    this.messages = document.getElementById("chatbot-messages")
    this.input = document.getElementById("chatbot-message-input")
    this.sendBtn = document.getElementById("chatbot-send")
    this.closeBtn = document.getElementById("chatbot-close")
  }

  bindEvents() {
    if (this.toggle) {
      this.toggle.addEventListener("click", () => this.toggleChatbot())
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeChatbot())
    }

    if (this.sendBtn) {
      this.sendBtn.addEventListener("click", () => this.sendMessage())
    }

    if (this.input) {
      this.input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.sendMessage()
        }
      })
    }

    // Quick action buttons
    document.addEventListener("click", (e) => {
      if (e.target.matches(".quick-action")) {
        const action = e.target.getAttribute("data-action")
        this.handleQuickAction(action)
      }
    })
  }

  loadInitialMessage() {
    const contextMessages = {
      landing: {
        message: "Hi! I'm your AI career assistant. How can I help you today?",
        quickActions: ["resume", "interview", "insights"],
      },
      dashboard: {
        message: "Hi John! I see you're making great progress. How can I help you today?",
        quickActions: [],
      },
      resume: {
        message: "I'm here to help you create the perfect resume! Need tips on any section?",
        quickActions: [],
      },
      interview: {
        message: "Ready to practice your interview skills? I can help you prepare!",
        quickActions: [],
      },
      insights: {
        message: "I can help you understand market trends and career opportunities. What would you like to know?",
        quickActions: [],
      },
      auth: {
        message: "Welcome to CareerAI! I'm here to help you get started with your career journey.",
        quickActions: [],
      },
    }

    const contextData = contextMessages[this.currentContext] || contextMessages.landing

    // Clear existing messages first
    if (this.messages) {
      this.messages.innerHTML = ""
      this.addBotMessage(contextData.message, contextData.quickActions)
    }
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen
    if (this.window) {
      this.window.classList.toggle("active", this.isOpen)
    }

    if (this.isOpen) {
      this.input?.focus()
    }
  }

  closeChatbot() {
    this.isOpen = false
    if (this.window) {
      this.window.classList.remove("active")
    }
  }

  sendMessage() {
    const message = this.input?.value.trim()
    if (!message) return

    this.addUserMessage(message)
    this.input.value = ""

    // Show typing indicator
    this.showTypingIndicator()

    // Simulate AI response
    setTimeout(
      () => {
        this.hideTypingIndicator()
        this.generateAIResponse(message)
      },
      1000 + Math.random() * 2000,
    )
  }

  addUserMessage(message) {
    const messageEl = this.createMessageElement("user", message)
    this.messages?.appendChild(messageEl)
    this.scrollToBottom()
  }

  addBotMessage(message, quickActions = []) {
    const messageEl = this.createMessageElement("bot", message, quickActions)
    this.messages?.appendChild(messageEl)
    this.scrollToBottom()
  }

  createMessageElement(type, content, quickActions = []) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${type}-message`

    const avatar = document.createElement("div")
    avatar.className = "message-avatar"
    avatar.innerHTML = type === "bot" ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>'

    const messageContent = document.createElement("div")
    messageContent.className = "message-content"
    messageContent.innerHTML = `<p>${content}</p>`

    if (quickActions.length > 0) {
      const actionsDiv = document.createElement("div")
      actionsDiv.className = "quick-actions"

      quickActions.forEach((action) => {
        const actionBtn = document.createElement("button")
        actionBtn.className = "quick-action"
        actionBtn.setAttribute("data-action", action)
        actionBtn.textContent = this.getActionLabel(action)
        actionsDiv.appendChild(actionBtn)
      })

      messageContent.appendChild(actionsDiv)
    }

    messageDiv.appendChild(avatar)
    messageDiv.appendChild(messageContent)

    return messageDiv
  }

  getActionLabel(action) {
    const labels = {
      resume: "Create Resume",
      interview: "Practice Interview",
      insights: "Career Insights",
      help: "Get Help",
    }
    return labels[action] || action
  }

  showTypingIndicator() {
    if (this.isTyping) return

    this.isTyping = true
    const typingDiv = document.createElement("div")
    typingDiv.className = "message bot-message typing-indicator"
    typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `

    this.messages?.appendChild(typingDiv)
    this.scrollToBottom()
  }

  hideTypingIndicator() {
    const typingIndicator = this.messages?.querySelector(".typing-indicator")
    if (typingIndicator) {
      typingIndicator.remove()
    }
    this.isTyping = false
  }

  scrollToBottom() {
    if (this.messages) {
      this.messages.scrollTop = this.messages.scrollHeight
    }
  }

  generateAIResponse(userMessage) {
    const response = this.getContextualResponse(userMessage.toLowerCase())
    this.addBotMessage(response.message, response.quickActions || [])
  }

  getContextualResponse(message) {
    // Context-aware responses based on current page and message content
    const responses = {
      // General greetings
      greeting: {
        keywords: ["hi", "hello", "hey", "good morning", "good afternoon"],
        responses: [
          "Hello! I'm here to help you with your career development. What can I assist you with today?",
          "Hi there! Ready to take your career to the next level? How can I help?",
          "Hey! Great to see you. What career goals are you working on today?",
        ],
      },

      // Resume-related
      resume: {
        keywords: ["resume", "cv", "curriculum vitae", "job application"],
        responses: [
          "I'd be happy to help with your resume! Are you looking to create a new one or improve an existing resume?",
          "Great choice! A strong resume is key to landing interviews. What specific aspect would you like help with?",
          "Let's build an amazing resume together! What's your target role or industry?",
        ],
      },

      // Interview-related
      interview: {
        keywords: ["interview", "practice", "questions", "preparation"],
        responses: [
          "Interview preparation is crucial! I can help you practice with realistic questions. What type of interview are you preparing for?",
          "Let's get you interview-ready! Are you looking for technical, behavioral, or case study practice?",
          "Mock interviews are a great way to build confidence. What role are you interviewing for?",
        ],
      },

      // Career insights
      insights: {
        keywords: ["career", "market", "trends", "salary", "opportunities"],
        responses: [
          "I can provide insights on market trends, salary data, and career opportunities. What specific information are you looking for?",
          "Career insights can help guide your decisions. Are you interested in market trends, skill demands, or salary benchmarks?",
          "Let me help you understand the current job market. What industry or role are you curious about?",
        ],
      },

      // Skills and learning
      skills: {
        keywords: ["skills", "learn", "training", "certification", "course"],
        responses: [
          "Continuous learning is essential for career growth! What skills are you looking to develop?",
          "I can recommend in-demand skills for your field. What's your current role or target position?",
          "Skill development is a smart investment. Are you looking for technical skills, soft skills, or certifications?",
        ],
      },

      // Job search
      job: {
        keywords: ["job", "position", "opening", "application", "search"],
        responses: [
          "Job searching can be challenging, but I'm here to help! Are you looking for advice on applications, networking, or interview prep?",
          "Let's optimize your job search strategy. What type of roles are you targeting?",
          "I can help you stand out in your job search. What's your biggest challenge right now?",
        ],
      },
    }

    // Find matching category
    let matchedCategory = null
    let maxMatches = 0

    Object.entries(responses).forEach(([category, data]) => {
      const matches = data.keywords.filter((keyword) => message.includes(keyword)).length
      if (matches > maxMatches) {
        maxMatches = matches
        matchedCategory = category
      }
    })

    // Get response based on category or default
    if (matchedCategory && maxMatches > 0) {
      const categoryData = responses[matchedCategory]
      const randomResponse = categoryData.responses[Math.floor(Math.random() * categoryData.responses.length)]
      return {
        message: randomResponse,
        quickActions: this.getRelevantQuickActions(matchedCategory),
      }
    }

    // Default responses for unmatched queries
    const defaultResponses = [
      "I'm here to help with your career development! You can ask me about resumes, interview preparation, career insights, or job search strategies.",
      "That's an interesting question! I specialize in career guidance. How can I help you advance your professional goals?",
      "I'd love to help you with that! My expertise is in career development, resume building, interview prep, and market insights. What specific area interests you?",
      "Great question! I'm designed to help with career-related topics. Would you like assistance with your resume, interview preparation, or career planning?",
    ]

    return {
      message: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      quickActions: ["resume", "interview", "insights"],
    }
  }

  getRelevantQuickActions(category) {
    const actionMap = {
      greeting: ["resume", "interview", "insights"],
      resume: [],
      interview: [],
      insights: [],
      skills: ["insights"],
      job: ["resume", "interview"],
    }

    return actionMap[category] || []
  }

  handleQuickAction(action) {
    const actionResponses = {
      resume: {
        message:
          "Perfect! Let's work on your resume. I can help you create a professional, ATS-optimized resume that stands out to employers.",
        redirect: "resume-generator.html",
      },
      interview: {
        message:
          "Excellent choice! Interview practice builds confidence and improves performance. I'll help you prepare with realistic questions.",
        redirect: "mock-interview.html",
      },
      insights: {
        message:
          "Smart thinking! Understanding market trends and career data helps you make informed decisions about your career path.",
        redirect: "career-insights.html",
      },
    }

    const response = actionResponses[action]
    if (response) {
      this.addBotMessage(response.message)

      // Add redirect suggestion
      setTimeout(() => {
        this.addBotMessage(`Would you like me to take you to the ${action} page?`, ["redirect-" + action])
      }, 1500)
    }
  }

  // Handle page redirects
  handleRedirect(page) {
    const confirmMessage = `Taking you to the ${page} page now...`
    this.addBotMessage(confirmMessage)

    setTimeout(() => {
      window.location.href = page
    }, 1000)
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add typing indicator styles
  const style = document.createElement("style")
  style.textContent = `
        .typing-indicator .message-content {
            padding: 0.75rem 1rem;
        }
        
        .typing-dots {
            display: flex;
            gap: 0.25rem;
            align-items: center;
        }
        
        .typing-dots span {
            width: 6px;
            height: 6px;
            background: #9ca3af;
            border-radius: 50%;
            animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) {
            animation-delay: 0s;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.4;
            }
            30% {
                transform: translateY(-10px);
                opacity: 1;
            }
        }
        
        .quick-action {
            background: none;
            border: none;
            font-size: inherit;
            color: inherit;
            cursor: pointer;
            padding: 0;
            text-decoration: underline;
        }
        
        .quick-action:hover {
            opacity: 0.8;
        }
    `
  document.head.appendChild(style)

  // Initialize the chatbot
  window.careerAIChatbot = new CareerAIChatbot()
})

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = CareerAIChatbot
}
