// import { useState, useEffect } from 'react'
// import Link from "next/link"
// import { Check } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';
// import { PricingTier } from '@/components/landing/pricing/price-tier';

// interface Props {
//     country: string;
// }

// export interface BillingFrequencyProps {
//     value: string;
//     label: string;
//     priceSuffix: string;
// }
  
// export interface PricingCardsProps {
//     showComparison?: boolean;
//     loading: boolean;
//     frequency: BillingFrequencyProps;
//     priceMap: Record<string, string>;
//     country: string,
// }
  

// export const BillingFrequency: BillingFrequencyProps[] = [
//     { value: 'month', label: 'Monthly', priceSuffix: 'per user/month' },
//     { value: 'year', label: 'Annual', priceSuffix: 'per user/year' },
// ];
  

// export function PricingCards( { showComparison = false, loading, frequency, priceMap }: PricingCardsProps) {
    
//     const [plans, setPlans] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
//     const [billingInterval, setBillingInterval] = useState<"monthly" | "annually">("monthly")

//     useEffect(() => {
//       if (process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
//         initializePaddle({
//           token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
//           environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
//         }).then((paddle) => {
//           if (paddle) {
//             setPaddle(paddle);
//           }
//         });
  
//         // Fetch plans from backend
//         // axios.get('/api/subscription/plans/')
//         // .then(response => {
//         //   setPlans(response.data)
//         //   setIsLoading(false)
//         // })
//         // .catch(error => {
//         //   console.error(error)
//         //   setIsLoading(false)
//         // })
  
//       }
//     }, []);
  
  
//     return (

//       <div className="flex flex-col ">
        
//         <div className="flex justify-center">
//           <div className="flex items-center gap-2 rounded-lg border bg-background p-1">
//             <Button variant={billingInterval === "monthly" ? "default" : "ghost"} onClick={() => setBillingInterval("monthly")} > Monthly </Button>
//             <Button variant={billingInterval === "annually" ? "default" : "ghost"}  onClick={() => setBillingInterval("annually")} >  Annually
//               <span className="ml-1.5 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary"> Save 20% </span>
//             </Button>
//           </div>
//         </div>
  
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {PricingTier.map((plan) => (
//             <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-md" : ""}`}>
//               {plan.popular && (
//                 <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
//                   Most Popular
//                 </div>
//               )}
//               <CardHeader className={`${plan.popular ? "pt-8" : ""}`}>
//                 <CardTitle>{plan.name}</CardTitle>
//                 <CardDescription>{plan.description}</CardDescription>
//               </CardHeader>
//               <CardContent className="flex-1">
//                 <div className="mb-4">
//                   <span className="text-4xl font-bold">${plan.price[billingInterval]}</span>
//                   <span className="text-muted-foreground">/month</span>
//                   {billingInterval === "annually" && (
//                     <div className="mt-1 text-xs text-muted-foreground">
//                       Billed annually (${plan.price[billingInterval] * 12}/year)
//                     </div>
//                   )}
//                 </div>
//                 <ul className="space-y-2">
//                   {plan.features.map((feature) => (
//                     <li key={feature} className="flex items-center gap-2">
//                       <Check className="h-4 w-4 text-primary" />
//                       <span className="text-sm">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//               <CardFooter>
//                 <Link href={plan.href} className="w-full">
//                   <Button size="lg" className="w-full">
//                     {plan.cta}
//                   </Button>
//                 </Link>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
  
//         {showComparison && (
//           <div className="mt-12">
//             <h2 className="text-2xl font-bold text-center mb-8">Compare Plans</h2>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[250px]">Feature</TableHead>
//                     <TableHead>Starter</TableHead>
//                     <TableHead>Professional</TableHead>
//                     <TableHead>Enterprise</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">Farm Size</TableCell>
//                     <TableCell>Up to 5,000 birds</TableCell>
//                     <TableCell>Up to 20,000 birds</TableCell>
//                     <TableCell>Unlimited</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Production Tracking</TableCell>
//                     <TableCell>Basic</TableCell>
//                     <TableCell>Advanced</TableCell>
//                     <TableCell>Advanced + Custom</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Environmental Monitoring</TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Feed Management</TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Health Tracking</TableCell>
//                     <TableCell>Basic</TableCell>
//                     <TableCell>Advanced</TableCell>
//                     <TableCell>Advanced + Custom</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">AI Insights</TableCell>
//                     <TableCell>—</TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">AI Predictions</TableCell>
//                     <TableCell>—</TableCell>
//                     <TableCell>Basic</TableCell>
//                     <TableCell>Advanced</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Multi-farm Management</TableCell>
//                     <TableCell>—</TableCell>
//                     <TableCell>—</TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">API Access</TableCell>
//                     <TableCell>—</TableCell>
//                     <TableCell>—</TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">User Accounts</TableCell>
//                     <TableCell>1</TableCell>
//                     <TableCell>5</TableCell>
//                     <TableCell>Unlimited</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Support</TableCell>
//                     <TableCell>Email</TableCell>
//                     <TableCell>Priority Email</TableCell>
//                     <TableCell>24/7 Phone & Email</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Dedicated Account Manager</TableCell>
//                     <TableCell>—</TableCell>
//                     <TableCell>—</TableCell>
//                     <TableCell>
//                       <Check className="h-4 w-4 text-primary" />
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </div>
//           </div>
//         )}

//       </div>
//     )
//   }

