
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, IndianRupee, PartyPopper, ShoppingBag, User2 } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ChartComp } from "./ChartComp";


export const OverViewCard = () => {
    return (
        <>
            <div className="grid gap-2 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total Budget</CardTitle>
                        <IndianRupee className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">10.00 Cr</p>
                        <p className="text-xs text-muted-foreground">Based on 100 charges</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xl">Total Vehicles </CardTitle>
                        <Car className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">50</p>
                        <p className="text-xs text-muted-foreground">Total Scheduled Vehicles</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xl">Servicing Vehicles</CardTitle>
                        <PartyPopper className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">37</p>
                        <p className="text-xs text-muted-foreground">Total  Vehicles Under Maintenance</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Total Employee</CardTitle>
                        <User2 className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">120</p>
                        <p className="text-xs text-muted-foreground">Total Employee in WorkStation</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4  md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>Recent transactions from your store</CardDescription>
                        <CardContent>
                            <ChartComp />
                        </CardContent>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transaction</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>GC</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1 ">
                                <p className="text-sm font-medium">Government of M.P</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+₹40,000</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>GC</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1 ">
                                <p className="text-sm font-medium">Auto Parts Supplier</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">-₹15,000</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>MC</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1 ">
                                <p className="text-sm font-medium">Municipal Corpuration</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+₹10,000</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>MC</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1 ">
                                <p className="text-sm font-medium">Municipal Corpuration</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+₹100,000</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>MC</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1 ">
                                <p className="text-sm font-medium">Municipal Corpuration</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+₹60,000</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarFallback>GC</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1 ">
                                <p className="text-sm font-medium">Government of M.P</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+₹60,000</p>
                        </div>

                    </CardContent>
                </Card>
            </div>

        </>
    )
}