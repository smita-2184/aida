"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  PlayCircle,
  Building2,
  Globe,
  Target,
  Plus,
  Trash2
} from "lucide-react"
import { type ProjectData, type Module } from "@/lib/project-data"

interface ModulesProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  isEditing: boolean
}

const getStatusColor = (status: Module['status']) => {
  switch (status) {
    case 'development': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'review': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'approved': return 'bg-green-100 text-green-800 border-green-200'
    case 'pilot-ready': return 'bg-purple-100 text-purple-800 border-purple-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusIcon = (status: Module['status']) => {
  switch (status) {
    case 'development': return <AlertCircle className="w-4 h-4" />
    case 'review': return <Clock className="w-4 h-4" />
    case 'approved': return <CheckCircle className="w-4 h-4" />
    case 'pilot-ready': return <PlayCircle className="w-4 h-4" />
    default: return <AlertCircle className="w-4 h-4" />
  }
}

const getInstitutionColor = (institution: string) => {
  switch (institution) {
    case 'PoliMi': return 'text-blue-600'
    case 'UM': return 'text-green-600'
    case 'HU Berlin': return 'text-purple-600'
    case 'IHK Berlin': return 'text-orange-600'
    default: return 'text-gray-600'
  }
}

export default function Modules({ projectData, setProjectData, isEditing }: ModulesProps) {
  const modules = projectData.modules

  const developmentModules = modules.filter(m => m.status === 'development')
  const reviewModules = modules.filter(m => m.status === 'review')
  const approvedModules = modules.filter(m => m.status === 'approved')
  const pilotReadyModules = modules.filter(m => m.status === 'pilot-ready')

  const totalEcts = modules.reduce((sum, module) => sum + module.ectsCredits, 0)
  const completedEcts = modules.filter(m => m.status === 'approved' || m.status === 'pilot-ready')
    .reduce((sum, module) => sum + module.ectsCredits, 0)

  const updateModuleStatus = (moduleId: string, newStatus: Module['status']) => {
    if (!isEditing) return
    
    const updatedModules = modules.map(module => 
      module.id === moduleId ? { ...module, status: newStatus } : module
    )
    
    setProjectData({
      ...projectData,
      modules: updatedModules
    })
  }

  const updateModuleField = (moduleId: string, field: keyof Module, value: any) => {
    if (!isEditing) return
    
    const updatedModules = modules.map(module => 
      module.id === moduleId ? { ...module, [field]: value } : module
    )
    
    setProjectData({
      ...projectData,
      modules: updatedModules
    })
  }

  const addModule = () => {
    if (!isEditing) return
    
    const newModule: Module = {
      id: `M${modules.length + 1}`,
      title: "New Module",
      leadInstitution: "HU Berlin",
      coDevelopers: [],
      ectsCredits: 6,
      description: "Module description",
      learningOutcomes: ["Learning outcome 1"],
      prerequisites: [],
      status: 'development'
    }
    
    setProjectData({
      ...projectData,
      modules: [...modules, newModule]
    })
  }

  const removeModule = (moduleId: string) => {
    if (!isEditing) return
    
    const updatedModules = modules.filter(module => module.id !== moduleId)
    
    setProjectData({
      ...projectData,
      modules: updatedModules
    })
  }

  const renderModuleCard = (module: Module) => (
    <Card key={module.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2">
              {isEditing ? (
                <Input
                  value={module.title}
                  onChange={(e) => updateModuleField(module.id, 'title', e.target.value)}
                  className="text-lg font-semibold border-blue-300 bg-blue-50"
                  aria-label="Module title"
                />
              ) : (
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {module.title}
                </CardTitle>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(module.status || 'development')}>
                {getStatusIcon(module.status || 'development')}
                <span className="ml-1 capitalize">{(module.status || 'development').replace('-', ' ')}</span>
              </Badge>
              {isEditing ? (
                <Input
                  type="number"
                  value={module.ectsCredits}
                  onChange={(e) => updateModuleField(module.id, 'ectsCredits', Number(e.target.value) || 0)}
                  className="w-20 text-center border-blue-300 bg-blue-50"
                  aria-label="ECTS credits"
                />
              ) : (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {module.ectsCredits} ECTS
                </Badge>
              )}
            </div>
          </div>
          {isEditing && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateModuleStatus(module.id, 'development')}
                className={module.status === 'development' ? 'bg-yellow-50 border-yellow-200' : ''}
              >
                Dev
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateModuleStatus(module.id, 'review')}
                className={module.status === 'review' ? 'bg-blue-50 border-blue-200' : ''}
              >
                Review
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateModuleStatus(module.id, 'approved')}
                className={module.status === 'approved' ? 'bg-green-50 border-green-200' : ''}
              >
                Approved
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateModuleStatus(module.id, 'pilot-ready')}
                className={module.status === 'pilot-ready' ? 'bg-purple-50 border-purple-200' : ''}
              >
                Ready
              </Button>
              <Button
                onClick={() => removeModule(module.id)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <Textarea
            value={module.description}
            onChange={(e) => updateModuleField(module.id, 'description', e.target.value)}
            className="text-sm border-blue-300 bg-blue-50"
            rows={3}
            aria-label="Module description"
          />
        ) : (
          <p className="text-sm text-gray-600">{module.description}</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              Lead Institution
            </h4>
            {isEditing ? (
              <Input
                value={module.leadInstitution}
                onChange={(e) => updateModuleField(module.id, 'leadInstitution', e.target.value)}
                className="text-sm border-blue-300 bg-blue-50"
                aria-label="Lead institution"
              />
            ) : (
              <p className={`text-sm font-medium ${getInstitutionColor(module.leadInstitution)}`}>
                {module.leadInstitution}
              </p>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Users className="w-4 h-4" />
              Co-Developers
            </h4>
            <div className="flex flex-wrap gap-1">
              {module.coDevelopers.map((dev, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {dev}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <Target className="w-4 h-4" />
            Learning Outcomes
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {module.learningOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        {module.prerequisites.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              Prerequisites
            </h4>
            <div className="flex flex-wrap gap-1">
              {module.prerequisites.map((prereq, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                  {prereq}
                </Badge>
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
            <BookOpen className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{modules.length}</div>
            <div className="text-sm opacity-90">Total Modules</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalEcts}</div>
            <div className="text-sm opacity-90">Total ECTS</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{completedEcts}</div>
            <div className="text-sm opacity-90">Completed ECTS</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <PlayCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{pilotReadyModules.length}</div>
            <div className="text-sm opacity-90">Pilot Ready</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Curriculum Development Progress
            </CardTitle>
            {isEditing && (
              <Button onClick={addModule} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold">
                  {Math.round((completedEcts / totalEcts) * 100)}%
                </span>
              </div>
              <Progress value={(completedEcts / totalEcts) * 100} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{developmentModules.length}</div>
                <div className="text-xs text-gray-600">In Development</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{reviewModules.length}</div>
                <div className="text-xs text-gray-600">Under Review</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{approvedModules.length}</div>
                <div className="text-xs text-gray-600">Approved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{pilotReadyModules.length}</div>
                <div className="text-xs text-gray-600">Pilot Ready</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-2">
            <TabsList className="grid w-full grid-cols-5 bg-transparent gap-1">
              <TabsTrigger value="all" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <BookOpen className="w-4 h-4" />
                All Modules
              </TabsTrigger>
              <TabsTrigger value="development" className="flex items-center gap-2 data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                <AlertCircle className="w-4 h-4" />
                Development
              </TabsTrigger>
              <TabsTrigger value="review" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Clock className="w-4 h-4" />
                Review
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
                <CheckCircle className="w-4 h-4" />
                Approved
              </TabsTrigger>
              <TabsTrigger value="pilot-ready" className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <PlayCircle className="w-4 h-4" />
                Pilot Ready
              </TabsTrigger>
            </TabsList>
          </CardContent>
        </Card>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modules.map(renderModuleCard)}
          </div>
        </TabsContent>

        <TabsContent value="development" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {developmentModules.map(renderModuleCard)}
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviewModules.map(renderModuleCard)}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {approvedModules.map(renderModuleCard)}
          </div>
        </TabsContent>

        <TabsContent value="pilot-ready" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pilotReadyModules.map(renderModuleCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 