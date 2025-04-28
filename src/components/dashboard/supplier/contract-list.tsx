'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow, } from '@/components/ui/table';
import { getAllContracts } from "@/lib/redux/slices/supplier/contractSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Truck, Search, Plus, Edit, Trash, ChevronDown,  FileDown, Filter, MoreHorizontal, Star, Phone, Mail, MapPin, Globe, AlertTriangle, CheckCircle2, } from "lucide-react"

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"

export default function ContractsList(){
    
    const dispatch = useAppDispatch();
    const { contracts, loading, error } = useAppSelector((state: any) => state.contracts);
    console.log(contracts)
    useEffect(() => {
        dispatch(getAllContracts());
    }, [dispatch]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (

      <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Supplier Contracts</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Contract
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>

               
                  { contracts.map( (contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.id}</TableCell>
                    <TableCell>{contract.supplier}</TableCell>
                    <TableCell>{contract.type}</TableCell>
                    <TableCell>{contract.start_date}</TableCell>
                    <TableCell>{contract.end_date}</TableCell>
                    <TableCell>{contract.value}</TableCell>
                    <TableCell> <Badge className="bg-emerald-500">{contract.status}</Badge> </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Contract</DropdownMenuItem>
                          <DropdownMenuItem>Renew Contract</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  
                ) )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>    
      </>
    )
}