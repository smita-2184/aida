"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Users, 
  GraduationCap, 
  Building2, 
  Target, 
  TrendingUp, 
  Globe, 
  Heart,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  UserCheck,
  UserPlus,
  Users2,
  Award
} from "lucide-react"
import { type ProjectData } from "@/lib/project-data"

interface LivingLabProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  isEditing: boolean
}

const getRecruitmentStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200'
    case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'not-started': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getRecruitmentStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="w-4 h-4" />
    case 'in-progress': return <Clock className="w-4 h-4" />
    case 'not-started': return <AlertCircle className="w-4 h-4" />
    default: return <AlertCircle className="w-4 h-4" />
  }
}

export default function LivingLab({ projectData, setProjectData, isEditing }: LivingLabProps) {
  const livingLab = projectData.livingLab

  const updateRecruitmentStatus = (newStatus: 'not-started' | 'in-progress' | 'completed') => {
    if (!isEditing) return
    
    setProjectData({
      ...projectData,
      livingLab: {
        ...livingLab,
        recruitmentStatus: newStatus
      }
    })
  }

  const updateDiversity = (newDiversity: number) => {
    if (!isEditing) return
    
    setProjectData({
      ...projectData,
      livingLab: {
        ...livingLab,
        currentDiversity: newDiversity
      }
    })
  }

  const updateParticipants = (type: 'students' | 'smeEmployees', value: number) => {
    if (!isEditing) return
    
    setProjectData({
      ...projectData,
      livingLab: {
        ...livingLab,
        participants: {
          ...livingLab.participants,
          [type]: value,
          total: type === 'students' ? value + livingLab.participants.smeEmployees : livingLab.participants.students + value
        }
      }
    })
  }

  const updateDiversityTarget = (newTarget: number) => {
    if (!isEditing) return
    
    setProjectData({
      ...projectData,
      livingLab: {
        ...livingLab,
        diversityTarget: newTarget
      }
    })
  }

  const diversityPercentage = (livingLab.currentDiversity / livingLab.diversityTarget) * 100

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{livingLab.participants.total}</div>
            <div className="text-sm opacity-90">Total Participants</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-2" />
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  type="number"
                  value={livingLab.participants.students}
                  onChange={(e) => updateParticipants('students', Number(e.target.value) || 0)}
                  className="text-center text-2xl font-bold bg-white/20 border-white/30 text-white placeholder-white/70"
                  placeholder="0"
                  aria-label="Number of students"
                />
                <div className="text-sm opacity-90">Students</div>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{livingLab.participants.students}</div>
                <div className="text-sm opacity-90">Students</div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <Building2 className="w-8 h-8 mx-auto mb-2" />
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  type="number"
                  value={livingLab.participants.smeEmployees}
                  onChange={(e) => updateParticipants('smeEmployees', Number(e.target.value) || 0)}
                  className="text-center text-2xl font-bold bg-white/20 border-white/30 text-white placeholder-white/70"
                  placeholder="0"
                  aria-label="Number of SME employees"
                />
                <div className="text-sm opacity-90">SME Employees</div>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{livingLab.participants.smeEmployees}</div>
                <div className="text-sm opacity-90">SME Employees</div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{livingLab.currentDiversity}%</div>
            <div className="text-sm opacity-90">Diversity</div>
          </CardContent>
        </Card>
      </div>

      {/* Recruitment Status */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            Participant Recruitment Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className={getRecruitmentStatusColor(livingLab.recruitmentStatus || 'not-started')}>
                {getRecruitmentStatusIcon(livingLab.recruitmentStatus || 'not-started')}
                <span className="ml-1 capitalize">{(livingLab.recruitmentStatus || 'not-started').replace('-', ' ')}</span>
              </Badge>
              <span className="text-sm text-gray-600">
                {livingLab.recruitmentStatus === 'completed' ? 'All participants recruited' :
                 livingLab.recruitmentStatus === 'in-progress' ? 'Recruitment in progress' :
                 'Recruitment not yet started'}
              </span>
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateRecruitmentStatus('not-started')}
                  className={livingLab.recruitmentStatus === 'not-started' ? 'bg-yellow-50 border-yellow-200' : ''}
                >
                  Not Started
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateRecruitmentStatus('in-progress')}
                  className={livingLab.recruitmentStatus === 'in-progress' ? 'bg-blue-50 border-blue-200' : ''}
                >
                  In Progress
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateRecruitmentStatus('completed')}
                  className={livingLab.recruitmentStatus === 'completed' ? 'bg-green-50 border-green-200' : ''}
                >
                  Completed
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Student Cohort
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Target:</span>
                  <span className="font-medium text-blue-800">{livingLab.participants.students} students</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Source:</span>
                  <span className="font-medium text-blue-800">HU Berlin M.Sc. programs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Programs:</span>
                  <span className="font-medium text-blue-800">Informatik, AI, Data Science</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                SME Employee Cohort
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-700">Target:</span>
                  <span className="font-medium text-purple-800">{livingLab.participants.smeEmployees} employees</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-700">Source:</span>
                  <span className="font-medium text-purple-800">IHK Berlin member companies</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-700">Sectors:</span>
                  <span className="font-medium text-purple-800">Manufacturing, Logistics, Health Tech</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diversity & Inclusion */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600" />
            Diversity & Inclusion Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Diversity Target Achievement</h3>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-gray-600">Target:</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={livingLab.diversityTarget}
                    onChange={(e) => updateDiversityTarget(Number(e.target.value) || 0)}
                    className="w-20 px-2 py-1 border rounded text-sm"
                    aria-label="Diversity target percentage"
                  />
                  <span className="text-sm text-gray-600">% women and underrepresented groups</span>
                </div>
              ) : (
                <p className="text-sm text-gray-600">Target: {livingLab.diversityTarget}% women and underrepresented groups</p>
              )}
            </div>
            {isEditing && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Current:</span>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={livingLab.currentDiversity}
                  onChange={(e) => updateDiversity(Number(e.target.value))}
                  className="w-16 px-2 py-1 border rounded text-sm"
                  aria-label="Current diversity percentage"
                />
                <span className="text-sm text-gray-600">%</span>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-bold">{Math.round(diversityPercentage)}%</span>
            </div>
            <Progress value={diversityPercentage} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg">
              <h4 className="font-semibold text-pink-800 mb-2 flex items-center gap-1">
                <UserCheck className="w-4 h-4" />
                Targeted Outreach
              </h4>
              <ul className="text-sm text-pink-700 space-y-1">
                <li>• Women in Tech networks</li>
                <li>• Underrepresented communities</li>
                <li>• Inclusive recruitment practices</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-1">
                <Award className="w-4 h-4" />
                Mentorship Program
              </h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Industry mentor matching</li>
                <li>• Career development support</li>
                <li>• Networking opportunities</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg">
              <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-1">
                <Users2 className="w-4 h-4" />
                Support Schemes
              </h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Flexible learning options</li>
                <li>• Financial support</li>
                <li>• Inclusive curriculum design</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Living Lab Structure */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Living Lab Structure & Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Program Phases
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Recruitment & Selection</h4>
                    <p className="text-sm text-gray-600">Months 19-21: Participant recruitment and selection process</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Core Program Delivery</h4>
                    <p className="text-sm text-gray-600">Months 22-30: Blended learning with academic and industry content</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">AI Factories Integration</h4>
                    <p className="text-sm text-gray-600">Months 25-28: Hands-on workshops with EuroHPC infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Industry Projects</h4>
                    <p className="text-sm text-gray-600">Months 26-31: Real-world projects with SME partners</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Capstone Projects</h4>
                    <p className="text-sm text-gray-600">Months 30-33: Final projects using AI Factories infrastructure</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Key Features
              </h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Dual Audience Learning</h4>
                  <p className="text-sm text-blue-700">Students and SME employees learn together, creating cross-pollination between academic theory and industrial practice.</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">Industry Integration</h4>
                  <p className="text-sm text-green-700">SME participants act as mentors, providing real-world context and industry insights to student participants.</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-1">AI Factories Access</h4>
                  <p className="text-sm text-purple-700">Hands-on experience with EuroHPC supercomputers and AI Factories infrastructure for real-world AI development.</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-1">Capstone Projects</h4>
                  <p className="text-sm text-orange-700">Mixed teams collaborate on significant real-world challenges provided by participating SMEs.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expected Outcomes */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Expected Outcomes & Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">For Students</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Industry-relevant skills</li>
                <li>• Real-world project experience</li>
                <li>• Professional networking</li>
                <li>• IHK certification</li>
              </ul>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">For SMEs</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• AI talent pipeline</li>
                <li>• Innovation projects</li>
                <li>• Digital transformation</li>
                <li>• Competitive advantage</li>
              </ul>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">For Europe</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• AI skills development</li>
                <li>• SME competitiveness</li>
                <li>• Digital sovereignty</li>
                <li>• Sustainable model</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 