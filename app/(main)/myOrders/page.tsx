import OrdersTable from "@/components/table/manageOrder-table"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const MyOrdersPage = () => {
    return (
        <>

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Orders</CardTitle>
                        <CardDescription>Manage your orders in a simple and intuative way</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <OrdersTable />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default MyOrdersPage