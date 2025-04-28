"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"

import { Bird, Search, Plus, FileDown, Filter, MoreHorizontal, Calendar, Egg, Thermometer, Droplets, AlertTriangle,} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { FlockForm } from "@/components/dashboard/flock/flock-form"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"

import { FlockGrowthChart } from "@/components/dashboard/flock/flock-growth-chart"
import { FlockMortalityChart } from "@/components/dashboard/flock/flock-mortality-chart"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { type Flock, deleteFlock } from "@/lib/redux/slices/flock/flockSlice"


import { useState, useEffect } from "react"
import { type HealthCheckProp, fetchHealthChecks } from "@/lib/api/health/healthApiSlice"
import { fetchVaccineSchedule } from "@/lib/api/health/vaccineApiSlice"

export default function Page() {
  const dispatch = useAppDispatch()
  const { flocks } = useAppSelector((state) => state.flock)
  const [searchQuery, setSearchQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedFlock, setSelectedFlock] = useState<Flock | null>(null)


  const { item: health } = useAppSelector((state) => state.health)
  const { item: vaccine } = useAppSelector((state) => state.vaccine)

  useEffect( ()=>{
    dispatch(fetchHealthChecks())
    dispatch(fetchVaccineSchedule())
  }, [dispatch])


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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Birds</CardTitle>
                  <Bird className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {flocks.reduce((sum, flock) => sum + flock.quantity, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Across {flocks.length} active flocks</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Production Rate</CardTitle>
                  <Egg className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(
                      flocks
                        .filter((f) => f.status === "Productive")
                        .reduce((sum, flock) => sum + flock.productionRate, 0) /
                      Math.max(1, flocks.filter((f) => f.status === "Productive").length)
                    ).toFixed(1)}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">For productive flocks</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Mortality</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(flocks.reduce((sum, flock) => sum + flock.mortality, 0) / flocks.length).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Below industry average (1.5%)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Rotation</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Apr 15</div>
                  <p className="text-xs text-muted-foreground">Batch C-2025 processing</p>
                </CardContent>
              </Card>
            </div>
                
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
        
          <div className="grid gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Flock Management</h2>
            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active Flocks</TabsTrigger>
                <TabsTrigger value="details">Flock Details</TabsTrigger>
                <TabsTrigger value="health">Health Tracking</TabsTrigger>
                <TabsTrigger value="lifecycle">Lifecycle Planning</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search flocks..."
                      className="pl-8 w-full sm:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="h-9">
                      <FileDown className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button
                      size="sm"
                      className="h-9"
                      onClick={() => {
                        setSelectedFlock(null)
                        setFormOpen(true)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Flock
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Type/Breed</TableHead>
                          <TableHead>House</TableHead>
                          <TableHead>Age (days)</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFlocks.map((flock) => (
                          <TableRow key={flock.id}>
                            <TableCell className="font-medium">{flock.id}</TableCell>
                            <TableCell>{flock.name}</TableCell>
                            <TableCell>
                              {flock.type} - {flock.breed}
                            </TableCell>
                            <TableCell>{flock.house}</TableCell>
                            <TableCell>{flock.age}</TableCell>
                            <TableCell>{flock.quantity.toLocaleString()}</TableCell>
                            <TableCell>{getStatusBadge(flock.status)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(flock)}>Edit</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(flock)}>Delete</DropdownMenuItem>
                                  <DropdownMenuItem>Health Records</DropdownMenuItem>
                                  <DropdownMenuItem>Production Data</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

               
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Flock Details - Batch B-2025</CardTitle>
                    <CardDescription>Detailed information about the selected flock</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Basic Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Flock ID:</span>
                            <span className="font-medium">FL002</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span className="font-medium">Layer</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Breed:</span>
                            <span className="font-medium">Lohmann Brown</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">House:</span>
                            <span className="font-medium">House 2</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Start Date:</span>
                            <span className="font-medium">Oct 15, 2024</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Current Age:</span>
                            <span className="font-medium">160 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Initial Quantity:</span>
                            <span className="font-medium">4,580 birds</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Current Quantity:</span>
                            <span className="font-medium">4,500 birds</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Production Rate:</span>
                            <span className="font-medium">94%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Daily Egg Production:</span>
                            <span className="font-medium">4,230 eggs</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Feed Consumption:</span>
                            <span className="font-medium">518 kg/day</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Feed Conversion:</span>
                            <span className="font-medium">1.85 kg/dozen</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Mortality Rate:</span>
                            <span className="font-medium">1.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Average Weight:</span>
                            <span className="font-medium">1.9 kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Uniformity:</span>
                            <span className="font-medium">92%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Lifecycle Progress</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Current Phase: Productive (Peak)</span>
                          <span className="text-muted-foreground">160 days of 500 days lifecycle</span>
                        </div>
                        <Progress value={32} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Start: Oct 15, 2024</span>
                          <span>Expected End: Feb 26, 2026</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Environmental Conditions</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Temperature:</span>
                            <span className="font-medium">23.2°C (Target: 23.0°C)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Humidity:</span>
                            <span className="font-medium">62% (Target: 60-65%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Air Quality:</span>
                            <span className="font-medium">Good (92/100)</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Feeding Program</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Feed Type:</span>
                            <span className="font-medium">Layer - High Production</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Daily Ration:</span>
                            <span className="font-medium">115g per bird</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Feeding Schedule:</span>
                            <span className="font-medium">4x daily</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Edit Details</Button>
                    <Button>View Full History</Button>
                  </CardFooter>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Growth Curve</CardTitle>
                      <CardDescription>Weight progression compared to breed standard</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <FlockGrowthChart />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Mortality Trend</CardTitle>
                      <CardDescription>Weekly mortality rate since placement</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <FlockMortalityChart />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="health" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Records</CardTitle>
                    <CardDescription>Vaccination and treatment history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Flock</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Treatment</TableHead>
                          <TableHead>Administered By</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        { vaccine && vaccine.map( (item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.date_administered}</TableCell>
                          <TableCell>{item.flock}</TableCell>
                          <TableCell>{item.medicine_type}</TableCell>
                          <TableCell>{item.treatment}</TableCell>
                          <TableCell>{item.administered_by}</TableCell>
                          <TableCell>{item.notes}</TableCell>
                        </TableRow>
                      ))}

                       
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Health Inspections</CardTitle>
                    <CardDescription>Recent health inspections and findings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Flock</TableHead>
                          <TableHead>Inspector</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Findings</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        { health && health.map( (item, index) => ( 
                        <TableRow key={index}>
                          <TableCell>{item.date_inspected}</TableCell>
                          <TableCell>{item.flock}</TableCell>
                          <TableCell>{item.inspected_by}</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">{item.status}</Badge>
                          </TableCell>
                          <TableCell>{item.findings}</TableCell>
                          <TableCell>{item.actions}</TableCell>
                        </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lifecycle" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Flock Lifecycle Planning</CardTitle>
                    <CardDescription>Upcoming flock rotations and placements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>Flock</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>House</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Processing</TableCell>
                          <TableCell>Batch C-2025</TableCell>
                          <TableCell>Apr 15, 2025</TableCell>
                          <TableCell>House 3</TableCell>
                          <TableCell>Broiler</TableCell>
                          <TableCell>3,800</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-500">Scheduled</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>New Placement</TableCell>
                          <TableCell>Batch F-2025</TableCell>
                          <TableCell>Apr 25, 2025</TableCell>
                          <TableCell>House 3</TableCell>
                          <TableCell>Broiler</TableCell>
                          <TableCell>4,000</TableCell>
                          <TableCell>
                            <Badge className="bg-purple-500">Ordered</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Processing</TableCell>
                          <TableCell>Batch E-2025</TableCell>
                          <TableCell>May 10, 2025</TableCell>
                          <TableCell>House 3 (Section B)</TableCell>
                          <TableCell>Broiler</TableCell>
                          <TableCell>3,200</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-500">Scheduled</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>New Placement</TableCell>
                          <TableCell>Batch G-2025</TableCell>
                          <TableCell>May 20, 2025</TableCell>
                          <TableCell>House 3 (Section B)</TableCell>
                          <TableCell>Broiler</TableCell>
                          <TableCell>3,500</TableCell>
                          <TableCell>
                            <Badge className="bg-purple-500">Ordered</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Depletion</TableCell>
                          <TableCell>Batch A-2025</TableCell>
                          <TableCell>Aug 15, 2025</TableCell>
                          <TableCell>House 1</TableCell>
                          <TableCell>Layer</TableCell>
                          <TableCell>4,200</TableCell>
                          <TableCell>
                            <Badge variant="outline">Planned</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>House Occupancy Plan</CardTitle>
                      <CardDescription>6-month projection of house utilization</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">House 1</h3>
                          <div className="h-8 w-full rounded-md bg-muted overflow-hidden flex">
                            <div className="h-full bg-emerald-500 text-xs flex items-center justify-center text-white w-[40%]">
                              Batch A-2025 (until Aug 15)
                            </div>
                            <div className="h-full bg-amber-500 text-xs flex items-center justify-center text-white w-[10%]">
                              Cleaning
                            </div>
                            <div className="h-full bg-blue-500 text-xs flex items-center justify-center text-white w-[30%]">
                              Batch H-2025 (from Sep 1)
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">House 1 (Section B)</h3>
                          <div className="h-8 w-full rounded-md bg-muted overflow-hidden flex">
                            <div className="h-full bg-emerald-500 text-xs flex items-center justify-center text-white w-[80%]">
                              Batch D-2025 (until Oct 15)
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">House 2</h3>
                          <div className="h-8 w-full rounded-md bg-muted overflow-hidden flex">
                            <div className="h-full bg-emerald-500 text-xs flex items-center justify-center text-white w-[100%]">
                              Batch B-2025 (until Feb 2026)
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">House 3</h3>
                          <div className="h-8 w-full rounded-md bg-muted overflow-hidden flex">
                            <div className="h-full bg-blue-500 text-xs flex items-center justify-center text-white w-[15%]">
                              Batch C-2025 (until Apr 15)
                            </div>
                            <div className="h-full bg-amber-500 text-xs flex items-center justify-center text-white w-[5%]">
                              Cleaning
                            </div>
                            <div className="h-full bg-purple-500 text-xs flex items-center justify-center text-white w-[15%]">
                              Batch F-2025 (Apr 25 - Jun 20)
                            </div>
                            <div className="h-full bg-amber-500 text-xs flex items-center justify-center text-white w-[5%]">
                              Cleaning
                            </div>
                            <div className="h-full bg-purple-500 text-xs flex items-center justify-center text-white w-[15%]">
                              Batch I-2025 (Jul 1 - Aug 25)
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">House 3 (Section B)</h3>
                          <div className="h-8 w-full rounded-md bg-muted overflow-hidden flex">
                            <div className="h-full bg-blue-500 text-xs flex items-center justify-center text-white w-[20%]">
                              Batch E-2025 (until May 10)
                            </div>
                            <div className="h-full bg-amber-500 text-xs flex items-center justify-center text-white w-[5%]">
                              Cleaning
                            </div>
                            <div className="h-full bg-purple-500 text-xs flex items-center justify-center text-white w-[20%]">
                              Batch G-2025 (May 20 - Jul 15)
                            </div>
                            <div className="h-full bg-amber-500 text-xs flex items-center justify-center text-white w-[5%]">
                              Cleaning
                            </div>
                            <div className="h-full bg-purple-500 text-xs flex items-center justify-center text-white w-[20%]">
                              Batch J-2025 (Jul 25 - Sep 20)
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Production Forecast</CardTitle>
                      <CardDescription>6-month egg production forecast based on flock plan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>April 2025</span>
                            <span>265,800 eggs</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[95%] rounded-full bg-emerald-500"></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Active Flocks: 4</span>
                            <span>Productive Flocks: 3</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>May 2025</span>
                            <span>272,500 eggs</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[98%] rounded-full bg-emerald-500"></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Active Flocks: 5</span>
                            <span>Productive Flocks: 3</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>June 2025</span>
                            <span>272,200 eggs</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[98%] rounded-full bg-emerald-500"></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Active Flocks: 5</span>
                            <span>Productive Flocks: 3</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>July 2025</span>
                            <span>270,800 eggs</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[97%] rounded-full bg-emerald-500"></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Active Flocks: 6</span>
                            <span>Productive Flocks: 3</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>August 2025</span>
                            <span>258,400 eggs</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[93%] rounded-full bg-emerald-500"></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Active Flocks: 5</span>
                            <span>Productive Flocks: 3</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>September 2025</span>
                            <span>245,600 eggs</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[88%] rounded-full bg-emerald-500"></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Active Flocks: 5</span>
                            <span>Productive Flocks: 2</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <FlockForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedFlock} />

            <DeleteConfirmation
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
              onConfirm={confirmDelete}
              entityName="flock"
              title="Delete Flock"
              description={`Are you sure you want to delete ${selectedFlock?.name}?`}
            />
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


