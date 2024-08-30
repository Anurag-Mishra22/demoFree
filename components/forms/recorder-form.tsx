'use client';

import Image from "next/image";
import { SettingsIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

import Recorder from "../recorder/Recorder";
import transcript from "@/actions/transcript";
import { useStore } from "zustand";
import aiSearchData from "@/hooks/aiSearch-data";

const initialState = {
    sender: "",
    response: "",
    id: "",
}

export type Message = {
    sender: string;
    response: string;
    id: string;
}

export default function RecorderForm() {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const submitButtonRef = useRef<HTMLButtonElement | null>(null);
    const [state, formAction] = useFormState(transcript, initialState);
    const [messages, setMessages] = useState<Message[]>([]);
    const setAiData = aiSearchData((state) => state.setFileItem)

    useEffect(() => {
        if (state.response) {
            setAiData(state.response.text);
            console.log("state", state);
            setMessages((messages) => [
                {
                    sender: state.sender || "",
                    response: state.response || "",
                    id: state.id || "",
                },
                ...messages,
            ])
        }
    }, [state])

    const uploadFile = (blob: Blob) => {
        const file = new File([blob], "video.mp4", { type: "video/mp4" });
        console.log("file", file);

        // Set the file as the value in the hidden input file field
        if (fileRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileRef.current.files = dataTransfer.files;

            if (submitButtonRef.current) {
                submitButtonRef.current?.click();
            }
        }
    }

    console.log(messages);

    return (
        <main className="  ">


            <form action={formAction} className="flex flex-col items-center ">


                <input type="file" name="video" hidden ref={fileRef} />
                <button type="submit" hidden ref={submitButtonRef} />

                <div className="   rounded-t-3xl">
                    <Recorder uploadFile={uploadFile} />
                </div>

            </form>
        </main>
    );
}
