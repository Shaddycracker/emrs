import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {Separator} from "@/components/ui/separator"
import React from "react";

const assemblySchedules = [
    {
        "week": "I, III week",
        "schedule": [
            {
                "day": "Tuesday",
                "class_to_conduct_assembly": "6",
                "topic": "Moral value + Two English vocabulary words"
            },
            {
                "day": "Wednesday",
                "class_to_conduct_assembly": "7",
                "topic": "Any tradition/culture from any state + Two English vocabulary words"
            },
            {
                "day": "Thursday",
                "class_to_conduct_assembly": "8",
                "topic": "Indian heritage/history/geography + Two English vocabulary words"
            },
            {
                "day": "Friday",
                "class_to_conduct_assembly": "9A",
                "topic": "Science fact + Two English vocabulary words"
            },
            {
                "day": "Saturday",
                "class_to_conduct_assembly": "9B",
                "topic": "Sports drip + Two English vocabulary words"
            }
        ]
    },
    {
        "week": "II, IV week",
        "schedule": [
            {
                "day": "Tuesday",
                "class_to_conduct_assembly": "10A",
                "topic": "Moral value + Two English vocabulary words"
            },
            {
                "day": "Wednesday",
                "class_to_conduct_assembly": "10B",
                "topic": "Any tradition/culture from any state + Two English vocabulary words"
            },
            {
                "day": "Thursday",
                "class_to_conduct_assembly": "11A",
                "topic": "Indian heritage/history/geography + Two English vocabulary words"
            },
            {
                "day": "Friday",
                "class_to_conduct_assembly": "11B",
                "topic": "Science fact + Two English vocabulary words"
            },
            {
                "day": "Saturday",
                "class_to_conduct_assembly": "11C",
                "topic": "Sports drip + Two English vocabulary words"
            }
        ]
    }
]


export default async function Page() {

    return (
        <div className="min-h-screen bg-background">
            <Navbar/>
            <main className="container mx-auto py-10 flex-grow">
                <h1 className="text-4xl font-bold mb-6">Assembly Schedules</h1>
                <Separator className="mb-8"/>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    {assemblySchedules.length > 0 ? (
                        <div className="overflow-x-auto shadow-lg rounded-xl">
                            <table className="w-full min-w-[600px] divide-y divide-blue-200 dark:divide-blue-700 bg-white dark:bg-gray-800 rounded-xl">
                                <thead className="bg-blue-700 dark:bg-blue-900 text-white dark:text-blue-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-xl">Week</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Day</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Class to Conduct Assembly</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider rounded-tr-xl">Topic</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {assemblySchedules.map((weekData, weekIndex) => (
                                    // Using React.Fragment to group rows without adding extra DOM nodes
                                    <React.Fragment key={weekIndex}>
                                        {weekData.schedule.map((daySchedule, dayIndex) => (
                                            <tr key={`${weekIndex}-${dayIndex}`} className="hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200">
                                                {/* Render the 'Week' cell only for the first row of each week's schedule */}
                                                {dayIndex === 0 ? (
                                                    <td
                                                        rowSpan={weekData.schedule.length} // Make this cell span across all rows for this week
                                                        className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-800 dark:text-blue-300 border-r border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 align-top"
                                                    >
                                                        {weekData.week}
                                                    </td>
                                                ) : null}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{daySchedule.day}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{daySchedule.class_to_conduct_assembly}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{daySchedule.topic}</td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-10">No assembly schedules available.</p>
                    )}
                </div>
            </main>

            <Footer/>
        </div>
    )
}

