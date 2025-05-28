

'use client'
import { useState, useEffect } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Truck, Search, Plus, FileDown, Filter, MoreHorizontal, Star, Phone, Mail, MapPin, Globe, AlertTriangle, CheckCircle2, } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { SupplierPerformanceChart } from "@/components/dashboard/supplier/supplier-performance-chart"
import { SupplierOrdersChart } from "@/components/dashboard/supplier/supplier-orders-chart"

import { useSelector } from "react-redux"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"

import { supplierStatistics } from "@/lib/redux/slices/supplier/OrderSlice"
import  ContractsList  from "@/components/dashboard/supplier/contracts/contract-list"
import  IssuesList  from "@/components/dashboard/supplier/issues/issues-list"
import  OrderList  from "@/components/dashboard/supplier/orders/order-list"
import SupplierList from "@/components/dashboard/supplier/supplier-list"
import SupplierRanking from "@/components/dashboard/supplier/supplier-ranking"


export default function Page() {
  const dispatch = useAppDispatch()
  const { ranking  } = useAppSelector((state) => state.ranking)
  const { statistics  } = useAppSelector((state) => state.statistics)
  
  useEffect ( ()=> {

      dispatch(supplierStatistics())
   
  }, [dispatch])


  // <SupplierForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedSupplier} />
  // <DeleteConfirmation open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} entityName="supplier" title="Delete Supplier" description={`Are you sure you want to delete ${selectedSupplier?.name}?`}/>


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
                  <BreadcrumbPage>Supplier</BreadcrumbPage>
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
            <h2 className="text-3xl font-bold tracking-tight">Supplier Management</h2>
            <Tabs defaultValue="directory" className="space-y-4">
              
              <TabsList>
                <TabsTrigger value="directory">Directory</TabsTrigger>
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="directory" className="space-y-4">
                <SupplierList />
              </TabsContent>

              <TabsContent value="orders" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{statistics.map((i)=>i.total_orders)} </div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-emerald-500">+12%</span> from last year
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{statistics.map((i)=>i.pending_orders)}</div>
                      <p className="text-xs text-muted-foreground">Expected within 7 days</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{statistics.map((i)=>i.active_suppliers)} </div>
                      <p className="text-xs text-muted-foreground">Out of 8 total suppliers</p>
                    </CardContent>
                  </Card>
                  
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>Recent orders from all suppliers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SupplierOrdersChart />
                  </CardContent>
                </Card>

                <OrderList />
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                  <SupplierPerformanceChart />
                <div className="grid gap-4 md:grid-cols-2">
                  <IssuesList />
                  <SupplierRanking />
                </div>
              </TabsContent>

              <TabsContent value="contracts" className="space-y-4">
                <ContractsList />
              </TabsContent>
            </Tabs>

            {/* forms should have gone here  */}
          </div>
          
        </div>
      </SidebarInset>
    </SidebarProvider>


  )
}

