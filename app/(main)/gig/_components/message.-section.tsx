import MessageForm from "@/components/forms/message-form";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


const MessageSection = () => {
    return (
        <div>
            <Popover >
                <PopoverTrigger asChild>
                    <Button className="rounded-xl shadow-lg hover:scale-105">
                        <MessageCircleIcon className="mr-2 h-5 w-5" />
                        Contact Me
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96">
                    <div>
                        <MessageForm />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default MessageSection




function MessageCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-message-circle"
        >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    );
}