"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", house1: 2850, house2: 3250, house3: 2650 },
  { day: "Tue", house1: 2950, house2: 3300, house3: 2700 },
  { day: "Wed", house1: 3100, house2: 3400, house3: 2800 },
  { day: "Thu", house1: 3200, house2: 3350, house3: 2750 },
  { day: "Fri", house1: 3150, house2: 3450, house3: 2900 },
  { day: "Sat", house1: 3050, house2: 3400, house3: 2850 },
  { day: "Sun", house1: 2900, house2: 3300, house3: 2750 },
]

export function ProductionChart() {
  return (

    <Card>
      <CardHeader>
        <CardTitle>Egg Production</CardTitle>
        <CardDescription>Daily egg production across all houses</CardDescription>
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
            <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
            />
            <Bar dataKey="house1" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="House 1" />
            <Bar dataKey="house2" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="House 2" />
            <Bar dataKey="house3" fill="#84cc16" radius={[4, 4, 0, 0]} name="House 3" />
          </BarChart>
        </ResponsiveContainer>

      </CardContent>
  </Card>
  )
}
