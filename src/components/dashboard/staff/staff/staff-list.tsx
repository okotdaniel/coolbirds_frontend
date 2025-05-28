

'use client'
import { Truck, Search, Plus, FileDown, Filter, MoreHorizontal, Star, Phone, Mail, MapPin,  Calendar} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"

import { StaffForm } from "@/components/dashboard/staff/staff/staff-form"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"
import { fetchStaffRecords, deleteStaff } from "@/lib/api/staff/staffApiSlice"

export default function StaffList(){
    const dispatch = useAppDispatch()

    const { staff } = useAppSelector((state) => state.staff)

    const [searchQuery, setSearchQuery] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedStaff, setSelectedStaff] = useState()

    useEffect ( ()=> {
          dispatch(fetchStaffRecords())
      }, [dispatch])

    const handleEdit = (staff: any) => {
        setSelectedStaff(staff)
        setFormOpen(true)
    }

    const handleDelete = (staff: any) => {
        setSelectedStaff(staff)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (selectedStaff) {
        dispatch(deleteStaff(selectedStaff.id))
        setDeleteDialogOpen(false)
        }
    }
    

    // const filteredStaff = staff.filter(
    //   (item) =>{
    //     item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    //     item.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.status.toLowerCase().includes(searchQuery.toLowerCase())
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
                        setSelectedStaff(null)
                        setFormOpen(true)
                      }} > <Plus className="mr-2 h-4 w-4" /> Add staff  </Button>
                  </div>
                </div>


                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {staff.map((staff) => (
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
                        
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(staff)}>
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(staff)}>
                            Delete
                          </Button>
                        </div>
                      </CardFooter>

                      
                    </Card>

                  ))}
                  <StaffForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedStaff} />
                  <DeleteConfirmation open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} entityName="supplier" title="Delete Supplier" description={`Are you sure you want to delete ${selectedStaff?.name}?`}/>
          
                </div>

               
        </>
    )
}