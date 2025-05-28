
'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useEffect } from "react"
import { useAppDispatch } from "@/lib/redux/hooks/hooks"

import { fetchIssueRecords, addIssueRecordRecord, updateIssueRecord } from "@/lib/redux/slices/supplier/issueSlice";

interface issueFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Issue | null
}

 

const formSchema = z.object({
  supplier: z.string().min(2, { message: "Name must be at least 2 characters" }),
  content: z.string().min(1, { message: "Category is required" }),
  status: z.string().min(2, { message: "Contact name is required" }),

})

type FormValues = z.infer<typeof formSchema>

export function IssueForm({ open, onOpenChange, initialData }: issueFormProps) {
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: "",
      content: "",    
      status: "Active",
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        supplier: initialData.name,
        content: initialData.category,
        status: initialData.status,
      })
    } else {
      form.reset({
        supplier: "",
        content: "",
        status: "Active",
      })
    }
  }, [initialData, form, open])

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      
      if (initialData) {
        dispatch(updateIssueRecord(values))
      } else {
        dispatch(addIssueRecord(values))
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="In progress">In progress</SelectItem>
                        <SelectItem value="Resolved"> Resolved</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
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

