import Image from "next/image"
import Link from "next/link"

export const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className="items-center  lg:flex">
                <Image src="/logo.svg" alt="Logo" height={54} width={54} />

            </div>
        </Link>
    )
}