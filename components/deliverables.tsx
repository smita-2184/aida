"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Calendar,
  Users,
  Target,
  TrendingUp,
  Download,
  Eye,
  Edit3
} from "lucide-react"
import { type ProjectData } from "@/lib/project-data"

interface DeliverablesProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  isEditing: boolean
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200'
    case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'planned': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'delayed': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="w-4 h-4" />
    case 'in-progress': return <Clock className="w-4 h-4" />
    case 'planned': return <AlertCircle className="w-4 h-4" />
    case 'delayed': return <AlertCircle className="w-4 h-4" />
    default: return <AlertCircle className="w-4 h-4" />
  }
}

export default function Deliverables({ projectData, setProjectData, isEditing }: DeliverablesProps) {
  // Extract all deliverables from work packages
  const allDeliverables = projectData.workPackages.flatMap((wp, wpIndex) =>
    wp.deliverables.map((deliverable, delIndex) => ({
      id: `${wp.id}-D${delIndex + 1}`,
      title: deliverable,
      workPackage: wp.id,
      workPackageTitle: wp.title,
      lead: wp.lead,
      coLead: wp.coLead,
      status: wp.status === 'completed' ? 'completed' : wp.status === 'in-progress' ? 'in-progress' : 'planned',
      progress: wp.progress,
      dueDate: `M${Math.floor(wpIndex * 6) + 6}`,
      description: `Deliverable for ${wp.title}`,
      teamMembers: wp.teamMembers,
      milestones: wp.milestones
    }))
  )

  const completedDeliverables = allDeliverables.filter(d => d.status === 'completed')
  const inProgressDeliverables = allDeliverables.filter(d => d.status === 'in-progress')
  const plannedDeliverables = allDeliverables.filter(d => d.status === 'planned')
  const delayedDeliverables = allDeliverables.filter(d => d.status === 'delayed')

  const totalDeliverables = allDeliverables.length
  const completedCount = completedDeliverables.length
  const completionRate = totalDeliverables > 0 ? (completedCount / totalDeliverables) * 100 : 0

  const renderDeliverableCard = (deliverable: typeof allDeliverables[0]) => (
    <Card key={deliverable.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {deliverable.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(deliverable.status || 'planned')}>
                {getStatusIcon(deliverable.status || 'planned')}
                <span className="ml-1 capitalize">{(deliverable.status || 'planned').replace('-', ' ')}</span>
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {deliverable.workPackage}
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700">
                Due: {deliverable.dueDate}
              </Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="outline">
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4" />
            </Button>
            {isEditing && (
              <Button size="sm" variant="outline">
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{deliverable.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Users className="w-4 h-4" />
              Lead
            </h4>
            <p className="text-sm font-medium text-blue-600">{deliverable.lead}</p>
            {deliverable.coLead && (
              <p className="text-sm text-gray-600">Co-lead: {deliverable.coLead}</p>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Target className="w-4 h-4" />
              Progress
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Overall</span>
                <span className="text-sm font-medium">{deliverable.progress}%</span>
              </div>
              <Progress value={deliverable.progress} className="h-2" />
            </div>
          </div>
        </div>

        {deliverable.teamMembers.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Users className="w-4 h-4" />
              Team Members
            </h4>
            <div className="flex flex-wrap gap-1">
              {deliverable.teamMembers.map((member, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {member}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {deliverable.milestones.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Related Milestones
            </h4>
            <div className="space-y-1">
              {deliverable.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-blue-500">•</span>
                  {milestone}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalDeliverables}</div>
            <div className="text-sm opacity-90">Total Deliverables</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{completedCount}</div>
            <div className="text-sm opacity-90">Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{inProgressDeliverables.length}</div>
            <div className="text-sm opacity-90">In Progress</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
            <div className="text-sm opacity-90">Completion Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Deliverables Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Completion</span>
                <span className="text-sm font-bold">{Math.round(completionRate)}%</span>
              </div>
              <Progress value={completionRate} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{inProgressDeliverables.length}</div>
                <div className="text-xs text-gray-600">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{plannedDeliverables.length}</div>
                <div className="text-xs text-gray-600">Planned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{delayedDeliverables.length}</div>
                <div className="text-xs text-gray-600">Delayed</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deliverables Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-2">
            <TabsList className="grid w-full grid-cols-5 bg-transparent gap-1">
              <TabsTrigger value="all" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <FileText className="w-4 h-4" />
                All Deliverables
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
                <CheckCircle className="w-4 h-4" />
                Completed
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Clock className="w-4 h-4" />
                In Progress
              </TabsTrigger>
              <TabsTrigger value="planned" className="flex items-center gap-2 data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                <AlertCircle className="w-4 h-4" />
                Planned
              </TabsTrigger>
              <TabsTrigger value="delayed" className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
                <AlertCircle className="w-4 h-4" />
                Delayed
              </TabsTrigger>
            </TabsList>
          </CardContent>
        </Card>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {allDeliverables.map(renderDeliverableCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedDeliverables.map(renderDeliverableCard)}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {inProgressDeliverables.map(renderDeliverableCard)}
          </div>
        </TabsContent>

        <TabsContent value="planned" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plannedDeliverables.map(renderDeliverableCard)}
          </div>
        </TabsContent>

        <TabsContent value="delayed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {delayedDeliverables.map(renderDeliverableCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 