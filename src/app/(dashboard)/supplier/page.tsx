

'use client'
import { useState, useEffect } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Truck, Search, Plus, FileDown, Filter, MoreHorizontal, Star, Phone, Mail, MapPin, Globe, AlertTriangle, CheckCircle2, } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SupplierPerformanceChart } from "@/components/dashboard/supplier/supplier-performance-chart"
import { SupplierOrdersChart } from "@/components/dashboard/supplier/supplier-orders-chart"

import { useSelector } from "react-redux"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"

import { getAllSuppliers, deleteSupplier, supplierByRanking } from "@/lib/redux/slices/supplier/supplierSlice"
import { supplierStatistics } from "@/lib/redux/slices/supplier/OrderSlice"

import { SupplierForm } from "@/components/dashboard/supplier/supplier-form"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"
import  ContractsList  from "@/components/dashboard/supplier/contract-list"
import  IssuesList  from "@/components/dashboard/supplier/issues-list"
import  OrderList  from "@/components/dashboard/supplier/order-list"

export default function Page() {
  const dispatch = useAppDispatch()
  const { suppliers } = useAppSelector((state) => state.suppliers)
  const { ranking  } = useAppSelector((state) => state.ranking)
  const { statistics  } = useAppSelector((state) => state.statistics)
  
  useEffect ( ()=> {
    // if (status === "idle") {
      dispatch(supplierByRanking())
    // }else{
      dispatch(getAllSuppliers())
    // }
      dispatch(supplierStatistics())
   
  }, [dispatch])

  const [searchQuery, setSearchQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState()

  // const filteredSuppliers = suppliers.filter(
  //   (supplier) =>{
  //     supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  //     supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     supplier.contact.toLowerCase().includes(searchQuery.toLowerCase())
  //     // supplier.id.toLowerCase().includes(searchQuery.toLowerCase()),
  //   }
  // )


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-500">Active</Badge>
      case "Inactive":
        return <Badge className="bg-amber-500">Inactive</Badge>
      case "Blacklisted":
        return <Badge className="bg-rose-500">Blacklisted</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "text-amber-500 fill-amber-500"
                : i < rating
                  ? "text-amber-500 fill-amber-500 opacity-50"
                  : "text-muted-foreground"
            }`}
          />
        ))}
        <span className="ml-2 text-sm">{rating}</span>
      </div>
    )
  }

  const handleEdit = (supplier: any) => {
    setSelectedSupplier(supplier)
    setFormOpen(true)
  }

  const handleDelete = (supplier: any) => {
    setSelectedSupplier(supplier)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedSupplier) {
      dispatch(deleteSupplier(selectedSupplier))
      setDeleteDialogOpen(false)
    }
  }

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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search suppliers..."
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
                    <Button size="sm" className="h-9"
                      onClick={() => {
                        setSelectedSupplier(null)
                        setFormOpen(true)
                      }}
                    > <Plus className="mr-2 h-4 w-4" /> Add Supplier  </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  { suppliers && suppliers.map((supplier) => (
                    <Card key={supplier.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{supplier.name}</CardTitle>
                            <CardDescription>{supplier.category}</CardDescription>
                          </div>
                          {getStatusBadge(supplier.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{supplier.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{supplier.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{supplier.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span>{supplier.website}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            {/* <span>Last Order: {supplier.lastOrder}</span> */}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        {renderStarRating(supplier.rating)}
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(supplier)}>
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(supplier)}>
                            Delete
                          </Button>
                        </div>
                      </CardFooter>
                      <SupplierForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedSupplier} />
                      <DeleteConfirmation open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} entityName="supplier" title="Delete Supplier" description={`Are you sure you want to delete ${selectedSupplier?.name}?`}/>
          
                    </Card>
                  ))}
                </div>
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Suppliers</CardTitle>
                      <CardDescription>Based on delivery time, quality, and price</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Rating</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          { ranking.map( (rank: any)=> ( 
                          <TableRow key={rank.id}>
                            <TableCell className="font-medium">{rank.name}</TableCell>
                            <TableCell>{rank.category}</TableCell>
                            <TableCell>{renderStarRating(rank.rating)}</TableCell>
                          </TableRow>
                         ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <IssuesList />
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

