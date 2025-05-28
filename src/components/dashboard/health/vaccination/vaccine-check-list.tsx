"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, FileDown, Filter } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"

import { VaccineForm } from "@/components/dashboard/health/vaccination/vaccine-form"
import { type Flock, deleteFlock } from "@/lib/redux/slices/flock/flockSlice"
import { type HealthCheckInterface, fetchHealthChecks } from "@/lib/api/health/healthApiSlice"
import { fetchVaccineSchedule } from "@/lib/api/health/vaccineApiSlice"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"

import { useHealthQuery, useVaccineQuery } from "@/lib/redux/slices/health/beta/healthslice"

export default function VaccineChecks(){

const { data: vaccin, error, isLoading, isSuccess }  = useVaccineQuery()


// health().unwrap()
const dispatch = useAppDispatch()
  const { flocks } = useAppSelector((state) => state.flock)
  const [searchQuery, setSearchQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<Flock | null>(null)



  const { item: vaccine } = useAppSelector((state) => state.vaccine)

  useEffect( ()=>{
    dispatch(fetchHealthChecks())
    dispatch(fetchVaccineSchedule())
  }, [dispatch])


  const filteredFlocks = flocks.filter(
    (flock) =>
      flock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flock.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flock.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flock.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flock.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

  const handleEdit = (flock: Flock) => {
    setSelectedFlock(flock)
    setFormOpen(true)
  }

  const handleDelete = (flock: Flock) => {
    setSelectedFlock(flock)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedFlock) {
      dispatch(deleteFlock(selectedFlock.id))
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
                        setSelectedFlock(null)
                        setFormOpen(true)
                    }}
                    > <Plus className="mr-2 h-4 w-4" /> Add vaccine
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Vaccination Schedule</CardTitle>
                    <CardDescription>Upcoming and completed vaccinations</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Flock</TableHead>
                            <TableHead>Vaccine</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Administered By</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                            { vaccine && vaccine.map( (dose, index) => ( 
                                <TableRow key={index}>
                                    <TableCell>{dose.flock}</TableCell>
                                    <TableCell>{dose.vaccine_name}</TableCell>
                                    <TableCell>{dose.date_administered}</TableCell>
                                    <TableCell> <Badge variant="outline">{dose.status}</Badge> </TableCell>
                                    <TableCell>{dose.administered_by}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <VaccineForm open={formOpen} onOpenChange={setFormOpen} initialData={selectedRecord} />
            <DeleteConfirmation open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} entityName="supplier" title="Delete vaccine schedule" description={`Are you sure you want to delete ${selectedRecord?.name}?`}/>
          
        </>
    )
}