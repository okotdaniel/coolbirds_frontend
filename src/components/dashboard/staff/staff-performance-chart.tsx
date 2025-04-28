"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "John S.", productivity: 95, quality: 92, teamwork: 90 },
  { name: "Maria G.", productivity: 98, quality: 97, teamwork: 95 },
  { name: "Robert J.", productivity: 85, quality: 88, teamwork: 92 },
  { name: "Sarah W.", productivity: 80, quality: 85, teamwork: 88 },
  { name: "David B.", productivity: 90, quality: 87, teamwork: 85 },
  { name: "Jennifer L.", productivity: 92, quality: 95, teamwork: 90 },
]

export function StaffPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
          formatter={(value) => [`${value}%`, ""]}
        />
        <Bar dataKey="productivity" name="Productivity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="quality" name="Quality" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="teamwork" name="Teamwork" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

