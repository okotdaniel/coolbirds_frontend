"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { weight: "< 1.0 kg", count: 120 },
  { weight: "1.0-1.2 kg", count: 350 },
  { weight: "1.2-1.4 kg", count: 820 },
  { weight: "1.4-1.6 kg", count: 1250 },
  { weight: "1.6-1.8 kg", count: 980 },
  { weight: "1.8-2.0 kg", count: 420 },
  { weight: "> 2.0 kg", count: 180 },
]

export function WeightDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Distribution</CardTitle>
        <CardDescription>Bird weight distribution across all houses</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
                 
                
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis dataKey="weight" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
          formatter={(value) => [`${value} birds`, ""]}
        />
        <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} name="Bird Count" />
      </BarChart>
    </ResponsiveContainer>

    </CardContent>
    </Card>
  )
}
