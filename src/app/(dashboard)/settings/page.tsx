'use client';

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountProfileForm } from "@/components/dashboard/settings/account-profile-form"
import { AccountBillingForm } from "@/components/dashboard/settings/account-billing-form"
import { AccountSecurityForm } from "@/components/dashboard/settings/account-security-form"


import { getUser } from "@/lib/api/users/usersApiSlice"
import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Page() {
  const dispatch = useDispatch()

  const { users, loading, error } = useSelector((state: any) => state.users);

  useEffect(()=>{
    dispatch(getUser(users))
  }, [])
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Welcome {users.first_name} {users.last_name} </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            
          </div> */}
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          
          <div className="container py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Account Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="billing">Billing & Subscription</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <AccountProfileForm />
              </TabsContent>
              <TabsContent value="billing">
                <AccountBillingForm />
              </TabsContent>
              <TabsContent value="security">
                <AccountSecurityForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}