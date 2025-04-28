"use client"

import { useState } from "react"
import { Calendar, Loader2, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { generateProductionPrediction } from "@/lib/redux/slices/ai//aiSlice"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, type TooltipProps,} from "recharts"

export function AIPredictionPanel() {
  const dispatch = useAppDispatch()
  const { predictions, isGeneratingPrediction } = useAppSelector((state) => state.ai)
  const [predictionDays, setPredictionDays] = useState("7")

  const handleGeneratePrediction = () => {
    dispatch(generateProductionPrediction(Number.parseInt(predictionDays)))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{formatDate(data.date)}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">Production:</span> {data.predictedProduction.toLocaleString()}{" "}
            eggs
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-secondary">Feed:</span> {data.predictedFeed.toLocaleString()} kg
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Confidence:</span> {(data.confidence * 100).toFixed(1)}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Production Forecast</CardTitle>
            <CardDescription>AI-powered predictions for upcoming production and feed requirements</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={predictionDays} onValueChange={setPredictionDays}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Forecast period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGeneratePrediction} disabled={isGeneratingPrediction}>
              {isGeneratingPrediction ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {predictions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No predictions yet</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Generate AI predictions to forecast egg production and feed requirements for the upcoming period.
            </p>
            <Button className="mt-4" onClick={handleGeneratePrediction} disabled={isGeneratingPrediction}>
              {isGeneratingPrediction ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Predictions"
              )}
            </Button>
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictions} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tickFormatter={formatDate} stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="predictedProduction"
                  name="Egg Production"
                  stroke="hsl(var(--primary))"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="predictedFeed"
                  name="Feed Consumption (kg)"
                  stroke="hsl(var(--secondary))"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

