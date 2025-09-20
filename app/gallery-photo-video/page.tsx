"use client"
export const dynamic = "force-dynamic"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAllGalleryVideos } from "@/firebase/Video-Gallery/Gallery"; // Assuming this path
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";
import { GalleryVideo } from "@/firebase/types/types"; // Import the GalleryVideo type
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component

export default async function VideoPage() {
    // In a real application, you'd likely manage loading state with useState and useEffect
    // For a simple async page component like this, Next.js handles the suspense/loading
    // based on data fetching. However, if you want to explicitly show a skeleton
    // while data is being fetched on the server (e.g., if you're using Suspense boundaries),
    // or if this were a client-side component fetching data, you'd manage 'loading' state.
    // For now, we'll simulate the loading state for demonstration.

    const videos: GalleryVideo[] = await getAllGalleryVideos();

    // A simple way to check if data is "loading" for an async component
    // If 'videos' is an empty array initially, we can show the skeleton.
    // In a real-world scenario with client-side fetching, 'loading' would be a state.
    const isLoading = videos.length === 0;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-10">
                <h1 className="text-4xl font-bold mb-6">School Videos</h1>
                <Separator className="mb-8" />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {isLoading ? (
                        // Skeleton loading state
                        <>
                            {[...Array(6)].map((_, index) => ( // Display 6 skeleton cards as an example
                                <Card key={index} className="overflow-hidden">
                                    <div className="aspect-video relative w-full">
                                        <Skeleton className="absolute inset-0 w-full h-full" />
                                    </div>
                                    <CardHeader className="pb-3">
                                        <Skeleton className="h-6 w-3/4 mb-2" />
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Skeleton className="mr-1 h-3 w-3 rounded-full" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </>
                    ) : (
                        // Actual video content
                        videos.map((video) => (
                            <Card key={video.id} className="overflow-hidden">
                                <div className="aspect-video relative w-full">
                                    <iframe
                                        src={video.video_url}
                                        title={video.description}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    ></iframe>
                                </div>
                                <CardHeader className="pb-3">
                                    <CardTitle>{video.category}</CardTitle>
                                    <CardDescription className="flex items-center text-sm text-muted-foreground">
                                        <CalendarIcon className="mr-1 h-3 w-3" />
                                        {video.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
