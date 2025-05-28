'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow, } from '@/components/ui/table';
import { Truck, Search, Plus, Edit, Trash, ChevronDown,  FileDown, Filter, MoreHorizontal, Star, Phone, Mail, MapPin, Globe, AlertTriangle, CheckCircle2, } from "lucide-react"


import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"

import { IssueForm } from "@/components/dashboard/supplier/issues/issue-form"
import { fetchIssueRecords, deleteIssueRecord  } from "@/lib/redux/slices/supplier/issueSlice";
import { fetchContractRecords } from "@/lib/redux/slices/supplier/contractSlice";
import { DeleteConfirmation } from "@/components/common/delete-confirmation"

export default function SupplierList(){
    const [searchQuery, setSearchQuery] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedIssue, setSelectedIssue] = useState(null)
    const { issues, loading, error } = useAppSelector((state: any) => state.issues);
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchIssueRecords());
    }, [dispatch]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


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
          <Card>
            <CardHeader>
                <CardTitle>Issues Log</CardTitle>
                <CardDescription>Recent supplier issues and resolutions</CardDescription>
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
                            setSelectedIssue(null)
                            setFormOpen(true)
                            }}
                        > <Plus className="mr-2 h-4 w-4" /> Add Issue  </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between"> <h3 className="text-lg font-medium">Supplier Contracts</h3> </div>

            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { issues && issues.map( (issue: any) => (
                        <TableRow key={issue.id}>
                            <TableCell>{issue.date_created}</TableCell>
                            <TableCell className="font-medium">{issue.supplier}</TableCell>
                            <TableCell>{issue.content}</TableCell>
                            <TableCell><Badge className="bg-emerald-500">{issue.status}</Badge> </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
         
          </Card>    

          <IssueForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedIssue} />
          <DeleteConfirmation open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} entityName="Issue" title="Delete issue" description={`Are you sure you want to delete ${selectedIssue?.name}?`}/>
          
        </>
    )
}

