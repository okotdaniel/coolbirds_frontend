
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,} from "@/components/ui/breadcrumb"
import { MortalityChart } from "@/components/dashboard/health/mortality/mortality-chart"

import HealthChecks from "@/components/dashboard/health/health/health-check-list"
import VaccineChecks from "@/components/dashboard/health/vaccination/vaccine-check-list"

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
                  <BreadcrumbPage>Health</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
             
            </div>
                
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}

            <div className="grid gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Health Tracking</h2>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
                  <TabsTrigger value="mortality">Mortality</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <HealthChecks />
                </TabsContent>
                <TabsContent value="vaccination" className="space-y-4">
                    <VaccineChecks />
                </TabsContent>
                <TabsContent value="mortality" className="space-y-4">
                    <MortalityChart />
                </TabsContent>
            </Tabs>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


