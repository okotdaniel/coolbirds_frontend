"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

const data = [
  { name: "FarmSupply Co.", quality: 95, delivery: 97, price: 88 },
  { name: "MedVet Supplies", quality: 92, delivery: 90, price: 85 },
  { name: "Cool Birds Eq.", quality: 94, delivery: 95, price: 82 },
  { name: "EggPro Solutions", quality: 90, delivery: 96, price: 90 },
  { name: "CleanFarm", quality: 88, delivery: 92, price: 94 },
  { name: "FarmTech", quality: 98, delivery: 96, price: 85 },
]

export function SupplierPerformanceChart() {
  return (

      <Card>
          <CardHeader>
            <CardTitle>Supplier Performance</CardTitle>
            <CardDescription>Performance metrics for all suppliers</CardDescription>
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
                <Legend />
                <Bar dataKey="quality" name="Quality" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delivery" name="On-Time Delivery" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="price" name="Price Competitiveness" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

        </CardContent>
      </Card>
                
  )
}

