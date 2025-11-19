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
  linkedinUrl?: string
}

const recentJobs: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "Microsoft",
    location: "Bangalore, India",
    salary: "₹18,00,000 - ₹25,00,000",
    type: "Full-time",
    postedDate: "2 days ago",
    description: "Join Microsoft's engineering team to build cutting-edge web applications. Work with React, TypeScript, and modern cloud technologies.",
    requirements: [
      "5+ years of React experience",
      "Strong TypeScript knowledge",
      "Experience with microservices",
      "Azure cloud platform knowledge"
    ],
    skills: ["React", "TypeScript", "Azure", "Node.js"],
    linkedinUrl: "https://linkedin.com/jobs/search/?keywords=React%20Developer"
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "Google",
    location: "Hyderabad, India",
    salary: "₹20,00,000 - ₹28,00,000",
    type: "Full-time",
    postedDate: "1 day ago",
    description: "Build scalable web applications at Google. Work on both frontend and backend systems serving billions of users.",
    requirements: [
      "4+ years of full-stack development",
      "Proficiency in JavaScript/Python",
      "Database design experience",
      "System design knowledge"
    ],
    skills: ["JavaScript", "Python", "GCP", "React"],
    linkedinUrl: "https://linkedin.com/jobs/search/?keywords=Full%20Stack%20Engineer"
  },
  {
    id: "3",
    title: "Frontend Engineer",
    company: "Amazon",
    location: "Pune, India",
    salary: "₹16,00,000 - ₹22,00,000",
    type: "Full-time",
    postedDate: "3 hours ago",
    description: "Create beautiful and performant user interfaces for Amazon's services. Focus on user experience and accessibility.",
    requirements: [
      "3+ years of frontend development",
      "Expert CSS/HTML skills",
      "React or Vue.js experience",
      "Performance optimization knowledge"
    ],
    skills: ["React", "CSS", "JavaScript", "Web Performance"],
    linkedinUrl: "https://linkedin.com/jobs/search/?keywords=Frontend%20Engineer"
  },
  {
    id: "4",
    title: "Backend Developer",
    company: "Flipkart",
    location: "Bangalore, India",
    salary: "₹14,00,000 - ₹20,00,000",
    type: "Full-time",
    postedDate: "5 hours ago",
    description: "Build robust backend systems and APIs for Flipkart's e-commerce platform handling millions of transactions.",
    requirements: [
      "3+ years of backend development",
      "Java or Node.js expertise",
      "Database optimization skills",
      "API design experience"
    ],
    skills: ["Java", "Node.js", "PostgreSQL", "Redis"],
    linkedinUrl: "https://linkedin.com/jobs/search/?keywords=Backend%20Developer"
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Atlassian",
    location: "Remote",
    salary: "₹17,00,000 - ₹24,00,000",
    type: "Full-time",
    postedDate: "1 week ago",
    description: "Manage and optimize cloud infrastructure for Atlassian products. Work with Kubernetes and CI/CD pipelines.",
    requirements: [
      "3+ years of DevOps experience",
      "Kubernetes and Docker expertise",
      "CI/CD pipeline management",
      "AWS or GCP experience"
    ],
    skills: ["Kubernetes", "Docker", "AWS", "Terraform"],
    linkedinUrl: "https://linkedin.com/jobs/search/?keywords=DevOps%20Engineer"
  },
  {
    id: "6",
    title: "Product Manager",
    company: "Swiggy",
    location: "Bangalore, India",
    salary: "₹15,00,000 - ₹21,00,000",
    type: "Full-time",
    postedDate: "2 days ago",
    description: "Drive product strategy and development for Swiggy's mobile and web platforms. Lead cross-functional teams.",
    requirements: [
      "3+ years of product management",
      "Data-driven decision making",
      "Mobile app experience",
      "Analytics and metrics expertise"
    ],
    skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
    linkedinUrl: "https://linkedin.com/jobs/search/?keywords=Product%20Manager"
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
        <p className="text-gray-600">Discover opportunities from top companies in India</p>
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
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Apply Now
                  </Button>
                  {job.linkedinUrl && (
                    <Button 
                      variant="outline"
                      onClick={() => window.open(job.linkedinUrl, '_blank')}
                      className="flex-1"
                    >
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
