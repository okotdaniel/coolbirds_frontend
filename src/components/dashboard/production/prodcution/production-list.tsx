'use client'

import { Button } from "@/components/ui/button"
import { FileDown, Filter, Plus, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/hooks"
import { useState, useEffect } from "react"
import { ProductionInterface, fetchProductionRecords, deleteProductionRecord } from "@/lib/api/production/producerApiSlice"
import { ProductionForm } from "@/components/dashboard/production/prodcution/production-form"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"

export default function ProductionList(){

    const dispatch = useAppDispatch()
    const { produce } = useAppSelector((state) => state.produce)
    const [selectedHouse, setSelectedHouse] = useState("all")
    const [selectedPeriod, setSelectedPeriod] = useState("week")
    const [formOpen, setFormOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState<ProductionInterface | null>(null)
  
    const handleEdit = (record: ProductionInterface) => {
      setSelectedRecord(record)
      setFormOpen(true)
    }
  
    const handleDelete = (record: ProductionInterface) => {
      setSelectedRecord(record)
      setDeleteDialogOpen(true)
    }
  
    const confirmDelete = () => {
      if (selectedRecord) {
        dispatch(deleteProductionRecord(selectedRecord.id))
        setDeleteDialogOpen(false)
      }
    }
  
  
    useEffect(()=>{
        dispatch(fetchProductionRecords())
    }, [dispatch])


    return (
        <>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto"> </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="h-9"> <Filter className="mr-2 h-4 w-4" /> Filter </Button>
                <Button variant="outline" size="sm" className="h-9"> <FileDown className="mr-2 h-4 w-4" /> Export
                </Button>
                <Button
                    onClick={() => {
                        setSelectedRecord(null)
                        setFormOpen(true)
                    }} 
                    size="sm"
                    className="h-9"> <Plus className="mr-2 h-4 w-4" /> Add Record
                </Button>
            </div>
        </div>

        <Card>
            <CardHeader> 
                <CardTitle> Production Records  </CardTitle>
                <CardDescription> Daily production records for all houses </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produce ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>House</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Grade A</TableHead>
                            <TableHead>Grade B</TableHead>
                            <TableHead>Damaged</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        {produce && produce.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.house}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.gradeA}</TableCell>
                                <TableCell>{item.gradeB}</TableCell>
                                <TableCell>{item.damaged}</TableCell>
                                <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {}}>Delete</DropdownMenuItem>
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>

                                {/* 
                                <TableCell>
                                    <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                        onClick={() => {
                                            toast({
                                            title: "Order details",
                                            description: `Viewing details for order ${order.id}`,
                                            })
                                        }}
                                        >
                                        View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                        onClick={() => {
                                            toast({
                                            title: "Order status updated",
                                            description: `Order ${order.id} marked as delivered`,
                                            })
                                        }}
                                        >
                                        Mark as Delivered
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                        onClick={() => {
                                            toast({
                                            title: "Order cancelled",
                                            description: `Order ${order.id} has been cancelled`,
                                            variant: "destructive",
                                            })
                                        }}
                                        >
                                        Cancel Order
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell> */}
                            
                            </TableRow>
                        ))}
                    </TableBody>
                    
                </Table>
            </CardContent>
        </Card>
        <ProductionForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedRecord} />
        <DeleteConfirmation
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={confirmDelete}
            entityName="production record"
            title="Delete Production Record"
            description={`Are you sure you want to delete this production record from ${selectedRecord?.date}?`}
        />
        </>
    )
}