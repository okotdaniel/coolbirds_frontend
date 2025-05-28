
'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useEffect } from "react"
import { useAppDispatch } from "@/lib/redux/hooks/hooks"

import { type Contract, fetchContractRecords, updateContractRecord } from "@/lib/api/supplier/contracts/contractApiSlice"

interface ContractFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Contract | null
}

const formSchema = z.object({
  supplier: z.string().min(2, { message: "Name must be at least 2 characters" }),
  type: z.string().min(2, { message: "Name must be at least 2 characters" }),
  start_date: z.string().min(2, { message: "Name must be at least 2 characters" }),
  end_date: z.string().min(2, { message: "Name must be at least 2 characters" }),
  value: z.string().min(2, { message: "Name must be at least 2 characters" }),
  status: z.string().min(2, { message: "Name must be at least 2 characters" }),
})

type FormValues = z.infer<typeof formSchema>

export function ContractForm({ open, onOpenChange, initialData }: ContractFormProps) {
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: "",
      type: "",
      start_date: "",
      end_date: "",
      value: "",
      status: "Active",
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        supplier: initialData.supplier,
        type: initialData.type,
        start_date: initialData.start_date,
        end_date: initialData.end_date,
        value: initialData.value,
        status: initialData.status,

      })
    } else {
      form.reset({
        supplier: "",
        type: "",
        start_date: "",
        end_date: "",
        value: "",
        status: "Active",
      })
    }
  }, [initialData, form, open])

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      
      if (initialData) {
        dispatch(updateContractRecord(values))
      } else {
        dispatch(updateContractRecord(values))
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
          <DialogTitle>{initialData ? "Edit Supplier" : "Add Supplier"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update the supplier details below." : "Fill in the details of the new supplier below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
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
                    <FormLabel>Type </FormLabel>
                    <FormControl>
                      <Input placeholder="Type " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Blacklisted">Blacklisted</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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

