"use client"


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bird, Search, Plus, FileDown, Filter, MoreHorizontal, Calendar, Egg, Thermometer, Droplets, AlertTriangle,} from "lucide-react"

import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"

import { HealthCheckForm } from "./health-form"
import { type HealthCheckInterface, fetchHealthChecks, updateHealthCheck, deleteHealthCheck } from "@/lib/api/health/healthApiSlice"
import { useHealthQuery } from "@/lib/redux/slices/health/beta/healthslice"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"


export default function HealthChecks(){
    const dispatch = useAppDispatch()

    const { data: health,  error, isLoading, isSuccess,  }  = useHealthQuery();

    useEffect(() => {
        const fetchHealth = async () => {
          try {
            // Use unwrap to directly access the data
            const healthData = await health.unwrap();
            setHealthStatus(healthData);
          } catch (err) {
            console.error('Error fetching health status:', err);
          }
        };
    
        if (isSuccess) {
          fetchHealth();
        }
      }, [isSuccess, health]);
    
    const [searchQuery, setSearchQuery] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState<HealthCheckInterface | null>(null)

//   const filteredFlocks = health.filter(
//     (flock) =>
//       flock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       flock.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       flock.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       flock.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       flock.id.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Productive":
        return <Badge className="bg-emerald-500">Productive</Badge>
      case "Growing":
        return <Badge className="bg-blue-500">Growing</Badge>
      case "Depleting":
        return <Badge className="bg-amber-500">Depleting</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleEdit = (flock: HealthCheckInterface) => {
    setSelectedFlock(flock)
    setFormOpen(true)
  }

  const handleDelete = (flock: HealthCheckInterface) => {
    setSelectedFlock(flock)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedRecord) {
      dispatch(deleteHealthCheck(selectedRecord.id))
      setDeleteDialogOpen(false)
    }
  }

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search flocks..." className="pl-8 w-full sm:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="h-9"> <Filter className="mr-2 h-4 w-4" /> Filter </Button>
                    <Button variant="outline" size="sm" className="h-9"> <FileDown className="mr-2 h-4 w-4" /> Export </Button>
                    <Button
                    size="sm"
                    className="h-9"
                    onClick={() => {
                        setSelectedRecord(null)
                        setFormOpen(true)
                    }}
                    > <Plus className="mr-2 h-4 w-4" /> Add health check
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Health Status</CardTitle>
                    <CardDescription>Current health status across all flocks</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>House</TableHead>
                                <TableHead>Flock</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Check</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { health && health.map( (check, index) => ( 
                            <TableRow key={index}>
                                <TableCell>{check.house}</TableCell>
                                <TableCell>{check.flock}</TableCell>
                                <TableCell>{check.age}</TableCell>
                                <TableCell> <Badge className="bg-emerald-500">{check.status}</Badge> </TableCell>
                                <TableCell>{check.date_checked}</TableCell>
                                <TableCell> <Button variant="ghost" size="sm"> View Details </Button> </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <HealthCheckForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedRecord} />
            <DeleteConfirmation open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} entityName="Health checks" title="Delete health check record" description={`Are you sure you want to delete ${selectedRecord?.name}?`}/>
          
        </>
    )
}