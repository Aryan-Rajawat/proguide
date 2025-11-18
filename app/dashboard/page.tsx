"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BarChart3, BrainCircuit, Calendar, FileText, MessageSquare, Target, TrendingUp, User, Briefcase, Clock, Award } from 'lucide-react'
import Link from "next/link"

interface UserData {
  email: string
  name: string
  joinDate: string
  profileComplete: boolean
  lastLogin: string
}

const convertToRupees = (dollars: number): string => {
  const rupees = dollars * 83 // Approximate conversion rate
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(rupees)
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 bg-white/20">
            <AvatarFallback className="text-white text-xl font-bold">{getInitials(userData.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {userData.name}!</h1>
            <p className="text-blue-100 mt-1">Member since {formatDate(userData.joinDate)}</p>
            <p className="text-blue-100 text-sm">Last login: {formatDate(userData.lastLogin)}</p>
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      {!userData.profileComplete && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <User className="w-5 h-5" />
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-orange-600">
              Complete your profile to get personalized career recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Profile completion</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2" />
              <Button className="w-full bg-orange-600 hover:bg-orange-700">Complete Profile</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{convertToRupees(3)}</p>
                <p className="text-sm text-gray-600">Earning Potential</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{convertToRupees(12)}</p>
                <p className="text-sm text-gray-600">Monthly Target</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-gray-600">Skill Match</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{convertToRupees(7)}</p>
                <p className="text-sm text-gray-600">Bonus Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">Resume updated</p>
                    <p className="text-sm text-gray-600">Software Engineer resume - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium">Mock interview completed</p>
                    <p className="text-sm text-gray-600">Technical interview practice - Yesterday</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="font-medium">Career insights generated</p>
                    <p className="text-sm text-gray-600">Weekly report available - 3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with your career development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/resume-generator">
                  <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                    <FileText className="w-6 h-6" />
                    Create Resume
                  </Button>
                </Link>
                <Link href="/mock-interview">
                  <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                    <MessageSquare className="w-6 h-6" />
                    Practice Interview
                  </Button>
                </Link>
                <Link href="/career-insights">
                  <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                    <BarChart3 className="w-6 h-6" />
                    View Insights
                  </Button>
                </Link>
                <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                  <Briefcase className="w-6 h-6" />
                  Find Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Career Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Career Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Land a Senior Role</span>
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Improve Technical Skills</span>
                    <span className="text-sm text-gray-600">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Build Network</span>
                    <span className="text-sm text-gray-600">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Update LinkedIn profile</p>
                    <p className="text-xs text-gray-600">Due today</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Practice system design</p>
                    <p className="text-xs text-gray-600">Due tomorrow</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Apply to 5 jobs</p>
                    <p className="text-xs text-gray-600">Due this week</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5" />
                Skills Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">JavaScript</span>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">React</span>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Node.js</span>
                  <Badge variant="outline">Intermediate</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Design</span>
                  <Badge variant="outline">Learning</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
