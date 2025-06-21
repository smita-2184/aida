"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import type { ProjectData } from "@/lib/project-data"
import { Euro, TrendingUp, PieChart, Edit3, AlertTriangle, CheckCircle } from "lucide-react"

interface BudgetProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  isEditing: boolean
}

export default function Budget({ projectData, setProjectData, isEditing }: BudgetProps) {
  const updateWorkPackageBudget = (index: number, budget: number) => {
    const newWorkPackages = [...projectData.workPackages]
    newWorkPackages[index] = { ...newWorkPackages[index], budget }
    setProjectData({ ...projectData, workPackages: newWorkPackages })
  }

  const updatePartnerBudget = (index: number, budget: number) => {
    const newPartners = [...projectData.partners]
    newPartners[index] = { ...newPartners[index], budget }
    setProjectData({ ...projectData, partners: newPartners })
  }

  const updateTotalBudget = (totalBudget: number) => {
    setProjectData({ ...projectData, totalBudget })
  }

  const autoBalanceWorkPackages = () => {
    const equalBudget = Math.floor(projectData.totalBudget / projectData.workPackages.length)
    const remainder = projectData.totalBudget % projectData.workPackages.length

    const newWorkPackages = projectData.workPackages.map((wp, index) => ({
      ...wp,
      budget: equalBudget + (index < remainder ? 1 : 0),
    }))

    setProjectData({ ...projectData, workPackages: newWorkPackages })
  }

  const autoBalancePartners = () => {
    const equalBudget = Math.floor(projectData.totalBudget / projectData.partners.length)
    const remainder = projectData.totalBudget % projectData.partners.length

    const newPartners = projectData.partners.map((partner, index) => ({
      ...partner,
      budget: equalBudget + (index < remainder ? 1 : 0),
    }))

    setProjectData({ ...projectData, partners: newPartners })
  }

  const workPackageBudgetTotal = projectData.workPackages.reduce((sum, wp) => sum + wp.budget, 0)
  const partnerBudgetTotal = projectData.partners.reduce((sum, partner) => sum + partner.budget, 0)

  const isWorkPackageBalanced = workPackageBudgetTotal === projectData.totalBudget
  const isPartnerBalanced = partnerBudgetTotal === projectData.totalBudget
  const isAligned = workPackageBudgetTotal === partnerBudgetTotal

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Edit3 className="w-6 h-6" />
          Budget Allocation
        </h2>
        {isEditing && (
          <div className="flex gap-2">
            <Button onClick={autoBalanceWorkPackages} variant="outline" size="sm">
              Balance WPs
            </Button>
            <Button onClick={autoBalancePartners} variant="outline" size="sm">
              Balance Partners
            </Button>
          </div>
        )}
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Euro className="w-6 h-6 text-green-600" />
              <div className="flex-1">
                <Label className="text-sm text-gray-600">Total Budget (€)</Label>
                <Input
                  type="number"
                  value={projectData.totalBudget}
                  onChange={(e) => updateTotalBudget(Number.parseInt(e.target.value) || 0)}
                  disabled={!isEditing}
                  className={`text-2xl font-bold h-12 ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">WP Budget Total</p>
                <p className="text-2xl font-bold">€{workPackageBudgetTotal.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  {isWorkPackageBalanced ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                  <p className="text-xs text-gray-500">
                    {isWorkPackageBalanced
                      ? "Balanced"
                      : `Diff: €${Math.abs(workPackageBudgetTotal - projectData.totalBudget).toLocaleString()}`}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <PieChart className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Partner Budget Total</p>
                <p className="text-2xl font-bold">€{partnerBudgetTotal.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  {isPartnerBalanced ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                  <p className="text-xs text-gray-500">
                    {isPartnerBalanced
                      ? "Balanced"
                      : `Diff: €${Math.abs(partnerBudgetTotal - projectData.totalBudget).toLocaleString()}`}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Work Package Budget Breakdown */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Work Package Budget Allocation</CardTitle>
            {isEditing && (
              <Button onClick={autoBalanceWorkPackages} size="sm" variant="outline">
                Auto Balance
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectData.workPackages.map((wp, index) => {
              const percentage =
                projectData.totalBudget > 0 ? ((wp.budget / projectData.totalBudget) * 100).toFixed(1) : "0.0"
              return (
                <div key={wp.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 flex-1">
                      <span className="font-medium min-w-16">{wp.id}:</span>
                      <span className="flex-1">{wp.title}</span>
                      <span className="text-sm text-gray-500">({wp.lead})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label className="text-xs">€</Label>
                      <Input
                        type="number"
                        value={wp.budget}
                        onChange={(e) => updateWorkPackageBudget(index, Number.parseInt(e.target.value) || 0)}
                        disabled={!isEditing}
                        className={`w-32 text-right ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                      />
                      <span className="text-sm text-gray-600 w-12">({percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={Number.parseFloat(percentage)} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Partner Budget Breakdown */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Partner Budget Allocation</CardTitle>
            {isEditing && (
              <Button onClick={autoBalancePartners} size="sm" variant="outline">
                Auto Balance
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectData.partners.map((partner, index) => {
              const percentage =
                projectData.totalBudget > 0 ? ((partner.budget / projectData.totalBudget) * 100).toFixed(1) : "0.0"
              return (
                <div key={partner.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 flex-1">
                      <span className="font-medium flex-1">{partner.name}</span>
                      <span className="text-sm text-gray-500">({partner.role})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label className="text-xs">€</Label>
                      <Input
                        type="number"
                        value={partner.budget}
                        onChange={(e) => updatePartnerBudget(index, Number.parseInt(e.target.value) || 0)}
                        disabled={!isEditing}
                        className={`w-32 text-right ${isEditing ? "border-blue-300 bg-blue-50" : "border-transparent bg-transparent"}`}
                      />
                      <span className="text-sm text-gray-600 w-12">({percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={Number.parseFloat(percentage)} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Summary Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Work Package Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Work Package Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projectData.workPackages.map((wp) => {
                const percentage =
                  projectData.totalBudget > 0 ? ((wp.budget / projectData.totalBudget) * 100).toFixed(1) : "0.0"
                return (
                  <div key={wp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">{wp.id}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="text-sm font-bold w-12">{percentage}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Partner Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Partner Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projectData.partners.map((partner) => {
                const percentage =
                  projectData.totalBudget > 0 ? ((partner.budget / projectData.totalBudget) * 100).toFixed(1) : "0.0"
                return (
                  <div key={partner.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">{partner.name.split(" ")[0]}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="text-sm font-bold w-12">{percentage}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Validation */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Budget Validation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div
              className={`flex justify-between items-center p-4 rounded-lg ${isWorkPackageBalanced ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
            >
              <span className="flex items-center space-x-2">
                {isWorkPackageBalanced ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                )}
                <span>Work Package Total vs Project Budget</span>
              </span>
              <span className={`font-bold ${isWorkPackageBalanced ? "text-green-600" : "text-red-600"}`}>
                {isWorkPackageBalanced
                  ? "✅ Balanced"
                  : `⚠️ Difference: €${Math.abs(workPackageBudgetTotal - projectData.totalBudget).toLocaleString()}`}
              </span>
            </div>

            <div
              className={`flex justify-between items-center p-4 rounded-lg ${isPartnerBalanced ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
            >
              <span className="flex items-center space-x-2">
                {isPartnerBalanced ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                )}
                <span>Partner Total vs Project Budget</span>
              </span>
              <span className={`font-bold ${isPartnerBalanced ? "text-green-600" : "text-red-600"}`}>
                {isPartnerBalanced
                  ? "✅ Balanced"
                  : `⚠️ Difference: €${Math.abs(partnerBudgetTotal - projectData.totalBudget).toLocaleString()}`}
              </span>
            </div>

            <div
              className={`flex justify-between items-center p-4 rounded-lg ${isAligned ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}
            >
              <span className="flex items-center space-x-2">
                {isAligned ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                )}
                <span>Work Package vs Partner Totals</span>
              </span>
              <span className={`font-bold ${isAligned ? "text-green-600" : "text-yellow-600"}`}>
                {isAligned
                  ? "✅ Aligned"
                  : `⚠️ Difference: €${Math.abs(workPackageBudgetTotal - partnerBudgetTotal).toLocaleString()}`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
