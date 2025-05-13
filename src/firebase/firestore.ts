// firestoreFunctions.ts
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore"
import {db} from './config';

import { GalleryImage, Inquiry ,fakeInquiries,fakeGalleryImages} from "./types/types"

// Gallery
export const getAllGalleryImages = async (): Promise<(GalleryImage & { id: string })[]> => {
  const galleryQuery = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"))
  const querySnapshot = await getDocs(galleryQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as GalleryImage & { id: string }))
}

export const getGalleryImages = async (count = 10): Promise<(GalleryImage[])> => {
  // const galleryQuery = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"), limit(count))
  // const querySnapshot = await getDocs(galleryQuery)
  // return querySnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data()
  // } as GalleryImage & { id: string }))
   return fakeGalleryImages
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

// Inquiries
export const getAllInquiries = async (): Promise<(Inquiry[])> => {
  // const inquiriesQuery = query(collection(db, "inquiries"), orderBy("submittedAt", "desc"))
  // const querySnapshot = await getDocs(inquiriesQuery)
  // return querySnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data()
  // } as Inquiry & { id: string }))
  return fakeInquiries

}

export const submitInquiry = async (inquiryData: Inquiry): Promise<string> => {
  const docRef = await addDoc(collection(db, "inquiries"), {
    ...inquiryData,
    status: "pending",
    submittedAt: new Date().toISOString()
  })
  return docRef.id
}

export const updateInquiryStatus = async (id: string, status: string): Promise<boolean> => {
  const inquiryRef = doc(db, "inquiries", id)
  await updateDoc(inquiryRef, {
    status,
    updatedAt: new Date().toISOString()
  })
  return true
}

export const deleteInquiry = async (id: string): Promise<boolean> => {
  const inquiryRef = doc(db, "inquiries", id)
  await deleteDoc(inquiryRef)
  return true
}

