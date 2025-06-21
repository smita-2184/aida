"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Server, 
  MapPin, 
  Zap, 
  Shield, 
  Globe, 
  Cpu, 
  Database,
  Network,
  CheckCircle,
  Clock,
  AlertCircle,
  PlayCircle,
  Plus,
  Trash2
} from "lucide-react"
import { type ProjectData } from "@/lib/project-data"

interface AIFactoriesProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  isEditing: boolean
}

const getAccessModeColor = (mode: string) => {
  switch (mode) {
    case 'playground': return 'bg-green-100 text-green-800 border-green-200'
    case 'fast-lane': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'research': return 'bg-purple-100 text-purple-800 border-purple-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'established': return 'bg-green-100 text-green-800 border-green-200'
    case 'active': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'planned': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'established': return <CheckCircle className="w-4 h-4" />
    case 'active': return <PlayCircle className="w-4 h-4" />
    case 'planned': return <Clock className="w-4 h-4" />
    default: return <AlertCircle className="w-4 h-4" />
  }
}

export default function AIFactories({ projectData, setProjectData, isEditing }: AIFactoriesProps) {
  const aiFactories = projectData.aiFactories

  const establishedFactories = aiFactories.filter(f => f.status === 'established')
  const activeFactories = aiFactories.filter(f => f.status === 'active')
  const plannedFactories = aiFactories.filter(f => f.status === 'planned')

  const updateFactoryStatus = (factoryName: string, newStatus: 'planned' | 'established' | 'active') => {
    if (!isEditing) return
    
    const updatedFactories = aiFactories.map(factory => 
      factory.name === factoryName ? { ...factory, status: newStatus } : factory
    )
    
    setProjectData({
      ...projectData,
      aiFactories: updatedFactories
    })
  }

  const updateFactoryField = (factoryName: string, field: 'name' | 'location' | 'accessMode', value: string) => {
    if (!isEditing) return
    
    const updatedFactories = aiFactories.map(factory => 
      factory.name === factoryName ? { ...factory, [field]: value } : factory
    )
    
    setProjectData({
      ...projectData,
      aiFactories: updatedFactories
    })
  }

  const addFactory = () => {
    if (!isEditing) return
    
    const newFactory = {
      name: "New AI Factory",
      location: "Location TBD",
      accessMode: 'playground' as const,
      status: 'planned' as const
    }
    
    setProjectData({
      ...projectData,
      aiFactories: [...aiFactories, newFactory]
    })
  }

  const removeFactory = (factoryName: string) => {
    if (!isEditing) return
    
    const updatedFactories = aiFactories.filter(factory => factory.name !== factoryName)
    
    setProjectData({
      ...projectData,
      aiFactories: updatedFactories
    })
  }

  const renderFactoryCard = (factory: typeof aiFactories[0]) => (
    <Card key={factory.name} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2">
              {isEditing ? (
                <Input
                  value={factory.name}
                  onChange={(e) => updateFactoryField(factory.name, 'name', e.target.value)}
                  className="text-lg font-semibold border-blue-300 bg-blue-50"
                />
              ) : (
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  {factory.name}
                </CardTitle>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(factory.status)}>
                {getStatusIcon(factory.status)}
                <span className="ml-1 capitalize">{factory.status}</span>
              </Badge>
              <Badge className={getAccessModeColor(factory.accessMode || 'playground')}>
                <Zap className="w-3 h-3 mr-1" />
                {(factory.accessMode || 'playground').replace('-', ' ')}
              </Badge>
            </div>
          </div>
          {isEditing && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateFactoryStatus(factory.name, 'planned')}
                className={factory.status === 'planned' ? 'bg-yellow-50 border-yellow-200' : ''}
              >
                Planned
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateFactoryStatus(factory.name, 'established')}
                className={factory.status === 'established' ? 'bg-green-50 border-green-200' : ''}
              >
                Established
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateFactoryStatus(factory.name, 'active')}
                className={factory.status === 'active' ? 'bg-blue-50 border-blue-200' : ''}
              >
                Active
              </Button>
              <Button
                onClick={() => removeFactory(factory.name)}
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
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          {isEditing ? (
            <Input
              value={factory.location}
              onChange={(e) => updateFactoryField(factory.name, 'location', e.target.value)}
              className="flex-1 border-blue-300 bg-blue-50"
              placeholder="Factory location"
            />
          ) : (
            factory.location
          )}
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Cpu className="w-4 h-4" />
              Access Mode
            </h4>
            {isEditing ? (
              <Select 
                value={factory.accessMode} 
                onValueChange={(value) => updateFactoryField(factory.name, 'accessMode', value)}
              >
                <SelectTrigger className="border-blue-300 bg-blue-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="playground">Playground</SelectItem>
                  <SelectItem value="fast-lane">Fast Lane</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-2">
                {factory.accessMode === 'playground' && (
                  <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                    <div className="font-medium text-green-800 mb-1">Playground Access</div>
                    <div className="text-green-700">Entry-level access for learning and experimentation with AI models and tools.</div>
                  </div>
                )}
                {factory.accessMode === 'fast-lane' && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <div className="font-medium text-blue-800 mb-1">Fast Lane Access</div>
                    <div className="text-blue-700">Priority access for SMEs requiring significant GPU hours and computational resources.</div>
                  </div>
                )}
                {factory.accessMode === 'research' && (
                  <div className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                    <div className="font-medium text-purple-800 mb-1">Research Access</div>
                    <div className="text-purple-700">Advanced access for research institutions and cutting-edge AI development.</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Database className="w-4 h-4" />
              Available Resources
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-medium">GPU Clusters</div>
                <div className="text-gray-600">High-performance computing</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-medium">AI Models</div>
                <div className="text-gray-600">Pre-trained models</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-medium">Data Storage</div>
                <div className="text-gray-600">Secure data management</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-medium">Training Tools</div>
                <div className="text-gray-600">Development frameworks</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Security & Compliance
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                EU GDPR compliant
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                ISO 27001 certified
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                Secure data transmission
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <Server className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{aiFactories.length}</div>
            <div className="text-sm opacity-90">AI Factories</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{establishedFactories.length}</div>
            <div className="text-sm opacity-90">Established</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <PlayCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{activeFactories.length}</div>
            <div className="text-sm opacity-90">Active</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{plannedFactories.length}</div>
            <div className="text-sm opacity-90">Planned</div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Overview */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Network className="w-5 h-5 text-blue-600" />
              AI Factories Integration Strategy
            </CardTitle>
            {isEditing && (
              <Button onClick={addFactory} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Factory
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-1">
                <PlayCircle className="w-4 h-4" />
                Playground Access
              </h3>
              <p className="text-sm text-green-700">
                Entry-level access for students and beginners to learn AI fundamentals and experiment with basic models.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Fast Lane Access
              </h3>
              <p className="text-sm text-blue-700">
                Priority access for SMEs requiring significant computational resources for production AI applications.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-1">
                <Cpu className="w-4 h-4" />
                Research Access
              </h3>
              <p className="text-sm text-purple-700">
                Advanced access for research institutions working on cutting-edge AI development and innovation.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-1">
              <Globe className="w-4 h-4" />
              EuroHPC Integration
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              AIDA curriculum integrates hands-on experience with EuroHPC supercomputers and AI Factories infrastructure, 
              preparing participants for real-world AI development using Europe's most advanced computing resources.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Curriculum Integration</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Supercomputing for AI module</li>
                  <li>• Hands-on AI Factories workshops</li>
                  <li>• Capstone projects using real infrastructure</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Access Benefits</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Reduced computational costs for SMEs</li>
                  <li>• Access to cutting-edge AI infrastructure</li>
                  <li>• Industry-standard development environment</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Factories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aiFactories.map(renderFactoryCard)}
      </div>

      {/* Connection Map */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Network className="w-5 h-5 text-blue-600" />
            European AI Factories Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">European AI Factories Network</h3>
                <p className="text-sm text-blue-700 max-w-md">
                  AIDA connects participants to Europe's network of AI Factories, providing access to 
                  world-class computing infrastructure for AI development and innovation.
                </p>
              </div>
            </div>
            
            {/* Factory locations */}
            <div className="absolute top-4 left-4">
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Jupiter (Jülich)
              </div>
            </div>
            <div className="absolute top-8 right-8">
              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Stuttgart
              </div>
            </div>
            <div className="absolute bottom-8 left-8">
              <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                Bologna
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 