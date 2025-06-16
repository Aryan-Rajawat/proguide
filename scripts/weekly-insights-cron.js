// Weekly career insights automation script
import { createServerClient } from "../lib/supabase.js"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

async function generateWeeklyInsights() {
  const supabase = createServerClient()

  try {
    // Get all active users
    const { data: users, error } = await supabase.from("users").select(`
        id,
        email,
        first_name,
        user_profiles (
          target_role,
          industry,
          location
        ),
        skills (
          skill_name,
          category
        )
      `)

    if (error) throw error

    for (const user of users) {
      // Generate personalized insights for each user
      const prompt = `
      Generate weekly career insights for:
      - Role: ${user.user_profiles?.[0]?.target_role || "Professional"}
      - Industry: ${user.user_profiles?.[0]?.industry || "Technology"}
      - Location: ${user.user_profiles?.[0]?.location || "United States"}
      - Skills: ${user.skills?.map((s) => s.skill_name).join(", ") || "General"}
      
      Provide:
      1. 3 market trend updates relevant to their profile
      2. 2 skill recommendations based on current demand
      3. 1 salary/career progression insight
      
      Keep insights concise and actionable.
      `

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        maxTokens: 800,
      })

      // Store insights in database
      await supabase.from("career_insights").insert({
        user_id: user.id,
        insight_type: "Weekly Update",
        title: `Weekly Career Insights - ${new Date().toLocaleDateString()}`,
        content: text,
        data: {
          generated_at: new Date().toISOString(),
          type: "automated_weekly",
        },
      })

      console.log(`Generated insights for user: ${user.email}`)
    }

    console.log("Weekly insights generation completed successfully")
  } catch (error) {
    console.error("Error generating weekly insights:", error)
  }
}

// Run the function
generateWeeklyInsights()
