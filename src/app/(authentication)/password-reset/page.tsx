"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {useResetPasswordMutation}  from "@/lib/api/authentication/beta/AuthApiSlice"
import { toast } from "react-toastify"
import {useRouter} from "next/navigation"


export default function PasswordResetPage() {

	const dispatch = useDispatch()
	// const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const [resetPassword, { isLoading, isSuccess, isError, }] = useResetPasswordMutation();
	const router = useRouter()

	const PaswordResetSchema = z.object({
			email: z.string().email({ message: "Please enter a valid email address" })
		})
	
	const passwordResetForm = useForm<z.infer<typeof PaswordResetSchema>>({
		resolver: zodResolver(PaswordResetSchema),
		defaultValues: {
			email: "",
			// acceptTerms: false,
		},
	})
  
  const handlePasswordReset = async (data: z.infer<typeof PaswordResetSchema>) => {
    // setIsLoading(true)
    // setError(null)
    try {
		// await dispatch(registerUser(data)).unwrap()
		await resetPassword(data).unwrap()
		.then( ()=>{
			toast.success("A confirmation email has been sent. Click on it to activate")
		})
		await new Promise((resolve) => setTimeout(resolve, 1000))
		.then( ()=> {
			router.push('/login')
		})
		
    } catch (error) {
		toast.error("Something has gone wrong")
		
		console.log(data)
		// const firstErrorField = Object.values(error?.data);
		// const msg = Array.isArray(firstErrorField)
		//   ? firstErrorField[0]
		//   : firstErrorField || "Something went wrong";
		// const either = error?.data
		// setError(`${either}`)
    } finally {
		// setIsLoading(false)
    }
  }

  return (

	<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
		<div className="w-full max-w-sm">
			<div className="flex flex-col gap-6">
				<div className="space-y-6">
					{error && (
						<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
						<p className="text-sm text-muted-foreground">Enter your email below to reset  your account</p>
					</div>
					
					<form onSubmit={passwordResetForm.handleSubmit(handlePasswordReset)} className="space-y-4">
						
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" {...passwordResetForm.register("email")} />
							{passwordResetForm.formState.errors.email && (
								<p className="text-sm text-red-500">{passwordResetForm.formState.errors.email.message}</p>
							)}
						</div>
						<Button type="submit" className="w-full bg-blue-700 hover:bg-blue-600" disabled={isLoading}>
                            { isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Reseting password...
                                </>
                            ) : (
                                "Send password reset link "
                            )}
						</Button>

					</form>

					
				</div>
			</div>
		</div>
	</div>
  )
}

