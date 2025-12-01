"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Clock, Search, Heart, ExternalLink, Building2, GraduationCap, Trophy } from "lucide-react"

interface JobSource {
  name: string
  logo: string
  color: string
  searchUrl: (query: string, location: string) => string
}

const jobSources: JobSource[] = [
  {
    name: "LinkedIn",
    logo: "🔗",
    color: "bg-blue-600",
    searchUrl: (query, location) =>
      `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&f_TPR=r604800`,
  },
  {
    name: "Unstop",
    logo: "🏆",
    color: "bg-orange-500",
    searchUrl: (query, location) =>
      `https://unstop.com/jobs?search=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`,
  },
  {
    name: "Naukri",
    logo: "📋",
    color: "bg-blue-500",
    searchUrl: (query, location) =>
      `https://www.naukri.com/${query.toLowerCase().replace(/\s+/g, "-")}-jobs-in-${location.toLowerCase().replace(/\s+/g, "-")}`,
  },
  {
    name: "Indeed",
    logo: "💼",
    color: "bg-purple-600",
    searchUrl: (query, location) =>
      `https://in.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location)}`,
  },
]

const jobCategories = [
  {
    title: "Software Development",
    roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Software Engineer", "Mobile Developer"],
    icon: "💻",
    trending: true,
  },
  {
    title: "Data & AI",
    roles: ["Data Scientist", "Data Analyst", "ML Engineer", "AI Engineer", "Data Engineer"],
    icon: "🤖",
    trending: true,
  },
  {
    title: "Cloud & DevOps",
    roles: ["DevOps Engineer", "Cloud Engineer", "SRE", "Platform Engineer", "AWS Architect"],
    icon: "☁️",
    trending: true,
  },
  {
    title: "Product & Design",
    roles: ["Product Manager", "UX Designer", "UI Designer", "Product Designer", "UX Researcher"],
    icon: "🎨",
    trending: false,
  },
  {
    title: "Cybersecurity",
    roles: ["Security Engineer", "SOC Analyst", "Penetration Tester", "Security Architect", "CISO"],
    icon: "🔒",
    trending: true,
  },
  {
    title: "Management",
    roles: ["Engineering Manager", "Tech Lead", "Project Manager", "Scrum Master", "CTO"],
    icon: "👔",
    trending: false,
  },
]

const featuredCompanies = [
  { name: "Google", logo: "🔵", careers: "https://careers.google.com/jobs/results/?location=India", jobs: "500+" },
  {
    name: "Microsoft",
    logo: "🟦",
    careers: "https://careers.microsoft.com/v2/global/en/locations/india",
    jobs: "400+",
  },
  { name: "Amazon", logo: "🟠", careers: "https://www.amazon.jobs/en/locations/india", jobs: "600+" },
  { name: "Flipkart", logo: "🟡", careers: "https://www.flipkartcareers.com/#!/joblist", jobs: "200+" },
  { name: "Swiggy", logo: "🍊", careers: "https://careers.swiggy.com/", jobs: "150+" },
  { name: "Razorpay", logo: "🔷", careers: "https://razorpay.com/jobs/", jobs: "100+" },
  { name: "Zomato", logo: "🔴", careers: "https://www.zomato.com/careers", jobs: "120+" },
  { name: "Paytm", logo: "🔵", careers: "https://paytm.com/careers/", jobs: "180+" },
  { name: "PhonePe", logo: "🟣", careers: "https://www.phonepe.com/careers/", jobs: "200+" },
  { name: "Infosys", logo: "🔷", careers: "https://www.infosys.com/careers/", jobs: "1000+" },
  { name: "TCS", logo: "⬛", careers: "https://www.tcs.com/careers/", jobs: "1500+" },
  { name: "Wipro", logo: "🟢", careers: "https://careers.wipro.com/", jobs: "800+" },
]

const unstopOpportunities = [
  {
    title: "Google Summer of Code",
    type: "Internship",
    deadline: "Ongoing",
    link: "https://unstop.com/competitions?type=internships",
    prize: "Stipend + Certificate",
  },
  {
    title: "Smart India Hackathon",
    type: "Hackathon",
    deadline: "Check Website",
    link: "https://unstop.com/hackathons",
    prize: "₹1,00,000+",
  },
  {
    title: "Amazon ML Challenge",
    type: "Competition",
    deadline: "Check Website",
    link: "https://unstop.com/competitions?company=Amazon",
    prize: "₹5,00,000+",
  },
  {
    title: "Flipkart GRiD",
    type: "Competition",
    deadline: "Annual",
    link: "https://unstop.com/competitions?company=Flipkart",
    prize: "PPO + Cash",
  },
  {
    title: "Microsoft Imagine Cup",
    type: "Competition",
    deadline: "Check Website",
    link: "https://unstop.com/competitions?company=Microsoft",
    prize: "Global Recognition",
  },
  {
    title: "HackerEarth Challenges",
    type: "Coding",
    deadline: "Multiple",
    link: "https://unstop.com/competitions?type=coding",
    prize: "Varies",
  },
]

