import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { interviewType, targetRole, experienceLevel } = body

    const prompt = `
    Generate ${interviewType} interview questions for a ${targetRole} position at ${experienceLevel} level.
    
    Requirements:
    - Generate 5 relevant questions
    - Include follow-up questions where appropriate
    - Provide sample answer frameworks
    - Make questions realistic and commonly asked
    
    Interview Type: ${interviewType}
    Target Role: ${targetRole}
    Experience Level: ${experienceLevel}
    
    Return the questions in JSON format with question, difficulty level, and answer framework.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 1500,
    })

    return NextResponse.json({
      success: true,
      questions: text,
    })
  } catch (error) {
    console.error("Interview questions generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate interview questions" }, { status: 500 })
  }
}
