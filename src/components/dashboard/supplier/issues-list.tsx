'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow, } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Truck, Search, Plus, Edit, Trash, ChevronDown,  FileDown, Filter, MoreHorizontal, Star, Phone, Mail, MapPin, Globe, AlertTriangle, CheckCircle2, } from "lucide-react"

import { getAllIssues } from "@/lib/redux/slices/supplier/issueSlice";
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"

export default function IssuesList(){
    
    const dispatch = useAppDispatch();
    const { issues, loading, error } = useAppSelector((state: any) => state.issues);
    console.log(issues)
    useEffect(() => {
        dispatch(getAllIssues());
    }, [dispatch]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (

      <>
        <Card>
            <CardHeader>
                <CardTitle>Issues Log</CardTitle>
                <CardDescription>Recent supplier issues and resolutions</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { issues && issues.map( (issue: any) => (
                        <TableRow key={issue.id}>
                            <TableCell>{issue.date_created}</TableCell>
                            <TableCell className="font-medium">{issue.supplier}</TableCell>
                            <TableCell>{issue.content}</TableCell>
                            <TableCell><Badge className="bg-emerald-500">{issue.status}</Badge> </TableCell>
                        </TableRow>
                    ) )}
                </TableBody>
                </Table>
            </CardContent>
        </Card>    
      </>
    )
}