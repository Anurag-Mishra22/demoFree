

import { Loader2 } from "lucide-react"
import { HeaderLogo } from "./header-logo"
import { Navigation } from "./navigation"
import UserButton from "../user-button"
import { InboxDropdown } from "./inbox-dropdown"


export const Header = () => {

    return (
        <header className="bg-gradient-to-r from-blue-600 to-violet-400 px-4 py-8 lg:px-14 pb-36">

            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center bg-white rounded-xl justify-between mb-14 px-4 py-2">
                    <div className="flex items-center lg:gap-x-16">
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

