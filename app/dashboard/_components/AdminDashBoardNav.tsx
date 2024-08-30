import Link from "next/link"


const LINKS = [
    {
        name: 'Dashboard',
        href: '/dashboard',
    },
    {
        name: 'Gigs',
        href: '/dashboard/gigs',
    },
    {
        name: 'Orders',
        href: '/dashboard/orders',
    },
    {
        name: 'Categories',
        href: '/admin/categories',
    },
]

const AdminDashBoardNav = () => {
    return (
        <>
            {
                LINKS.map((link) => (
                    <Link key={link.name} href={link.href}>
                        {link.name}
                    </Link>
                ))
            }
        </>
    )
}

export default AdminDashBoardNav