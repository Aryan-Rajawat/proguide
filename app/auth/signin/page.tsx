"use client"

import { useState } from "react"

import type React from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedCredentials = localStorage.getItem("savedCredentials")
    if (savedCredentials) {
      const { email: savedEmail, password: savedPassword } = JSON.parse(savedCredentials)
      setEmail(savedEmail)
      setPassword(savedPassword)
      setRememberMe(true)
    }
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setIsLoading(true)

    setTimeout(() => {
      if (!email) {
        setPasswordError("Please enter your email")
        setIsLoading(false)
        return
      }

      if (rememberMe) {
        localStorage.setItem("savedCredentials", JSON.stringify({ email, password }))
      } else {
        localStorage.removeItem("savedCredentials")
      }

      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const existingUser = registeredUsers.find((user: any) => user.email === email)

      let userData
      if (existingUser) {
        userData = {
          ...existingUser,
          lastLogin: new Date().toISOString(),
        }
        // Update the user in registered users
        const updatedUsers = registeredUsers.map((user: any) => (user.email === email ? userData : user))
        localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))
      } else {
        userData = {
          id: Date.now().toString(),
          email: email,
          name: email
            .split("@")[0]
            .replace(/[._]/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          joinDate: new Date().toISOString(),
          profileComplete: false,
          lastLogin: new Date().toISOString(),
          careerGoals: "",
          skills: [],
        }
        // Add to registered users
        registeredUsers.push(userData)
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))
      }

      localStorage.setItem("currentUser", JSON.stringify(userData))

      const activityKey = `userActivity_${userData.email}`
      const existingActivity = localStorage.getItem(activityKey)
      const activityList = existingActivity ? JSON.parse(existingActivity) : []

      activityList.unshift({
        timestamp: new Date().toISOString(),
        activity: `Logged in to ProGuide`,
        type: "login",
      })

      // Keep only last 20 activities
      const trimmedActivity = activityList.slice(0, 20)
      localStorage.setItem(activityKey, JSON.stringify(trimmedActivity))
      // Also set as current activity for dashboard
      localStorage.setItem("userActivity", JSON.stringify(trimmedActivity))

      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ProGuide</span>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-xs text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError("")
                  }}
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
              {passwordError && (
                <div className="flex items-center gap-2 p-2 bg-red-50 rounded border border-red-200">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600">{passwordError}</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                Remember me
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
