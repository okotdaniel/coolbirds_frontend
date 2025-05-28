'use client'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow, } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Truck, Search, Plus, Edit, Trash, ChevronDown,  FileDown, Filter, MoreHorizontal, Star, Phone, Mail, MapPin, Globe, AlertTriangle, CheckCircle2, } from "lucide-react"

import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { fetchContractRecords, deleteContractRecord } from "@/lib/api/supplier/contracts/contractApiSlice"
import { ContractForm } from "@/components/dashboard/supplier/contracts/contract-form"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"

export default function ContractList(){
    const { contracts, loading, error } = useAppSelector((state: any) => state.contracts);

    const [searchQuery, setSearchQuery] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedContract, setSelectedContract] = useState()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchContractRecords());
    }, [dispatch]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleEdit = (supplier: any) => {
        setSelectedContract(contracts)
        setFormOpen(true)
    }

    const handleDelete = (supplier: any) => {
        setSelectedContract(contracts)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (selectedContract) {
        dispatch(deleteContractRecord(selectedContract))
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
                  setSelectedContract(null)
                  setFormOpen(true)
                }} > <Plus className="mr-2 h-4 w-4"/> Add Contracts  
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between"> <h3 className="text-lg font-medium">Supplier Contracts</h3></div>

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
                  { contracts.map( (contract:any) => (
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>   
          <ContractForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedContract} />
          <DeleteConfirmation open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} entityName="contract" title="Delete contract" description={`Are you sure you want to delete ${selectedContract?.name}?`}/>
          
        </>
    )
}

