import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await fetch("http://localhost:8800/api/orders/66cd60e21b0e5cf3276c1fb9", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include", // Ensure cookies are included
                body: JSON.stringify({ paymentIntent: "pi_3PskcdSH1le5jb4Q1c3Cglyi" }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Response data:", data);
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                });

        },
        onSuccess: () => {
            toast.success("Order completed successfully");
        },
        onError: (error) => {
            console.error("Error completing order:", error);
            toast.error("Failed to complete order");
        }
    });
    return mutation;
};
