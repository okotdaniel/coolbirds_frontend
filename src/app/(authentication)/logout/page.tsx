// components/LogoutButton.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useLogoutMutation } from "@/lib/api/authentication/beta/AuthApiSlice"
import { Button } from '@/components/ui/button'
export default function LogoutButton() {
    
    const [logout, {isSuccess, isError, isLoading, error }] = useLogoutMutation()

    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout().unwrap()
            router.push('/login')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <Button onClick={handleLogout} className="px-4 py-2 bg-blue-600 text-white  hover:bg-blue-700">
            Logout
        </Button>
    )
}