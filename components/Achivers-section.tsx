'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Card, CardContent} from '@/components/ui/card';
import {getTopAchievers} from '@/firebase/Achivers/Achivers';
import {Achiever} from '@/firebase/types/types';
import {Badge} from '@/components/ui/badge';

export default function Achievers() {
    const [achievers, setAchievers] = useState<Achiever[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievers = async () => {
            try {
                const topAchievers = await getTopAchievers(3);
                setAchievers(topAchievers);
            } catch (error) {
                console.error("Error fetching achievers:", error);
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
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchAchievers();
    }, []);

    return (
        <section className="h-full flex flex-col">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">🏆 Top Achievers</h2>
                <Link href="/achievers" className="text-blue-500 hover:underline font-medium">
                    View All
                </Link>
            </div>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({length: 4}).map((_, i) => (
                            <Card key={i} className="relative overflow-hidden animate-pulse">
                                <div className="aspect-w-3 aspect-h-4 bg-muted rounded-md"></div>
                                <CardContent
                                    className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-muted rounded w-1/2"></div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        achievers.map((achiever) => (
                            <Link href={`/achievers/${achiever.id}`} key={achiever.id}>
                                <Card
                                    className="relative overflow-hidden transition-all duration-300 group rounded-lg shadow-lg cursor-pointer">
                                    {/* Image */}
                                    <div className="relative w-full h-64">
                                        {achiever.imageUrl ? <Image
                                                src={achiever.imageUrl}
                                                alt={achiever.name}
                                                fill
                                                className="object-cover transition-opacity duration-300 group-hover:opacity-75 rounded-t-lg"
                                            /> :
                                            <Image
                                                src="https://placehold.co/600x400?text=No+Image"
                                                alt={achiever.name}
                                                fill
                                                className="object-cover transition-opacity duration-300 group-hover:opacity-75 rounded-t-lg"
                                            />
                                        }
                                    </div>

                                    {/* Content */}
                                    <CardContent className="p-4 bg-black bg-opacity-70 text-white relative z-10">
                                        <h3 className="text-lg font-semibold">{achiever.name}</h3>
                                        {/*<p className="text-sm">{achiever.achievement}</p>*/}
                                        {/*<div className="text-xs mt-1">*/}
                                        {/*    <span>Session: {achiever.session}</span>*/}
                                        {/*    <Badge className="ml-2">{achiever.percentage}%</Badge>*/}
                                        {/*</div>*/}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
