import ChatComponent from "@/components/ChatComponent"
import { useChat } from "ai/react";


type Props = {
    params: {
        chatId: string;
    };
};


const ChatPage = async ({ params: { chatId } }: Props) => {

    // const { messages } = useChat({
    //     api: '/api/chat',
    //     body: {
    //         chatId
    //     }
    // },
    // )

    return (
        <div>
            <h3 className="text-xl font-bold">Chat</h3>
            <ChatComponent chatId={parseInt(chatId)} />
        </div>
    )
}

export default ChatPage 