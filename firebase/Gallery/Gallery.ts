

import {GalleryImage} from "@/firebase/types/types";
import {addDoc, collection, deleteDoc, doc, getDocs, orderBy, query,limit} from "firebase/firestore";
import {db} from "@/firebase/config";

export const getAllGalleryImages = async (): Promise<GalleryImage[]> => {
    const galleryQuery = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"))
    const querySnapshot = await getDocs(galleryQuery)
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as GalleryImage))
}

export const getGalleryImages = async (count = 10): Promise<(GalleryImage[])> => {
    const galleryQuery = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"), limit(count))
    const querySnapshot = await getDocs(galleryQuery)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as GalleryImage))
}

export const addGalleryImage = async (imageData: GalleryImage): Promise<string> => {
    const docRef = await addDoc(collection(db, "gallery"), imageData)
    return docRef.id
}

export const deleteGalleryImage = async (id: string): Promise<boolean> => {
    const imageRef = doc(db, "gallery", id)
    await deleteDoc(imageRef)
    return true
}