const locations = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Kolkata", "Remote"]

export default function JobsContent() {
  const [searchTerm, setSearchTerm] = useState("Software Engineer")
  const [selectedLocation, setSelectedLocation] = useState("Bangalore")
  const [savedSearches, setSavedSearches] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("savedJobSearches")
    if (saved) {
      setSavedSearches(JSON.parse(saved))
    }
  }, [])

  const saveSearch = () => {
    const searchKey = `${searchTerm} - ${selectedLocation}`
    if (!savedSearches.includes(searchKey)) {
      const updated = [...savedSearches, searchKey]
      setSavedSearches(updated)
      localStorage.setItem("savedJobSearches", JSON.stringify(updated))
    }
  }

  const openJobSearch = (source: JobSource) => {
    const url = source.searchUrl(searchTerm, selectedLocation)
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Real Jobs</h1>
        <p className="text-gray-600">Search current job openings from LinkedIn, Unstop, Naukri, and more</p>
      </div>

      {/* Search Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Job Title / Keywords</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="e.g. React Developer, Data Scientist..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={saveSearch} variant="outline" className="w-full bg-transparent">
                <Heart className="w-4 h-4 mr-2" />
                Save Search
              </Button>
            </div>
          </div>

          {/* Job Source Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {jobSources.map((source) => (
              <Button
                key={source.name}
                onClick={() => openJobSearch(source)}
                className={`${source.color} hover:opacity-90 text-white`}
              >
                <span className="mr-2">{source.logo}</span>
                Search {source.name}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Job Categories</TabsTrigger>
          <TabsTrigger value="companies">Companies Hiring</TabsTrigger>
          <TabsTrigger value="unstop">Unstop Opportunities</TabsTrigger>
        </TabsList>

        {/* Job Categories */}
        <TabsContent value="categories" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.title}
                    </span>
                    {category.trending && <Badge className="bg-green-100 text-green-700">Trending</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.roles.map((role, roleIndex) => (
                      <div
                        key={roleIndex}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSearchTerm(role)
                          window.open(
                            `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role)}&location=India`,
                            "_blank",
                          )
                        }}
                      >
                        <span className="text-sm">{role}</span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Companies Hiring */}
        <TabsContent value="companies" className="space-y-4">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredCompanies.map((company, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => window.open(company.careers, "_blank")}
              >
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">{company.logo}</div>
                  <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
                    <Briefcase className="w-4 h-4" />
                    {company.jobs} jobs
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Building2 className="w-4 h-4 mr-2" />
                    View Careers
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Unstop Opportunities */}
        <TabsContent value="unstop" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                Competitions, Hackathons & Internships on Unstop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {unstopOpportunities.map((opp, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => window.open(opp.link, "_blank")}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{opp.title}</h3>
                      <Badge variant="secondary">{opp.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {opp.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {opp.prize}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View on Unstop
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-orange-600" />
                  More on Unstop
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.open("https://unstop.com/jobs", "_blank")}>
                    Jobs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://unstop.com/internships", "_blank")}
                  >
                    Internships
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://unstop.com/hackathons", "_blank")}
                  >
                    Hackathons
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://unstop.com/competitions", "_blank")}
                  >
                    Competitions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Saved Searches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {savedSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    const [term, loc] = search.split(" - ")
                    setSearchTerm(term)
                    setSelectedLocation(loc)
                  }}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Quick Job Search Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://www.linkedin.com/jobs/search/?f_TPR=r86400&location=India", "_blank")}
            >
              Today's Jobs (LinkedIn)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://unstop.com/jobs?type=fresher", "_blank")}
            >
              Fresher Jobs (Unstop)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://www.linkedin.com/jobs/search/?f_WT=2&location=India", "_blank")}
            >
              Remote Jobs (LinkedIn)
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open("https://unstop.com/internships", "_blank")}>
              Internships (Unstop)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
