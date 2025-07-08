"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecentNotices } from "@/firebase/Notices/Notices";
import { Notice } from "@/firebase/types/types";

export default function NoticeSection() {
    const [notices, setNotices] = useState<Notice[]>([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const recentNotices = await getRecentNotices(10);
                setNotices(recentNotices);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchNotices();
    }, []);

    return (
        <section className="h-full flex flex-col">
            <div className="px-2 pb-2">
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    📢 Latest Notices
                </h2>
            </div>

            {/* Scrollable Notice List */}
            <div className="flex-1 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full animate-scroll-vertical space-y-3">
                    {[...notices, ...notices].map((notice, index) => (
                        <Link
                            href={`/notices/${notice.id}`}
                            key={index}
                            className="block text-blue-600 hover:underline font-medium text-sm"
                        >
                            📌 {notice.title}
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .animate-scroll-vertical {
                    animation: scrollUp 20s linear infinite;
                }

                @keyframes scrollUp {
                    0% {
                        top: 100%;
                    }
                    100% {
                        top: -100%;
                    }
                }
            `}</style>
        </section>
    );
}
