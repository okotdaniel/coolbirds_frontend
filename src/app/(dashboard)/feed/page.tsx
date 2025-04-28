"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"

import { useState } from "react"
import { Bird, Search, Plus, FileDown, Filter, MoreHorizontal, Calendar, Egg, Thermometer, Droplets, AlertTriangle,} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { type Flock, deleteFlock } from "@/lib/redux/slices/flock/flockSlice"

import { FeedConsumptionChart } from "@/components/dashboard/feed/feed-consumption-chart"


export default function Page() {
  const dispatch = useAppDispatch()
  const { flocks } = useAppSelector((state) => state.flock)
  const [searchQuery, setSearchQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedFlock, setSelectedFlock] = useState<Flock | null>(null)

  const filteredFlocks = flocks.filter(
    (flock) =>
      flock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flock.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flock.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flock.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flock.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Productive":
        return <Badge className="bg-emerald-500">Productive</Badge>
      case "Growing":
        return <Badge className="bg-blue-500">Growing</Badge>
      case "Depleting":
        return <Badge className="bg-amber-500">Depleting</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleEdit = (flock: Flock) => {
    setSelectedFlock(flock)
    setFormOpen(true)
  }

  const handleDelete = (flock: Flock) => {
    setSelectedFlock(flock)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedFlock) {
      dispatch(deleteFlock(selectedFlock.id))
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
                  <BreadcrumbPage>Flock</BreadcrumbPage>
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
                <h2 className="text-3xl font-bold tracking-tight">Feed Management</h2>
                <Tabs defaultValue="inventory" className="space-y-4">
                    <TabsList>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="consumption">Consumption</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    </TabsList>
                    <TabsContent value="inventory" className="space-y-4">
                    <Card>
                        <CardHeader>
                        <CardTitle>Feed Inventory</CardTitle>
                        <CardDescription>Current feed levels across all silos</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <span>Silo 1 - Starter Feed</span>
                                <Badge variant="outline" className="ml-2">
                                Critical
                                </Badge>
                            </div>
                            <span className="text-muted-foreground">13%</span>
                            </div>
                            <Progress value={13} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                            <span>650 kg remaining</span>
                            <span>Refill needed within 2 days</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <span>Silo 2 - Grower Feed</span>
                                <Badge variant="outline" className="ml-2">
                                Normal
                                </Badge>
                            </div>
                            <span className="text-muted-foreground">78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                            <span>3,900 kg remaining</span>
                            <span>Sufficient for 14 days</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <span>Silo 3 - Layer Feed</span>
                                <Badge variant="outline" className="ml-2">
                                Normal
                                </Badge>
                            </div>
                            <span className="text-muted-foreground">92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                            <span>4,600 kg remaining</span>
                            <span>Sufficient for 18 days</span>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button>Order Feed</Button>
                        </div>
                        </CardContent>
                    </Card>
                    </TabsContent>
                    <TabsContent value="consumption" className="space-y-4">
                    <Card>
                        <CardHeader>
                        <CardTitle>Feed Consumption</CardTitle>
                        <CardDescription>Daily feed consumption across all houses</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                        <FeedConsumptionChart />
                        </CardContent>
                    </Card>
                    </TabsContent>
                    <TabsContent value="schedule" className="space-y-4">
                    <Card>
                        <CardHeader>
                        <CardTitle>Feeding Schedule</CardTitle>
                        <CardDescription>Automated feeding schedule for all houses</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className="space-y-4">
                            <div className="grid gap-2">
                            <h3 className="text-lg font-medium">House 1 - Broilers</h3>
                            <div className="grid grid-cols-4 gap-2 text-sm">
                                <div className="rounded-md bg-muted p-2">
                                <div className="font-medium">Morning</div>
                                <div className="text-muted-foreground">06:00 - 07:00</div>
                                <div className="mt-1">120g per bird</div>
                                </div>
                                <div className="rounded-md bg-muted p-2">
                                <div className="font-medium">Midday</div>
                                <div className="text-muted-foreground">12:00 - 13:00</div>
                                <div className="mt-1">100g per bird</div>
                                </div>
                                <div className="rounded-md bg-muted p-2">
                                <div className="font-medium">Afternoon</div>
                                <div className="text-muted-foreground">16:00 - 17:00</div>
                                <div className="mt-1">80g per bird</div>
                                </div>
                                <div className="rounded-md bg-muted p-2">
                                <div className="font-medium">Evening</div>
                                <div className="text-muted-foreground">20:00 - 21:00</div>
                                <div className="mt-1">100g per bird</div>
                                </div>
                            </div>
                            </div>
                            <div className="grid gap-2">
                            <h3 className="text-lg font-medium">House 2 - Layers</h3>
                            <div className="grid grid-cols-4 gap-2 text-sm">
                                <div className="rounded-md bg-muted p-2">
                                <div className="font-medium">Morning</div>
                                <div className="text-muted-foreground">05:30 - 06:30</div>
                                <div className="mt-1">110g per bird</div>
                                </div>
                                <div className="rounded-md bg-muted p-2">
                                <div className="font-medium">Midday</div>
                                <div className="text-muted-foreground">11:30 - 12:30</div>
                                <div className="mt-1">90g per bird</div>
                                </div>
                                <div className="rounded-md bg-muted p-2">
                                <div className="font-medium">Afternoon</div>
                                <div className="text-muted-foreground">15:30 - 16:30</div>
                                <div className="mt-1">70g per bird</div>
                                </div>
                                <div className="rounded-md bg-muted p-2">
                                <div className="font-medium">Evening</div>
                                <div className="text-muted-foreground">19:30 - 20:30</div>
                                <div className="mt-1">90g per bird</div>
                                </div>
                            </div>
                            </div>
                        </div>
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


