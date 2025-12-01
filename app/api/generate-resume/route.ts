import { type NextRequest, NextResponse } from "next/server"

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
      resume: text,
    })
  } catch (error) {
    console.error("Resume generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate resume" }, { status: 500 })
  }
}
