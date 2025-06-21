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
} from "lucide-react"
import ProjectOverview from "@/components/project-overview"
import WorkPackages from "@/components/work-packages"
import Timeline from "@/components/timeline"
import Budget from "@/components/budget"
import Partners from "@/components/partners"
import { type ProjectData, defaultProjectData } from "@/lib/project-data"

export default function AidaProjectManager() {
  const [projectData, setProjectData] = useState<ProjectData>(defaultProjectData)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("aida-project-data")
    if (savedData) {
      try {
        setProjectData(JSON.parse(savedData))
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

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

  return (
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

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4 text-center">
              <Euro className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">€{workPackageBudgetTotal.toLocaleString()}</div>
              <div className="text-xs text-gray-600">WP Budget Total</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {projectData.partners.reduce((sum, p) => sum + p.leadWPs.length, 0)}
              </div>
              <div className="text-xs text-gray-600">Leadership Roles</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{projectData.timeline.length}</div>
              <div className="text-xs text-gray-600">Timeline Items</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{projectData.kpis.length}</div>
              <div className="text-xs text-gray-600">KPIs Tracked</div>
            </CardContent>
          </Card>
        </div>

        {/* Control Bar */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "destructive" : "default"}
                  className={isEditing ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel Edit" : "Edit Mode"}
                </Button>
                {isEditing && (
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleExport} variant="outline" className="border-gray-300">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" className="border-gray-300">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-2">
              <TabsList className="grid w-full grid-cols-5 bg-transparent gap-1">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="workpackages"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Work Packages</span>
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </TabsTrigger>
                <TabsTrigger
                  value="budget"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Euro className="w-4 h-4" />
                  <span className="hidden sm:inline">Budget</span>
                </TabsTrigger>
                <TabsTrigger
                  value="partners"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Partners</span>
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

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
        </Tabs>
      </div>
    </div>
  )
}
