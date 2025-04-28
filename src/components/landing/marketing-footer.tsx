import Link from "next/link"
import { Egg } from "lucide-react"

export function MarketingFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <Egg className="h-5 w-5" />
          <p className="text-sm leading-loose text-center md:text-left">
            &copy; {new Date().getFullYear()} Cool Birds. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  )
}
