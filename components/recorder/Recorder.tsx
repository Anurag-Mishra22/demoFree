'use client';

import { Mic, MicOff, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import RecordRTC from "recordrtc";

const images = {
    active: "/images/active.gif",
    inactive: "/images/notactive.png"
};

function Recorder({ uploadFile }: { uploadFile: (blob: Blob) => void }) {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [recorder, setRecorder] = useState<RecordRTC | null>(null);

    useEffect(() => {
        getMicrophonePermission();
    }, []);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,

                });
                setPermission(true);
                setStream(streamData);

                // Initialize RecordRTC with Video Recorder
                const newRecorder = new RecordRTC(streamData, {
                    type: 'video',
                    mimeType: 'video/webm',
                });
                setRecorder(newRecorder);
            } catch (error: any) {
                alert(error.message);
            }
        } else {
            alert("Your browser does not support MediaRecorder API");
        }
    }

    const startRecording = () => {
        if (recorder === null) return;

        setRecordingStatus("recording");
        recorder.startRecording();
    }

    const stopRecording = async () => {
        if (recorder === null) return;

        setRecordingStatus("inactive");
        recorder.stopRecording(() => {
            const videoBlob = recorder.getBlob();
            uploadFile(videoBlob);
        });
    }

    return (
        <div className="flex items-center justify-center text-white">
            {!permission && (
                <button onClick={getMicrophonePermission}>Get Microphone</button>
            )}

            {permission && recordingStatus === "inactive" && (
                // <Image
                //     src={images.inactive}
                //     alt="recording-icon-inactive"
                //     width={200}
                //     height={200}
                //     onClick={startRecording}
                //     priority={true}
                //     className="assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out"
                // />
                <div className="bg-gray-300/40 rounded-full p-4">
                    <MicOff className="size-5 cursor-pointer text-black hover:scale-110 duration-150 transition-all ease-in-out" onClick={startRecording} />
                </div>
            )}

            {recordingStatus === "recording" && (
                // <Image
                //     src={images.active}
                //     alt="recording-icon-active"
                //     width={200}
                //     height={200}
                //     onClick={stopRecording}
                //     priority={true}
                //     className="assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out"
                // />
                <div className="bg-gray-300/40 rounded-full p-4">
                    <Mic className="size-5 cursor-pointer text-black hover:scale-110 duration-150 transition-all ease-in-out" onClick={stopRecording} />
                </div>
            )}
        </div>
    )
}

export default Recorder;
