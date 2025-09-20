// app/staff/page.tsx or src/pages/staff.tsx
"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {Separator} from "@/components/ui/separator"
import {getAllStaff} from "@/firebase/staff/staff"
import type {Staff} from "@/firebase/types/types"

export default async function StaffPage() {
    const staffList: Staff[] = await getAllStaff()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar/>

            <main className="container mx-auto py-10 flex-grow">
                <h1 className="text-4xl font-bold mb-6">School Staff</h1>
                <Separator className="mb-8"/>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    {staffList.length > 0 && <table className="w-full min-w-[600px] divide-y divide-gray-200">
                        <thead className="">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Photo</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Designation</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Employee Code</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date of Join</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {staffList.map((staff) => (
                            <tr key={staff.id} className="">
                                <td className="px-6 py-4">
                                    <img
                                        src={staff.imageUrl}
                                        alt={staff.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800">{staff.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{staff.Designation}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{staff.employeeCode}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {staff.dateOfJoin.toDate().toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>}
                </div>
            </main>

            <Footer/>
        </div>
    )
}
