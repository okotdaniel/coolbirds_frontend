"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface AlertToastProps {
  title: string
  message: string
  type: "success" | "error" | "warning" | "info"
  onClose: () => void
  autoClose?: boolean
  autoCloseTime?: number
}

export function AlertToast({ title, message, type, onClose, autoClose = true, autoCloseTime = 5000 }: AlertToastProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseTime)

      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseTime, onClose])

  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "bg-emerald-50 text-emerald-800 border-emerald-200"
      case "error":
        return "bg-rose-50 text-rose-800 border-rose-200"
      case "warning":
        return "bg-amber-50 text-amber-800 border-amber-200"
      case "info":
        return "bg-blue-50 text-blue-800 border-blue-200"
      default:
        return ""
    }
  }

  return (
    <Alert className={`${getAlertClass()} fixed top-4 right-4 w-96 z-50 shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
}

