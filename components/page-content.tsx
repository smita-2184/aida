"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Users,
  Euro,
  FileText,
  Download,
  Upload,
  Edit3,
  Save,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Server,
  Heart,
  Lock,
} from "lucide-react"
import ProjectOverview from "@/components/project-overview"
import WorkPackages from "@/components/work-packages"
import Timeline from "@/components/timeline"
import Budget from "@/components/budget"
import Partners from "@/components/partners"
import Modules from "@/components/modules"
import AIFactories from "@/components/ai-factories"
import LivingLab from "@/components/living-lab"
import { type ProjectData, defaultProjectData } from "@/lib/project-data"
import { useAuth } from "@/hooks/use-auth"

export default function PageContent() {
  const { user, loading } = useAuth()
  const [projectData, setProjectData] = useState<ProjectData>(defaultProjectData)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)

  // Save data to localStorage whenever projectData changes
  useEffect(() => {
    localStorage.setItem("aida-project-data", JSON.stringify(projectData))
  }, [projectData])

  const handleSave = () => {
    setIsEditing(false)
    alert("Project data saved successfully!")
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(projectData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = "aida-project-data.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string)
          setProjectData(importedData)
          alert("Project data imported successfully!")
        } catch (error) {
          alert("Error importing data. Please check the file format.")
        }
      }
      reader.readAsText(file)
    }
  }

  // Calculate key metrics
  const progressPercentage = Math.round(
    ((new Date().getTime() - new Date(projectData.startDate).getTime()) /
      (projectData.duration * 30 * 24 * 60 * 60 * 1000)) *
      100,
  )
  const workPackageBudgetTotal = projectData.workPackages.reduce((sum, wp) => sum + wp.budget, 0)
  const partnerBudgetTotal = projectData.partners.reduce((sum, partner) => sum + partner.budget, 0)
  const isBudgetBalanced =
    workPackageBudgetTotal === projectData.totalBudget && partnerBudgetTotal === projectData.totalBudget
  const upcomingMilestones = projectData.timeline.filter((item) => item.month <= 6).length
  const totalDeliverables = projectData.workPackages.reduce((sum, wp) => sum + wp.deliverables.length, 0)

  const pageContent = (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Enhanced Header with Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Title Card */}
          <Card className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold mb-2">🚀 {projectData.title}</CardTitle>
                  <p className="text-xl text-blue-100 mb-1">{projectData.subtitle}</p>
                  <p className="text-sm text-blue-200">DIGITAL-2025-SKILLS-08 Grant Proposal</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">€{(projectData.totalBudget / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-blue-200">{projectData.duration} months</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{projectData.workPackages.length}</div>
                  <div className="text-xs text-blue-200">Work Packages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{projectData.partners.length}</div>
                  <div className="text-xs text-blue-200">Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalDeliverables}</div>
                  <div className="text-xs text-blue-200">Deliverables</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{new Set(projectData.partners.map((p) => p.country)).size}</div>
                  <div className="text-xs text-blue-200">Countries</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Dashboard */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Project Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-bold">{Math.max(0, Math.min(100, progressPercentage))}%</span>
                </div>
                <Progress value={Math.max(0, Math.min(100, progressPercentage))} className="h-2" />
              </div>

              {/* Budget Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Budget Status</span>
                {isBudgetBalanced ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Balanced
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Unbalanced
                  </Badge>
                )}
              </div>

              {/* Timeline Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Next 6 Months</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {upcomingMilestones} milestones
                </Badge>
              </div>

              {/* Start Date */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Start Date</span>
                <span className="text-sm font-medium">{new Date(projectData.startDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button onClick={() => setIsEditing(true)} size="sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Project
              </Button>
              <Button onClick={handleSave} size="sm" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleExport} size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button asChild size="sm" variant="outline">
                <label>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workpackages">Work Packages</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ProjectOverview projectData={projectData} setProjectData={setProjectData} isEditing={isEditing} />
          </TabsContent>
          <TabsContent value="workpackages">
            <WorkPackages projectData={projectData} setProjectData={setProjectData} isEditing={isEditing} />
          </TabsContent>
          <TabsContent value="timeline">
            <Timeline projectData={projectData} setProjectData={setProjectData} isEditing={isEditing} />
          </TabsContent>
          <TabsContent value="budget">
            <Budget projectData={projectData} setProjectData={setProjectData} isEditing={isEditing} />
          </TabsContent>
          <TabsContent value="partners">
            <Partners projectData={projectData} setProjectData={setProjectData} isEditing={isEditing} />
          </TabsContent>
          <TabsContent value="modules">
            <Modules projectData={projectData} setProjectData={setProjectData} isEditing={isEditing} />
          </TabsContent>
        </Tabs>
        
        <Tabs defaultValue="ai-factories" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="ai-factories">AI Factories</TabsTrigger>
            <TabsTrigger value="living-lab">Living Lab</TabsTrigger>
          </TabsList>
          <TabsContent value="ai-factories">
            <AIFactories projectData={projectData} setProjectData={setProjectData} isEditing={isEditing} />
          </TabsContent>
          <TabsContent value="living-lab">
            <LivingLab projectData={projectData} setProjectData={setProjectData} isEditing={isEditing} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading Project Dashboard...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="relative">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/30 text-center backdrop-blur-md">
          <Lock className="mb-4 h-12 w-12 text-gray-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Authentication Required</h2>
          <p className="max-w-md text-gray-600">
            To protect sensitive project information, you must be logged in to view this dashboard. Please use the
            login button in the header.
          </p>
        </div>
        <div className="pointer-events-none select-none blur-md">{pageContent}</div>
      </div>
    )
  }

  return pageContent
} 