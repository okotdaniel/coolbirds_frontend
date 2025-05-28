"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

const data = [
  { month: "Jan", present: 95, absent: 5, leave: 0 },
  { month: "Feb", present: 93, absent: 4, leave: 3 },
  { month: "Mar", present: 98, absent: 1, leave: 1 },
]

export function StaffAttendanceChart() {
  return (

    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance</CardTitle>
        <CardDescription>Staff attendance trends for Q1 2025</CardDescription>
      </CardHeader>

      <CardContent className="h-80">
      
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
            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
            <Legend />
            <Bar dataKey="present" name="Present" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
            <Bar dataKey="absent" name="Absent" fill="#f43f5e" radius={[4, 4, 0, 0]} stackId="a" />
            <Bar dataKey="leave" name="On Leave" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
                
  )
}

