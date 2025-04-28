import { Bird, Egg, Thermometer, BarChart3, Sparkles, ShoppingBasket, Leaf, Users } from "lucide-react"

export function FeatureCards() {
  const features = [
    {
      title: "Production Tracking",
      description: "Monitor egg production in real-time with detailed analytics and reporting.",
      icon: Egg,
    },
    {
      title: "Flock Management",
      description: "Track bird health, growth, and lifecycle from placement to processing.",
      icon: Bird,
    },
    {
      title: "Environmental Control",
      description: "Monitor and optimize temperature, humidity, and air quality for optimal bird comfort.",
      icon: Thermometer,
    },
    {
      title: "Feed Management",
      description: "Track feed consumption, formulations, and inventory to optimize costs.",
      icon: ShoppingBasket,
    },
    {
      title: "Health Tracking",
      description: "Monitor bird health, vaccination schedules, and mortality rates.",
      icon: Leaf,
    },
    {
      title: "Staff Management",
      description: "Schedule and track staff activities, performance, and training.",
      icon: Users,
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics to identify trends and opportunities.",
      icon: BarChart3,
    },
    {
      title: "AI-Powered Insights",
      description: "Predictive analytics and recommendations to optimize farm performance.",
      icon: Sparkles,
    },
  ]

  return (
    <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex flex-col items-center text-center p-6 space-y-4 rounded-lg border bg-background shadow-sm"
        >
          <div className="p-2 rounded-full bg-primary/10">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
