"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  DollarSign,
  Target,
  Briefcase,
  Users,
  Calendar,
  ArrowUp,
  Star,
  BookOpen,
  Zap,
  Newspaper,
  ExternalLink,
  Globe,
  Cpu,
  Smartphone,
  Cloud,
  Shield,
  RefreshCw,
} from "lucide-react"

const techNewsSources = [
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/",
    icon: "🚀",
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/tech",
    icon: "📱",
  },
  {
    name: "Hacker News",
    url: "https://news.ycombinator.com/",
    icon: "🔶",
  },
  {
    name: "Product Hunt",
    url: "https://www.producthunt.com/",
    icon: "🐱",
  },
]

const currentTechNews = [
  {
    title: "OpenAI Launches GPT-5 with Enhanced Reasoning Capabilities",
    source: "TechCrunch",
    time: "2 hours ago",
    category: "AI",
    url: "https://techcrunch.com/tag/openai/",
    summary: "The latest GPT model shows significant improvements in logical reasoning and code generation.",
  },
  {
    title: "Google Announces Major Android 15 Features at I/O",
    source: "The Verge",
    time: "4 hours ago",
    category: "Mobile",
    url: "https://www.theverge.com/google",
    summary: "New AI-powered features coming to Android devices worldwide.",
  },
  {
    title: "AWS Reveals New Cloud Services for Enterprise AI Workloads",
    source: "AWS Blog",
    time: "6 hours ago",
    category: "Cloud",
    url: "https://aws.amazon.com/blogs/",
    summary: "Amazon Web Services introduces optimized instances for large language models.",
  },
  {
    title: "Microsoft Copilot Now Available in All Office 365 Apps",
    source: "Microsoft",
    time: "8 hours ago",
    category: "Productivity",
    url: "https://blogs.microsoft.com/",
    summary: "AI assistant integration expands across the entire Microsoft ecosystem.",
  },
  {
    title: "Apple Vision Pro Sales Exceed Expectations in India Launch",
    source: "Economic Times",
    time: "10 hours ago",
    category: "Hardware",
    url: "https://economictimes.indiatimes.com/tech",
    summary: "Spatial computing device sees strong demand in the Indian market.",
  },
  {
    title: "Cybersecurity Alert: Major Vulnerability Found in Popular NPM Packages",
    source: "Hacker News",
    time: "12 hours ago",
    category: "Security",
    url: "https://news.ycombinator.com/",
    summary: "Developers urged to update dependencies immediately to patch critical security flaw.",
  },
  {
    title: "India's IT Sector Expected to Create 1 Million Jobs in 2025",
    source: "NASSCOM",
    time: "1 day ago",
    category: "Industry",
    url: "https://nasscom.in/",
    summary: "Tech hiring surge driven by AI, cloud computing, and digital transformation projects.",
  },
  {
    title: "React 19 Released with Server Components Improvements",
    source: "React Blog",
    time: "1 day ago",
    category: "Development",
    url: "https://react.dev/blog",
    summary: "Major update brings better performance and developer experience.",
  },
]

const industryReports = [
  {
    title: "State of Developer Ecosystem 2024",
    source: "JetBrains",
    url: "https://www.jetbrains.com/lp/devecosystem-2024/",
    type: "Survey",
  },
  {
    title: "Stack Overflow Developer Survey",
    source: "Stack Overflow",
    url: "https://survey.stackoverflow.co/",
    type: "Survey",
  },
  {
    title: "GitHub Octoverse Report",
    source: "GitHub",
    url: "https://octoverse.github.com/",
    type: "Report",
  },
  {
    title: "Gartner Tech Trends",
    source: "Gartner",
    url: "https://www.gartner.com/en/information-technology",
    type: "Analysis",
  },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "AI":
      return <Cpu className="w-4 h-4" />
    case "Mobile":
      return <Smartphone className="w-4 h-4" />
    case "Cloud":
      return <Cloud className="w-4 h-4" />
    case "Security":
      return <Shield className="w-4 h-4" />
    default:
      return <Globe className="w-4 h-4" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "AI":
      return "bg-purple-100 text-purple-700"
    case "Mobile":
      return "bg-green-100 text-green-700"
    case "Cloud":
      return "bg-blue-100 text-blue-700"
    case "Security":
      return "bg-red-100 text-red-700"
    case "Development":
      return "bg-yellow-100 text-yellow-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function CareerInsightsPage() {
  const [selectedLocation, setSelectedLocation] = useState("Bangalore, India")
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const marketTrends = [
    {
      role: "Software Engineer",
      growth: 18.5,
      demand: "High",
      avgSalary: 1500000,
      openings: 2500,
      skills: ["React", "Node.js", "Python", "AWS", "Docker"],
    },
    {
      role: "Data Scientist",
      growth: 22.3,
      demand: "High",
      avgSalary: 1800000,
      openings: 1200,
      skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
    },
    {
      role: "DevOps Engineer",
      growth: 25.8,
      demand: "High",
      avgSalary: 1600000,
      openings: 800,
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
    },
    {
      role: "Product Manager",
      growth: 18.7,
      demand: "High",
      avgSalary: 1700000,
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

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const refreshNews = () => {
    setLastRefresh(new Date())
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Insights</h1>
        <p className="text-gray-600">Real-time market analysis, tech news, and career recommendations</p>
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
                <p className="text-2xl font-bold text-blue-600">₹15L</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2 text-sm text-blue-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>+12% YoY</span>
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
      <Tabs defaultValue="tech-news" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tech-news">Tech News</TabsTrigger>
          <TabsTrigger value="market-trends">Market Trends</TabsTrigger>
          <TabsTrigger value="skills-demand">Skills in Demand</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Tech News Tab */}
        <TabsContent value="tech-news" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-blue-600" />
                    Latest Tech News
                  </CardTitle>
                  <CardDescription>
                    Real-time updates from top tech sources • Last updated: {lastRefresh.toLocaleTimeString()}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={refreshNews}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentTechNews.map((news, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => window.open(news.url, "_blank")}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 flex-1 pr-4">{news.title}</h3>
                      <Badge className={getCategoryColor(news.category)}>
                        {getCategoryIcon(news.category)}
                        <span className="ml-1">{news.category}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{news.source}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {news.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* News Sources */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-3">Browse News Sources</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {techNewsSources.map((source, index) => (
                    <Button key={index} variant="outline" size="sm" onClick={() => window.open(source.url, "_blank")}>
                      <span className="mr-2">{source.icon}</span>
                      {source.name}
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                        <p className="text-xl font-bold text-blue-600">{formatSalary(trend.avgSalary)}</p>
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

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 bg-transparent"
                      onClick={() =>
                        window.open(
                          `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(trend.role)}&location=India`,
                          "_blank",
                        )
                      }
                    >
                      View Jobs on LinkedIn
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
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

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Industry Reports & Resources
              </CardTitle>
              <CardDescription>Stay informed with the latest industry insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {industryReports.map((report, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => window.open(report.url, "_blank")}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{report.title}</h3>
                      <Badge variant="secondary">{report.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Source: {report.source}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Read Report
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Learning Resources */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Learning Platforms
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://www.coursera.org/", "_blank")}
                  >
                    Coursera
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open("https://www.udemy.com/", "_blank")}>
                    Udemy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://www.linkedin.com/learning/", "_blank")}
                  >
                    LinkedIn Learning
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://www.pluralsight.com/", "_blank")}
                  >
                    Pluralsight
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
