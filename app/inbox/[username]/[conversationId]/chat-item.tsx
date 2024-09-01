import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import React from 'react';

const ChatItem = ({ desc, userId, currentUserId }: { desc: string, userId: string, currentUserId: string }) => {
    return (
        <div className={cn(
            "flex p-4 rounded-xl mt-2",
            userId === currentUserId ? "bg-blue-200" : "bg-gray-200"
        )}>
            {desc}
        </div>
    );
};

export default ChatItem;