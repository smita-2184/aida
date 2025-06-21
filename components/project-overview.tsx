"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import type { ProjectData } from "@/lib/project-data"
import { Target, Plus, Trash2, Edit3, Users, FileText, TrendingUp } from "lucide-react"

interface ProjectOverviewProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  isEditing: boolean
}

export default function ProjectOverview({ projectData, setProjectData, isEditing }: ProjectOverviewProps) {
  const updateField = (field: keyof ProjectData, value: any) => {
    setProjectData({ ...projectData, [field]: value })
  }

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...projectData.objectives]
    newObjectives[index] = value
    updateField("objectives", newObjectives)
  }

  const addObjective = () => {
    updateField("objectives", [...projectData.objectives, "New objective"])
  }

  const removeObjective = (index: number) => {
    const newObjectives = projectData.objectives.filter((_, i) => i !== index)
    updateField("objectives", newObjectives)
  }

  const updateKPI = (index: number, field: "name" | "target" | "measurement", value: string) => {
    const newKPIs = [...projectData.kpis]
    newKPIs[index] = { ...newKPIs[index], [field]: value }
    updateField("kpis", newKPIs)
  }

  const addKPI = () => {
    updateField("kpis", [...projectData.kpis, { name: "New KPI", target: "TBD", measurement: "TBD" }])
  }

  const removeKPI = (index: number) => {
    const newKPIs = projectData.kpis.filter((_, i) => i !== index)
    updateField("kpis", newKPIs)
  }

  const progressPercentage = Math.round(
    ((new Date().getTime() - new Date(projectData.startDate).getTime()) /
      (projectData.duration * 30 * 24 * 60 * 60 * 1000)) *
      100,
  )

  // Calculate summary stats
  const totalDeliverables = projectData.workPackages.reduce((sum, wp) => sum + wp.deliverables.length, 0)
  const totalActivities = projectData.workPackages.reduce((sum, wp) => sum + wp.activities.length, 0)
  const totalMilestones = projectData.workPackages.reduce((sum, wp) => sum + wp.milestones.length, 0)

  return (
    <div className="space-y-6">
      {/* Project Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-blue-700 mb-1">{totalDeliverables}</div>
            <div className="text-sm text-blue-600 font-medium">Total Deliverables</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-green-700 mb-1">{totalActivities}</div>
            <div className="text-sm text-green-600 font-medium">Total Activities</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-purple-700 mb-1">{totalMilestones}</div>
            <div className="text-sm text-purple-600 font-medium">Total Milestones</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-orange-700 mb-1">
              {new Set(projectData.partners.map((p) => p.country)).size}
            </div>
            <div className="text-sm text-orange-600 font-medium">Countries Involved</div>
          </CardContent>
        </Card>
      </div>

      {/* Project Details */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Edit3 className="w-6 h-6 text-blue-600" />
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                  Project Title
                </Label>
                <Input
                  id="title"
                  value={projectData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  disabled={!isEditing}
                  className={`mt-1 ${isEditing ? "border-blue-300 bg-blue-50 focus:ring-blue-500" : "border-gray-200 bg-gray-50"}`}
                />
              </div>
              <div>
                <Label htmlFor="subtitle" className="text-sm font-semibold text-gray-700">
                  Subtitle
                </Label>
                <Input
                  id="subtitle"
                  value={projectData.subtitle}
                  onChange={(e) => updateField("subtitle", e.target.value)}
                  disabled={!isEditing}
                  className={`mt-1 ${isEditing ? "border-blue-300 bg-blue-50 focus:ring-blue-500" : "border-gray-200 bg-gray-50"}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Duration (months)</Label>
                <Input
                  type="number"
                  value={projectData.duration}
                  onChange={(e) => updateField("duration", Number.parseInt(e.target.value) || 0)}
                  disabled={!isEditing}
                  className={`mt-1 text-lg font-bold ${isEditing ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Total Budget (€)</Label>
                <Input
                  type="number"
                  value={projectData.totalBudget}
                  onChange={(e) => updateField("totalBudget", Number.parseInt(e.target.value) || 0)}
                  disabled={!isEditing}
                  className={`mt-1 text-lg font-bold ${isEditing ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
                />
              </div>
              <div className="col-span-2">
                <Label className="text-sm font-semibold text-gray-700">Start Date</Label>
                <Input
                  type="date"
                  value={projectData.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  disabled={!isEditing}
                  className={`mt-1 ${isEditing ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
              Project Description
            </Label>
            <Textarea
              id="description"
              value={projectData.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              disabled={!isEditing}
              className={`mt-1 ${isEditing ? "border-blue-300 bg-blue-50 focus:ring-blue-500" : "border-gray-200 bg-gray-50"}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Progress */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Project Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-lg font-bold text-blue-600">{Math.max(0, Math.min(100, progressPercentage))}%</span>
            </div>
            <Progress value={Math.max(0, Math.min(100, progressPercentage))} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-blue-600">{new Date(projectData.startDate).toLocaleDateString()}</div>
                <div className="text-gray-600">Start Date</div>
              </div>
              <div>
                <div className="font-bold text-purple-600">{projectData.duration} months</div>
                <div className="text-gray-600">Duration</div>
              </div>
              <div>
                <div className="font-bold text-green-600">
                  {new Date(
                    new Date(projectData.startDate).getTime() + projectData.duration * 30 * 24 * 60 * 60 * 1000,
                  ).toLocaleDateString()}
                </div>
                <div className="text-gray-600">End Date</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objectives */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Project Objectives
            </CardTitle>
            {isEditing && (
              <Button onClick={addObjective} size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Objective
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectData.objectives.map((objective, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <Badge
                  variant="outline"
                  className="mt-1 min-w-8 justify-center bg-blue-100 text-blue-800 border-blue-300"
                >
                  {index + 1}
                </Badge>
                <div className="flex-1 flex space-x-2">
                  <Textarea
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    className={`flex-1 resize-none ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    rows={2}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <Button
                      onClick={() => removeObjective(index)}
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Key Performance Indicators
            </CardTitle>
            {isEditing && (
              <Button onClick={addKPI} size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add KPI
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData.kpis.map((kpi, index) => (
              <Card key={index} className="relative bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                {isEditing && (
                  <Button
                    onClick={() => removeKPI(index)}
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0 z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
                <CardContent className="p-4 space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-600">KPI Name</Label>
                    <Input
                      value={kpi.name}
                      onChange={(e) => updateKPI(index, "name", e.target.value)}
                      disabled={!isEditing}
                      className={`font-semibold text-sm mt-1 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-gray-600">Target</Label>
                    <Input
                      value={kpi.target}
                      onChange={(e) => updateKPI(index, "target", e.target.value)}
                      disabled={!isEditing}
                      className={`text-lg font-bold text-blue-600 mt-1 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-gray-600">Measurement Method</Label>
                    <Textarea
                      value={kpi.measurement}
                      onChange={(e) => updateKPI(index, "measurement", e.target.value)}
                      disabled={!isEditing}
                      className={`text-xs text-gray-600 resize-none mt-1 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
