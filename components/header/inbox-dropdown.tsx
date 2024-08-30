"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRightIcon, ChevronRight, Mail } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import newRequest from "@/features/auth/newRequest";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import ConversationItem from "../conversation/conversation-item";

export function InboxDropdown() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    const [buyerIds, setBuyerIds] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const [position, setPosition] = useState("bottom");
    const router = useRouter();

    const { isLoading, error, data } = useQuery({
        queryKey: ["conversations"],
        queryFn: () =>
            newRequest.get(`/conversations`).then((res) => {
                return res.data;
            }),
    });

    useEffect(() => {
        if (data) {
            const ids = data.map((c: any) => {
                return currentUser._id === c.buyerId ? c.sellerId : c.buyerId;
            });
            setBuyerIds(ids);  // Set the array of buyer IDs
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.put(`/conversations/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        },
    });

    const { isLoading: isLoadingBuyers, error: errBuyers, data: buyersData } = useQuery({
        queryKey: ["buyers", buyerIds],
        queryFn: () =>
            newRequest.post(`/buyer/ids`, { ids: buyerIds }).then((res) => {
                return res.data;
            }),
        enabled: buyerIds.length > 0,  // Only fetch when `buyerIds` array is not empty
    });

    const handleRead = (id: any) => {
        mutation.mutate(id);
        router.push(`/inbox/${currentUser.username}/${id}`);
    };

    const getBuyerData = (conversation: any) => {
        const buyerId = currentUser._id === conversation.buyerId ? conversation.sellerId : conversation.buyerId;
        return buyersData?.find((buyer: any) => buyer._id === buyerId);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span className="p-4 hover:bg-gray-300/20 rounded-full cursor-pointer">
                    <Mail className="size-6 text-[#62646a]" />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[400px] h-[400px] p-4">
                <DropdownMenuLabel className="bg-gray-300/20 rounded-xl p-4">Inbox ({data?.length})</DropdownMenuLabel>

                {data?.length > 0 ? (
                    <div>
                        {data.map((c: any) => (
                            <div
                                className="flex flex-col gap-y-2 mt-4 cursor-pointer"
                                onClick={() => handleRead(c.id)}
                                key={c.id}
                            >
                                <ConversationItem c={c} dataOne={getBuyerData(c)} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-4 items-center justify-center flex-1 h-full">
                        <Image
                            src="https://utfs.io/f/76ad5e36-6037-4977-9284-c1544d9f61de-ha2a01.bade210.svg"
                            alt="No new messages"
                            width={200}
                            height={200}
                        />
                        <div className="flex flex-col gap-y-1.5 items-center">
                            <span className="text-gray-500 font-semibold text-xl">No messages...yet</span>
                            <span className="text-gray-400">It all starts with hello.</span>
                        </div>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
