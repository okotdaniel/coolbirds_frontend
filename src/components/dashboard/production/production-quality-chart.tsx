"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Area, AreaChart } from "recharts"

const data = [
  { week: "Week 1", gradeA: 82.5, gradeB: 14.2, damaged: 2.6, rejected: 0.7 },
  { week: "Week 2", gradeA: 83.1, gradeB: 13.8, damaged: 2.4, rejected: 0.7 },
  { week: "Week 3", gradeA: 83.8, gradeB: 13.5, damaged: 2.1, rejected: 0.6 },
  { week: "Week 4", gradeA: 84.2, gradeB: 13.0, damaged: 2.2, rejected: 0.6 },
  { week: "Week 5", gradeA: 84.8, gradeB: 12.5, damaged: 2.0, rejected: 0.7 },
  { week: "Week 6", gradeA: 85.2, gradeB: 12.3, damaged: 1.8, rejected: 0.7 },
  { week: "Week 7", gradeA: 85.0, gradeB: 12.5, damaged: 1.9, rejected: 0.6 },
  { week: "Week 8", gradeA: 85.4, gradeB: 12.1, damaged: 1.8, rejected: 0.7 },
]

export function ProductionQualityChart() {
  return (

    <Card>
        <CardHeader>
          <CardTitle>Egg Quality Metrics</CardTitle>
          <CardDescription>Quality distribution over time</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          stackOffset="expand"
          percent
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
            }}
            formatter={(value) => [`${(value * 100).toFixed(1)}%`, ""]}
          />
          <Legend />
          <Area type="monotone" dataKey="gradeA" stackId="1" stroke="#10b981" fill="#10b981" name="Grade A" />
          <Area type="monotone" dataKey="gradeB" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Grade B" />
          <Area type="monotone" dataKey="damaged" stackId="1" stroke="#f43f5e" fill="#f43f5e" name="Damaged" />
          <Area type="monotone" dataKey="rejected" stackId="1" stroke="#881337" fill="#881337" name="Rejected" />
        </AreaChart>
      </ResponsiveContainer>

    </CardContent>
    </Card>
  )
}
