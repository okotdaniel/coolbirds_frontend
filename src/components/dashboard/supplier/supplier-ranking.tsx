'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useSelector } from "react-redux"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supplierByRanking } from "@/lib/redux/slices/supplier/supplierSlice"
import { Star } from "lucide-react"

export default function SupplierRanking(){
    const dispatch = useAppDispatch()

    const { ranking } = useAppSelector((state) => state.ranking)

    useEffect ( ()=> {
          dispatch(supplierByRanking())
      }, [dispatch])
        

    
      const renderStarRating = (rating: number) => {
        return (
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "text-amber-500 fill-amber-500"
                    : i < rating
                      ? "text-amber-500 fill-amber-500 opacity-50"
                      : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="ml-2 text-sm">{rating}</span>
          </div>
        )
      }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Top Suppliers</CardTitle>
                    <CardDescription>Based on delivery time, quality, and price</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { ranking.map( (rank: any)=> ( 
                        <TableRow key={rank.id}>
                        <TableCell className="font-medium">{rank.name}</TableCell>
                        <TableCell>{rank.category}</TableCell>
                        <TableCell>{renderStarRating(rank.rating)}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}