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
    id:string,
    url: string
    uploadedAt: Timestamp
    category:string,
    description:string

}
export interface Result{
    id: string;

}

export interface Inquiry {
    id: string;
    name: string
    email: string
    mobile: string
    message: string
    subject:string
    status: "pending" | "resolved" | "rejected"
    submittedAt: Timestamp
    updatedAt?: Timestamp
}

