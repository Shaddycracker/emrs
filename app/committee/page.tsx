"use client"
export const dynamic = "force-dynamic"
import { useEffect, useState } from "react"
import { getAllCommittees } from "@/firebase/commitee/commitee"
import { Committee } from "@/firebase/types/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { toast } from "@/hooks/use-toast"

export default function Message() {
    const [committees, setCommittees] = useState<Committee[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCommittees = async () => {
            try {
                const data = await getAllCommittees()
                setCommittees(data)
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load committee data",
                    variant: "destructive",
                })
            } finally {
                setLoading(false)
            }
        }

        fetchCommittees()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background">
            <Navbar />
            <main className="container mx-auto py-12 px-4">
                <div className="space-y-16">
                    <Card className="border shadow-sm rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                                Management Committee
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <p className="text-center text-muted-foreground">Loading committee members...</p>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Sr. No.</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Designation</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {committees.map((member, index) => (
                                            <TableRow key={member.id}>
                                                <TableCell className="font-medium">{index + 1}</TableCell>
                                                <TableCell>{member.name || '-'}</TableCell>
                                                <TableCell>{member.designation}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}
