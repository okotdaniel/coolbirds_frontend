
"use client"

import { Bird, Search, Plus, FileDown, Filter, MoreHorizontal, Calendar, Egg, Thermometer, Droplets, AlertTriangle,} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { FlockForm } from "@/components/dashboard/flock/flock-form"
import { DeleteConfirmation } from "@/components/common/delete-confirmation"

import { FlockGrowthChart } from "@/components/dashboard/flock/flock-growth-chart"
import { FlockMortalityChart } from "@/components/dashboard/flock/flock-mortality-chart"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { type Flock, deleteFlock } from "@/lib/redux/slices/flock/flockSlice"


import { useState, useEffect } from "react"
import { type HealthCheckProp, fetchHealthChecks } from "@/lib/api/health/healthApiSlice"
import { fetchVaccineSchedule } from "@/lib/api/health/vaccineApiSlice"

export default function Page() {
  const dispatch = useAppDispatch()
  const { flocks } = useAppSelector((state) => state.flock)
  const [searchQuery, setSearchQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedFlock, setSelectedFlock] = useState<Flock | null>(null)


  const { item: health } = useAppSelector((state) => state.health)
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
                            > <Plus className="mr-2 h-4 w-4" /> Add Flock
                          </Button>
                      </div>
                    </div>

                    <Card>
                    <CardContent className="p-0">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type/Breed</TableHead>
                            <TableHead>House</TableHead>
                            <TableHead>Age (days)</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFlocks.map((flock) => (
                            <TableRow key={flock.id}>
                                <TableCell className="font-medium">{flock.id}</TableCell>
                                <TableCell>{flock.name}</TableCell>
                                <TableCell>
                                {flock.type} - {flock.breed}
                                </TableCell>
                                <TableCell>{flock.house}</TableCell>
                                <TableCell>{flock.age}</TableCell>
                                <TableCell>{flock.quantity.toLocaleString()}</TableCell>
                                <TableCell>{getStatusBadge(flock.status)}</TableCell>
                                <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEdit(flock)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(flock)}>Delete</DropdownMenuItem>
                                    <DropdownMenuItem>Health Records</DropdownMenuItem>
                                    <DropdownMenuItem>Production Data</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                    </Card>

        </>
    )

}
