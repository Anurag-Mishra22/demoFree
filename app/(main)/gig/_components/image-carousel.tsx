import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function ImageCarousel() {
    const gigImages = [
        "https://utfs.io/f/b73e6439-260c-47f3-ad7b-94b05d32f2a9-2io.jpg",
        "https://utfs.io/f/b73e6439-260c-47f3-ad7b-94b05d32f2a9-2io.jpg"
    ]

    return (
        <Carousel className="w-[600px]">
            <CarouselContent>
                {gigImages.map((imageUrl, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex h-[400px] items-center justify-center p-6">
                                    <img src={imageUrl} alt={`Image ${index + 1}`} className="max-w-full max-h-full object-contain" />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}