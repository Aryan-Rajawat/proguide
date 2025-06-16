import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { personalInfo, experience, skills, targetRole, industry } = body

    const prompt = `
    Generate a professional, ATS-optimized resume based on the following information:
    
    Personal Information:
    - Name: ${personalInfo.fullName}
    - Email: ${personalInfo.email}
    - Phone: ${personalInfo.phone}
    - Location: ${personalInfo.location}
    
    Target Role: ${targetRole}
    Industry: ${industry}
    
    Experience: ${JSON.stringify(experience)}
    Skills: ${skills.join(", ")}
    
    Please create a well-structured resume with:
    1. Professional summary tailored to the target role
    2. Optimized work experience descriptions with quantified achievements
    3. Skills section organized by relevance
    4. ATS-friendly formatting
    
    Return the resume in a structured JSON format with sections for summary, experience, skills, etc.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 2000,
    })

    return NextResponse.json({
      success: true,
      resume: text,
    })
  } catch (error) {
    console.error("Resume generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate resume" }, { status: 500 })
  }
}
