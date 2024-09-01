import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import FileUpload from "./file-upload"
import MatchingForm from "./forms/matching-form"
import { Textarea } from "./ui/textarea"
import SearchForm from "./forms/search-form"

export function TabsDemo() {
    return (
        <Tabs defaultValue="account" className="w-[500px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">File Upload</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>FileUpload</CardTitle>
                        <CardDescription>
                            Upload the pdf file below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <FileUpload />
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="search">
                <Card>
                    {/* <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader> */}
                    <CardContent className="space-y-2">
                        {/* <MatchingForm /> */}
                        <SearchForm />
                    </CardContent>
                    <CardFooter>
                        <Button>Find Matching</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
