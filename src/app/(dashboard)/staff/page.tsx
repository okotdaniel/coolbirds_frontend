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
import { StaffAttendanceChart } from "@/components/dashboard/staff/attendance/attendance-chart"
import { StaffPerformanceChart } from "@/components/dashboard/staff/staff/staff-performance-chart"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/hooks"

import { fetchStaffRecords } from "@/lib/api/staff/staffApiSlice"
import StaffSchedule from "@/components/dashboard/staff/schedule/schedule-list"
import StaffList from "@/components/dashboard/staff/staff/staff-list"
import Attendance from "@/components/dashboard/staff/attendance/attendance-list"
import AttendanceStatistics from "@/components/dashboard/staff/attendance/attendance-statistics"
import Performance from "@/components/dashboard/staff/performance/performance-list"

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
                <StaffList />
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <StaffSchedule />
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
             
                <StaffPerformanceChart />
                  
                <Performance />
                
              </TabsContent>

              <TabsContent value="attendance" className="space-y-4">
                
                <AttendanceStatistics />
                
                <StaffAttendanceChart />
                  
                <Attendance />
              
              </TabsContent>
            </Tabs>
          </div>
          
        </div>
      </SidebarInset>
    </SidebarProvider>

)
}

