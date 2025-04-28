import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DemoRequestForm } from "@/components/landing/demo/demo-request-form"

export default function Page() {
  return (
    <div className="flex flex-col ">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  See Cool Birds in action
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Schedule a personalized demo with our product specialists to see how Cool Birds can transform your
                  poultry farm operations.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                <span>No obligation</span>
                <span className="mx-1">·</span>
                <Check className="h-4 w-4 text-primary" />
                <span>Tailored to your farm</span>
                <span className="mx-1">·</span>
                <Check className="h-4 w-4 text-primary" />
                <span>Expert guidance</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] overflow-hidden rounded-xl border bg-background p-6 shadow-xl">
                <DemoRequestForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What to expect from your demo
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our product specialists will guide you through Cool Birds and show you how it can address your specific
                needs.
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-lg border bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
                1
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Needs Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  We'll discuss your farm's specific challenges and goals to understand how we can help.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-lg border bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
                2
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Product Walkthrough</h3>
                <p className="text-sm text-muted-foreground">
                  See a comprehensive demonstration of Cool Birds's features and capabilities.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-lg border bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
                3
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Implementation Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Get a customized plan for implementing Cool Birds in your farm operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently asked questions
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Common questions about our demo process
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl mt-8 space-y-4">
            <div className="rounded-lg border bg-background p-6">
              <h3 className="font-bold mb-2">How long does the demo typically last?</h3>
              <p className="text-muted-foreground">
                Our demos usually last 30-45 minutes, depending on your questions and specific needs.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="font-bold mb-2">Do I need to prepare anything for the demo?</h3>
              <p className="text-muted-foreground">
                No preparation is required. However, having some information about your farm size, current challenges,
                and goals can help us tailor the demo to your needs.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="font-bold mb-2">Can I invite other team members to the demo?</h3>
              <p className="text-muted-foreground">
                We encourage you to invite key stakeholders who would be involved in using the system.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="font-bold mb-2">What happens after the demo?</h3>
              <p className="text-muted-foreground">
                After the demo, we'll provide you with a summary of what was discussed, a custom implementation plan,
                and next steps if you decide to move forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to see Cool Birds in action?
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Schedule your personalized demo today or start your 14-day free trial.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="#demo-form">
                <Button size="lg" className="gap-1.5">
                  Schedule Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
