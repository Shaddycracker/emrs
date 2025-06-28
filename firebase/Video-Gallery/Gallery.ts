// firebase/Gallery/VideoGallery.ts
import { GalleryVideo } from "@/firebase/types/types";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, limit, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config"; // Assuming your Firebase config is in "@/firebase/config"

const GALLERY_VIDEO_COLLECTION = "gallery-video";

export const getAllGalleryVideos = async (): Promise<GalleryVideo[]> => {
    const galleryVideoQuery = query(collection(db, GALLERY_VIDEO_COLLECTION), orderBy("uploadedAt", "desc"));
    const querySnapshot = await getDocs(galleryVideoQuery);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as GalleryVideo));
};

export const getGalleryVideos = async (count = 10): Promise<GalleryVideo[]> => {
    const galleryVideoQuery = query(collection(db, GALLERY_VIDEO_COLLECTION), orderBy("uploadedAt", "desc"), limit(count));
    const querySnapshot = await getDocs(galleryVideoQuery);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as GalleryVideo));
};

export const addGalleryVideo = async (videoData: Omit<GalleryVideo, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, GALLERY_VIDEO_COLLECTION), {
        ...videoData,
        uploadedAt: videoData.uploadedAt instanceof Timestamp ? videoData.uploadedAt : Timestamp.now()
    });
    return docRef.id;
};

export const deleteGalleryVideo = async (id: string): Promise<boolean> => {
    const videoRef = doc(db, GALLERY_VIDEO_COLLECTION, id);
    await deleteDoc(videoRef);
    return true;
};