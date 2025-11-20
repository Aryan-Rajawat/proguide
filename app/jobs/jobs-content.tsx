"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, DollarSign, Search, Heart } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
  postedDate: string
  description: string
  requirements: string[]
  skills: string[]
  linkedinUrl?: string
}

export default function JobsContent() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  )

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase.from("job_market_data").select("*").limit(20)

        if (error) throw error

        if (data && data.length > 0) {
          const formattedJobs: Job[] = data.map((job: any) => ({
            id: job.id,
            title: job.role,
            company: `${job.location} Tech Company`,
            location: job.location,
            salary: `₹${job.avg_salary?.toLocaleString("en-IN")}`,
            type: "Full-time",
            postedDate: new Date(job.data_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            description: `${job.role} position with ${job.demand_level} demand. Required skills: ${(job.required_skills || []).join(", ")}`,
            requirements: [
              `${job.demand_level} demand role`,
              "Competitive salary",
              "Growth opportunities",
              "Industry: " + job.industry,
            ],
            skills: job.required_skills || [],
            linkedinUrl: `https://linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.role)}`,
          }))

          setJobs(formattedJobs)
        } else {
          setJobs(getDefaultJobs())
        }
      } catch (error) {
        console.log("[v0] Error fetching jobs:", error)
        setJobs(getDefaultJobs())
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const getDefaultJobs = (): Job[] => [
    {
      id: "1",
      title: "Senior React Developer",
      company: "Microsoft",
      location: "Bangalore, India",
      salary: "₹18,00,000 - ₹25,00,000",
      type: "Full-time",
      postedDate: "2 days ago",
      description: "Join Microsoft's engineering team to build cutting-edge web applications.",
      requirements: ["5+ years React", "TypeScript", "Microservices", "Azure"],
      skills: ["React", "TypeScript", "Azure", "Node.js"],
      linkedinUrl: "https://linkedin.com/jobs/search/?keywords=React%20Developer",
    },
  ]

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recent Job Openings</h1>
        <p className="text-gray-600">Discover real opportunities from India's top companies</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search by job title, company, or location..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSaveJob(job.id)}
                    className={savedJobs.includes(job.id) ? "text-red-600" : "text-gray-400"}
                  >
                    <Heart className={`w-5 h-5 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <p className="text-gray-700 text-sm mb-4">{job.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {job.postedDate}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Skills Required:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                  {job.linkedinUrl && (
                    <Button variant="outline" onClick={() => window.open(job.linkedinUrl, "_blank")} className="flex-1">
                      View on LinkedIn
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No jobs found matching your search. Try different keywords.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
