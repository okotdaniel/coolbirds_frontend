'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow, } from '@/components/ui/table';

import { getAllOrders } from "@/lib/redux/slices/supplier/OrderSlice";
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"

export default function OrderList(){
    
    const dispatch = useAppDispatch();
    const { orders, loading, error } = useAppSelector((state: any) => state.orders);
    console.log(orders)
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest purchase orders</CardDescription>
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
        </>
    )
}
