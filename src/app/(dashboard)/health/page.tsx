
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,} from "@/components/ui/breadcrumb"


import { MortalityChart } from "@/components/dashboard/health/mortality-chart"

import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { type HealthCheckProp, fetchHealthChecks } from "@/lib/api/health/healthApiSlice"
import { fetchVaccineSchedule } from "@/lib/api/health/vaccineApiSlice"

export default function Page() {
  const dispatch = useAppDispatch()

  const { item: health } = useAppSelector((state) => state.health)
  const { item: vaccine } = useAppSelector((state) => state.vaccine)

  useEffect( ()=>{
    dispatch(fetchHealthChecks())
    dispatch(fetchVaccineSchedule())
  }, [dispatch])


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
                    <Card>
                        <CardHeader>
                        <CardTitle>Health Status</CardTitle>
                        <CardDescription>Current health status across all flocks</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>House</TableHead>
                                    <TableHead>Flock</TableHead>
                                    <TableHead>Age</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Check</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                { health && health.map( (check, index) => ( 
                                <TableRow key={index}>
                                    <TableCell>{check.house}</TableCell>
                                    <TableCell>{check.flock}</TableCell>
                                    <TableCell>{check.age}</TableCell>
                                    <TableCell> <Badge className="bg-emerald-500">{check.status}</Badge> </TableCell>
                                    <TableCell>{check.date_checked}</TableCell>
                                    <TableCell> <Button variant="ghost" size="sm"> View Details </Button> </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="vaccination" className="space-y-4">
                    <Card>
                        <CardHeader>
                        <CardTitle>Vaccination Schedule</CardTitle>
                        <CardDescription>Upcoming and completed vaccinations</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead>Flock</TableHead>
                                <TableHead>Vaccine</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Administered By</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                           { vaccine && vaccine.map( (dose, index) => ( 
                            <TableRow key={index}>
                                <TableCell>{dose.flock}</TableCell>
                                <TableCell>{dose.vaccine_name}</TableCell>
                                <TableCell>{dose.date_administered}</TableCell>
                                <TableCell> <Badge variant="outline">{dose.status}</Badge> </TableCell>
                                <TableCell>{dose.administered_by}</TableCell>
                            </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="mortality" className="space-y-4">
                    <Card>
                        <CardHeader>
                        <CardTitle>Mortality Rates</CardTitle>
                        <CardDescription>Weekly mortality rates across all flocks</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                        <MortalityChart />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            </div>

        </div>


      </SidebarInset>
    </SidebarProvider>
  )
}


