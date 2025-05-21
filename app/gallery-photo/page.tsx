import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {getAllGalleryImages} from "@/firebase/Gallery/Gallery"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {CalendarIcon} from "lucide-react"
import {GalleryImage} from "@/firebase/types/types"
import Image from "next/image";

export default async function GalleryPage() {
    const gallery: GalleryImage[] = await getAllGalleryImages()

    return (
        <div className="min-h-screen bg-background">
            <Navbar/>
            <main className="container mx-auto py-10">
                <h1 className="text-4xl font-bold mb-6">School Gallery</h1>
                <Separator className="mb-8"/>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {gallery.map((image) => (
                        <Card key={image.id} className="overflow-hidden">
                            <div className="aspect-square relative">
                                <Image
                                    src={image.url || "/placeholder.svg?height=300&width=300"}
                                    alt={image.description}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardHeader className="pb-3">
                                <CardTitle>{image.category}</CardTitle>
                                <CardDescription className="flex items-center text-sm text-muted-foreground">
                                    <CalendarIcon className="mr-1 h-3 w-3"/>
                                    {image.description}
                                </CardDescription>
                            </CardHeader>

                        </Card>
                    ))}
                </div>
            </main>
            <Footer/>
        </div>
    )
}
