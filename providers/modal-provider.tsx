'use client';


import { MessageFileModal } from '@/components/modals/message-file-modal';
import { useState, useEffect } from 'react';


export function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <MessageFileModal />
        </>
    );
}