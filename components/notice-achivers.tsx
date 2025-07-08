"use client";

import Achievers from "@/components/Achivers-section";
import NoticeSection from "@/components/notice-section";

export default function InquiryAchievers() {
    return (
        <section className="container mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-col md:flex-row gap-8 h-full">
                {/* Notice Section */}
                <div className="w-full md:w-1/4 flex">
                    <div className="flex-1 h-full rounded-2xl shadow-md dark:shadow-lg dark:shadow-white/10 shadow-gray-300 p-4">
                        <NoticeSection />
                    </div>
                </div>

                {/* Achievers Section */}
                <div className="w-full md:w-3/4 flex">
                    <div className="flex-1 h-full rounded-2xl shadow-md dark:shadow-lg dark:shadow-white/10 shadow-gray-300 p-4">
                        <Achievers />
                    </div>
                </div>
            </div>
        </section>
    );
}
