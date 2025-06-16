"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Target, Briefcase, Users, Calendar, ArrowUp, Star, BookOpen, Zap } from "lucide-react"

export default function CareerInsightsPage() {
  const [selectedLocation, setSelectedLocation] = useState("San Francisco, CA")

  const marketTrends = [
    {
      role: "Software Engineer",
      growth: 15.5,
      demand: "High",
      avgSalary: 120000,
      openings: 2500,
      skills: ["React", "Node.js", "Python", "AWS", "Docker"],
    },
    {
      role: "Data Scientist",
      growth: 22.3,
      demand: "High",
      avgSalary: 110000,
      openings: 1200,
      skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
    },
    {
      role: "DevOps Engineer",
      growth: 25.8,
      demand: "High",
      avgSalary: 115000,
      openings: 800,
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
    },
    {
      role: "Product Manager",
      growth: 18.7,
      demand: "High",
      avgSalary: 130000,
      openings: 600,
      skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
    },
  ]

  const skillsInDemand = [
    { skill: "Artificial Intelligence", growth: 45, jobs: 15000 },
    { skill: "Cloud Computing", growth: 35, jobs: 25000 },
    { skill: "Cybersecurity", growth: 31, jobs: 12000 },
    { skill: "Data Analysis", growth: 28, jobs: 18000 },
    { skill: "Mobile Development", growth: 22, jobs: 14000 },
    { skill: "DevOps", growth: 26, jobs: 8000 },
  ]

  const personalInsights = [
    {
      type: "Skill Gap",
      title: "Recommended Skills to Learn",
      description: "Based on your profile and target roles",
      items: ["Kubernetes", "GraphQL", "TypeScript"],
      priority: "High",
    },
    {
      type: "Salary",
      title: "Salary Benchmark",
      description: "You're earning 15% above market average",
      items: ["Market avg: $95k", "Your range: $110k", "Top 25%: $125k"],
      priority: "Medium",
    },
    {
      type: "Career Path",
      title: "Next Career Steps",
      description: "Recommended progression based on your experience",
      items: ["Senior Engineer", "Tech Lead", "Engineering Manager"],
      priority: "Medium",
    },
  ]

  const weeklyInsights = [
    {
      date: "This Week",
      insights: [
        "React job postings increased by 12% in your area",
        "3 new companies are hiring for your skill set",
        "Average salary for your role increased by $2k",
      ],
    },
    {
      date: "Last Week",
      insights: [
        "TypeScript demand grew 8% across tech companies",
        "Remote work opportunities increased by 15%",
        "5 new startups posted senior developer roles",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Insights</h1>
        <p className="text-gray-600">Real-time market analysis and personalized career recommendations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Job Market Growth</p>
                <p className="text-2xl font-bold text-green-600">+18.5%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>vs last quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Salary</p>
                <p className="text-2xl font-bold text-blue-600">$118K</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2 text-sm text-blue-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>+8% YoY</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Positions</p>
                <p className="text-2xl font-bold text-purple-600">5,100</p>
              </div>
              <Briefcase className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2 text-sm text-purple-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>in your area</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Skill Match</p>
                <p className="text-2xl font-bold text-orange-600">87%</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-2 text-sm text-orange-600">
              <Star className="w-4 h-4 mr-1" />
              <span>with target roles</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="market-trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="market-trends">Market Trends</TabsTrigger>
          <TabsTrigger value="skills-demand">Skills in Demand</TabsTrigger>
          <TabsTrigger value="personal-insights">Personal Insights</TabsTrigger>
          <TabsTrigger value="weekly-updates">Weekly Updates</TabsTrigger>
        </TabsList>

        {/* Market Trends */}
        <TabsContent value="market-trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Job Market Trends
              </CardTitle>
              <CardDescription>Current market analysis for top roles in {selectedLocation}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{trend.role}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge
                            className={`${
                              trend.demand === "High" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {trend.demand} Demand
                          </Badge>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {trend.openings.toLocaleString()} openings
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">+{trend.growth}%</div>
                        <div className="text-sm text-gray-600">growth</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Average Salary</p>
                        <p className="text-xl font-bold text-blue-600">${trend.avgSalary.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Top Skills Required</p>
                        <div className="flex flex-wrap gap-1">
                          {trend.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills in Demand */}
        <TabsContent value="skills-demand" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Skills in High Demand
              </CardTitle>
              <CardDescription>Trending skills with the highest job market growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsInDemand.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{skill.skill}</h3>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{skill.jobs.toLocaleString()} jobs</span>
                          <span className="text-lg font-bold text-green-600">+{skill.growth}%</span>
                        </div>
                      </div>
                      <Progress value={skill.growth} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personal Insights */}
        <TabsContent value="personal-insights" className="space-y-6">
          <div className="grid md:grid-cols-1 gap-6">
            {personalInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        {insight.title}
                      </CardTitle>
                      <CardDescription>{insight.description}</CardDescription>
                    </div>
                    <Badge
                      className={`${
                        insight.priority === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {insight.priority} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {insight.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Weekly Updates */}
        <TabsContent value="weekly-updates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Weekly Career Updates
              </CardTitle>
              <CardDescription>Stay updated with the latest market changes and opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weeklyInsights.map((week, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {week.date}
                    </h3>
                    <div className="space-y-2 pl-6">
                      {week.insights.map((insight, insightIndex) => (
                        <div key={insightIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
              <CardDescription>Based on this week's market insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Learn TypeScript</p>
                    <p className="text-xs text-gray-600">High demand growth this week</p>
                  </div>
                  <Button size="sm" className="ml-auto">
                    Start Learning
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Update LinkedIn Profile</p>
                    <p className="text-xs text-gray-600">3 recruiters viewed your profile</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    Update Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
