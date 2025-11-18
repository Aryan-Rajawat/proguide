"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye, Edit2, FileText, Plus, Trash2 } from 'lucide-react'
import Link from "next/link"

interface Resume {
  id: string
  title: string
  createdDate: string
  lastModified: string
  content: string
}

export default function ResumeManagerPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    // Load resumes from localStorage
    const savedResumes = localStorage.getItem("resumes")
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes))
    } else {
      // Sample resume for demo
      const sampleResume = {
        id: "1",
        title: "Full Stack Developer Resume",
        createdDate: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        content: `John Doe
john.doe@email.com | +91-9876543210 | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications using React, Node.js, and cloud technologies.

PROFESSIONAL EXPERIENCE
Senior Software Engineer | Tech Company | Jan 2021 - Present
- Led development of microservices architecture reducing latency by 40%
- Mentored 3 junior developers and established coding standards
- Implemented CI/CD pipelines using GitHub Actions

Software Engineer | Digital Agency | Jun 2019 - Dec 2020
- Developed 10+ client-facing React applications
- Optimized database queries improving performance by 50%

EDUCATION
Bachelor of Technology in Computer Science | University | 2019

SKILLS
Languages: JavaScript, Python, TypeScript
Frontend: React, Next.js, Tailwind CSS
Backend: Node.js, Express, MongoDB
Cloud: AWS, Docker, Kubernetes`,
      }
      setResumes([sampleResume])
      localStorage.setItem("resumes", JSON.stringify([sampleResume]))
    }
  }, [])

  const handleDownload = (resume: Resume) => {
    const element = document.createElement("a")
    const file = new Blob([resume.content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${resume.title}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleDelete = (id: string) => {
    const updated = resumes.filter(r => r.id !== id)
    setResumes(updated)
    localStorage.setItem("resumes", JSON.stringify(updated))
    if (selectedResume?.id === id) {
      setSelectedResume(null)
      setPreviewMode(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resume Manager</h1>
        <Link href="/resume-generator">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create New Resume
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="font-semibold text-lg">My Resumes</h2>
          {resumes.map((resume) => (
            <Card
              key={resume.id}
              className={`cursor-pointer transition-all ${selectedResume?.id === resume.id ? "border-blue-500 bg-blue-50" : ""}`}
              onClick={() => {
                setSelectedResume(resume)
                setPreviewMode(false)
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{resume.title}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(resume.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preview and Actions */}
        <div className="lg:col-span-2">
          {selectedResume ? (
            <div className="space-y-4">
              {/* Actions */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={previewMode ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Link href={`/resume-generator?edit=${selectedResume.id}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleDownload(selectedResume)}
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(selectedResume.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>

              {/* Preview Content */}
              {previewMode && (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedResume.title}</CardTitle>
                    <CardDescription>
                      Last modified: {new Date(selectedResume.lastModified).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-6 rounded border border-gray-200 whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-y-auto">
                      {selectedResume.content}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Summary View */}
              {!previewMode && (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedResume.title}</CardTitle>
                    <CardDescription>
                      Created: {new Date(selectedResume.createdDate).toLocaleDateString()} | Modified: {new Date(selectedResume.lastModified).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Click the Preview button above to see the full resume content.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded">
                        <p className="text-xs font-medium text-gray-600 mb-1">Format</p>
                        <p className="font-semibold">Text Document</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded">
                        <p className="text-xs font-medium text-gray-600 mb-1">Size</p>
                        <p className="font-semibold">{Math.ceil(selectedResume.content.length / 1024)} KB</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Select a resume to view, edit, or download</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
