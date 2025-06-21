"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ProjectData, TimelineItem } from "@/lib/project-data"
import { Plus, Trash2, Calendar, User, Edit3, ArrowUp, ArrowDown } from "lucide-react"

interface TimelineProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  isEditing: boolean
}

export default function Timeline({ projectData, setProjectData, isEditing }: TimelineProps) {
  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: any) => {
    const newTimeline = [...projectData.timeline]
    newTimeline[index] = { ...newTimeline[index], [field]: value }
    setProjectData({ ...projectData, timeline: newTimeline })
  }

  const addTimelineItem = () => {
    const newItem: TimelineItem = {
      id: `t${Date.now()}`,
      month: Math.max(...projectData.timeline.map((item) => item.month)) + 1,
      title: "New Timeline Item",
      description: "Description of the new timeline item",
      lead: "TBD",
      deliverable: "New Deliverable",
      workPackage: "WP1",
    }
    setProjectData({ ...projectData, timeline: [...projectData.timeline, newItem] })
  }

  const removeTimelineItem = (index: number) => {
    const newTimeline = projectData.timeline.filter((_, i) => i !== index)
    setProjectData({ ...projectData, timeline: newTimeline })
  }

  const moveTimelineItem = (index: number, direction: "up" | "down") => {
    const newTimeline = [...projectData.timeline]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    if (targetIndex >= 0 && targetIndex < newTimeline.length) {
      ;[newTimeline[index], newTimeline[targetIndex]] = [newTimeline[targetIndex], newTimeline[index]]
      setProjectData({ ...projectData, timeline: newTimeline })
    }
  }

  const sortedTimeline = [...projectData.timeline].sort((a, b) => a.month - b.month)

  const getDateFromMonth = (month: number) => {
    const startDate = new Date(projectData.startDate)
    const targetDate = new Date(startDate)
    targetDate.setMonth(startDate.getMonth() + month - 1)
    return targetDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const availableWorkPackages = projectData.workPackages.map((wp) => wp.id)
  const availablePartners = [...new Set(projectData.partners.map((p) => p.name))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Edit3 className="w-6 h-6" />
          Project Timeline
        </h2>
        <Button onClick={addTimelineItem} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Timeline Item
        </Button>
      </div>

      {/* Timeline Visualization */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

        <div className="space-y-8">
          {sortedTimeline.map((item, index) => {
            const originalIndex = projectData.timeline.findIndex((t) => t.id === item.id)
            return (
              <div key={item.id} className="relative flex items-start space-x-6">
                {/* Timeline Dot */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white border-4 border-blue-500 rounded-full shadow-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>

                {/* Timeline Content */}
                <Card className="flex-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <div className="flex items-center space-x-1">
                          <Label className="text-xs">Month:</Label>
                          <Input
                            type="number"
                            min="1"
                            max="36"
                            value={item.month}
                            onChange={(e) =>
                              updateTimelineItem(originalIndex, "month", Number.parseInt(e.target.value) || 1)
                            }
                            disabled={!isEditing}
                            className={`w-16 h-6 text-sm ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                          />
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {getDateFromMonth(item.month)}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Label className="text-xs">WP:</Label>
                          {isEditing ? (
                            <Select
                              value={item.workPackage}
                              onValueChange={(value) => updateTimelineItem(originalIndex, "workPackage", value)}
                            >
                              <SelectTrigger className="w-20 h-6 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {availableWorkPackages.map((wp) => (
                                  <SelectItem key={wp} value={wp}>
                                    {wp}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge className="text-sm bg-purple-100 text-purple-800">{item.workPackage}</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {isEditing && (
                          <>
                            <Button
                              onClick={() => moveTimelineItem(originalIndex, "up")}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => moveTimelineItem(originalIndex, "down")}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                        <Button
                          onClick={() => removeTimelineItem(originalIndex)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Title */}
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateTimelineItem(originalIndex, "title", e.target.value)}
                          disabled={!isEditing}
                          className={`text-xl font-semibold ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => updateTimelineItem(originalIndex, "description", e.target.value)}
                          rows={2}
                          disabled={!isEditing}
                          className={`text-gray-700 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                        />
                      </div>

                      {/* Lead Partner */}
                      <div>
                        <Label>Lead Partner</Label>
                        {isEditing ? (
                          <Select
                            value={item.lead}
                            onValueChange={(value) => updateTimelineItem(originalIndex, "lead", value)}
                          >
                            <SelectTrigger className="border-blue-300 bg-blue-50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {availablePartners.map((partner) => (
                                <SelectItem key={partner} value={partner}>
                                  {partner}
                                </SelectItem>
                              ))}
                              <SelectItem value="All Partners">All Partners</SelectItem>
                              <SelectItem value="TBD">TBD</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{item.lead}</span>
                          </div>
                        )}
                      </div>

                      {/* Deliverable */}
                      <div>
                        <Label>Deliverable</Label>
                        {isEditing ? (
                          <Input
                            value={item.deliverable}
                            onChange={(e) => updateTimelineItem(originalIndex, "deliverable", e.target.value)}
                            className="border-blue-300 bg-blue-50"
                          />
                        ) : (
                          <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                            <p className="font-medium text-blue-800">{item.deliverable}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Timeline Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{projectData.timeline.length}</p>
              <p className="text-sm text-gray-600">Total Milestones</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {Math.max(...projectData.timeline.map((item) => item.month))}
              </p>
              <p className="text-sm text-gray-600">Project Duration (Months)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {new Set(projectData.timeline.map((item) => item.workPackage)).size}
              </p>
              <p className="text-sm text-gray-600">Work Packages Involved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {new Set(projectData.timeline.map((item) => item.lead)).size}
              </p>
              <p className="text-sm text-gray-600">Different Lead Partners</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
