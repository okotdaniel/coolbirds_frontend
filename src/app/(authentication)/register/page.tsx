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

import {useRegisterMutation}  from "@/lib/api/authentication/beta/AuthApiSlice"
import { toast } from "react-toastify"
import {useRouter} from "next/navigation"


export default function SignUpForm() {

	const dispatch = useDispatch()
	// const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const [register, { isLoading, isSuccess, isError, }] = useRegisterMutation();
	const router = useRouter()

	const RegisterSchema = z.object(
		{
			first_name: z.string().min(2, { message: "Name must be at least 5 characters" }),
			last_name: z.string().min(2, { message: "Name must be at least 5 characters" }),
			email: z.string().email({ message: "Please enter a valid email address" }),
			password: z.string().min(8, { message: "Password must be at least 8 characters" })
			.regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
			.regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
			.regex(/[0-9]/, { message: "Password must contain at least one number" }),
			re_password: z.string(),
			// acceptTerms: z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions" }),
			
	})
	.refine((data) => data.password === data.re_password, {
		message: "Passwords do not match",
		path: ["re_password"],
	})

	const registrationForm = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			re_password: "",
			// acceptTerms: false,
		},
	})
  
  const handleEmailSignUp = async (data: z.infer<typeof RegisterSchema>) => {
    // setIsLoading(true)
    // setError(null)
    try {
		// await dispatch(registerUser(data)).unwrap()
		await register(data).unwrap()
		.then( ()=>{
			toast.success("Account created, check your email to verify")
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

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // await dispatch(registerWithGoogle()).unwrap()
      console.log("Registering with Google")
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
      setError("Failed to sign up with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookSignUp = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // await dispatch(registerWithFacebook()).unwrap()
      console.log("Registering with Facebook")
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
      setError("Failed to sign up with Facebook. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (

	<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
		<div className="w-full max-w-sm">
			<div className="flex flex-col gap-6">

				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
					<p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
				</div>
				
				<div className="space-y-6">
					{error && (
						<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					<form onSubmit={registrationForm.handleSubmit(handleEmailSignUp)} className="space-y-4">
						
						<div className="space-y-2">
							<Label htmlFor="first_name">First Name</Label>
							<Input id="first_name" placeholder="John" {...registrationForm.register("first_name")} />
							{registrationForm.formState.errors.first_name && <p className="text-sm text-red-500">{registrationForm.formState.errors.first_name.message}</p>}
						</div>

						
						<div className="space-y-2">
							<Label htmlFor="last_name">Last Name</Label>
							<Input id="last_name" placeholder="Doe" {...registrationForm.register("last_name")} />
							{registrationForm.formState.errors.last_name && <p className="text-sm text-red-500">{registrationForm.formState.errors.last_name.message}</p>}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="name@example.com" {...registrationForm.register("email")} />
							{registrationForm.formState.errors.email && <p className="text-sm text-red-500">{registrationForm.formState.errors.email.message}</p>}
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" {...registrationForm.register("password")} />
							{registrationForm.formState.errors.password && (
								<p className="text-sm text-red-500">{registrationForm.formState.errors.password.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="re_password">Confirm Password</Label>
							<Input id="re_password" type="password" {...registrationForm.register("re_password")} />
							{registrationForm.formState.errors.re_password && (
								<p className="text-sm text-red-500">{registrationForm.formState.errors.re_password.message}</p>
							)}
						</div>

						{/* <div className="flex items-center space-x-2">
						<Checkbox
							id="acceptTerms"
							{...form.register("acceptTerms")}
							onCheckedChange={(checked) => {
							form.setValue("acceptTerms", checked === true)
							}}
						/>
						<label
							htmlFor="acceptTerms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I accept the terms and conditions
						</label>
						</div>
						{form.formState.errors.acceptTerms && (
						<p className="text-sm text-red-500">{form.formState.errors.acceptTerms.message}</p>
						)} */}

						<Button type="submit" className="w-full bg-blue-700 hover:bg-blue-600" disabled={isLoading}>
							{isLoading ? (
								<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Creating account...
								</>
							) : (
								"Create Account"
							)}
						</Button>

						<p > Have an account already ? 
						<Link className="text-blue-800" href="/login" >    Login </Link>
						</p>
					</form>

					

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
						<Separator className="w-full" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-white px-2 text-muted-foreground">Or continue with</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Button variant="outline" onClick={handleGoogleSignUp} disabled={isLoading}>
							<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
								<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
								/>
								<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
								/>
								<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
								/>
								<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
								/>
								<path d="M1 1h22v22H1z" fill="none" />
							</svg>
							Google
						</Button>

						<Button variant="outline" onClick={handleFacebookSignUp} disabled={isLoading}>
						<svg className="mr-2 h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
							<path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
						</svg>
						Facebook
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

