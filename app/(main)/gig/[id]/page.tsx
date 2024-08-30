"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CheckCircle, MapPinIcon, Recycle, Watch } from 'lucide-react'
import React from 'react'
import UserLogo from '../_components/user-logo'
import { ImageCarousel } from '../_components/image-carousel'
import AddReview from '../_components/add-review'
import ReviewSection from '../_components/review-section'
import MessageSection from '../_components/message.-section'

import { useQuery } from "@tanstack/react-query";
import newRequest from '@/features/auth/newRequest'
import { cn } from '@/lib/utils'
import UserInfo from './user-info'
import { RenderContent } from './render-content'
import { useRouter } from 'next/navigation'



const contentObject = {
    content: [
        {
            type: "heading",
            attrs: {
                level: 1
            },
            content: [
                {
                    type: "text",
                    text: "Hello there"
                }
            ]
        },
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "my name is anrag"
                }
            ]
        }
    ],
    type: "doc"
};


const GigPage = ({ params: { id } }: SearchParamProps) => {
    console.log("ID", id)
    const router = useRouter()

    const { isLoading, error, data: gigData } = useQuery({
        queryKey: ["gig"],
        queryFn: () =>
            newRequest.get(`/gigs/single/${id}`).then((res) => {
                return res.data;
            }),
    });
    console.log("DATA", gigData)

    const { isLoading: isLod, error: err, data: sellerData } = useQuery({
        queryKey: ["sellerData"],
        queryFn: () =>
            newRequest.get(`/seller/${gigData.email}`).then((res) => {
                return res.data;
            }),
    });
    console.log("SELLER DATA", sellerData)
    return (
        <div className='flex py-12 pr-6 justify-between gap-x-2 '>
            <section className='flex flex-1'>
                <Card className='w-full'>
                    <CardHeader>
                        <h2 className="sub-header">{gigData?.title}</h2>
                        {/* <p className='para '>Keep it short and simple - this will help us match you to the right category.</p> */}
                    </CardHeader>
                    <CardContent >
                        {/* User ................ */}
                        <UserInfo sellerData={sellerData} />

                        {/* Image ............... */}
                        <div className='flex items-center justify-center mt-4'>
                            <ImageCarousel />
                        </div>
                        {/* About Gig */}
                        <RenderContent descJson={gigData?.descJson} />
                        {/* <section className='mt-6'>
                            <h2 className='sub-header'>About This Gig</h2>
                            <p className='text-sm mt-2 text-[#74767e]'>Looking for a sleek, modern, and fully responsive one-page website? You're in the right place! I specialize in creating stunning one-page websites that capture your brand’s essence while ensuring a seamless user experience. Whether you're launching a startup, showcasing a portfolio, or promoting an event, I'll design a visually appealing and highly functional site that meets your needs.</p>
                        </section>
                        <section className='mt-6'>
                            <h2 className='sub-header'>Package Include</h2>
                            <p className='text-sm mt-2 text-[#74767e]'>
                                Unique web design
                            </p>
                            <p className='text-sm mt-2 text-[#74767e]'>
                                Top Quality
                            </p>
                            <p className='text-sm mt-2 text-[#74767e]'>
                                Revisions
                            </p>
                            <p className='text-sm mt-2 text-[#74767e]'>
                                7 Day delivery
                            </p>
                        </section>
                        <section className='mt-6'>
                            <h2 className='sub-header'>Final file delivery</h2>
                            <p className='text-sm mt-2 text-[#74767e]'>
                                Adobe XD or Figma
                            </p>
                            <p className='text-sm mt-2 text-[#74767e]'>
                                Mobile version
                            </p>
                            <p className='text-sm mt-2 text-[#74767e]'>
                                All images, fonts, icons, and source files
                            </p>
                        </section> */}
                        <section className='mt-6'>
                            <h2 className='sub-header'>Reviews</h2>
                            <AddReview gigId={id} />
                            <div className='flex flex-col gap-y-3 mt-4'>
                                <ReviewSection />
                                <ReviewSection />
                                <ReviewSection />
                                <ReviewSection />
                                <ReviewSection />
                            </div>
                        </section>

                    </CardContent>
                </Card>
            </section>
            <section>
                <Card className='w-[400px]'>
                    <CardHeader>
                        <h2 className="sub-header">{gigData?.shortTitle}</h2>
                        <p className='para '>{gigData?.shortDesc}</p>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-y-6'>
                        <div className='flex justify-between'>
                            <span>₹{gigData?.price}</span>
                            <div className='flex gap-x-2 items-center'>
                                <Watch className='size-4' />
                                <span>{gigData?.deliveryTime} Days Delivery</span>
                            </div>

                            <div className='flex gap-x-2 items-center'>
                                <Recycle className='size-4' />
                                <span>{gigData?.revisionNumber} Revisions</span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            {
                                gigData?.features?.map((item: any) => (
                                    <div className='flex gap-x-2 items-center'>
                                        <CheckCircle className='size-4' />
                                        <span>{item}</span>
                                    </div>
                                ))
                            }

                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => router.push(`/payment/${id}/${gigData.price}`)}>Order Now</Button>
                    </CardFooter>
                </Card>
            </section>
        </div>
    )
}

export default GigPage