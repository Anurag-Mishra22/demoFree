"use client";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export default function SocketOnConnect() {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [error, setError] = useState(null);

    // Extract username from localStorage
    const username = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("currentUser")!)?.username : null;

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
            // // Emit username inside an auth object if available
            if (username) {
                socket.emit("authenticate", { username });
            }
        }


        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, [username]);// Add username as a dependency

    return (
        <div>
            <p>Status: {isConnected ? "connected" : "disconnected"}</p>
            <p>Transport: {transport}</p>
            {error && <p>Error: {error}</p>}
        </div>
    );
}
