"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "@/features/auth/newRequest";
import ConversationItem from "@/components/conversation/conversation-item";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Conversations = () => {
    const queryClient = useQueryClient();
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    const [buyerIds, setBuyerIds] = useState<string[]>([]);
    const router = useRouter();

    const { isLoading, error, data } = useQuery({
        queryKey: ["conversations"],
        queryFn: () =>
            newRequest.get(`/conversations`).then((res) => {
                return res.data;
            }),
    });

    const { isLoading: isLoadingBuyers, error: errBuyers, data: buyersData } = useQuery({
        queryKey: ["buyers", buyerIds],
        queryFn: () =>
            newRequest.post(`/buyer/ids`, { ids: buyerIds }).then((res) => {
                return res.data;
            }),
        enabled: buyerIds.length > 0,  // Only fetch when `buyerIds` array is not empty
    });

    useEffect(() => {
        if (data) {
            const ids = data.map((c: any) => {
                return currentUser._id === c.buyerId ? c.sellerId : c.buyerId;
            });
            setBuyerIds(ids);  // Set the array of buyer IDs
        }
    }, [data]);

    const handleRead = (id: any) => {
        router.push(`/inbox/${currentUser.username}/${id}`);
    };

    const getBuyerData = (conversation: any) => {
        const buyerId = currentUser._id === conversation.buyerId ? conversation.sellerId : conversation.buyerId;
        return buyersData?.find((buyer: any) => buyer._id === buyerId);
    };

    return (
        <Card className="w-[350px] h-full">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    data?.length > 0 ? (
                        data.map((c: any, index: number) => (
                            <div key={index} className="flex flex-col gap-y-2 mt-4 cursor-pointer" onClick={() => handleRead(c.id)}>
                                <ConversationItem c={c} dataOne={getBuyerData(c)} />
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col gap-y-4 items-center justify-center">
                            <Image
                                src='https://utfs.io/f/d480cb36-8a44-45b4-b74f-0f237dfe2b1b-xk1gcc.svg'
                                width={59.7}
                                height={60.2}
                                alt='conversation'
                            />
                            <div className="flex flex-col items-center justify-center gap-y-4">
                                <p className="text-xl md:text-3xl font-bold ">
                                    No Conversations
                                </p>

                                <div className=" flex flex-col items-center">
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm flex items-center ">There are no conversations under</p>
                                    <p className="text-zinc-600 inde dark:text-zinc-400 text-sm flex items-center ">"All messages"</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>
    )
}

export default Conversations;
