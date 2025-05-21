"use client"

import Achievers from "@/components/Achivers-section"
import NoticeSection from "@/components/notice-section"

export default function InquiryAchievers() {
    return (
        <section className="container mx-auto py-12 px-4 md:px-0">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Notice - 25% width */}
                <div className="w-full md:w-1/4">
                    <NoticeSection />
                </div>

                {/* Achievers - 75% width */}
                <div className="w-full md:w-3/4">
                    <Achievers />
                </div>
            </div>
        </section>
    )
}
