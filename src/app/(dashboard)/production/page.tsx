'use client'

import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar"
import { FileDown, Filter, Plus, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,} from "@/components/ui/breadcrumb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { DailyProductionChart } from "@/components/dashboard/production/daily-production-chart"
import { MonthlyProductionChart } from "@/components/dashboard/production/monthly-production-chart"
import { ProductionForecastChart } from "@/components/dashboard/production/production-forecast-chart"
import { ProductionQualityChart } from "@/components/dashboard/production/production-quality-chart"
import { ProductionChart } from "@/components/dashboard/production/production-chart"
import { WeightDistributionChart } from "@/components/dashboard/production/weight-distribution-chart"
import EggProduction  from "@/components/dashboard/production/egg-production-details"

import { ProductionForm } from "@/components/forms/production-form"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"


import { type ProductionProp, deleteProductionRecord } from "@/lib/api/production/producerApiSlice"
import ProductionList from '@/components/dashboard/production/production-list'
import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"




export default function Page() {
  const dispatch = useAppDispatch()
  const { produce } = useAppSelector((state) => state.produce)
  const [selectedHouse, setSelectedHouse] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<ProductionProp | null>(null)

  const handleEdit = (record: ProductionProp) => {
    setSelectedRecord(record)
    setFormOpen(true)
  }

  const handleDelete = (record: ProductionProp) => {
    setSelectedRecord(record)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedRecord) {
      dispatch(deleteProductionRecord(selectedRecord.id))
      setDeleteDialogOpen(false)
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
                  <BreadcrumbPage>Production</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {/* <div className="bg-muted/50 aspect-video rounded-xl" /> */}
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Today's Production</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">8,942</div>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-emerald-500">+18.2%</span> from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Weekly Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">8,245</div>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-emerald-500">+5.7%</span> from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Production Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">92.8%</div>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-emerald-500">+2.3%</span> from target
                  </p>
                </CardContent>
              </Card>
            </>
          </div>
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          

          <div className="grid gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Production </h2>

            <Tabs defaultValue="records" className="space-y-4">
              <TabsList>
                <TabsTrigger value="records">Production Records</TabsTrigger>
                <TabsTrigger value="daily">Daily Production</TabsTrigger>
                <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
                <TabsTrigger value="forecast">Forecast</TabsTrigger>
                <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
                <TabsTrigger value="eggs">Egg Production</TabsTrigger>
                <TabsTrigger value="weight">Weight Distribution</TabsTrigger>
                <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
              </TabsList>

              <TabsContent value="records" className="space-y-4">
                <ProductionList />
              </TabsContent>

              <TabsContent value="daily" className="space-y-4">
                <DailyProductionChart />
              </TabsContent>

              <TabsContent value="monthly" className="space-y-4"> 
                <MonthlyProductionChart />
              </TabsContent>

              <TabsContent value="forecast" className="space-y-4">
                <ProductionForecastChart />
              </TabsContent>

              <TabsContent value="quality" className="space-y-4">
                <ProductionQualityChart />
              </TabsContent>

              <TabsContent value="eggs" className="space-y-4">
                <ProductionChart />
              </TabsContent>

              <TabsContent value="weight" className="space-y-4">
                <WeightDistributionChart />
              </TabsContent>

              <TabsContent value="quality" className="space-y-4">
                <EggProduction />
              </TabsContent>

            </Tabs>

            <ProductionForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedRecord} />

            <DeleteConfirmation
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
              onConfirm={confirmDelete}
              entityName="production record"
              title="Delete Production Record"
              description={`Are you sure you want to delete this production record from ${selectedRecord?.date}?`}
            />
          </div>

        

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}




