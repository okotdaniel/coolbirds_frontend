"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { month: "Apr '24", eggs: 210500, target: 220000 },
  { month: "May '24", eggs: 225800, target: 220000 },
  { month: "Jun '24", eggs: 228400, target: 225000 },
  { month: "Jul '24", eggs: 230100, target: 225000 },
  { month: "Aug '24", eggs: 232500, target: 230000 },
  { month: "Sep '24", eggs: 235800, target: 230000 },
  { month: "Oct '24", eggs: 240200, target: 235000 },
  { month: "Nov '24", eggs: 245600, target: 240000 },
  { month: "Dec '24", eggs: 248900, target: 245000 },
  { month: "Jan '25", eggs: 252300, target: 250000 },
  { month: "Feb '25", eggs: 258700, target: 255000 },
  { month: "Mar '25", eggs: 265800, target: 260000 },
]

export function MonthlyProductionChart() {
  return (

    <Card>
    <CardHeader>
      <CardTitle>Monthly Production Trends</CardTitle>
      <CardDescription>Egg production trends over the past 12 months</CardDescription>
    </CardHeader>
    <CardContent className="h-80">
    
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
            />
            <Legend />
            <Bar dataKey="eggs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Actual Production" />
            <Bar dataKey="target" fill="#10b981" radius={[4, 4, 0, 0]} name="Target" />
          </BarChart>
        </ResponsiveContainer>
    </CardContent>
    </Card>
  )
}
