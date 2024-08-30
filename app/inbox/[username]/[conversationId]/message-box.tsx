"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Plus, Smile } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal.store';
import { EmojiPicker } from '@/components/emoji-picker';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '@/features/auth/newRequest';
import toast from 'react-hot-toast';

const MessageBox = ({ conversationId }: { conversationId: string }) => {
    const queryClient = useQueryClient();
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);

    const mutation = useMutation({
        mutationFn: (message: any) => {
            return newRequest.post(`/messages`, message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });

            toast.success("Message sent successfully");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Failed to send message");
        }
    });

    const { onOpen } = useModal();
    const router = useRouter()
    const formSchema = z.object({
        desc: z.string().min(1)
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            desc: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        console.log(value.desc)
        console.log(conversationId)

        try {
            mutation.mutate({
                conversationId,
                desc: value.desc,
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to send message");
        }
        form.reset()
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='relative p-4 pb-6'>
                                    <button
                                        type="button"
                                        onClick={() => onOpen("messageFile")}
                                        className='absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 tranition rounded-full p-1 flex items-center justify-center'>

                                        <Plus className='text-white dark:text-[#313338]' />
                                    </button>
                                    <Input
                                        disabled={isLoading}
                                        className='px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200'
                                        placeholder={'Type a message.....'}
                                        {...field}
                                    />
                                    <div className='absolute top-7 right-8'>
                                        <EmojiPicker
                                            onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}

                />
            </form>

        </Form>
    )
}

export default MessageBox