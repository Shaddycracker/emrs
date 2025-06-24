'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {Faculty} from "@/firebase/types/types";
import {getfaculty} from "@/firebase/faculty/faculty";

interface FacultyCardProps {
    faculty: Faculty;
    loading: boolean;
}

const FacultyCard: React.FC<FacultyCardProps> = ({faculty,loading}) => {
    const [isHovered, setIsHovered] = useState(false)

    if (loading) {
        return (
            <Card className="relative overflow-hidden transition-all duration-300 group animate-pulse">
                <div className="aspect-w-3 aspect-h-4 relative bg-muted rounded-md"></div>
                <CardContent className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            className="relative overflow-hidden transition-all duration-300 group rounded-lg shadow-lg cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Section */}
            <div className="relative w-full h-64">
                <Image
                    src={faculty.imageUrl}
                    alt={faculty.name}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-75 rounded-t-lg"
                />
            </div>

            {/* Card Content */}
            <CardContent className="p-4 bg-black bg-opacity-70 text-white relative z-10">
                <h3 className="text-lg font-semibold">{faculty.name}</h3>
                <h4 className="text-blue-600 font-semibold">{faculty.position}</h4>
            </CardContent>


            {isHovered && faculty && (
                <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex flex-col items-center justify-center z-20 p-4 transition-opacity duration-300">
                    <p className="text-sm mb-2">{faculty.position}</p>
                    <Link href="/message" className="text-blue-400 hover:underline">
                        View Message
                    </Link>
                </div>
            )}
        </Card>

    );
};

interface FacultiesSectionProps {
    faculties: Faculty[];
    loading: boolean;
}

const FacultiesSection: React.FC<FacultiesSectionProps> = ({ faculties, loading }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {faculties.map((faculty, index) => (
                <FacultyCard key={index} faculty={faculty} loading={loading} />
            ))}
        </div>
    );
};

interface DemoFacultiesProps {
    // You might want to pass the faculty data as a prop here in a real scenario
}

const DemoFaculties: React.FC<DemoFacultiesProps> = () => {
    const [facultiesData, setFacultiesData] = useState<Faculty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchFaculty=async ()=>{
            try{
                const faculty= await getfaculty()
                console.log("faculty component :",faculty)
                setFacultiesData(faculty)
            }
            catch (err){
                console.error("Error fetching faculty:", err)
                setFacultiesData([
                    {
                        id:"1",
                        name: 'Upendra Nath Tiwari',
                        imageUrl: 'https://via.placeholder.com/300/0000FF/FFFFFF?Text=Upendra+Tiwari', // Replace with actual image URL
                        position: 'Principal of Eklavya Model Residential School, Behraich',
                    },
                    {
                        id:"2",
                        name: 'Faculty Member 3',
                        imageUrl: 'https://via.placeholder.com/300/00FF00/FFFFFF?Text=Faculty+3',
                        position: 'Teacher',
                    },
                    {
                        id:"3",
                        name: 'Faculty Member 4',
                        imageUrl: 'https://via.placeholder.com/300/FFFF00/000000?Text=Faculty+4',
                        position: 'Administrator',
                    },
                ])
            }finally {
                setLoading(false);
            }

        }
        fetchFaculty();

    }, []);

    return (
        <div className="py-12">

            <div className="container mx-auto px-4">
                {/*<h2 className="text-3xl font-bold mb-8">Community Partners</h2>*/}
                <FacultiesSection faculties={facultiesData} loading={loading}/>
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({length: 4}).map((_, i) => (
                            <Card key={i}
                                  className="relative min-h-30 overflow-hidden transition-all duration-300 group animate-pulse">
                                <div className="aspect-w-3 aspect-h-4 relative bg-muted rounded-md"></div>
                                <CardContent
                                    className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-muted rounded w-1/2"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemoFaculties;