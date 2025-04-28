"use client"

import { useState } from "react"
import Link from "next/link"
import { CreditCard, Download, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AccountBillingForm() {
  const [isLoading, setIsLoading] = useState(false)

  // Mock subscription data
  const subscription = {
    plan: "Professional",
    status: "active",
    billingPeriod: "monthly",
    amount: 99,
    nextBillingDate: "April 15, 2025",
    paymentMethod: {
      type: "card",
      last4: "4242",
      expiryDate: "04/25",
      brand: "Visa",
    },
  }

  // Mock invoice data
  const invoices = [
    {
      id: "INV-001",
      date: "March 15, 2025",
      amount: 99,
      status: "paid",
    },
    {
      id: "INV-002",
      date: "February 15, 2025",
      amount: 99,
      status: "paid",
    },
    {
      id: "INV-003",
      date: "January 15, 2025",
      amount: 99,
      status: "paid",
    },
  ]

  const handleCancelSubscription = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would call your API to cancel the subscription
    // const response = await cancelSubscription()

    setIsLoading(false)
  }

  return (
    <Tabs defaultValue="subscription" className="space-y-4">
      <TabsList>
        <TabsTrigger value="subscription">Subscription</TabsTrigger>
        <TabsTrigger value="payment">Payment Method</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
      </TabsList>

      <TabsContent value="subscription">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>Manage your subscription and billing details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{subscription.plan} Plan</h3>
                  <p className="text-sm text-muted-foreground">${subscription.amount}/month • Billed monthly</p>
                </div>
                <Badge className="bg-emerald-500">Active</Badge>
              </div>
              <div className="mt-4 text-sm">
                <p>Next billing date: {subscription.nextBillingDate}</p>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Need to change your plan?</AlertTitle>
              <AlertDescription>
                You can upgrade or downgrade your plan at any time.
                <div className="mt-2">
                  <Link href="/pricing">
                    <Button variant="outline" size="sm">
                      View Plans
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={handleCancelSubscription} disabled={isLoading}>
              {isLoading ? "Processing..." : "Cancel Subscription"}
            </Button>
            <Button>Update Plan</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="payment">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-md bg-muted p-2">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">Expires {subscription.paymentMethod.expiryDate}</p>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline">Remove</Button>
            <Button>Update Payment Method</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="invoices">
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>View and download your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>${invoice.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span className="capitalize">{invoice.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
