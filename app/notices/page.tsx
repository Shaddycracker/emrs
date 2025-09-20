"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getAllNotices } from "@/firebase/Notices/Notices"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon } from "lucide-react"
import { Notice } from "@/firebase/types/types"

export default async function NoticesPage() {
    const notices: (Notice & { id: string })[] = await getAllNotices()

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-10">
                <h1 className="text-4xl font-bold mb-6">School Notices</h1>
                <Separator className="mb-8" />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {notices.map((notice) => (
                        <Card key={notice.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <CardTitle>{notice.title}</CardTitle>
                                <CardDescription className="flex items-center text-sm text-muted-foreground">
                                    <CalendarIcon className="mr-1 h-3 w-3" />
                                    {notice.date.toDate().toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <p>{notice.content }</p>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/50 px-6 py-3">
                                <p className="text-xs text-muted-foreground">
                                    Posted by: {notice.postedBy || "Admin"}
                                </p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
