"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StaffPerformanceChart } from "@/components/dashboard/staff/staff/staff-performance-chart"

export default function Performance(){
    return (
        <>
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Reviews</CardTitle>
                    <CardDescription>Recent staff performance evaluations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Staff</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Review Date</TableHead>
                          <TableHead>Reviewer</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Smith" />
                                <AvatarFallback>JS</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">John Smith</div>
                            </div>
                          </TableCell>
                          <TableCell>Farm Manager</TableCell>
                          <TableCell>Mar 15, 2025</TableCell>
                          <TableCell>Regional Director</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">Excellent</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Maria Garcia" />
                                <AvatarFallback>MG</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Maria Garcia</div>
                            </div>
                          </TableCell>
                          <TableCell>Veterinarian</TableCell>
                          <TableCell>Mar 10, 2025</TableCell>
                          <TableCell>John Smith</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">Excellent</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Robert Johnson" />
                                <AvatarFallback>RJ</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Robert Johnson</div>
                            </div>
                          </TableCell>
                          <TableCell>Feed Specialist</TableCell>
                          <TableCell>Mar 05, 2025</TableCell>
                          <TableCell>John Smith</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">Good</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
        </>
    )
}