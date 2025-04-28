"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts"

const data = [
  { week: "Week 1", mortality: 0.5 },
  { week: "Week 2", mortality: 0.3 },
  { week: "Week 3", mortality: 0.2 },
  { week: "Week 4", mortality: 0.1 },
  { week: "Week 5", mortality: 0.1 },
  { week: "Week 6", mortality: 0.0 },
  { week: "Week 7", mortality: 0.1 },
  { week: "Week 8", mortality: 0.0 },
  { week: "Week 9", mortality: 0.1 },
  { week: "Week 10", mortality: 0.0 },
  { week: "Week 11", mortality: 0.0 },
  { week: "Week 12", mortality: 0.0 },
]

export function FlockMortalityChart() {
  return (
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
        <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
          formatter={(value) => [`${value}%`, "Weekly Mortality"]}
        />
        <Legend />
        <ReferenceLine
          y={0.3}
          stroke="#f43f5e"
          strokeDasharray="3 3"
          label={{ value: "Alert Threshold", position: "right", fill: "#f43f5e" }}
        />
        <Bar dataKey="mortality" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Mortality Rate" />
      </BarChart>
    </ResponsiveContainer>
  )
}

