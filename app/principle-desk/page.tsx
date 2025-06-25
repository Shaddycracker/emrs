"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getPrincipleDesk } from "@/firebase/principleDesk/principleDesk"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { PrincipleDesk } from "@/firebase/types/types"

export default function PrincipleDeskPage() {
    const [loading, setLoading] = useState(true)
    const [principal, setPrincipal] = useState<PrincipleDesk | null>(null)

    useEffect(() => {
        const fetchPrincipal = async () => {
            try {
                const data = await getPrincipleDesk()
                setPrincipal(data[0] || null)
            } catch (error) {
                console.error("Error fetching principal:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPrincipal()
    }, [])

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="container py-10 px-4 space-y-10">
                <h1 className="text-3xl font-bold text-center">Principal's Desk</h1>
                <Separator className="my-6" />

                {loading ? (
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <Skeleton className="w-[250px] h-[250px] rounded-lg" />
                        <div className="space-y-4 flex-1 w-full">
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                ) : principal ? (
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="shrink-0">
                            <Image
                                src={principal.image}
                                alt="Principal"
                                width={250}
                                height={250}
                                className="rounded-lg shadow-md object-cover"
                            />
                        </div>

                        <div className="flex-1 space-y-4">
                            <h2 className="text-2xl font-semibold">{principal.name}</h2>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                {principal.about}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">Principal's message is not available at the moment.</p>
                )}
            </main>

            <Footer />
        </div>
    )
}
