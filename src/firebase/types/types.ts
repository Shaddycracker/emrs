// types.ts
import {Timestamp} from "firebase/firestore";

export interface Notice {
    id: string;
    title: string
    content: string
    date: Timestamp
    postedBy: string
}

export interface Achiever {
    id: string;
    name: string
    achievement: string
    session: string
    percentage: number
    class:string
    imageUrl?: string
}

export interface GalleryImage {
    url: string
    uploadedAt: string | Date
    caption?: string
}

export interface Inquiry {
    name: string
    email: string
    message: string
    status?: "pending" | "resolved" | "rejected"
    submittedAt?: string
    updatedAt?: string
}
export const fakeGalleryImages: GalleryImage[] = [
    {
        url: "https://example.com/gallery/sports-day.jpg",
        uploadedAt: "2025-03-01",
        caption: "Annual Sports Day Highlights",
    },
    {
        url: "https://example.com/gallery/science-expo.jpg",
        uploadedAt: "2025-02-15",
        caption: "Students explaining science projects",
    },
]

export const fakeInquiries: Inquiry[] = [
    {
        name: "Suresh Kumar",
        email: "suresh.k@example.com",
        message: "I want to know about the admission process.",
        status: "pending",
        submittedAt: "2025-04-05T10:30:00Z",
        updatedAt: "2025-04-05T10:30:00Z",
    },
    {
        name: "Fatima Khan",
        email: "fatima.k@example.com",
        message: "Is hostel facility available for girls?",
        status: "resolved",
        submittedAt: "2025-04-01T09:15:00Z",
        updatedAt: "2025-04-03T08:00:00Z",
    },
]

