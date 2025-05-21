"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTopAchievers } from "@/firebase/Achivers/Achivers"
import { Achiever } from "@/firebase/types/types"

export default function Achievers() {
    const [achievers, setAchievers] = useState<Achiever[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAchievers = async () => {
            try {
                const topAchievers = await getTopAchievers(3)
                setAchievers(topAchievers)
            } catch (error) {
                console.error("Error fetching achievers:", error)
                setAchievers([
                    {
                        id: "1",
                        name: "Rahul Sharma",
                        achievement: "CBSE Topper 2023",
                        imageUrl: "/placeholder.svg?height=300&width=300",
                        session: "2023",
                        class: "",
                        percentage: 90,
                    },
                    {
                        id: "2",
                        name: "Priya Singh",
                        achievement: "Science Olympiad Gold Medalist",
                        imageUrl: "/placeholder.svg?height=300&width=300",
                        session: "2023",
                        class: "",
                        percentage: 95,
                    },
                    {
                        id: "3",
                        name: "Amit Kumar",
                        achievement: "National Sports Champion",
                        imageUrl: "/placeholder.svg?height=300&width=300",
                        session: "2022",
                        class: "",
                        percentage: 88,
                    },
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchAchievers()
    }, [])

    return (
        <section className="rounded-xl p-6 md:h-64">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">🏆 Top Achievers</h2>
                <Button asChild variant="outline">
                    <Link href="/achievers">View All</Link>
                </Button>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse h-24" />
                    ))}
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center items-center md:justify-start md:items-start">

                    {achievers.map((achiever) => (
                        <Link href={`/achievers/${achiever.id}`} key={achiever.id}>
                            <Card className="p-4 flex gap-4 w-64 md:w-96 items-center hover:shadow-lg transition-shadow">
                                <img
                                    src={achiever.imageUrl}
                                    alt={achiever.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{achiever.name}</h3>
                                    <p className="text-sm ">{achiever.achievement}</p>
                                    <p className="text-xs mt-1">Session: {achiever.session}</p>
                                    <Badge className="mt-1">
                                        {achiever.percentage}%
                                    </Badge>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}
