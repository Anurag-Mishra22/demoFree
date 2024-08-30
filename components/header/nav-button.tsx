import { cn } from "@/lib/utils";


import Link from "next/link";
import { Button } from "../ui/button";

type Props = {

    href: string;
    label: string;
    isActive: boolean;
}

export const NavButton = ({

    href,
    label,
    isActive
}: Props) => {
    return (
        <Button
            asChild

            size="sm"
            variant="outline"
            className={cn(
                "w-full lg:w-auto justify-between font-normal hover:bg-black/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none  focus:bg-white/30 transition",
                isActive ? "bg-white/10 " : "bg-transparent"
            )}
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}