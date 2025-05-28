"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { useAppDispatch } from "@/lib/redux/hooks/hooks"
import { type Flock, addFlock, updateFlock } from "@/lib/redux/slices/flock/flockSlice"

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  type: z.string().min(1, { message: "Type is required" }),
  breed: z.string().min(1, { message: "Breed is required" }),
  house: z.string().min(1, { message: "House is required" }),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1" }),
  age: z.coerce.number().min(0, { message: "Age must be a positive number" }),
  status: z.string().min(1, { message: "Status is required" }),
  startDate: z.date(),
  productionRate: z.coerce.number().min(0).max(100, { message: "Production rate must be between 0 and 100" }),
  mortality: z.coerce.number().min(0).max(100, { message: "Mortality must be between 0 and 100" }),
  avgWeight: z.coerce.number().min(0, { message: "Average weight must be a positive number" }),
})

type FormValues = z.infer<typeof formSchema>

interface mInterface {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Flock | null
}

export function ScheduleForm({ open, onOpenChange, initialData }: mInterface) {
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      type: "",
      breed: "",
      house: "",
      quantity: 0,
      age: 0,
      status: "Growing",
      startDate: new Date(),
      productionRate: 0,
      mortality: 0,
      avgWeight: 0,
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        id: initialData.id,
        name: initialData.name,
        type: initialData.type,
        breed: initialData.breed,
        house: initialData.house,
        quantity: initialData.quantity,
        age: initialData.age,
        status: initialData.status,
        startDate: new Date(initialData.startDate),
        productionRate: initialData.productionRate,
        mortality: initialData.mortality,
        avgWeight: initialData.avgWeight,
      })
    } else {
      form.reset({
        id: `FL${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        name: "",
        type: "",
        breed: "",
        house: "",
        quantity: 0,
        age: 0,
        status: "Growing",
        startDate: new Date(),
        productionRate: 0,
        mortality: 0,
        avgWeight: 0,
      })
    }
  }, [initialData, form, open])

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      const flock: Flock = {
        ...values,
        id:
          values.id ||
          `FL${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
        startDate: format(values.startDate, "MMM dd, yyyy"),
      }

      if (initialData) {
        dispatch(updateFlock(flock))
      } else {
        dispatch(addFlock(flock))
      }

      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Schedule" : "Add Schedule"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update the schedule details below." : "Fill in the details of the new schedule below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flock Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Flock name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Layer">Layer</SelectItem>
                        <SelectItem value="Broiler">Broiler</SelectItem>
                        <SelectItem value="Breeder">Breeder</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Breed</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select breed" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Hy-Line Brown">Hy-Line Brown</SelectItem>
                        <SelectItem value="Hy-Line White">Hy-Line White</SelectItem>
                        <SelectItem value="Lohmann Brown">Lohmann Brown</SelectItem>
                        <SelectItem value="Ross 308">Ross 308</SelectItem>
                        <SelectItem value="Cobb 500">Cobb 500</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="house"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select house" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="House 1">House 1</SelectItem>
                        <SelectItem value="House 1 (Section B)">House 1 (Section B)</SelectItem>
                        <SelectItem value="House 2">House 2</SelectItem>
                        <SelectItem value="House 3">House 3</SelectItem>
                        <SelectItem value="House 3 (Section B)">House 3 (Section B)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age (days)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Growing">Growing</SelectItem>
                        <SelectItem value="Productive">Productive</SelectItem>
                        <SelectItem value="Depleting">Depleting</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="productionRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Production Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mortality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mortality (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avgWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avg Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>  Cancel  </Button>
              <Button type="submit" disabled={isSubmitting}> {isSubmitting ? "Saving..." : initialData ? "Update" : "Add"} </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

