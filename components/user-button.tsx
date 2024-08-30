"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import newRequest from "@/features/auth/newRequest";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
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
                            <Button className="rounded-xl shadow-lg hover:scale-105">
                                {currentUser.username}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-96">
                            <div>
                                <Button className="rounded-xl shadow-lg hover:scale-105" onClick={handleLogout}>
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