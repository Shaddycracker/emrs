"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

import {Separator} from "@/components/ui/separator"

export default function ObjectivePage() {


    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar/>

            <main className="container py-10 px-4 space-y-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-left">
                        <h2 className="text-2xl font-bold mb-4">Objectives & Structure</h2>
                        <Separator className="my-6"/>

                        <h3 className="text-xl font-semibold mb-2">The Objective of EMRS</h3>
                        <p className="mb-4">
                            The objective of EMRS is to provide quality middle and high-level education to Scheduled
                            Tribe (ST) students in remote areas. This is not only to enable them to avail of
                            reservations in higher and professional educational courses and jobs in government, public,
                            and private sectors, but also to have access to the best opportunities in education at par
                            with the non-ST population.
                        </p>

                        <p className="mb-4">This would be achieved by:</p>
                        <ul className="list-disc list-inside mb-6 space-y-2">
                            <li>
                                Comprehensive physical, mental, and socially relevant development of all students
                                enrolled in each and every EMRS. Students will be empowered to be change agents,
                                beginning in their school, in their homes, in their villages, and finally in a larger
                                context.
                            </li>
                            <li>
                                Focusing differentially on the educational support to be made available to those in
                                Standards XI and XII, and those in Standards VI to X, so that their distinctive needs
                                can be met.
                            </li>
                            <li>
                                Supporting the annual running expenses in a manner that offers reasonable remuneration
                                to the staff and upkeep of the facilities.
                            </li>
                            <li>
                                Supporting the construction of infrastructure that provides for the educational,
                                physical, environmental, and cultural needs of student life.
                            </li>
                        </ul>

                        <h3 className="text-xl font-semibold mb-2">Structure of EMRSs</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                Admission to these schools will be through selection/competition with suitable provision
                                for preference to children belonging to Primitive Tribal Groups, first-generation
                                students, etc.
                            </li>
                            <li>
                                Sufficient land would be given by the State Government for the school, playgrounds,
                                hostels, residential quarters, etc., free of cost.
                            </li>
                            <li>
                                The number of seats for boys and girls will be equal.
                            </li>
                            <li>
                                In these schools, education will be entirely free.
                            </li>
                            <li>
                                Every class can have a maximum of 60 students, preferably in 2 sections of 30 students
                                each, and the total sanctioned strength of the school will be 480 students.
                            </li>
                            <li>
                                At the Higher Secondary level (class XI & XII), there will be three sections per class
                                for the three streams in Science, Commerce & Humanities. The maximum sanctioned strength
                                of each section may be 30 students. In case of a shortfall in a section, ST students
                                from other schools may be admitted as per the procedure mentioned in the first point.
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    )
}
