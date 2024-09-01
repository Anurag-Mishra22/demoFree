"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { WandSparkles } from "lucide-react"
import Link from "next/link"
import ShimmerButton from "./ui/ShimmerButton"
import RecorderForm from "./forms/recorder-form"
import aiSearchData from "@/hooks/aiSearch-data"

export function AiSearchTab() {
    const aiData = aiSearchData((state) => state.item)
    return (
        <Card className="w-[500px] ">
            <CardHeader>
                <CardDescription>RECOMMENDED FOR YOU</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex  items-center gap-x-6">
                    <div className="flex items-center w-full flex-1 gap-x-4 ">
                        <span className="bg-gray-300/40 rounded-full p-4"><WandSparkles className="size-4" /></span>

                        <Input value={aiData} className="flex-1 flex " />

                    </div>
                    <RecorderForm />
                    <Link href="/matching">
                        {/* <ShimmerButton className="shadow-2xl" background="#3b82f6" borderRadius="20px" >
                            <span className="whitespace-pre-wrap text-center text-xs font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                Find Matching
                            </span>
                        </ShimmerButton> */}

                    </Link>
                </div>
            </CardContent>

        </Card>
    )
}
