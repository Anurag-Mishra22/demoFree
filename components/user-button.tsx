"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import newRequest from "@/features/auth/newRequest";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
const UserButton = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await newRequest.post('/auth/logout');
            localStorage.setItem('currentUser', null!);
            router.push('/');
            router.refresh();
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Failed to logout');
        }
    }
    console.log(currentUser);
    return (
        <div>
            {
                currentUser ? (
                    <Popover >
                        <PopoverTrigger asChild>
                            <Image
                                src={cn(
                                    currentUser?.profilePicture || "https://utfs.io/f/2d7806fe-d61b-4ea9-aaac-284f9764ca8f-599egd.png"
                                )}
                                alt="Profile Picture"
                                width={40}
                                height={40}
                                className="rounded-full cursor-pointer"
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-56">
                            <div className="flex flex-col gap-y-2">
                                <p>{currentUser?.username}</p>
                                <Button variant="ghost" className="" onClick={() => router.push("/dashboard")}>

                                    DashBoard
                                </Button>
                                <Button className="" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <div className="flex items-center gap-x-2">
                        <Link href="/login">
                            <Button className="rounded-xl shadow-lg hover:scale-105">
                                Login
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="rounded-xl shadow-lg hover:scale-105">
                                Register
                            </Button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default UserButton