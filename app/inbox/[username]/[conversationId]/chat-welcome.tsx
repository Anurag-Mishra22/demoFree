import { Hash } from 'lucide-react'
import React from 'react'

const ChatWelcome = () => {
    return (
        <div className='space-y-2 px-4 mb-4'>
            <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
                <Hash className="h-12 w-12 text-white" />
            </div>
            <p className="text-xl md:text-3xl font-bold">
                This is demo

            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                This is demoji

            </p>
        </div>
    )
}

export default ChatWelcome 