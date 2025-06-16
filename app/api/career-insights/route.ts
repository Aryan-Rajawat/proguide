import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userProfile, location, targetRole } = body

    const prompt = `
    Generate personalized career insights for a professional with the following profile:
    
    Profile: ${JSON.stringify(userProfile)}
    Location: ${location}
    Target Role: ${targetRole}
    
    Please provide:
    1. Market trends analysis for their field
    2. Salary benchmarking
    3. Skill gap analysis
    4. Career progression recommendations
    5. Industry-specific insights
    
    Base the insights on current market conditions and provide actionable recommendations.
    Return the insights in structured JSON format.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 2000,
    })

    return NextResponse.json({
      success: true,
      insights: text,
    })
  } catch (error) {
    console.error("Career insights generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate career insights" }, { status: 500 })
  }
}
