"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { month: "Oct", orders: 12, value: 18500 },
  { month: "Nov", orders: 15, value: 22400 },
]

export function SupplierOrdersChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
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
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          yAxisId="left"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{ value: "Orders", angle: -90, position: "insideLeft", offset: -5 }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{ value: "Value ($)", angle: 90, position: "insideRight", offset: 5 }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
          formatter={(value, name) => [
            name === "value" ? `$${value}` : value,
            name === "value" ? "Order Value" : "Number of Orders",
          ]}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="orders"
          stroke="hsl(var(--primary))"
          activeDot={{ r: 8 }}
          name="Orders"
        />
        <Line yAxisId="right" type="monotone" dataKey="value" stroke="#10b981" name="value" />
      </LineChart>
    </ResponsiveContainer>
  )
}

