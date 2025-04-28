"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, CheckCircle, Info, Lightbulb, Loader2, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { generateAIInsights, generateAIRecommendations, markInsightAsRead, markRecommendationAsImplemented,} from "@/lib/redux/slices/ai/aiSlice"

export function AIInsightsPanel() {
  const dispatch = useAppDispatch()
  const { insights, recommendations, isGeneratingInsight, isGeneratingRecommendation } = useAppSelector(
    (state) => state.ai,
  )
  const [activeTab, setActiveTab] = useState("insights")

  const handleGenerateInsights = () => {
    // In a real app, we would pass actual data from the Redux store
    dispatch(
      generateAIInsights({
        productionData: {},
        healthData: {},
        feedData: {},
        environmentData: {},
      }),
    )
  }

  const handleGenerateRecommendations = () => {
    dispatch(generateAIRecommendations())
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-rose-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-rose-500">Critical</Badge>
      case "warning":
        return <Badge className="bg-amber-500">Warning</Badge>
      case "info":
        return <Badge className="bg-blue-500">Info</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Customers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" /> */}
        </div>
        {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
       
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>AI Insights & Recommendations</CardTitle>
                <CardDescription>AI-generated insights and recommendations based on your farm data</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={activeTab === "insights" ? handleGenerateInsights : handleGenerateRecommendations}
                disabled={activeTab === "insights" ? isGeneratingInsight : isGeneratingRecommendation}
              >
                {(activeTab === "insights" && isGeneratingInsight) ||
                (activeTab === "recommendations" && isGeneratingRecommendation) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="insights" className="w-full" onValueChange={setActiveTab}>
              <div className="px-6">
                <TabsList className="w-full">
                  <TabsTrigger value="insights" className="flex-1">
                    Insights
                    {insights.filter((i) => !i.isRead).length > 0 && (
                      <Badge className="ml-2 bg-primary">{insights.filter((i) => !i.isRead).length}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="recommendations" className="flex-1">
                    Recommendations
                    {recommendations.filter((r) => !r.isImplemented).length > 0 && (
                      <Badge className="ml-2 bg-primary">{recommendations.filter((r) => !r.isImplemented).length}</Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="insights" className="mt-0">
                <ScrollArea className="h-[400px]">
                  {insights.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <Lightbulb className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No insights yet</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Generate AI insights based on your farm data to identify patterns and anomalies.
                      </p>
                      <Button className="mt-4" onClick={handleGenerateInsights} disabled={isGeneratingInsight}>
                        {isGeneratingInsight ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          "Generate Insights"
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {insights.map((insight) => (
                        <div key={insight.id} className={`p-4 ${insight.isRead ? "opacity-70" : ""}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">{getSeverityIcon(insight.severity)}</div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{insight.title}</h4>
                                  {getSeverityBadge(insight.severity)}
                                </div>
                                <p className="text-sm text-muted-foreground">{insight.description}</p>
                                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                  <span>{new Date(insight.timestamp).toLocaleString()}</span>
                                  <span className="mx-2">•</span>
                                  <span className="capitalize">{insight.type}</span>
                                </div>
                              </div>
                            </div>
                            {!insight.isRead && (
                              <Button variant="ghost" size="sm" onClick={() => dispatch(markInsightAsRead(insight.id))}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-0">
                <ScrollArea className="h-[400px]">
                  {recommendations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <Lightbulb className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No recommendations yet</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Generate AI recommendations to optimize your farm operations and improve results.
                      </p>
                      <Button
                        className="mt-4"
                        onClick={handleGenerateRecommendations}
                        disabled={isGeneratingRecommendation}
                      >
                        {isGeneratingRecommendation ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          "Generate Recommendations"
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {recommendations.map((recommendation) => (
                        <div key={recommendation.id} className={`p-4 ${recommendation.isImplemented ? "opacity-70" : ""}`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{recommendation.title}</h4>
                                <Badge className="capitalize bg-blue-500">{recommendation.area}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{recommendation.description}</p>
                              <div className="bg-muted p-2 rounded-md text-sm mb-2">
                                <span className="font-medium">Potential Impact: </span>
                                {recommendation.potentialImpact}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Generated on {new Date(recommendation.timestamp).toLocaleString()}
                              </div>
                            </div>
                            {!recommendation.isImplemented && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => dispatch(markRecommendationAsImplemented(recommendation.id))}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark as implemented
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
      </div>
    </SidebarInset>
  </SidebarProvider>

  )
}







