"use client"
export const dynamic = "force-dynamic"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { getAboutUs } from "@/firebase/AboutUs/About"

export default async function AboutPage() {
    const item = await getAboutUs()

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-10 px-4">


                {
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold text-primary mb-2">About the School</h2>
                            <p className="text-muted-foreground leading-relaxed">{item.about}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-primary mb-2">Location</h2>
                            <p className="text-muted-foreground leading-relaxed">{item.location}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-primary mb-2">Administrative Setup</h2>
                            <p className="text-muted-foreground leading-relaxed">{item.administrative}</p>
                        </section>
                    </div>
                }
            </main>
            <Footer />
        </div>
    )
}
