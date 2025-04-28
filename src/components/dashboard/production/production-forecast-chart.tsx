"use client"

import { Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Area, AreaChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { month: "Apr '25", forecast: 265800, lower: 260000, upper: 270000 },
  { month: "May '25", forecast: 272500, lower: 265000, upper: 278000 },
  { month: "Jun '25", forecast: 272200, lower: 265000, upper: 280000 },
  { month: "Jul '25", forecast: 270800, lower: 262000, upper: 278000 },
  { month: "Aug '25", forecast: 258400, lower: 250000, upper: 265000 },
  { month: "Sep '25", forecast: 245600, lower: 238000, upper: 252000 },
]

export function ProductionForecastChart() {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Production Forecast</CardTitle>
      <CardDescription>Projected egg production for the next 6 months</CardDescription>
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
        <Area
          type="monotone"
          dataKey="upper"
          stroke="transparent"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          name="Upper Bound"
        />
        <Area
          type="monotone"
          dataKey="lower"
          stroke="transparent"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          name="Lower Bound"
        />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          name="Forecast"
        />
      </AreaChart>
    </ResponsiveContainer>
    </CardContent>
    </Card>
  )
}
