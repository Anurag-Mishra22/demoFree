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

export function MatchingTab() {
    return (
        <Card className="w-[500px] ">
            <CardHeader>
                <CardDescription>RECOMMENDED FOR YOU</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <div className="flex items-center gap-x-4">
                        <span className="bg-gray-300/40 rounded-full p-4"><WandSparkles className="size-4" /></span>
                        <div className="flex flex-col items-start">
                            <h2 className="text-base">Get matched with freelancers</h2>
                            <p className="text-sm">Create a brief and get custom offers.</p>
                        </div>
                    </div>
                    <Link href="/matching">
                        <ShimmerButton className="shadow-2xl" background="#fed45f" borderRadius="20px" >
                            <span className="whitespace-pre-wrap text-black text-center text-xs font-medium leading-none tracking-tight  dark:from-white dark:to-slate-900/10 lg:text-lg">
                                Find Matching
                            </span>
                        </ShimmerButton>
                    </Link>
                </div>
            </CardContent>

        </Card>
    )
}
