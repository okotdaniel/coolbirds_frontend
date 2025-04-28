import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EggProduction() {
    return (
        <Card>
        <CardHeader>
          <CardTitle>Egg Quality Metrics</CardTitle>
          <CardDescription>Quality assessment of egg production</CardDescription>
        </CardHeader>
        <CardContent>
      
       
        <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
            <div className="text-sm font-medium">Grade A</div>
            <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[85%] rounded-full bg-emerald-500"></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>85%</span>
                <span>7,600 eggs</span>
            </div>
            </div>
            <div className="space-y-2">
            <div className="text-sm font-medium">Grade B</div>
            <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[12%] rounded-full bg-amber-500"></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>12%</span>
                <span>1,073 eggs</span>
            </div>
            </div>
            <div className="space-y-2">
            <div className="text-sm font-medium">Cracked</div>
            <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[2%] rounded-full bg-rose-500"></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>2%</span>
                <span>179 eggs</span>
            </div>
            </div>
            <div className="space-y-2">
            <div className="text-sm font-medium">Rejected</div>
            <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[1%] rounded-full bg-rose-700"></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>1%</span>
                <span>90 eggs</span>
            </div>
            </div>
        </div>
        </CardContent>
        </Card>
)}