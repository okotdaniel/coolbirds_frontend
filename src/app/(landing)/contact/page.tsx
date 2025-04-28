import { ContactForm } from "@/components/landing/contact/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Page() {
  return (
    <div className="container ">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Contact Us
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Have questions or need assistance? Our team is here to help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Get in touch</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-8">
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-muted-foreground">
                        123 Poultry Lane
                        <br />
                        Farmington, CA 94123
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">info@Cool Birds.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Business Hours</h4>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 5:00 PM
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-xl font-bold mb-4">Sales Inquiries</h3>
                <p className="text-muted-foreground mb-4">
                  For sales inquiries, please contact our sales team directly:
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>sales@Cool Birds.com</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+1 (555) 987-6543</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Our Location</h2>
              <p className="text-muted-foreground">Visit our headquarters</p>
            </div>
          </div>
          <div className="mt-8 rounded-lg overflow-hidden border">
            <div className="aspect-video w-full bg-muted">
              {/* Replace with actual map embed */}
              <div className="flex items-center justify-center h-full bg-muted">
                <p className="text-muted-foreground">Map Embed Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
