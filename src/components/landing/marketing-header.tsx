"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Egg, Menu, BirdIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function MarketingHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/features",
      label: "Features",
      active: pathname === "/features",
    },
    {
      href: "/pricing",
      label: "Pricing",
      active: pathname === "/pricing",
    },
    {
      href: "/blog",
      label: "Blog",
      active: pathname === "/blog",
    },
    {
      href: "/demo",
      label: "Demo",
      active: pathname === "/demo",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center justify-center">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BirdIcon className="h-6 w-6 text-blue-700 " />
            <span className="hidden font-bold sm:inline-block text-blue-800 ">Cool Birds</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-blue-700 hover:bg-blue-600">Sign up</Button>
          </Link>
        </div>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Toggle Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <Egg className="h-6 w-6" />
                <span className="font-bold">Cool Birds</span>
              </Link>
              <nav className="mt-8 flex flex-col gap-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary",
                      route.active ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-4">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className=" w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-blue-700 hover:bg-blue-600 w-full">Sign up</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
