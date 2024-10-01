"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface Allocation {
  FDs: number
  Bonds: number
  "Mutual Funds": number
  Stocks: number
}

export default function AssetAllocation() {
  const [riskTolerance, setRiskTolerance] = useState<string>("")
  const [investmentHorizon, setInvestmentHorizon] = useState<string>("")
  const [financialGoals, setFinancialGoals] = useState<string>("")
  const [allocation, setAllocation] = useState<Allocation | null>(null)

  const assetAllocation = (
    riskTolerance: string,
    investmentHorizon: string,
    financialGoals: string
  ): Allocation => {
    let allocation: Allocation = {
      FDs: 0,
      Bonds: 0,
      "Mutual Funds": 0,
      Stocks: 0,
    }

    // Determine allocation based on risk tolerance
    if (riskTolerance === "conservative") {
      allocation.FDs = 50
      allocation.Bonds = 30
      allocation["Mutual Funds"] = 15
      allocation.Stocks = 5
    } else if (riskTolerance === "moderate") {
      allocation.FDs = 20
      allocation.Bonds = 30
      allocation["Mutual Funds"] = 30
      allocation.Stocks = 20
    } else if (riskTolerance === "aggressive") {
      allocation.FDs = 10
      allocation.Bonds = 10
      allocation["Mutual Funds"] = 40
      allocation.Stocks = 40
    }

    // Adjust allocation based on investment horizon
    if (investmentHorizon === "short-term") {
      allocation.FDs += 10
      allocation.Stocks -= 10
    } else if (investmentHorizon === "long-term") {
      allocation.Stocks += 10
      allocation.FDs -= 10
    }

    // Adjust allocation based on financial goals
    if (financialGoals === "saving-for-house") {
      allocation.FDs += 10
      allocation["Mutual Funds"] -= 10
    } else if (financialGoals === "retirement") {
      allocation.Stocks += 10
      allocation.Bonds -= 5
    }

    // Normalize the allocation to ensure they sum to 100
    const total = Object.values(allocation).reduce((sum, value) => sum + value, 0)
    for (let key in allocation) {
      allocation[key as keyof Allocation] = Math.round((allocation[key as keyof Allocation] / total) * 100)
    }

    return allocation
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = assetAllocation(riskTolerance, investmentHorizon, financialGoals)
    setAllocation(result)
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Asset Allocation Recommender</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div>
            <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
            <RadioGroup
              id="risk-tolerance"
              value={riskTolerance}
              onValueChange={setRiskTolerance}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conservative" id="conservative" />
                <Label htmlFor="conservative">Conservative</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="moderate" />
                <Label htmlFor="moderate">Moderate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aggressive" id="aggressive" />
                <Label htmlFor="aggressive">Aggressive</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="investment-horizon">Investment Horizon</Label>
            <Select value={investmentHorizon} onValueChange={setInvestmentHorizon}>
              <SelectTrigger id="investment-horizon">
                <SelectValue placeholder="Select investment horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short-term">Short-term</SelectItem>
                <SelectItem value="medium-term">Medium-term</SelectItem>
                <SelectItem value="long-term">Long-term</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="financial-goals">Financial Goals</Label>
            <Select value={financialGoals} onValueChange={setFinancialGoals}>
              <SelectTrigger id="financial-goals">
                <SelectValue placeholder="Select financial goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="saving-for-house">Saving for house</SelectItem>
                <SelectItem value="retirement">Retirement</SelectItem>
                <SelectItem value="emergency-fund">Emergency fund</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Get Recommendation
          </Button>
        </form>

        {allocation && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recommended Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                {Object.entries(allocation).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold">{value}%</div>
                    <div className="text-sm text-gray-500">{key}</div>
                  </div>
                ))}
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(allocation).map(([name, value]) => ({ name, value }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Corrected template literal syntax
                    >
                      {Object.entries(allocation).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // Fixed the key prop
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
