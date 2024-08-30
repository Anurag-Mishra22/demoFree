"use client"

import GigForm from "@/components/forms/gig-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { UploadDropzone } from "@/lib/uploadthing"
import { ChevronLeft, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"


const AddGigPage = () => {
    const [image, setImage] = useState<string>("")

    const handleDelete = () => {
        setImage(prev => "");
    }
    return (
        <>
            <div className="flex items-center gap-4" >
                <Button size="icon" variant="outline" asChild>
                    <Link href="/dashboard/gigs">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">New Gig</h1>
            </div>
            <Card className="mt-5">
                {/* <CardHeader>
                    <CardTitle>Gig Detail</CardTitle>
                    <CardDescription>
                        In this form you can create gig
                    </CardDescription>
                </CardHeader> */}
                <CardContent className="mt-6">
                    <GigForm />
                </CardContent>
            </Card>
        </>
    )
}

export default AddGigPage






{/* <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input
                                type="text"
                                placeholder="Category" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Icon</Label>
                            {
                                image.length > 0 ? (
                                    <div className="flex relative w-[100px] h-[100px]">
                                        <Image
                                            height={100}
                                            width={100}
                                            src={image}
                                            alt="Product Image"
                                            className="w-full h-full object-cover rounded-lg border"
                                        />
                                        <button
                                            onClick={() => handleDelete()}
                                            type="button"
                                            className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                                            <XIcon className="w-3 h-3" />
                                        </button>
                                    </div>
                                ) : (
                                    // <UploadDropzone endpoint="categoryIcon"
                                    //     onUploadError={() => {
                                    //         alert("Upload error");
                                    //     }}
                                    //     onClientUploadComplete={(res) => {
                                    //         setImage(res.map((image) => image.url)[0]);

                                    //     }}
                                    // />
                                    <></>
                                )
                            }
                        </div>
                    </div> */}