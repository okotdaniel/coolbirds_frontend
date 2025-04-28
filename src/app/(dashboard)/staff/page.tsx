"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Plus, FileDown, Filter, Calendar, Clock, Mail, Phone, MapPin, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StaffAttendanceChart } from "@/components/dashboard/staff/staff-attendance-chart"
import { StaffPerformanceChart } from "@/components/dashboard/staff/staff-performance-chart"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/hooks"
import { getAllStaff } from "@/lib/api/staff/staffApiSlice"
import { getAllSchedules } from "@/lib/api/staff/scheduleApiSlice"

export default function Page() {
  const dispatch = useAppDispatch()
  const { staff } = useAppSelector( (state) => state.staff)
  const { item: schedule } = useAppSelector( (state) => state.schedule)

  useEffect( ()=>{
    dispatch(getAllStaff())
    dispatch( getAllSchedules() )
  }, [dispatch])
  const [searchQuery, setSearchQuery] = useState("")


  const filteredStaff = staff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase()) 
      // staff.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-500">Active</Badge>
      case "On Leave":
        return <Badge className="bg-amber-500">On Leave</Badge>
      case "Terminated":
        return <Badge className="bg-rose-500">Terminated</Badge>
      default:
        return <Badge>{status}</Badge>
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
            
          </div>
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}

          <div className="grid gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
            <Tabs defaultValue="directory" className="space-y-4">
              <TabsList>
                <TabsTrigger value="directory">Directory</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
              </TabsList>

              <TabsContent value="directory" className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search staff..."
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
                    <Button size="sm" className="h-9">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Staff
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredStaff.map((staff) => (
                    <Card key={staff.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={staff.avatar} alt={staff.name} />
                            <AvatarFallback>
                              {staff.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{staff.name}</CardTitle>
                            <CardDescription>{staff.position}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{staff.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{staff.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{staff.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Joined {staff.joinDate}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        {getStatusBadge(staff.status)}
                        <Button variant="ghost" size="sm">
                          View Profile
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Staff Schedule - Week of March 25, 2025</CardTitle>
                    <CardDescription>Weekly schedule for all staff members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Staff</TableHead>
                          <TableHead>Monday</TableHead>
                          <TableHead>Tuesday</TableHead>
                          <TableHead>Wednesday</TableHead>
                          <TableHead>Thursday</TableHead>
                          <TableHead>Friday</TableHead>
                          <TableHead>Saturday</TableHead>
                          <TableHead>Sunday</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>

                        {schedule && schedule.map( (item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={item.staff.avatar} alt={item.staff.first_name} />
                                  <AvatarFallback>JS</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{item.staff.first_name} {item.staff.last_name}</div>
                              </div>
                          </TableCell>
                          <TableCell> {item.monday_start_time} - {item.monday_end_time} </TableCell>
                          <TableCell> {item.tuesday_start_time} - {item.tuesday_end_time} </TableCell>
                          <TableCell> {item.wednesday_start_time} - {item.wednesday_end_time}</TableCell>
                          <TableCell> {item.thursday_start_time} - {item.thursday_end_time}</TableCell>
                          <TableCell> {item.friday_start_time} - {item.friday_end_time}</TableCell>
                          <TableCell> {item.saturday_start_time} - {item.saturday_end_time}</TableCell>
                          <TableCell> {item.sunday_start_time} - {item.sunday_end_time}</TableCell>
                        </TableRow>
                        ))}

                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Staff Performance Metrics</CardTitle>
                      <CardDescription>Performance evaluation for Q1 2025</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <StaffPerformanceChart />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performers</CardTitle>
                      <CardDescription>Staff with highest performance ratings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Maria Garcia" />
                            <AvatarFallback>MG</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Maria Garcia</p>
                                <p className="text-sm text-muted-foreground">Veterinarian</p>
                              </div>
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-amber-500 mr-1" />
                                <span className="font-medium">98%</span>
                              </div>
                            </div>
                            <div className="mt-2 h-2 w-full rounded-full bg-muted">
                              <div className="h-2 w-[98%] rounded-full bg-amber-500"></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Smith" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">John Smith</p>
                                <p className="text-sm text-muted-foreground">Farm Manager</p>
                              </div>
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-amber-500 mr-1" />
                                <span className="font-medium">95%</span>
                              </div>
                            </div>
                            <div className="mt-2 h-2 w-full rounded-full bg-muted">
                              <div className="h-2 w-[95%] rounded-full bg-amber-500"></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jennifer Lee" />
                            <AvatarFallback>JL</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Jennifer Lee</p>
                                <p className="text-sm text-muted-foreground">Quality Control</p>
                              </div>
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-amber-500 mr-1" />
                                <span className="font-medium">92%</span>
                              </div>
                            </div>
                            <div className="mt-2 h-2 w-full rounded-full bg-muted">
                              <div className="h-2 w-[92%] rounded-full bg-amber-500"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Reviews</CardTitle>
                    <CardDescription>Recent staff performance evaluations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Staff</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Review Date</TableHead>
                          <TableHead>Reviewer</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Smith" />
                                <AvatarFallback>JS</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">John Smith</div>
                            </div>
                          </TableCell>
                          <TableCell>Farm Manager</TableCell>
                          <TableCell>Mar 15, 2025</TableCell>
                          <TableCell>Regional Director</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">Excellent</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Maria Garcia" />
                                <AvatarFallback>MG</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Maria Garcia</div>
                            </div>
                          </TableCell>
                          <TableCell>Veterinarian</TableCell>
                          <TableCell>Mar 10, 2025</TableCell>
                          <TableCell>John Smith</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">Excellent</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Robert Johnson" />
                                <AvatarFallback>RJ</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Robert Johnson</div>
                            </div>
                          </TableCell>
                          <TableCell>Feed Specialist</TableCell>
                          <TableCell>Mar 05, 2025</TableCell>
                          <TableCell>John Smith</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">Good</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">98.2%</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-emerald-500">+1.2%</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1</div>
                      <p className="text-xs text-muted-foreground">Out of 10 staff members</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Sick Days</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-emerald-500">-2</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-rose-500">+8</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Attendance</CardTitle>
                    <CardDescription>Staff attendance trends for Q1 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <StaffAttendanceChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Absences</CardTitle>
                    <CardDescription>Staff absences in the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Staff</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Williams" />
                                <AvatarFallback>SW</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Sarah Williams</div>
                            </div>
                          </TableCell>
                          <TableCell>Vacation</TableCell>
                          <TableCell>Mar 20, 2025</TableCell>
                          <TableCell>Mar 31, 2025</TableCell>
                          <TableCell>12 days</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-500">Ongoing</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Michael Wilson" />
                                <AvatarFallback>MW</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Michael Wilson</div>
                            </div>
                          </TableCell>
                          <TableCell>Sick Leave</TableCell>
                          <TableCell>Mar 15, 2025</TableCell>
                          <TableCell>Mar 16, 2025</TableCell>
                          <TableCell>2 days</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">Completed</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Lisa Martinez" />
                                <AvatarFallback>LM</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Lisa Martinez</div>
                            </div>
                          </TableCell>
                          <TableCell>Personal Leave</TableCell>
                          <TableCell>Mar 10, 2025</TableCell>
                          <TableCell>Mar 10, 2025</TableCell>
                          <TableCell>1 day</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">Completed</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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

