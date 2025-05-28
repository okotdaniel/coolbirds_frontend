

'use client'
import { Truck, Search, Plus, FileDown, Filter, MoreHorizontal, Star, Phone, Mail, MapPin, Globe, AlertTriangle, CheckCircle2, } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { useState, useEffect } from "react"
import { SupplierForm } from "@/components/dashboard/supplier/supplier-form"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"
import { fetchSupplierRecords, deleteSupplier } from "@/lib/api/supplier/supplierApiSlice"

export default function SupplierList(){
    const dispatch = useAppDispatch()

    const { suppliers } = useAppSelector((state) => state.suppliers)

    const [searchQuery, setSearchQuery] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedSupplier, setSelectedSupplier] = useState()

    useEffect ( ()=> {
          dispatch(fetchSupplierRecords())
      }, [dispatch])

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


    // const filteredSuppliers = suppliers.filter(
    //   (supplier) =>{
    //     supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    //     supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     supplier.contact.toLowerCase().includes(searchQuery.toLowerCase())
    //     // supplier.id.toLowerCase().includes(searchQuery.toLowerCase()),
    //   }
    // )

        
    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search suppliers..." className="pl-8 w-full sm:w-[300px]"  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="h-9"> <Filter className="mr-2 h-4 w-4" />  Filter </Button>
                    <Button variant="outline" size="sm" className="h-9"> <FileDown className="mr-2 h-4 w-4" /> Export  </Button>
                    <Button size="sm" className="h-9"
                      onClick={() => {
                        setSelectedSupplier(null)
                        setFormOpen(true)
                      }}
                    > <Plus className="mr-2 h-4 w-4" /> Add Supplier  </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  { suppliers && suppliers.map((supplier, index) => (
                    <Card key={index}>
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
                    </Card>
                    
                  ))}
                  <SupplierForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedSupplier} />
                  <DeleteConfirmation open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} entityName="supplier" title="Delete Supplier" description={`Are you sure you want to delete ${selectedSupplier?.name}?`}/>
          
                </div>
        </>
    )
}