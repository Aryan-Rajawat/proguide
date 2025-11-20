"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  BrainCircuit,
  Calendar,
  FileText,
  MessageSquare,
  Target,
  Briefcase,
  Clock,
  X,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"

interface UserData {
  email: string
  name: string
  joinDate: string
  profileComplete: boolean
  lastLogin: string
  id: string
  careerGoals?: string
  skills?: string[]
}

interface ActivityData {
  timestamp: string
  activity: string
}

interface Task {
  id: string
  title: string
  dueDate: string
  priority: "high" | "medium" | "low"
  completed: boolean
}

const convertToRupees = (dollars: number): string => {
  const rupees = dollars * 83
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(rupees)
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [activityData, setActivityData] = useState<ActivityData[] | null>(null)
  const [resumeCount, setResumeCount] = useState(0)
  const [interviewCount, setInterviewCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [newTaskDueDate, setNewTaskDueDate] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  )

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const storedUser = localStorage.getItem("currentUser")
        if (storedUser) {
          const user = JSON.parse(storedUser)
          setUserData(user)

          const { data: allResumes } = await supabase.from("resumes").select("id").eq("user_id", user.id)
          setResumeCount(allResumes?.length || 0)

          try {
            const { data: interviews } = await supabase.from("mock_interviews").select("id").eq("user_id", user.id)
            setInterviewCount(interviews?.length || 0)
          } catch {
            const localInterviews = JSON.parse(localStorage.getItem("interviewSessions") || "[]")
            setInterviewCount(localInterviews.length)
          }
        }

        const storedActivity = localStorage.getItem("userActivity")
        if (storedActivity) {
          setActivityData(JSON.parse(storedActivity))
        }

        const storedTasks = localStorage.getItem("userTasks")
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks))
        }
      } catch (error) {
        console.log("[v0] Error initializing dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeDashboard()
  }, [])

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        dueDate: newTaskDueDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        priority: "medium",
        completed: false,
      }
      const updatedTasks = [...tasks, task]
      setTasks(updatedTasks)
      localStorage.setItem("userTasks", JSON.stringify(updatedTasks))
      setNewTask("")
      setNewTaskDueDate("")
    }
  }

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId)
    setTasks(updatedTasks)
    localStorage.setItem("userTasks", JSON.stringify(updatedTasks))
  }

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    setTasks(updatedTasks)
    localStorage.setItem("userTasks", JSON.stringify(updatedTasks))
  }

  const getInitials = (name: string | undefined) => {
    if (!name) return "U"
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

  if (loading || !userData) {
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
            {userData.careerGoals && <p className="text-blue-100 text-sm">Goal: {userData.careerGoals}</p>}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{resumeCount}</p>
                <p className="text-sm text-gray-600">Resumes Created</p>
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
                <p className="text-2xl font-bold">{interviewCount}</p>
                <p className="text-sm text-gray-600">Mock Interviews Completed</p>
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
              <div className="space-y-4" id="activity-list">
                {activityData && activityData.length > 0 ? (
                  activityData.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(activity.timestamp).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No recent activity</p>
                )}
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
                <Link href="/jobs">
                  <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                    <Briefcase className="w-6 h-6" />
                    Find Jobs
                  </Button>
                </Link>
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
                Career Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{userData.careerGoals || "No career goal set"}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-2" />
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
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a new task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                  className="text-sm"
                />
                <Button size="sm" onClick={handleAddTask} className="px-3">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-600">{formatDate(task.dueDate)}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteTask(task.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No tasks yet. Add one to get started!</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5" />
                Your Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 flex flex-wrap gap-2">
                {userData.skills && userData.skills.length > 0 ? (
                  userData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No skills added yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
