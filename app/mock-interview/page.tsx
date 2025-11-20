"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Play, Pause, RotateCcw, CheckCircle, Clock, Target, TrendingUp, Lightbulb } from "lucide-react"

export default function MockInterviewPage() {
  const [interviewType, setInterviewType] = useState("")
  const [targetRole, setTargetRole] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const interviewQuestions = {
    technical: [
      "Explain the difference between let, const, and var in JavaScript.",
      "How would you optimize a slow-performing database query?",
      "Describe the concept of closures in JavaScript with an example.",
      "What are the principles of RESTful API design?",
      "How would you handle state management in a large React application?",
    ],
    behavioral: [
      "Tell me about a time when you had to work with a difficult team member.",
      "Describe a situation where you had to meet a tight deadline.",
      "How do you handle constructive criticism?",
      "Tell me about a project you're particularly proud of.",
      "Describe a time when you had to learn a new technology quickly.",
    ],
    case_study: [
      "How would you design a system to handle 1 million concurrent users?",
      "A client wants to increase their e-commerce conversion rate by 20%. What would you recommend?",
      "How would you prioritize features for a new mobile app with limited resources?",
      "Design a recommendation system for a streaming platform.",
      "How would you approach reducing customer churn for a SaaS product?",
    ],
  }

  const startInterview = () => {
    setIsInterviewStarted(true)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  const nextQuestion = () => {
    if (currentQuestion < getCurrentQuestions().length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishInterview()
    }
  }

  const finishInterview = () => {
    setIsInterviewStarted(false)
    setShowResults(true)

    // Save interview session to localStorage with real data
    const interviewSessions = JSON.parse(localStorage.getItem("interviewSessions") || "[]")
    const mockResults = generateMockResults()

    const newSession = {
      id: Date.now().toString(),
      type: interviewType,
      targetRole: targetRole,
      score: mockResults.overallScore,
      questionsAsked: currentQuestion + 1,
      totalQuestions: getCurrentQuestions().length,
      answers: answers,
      results: mockResults,
      completedAt: new Date().toISOString(),
    }

    interviewSessions.push(newSession)
    localStorage.setItem("interviewSessions", JSON.stringify(interviewSessions))

    const userActivity = JSON.parse(localStorage.getItem("userActivity") || "[]")
    userActivity.push({
      timestamp: new Date().toISOString(),
      activity: `Completed ${interviewType.replace("_", " ")} interview - Score: ${mockResults.overallScore}/100`,
      type: "interview_completed",
      interviewId: newSession.id,
      score: mockResults.overallScore,
    })
    localStorage.setItem("userActivity", JSON.stringify(userActivity))
  }

  const getCurrentQuestions = () => {
    return interviewQuestions[interviewType as keyof typeof interviewQuestions] || []
  }

  const generateMockResults = () => {
    // Calculate answer quality based on word count and structure
    const answerQuality =
      answers.reduce((sum, answer) => {
        const wordCount = answer.trim().split(/\s+/).length
        // Higher scores for longer, more detailed answers
        const qualityScore = Math.min(wordCount / 30, 1)
        return sum + qualityScore
      }, 0) / (answers.length || 1)

    // Base score calculation with reduced randomness for consistency
    const baseScore = 65 + answerQuality * 30
    const finalScore = Math.min(Math.max(Math.round(baseScore), 60), 100)

    return {
      overallScore: finalScore,
      strengths: [
        "Clear and concise communication",
        "Strong problem-solving approach",
        "Good technical understanding",
        "Relevant examples provided",
      ].slice(0, 3),
      improvements: [
        "Provide more specific examples",
        "Structure answers using STAR method",
        "Show more enthusiasm for the role",
        "Include quantifiable results",
      ].slice(0, 3),
      questionScores: [
        { question: "Technical concepts", score: Math.min(finalScore + 5, 100) },
        { question: "Problem solving", score: finalScore },
        { question: "Communication", score: Math.min(finalScore + 3, 100) },
        { question: "Cultural fit", score: Math.min(finalScore - 3, 100) },
      ].map((item) => ({ ...item, score: Math.round(item.score) })),
    }
  }

  const mockResults = generateMockResults()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Interview Practice</h1>
        <p className="text-gray-600">Practice with AI-generated questions tailored to your target role</p>
      </div>

      {!isInterviewStarted && !showResults && (
        <>
          {/* Interview Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Interview Setup
              </CardTitle>
              <CardDescription>Configure your mock interview session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interview Type</label>
                  <Select onValueChange={setInterviewType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interview type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Interview</SelectItem>
                      <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                      <SelectItem value="case_study">Case Study Interview</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Role</label>
                  <Select onValueChange={setTargetRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software-engineer">Software Engineer</SelectItem>
                      <SelectItem value="data-scientist">Data Scientist</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                      <SelectItem value="ux-designer">UX Designer</SelectItem>
                      <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button size="lg" onClick={startInterview} disabled={!interviewType || !targetRole} className="px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Start Interview
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interview Types Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technical Interview</CardTitle>
                <CardDescription>Test your technical knowledge and problem-solving skills</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Coding concepts and algorithms</li>
                  <li>• System design questions</li>
                  <li>• Technology-specific queries</li>
                  <li>• Best practices and patterns</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Behavioral Interview</CardTitle>
                <CardDescription>Assess your soft skills and cultural fit</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Leadership and teamwork</li>
                  <li>• Problem-solving scenarios</li>
                  <li>• Communication skills</li>
                  <li>• Career motivation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Case Study Interview</CardTitle>
                <CardDescription>Evaluate your analytical and strategic thinking</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Business problem solving</li>
                  <li>• Strategic thinking</li>
                  <li>• Data analysis</li>
                  <li>• Recommendation frameworks</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Interview Session */}
      {isInterviewStarted && (
        <div className="space-y-6">
          {/* Progress */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{interviewType.replace("_", " ").toUpperCase()}</Badge>
                  <Badge variant="outline">
                    Question {currentQuestion + 1} of {getCurrentQuestions().length}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>15:30</span>
                </div>
              </div>
              <Progress value={((currentQuestion + 1) / getCurrentQuestions().length) * 100} className="h-2" />
            </CardContent>
          </Card>

          {/* Current Question */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{getCurrentQuestions()[currentQuestion]}</CardTitle>
              <CardDescription>
                Take your time to think through your answer. Speak clearly and provide specific examples.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  size="lg"
                  onClick={() => setIsRecording(!isRecording)}
                  className="px-8"
                >
                  {isRecording ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Restart Question
                </Button>
              </div>

              {isRecording && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Recording in progress...
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Written Answer (Optional)</label>
                <Textarea
                  placeholder="You can also type your answer here for reference..."
                  rows={6}
                  value={answers[currentQuestion] || ""}
                  onChange={(e) => {
                    const newAnswers = [...answers]
                    newAnswers[currentQuestion] = e.target.value
                    setAnswers(newAnswers)
                  }}
                />
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous Question
                </Button>
                <Button onClick={nextQuestion}>
                  {currentQuestion === getCurrentQuestions().length - 1 ? "Finish Interview" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Interview Complete!
              </CardTitle>
              <CardDescription>Here's your performance analysis and recommendations for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{mockResults.overallScore}/100</div>
                <p className="text-gray-600">Overall Interview Score</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {mockResults.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {mockResults.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Target className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance</CardTitle>
              <CardDescription>Breakdown of your performance by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockResults.questionScores.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.question}</span>
                      <span className="text-blue-600">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                setShowResults(false)
                setIsInterviewStarted(false)
                setCurrentQuestion(0)
              }}
            >
              Start New Interview
            </Button>
            <Button variant="outline">Download Report</Button>
            <Button variant="outline">Share Results</Button>
          </div>
        </div>
      )}
    </div>
  )
}
