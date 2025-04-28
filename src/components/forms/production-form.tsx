"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAppDispatch } from "@/lib/redux/hooks/hooks"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { type ProductionRecord, addProductionRecord, updateProductionRecord } from "@/lib/redux/slices/productionSlice"

const formSchema = z
  .object({
    id: z.string().optional(),
    date: z.date(),
    house: z.string().min(1, { message: "House is required" }),
    quantity: z.coerce.number().min(0, { message: "Quantity must be a positive number" }),
    gradeA: z.coerce.number().min(0, { message: "Grade A must be a positive number" }),
    gradeB: z.coerce.number().min(0, { message: "Grade B must be a positive number" }),
    damaged: z.coerce.number().min(0, { message: "Damaged must be a positive number" }),
    rejected: z.coerce.number().min(0, { message: "Rejected must be a positive number" }),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      const total = data.gradeA + data.gradeB + data.damaged + data.rejected
      return total <= data.quantity
    },
    {
      message: "Sum of grades, damaged, and rejected cannot exceed total quantity",
      path: ["gradeA"],
    },
  )

type FormValues = z.infer<typeof formSchema>

interface ProductionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: ProductionRecord | null
}

export function ProductionForm({ open, onOpenChange, initialData }: ProductionFormProps) {
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      date: new Date(),
      house: "",
      quantity: 0,
      gradeA: 0,
      gradeB: 0,
      damaged: 0,
      rejected: 0,
      notes: "",
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        id: initialData.id,
        date: new Date(initialData.date),
        house: initialData.house,
        quantity: initialData.quantity,
        gradeA: initialData.gradeA,
        gradeB: initialData.gradeB,
        damaged: initialData.damaged,
        rejected: initialData.rejected,
        notes: initialData.notes,
      })
    } else {
      form.reset({
        id: `PROD${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`,
        date: new Date(),
        house: "",
        quantity: 0,
        gradeA: 0,
        gradeB: 0,
        damaged: 0,
        rejected: 0,
        notes: "",
      })
    }
  }, [initialData, form, open])

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      const productionRecord: ProductionRecord = {
        ...values,
        id: values.id || `PROD${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`,
        date: format(values.date, "MMM dd, yyyy"),
      }

      if (initialData) {
        dispatch(updateProductionRecordAsync(productionRecord))
      } else {
        dispatch(addProductionRecordAsync(productionRecord))
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
          <DialogTitle>{initialData ? "Edit Production Record" : "Add Production Record"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update the production record details below."
              : "Fill in the details of the new production record below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
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
                        <SelectItem value="House 2">House 2</SelectItem>
                        <SelectItem value="House 3">House 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Total number of eggs collected</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gradeA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade A</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gradeB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade B</FormLabel>
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
                name="damaged"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Damaged</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rejected"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rejected</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional notes about this production record"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : initialData ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

