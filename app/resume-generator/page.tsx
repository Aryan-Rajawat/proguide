"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, Eye, Sparkles, Plus, X } from 'lucide-react'

export default function ResumeGeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      website: "",
    },
    targetRole: "",
    industry: "",
    experience: [],
    education: [],
    skills: [],
    professionalSummary: "",
  })
  const [generatedResume, setGeneratedResume] = useState<typeof formData | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedResume({ ...formData })
      setIsGenerating(false)
      setCurrentStep(4)
      
      const resumes = JSON.parse(localStorage.getItem("resumes") || "[]")
      const newResume = {
        id: Date.now().toString(),
        title: formData.targetRole ? `${formData.targetRole} Resume` : "My Resume",
        content: generateResumeText(formData),
        formData: formData,
        createdDate: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      }
      resumes.push(newResume)
      localStorage.setItem("resumes", JSON.stringify(resumes))
    }, 3000)
  }

  const generateResumeText = (data: typeof formData): string => {
    let text = ""
    
    // Personal info
    text += data.personalInfo.fullName.toUpperCase() + "\n"
    text += data.targetRole + "\n"
    text += `${data.personalInfo.email} • ${data.personalInfo.phone} • ${data.personalInfo.location}\n\n`
    
    // Professional summary
    if (data.professionalSummary) {
      text += "PROFESSIONAL SUMMARY\n"
      text += data.professionalSummary + "\n\n"
    }
    
    // Technical skills
    text += "TECHNICAL SKILLS\n"
    text += data.skills.join(", ") + "\n\n"
    
    // Experience
    if (data.experience.length > 0) {
      text += "PROFESSIONAL EXPERIENCE\n"
      data.experience.forEach((exp: any) => {
        if (exp.title || exp.company) {
          text += `${exp.title} - ${exp.company}\n`
          text += `${exp.duration}\n`
          text += `${exp.description}\n\n`
        }
      })
    }
    
    // Education
    if (data.education.length > 0) {
      text += "EDUCATION\n"
      data.education.forEach((edu: any) => {
        if (edu.degree || edu.university) {
          text += `${edu.degree} in ${edu.fieldOfStudy}\n`
          text += `${edu.university}, ${edu.graduationYear}\n\n`
        }
      })
    }
    
    return text
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          title: "",
          company: "",
          duration: "",
          description: "",
        },
      ],
    }))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newExperience = [...prev.experience]
      newExperience[index] = { ...newExperience[index], [field]: value }
      return { ...prev, experience: newExperience }
    })
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          fieldOfStudy: "",
          university: "",
          graduationYear: "",
        },
      ],
    }))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newEducation = [...prev.education]
      newEducation[index] = { ...newEducation[index], [field]: value }
      return { ...prev, education: newEducation }
    })
  }

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const downloadResume = () => {
    if (!generatedResume) return
    
    const text = generateResumeText(generatedResume)
    const element = document.createElement("a")
    const file = new Blob([text], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${generatedResume.targetRole || "Resume"}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const downloadPDF = () => {
    if (!generatedResume) return
    
    const text = generateResumeText(generatedResume)
    const element = document.createElement("a")
    const file = new Blob([text], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${generatedResume.targetRole || "Resume"}.pdf`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const steps = [
    { number: 1, title: "Personal Info", description: "Basic contact information" },
    { number: 2, title: "Experience", description: "Work history and achievements" },
    { number: 3, title: "Skills & Education", description: "Technical skills and qualifications" },
    { number: 4, title: "Generated Resume", description: "Your AI-optimized resume" },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Resume Generator</h1>
        <p className="text-gray-600">Create an ATS-optimized resume tailored to your target role</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
              }`}
            >
              {step.number}
            </div>
            <div className="ml-3 hidden sm:block">
              <p className={`text-sm font-medium ${currentStep >= step.number ? "text-blue-600" : "text-gray-400"}`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${currentStep > step.number ? "bg-blue-600" : "bg-gray-300"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Personal Information
            </CardTitle>
            <CardDescription>Enter your contact details and basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={formData.personalInfo.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, email: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phone: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="New York, NY"
                  value={formData.personalInfo.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, location: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Role</Label>
                <Input
                  id="targetRole"
                  placeholder="Software Engineer"
                  value={formData.targetRole}
                  onChange={(e) => setFormData((prev) => ({ ...prev, targetRole: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)}>Next Step</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Experience */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Add your work history and key achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input 
                      placeholder="Senior Software Engineer"
                      value={exp.title}
                      onChange={(e) => updateExperience(index, "title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input 
                      placeholder="Tech Corp"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input 
                    placeholder="Jan 2020 - Present"
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, "duration", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Key Achievements</Label>
                  <Textarea
                    placeholder="• Led a team of 5 developers to deliver a critical project 2 weeks ahead of schedule&#10;• Improved system performance by 40% through code optimization&#10;• Mentored junior developers and conducted code reviews"
                    rows={4}
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addExperience} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Previous
              </Button>
              <Button onClick={() => setCurrentStep(3)}>Next Step</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Skills & Education */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Professional Summary & Skills</CardTitle>
            <CardDescription>Add your professional summary, technical skills and educational background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="professionalSummary">Professional Summary</Label>
              <Textarea
                id="professionalSummary"
                placeholder="Write your professional summary (this will be displayed in your resume)"
                rows={4}
                value={formData.professionalSummary || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    professionalSummary: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-4">
              <Label>Technical Skills</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., React, Python, AWS)"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addSkill(e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <Button
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addSkill(input.value)
                    input.value = ""
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Education</Label>
              {formData.education.map((edu, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input 
                        placeholder="Bachelor of Science"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input 
                        placeholder="Computer Science"
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>University</Label>
                      <Input 
                        placeholder="University of Technology"
                        value={edu.university}
                        onChange={(e) => updateEducation(index, "university", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Graduation Year</Label>
                      <Input 
                        placeholder="2018"
                        value={edu.graduationYear}
                        onChange={(e) => updateEducation(index, "graduationYear", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addEducation} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Previous
              </Button>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Resume
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Generated Resume */}
      {currentStep === 4 && generatedResume && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-600" />
                Your AI-Generated Resume
              </CardTitle>
              <CardDescription>
                Your resume has been optimized for ATS systems and tailored to your target role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6 flex-wrap">
                <Button onClick={downloadPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  <FileText className="w-4 h-4 mr-2" />
                  Edit Resume
                </Button>
              </div>

              {/* Resume Preview - Show actual submitted data */}
              <div className="bg-white border rounded-lg p-8 shadow-sm">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{generatedResume.personalInfo.fullName}</h2>
                  <p className="text-gray-600">{generatedResume.targetRole}</p>
                  <p className="text-sm text-gray-500">
                    {generatedResume.personalInfo.email} • {generatedResume.personalInfo.phone} • {generatedResume.personalInfo.location}
                  </p>
                </div>

                <div className="space-y-6">
                  {generatedResume.professionalSummary && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b">Professional Summary</h3>
                      <p className="text-gray-700">{generatedResume.professionalSummary}</p>
                    </div>
                  )}

                  {generatedResume.skills.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b">Technical Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {generatedResume.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {generatedResume.experience.length > 0 && generatedResume.experience.some((e: any) => e.title || e.company) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b">Professional Experience</h3>
                      <div className="space-y-4">
                        {generatedResume.experience.map((exp: any, index: number) => (
                          (exp.title || exp.company) && (
                            <div key={index}>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-semibold">{exp.title}</h4>
                                  <p className="text-gray-600">{exp.company}</p>
                                </div>
                                <span className="text-sm text-gray-500">{exp.duration}</span>
                              </div>
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {generatedResume.education.length > 0 && generatedResume.education.some((e: any) => e.degree || e.university) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b">Education</h3>
                      <div className="space-y-4">
                        {generatedResume.education.map((edu: any, index: number) => (
                          (edu.degree || edu.university) && (
                            <div key={index}>
                              <h4 className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</h4>
                              <p className="text-gray-600">{edu.university}</p>
                              <p className="text-sm text-gray-500">{edu.graduationYear}</p>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Generation Progress */}
      {isGenerating && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Sparkles className="w-12 h-12 text-blue-600 mx-auto animate-pulse" />
              <h3 className="text-lg font-semibold">AI is crafting your perfect resume...</h3>
              <div className="space-y-2">
                <Progress value={66} className="w-full" />
                <p className="text-sm text-gray-600">Optimizing content for ATS systems and your target role</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
