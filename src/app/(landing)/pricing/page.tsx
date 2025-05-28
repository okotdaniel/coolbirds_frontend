"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { FAQAccordion } from "@/components/landing/pricing/faq-accordion"
import { Pricing }  from "@/components/landing/pricing/pricing"
import { LocalizationBanner } from '@/components/landing/pricing/localization-banner';



export default function Page() {
  const [country, setCountry] = useState('US');

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-blue-700 tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Simple, transparent pricing
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Choose the plan that's right for your farm. All plans include a 14-day free trial.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>No credit card required for trial</span>
              <span className="mx-1">·</span>
              <Check className="h-4 w-4 text-primary" />
              <span>Cancel anytime</span>
              <span className="mx-1">·</span>
              <Check className="h-4 w-4 text-primary" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="w-full py-12 md:py-24 lg:py-32">
      <LocalizationBanner country={country} onCountryChange={setCountry} />

        <div className="container px-4 md:px-6">
          <Pricing  country={country} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-blue-700 tracking-tighter sm:text-4xl md:text-5xl">
                Frequently asked questions
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about our pricing and plans.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl mt-8">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-blue-700 tracking-tighter sm:text-4xl md:text-5xl">Still have questions?</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team is here to help. Contact us for more information about our plans or custom solutions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/contact">
                <Button size="lg" className="gap-1.5 bg-blue-700 hover:bg-blue-600">
                  Contact Sales
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" className="text-blue-700 hover:text-blue-700" variant="outline">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
