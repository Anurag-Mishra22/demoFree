"use client"
import { useQuery } from "@tanstack/react-query";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import newRequest from "@/features/auth/newRequest";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

const GigsTable = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["gigs"],
        queryFn: () =>
            newRequest.get(`/gigs/`).then((res) => {
                return res.data;
            }),
    });
    console.log(data);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Image
                    </TableHead>
                    <TableHead>
                        Title
                    </TableHead>
                    <TableHead>
                        Impressions
                    </TableHead>
                    <TableHead>
                        Clicks
                    </TableHead>
                    <TableHead>
                        Orders
                    </TableHead>
                    <TableHead className="text-right">
                        Actions
                    </TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data?.map((item: any) => (
                        <TableRow key={item._id}>
                            <TableCell>
                                <Image
                                    src={item.cover}
                                    alt="Gig Cover Image"
                                    width={64}
                                    height={64}
                                    className="size-16 rounded-md object-cover"

                                />
                            </TableCell>
                            <TableCell>
                                {item.title}
                            </TableCell>
                            <TableCell>
                                {item.engagementScore}
                            </TableCell>
                            <TableCell>
                                {item.clicks}
                            </TableCell>
                            <TableCell>
                                {item.orderCompleted}
                            </TableCell>
                            <TableCell className="text-end" >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <MoreHorizontal className="size-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default GigsTable