"use client"

import { Separator } from "@/components/ui/separator"
import React from 'react';
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AdmissionPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="container mx-auto py-10 px-4 space-y-10">
                <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="text-left w-full bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Admission Guidelines (NESTS)</h2>
                        <Separator className="my-6 bg-gray-200 dark:bg-gray-700" />

                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                            Admission to Eklavya Model Residential School is made through a district-level competitive examination, and tribal children are admitted at the class VI level. All children who have studied in and passed Class V from any recognized school and are bonafide residents of the district between 9 to 11 years of age are eligible to appear for the EMRS Entrance Test for class VI.
                        </p>

                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                            As per the Scheme, a maximum of 60 students can be admitted in class VI per year in an EMRS. However, in view of accommodation shortages, it is sometimes restricted to 30. Education in Eklavya Model Residential School is free of cost.
                        </p>

                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            Admissions to Eklavya Model Residential School, Nichar take place on the basis of a selection test designed and conducted by the Management of the School. The test, called the EMRS "Entrance-Test" for class 6th, is of a non-verbal nature, class-neutral, and designed to ensure that talented children from rural and tribal areas can compete without facing any disadvantages. Special care is taken to ensure children from far-flung rural areas get admission forms without any problem through sufficient publicity in local schools and villages.
                        </p>

                        <Separator className="my-8 bg-gray-200 dark:bg-gray-700" />

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Eligibility Conditions for Entrance Test
                            </h3>
                            <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                                <li>
                                    A candidate appearing for the Selection Test must be studying in Class V in a Government/Government-Aided or other recognized school in the just preceding academic session for which the Entrance Test is conducted. Actual admission in Class VI in the session is, however, subject to the condition of having passed Class V before admission.
                                </li>
                                <li>
                                    A candidate seeking admission must be between the age group of 9-11 years on 1st May of the year of admission for which the Entrance Test is conducted.
                                </li>
                                <li>
                                    A candidate claiming admission must have studied and passed class III, IV & V from Government/Government-Aided/recognized schools in the preceding three continuous academic sessions, spending one full academic session in each class without any repetition of class, gap, and/or break.
                                </li>
                                <li className="font-semibold text-red-600 dark:text-red-400">
                                    No candidate is allowed to appear in the selection test for the second time under any circumstances. If they do so, legal action will be initiated.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}