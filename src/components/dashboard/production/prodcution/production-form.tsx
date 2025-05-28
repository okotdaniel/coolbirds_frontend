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
  house: z.string().min(2, { message: "House must be at least 2 characters" }),
  quantity: z.coerce.number().min(1, { message: "quantity is required" }),
  grade_a: z.coerce.number().min(1, { message: "Grade A is required" }),
  grade_b: z.coerce.number().min(1, { message: "Grade B is required" }),
  damaged: z.coerce.number().min(0, { message: "danameged must be a positive number" }),
})

type FormValues = z.infer<typeof formSchema>

interface HealthFormInterface {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Flock | null
}

export function ProductionForm({ open, onOpenChange, initialData }: HealthFormInterface) {
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      house: "",
      quantity: 0,
      grade_a: 0,
      grade_b: 0,
      damaged: 0
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        id: initialData.id,
        house: initialData.house,
        quantity: initialData.quantity,
        grade_a: initialData.grade_a,
        grade_b: initialData.grade_b,
        damaged: initialData.damaged,
       
      })
    } else {
      form.reset({
        id: `FL${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        house: "",
        quantity: 0,
        grade_a: 0,
        grade_b: 0,
        damaged: 0,

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
          <DialogTitle>{initialData ? "Edit Flock" : "Add Flock"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update the flock details below." : "Fill in the details of the new flock below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="house"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flock house</FormLabel>
                    <FormControl>
                      <Input placeholder="Flock house" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>
            <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="grade_a"
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
                name="grade_b"
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
              <FormField
                control={form.control}
                name="destroyed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destroyed</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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

