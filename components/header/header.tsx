"use client"

import { Loader2 } from "lucide-react"
import { HeaderLogo } from "./header-logo"
import { Navigation } from "./navigation"
import UserButton from "../user-button"
import { InboxDropdown } from "./inbox-dropdown"
import { DockDemo } from "../DockDemo"


export const Header = () => {

    return (
        <header className="">
            {/* <DockDemo /> */}

            <div className="">
                {/* <DockDemo /> */}

                <div className=" flex items-center border-2 border-dashed rounded-2xl justify-between mb-6 mt-4 px-4 py-2 mx-12">
                    <div className="flex items-center lg:gap-x-6">
                        <HeaderLogo />
                        <Navigation />
                        <InboxDropdown />
                    </div>

                    <UserButton />

                </div>
                {/* <WelcomeMsg /> */}
            </div>
        </header>
    )
}

