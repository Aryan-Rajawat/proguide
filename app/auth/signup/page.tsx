"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    careerGoals: "",
    skills: "" as string,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })
  const router = useRouter()

  const validatePassword = (pwd: string) => {
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
    }
    setPasswordChecks(checks)
    return Object.values(checks).every((check) => check)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "password") {
      if (value) {
        validatePassword(value)
      } else {
        setPasswordChecks({
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          special: false,
        })
      }
    }

    if (name === "email") {
      setEmailError("")
    }
  }

  const handleNextStep = () => {
    if (step === 1) {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const existingUser = registeredUsers.find((user: any) => user.email === formData.email)

      if (existingUser) {
        setEmailError("An account with this email already exists. Please sign in instead.")
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords do not match")
        return
      }
      if (!Object.values(passwordChecks).every((check) => check)) {
        setPasswordError("Password does not meet all requirements")
        return
      }
    }
    setStep(step + 1)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      const skillsArray = formData.skills
        .split(",")
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)

      const userData = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        joinDate: new Date().toISOString(),
        profileComplete: true,
        lastLogin: new Date().toISOString(),
        careerGoals: formData.careerGoals,
        skills: skillsArray,
      }

      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      registeredUsers.push(userData)
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))

      localStorage.setItem("currentUser", JSON.stringify(userData))

      const activityKey = `userActivity_${userData.email}`
      const initialActivity = [
        {
          timestamp: new Date().toISOString(),
          activity: "Created ProGuide account",
          type: "signup",
        },
      ]
      localStorage.setItem(activityKey, JSON.stringify(initialActivity))
      localStorage.setItem("userActivity", JSON.stringify(initialActivity))

      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const allPasswordChecksPassed = Object.values(passwordChecks).every((check) => check)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ProGuide</span>
          </div>
          <CardTitle className="text-2xl">{step === 1 ? "Create your account" : "Tell us about your goals"}</CardTitle>
          <CardDescription>
            {step === 1 ? "Start your AI-powered career journey today" : "Help us personalize your experience"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={
              step === 2
                ? handleSignUp
                : (e) => {
                    e.preventDefault()
                    handleNextStep()
                  }
            }
            className="space-y-4"
          >
            {step === 1 ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {emailError && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>

                  {formData.password && (
                    <div className="space-y-2 mt-2 text-sm">
                      <div className="flex items-center gap-2">
                        {passwordChecks.length ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className={passwordChecks.length ? "text-green-600" : "text-red-600"}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordChecks.uppercase ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className={passwordChecks.uppercase ? "text-green-600" : "text-red-600"}>
                          One uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordChecks.lowercase ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className={passwordChecks.lowercase ? "text-green-600" : "text-red-600"}>
                          One lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordChecks.number ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className={passwordChecks.number ? "text-green-600" : "text-red-600"}>One number</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordChecks.special ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className={passwordChecks.special ? "text-green-600" : "text-red-600"}>
                          One special character (!@#$%^&*)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  {passwordError && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {passwordError}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading || !allPasswordChecksPassed}>
                  Next
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="careerGoals">What's your career goal?</Label>
                  <Input
                    id="careerGoals"
                    name="careerGoals"
                    placeholder="e.g., Become a Senior Software Engineer"
                    value={formData.careerGoals}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Your current skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="e.g., JavaScript, React, Node.js"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Profile"}
                  </Button>
                </div>
              </>
            )}
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
