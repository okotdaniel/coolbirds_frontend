"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQAccordion() {
  const faqs = [
    {
      question: "What is Cool Birds?",
      answer:
        "Cool Birds is a comprehensive farm management software designed specifically for poultry farms. It helps you track production, monitor bird health, manage feed, control environmental conditions, and gain AI-powered insights to optimize your operations.",
    },
    {
      question: "How does the 14-day free trial work?",
      answer:
        "You can sign up for any plan and use all features for 14 days without being charged. No credit card is required to start your trial. At the end of the trial, you can choose to subscribe to continue using the service.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take data security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security practices and regular security audits to ensure your farm data remains protected.",
    },
    {
      question: "Do I need special hardware to use Cool Birds?",
      answer:
        "No, Cool Birds works on any modern web browser and has mobile apps for iOS and Android. For environmental monitoring features, we offer optional IoT sensors that integrate with our platform, but they are not required to use the core functionality.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes, you can export your data in various formats including CSV, Excel, and PDF. The Professional and Enterprise plans also include API access for integrating with other systems.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "All plans include email support. The Professional plan includes priority email support with faster response times. The Enterprise plan includes 24/7 phone and email support, plus a dedicated account manager to help with implementation and ongoing optimization.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No, there are no setup fees for any of our plans. We offer free onboarding assistance to help you get started quickly.",
    },
  ]

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
