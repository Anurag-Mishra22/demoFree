import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

type UserLogoProps = {
    src?: string
    alt?: string
}

const UserLogo = ({
    src = "https://github.com/shadcn.png",
    alt
}: UserLogoProps) => {
    return (
        <Avatar className="h-32 w-32">
            <AvatarImage src={src} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}

export default UserLogo