"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit2, Save, X } from 'lucide-react'
import Link from "next/link"

interface UserData {
  email: string
  name: string
  joinDate: string
  profileComplete: boolean
  lastLogin: string
  phone?: string
  location?: string
  bio?: string
  professionalSummary?: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<UserData>>({})
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserData(user)
      setFormData(user)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const updatedUser = { ...userData, ...formData }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    setUserData(updatedUser)
    setIsEditing(false)
    setSaveMessage("Profile updated successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your profile information</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "destructive" : "default"}
          className="gap-2"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {saveMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {saveMessage}
        </div>
      )}

      {/* Profile Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 bg-blue-600">
              <AvatarFallback className="text-white text-2xl font-bold">
                {getInitials(userData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
              <div className="flex gap-4 mt-2 flex-wrap">
                <Badge variant="secondary">Member since {formatDate(userData.joinDate)}</Badge>
                <Badge variant="outline">Last login: {formatDate(userData.lastLogin)}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your contact details and basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isEditing ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600">Full Name</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{userData.phone || "Not added"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Location</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{userData.location || "Not added"}</p>
              </div>
              {userData.bio && (
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-600">Bio</p>
                  <p className="text-gray-700 mt-1">{userData.bio}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md text-gray-900"
                />
              </div>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link href="/settings">
            <Button variant="outline" className="w-full justify-start">
              Go to Settings
            </Button>
          </Link>
          <Link href="/resume-generator">
            <Button variant="outline" className="w-full justify-start">
              Create or Edit Resume
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
