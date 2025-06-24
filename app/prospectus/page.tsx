import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Separator } from "@/components/ui/separator"


export default async function ProspectusPage() {

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-10">
                <h1 className="text-4xl font-bold mb-6">prospectus</h1>
                <Separator className="mb-8" />
                <h2> Nothing to Show </h2>

            </main>
            <Footer />
        </div>
    )
}
