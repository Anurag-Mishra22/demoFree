"use client"
import React from 'react'
import UserLogo from '../_components/user-logo'
import { cn } from '@/lib/utils'
import { Gem, MapPinIcon, MessageCircle, MessageCircleIcon } from 'lucide-react'
import MessageSection from '../_components/message.-section'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '@/features/auth/newRequest'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


type UserInfoProps = {
    sellerData: any
}

const UserInfo = ({ sellerData }: UserInfoProps) => {

    const router = useRouter()
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);


    const mutation = useMutation({
        mutationFn: async (id) => {
            const response = await newRequest.post('/conversations/', {
                to: id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data; // Return the response data which includes `conversationId`
        },
        onSuccess: (data) => {
            const conversationId = data.conversationId; // Extract `conversationId` from the response
            toast.success('Conversation Created Successfully');
            router.push(`/inbox/${currentUser.username}/${conversationId}`); // Navigate to the inbox with the conversation ID
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to create Conversation');
        }
    });

    console.log(sellerData)

    const handleConversation = () => {
        mutation.mutate(sellerData?._id)
    }


    return (
        <div className='flex justify-between'>
            <div className='flex gap-x-4'>
                <div className='relative'>
                    <UserLogo src={sellerData?.profilePicture} />
                    <div className={cn(
                        "absolute bottom-4 right-4  rounded-full w-2 h-2",
                        sellerData?.online ? "bg-green-500" : "bg-gray-500"
                    )}></div>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p>{sellerData?.fullName}</p>
                    <div className='flex gap-x-2 items-center'>
                        <div className='flex gap-x-1.5 items-center'>
                            <MapPinIcon className='size-4' />
                            <span>{sellerData?.country}</span>
                        </div>
                        <div className='flex gap-x-1.5 items-center'>
                            <MessageCircle className='size-4' />
                            <div className='flex gap-x-2'>
                                {
                                    sellerData?.languages.map((lang: any) => (
                                        <span key={lang?._id}>{lang?.language}</span>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='flex gap-x-1.5 items-center'>
                            <Gem className='size-4' />
                            <span>{sellerData?.completedJobs} orders completed</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <MessageSection /> */}
            <Button onClick={handleConversation} className="rounded-xl shadow-lg hover:scale-105">
                <MessageCircleIcon className="mr-2 h-5 w-5" />
                Contact Me
            </Button>

        </div>
    )
}

export default UserInfo