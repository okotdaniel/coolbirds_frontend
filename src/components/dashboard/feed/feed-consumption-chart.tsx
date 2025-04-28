"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", house1: 450, house2: 520, house3: 380 },
  { day: "Tue", house1: 460, house2: 510, house3: 390 },
  { day: "Wed", house1: 470, house2: 530, house3: 400 },
  { day: "Thu", house1: 480, house2: 520, house3: 410 },
  { day: "Fri", house1: 490, house2: 540, house3: 420 },
  { day: "Sat", house1: 470, house2: 530, house3: 400 },
  { day: "Sun", house1: 450, house2: 510, house3: 380 },
]

export function FeedConsumptionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}kg`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
          formatter={(value) => [`${value}kg`, ""]}
        />
        <Line
          type="monotone"
          dataKey="house1"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          name="House 1"
        />
        <Line
          type="monotone"
          dataKey="house2"
          stroke="hsl(var(--secondary))"
          strokeWidth={2}
          dot={false}
          name="House 2"
        />
        <Line type="monotone" dataKey="house3" stroke="#f97316" strokeWidth={2} dot={false} name="House 3" />
      </LineChart>
    </ResponsiveContainer>
  )
}

