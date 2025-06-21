"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { ProjectData, WorkPackage } from "@/lib/project-data"
import { ChevronDown, ChevronUp, Plus, Trash2, Euro, Calendar, Edit3 } from "lucide-react"

interface WorkPackagesProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  isEditing: boolean
}

export default function WorkPackages({ projectData, setProjectData, isEditing }: WorkPackagesProps) {
  const [expandedWP, setExpandedWP] = useState<string | null>(null)

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
    }
    setProjectData({ ...projectData, workPackages: [...projectData.workPackages, newWP] })
  }

  const removeWorkPackage = (index: number) => {
    const newWorkPackages = projectData.workPackages.filter((_, i) => i !== index)
    setProjectData({ ...projectData, workPackages: newWorkPackages })
  }

  const updateArray = (
    wpIndex: number,
    field: "activities" | "deliverables" | "milestones",
    itemIndex: number,
    value: string,
  ) => {
    const newWorkPackages = [...projectData.workPackages]
    const newArray = [...newWorkPackages[wpIndex][field]]
    newArray[itemIndex] = value
    newWorkPackages[wpIndex] = { ...newWorkPackages[wpIndex], [field]: newArray }
    setProjectData({ ...projectData, workPackages: newWorkPackages })
  }

  const addArrayItem = (wpIndex: number, field: "activities" | "deliverables" | "milestones") => {
    const newWorkPackages = [...projectData.workPackages]
    const newArray = [...newWorkPackages[wpIndex][field], `New ${field.slice(0, -1)}`]
    newWorkPackages[wpIndex] = { ...newWorkPackages[wpIndex], [field]: newArray }
    setProjectData({ ...projectData, workPackages: newWorkPackages })
  }

  const removeArrayItem = (wpIndex: number, field: "activities" | "deliverables" | "milestones", itemIndex: number) => {
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
          Work Packages
        </h2>
        <Button onClick={addWorkPackage} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Work Package
        </Button>
      </div>

      {/* Work Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {projectData.workPackages.map((wp, index) => {
          const percentage = ((wp.budget / projectData.totalBudget) * 100).toFixed(1)
          return (
            <Card
              key={wp.id}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Input
                    value={wp.id}
                    onChange={(e) => updateWorkPackage(index, "id", e.target.value)}
                    disabled={!isEditing}
                    className={`text-lg px-3 py-1 w-20 font-bold ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                  />
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
                </div>

                <Progress value={Math.random() * 100} className="mt-4" />

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
                <div key={wp.id} className="space-y-6">
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

                  {/* Activities */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Activities</Label>
                      <Button onClick={() => addArrayItem(wpIndex, "activities")} size="sm" variant="outline">
                        <Plus className="w-3 h-3 mr-1" />
                        Add Activity
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {wp.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center space-x-2">
                          <Badge variant="secondary" className="min-w-8 justify-center">
                            {actIndex + 1}
                          </Badge>
                          <Input
                            value={activity}
                            onChange={(e) => updateArray(wpIndex, "activities", actIndex, e.target.value)}
                            className={`flex-1 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                            disabled={!isEditing}
                          />
                          <Button
                            onClick={() => removeArrayItem(wpIndex, "activities", actIndex)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Deliverables</Label>
                      <Button onClick={() => addArrayItem(wpIndex, "deliverables")} size="sm" variant="outline">
                        <Plus className="w-3 h-3 mr-1" />
                        Add Deliverable
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {wp.deliverables.map((deliverable, delIndex) => (
                        <div key={delIndex} className="flex items-center space-x-2">
                          <Badge variant="secondary" className="min-w-8 justify-center">
                            D{delIndex + 1}
                          </Badge>
                          <Input
                            value={deliverable}
                            onChange={(e) => updateArray(wpIndex, "deliverables", delIndex, e.target.value)}
                            className={`flex-1 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                            disabled={!isEditing}
                          />
                          <Button
                            onClick={() => removeArrayItem(wpIndex, "deliverables", delIndex)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Milestones</Label>
                      <Button onClick={() => addArrayItem(wpIndex, "milestones")} size="sm" variant="outline">
                        <Plus className="w-3 h-3 mr-1" />
                        Add Milestone
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {wp.milestones.map((milestone, milIndex) => (
                        <div key={milIndex} className="flex items-center space-x-2">
                          <Badge variant="secondary" className="min-w-8 justify-center">
                            M{milIndex + 1}
                          </Badge>
                          <Input
                            value={milestone}
                            onChange={(e) => updateArray(wpIndex, "milestones", milIndex, e.target.value)}
                            className={`flex-1 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                            disabled={!isEditing}
                          />
                          <Button
                            onClick={() => removeArrayItem(wpIndex, "milestones", milIndex)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
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
