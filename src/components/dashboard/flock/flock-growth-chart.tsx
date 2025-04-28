"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { age: "20", actual: 0.25, standard: 0.24 },
  { age: "40", actual: 0.52, standard: 0.5 },
  { age: "60", actual: 0.78, standard: 0.76 },
  { age: "80", actual: 1.05, standard: 1.02 },
  { age: "100", actual: 1.32, standard: 1.3 },
  { age: "120", actual: 1.58, standard: 1.55 },
  { age: "140", actual: 1.82, standard: 1.8 },
  { age: "160", actual: 1.9, standard: 1.88 },
]

export function FlockGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="age"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{ value: "Age (days)", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{ value: "Weight (kg)", angle: -90, position: "insideLeft", offset: -5 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
          formatter={(value) => [`${value} kg`, ""]}
        />
        <Legend />
        <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} name="Actual Weight" />
        <Line type="monotone" dataKey="standard" stroke="#10b981" strokeDasharray="5 5" name="Breed Standard" />
      </LineChart>
    </ResponsiveContainer>
  )
}

