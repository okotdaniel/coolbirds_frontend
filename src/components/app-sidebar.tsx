"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Egg,
  LifeBuoy,
  User,
  Gauge,
  CircleDollarSign,
  Send,
  ShoppingBasketIcon,
  Sparkles,
  DollarSign,
} from "lucide-react"


import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Daniel",
    email: "m@example.com",
    // avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard/",
      icon: Gauge,
      isActive: true,
    },
    {
      title: "Health",
      url: "health",
      icon: BookOpen,
    },
    {
      title: "Flock",
      url: "flock",
      icon: BookOpen,
    },
    {
      title: "Production",
      url: "production",
      icon: Egg,
    },
    {
      title: "Feed",
      url: "feed",
      icon: ShoppingBasketIcon,
    },
    {
      title: "Income & expenses",
      url: "income",
      icon: CircleDollarSign,
    },
    {
      title: "Supplier",
      url: "supplier",
      icon: BookOpen,
    },
    {
      title: "Staff",
      url: "staff",
      icon: User,
    },
    {
      title: "AI Insights",
      url: "insights",
      icon: Sparkles,
    },
    {
      title: "Settings",
      url: "settings",
      icon: Bot,
    },
    {
      title: 'Subscriptions',
      url: 'subscriptions',
      icon: Bot,
    },
    {
      title: 'Payments',
      url: 'payments',
      icon: DollarSign,
    }
  ],
  
  navSecondary: [
    {
      title: "Support",
      url: "dashboard/",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "dashboard/",
      icon: Send,
    },
  ],
  
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="dashboard/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Avira </span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter> <NavUser user={data.user} /> </SidebarFooter>
    </Sidebar>
  )
}
