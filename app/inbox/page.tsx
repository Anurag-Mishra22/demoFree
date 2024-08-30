
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
const InboxPage = () => {
    return (
        <Card className="w-full">
            <CardContent>
                <div className="flex flex-col  items-center justify-center">
                    <Image
                        src='https://utfs.io/f/3cc3e02d-5fe6-4231-8263-39fa2c0d98f4-hushqf.png'
                        width={300}
                        height={300}
                        alt='inbox'
                    />
                    <div className="flex flex-col items-center justify-center gap-y-4">
                        <p className="text-xl md:text-3xl font-bold ">
                            Ah, a fresh new inbox
                        </p>

                        <div className=" flex flex-col items-center">
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm flex items-center ">You haven’t started any conversations yet,</p>
                            <p className="text-zinc-600 inde dark:text-zinc-400 text-sm flex items-center ">but when you do, you’ll find them here.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default InboxPage