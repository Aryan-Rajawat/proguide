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
import { FileText, Download, Eye, Sparkles, Plus, X, Upload, Trash2 } from 'lucide-react'
import Image from 'next/image'

type ResumeTemplate = 'modern' | 'classic' | 'creative' | 'minimal'
type ResumeFormat = 'pdf' | 'txt' | 'docx'

export default function ResumeGeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>('modern')
  const [selectedFormat, setSelectedFormat] = useState<ResumeFormat>('pdf')
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [customSections, setCustomSections] = useState<Array<{ name: string; content: string }>>([])
  const [newSectionName, setNewSectionName] = useState("")

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      github: "",
      website: "",
      photo: "",
    },
    targetRole: "",
    industry: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certificates: [],
    professionalSummary: "",
  })
  const [generatedResume, setGeneratedResume] = useState<typeof formData | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPhotoPreview(result)
        setFormData((prev) => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, photo: result },
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    }))
  }

  const updateProject = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newProjects = [...prev.projects]
      newProjects[index] = { ...newProjects[index], [field]: value }
      return { ...prev, projects: newProjects }
    })
  }

  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }))
  }

  const addCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        {
          name: "",
          issuer: "",
          date: "",
          link: "",
        },
      ],
    }))
  }

  const updateCertificate = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newCertificates = [...prev.certificates]
      newCertificates[index] = { ...newCertificates[index], [field]: value }
      return { ...prev, certificates: newCertificates }
    })
  }

  const removeCertificate = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
    }))
  }

  const addCustomSection = () => {
    if (newSectionName.trim()) {
      setCustomSections([...customSections, { name: newSectionName, content: "" }])
      setNewSectionName("")
    }
  }

  const updateCustomSection = (index: number, field: string, value: string) => {
    const updated = [...customSections]
    updated[index] = { ...updated[index], [field]: value }
    setCustomSections(updated)
  }

  const removeCustomSection = (index: number) => {
    setCustomSections(customSections.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedResume({ ...formData })
      setIsGenerating(false)
      setCurrentStep(5)

      const resumes = JSON.parse(localStorage.getItem("resumes") || "[]")
      const newResume = {
        id: Date.now().toString(),
        title: formData.targetRole ? `${formData.targetRole} Resume` : "My Resume",
        content: generateResumeText(formData),
        formData: formData,
        template: selectedTemplate,
        createdDate: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      }
      resumes.push(newResume)
      localStorage.setItem("resumes", JSON.stringify(resumes))
    }, 2000)
  }

  const generateResumeText = (data: typeof formData): string => {
    let text = ""
    text += data.personalInfo.fullName.toUpperCase() + "\n"
    text += data.targetRole + "\n"
    text += `${data.personalInfo.email} • ${data.personalInfo.phone} • ${data.personalInfo.location}\n`
    if (data.personalInfo.linkedIn) text += `LinkedIn: ${data.personalInfo.linkedIn}\n`
    if (data.personalInfo.github) text += `GitHub: ${data.personalInfo.github}\n`
    text += "\n"

    if (data.professionalSummary) {
      text += "PROFESSIONAL SUMMARY\n" + data.professionalSummary + "\n\n"
    }

    if (data.skills.length > 0) {
      text += "TECHNICAL SKILLS\n" + data.skills.join(", ") + "\n\n"
    }

    if (data.experience.length > 0) {
      text += "PROFESSIONAL EXPERIENCE\n"
      data.experience.forEach((exp: any) => {
        if (exp.title || exp.company) {
          text += `${exp.title} - ${exp.company}\n${exp.duration}\n${exp.description}\n\n`
        }
      })
    }

    if (data.education.length > 0) {
      text += "EDUCATION\n"
      data.education.forEach((edu: any) => {
        if (edu.degree || edu.university) {
          text += `${edu.degree} in ${edu.fieldOfStudy}\n${edu.university}, ${edu.graduationYear}\n\n`
        }
      })
    }

    if (data.projects.length > 0) {
      text += "PROJECTS\n"
      data.projects.forEach((proj: any) => {
        if (proj.title) {
          text += `${proj.title}\n${proj.description}\nTechnologies: ${proj.technologies}\n\n`
        }
      })
    }

    if (data.certificates.length > 0) {
      text += "CERTIFICATIONS\n"
      data.certificates.forEach((cert: any) => {
        if (cert.name) {
          text += `${cert.name} - ${cert.issuer} (${cert.date})\n\n`
        }
      })
    }

    return text
  }

  const downloadResume = () => {
    if (!generatedResume) return
    const text = generateResumeText(generatedResume)
    const element = document.createElement("a")
    const file = new Blob([text], { type: "text/plain;charset=utf-8" })
    element.href = URL.createObjectURL(file)
    element.download = `${generatedResume.personalInfo.fullName || "Resume"}.${selectedFormat}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    URL.revokeObjectURL(element.href)
  }

  const steps = [
    { number: 1, title: "Personal Info", description: "Contact & photo" },
    { number: 2, title: "Experience", description: "Work history" },
    { number: 3, title: "Skills & Education", description: "Skills and degree" },
    { number: 4, title: "Projects & Certs", description: "Portfolio items" },
    { number: 5, title: "Generated Resume", description: "Download resume" },
  ]

  const templates = [
    { id: 'modern', name: 'Modern', desc: 'Clean and contemporary' },
    { id: 'classic', name: 'Classic', desc: 'Professional and timeless' },
    { id: 'creative', name: 'Creative', desc: 'Bold and eye-catching' },
    { id: 'minimal', name: 'Minimal', desc: 'Simple and elegant' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Resume Builder</h1>
        <p className="text-gray-600">Create a stunning, ATS-optimized resume like Canva</p>
      </div>

      <div className="flex items-center justify-between mb-8 overflow-x-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-shrink-0">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
              }`}
            >
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 ${currentStep > step.number ? "bg-blue-600" : "bg-gray-300"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Personal Information with Photo */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information & Photo</CardTitle>
            <CardDescription>Upload your photo and enter your contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <Label htmlFor="photo-upload" className="cursor-pointer">
                <Button variant="outline" type="button" asChild>
                  <span>Upload Photo</span>
                </Button>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </Label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
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
                <Label>Email</Label>
                <Input
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
                <Label>Phone</Label>
                <Input
                  placeholder="+91 98765 43210"
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
                <Label>Location</Label>
                <Input
                  placeholder="Bangalore, India"
                  value={formData.personalInfo.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, location: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input
                  placeholder="linkedin.com/in/johndoe"
                  value={formData.personalInfo.linkedIn}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, linkedIn: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input
                  placeholder="github.com/johndoe"
                  value={formData.personalInfo.github}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, github: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Target Role</Label>
                <Input
                  placeholder="Senior Software Engineer"
                  value={formData.targetRole}
                  onChange={(e) => setFormData((prev) => ({ ...prev, targetRole: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
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
            <CardDescription>Add your work history and achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Job Title" value={exp.title} onChange={(e) => {
                    const newExp = [...formData.experience]
                    newExp[index].title = e.target.value
                    setFormData((prev) => ({ ...prev, experience: newExp }))
                  }} />
                  <Input placeholder="Company" value={exp.company} onChange={(e) => {
                    const newExp = [...formData.experience]
                    newExp[index].company = e.target.value
                    setFormData((prev) => ({ ...prev, experience: newExp }))
                  }} />
                </div>
                <Input placeholder="Duration (e.g., Jan 2020 - Present)" value={exp.duration} onChange={(e) => {
                  const newExp = [...formData.experience]
                  newExp[index].duration = e.target.value
                  setFormData((prev) => ({ ...prev, experience: newExp }))
                }} />
                <Textarea placeholder="Key achievements..." rows={3} value={exp.description} onChange={(e) => {
                  const newExp = [...formData.experience]
                  newExp[index].description = e.target.value
                  setFormData((prev) => ({ ...prev, experience: newExp }))
                }} />
              </div>
            ))}
            <Button variant="outline" onClick={() => {
              setFormData((prev) => ({
                ...prev,
                experience: [...prev.experience, { title: "", company: "", duration: "", description: "" }],
              }))
            }} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Experience
            </Button>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>Previous</Button>
              <Button onClick={() => setCurrentStep(3)}>Next Step</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Skills & Education */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills & Education</CardTitle>
            <CardDescription>Add your professional summary, skills, and education</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Professional Summary</Label>
              <Textarea
                placeholder="Write about yourself..."
                rows={4}
                value={formData.professionalSummary}
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
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        skills: prev.skills.filter((s) => s !== skill),
                      }))
                    }} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Add a skill" onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    const skill = (e.target as HTMLInputElement).value
                    if (skill && !formData.skills.includes(skill)) {
                      setFormData((prev) => ({
                        ...prev,
                        skills: [...prev.skills, skill],
                      }))
                    }
                    ;(e.target as HTMLInputElement).value = ""
                  }
                }} />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Education</Label>
              {formData.education.map((edu, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Degree" value={edu.degree} onChange={(e) => {
                      const newEdu = [...formData.education]
                      newEdu[index].degree = e.target.value
                      setFormData((prev) => ({ ...prev, education: newEdu }))
                    }} />
                    <Input placeholder="Field of Study" value={edu.fieldOfStudy} onChange={(e) => {
                      const newEdu = [...formData.education]
                      newEdu[index].fieldOfStudy = e.target.value
                      setFormData((prev) => ({ ...prev, education: newEdu }))
                    }} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="University" value={edu.university} onChange={(e) => {
                      const newEdu = [...formData.education]
                      newEdu[index].university = e.target.value
                      setFormData((prev) => ({ ...prev, education: newEdu }))
                    }} />
                    <Input placeholder="Graduation Year" value={edu.graduationYear} onChange={(e) => {
                      const newEdu = [...formData.education]
                      newEdu[index].graduationYear = e.target.value
                      setFormData((prev) => ({ ...prev, education: newEdu }))
                    }} />
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  education: [...prev.education, { degree: "", fieldOfStudy: "", university: "", graduationYear: "" }],
                }))
              }} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>Previous</Button>
              <Button onClick={() => setCurrentStep(4)}>Next Step</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Projects & Certificates & Custom Sections */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Showcase your best work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.projects.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <Input placeholder="Project Title" value={project.title} onChange={(e) => updateProject(index, "title", e.target.value)} />
                    <Trash2 className="w-5 h-5 text-red-500 cursor-pointer ml-2" onClick={() => removeProject(index)} />
                  </div>
                  <Textarea placeholder="Project description" rows={2} value={project.description} onChange={(e) => updateProject(index, "description", e.target.value)} />
                  <Input placeholder="Technologies used" value={project.technologies} onChange={(e) => updateProject(index, "technologies", e.target.value)} />
                  <Input placeholder="Project link (optional)" value={project.link} onChange={(e) => updateProject(index, "link", e.target.value)} />
                </div>
              ))}
              <Button variant="outline" onClick={addProject} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Add your professional certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.certificates.map((cert, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <Input placeholder="Certification Name" value={cert.name} onChange={(e) => updateCertificate(index, "name", e.target.value)} />
                    <Trash2 className="w-5 h-5 text-red-500 cursor-pointer ml-2" onClick={() => removeCertificate(index)} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Issuing Organization" value={cert.issuer} onChange={(e) => updateCertificate(index, "issuer", e.target.value)} />
                    <Input placeholder="Date" value={cert.date} onChange={(e) => updateCertificate(index, "date", e.target.value)} />
                  </div>
                  <Input placeholder="Certificate link (optional)" value={cert.link} onChange={(e) => updateCertificate(index, "link", e.target.value)} />
                </div>
              ))}
              <Button variant="outline" onClick={addCertificate} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Add Certification
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Sections</CardTitle>
              <CardDescription>Add any custom section you want</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {customSections.map((section, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{section.name}</h4>
                    <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => removeCustomSection(index)} />
                  </div>
                  <Textarea placeholder="Content for this section" rows={3} value={section.content} onChange={(e) => updateCustomSection(index, "content", e.target.value)} />
                </div>
              ))}
              <div className="flex gap-2">
                <Input placeholder="Enter section name (e.g., Languages, Awards)" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} />
                <Button onClick={addCustomSection}>Add Section</Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>Previous</Button>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Resume"}
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Preview & Download */}
      {currentStep === 5 && generatedResume && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose Template & Format</CardTitle>
              <CardDescription>Select how you want your resume to look</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Resume Template</Label>
                <div className="grid md:grid-cols-4 gap-4">
                  {templates.map((template) => (
                    <div key={template.id} onClick={() => setSelectedTemplate(template.id as ResumeTemplate)} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id ? "border-blue-600 bg-blue-50" : "border-gray-200"
                    }`}>
                      <p className="font-semibold">{template.name}</p>
                      <p className="text-sm text-gray-600">{template.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Download Format</Label>
                <Select value={selectedFormat} onValueChange={(value) => setSelectedFormat(value as ResumeFormat)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="txt">Text</SelectItem>
                    <SelectItem value="docx">Word Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={downloadResume} className="w-full">
                <Download className="w-4 h-4 mr-2" /> Download Resume
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-8 shadow-sm max-h-[600px] overflow-y-auto">
                {photoPreview && (
                  <div className="flex justify-center mb-6">
                    <img src={photoPreview || "/placeholder.svg"} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-center mb-1">{generatedResume.personalInfo.fullName}</h2>
                <p className="text-center text-gray-600 mb-4">{generatedResume.targetRole}</p>
                <div className="text-center text-sm text-gray-500 mb-6">
                  {generatedResume.personalInfo.email} • {generatedResume.personalInfo.phone} • {generatedResume.personalInfo.location}
                  {generatedResume.personalInfo.linkedIn && <p>LinkedIn: {generatedResume.personalInfo.linkedIn}</p>}
                  {generatedResume.personalInfo.github && <p>GitHub: {generatedResume.personalInfo.github}</p>}
                </div>

                {generatedResume.professionalSummary && (
                  <div className="mb-4">
                    <h3 className="font-bold border-b pb-1">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm mt-2">{generatedResume.professionalSummary}</p>
                  </div>
                )}

                {generatedResume.skills.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-bold border-b pb-1">TECHNICAL SKILLS</h3>
                    <p className="text-sm mt-2">{generatedResume.skills.join(", ")}</p>
                  </div>
                )}

                {generatedResume.experience.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-bold border-b pb-1">PROFESSIONAL EXPERIENCE</h3>
                    {generatedResume.experience.map((exp: any, i: number) => (
                      (exp.title || exp.company) && (
                        <div key={i} className="text-sm mt-2">
                          <p className="font-semibold">{exp.title} - {exp.company}</p>
                          <p className="text-gray-600">{exp.duration}</p>
                          <p>{exp.description}</p>
                        </div>
                      )
                    ))}
                  </div>
                )}

                {generatedResume.education.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-bold border-b pb-1">EDUCATION</h3>
                    {generatedResume.education.map((edu: any, i: number) => (
                      (edu.degree || edu.university) && (
                        <div key={i} className="text-sm mt-2">
                          <p className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</p>
                          <p>{edu.university} - {edu.graduationYear}</p>
                        </div>
                      )
                    ))}
                  </div>
                )}

                {generatedResume.projects.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-bold border-b pb-1">PROJECTS</h3>
                    {generatedResume.projects.map((proj: any, i: number) => (
                      proj.title && (
                        <div key={i} className="text-sm mt-2">
                          <p className="font-semibold">{proj.title}</p>
                          <p>{proj.description}</p>
                          <p className="text-gray-600">Tech: {proj.technologies}</p>
                        </div>
                      )
                    ))}
                  </div>
                )}

                {generatedResume.certificates.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-bold border-b pb-1">CERTIFICATIONS</h3>
                    {generatedResume.certificates.map((cert: any, i: number) => (
                      cert.name && (
                        <div key={i} className="text-sm mt-2">
                          <p className="font-semibold">{cert.name}</p>
                          <p className="text-gray-600">{cert.issuer} - {cert.date}</p>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
