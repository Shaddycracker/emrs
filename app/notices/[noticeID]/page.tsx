import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {
    CardFooter,
} from "@/components/ui/card"
import { notFound } from "next/navigation";
import {getNoticeById} from "@/firebase/Notices/Notices";
import { Separator } from "@/components/ui/separator"

interface NoticePageProps {
    params: { id: string };
}
export default async function NoticesOpen({ params }: NoticePageProps) {

    const notice = await getNoticeById(params.id);

    if (!notice) return notFound();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-10">
                <h1 className="text-4xl font-bold mb-6">{notice.title}</h1>
                <Separator className="mb-8" />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {notice.content}
                            <CardFooter className="border-t bg-muted/50 px-6 py-3">
                                <p className="text-xs text-muted-foreground">
                                    Posted by: {notice.postedBy || "Admin"}
                                </p>
                            </CardFooter>


                </div>
            </main>
            <Footer />
        </div>
    )
}
