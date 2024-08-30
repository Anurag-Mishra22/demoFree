"use client"
import dynamic from 'next/dynamic'
import Quill from 'quill';
import { useRef } from 'react';
import MessageBox from './message-box';

const Editor = dynamic(() => import("@/components/editor"), { ssr: false })


interface ChatInputProps {
    placeholder?: string;
    conversationId: string;
}


const ChatInput = ({
    placeholder,
    conversationId
}: ChatInputProps) => {
    const editorRef = useRef<Quill | null>(null);
    return (
        <div className='px-5 w-full'>
            {/* <Editor variant='create'
                placeholder={placeholder}
                onSubmit={() => { }}
                disabled={false}
                innerRef={editorRef}
            /> */}

            <MessageBox conversationId={conversationId} />

        </div>
    )
}

export default ChatInput