'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, FileDown, Plus} from "lucide-react";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow, } from '@/components/ui/table';

import { OrderForm } from "./order-form";
import { DeleteConfirmation } from "@/components/common/delete-confirmation";
import { fetchOrderRecords, deleteOrderRecord } from "@/lib/redux/slices/supplier/OrderSlice";
import { useEffect, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
    

export default function OrderList(){
    
    const dispatch = useAppDispatch();

    const { orders, loading, error } = useAppSelector((state: any) => state.orders);
    
    const [searchQuery, setSearchQuery] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedSupplier, setSelectedSupplier] = useState()
    const [selectedOrder, setSelectedOrder] = useState(null)

    useEffect(() => {
        dispatch(fetchOrderRecords());
    }, [dispatch]);
    
    const handleEdit = (order: any) => {
        setSelectedOrder(order)
        setFormOpen(true)
    }

    const handleDelete = (order: any) => {
        setSelectedOrder(order)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (selectedOrder) {
        dispatch(deleteOrderRecord(selectedOrder))
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

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest purchase orders</CardDescription>
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
                                setSelectedOrder(null)
                                setFormOpen(true)
                                }}> <Plus className="mr-2 h-4 w-4" /> Add Order  
                            </Button>
                        </div>
                    </div>

                   
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Expected Delivery</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                          { orders && orders.map( (order: any)=> ( 
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.supplier}</TableCell>
                                <TableCell>{order.items}</TableCell>
                                <TableCell>{order.order_date}</TableCell>
                                <TableCell>{order.delivery_date}</TableCell>
                                <TableCell> <Badge className="bg-blue-500">{order.status}</Badge> </TableCell>
                                <TableCell className="text-right"> <Button variant="ghost" size="sm"> View </Button> </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

          <OrderForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedOrder} />
          <DeleteConfirmation open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} entityName="Order" title="Delete order" description={`Are you sure you want to delete ${selectedOrder?.name}?`}/>
          
        </>
    )
}

