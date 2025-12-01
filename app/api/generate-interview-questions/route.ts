import { type NextRequest, NextResponse } from "next/server"

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

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.choices[0]?.message?.content || ""

    return NextResponse.json({
      success: true,
      questions: text,
    })
  } catch (error) {
    console.error("Interview questions generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate interview questions" }, { status: 500 })
  }
}
