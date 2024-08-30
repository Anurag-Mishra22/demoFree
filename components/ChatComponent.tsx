

import { useChat } from 'ai/react';
import axios from 'axios';
import React from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
type Props = { chatId: number };
const ChatComponent = async ({ chatId }: Props) => {


    const responseData = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId }),
    })

    const data = await responseData.json()
    // console.log(data);


    // const { input, handleInputChange, handleSubmit, messages } = useChat({
    //     api: "/api/chat",
    //     body: {
    //         chatId,
    //     },

    // });
    // console.log(messages);
    return (
        <div>
            {/* <form
                onSubmit={handleSubmit}
                className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white"
            >
                <div className="flex">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask any question..."
                        className="w-full"
                    />
                    <Button className="bg-blue-600 ml-2">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form> */}

            {/* {data.content} */}
            <h1>{data.response.content}</h1>
        </div>
    )
}

export default ChatComponent