import { type NextRequest, NextResponse } from "next/server"

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

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.choices[0]?.message?.content || ""

    return NextResponse.json({
      success: true,
      insights: text,
    })
  } catch (error) {
    console.error("Career insights generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate career insights" }, { status: 500 })
  }
}
