"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { day: "Mar 12", house1: 3180, house2: 3520, house3: 2050 },
  { day: "Mar 13", house1: 3210, house2: 3540, house3: 2080 },
  { day: "Mar 14", house1: 3190, house2: 3560, house3: 2090 },
  { day: "Mar 15", house1: 3220, house2: 3550, house3: 2070 },
  { day: "Mar 16", house1: 3240, house2: 3570, house3: 2100 },
  { day: "Mar 17", house1: 3230, house2: 3560, house3: 2110 },
  { day: "Mar 18", house1: 3250, house2: 3580, house3: 2090 },
  { day: "Mar 19", house1: 3220, house2: 3570, house3: 2100 },
  { day: "Mar 20", house1: 3240, house2: 3560, house3: 2080 },
  { day: "Mar 21", house1: 3230, house2: 3570, house3: 2090 },
  { day: "Mar 22", house1: 3250, house2: 3580, house3: 2100 },
  { day: "Mar 23", house1: 3240, house2: 3570, house3: 2110 },
  { day: "Mar 24", house1: 3230, house2: 3580, house3: 2100 },
  { day: "Mar 25", house1: 3245, house2: 3580, house3: 2117 },
]

export function DailyProductionChart() {
  return (

      <Card>
        <CardHeader>
          <CardTitle>Daily Production</CardTitle>
          <CardDescription>Egg production per day for the last 14 days</CardDescription>
        </CardHeader>

        <CardContent className="h-80">      
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
              <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="house1" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} name="House 1" />
              <Line type="monotone" dataKey="house2" stroke="#10b981" name="House 2" />
              <Line type="monotone" dataKey="house3" stroke="#f59e0b" name="House 3" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
                
  )
}
