"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import newRequest from "@/features/auth/newRequest";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";


const OrdersTable = () => {
    const queryClient = useQueryClient();
    // const router = useRouter();

    const { isLoading, error, data } = useQuery({
        queryKey: ["orders"],
        queryFn: () =>
            newRequest.get(`/orders/`).then((res) => {
                return res.data;
            }),
    });

    const editStatusMutation = useMutation({
        mutationFn: async (orderId) => {
            const response = await newRequest.post(
                `/orders/update-status`, // Ensure this endpoint matches your backend setup
                { orderId }, // Ensure this body matches backend expectations
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Order status updated to completed");
            queryClient.invalidateQueries({ queryKey: ["orders"] }); // Refresh the orders after update
        },
        onError: () => {
            toast.error("Failed to update order status");
        },
    });


    const handleEditStatus = (orderId: any) => {
        editStatusMutation.mutate(orderId);
    };

    if (isLoading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p>Something went wrong while fetching orders.</p>;
    }

    if (!data || data.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item: any) => (
                    <TableRow key={item._id}>
                        <TableCell>
                            <Image
                                src={item.img}
                                alt="Gig Cover Image"
                                width={64}
                                height={64}
                                className="size-16 rounded-md object-cover"
                            />
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell className="text-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                        <MoreHorizontal className="size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleEditStatus(item._id)}>
                                        Mark as Completed
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default OrdersTable;
