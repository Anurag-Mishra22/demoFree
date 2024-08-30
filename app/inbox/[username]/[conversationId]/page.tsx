import React from 'react';
import ChatInput from './chat-input';
import ChatMessages from './chat-messages';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const ConversationPage = ({ params }: { params: { username: string, conversationId: string } }) => {
    const { username, conversationId } = params;

    console.log(username, conversationId); // Logs the dynamic route parameters

    return (
        <Card className="w-full">
            <CardContent>
                <div className='flex flex-col h-full'>
                    <div className='flex-1'>
                        <h3 className='text-xl font-bold'>Conversation with {username}</h3>
                    </div>
                    <div className='flex-1'>
                        Future Messages for Conversation ID: {conversationId}
                        <ChatMessages />
                    </div>
                    <ChatInput conversationId={conversationId} placeholder='Type message....' />
                </div>
            </CardContent>
        </Card>

    );
};

export default ConversationPage;