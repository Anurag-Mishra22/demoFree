"use client"
// import { PatientFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'


import { useRouter } from 'next/navigation';
import { z } from 'zod';

// import SubmitButton from '../SubmitButton';
import { Form, FormControl } from '../ui/form';
import { useForm } from 'react-hook-form';

import { Label } from '../ui/label';
import Image from 'next/image';
import { SelectGroup, SelectItem, SelectLabel } from '../ui/select';
import CustomFormField, { FormFieldType } from '../customForm-field';
import FileUpload from '../file-upload';
import { ReviewValidationSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '@/features/auth/newRequest';
import toast from 'react-hot-toast';
// import { FileUploader } from '../FileUploader';
// import { registerPatient } from '@/lib/actions/patient.actions';


const ReviewForm = ({ gigId }: { gigId: string }) => {
    const [rating, setRating] = useState(3);
    const [submitted, setSubmitted] = useState(false);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (review: z.infer<typeof ReviewValidationSchema>) => {
            return newRequest.post('/reviews', review, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        },
        onSuccess: () => {
            // queryClient.invalidateQueries('gigs');
            toast.success('Review Created Successfully');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to create Review');
        }
    })

    const onSelectStar = (index: number) => {
        setRating(index + 1);
        // console.log(rating);
    };


    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof ReviewValidationSchema>>({
        resolver: zodResolver(ReviewValidationSchema),
        defaultValues: {
            gigId: '',
            userId: '',
            star: 3,
            desc: ''
        },
    });

    const onSubmit = async (values: z.infer<typeof ReviewValidationSchema>) => {
        const user = JSON.parse(localStorage.getItem('currentUser')!);
        // setIsLoading(true);

        // console.log(values);
        // console.log(rating);


        try {
            const review = {
                ...values,
                gigId,
                star: rating,
                userId: user._id
            }
            mutation.mutate(review);
            // console.log(review);

        } catch (error) {
            console.log(error);
        }

        // setIsLoading(false);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">

                <section className=" space-y-6">
                    <div className='mb-9 space-y-2'>
                        <h2 className="sub-header">Send us your Review</h2>
                        {/* <p className='para '>Keep it short and simple - this will help us match you to the right category.</p> */}
                    </div>

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="desc"
                        label='Review'
                        placeholder="Tell us what you think"

                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, index) => (
                                <StarIcon
                                    key={index}
                                    className={`h-5 w-5 cursor-pointer ${rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"
                                        }`}
                                    onClick={() => onSelectStar(index)}
                                />
                            ))}
                        </div>
                        <Button type="submit">Submit</Button>
                    </div>


                </section>





                {/* <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton> */}
            </form>
        </Form>
    )
}

export default ReviewForm



export function StarIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}