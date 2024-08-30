"use client"

import { redirect } from "next/navigation";
import AdminDashBoardNav from "./_components/AdminDashBoardNav";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
    // const { getUser } = getKindeServerSession();
    // const user = await getUser();
    // if (!user || user.email != process.env.ADMIN_EMAIL) {
    //     return redirect("/");
    // }
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    if (!currentUser || currentUser.isSeller === false) {
        return redirect("/");
    }
    return (
        <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
                <nav className=" font-medium md:flex md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <AdminDashBoardNav />
                </nav>
            </header>
            <main className="my-5">
                {children}
            </main>
        </div>
    )
}