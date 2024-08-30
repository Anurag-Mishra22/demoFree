import { ChevronRight } from 'lucide-react';
import Image from 'next/image'
import React from 'react'
import { DropdownMenuSeparator } from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';

const ConversationItem = ({ c, dataOne }: { c: any, dataOne: any }) => {
    console.log("DATAONE", dataOne);
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    return (
        <div className="flex gap-x-4 items-start">
            <div className="relative">
                <Image
                    src={
                        dataOne?.profilePicture ? dataOne.profilePicture : "https://utfs.io/f/2d7806fe-d61b-4ea9-aaac-284f9764ca8f-599egd.png"
                    }
                    alt="Profile Picture"
                    width={45}
                    height={45}
                    className="rounded-full object-contain"
                />

                <div className={cn(
                    "absolute bottom-0 right-0  rounded-full w-2 h-2",
                    dataOne?.online ? "bg-green-500" : "bg-gray-400"
                )}></div>
            </div>
            <div className="flex flex-col flex-1 gap-y-2 ">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="font-semibold text-base" >{dataOne?.username}</span>
                        <span className="text-gray-400 text-sm">{c?.lastMessage}</span>
                    </div>
                    {
                        ((currentUser.isSeller && !c.readBySeller) ||
                            (!currentUser.isSeller && !c.readByBuyer)) ? (
                            <div className="bg-blue-500 rounded-full w-6 h-6 p-2 flex items-center justify-center">
                                <span className="text-xs text-white font-medium">2</span>
                            </div>
                        ) : (
                            <ChevronRight className="size-6 text-gray-400 mr-4" />
                        )
                    }


                </div>
                <DropdownMenuSeparator />

            </div>
        </div>
    )
}

export default ConversationItem