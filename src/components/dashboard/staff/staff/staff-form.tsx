'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { zfd } from "zod-form-data"
import * as z from "zod"
import { useState, useEffect } from "react"
import { useAppDispatch } from "@/lib/redux/hooks/hooks"

import { type Staff, addStaff, updateStaff } from "@/lib/api/staff/staffApiSlice"


interface StaffFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Staff | null
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  position: z.string().min(2, { message: "Position must be at least 2 characters" }),
  department: z.string().min(1, { message: "Department is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.number().min(10, { message: "Phone number is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  avatar: zfd.file()
  .refine( (file)=> file.size < 5000000, { "message": "File can not be more than 5 mb"})
  .refine( (file)=> ["image/jpeg", "image/png", "image/jpg"].includes(file.type),{"message": "File can only be jpg, jpeg, png"})

})

type FormValues = z.infer<typeof formSchema>

export function StaffForm({ open, onOpenChange, initialData }: StaffFormProps) {
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: "",
      department: "",
      email: "",
      // phone: ,
      status: "Probation",
      avatar: "",
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        position: initialData.position,
        department: initialData.department,
        email: initialData.email,
        phone: initialData.phone,
        status: initialData.status,
        avatar: initialData.avatar,

      })
    } else {
      form.reset({
        name: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        status: "Probation",
        avatar: "",
      })
    }
  }, [initialData, form, open])

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      
      if (initialData) {
        dispatch(updateStaff(values))
      } else {
        dispatch(addStaff(values))
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
          <DialogTitle>{initialData ? "Edit Staff" : "Add Staff"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update the staff details below." : "Fill in the details of the new staff below."}
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
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position </FormLabel>
                    <FormControl>
                      <Input placeholder="Position " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="department" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
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
                    name="phone"
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
                            <SelectItem value="Probation">Probation</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Resigned">Resigned</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="avatar"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                    <FormLabel>Avatar </FormLabel>
                    <FormControl>
                        <Input
                        className="bg-neutral-900"
                        type="file"
                        {...fieldProps}
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(event) =>
                            onChange(event.target.files && event.target.files[0])
                        }
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
              
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}> Cancel </Button>
              <Button type="submit" disabled={isSubmitting}>  {isSubmitting ? "Saving..." : initialData ? "Update" : "Add"}  </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

