"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIAssistantPanel } from "@/components/dashboard/insights/ai-assistant-panel"
import { AIInsightsPanel } from "@/components/dashboard/insights/ai-insights-panel"
import { AIPredictionPanel } from "@/components/dashboard/insights/ai-prediction-panel"
import { Sparkles } from "lucide-react"

export default function Page() {
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

          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight">AI Insights</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Tabs defaultValue="assistant" className="flex flex-col h-full">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
                  <TabsTrigger value="insights">Insights & Recommendations</TabsTrigger>
                </TabsList>
                <TabsContent value="assistant" className="flex-1 p-0">
                  <AIAssistantPanel />
                </TabsContent>
                <TabsContent value="insights" className="flex-1 p-0">
                  <AIInsightsPanel />
                </TabsContent>
              </Tabs>

              <AIPredictionPanel />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>How AI Enhances Your Poultry Farm</CardTitle>
                <CardDescription>
                  Leverage artificial intelligence to optimize operations and increase profitability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Predictive Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Forecast production levels, feed requirements, and resource needs with AI-powered predictions based on
                      historical data and current conditions.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Anomaly Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Identify unusual patterns in production, health metrics, or environmental conditions before they become
                      serious problems.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Optimization Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive AI-generated recommendations to optimize feed formulations, environmental settings, and
                      management practices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>

  )
}

