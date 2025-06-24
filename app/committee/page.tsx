import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

const managementCommittee = [
    { name: "Ms. Monika Rani, IAS", designation: "District Magistrate Bahraich" },
    { name: "Mr. Mukesh Chandra, IAS", designation: "CDO Bahraich" },
    { name: null, designation: "Project Officer, ITDP, Bahraich" },
    { name: "Mr. Manoj Kumar Ahirwar", designation: "DIOS, Bahraich" },
    { name: "Mr. Ashok Kumar", designation: "DSWO, Bahraich" },
    { name: "Mr. Rajesh Babu", designation: "Principal I/C, JNV, Bahraich" },
    { name: "Mr. Nagendra Kumar", designation: "Principal, GIC, Bahraich" },
    { name: "Dr. Sanjay Kumar", designation: "CMO, Bahraich" },
    { name: "Mr. Upendra Nath Tiwari", designation: "Principal, EMRS Bahraich" },
];


export default async function Message() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background">
            <Navbar />
            <main className="container mx-auto py-12 px-4">
                <div className="space-y-16">
                    <Card className="border shadow-sm rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">Management Committee</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Sr. No.</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Designation</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {managementCommittee.map((member, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell>{member.name || '-'}</TableCell>
                                            <TableCell>{member.designation}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}
