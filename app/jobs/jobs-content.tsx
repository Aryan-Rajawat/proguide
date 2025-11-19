"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, DollarSign, Search, Heart } from 'lucide-react'

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
}

const recentJobs: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "Tech Solutions Inc",
    location: "San Francisco, CA",
    salary: "₹15,00,000 - ₹20,00,000",
    type: "Full-time",
    postedDate: "2 hours ago",
    description: "We are looking for an experienced React developer to join our team and build scalable web applications.",
    requirements: [
      "5+ years of React experience",
      "Strong JavaScript fundamentals",
      "Experience with TypeScript",
      "Knowledge of REST APIs"
    ],
    skills: ["React", "TypeScript", "Node.js", "AWS"]
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "Digital Innovations Ltd",
    location: "New York, NY",
    salary: "₹12,00,000 - ₹18,00,000",
    type: "Full-time",
    postedDate: "4 hours ago",
    description: "Join our agile team to develop modern web applications using cutting-edge technologies.",
    requirements: [
      "3+ years of full-stack development",
      "Experience with React and Node.js",
      "Database design knowledge",
      "Git and CI/CD experience"
    ],
    skills: ["React", "Node.js", "MongoDB", "Docker"]
  },
  {
    id: "3",
    title: "Frontend Engineer",
    company: "Creative Studio Co",
    location: "Los Angeles, CA",
    salary: "₹10,00,000 - ₹15,00,000",
    type: "Full-time",
    postedDate: "6 hours ago",
    description: "Design and implement beautiful user interfaces for our platform serving millions of users.",
    requirements: [
      "3+ years of frontend development",
      "Strong CSS/HTML skills",
      "Experience with modern frameworks",
      "UI/UX collaboration skills"
    ],
    skills: ["React", "Vue.js", "CSS", "Figma"]
  },
  {
    id: "4",
    title: "Backend Developer",
    company: "Cloud Systems Corp",
    location: "Seattle, WA",
    salary: "₹14,00,000 - ₹19,00,000",
    type: "Full-time",
    postedDate: "8 hours ago",
    description: "Build scalable backend systems and APIs for our enterprise clients.",
    requirements: [
      "4+ years of backend development",
      "Strong database skills",
      "API design experience",
      "Cloud platform knowledge"
    ],
    skills: ["Node.js", "Python", "PostgreSQL", "AWS"]
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Infrastructure Pro",
    location: "Boston, MA",
    salary: "₹16,00,000 - ₹21,00,000",
    type: "Full-time",
    postedDate: "10 hours ago",
    description: "Manage and optimize our cloud infrastructure and deployment pipelines.",
    requirements: [
      "3+ years of DevOps experience",
      "Kubernetes knowledge",
      "CI/CD pipeline setup",
      "Linux system administration"
    ],
    skills: ["Kubernetes", "Docker", "Jenkins", "AWS"]
  },
  {
    id: "6",
    title: "QA Engineer",
    company: "Quality First Testing",
    location: "Chicago, IL",
    salary: "₹8,00,000 - ₹12,00,000",
    type: "Full-time",
    postedDate: "12 hours ago",
    description: "Ensure product quality through comprehensive testing and quality assurance processes.",
    requirements: [
      "2+ years of QA experience",
      "Test automation skills",
      "Performance testing knowledge",
      "Bug tracking tools experience"
    ],
    skills: ["Selenium", "Jest", "Performance Testing", "JIRA"]
  }
]

export default function JobsContent() {
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredJobs = recentJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recent Job Openings</h1>
        <p className="text-gray-600">Discover opportunities that match your career goals</p>
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

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Apply Now
                </Button>
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
