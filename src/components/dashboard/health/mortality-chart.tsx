"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { week: "Week 1", house1: 0.8, house2: 0.6, house3: 0.9 },
  { week: "Week 2", house1: 0.5, house2: 0.4, house3: 0.7 },
  { week: "Week 3", house1: 0.3, house2: 0.3, house3: 0.5 },
  { week: "Week 4", house1: 0.2, house2: 0.2, house3: 0.3 },
  { week: "Week 5", house1: 0.2, house2: 0.1, house3: 0.2 },
  { week: "Week 6", house1: 0.1, house2: 0.1, house3: 0.1 },
]

export function MortalityChart() {
  return (
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
          formatter={(value) => [`${value}%`, ""]}
        />
        <Bar dataKey="house1" fill="#f43f5e" radius={[4, 4, 0, 0]} name="House 1" />
        <Bar dataKey="house2" fill="#ec4899" radius={[4, 4, 0, 0]} name="House 2" />
        <Bar dataKey="house3" fill="#d946ef" radius={[4, 4, 0, 0]} name="House 3" />
      </BarChart>
    </ResponsiveContainer>
  )
}
