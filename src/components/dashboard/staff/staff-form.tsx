import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogClose,  DialogFooter, DialogContent, } from "@/components/ui/dialog";
import { Form, FormItem, FormField, FormLabel, FormControl,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks/hooks";

interface Staff{
    first_name: string,
    last_name: string,
    position: string,
    email: string,
    phone: number,
    department: string,
    dateJoined: string
    status: string
}

interface StaffFormProps{
    open: boolean,
    onOpenChange: (open: boolean )=> void,
    staff: Staff[]
} 

const staffSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    position: z.string(),
    email: z.string(),
    phone: z.number(),
    department: z.string(),
    dateJoined: z.date(),
    status: z.string()
})

type FormValues = z.infer<typeof staffSchema>


export default function StaffForm({open, onOpenChange, staff}: StaffFormProps){
    const dispatch = useAppDispatch()

    const form = useForm<FormValues> ({
        resolver: zodResolver(staffSchema),
        defaultValues:{
            first_name: '',
            last_name: '',
            position: '',
            email: '',
            phone: +256770123123,
            department: '',
            // dateJoined: '2025-03-03',
            status: '',
        }
    })

    const  onSubmit = async (values: FormValues) => {
        console.log(values)
        try{
            if(initialData){
                dispatch(updateStaff(values))
            }else{
                dispatch(addStaff(values))
            }
            set
        }catch(error){

        }finally{

        }
    }

    return (
        <Dialog>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            name="first_name" 
                            control={form.control}
                            render={ ( {field} ) => (
                            <FormItem>
                                <FormLabel> First name </FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField name="last_name" control={form.control}
                            render={ ( {field} )=> (
                            <FormItem>
                                <FormLabel> Last name </FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField name="position" control={form.control}
                            render={ ( {field} )=> (
                            <FormItem>
                                <FormLabel> Position  </FormLabel>
                                <FormControl>
                                    <Input placeholder="ie Manager" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField name="email" control={form.control}
                            render={ ( {field} )=> (
                            <FormItem>
                                <FormLabel> Email  </FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe@gmail.com" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField name="phone" control={form.control}
                            render={ ( {field} )=> (
                            <FormItem>
                                <FormLabel> Phone number  </FormLabel>
                                <FormControl>
                                    <Input placeholder="ie +256757076565" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField name="department" control={form.control}
                            render={ ( {field} )=> (
                            <FormItem>
                                <FormLabel> Department  </FormLabel>
                                <FormControl>
                                    <Input placeholder="ie Sales" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField name="status" control={form.control}
                            render={ ( {field} )=> (
                            <FormItem>
                                <FormLabel> Status  </FormLabel>
                                <FormControl>
                                    <Input placeholder="ie confirmed" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        

                    </form>
                    <DialogFooter>
                        <Button type="submit" variant="outline" onClick={ ()=> onOpenChange(false) } > save </Button>
                        <Button> cancel </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}