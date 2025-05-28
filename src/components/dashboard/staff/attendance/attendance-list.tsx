"use client"



import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Attendance(){
    return (
        <>
            <Card>
                  <CardHeader>
                    <CardTitle>Recent Absences</CardTitle>
                    <CardDescription>Staff absences in the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Staff</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Williams" />
                                <AvatarFallback>SW</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Sarah Williams</div>
                            </div>
                          </TableCell>
                          <TableCell>Vacation</TableCell>
                          <TableCell>Mar 20, 2025</TableCell>
                          <TableCell>Mar 31, 2025</TableCell>
                          <TableCell>12 days</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-500">Ongoing</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Michael Wilson" />
                                <AvatarFallback>MW</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Michael Wilson</div>
                            </div>
                          </TableCell>
                          <TableCell>Sick Leave</TableCell>
                          <TableCell>Mar 15, 2025</TableCell>
                          <TableCell>Mar 16, 2025</TableCell>
                          <TableCell>2 days</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">Completed</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Lisa Martinez" />
                                <AvatarFallback>LM</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Lisa Martinez</div>
                            </div>
                          </TableCell>
                          <TableCell>Personal Leave</TableCell>
                          <TableCell>Mar 10, 2025</TableCell>
                          <TableCell>Mar 10, 2025</TableCell>
                          <TableCell>1 day</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500">Completed</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
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