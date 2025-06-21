"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ProjectData, Partner } from "@/lib/project-data"
import { Plus, Trash2, Building, MapPin, Euro, Star, Edit3, Users } from "lucide-react"

interface PartnersProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  isEditing: boolean
}

export default function Partners({ projectData, setProjectData, isEditing }: PartnersProps) {
  const updatePartner = (index: number, field: keyof Partner, value: any) => {
    const newPartners = [...projectData.partners]
    newPartners[index] = { ...newPartners[index], [field]: value }
    setProjectData({ ...projectData, partners: newPartners })
  }

  const addPartner = () => {
    const newPartner: Partner = {
      id: `p${Date.now()}`,
      name: "New Partner",
      role: "Contributor",
      country: "TBD",
      budget: 0,
      expertise: ["Expertise Area"],
      leadWPs: [],
      contributionWPs: [],
    }
    setProjectData({ ...projectData, partners: [...projectData.partners, newPartner] })
  }

  const removePartner = (index: number) => {
    const newPartners = projectData.partners.filter((_, i) => i !== index)
    setProjectData({ ...projectData, partners: newPartners })
  }

  const updateExpertise = (partnerIndex: number, expertiseIndex: number, value: string) => {
    const newPartners = [...projectData.partners]
    const newExpertise = [...newPartners[partnerIndex].expertise]
    newExpertise[expertiseIndex] = value
    newPartners[partnerIndex] = { ...newPartners[partnerIndex], expertise: newExpertise }
    setProjectData({ ...projectData, partners: newPartners })
  }

  const addExpertise = (partnerIndex: number) => {
    const newPartners = [...projectData.partners]
    const newExpertise = [...newPartners[partnerIndex].expertise, "New Expertise"]
    newPartners[partnerIndex] = { ...newPartners[partnerIndex], expertise: newExpertise }
    setProjectData({ ...projectData, partners: newPartners })
  }

  const removeExpertise = (partnerIndex: number, expertiseIndex: number) => {
    const newPartners = [...projectData.partners]
    const newExpertise = newPartners[partnerIndex].expertise.filter((_, i) => i !== expertiseIndex)
    newPartners[partnerIndex] = { ...newPartners[partnerIndex], expertise: newExpertise }
    setProjectData({ ...projectData, partners: newPartners })
  }

  const updateWorkPackages = (partnerIndex: number, field: "leadWPs" | "contributionWPs", value: string) => {
    const newPartners = [...projectData.partners]
    const wpArray = value
      .split(",")
      .map((wp) => wp.trim())
      .filter((wp) => wp)
    newPartners[partnerIndex] = { ...newPartners[partnerIndex], [field]: wpArray }
    setProjectData({ ...projectData, partners: newPartners })
  }

  const availableCountries = [
    "Germany",
    "Malta",
    "Italy",
    "France",
    "Spain",
    "Netherlands",
    "Belgium",
    "Austria",
    "Sweden",
    "Denmark",
    "Finland",
    "Poland",
    "Czech Republic",
    "Hungary",
    "Slovenia",
    "Croatia",
    "Portugal",
    "Greece",
    "Cyprus",
    "Luxembourg",
    "Estonia",
    "Latvia",
    "Lithuania",
  ]

  const availableRoles = [
    "Academic Coordinator",
    "Industry Partner",
    "Curriculum Co-Lead",
    "Research Co-Lead",
    "Technology Partner",
    "SME Representative",
    "Certification Authority",
    "Training Provider",
    "Dissemination Lead",
    "Quality Assurance",
    "Contributor",
  ]

  const availableWorkPackages = projectData.workPackages.map((wp) => wp.id)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Edit3 className="w-6 h-6" />
          Consortium Partners
        </h2>
        <Button onClick={addPartner} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectData.partners.map((partner, index) => {
          const percentage =
            projectData.totalBudget > 0 ? ((partner.budget / projectData.totalBudget) * 100).toFixed(1) : "0.0"
          return (
            <Card key={partner.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2 flex-1">
                    <Building className="w-5 h-5 text-blue-600" />
                    <Input
                      value={partner.name}
                      onChange={(e) => updatePartner(index, "name", e.target.value)}
                      disabled={!isEditing}
                      className={`font-semibold flex-1 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    />
                  </div>
                  <Button
                    onClick={() => removePartner(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Role and Country */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Role</Label>
                    {isEditing ? (
                      <Select value={partner.role} onValueChange={(value) => updatePartner(index, "role", value)}>
                        <SelectTrigger className="text-sm border-blue-300 bg-blue-50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="secondary" className="w-full justify-center">
                        {partner.role}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs">Country</Label>
                    {isEditing ? (
                      <Select value={partner.country} onValueChange={(value) => updatePartner(index, "country", value)}>
                        <SelectTrigger className="text-sm border-blue-300 bg-blue-50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCountries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                          <SelectItem value="TBD">TBD</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-sm">{partner.country}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <Label className="text-xs">Budget Allocation</Label>
                  <div className="flex items-center space-x-2">
                    <Euro className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={partner.budget}
                        onChange={(e) => updatePartner(index, "budget", Number.parseInt(e.target.value) || 0)}
                        disabled={!isEditing}
                        className={`${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                      />
                      <p className="text-xs text-gray-600 mt-1">({percentage}% of total)</p>
                    </div>
                  </div>
                </div>

                {/* Expertise */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-xs">Expertise Areas</Label>
                    <Button onClick={() => addExpertise(index)} size="sm" variant="outline" className="text-xs h-6">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {partner.expertise.map((exp, expIndex) => (
                      <div key={expIndex} className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <div className="flex-1 flex space-x-1">
                          <Input
                            value={exp}
                            onChange={(e) => updateExpertise(index, expIndex, e.target.value)}
                            disabled={!isEditing}
                            className={`text-xs h-6 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                          />
                          <Button
                            onClick={() => removeExpertise(index, expIndex)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500 h-6 w-6 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Packages */}
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs">Lead Work Packages</Label>
                    <Input
                      value={partner.leadWPs.join(", ")}
                      onChange={(e) => updateWorkPackages(index, "leadWPs", e.target.value)}
                      placeholder="WP1, WP2, ..."
                      disabled={!isEditing}
                      className={`text-xs ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    />
                    {!isEditing && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {partner.leadWPs.map((wp) => (
                          <Badge key={wp} className="text-xs bg-blue-100 text-blue-800">
                            {wp}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs">Contributing Work Packages</Label>
                    <Input
                      value={partner.contributionWPs.join(", ")}
                      onChange={(e) => updateWorkPackages(index, "contributionWPs", e.target.value)}
                      placeholder="WP1, WP2, ..."
                      disabled={!isEditing}
                      className={`text-xs ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                    />
                    {!isEditing && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {partner.contributionWPs.map((wp) => (
                          <Badge key={wp} variant="outline" className="text-xs">
                            {wp}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Partnership Matrix */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Partnership Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Partner</th>
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Country</th>
                  <th className="text-left p-2">Budget</th>
                  <th className="text-left p-2">Lead WPs</th>
                  <th className="text-left p-2">Contributing WPs</th>
                </tr>
              </thead>
              <tbody>
                {projectData.partners.map((partner) => {
                  const percentage =
                    projectData.totalBudget > 0 ? ((partner.budget / projectData.totalBudget) * 100).toFixed(1) : "0.0"
                  return (
                    <tr key={partner.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{partner.name}</td>
                      <td className="p-2">{partner.role}</td>
                      <td className="p-2">{partner.country}</td>
                      <td className="p-2">
                        €{partner.budget.toLocaleString()} ({percentage}%)
                      </td>
                      <td className="p-2">
                        <div className="flex flex-wrap gap-1">
                          {partner.leadWPs.map((wp) => (
                            <Badge key={wp} className="text-xs bg-blue-100 text-blue-800">
                              {wp}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-wrap gap-1">
                          {partner.contributionWPs.map((wp) => (
                            <Badge key={wp} variant="outline" className="text-xs">
                              {wp}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Consortium Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Consortium Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{projectData.partners.length}</p>
              <p className="text-sm text-gray-600">Total Partners</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {new Set(projectData.partners.map((p) => p.country)).size}
              </p>
              <p className="text-sm text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {projectData.partners.reduce((sum, p) => sum + p.leadWPs.length, 0)}
              </p>
              <p className="text-sm text-gray-600">Lead Roles</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {projectData.partners.reduce((sum, p) => sum + p.expertise.length, 0)}
              </p>
              <p className="text-sm text-gray-600">Expertise Areas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
