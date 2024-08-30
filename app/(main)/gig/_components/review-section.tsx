"use client"
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, ThumbsDown, ThumbsUp, Watch } from 'lucide-react'
import React, { useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { StarIcon } from '@/components/forms/review-form'

const ReviewSection = () => {
    const [rating, setRating] = useState(3);
    return (
        <>
            <Card>
                <CardContent>
                    <div className='flex flex-col gap-y-4'>
                        <div className='flex gap-x-4'>
                            <Avatar className="">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <p>Anurag Mishra</p>
                                <p>Germany</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {[...Array(5)].map((_, index) => (
                                    <StarIcon
                                        key={index}
                                        className={`h-5 w-5 cursor-pointer ${rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"
                                            }`}

                                    />
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-4'>
                            <p>Amazing experience! The one-page website exceeded my expectations. The design is clean, professional, and perfectly captures my brand. The responsiveness across devices is flawless, and the site loads incredibly fast. Communication was smooth, and the final product was delivered on time. Highly recommend for anyone looking for a top-quality website!</p>

                            <div className='flex gap-x-4'>
                                <span>Helpful?</span>
                                <div className='flex gap-x-3 items-center'>
                                    <div className='flex gap-x-1.5 items-center'>
                                        <ThumbsUp className='size-4 ' />
                                        <span>Yes</span>
                                    </div>
                                    <div className='flex gap-x-1.5 items-center'>
                                        <ThumbsDown className='size-4' />
                                        <span>Yes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ReviewSection