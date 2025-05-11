// types.ts
export interface Notice {
    title: string
    content: string
    description: string
    date: string | Date
    postedBy: string
}

export interface Achiever {
    name: string
    achievement: string
    year: number
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

export const fakeNotices: (Notice & { id: string })[] = [
    {
        id: "1",
        title: "Holiday Announcement",
        content: "The school will remain closed on 15th August due to Independence Day.",
        description: "School holiday notice for Independence Day.",
        date: "2025-08-15",
        postedBy: "Principal Office",
    },
    {
        id: "2",
        title: "PTM Scheduled",
        content: "Parent Teacher Meeting is scheduled for 20th September at 10 AM.",
        description: "Annual PTM invitation.",
        date: "2025-09-10",
        postedBy: "Class Teacher",
    },
]

export const fakeAchievers: Achiever[] = [
    {
        name: "Anjali Verma",
        achievement: "1st Rank in National Science Olympiad",
        year: 2024,
        imageUrl: "https://example.com/images/anjali.jpg",
    },
    {
        name: "Rohan Mehta",
        achievement: "Gold Medal in State-Level Football Championship",
        year: 2023,
    },
]
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

