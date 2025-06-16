import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, FileText, MessageSquare, TrendingUp, Shield, Clock } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CareerAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">AI-Powered Career Guidance</Badge>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Transform Your Career with
          <span className="text-blue-600 block">Intelligent AI Guidance</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Get personalized career insights, AI-generated resumes, mock interview preparation, and real-time industry
          trends to accelerate your professional growth.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need for Career Success</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive tools to guide your career journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Real-time Career Insights</CardTitle>
              <CardDescription>
                Get personalized career recommendations based on current industry trends and market demands
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Industry trend analysis</li>
                <li>• Salary benchmarking</li>
                <li>• Skill gap identification</li>
                <li>• Career path recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <FileText className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>AI Resume & Cover Letter Generator</CardTitle>
              <CardDescription>
                Create professional, ATS-optimized resumes and personalized cover letters in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• ATS-optimized templates</li>
                <li>• Industry-specific content</li>
                <li>• Keyword optimization</li>
                <li>• Multiple format exports</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <MessageSquare className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle>Mock Interview Preparation</CardTitle>
              <CardDescription>
                Practice with AI-generated interview questions tailored to your target role and industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Role-specific questions</li>
                <li>• Real-time feedback</li>
                <li>• Performance analytics</li>
                <li>• Improvement suggestions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Shield className="w-12 h-12 text-red-600 mb-4" />
              <CardTitle>Secure Data Management</CardTitle>
              <CardDescription>
                Your personal and professional data is protected with enterprise-grade security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• End-to-end encryption</li>
                <li>• GDPR compliant</li>
                <li>• Secure authentication</li>
                <li>• Data privacy controls</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Clock className="w-12 h-12 text-orange-600 mb-4" />
              <CardTitle>Weekly Career Insights</CardTitle>
              <CardDescription>
                Receive automated weekly reports with personalized career recommendations and market updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Personalized reports</li>
                <li>• Market trend updates</li>
                <li>• Skill recommendations</li>
                <li>• Job opportunity alerts</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Brain className="w-12 h-12 text-indigo-600 mb-4" />
              <CardTitle>AI-Powered Analytics</CardTitle>
              <CardDescription>
                Advanced AI algorithms analyze your profile and provide intelligent career guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Career trajectory analysis</li>
                <li>• Skill progression tracking</li>
                <li>• Goal achievement metrics</li>
                <li>• Personalized recommendations</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Accelerate Your Career?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who are already using AI to advance their careers
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              <span className="text-xl font-bold">CareerAI</span>
            </div>
            <p className="text-gray-400">© 2024 CareerAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
