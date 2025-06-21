"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ProjectData, WorkPackage } from "@/lib/project-data"
import { ChevronDown, ChevronUp, Plus, Trash2, Euro, Calendar, Edit3, Users, CheckCircle, Clock, AlertCircle, FileText, BookOpen, Info } from "lucide-react"

interface WorkPackagesProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  isEditing: boolean
}

const getStatusColor = (status: WorkPackage['status']) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200'
    case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'not-started': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusIcon = (status: WorkPackage['status']) => {
  switch (status) {
    case 'completed': return <CheckCircle className="w-4 h-4" />
    case 'in-progress': return <Clock className="w-4 h-4" />
    case 'not-started': return <AlertCircle className="w-4 h-4" />
    default: return <AlertCircle className="w-4 h-4" />
  }
}

export default function WorkPackages({ projectData, setProjectData, isEditing }: WorkPackagesProps) {
  const [expandedWP, setExpandedWP] = useState<string | null>(null)
  const [showReference, setShowReference] = useState(false)

  const updateWorkPackage = (index: number, field: keyof WorkPackage, value: any) => {
    const newWorkPackages = [...projectData.workPackages]
    newWorkPackages[index] = { ...newWorkPackages[index], [field]: value }
    setProjectData({ ...projectData, workPackages: newWorkPackages })
  }

  const addWorkPackage = () => {
    const newWP: WorkPackage = {
      id: `WP${projectData.workPackages.length + 1}`,
      title: "New Work Package",
      lead: "TBD",
      budget: 0,
      duration: "M1-M12",
      description: "Description of the new work package",
      activities: ["Activity 1", "Activity 2"],
      deliverables: ["Deliverable 1"],
      milestones: ["Milestone 1"],
      status: "not-started",
      progress: 0,
      teamMembers: ["Team Member 1"]
    }
    setProjectData({ ...projectData, workPackages: [...projectData.workPackages, newWP] })
  }

  const removeWorkPackage = (index: number) => {
    const newWorkPackages = projectData.workPackages.filter((_, i) => i !== index)
    setProjectData({ ...projectData, workPackages: newWorkPackages })
  }

  const updateArray = (
    wpIndex: number,
    field: "activities" | "deliverables" | "milestones" | "teamMembers",
    itemIndex: number,
    value: string,
  ) => {
    const newWorkPackages = [...projectData.workPackages]
    const newArray = [...newWorkPackages[wpIndex][field]]
    newArray[itemIndex] = value
    newWorkPackages[wpIndex] = { ...newWorkPackages[wpIndex], [field]: newArray }
    setProjectData({ ...projectData, workPackages: newWorkPackages })
  }

  const addArrayItem = (wpIndex: number, field: "activities" | "deliverables" | "milestones" | "teamMembers") => {
    const newWorkPackages = [...projectData.workPackages]
    const newArray = [...newWorkPackages[wpIndex][field], `New ${field.slice(0, -1)}`]
    newWorkPackages[wpIndex] = { ...newWorkPackages[wpIndex], [field]: newArray }
    setProjectData({ ...projectData, workPackages: newWorkPackages })
  }

  const removeArrayItem = (wpIndex: number, field: "activities" | "deliverables" | "milestones" | "teamMembers", itemIndex: number) => {
    const newWorkPackages = [...projectData.workPackages]
    const newArray = newWorkPackages[wpIndex][field].filter((_, i) => i !== itemIndex)
    newWorkPackages[wpIndex] = { ...newWorkPackages[wpIndex], [field]: newArray }
    setProjectData({ ...projectData, workPackages: newWorkPackages })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Edit3 className="w-6 h-6" />
          Work Packages ({projectData.workPackages.length} total)
        </h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowReference(!showReference)} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            {showReference ? "Hide Reference" : "Show Reference"}
          </Button>
          <Button onClick={addWorkPackage} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Work Package
          </Button>
        </div>
      </div>

      {/* Work Package Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-50/80 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Packages</p>
                <p className="text-2xl font-bold text-blue-800">{projectData.workPackages.length}</p>
              </div>
              <Edit3 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50/80 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Completed</p>
                <p className="text-2xl font-bold text-green-800">
                  {projectData.workPackages.filter(wp => wp.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50/80 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-800">
                  {projectData.workPackages.filter(wp => wp.status === 'in-progress').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-50/80 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Not Started</p>
                <p className="text-2xl font-bold text-gray-800">
                  {projectData.workPackages.filter(wp => wp.status === 'not-started').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Work Packages List View */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Work Packages Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2">#</th>
                  <th className="text-left py-2 px-2">ID</th>
                  <th className="text-left py-2 px-2">Title</th>
                  <th className="text-left py-2 px-2">Lead</th>
                  <th className="text-left py-2 px-2">Co-Lead</th>
                  <th className="text-left py-2 px-2">Duration</th>
                  <th className="text-left py-2 px-2">Budget</th>
                  <th className="text-left py-2 px-2">Status</th>
                  <th className="text-left py-2 px-2">Progress</th>
                </tr>
              </thead>
              <tbody>
                {projectData.workPackages.map((wp, index) => (
                  <tr key={`list-view-${wp.id}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2 font-medium">{index + 1}</td>
                    <td className="py-2 px-2 font-mono text-xs">{wp.id}</td>
                    <td className="py-2 px-2 font-medium">{wp.title}</td>
                    <td className="py-2 px-2">{wp.lead}</td>
                    <td className="py-2 px-2">{wp.coLead || "-"}</td>
                    <td className="py-2 px-2">{wp.duration}</td>
                    <td className="py-2 px-2">€{wp.budget.toLocaleString()}</td>
                    <td className="py-2 px-2">
                      <Badge className={getStatusColor(wp.status || 'not-started')}>
                        {getStatusIcon(wp.status || 'not-started')}
                        <span className="ml-1 capitalize">{(wp.status || 'not-started').replace('-', ' ')}</span>
                      </Badge>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <Progress value={wp.progress} className="w-16 h-2" />
                        <span className="text-xs">{wp.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Reference Section */}
      {showReference && (
        <Card className="bg-blue-50/80 backdrop-blur-sm border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <FileText className="w-5 h-5" />
              Proposal Document Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-100/50 rounded-lg">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-2">This section provides reference information from the AIDA proposal document:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Detailed activities extracted from the DIGITAL-2025-SKILLS-08 Grant Proposal Plan</li>
                    <li>Comprehensive deliverables with descriptions and timelines</li>
                    <li>Specific milestones with measurable outcomes</li>
                    <li>Team member roles and responsibilities</li>
                    <li>Budget allocations and resource planning</li>
                  </ul>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border">
                      <h4 className="font-semibold text-blue-800 mb-2">Project Structure</h4>
                      <p className="text-sm text-gray-700">
                        The AIDA project is structured into six interconnected Work Packages (WPs), each with clear objectives, 
                        activities, and deliverables. This action plan provides a detailed roadmap for the project's 36-month duration.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <h4 className="font-semibold text-blue-800 mb-2">Key Innovation</h4>
                      <p className="text-sm text-gray-700">
                        AIDA introduces a unique "Living Lab" approach that brings together Master's students and SME employees 
                        in a collaborative learning environment, creating immediate cross-pollination between academic theory 
                        and real-world industrial challenges.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activities" className="space-y-4">
                  <div className="space-y-3">
                    {projectData.workPackages.map((wp, index) => (
                      <div key={`ref-${wp.id}`} className="p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-blue-800 mb-2">{wp.id}: {wp.title}</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Lead:</strong> {wp.lead}{wp.coLead && ` (Co-lead: ${wp.coLead})`}</p>
                          <p><strong>Duration:</strong> {wp.duration}</p>
                          <p><strong>Budget:</strong> €{wp.budget.toLocaleString()}</p>
                          <div>
                            <strong>Key Activities:</strong>
                            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                              {wp.activities.slice(0, 3).map((activity, i) => (
                                <li key={`${wp.id}-ref-activity-${i}`} className="text-xs">{activity}</li>
                              ))}
                              {wp.activities.length > 3 && (
                                <li key={`${wp.id}-ref-more`} className="text-xs text-blue-600">... and {wp.activities.length - 3} more activities</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="deliverables" className="space-y-4">
                  <div className="space-y-3">
                    {projectData.workPackages.map((wp) => (
                      <div key={`ref-deliverables-${wp.id}`} className="p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-blue-800 mb-2">{wp.id} Deliverables</h4>
                        <div className="space-y-2">
                          {wp.deliverables.map((deliverable, i) => (
                            <div key={`${wp.id}-ref-deliverable-${i}`} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                              {deliverable}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-semibold text-blue-800 mb-3">Project Timeline Overview</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-blue-700 mb-2">Phase 1 (M1-M6)</h5>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Project Management Setup</li>
                          <li>• Industry Needs Analysis</li>
                          <li>• Competency Framework</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-700 mb-2">Phase 2 (M7-M18)</h5>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Curriculum Development</li>
                          <li>• Learning Materials</li>
                          <li>• Assessment Framework</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-700 mb-2">Phase 3 (M19-M36)</h5>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Living Lab Pilot</li>
                          <li>• Evaluation & Refinement</li>
                          <li>• Dissemination & Sustainability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Work Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        {projectData.workPackages.map((wp, index) => {
          const percentage = ((wp.budget / projectData.totalBudget) * 100).toFixed(1)
          return (
            <Card
              key={`card-${wp.id}-${index}`}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <Input
                      value={wp.id}
                      onChange={(e) => updateWorkPackage(index, "id", e.target.value)}
                      disabled={!isEditing}
                      className={`text-lg px-3 py-1 w-20 font-bold ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    />
                  </div>
                  <Button
                    onClick={() => removeWorkPackage(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <Input
                  value={wp.title}
                  onChange={(e) => updateWorkPackage(index, "title", e.target.value)}
                  disabled={!isEditing}
                  className={`font-semibold text-lg mb-2 h-auto p-2 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                />

                {/* Status Badge */}
                <div className="mb-3">
                  {isEditing ? (
                    <Select value={wp.status || 'not-started'} onValueChange={(value) => updateWorkPackage(index, "status", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={getStatusColor(wp.status || 'not-started')}>
                      {getStatusIcon(wp.status || 'not-started')}
                      <span className="ml-1 capitalize">{(wp.status || 'not-started').replace('-', ' ')}</span>
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Euro className="w-4 h-4 text-green-600" />
                    <Input
                      type="number"
                      value={wp.budget}
                      onChange={(e) => updateWorkPackage(index, "budget", Number.parseInt(e.target.value) || 0)}
                      disabled={!isEditing}
                      className={`flex-1 h-6 text-sm ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    />
                    <span className="text-xs text-gray-600">({percentage}%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <Input
                      value={wp.duration}
                      onChange={(e) => updateWorkPackage(index, "duration", e.target.value)}
                      disabled={!isEditing}
                      className={`flex-1 h-6 text-sm ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-xs">Lead:</span>
                    <Input
                      value={wp.lead}
                      onChange={(e) => updateWorkPackage(index, "lead", e.target.value)}
                      disabled={!isEditing}
                      className={`flex-1 h-6 text-sm ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-xs">Co-Lead:</span>
                    <Input
                      value={wp.coLead || ""}
                      onChange={(e) => updateWorkPackage(index, "coLead", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Optional co-lead"
                      className={`flex-1 h-6 text-sm ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Progress</span>
                    {isEditing ? (
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={wp.progress}
                        onChange={(e) => updateWorkPackage(index, "progress", Number.parseInt(e.target.value) || 0)}
                        className="w-16 h-6 text-xs border-blue-300 bg-blue-50"
                      />
                    ) : (
                      <span className="text-xs font-medium">{wp.progress}%</span>
                    )}
                  </div>
                  <Progress value={wp.progress} className="h-2" />
                </div>

                <Button
                  onClick={() => setExpandedWP(expandedWP === wp.id ? null : wp.id)}
                  variant="ghost"
                  className="w-full mt-4"
                >
                  {expandedWP === wp.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {expandedWP === wp.id ? "Less Details" : "More Details"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Expanded Work Package Details */}
      {expandedWP && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>
              {projectData.workPackages.find((wp) => wp.id === expandedWP)?.id}:{" "}
              {projectData.workPackages.find((wp) => wp.id === expandedWP)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projectData.workPackages.map((wp, wpIndex) => {
              if (wp.id !== expandedWP) return null

              return (
                <div key={`${wp.id}-expanded-${wpIndex}`} className="space-y-6">
                  {/* Status and Progress */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Status</Label>
                      {isEditing ? (
                        <Select value={wp.status} onValueChange={(value) => updateWorkPackage(wpIndex, "status", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not-started">Not Started</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge className={getStatusColor(wp.status || 'not-started')}>
                          {getStatusIcon(wp.status || 'not-started')}
                          <span className="ml-1 capitalize">{(wp.status || 'not-started').replace('-', ' ')}</span>
                        </Badge>
                      )}
                    </div>
                    <div>
                      <Label>Progress (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={wp.progress}
                        onChange={(e) => updateWorkPackage(wpIndex, "progress", Number.parseInt(e.target.value) || 0)}
                        disabled={!isEditing}
                        className={isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={wp.description}
                      onChange={(e) => updateWorkPackage(wpIndex, "description", e.target.value)}
                      rows={3}
                      disabled={!isEditing}
                      className={isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}
                    />
                  </div>

                  {/* Team Members */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Team Members
                      </Label>
                      {isEditing && (
                        <Button
                          onClick={() => addArrayItem(wpIndex, "teamMembers")}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Member
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {wp.teamMembers.map((member, memberIndex) => (
                        <div key={`${wp.id}-team-${memberIndex}`} className="flex items-center space-x-2">
                          <Input
                            value={member}
                            onChange={(e) => updateArray(wpIndex, "teamMembers", memberIndex, e.target.value)}
                            disabled={!isEditing}
                            className={isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}
                          />
                          {isEditing && (
                            <Button
                              onClick={() => removeArrayItem(wpIndex, "teamMembers", memberIndex)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Activities</Label>
                      {isEditing && (
                        <Button
                          onClick={() => addArrayItem(wpIndex, "activities")}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Activity
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {wp.activities.map((activity, activityIndex) => (
                        <div key={`${wp.id}-activity-${activityIndex}`} className="flex items-center space-x-2">
                          <Input
                            value={activity}
                            onChange={(e) => updateArray(wpIndex, "activities", activityIndex, e.target.value)}
                            disabled={!isEditing}
                            className={isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}
                          />
                          {isEditing && (
                            <Button
                              onClick={() => removeArrayItem(wpIndex, "activities", activityIndex)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Deliverables</Label>
                      {isEditing && (
                        <Button
                          onClick={() => addArrayItem(wpIndex, "deliverables")}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Deliverable
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {wp.deliverables.map((deliverable, deliverableIndex) => (
                        <div key={`${wp.id}-deliverable-${deliverableIndex}`} className="flex items-center space-x-2">
                          <Input
                            value={deliverable}
                            onChange={(e) => updateArray(wpIndex, "deliverables", deliverableIndex, e.target.value)}
                            disabled={!isEditing}
                            className={isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}
                          />
                          {isEditing && (
                            <Button
                              onClick={() => removeArrayItem(wpIndex, "deliverables", deliverableIndex)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Milestones</Label>
                      {isEditing && (
                        <Button
                          onClick={() => addArrayItem(wpIndex, "milestones")}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Milestone
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {wp.milestones.map((milestone, milestoneIndex) => (
                        <div key={`${wp.id}-milestone-${milestoneIndex}`} className="flex items-center space-x-2">
                          <Input
                            value={milestone}
                            onChange={(e) => updateArray(wpIndex, "milestones", milestoneIndex, e.target.value)}
                            disabled={!isEditing}
                            className={isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}
                          />
                          {isEditing && (
                            <Button
                              onClick={() => removeArrayItem(wpIndex, "milestones", milestoneIndex)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
