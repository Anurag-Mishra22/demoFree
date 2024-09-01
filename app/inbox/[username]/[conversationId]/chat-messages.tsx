"use client"

import { Loader2 } from "lucide-react";
import ChatWelcome from "./chat-welcome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "@/features/auth/newRequest";
import { useParams } from 'next/navigation';
import ChatItem from "./chat-item";

const ChatMessages = () => {
    const params = useParams();
    const queryClient = useQueryClient();
    const status = false;

    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);

    const { isLoading, error, data } = useQuery({
        queryKey: ["messages"],
        queryFn: () =>
            newRequest.get(`/messages/${params.conversationId}`).then((res) => {
                return res.data;
            }),
        refetchInterval: 1000,
    });
    console.log(data);

    if (status) {
        return (
            <div className="flex flex-col flex-1 justify-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500">Loading messages...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1">
                {data?.map((m: any) => (
                    <ChatItem
                        key={m._id}
                        desc={m.desc}
                        userId={m.userId}
                        currentUserId={currentUser?._id}
                    />
                ))}
                <ChatWelcome />
            </div>
        </div>
    );
};

export default ChatMessages;