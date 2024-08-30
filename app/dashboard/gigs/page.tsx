import GigsTable from "@/components/table/gigs-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

const GigsPage = () => {
    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex items-center justify-end gap-x-2">
                    <Link href="/dashboard/gigs/add">
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Add Gig</span>
                    </Link>
                </Button>

            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Gigs</CardTitle>
                        <CardDescription>Manage your gigs in a simple and intuative way</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <GigsTable />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default GigsPage