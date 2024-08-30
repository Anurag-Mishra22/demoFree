"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

import { useBulkDeleteCategories } from "@/features/pay/use-pay";
import { Header } from "@/components/header/header";

export default function PaymentSuccess({ params }: { params: any }) {
    const [hasMutated, setHasMutated] = useState(false); // Local state to manage mutation status
    const payIt = useBulkDeleteCategories();
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            try {
                const response = await fetch(`http://localhost:8800/api/orders/${params.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        paymentIntent: params.paymentIntent,
                        currentUser
                    }),
                });

                // Handle specific error status codes
                if (response.status === 400) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Bad Request: The server could not understand the request.");
                }

                if (response.status === 401) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Unauthorized: You are not authorized to perform this action.");
                }

                if (response.status === 403) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Forbidden: Access to this resource is denied.");
                }

                if (response.status === 404) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Not Found: The requested resource could not be found.");
                }

                if (response.status === 500) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Internal Server Error: An error occurred on the server.");
                }

                if (!response.ok) {
                    throw new Error("Request failed");
                }

                const data = await response.json();
                return data;

            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            if (!hasMutated) {
                setHasMutated(true);
                // toast.success("Order completed successfully");
            }
        },
        onError: (error) => {
            if (!hasMutated) {
                setHasMutated(true);
                console.error("Error completing order:", error);
                toast.error("Failed to complete order");
            }
        }
    });

    useEffect(() => {
        if (params.paymentIntent && !hasMutated) {
            mutation.mutate();
            setTimeout(() => {
                router.push("/myOrders");
            }, 5000);
        }
    }, []);

    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
            <div className="mb-10">
                <Header />
                <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
                <h2 className="text-2xl">You successfully sent</h2>
                <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
                    ₹{params.amount}
                </div>

            </div>
        </main>
    );
}