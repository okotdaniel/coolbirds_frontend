"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { deleteSchedule, getAllSchedules } from "@/lib/api/staff/scheduleApiSlice"
import { Truck, Search, Plus, FileDown, Filter, MoreHorizontal, Star, Phone, Mail, MapPin, Globe, AlertTriangle, CheckCircle2, } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableHead, TableHeader, TableCell, TableRow, TableBody } from "@/components/ui/table"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { useState, useEffect } from "react"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"
import { ScheduleForm } from "./schedule-form"

export default function SupplierList(){
    const dispatch = useAppDispatch()

    const { suppliers } = useAppSelector((state) => state.suppliers)

    const [searchQuery, setSearchQuery] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedSchedule, setSelectedSchedule] = useState()

    const { item: schedule } = useAppSelector( (state) => state.schedule)
    
    useEffect( ()=>{
        dispatch( getAllSchedules() )
      }, [dispatch])

 
    const handleEdit = (schedule: any) => {
        setSelectedSchedule(schedule)
        setFormOpen(true)
    }

    const handleDelete = (schedule: any) => {
        setSelectedSchedule(schedule)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (selectedSchedule) {
        dispatch(deleteSchedule(selectedSchedule))
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
                    setSelectedSchedule(null)
                    setFormOpen(true)
                    }}
                > <Plus className="mr-2 h-4 w-4" /> Add Schedule  </Button>
            </div>
        </div>

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
                
        <ScheduleForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedSchedule} />
        <DeleteConfirmation open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} entityName="Schedule" title="Delete Schedule" description={`Are you sure you want to delete ${selectedSchedule?.name}?`}/>
          
        </>
    )
}




