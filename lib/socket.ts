"use client";
import { io } from "socket.io-client";

// export const socket = io("http://192.168.1.5:8800/user-namespace");
export const socket = io(
  "https://demodeploy-1-mna0.onrender.com/user-namespace"
);
