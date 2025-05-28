"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
// import registerUser from "@/lib/redux/slices/authentication/beta/authSlice"
import {registerUser}  from "@/lib/api/authentication/authApiSlice"

import {useResetPasswordConfirmMutation}  from "@/lib/api/authentication/beta/AuthApiSlice"
import { toast } from "react-toastify"
import {useRouter} from "next/navigation"


export default function SignUpForm() {

	const dispatch = useDispatch()
	// const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const [resetPasswordConfirm, { isLoading, isSuccess, isError, }] = useResetPasswordConfirmMutation();
	const router = useRouter()

	const PaswordResetSchema = z.object(
		{
			password: z.string().min(8, { message: "Password must be at least 8 characters" })
			.regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
			.regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
			.regex(/[0-9]/, { message: "Password must contain at least one number" }),
			re_new_password: z.string(),
			// acceptTerms: z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions" }),
			
	})
	.refine((data) => data.password === data.re_new_password, {
		message: "Passwords do not match",
		path: ["re_new_password"],
	})

	const passwordResetForm = useForm<z.infer<typeof PaswordResetSchema>>({
		resolver: zodResolver(PaswordResetSchema),
		defaultValues: {
			password: "",
			re_new_password: "",
			// acceptTerms: false,
		},
	})
  
  const handlePasswordResetOnfirmation = async (data: z.infer<typeof PaswordResetSchema>) => {
    // setIsLoading(true)
    // setError(null)
    try {
		// await dispatch(registerUser(data)).unwrap()
		await resetPasswordConfirm(uid, token, data).unwrap()
		.then( ()=>{
			toast.success("Password reset successfull")
		})
		await new Promise((resolve) => setTimeout(resolve, 1000))
		.then( ()=> {
			router.push('/login')
		})
		
    } catch (error) {
		toast.error("Something has gone wrong")
		console.log(error)
		const firstErrorField = Object.values(error?.data);
		const msg = Array.isArray(firstErrorField)
		  ? firstErrorField[0]
		  : firstErrorField || "Something went wrong";
		setError(`${msg}`)
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

					<form onSubmit={passwordResetForm.handleSubmit(handlePasswordResetOnfirmation)} className="space-y-4">
						
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" {...passwordResetForm.register("password")} />
							{passwordResetForm.formState.errors.password && (
								<p className="text-sm text-red-500">{passwordResetForm.formState.errors.password.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="re_new_password">Confirm Password</Label>
							<Input id="re_new_password" type="password" {...passwordResetForm.register("re_new_password")} />
							{passwordResetForm.formState.errors.re_new_password && (
								<p className="text-sm text-red-500">{passwordResetForm.formState.errors.re_new_password.message}</p>
							)}
						</div>

						<Button type="submit" className="w-full bg-blue-700 hover:bg-blue-600" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Reseting password...
                                </>
                            ) : (
                                "Reset password"
                            )}
						</Button>

					</form>

					
				</div>
			</div>
		</div>
	</div>
  )
}

