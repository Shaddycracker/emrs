// firestoreFunctions.ts
import { db } from "./config"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit
} from "firebase/firestore"

import { Notice, Achiever, GalleryImage, Inquiry ,fakeInquiries,fakeGalleryImages,fakeAchievers,fakeNotices} from "./types/types"

// Notices
export const getAllNotices = async (): Promise<(Notice[])> => {
  // const noticesQuery = query(collection(db, "notices"), orderBy("date", "desc"))
  // const querySnapshot = await getDocs(noticesQuery)
  // return querySnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data()
  // } as Notice & { id: string }))
   return fakeNotices
}

export const getRecentNotices = async (count = 3): Promise<(Notice[])> => {
  // const noticesQuery = query(collection(db, "notices"), orderBy("date", "desc"), limit(count))
  // const querySnapshot = await getDocs(noticesQuery)
  // return querySnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data()
  // } as Notice & { id: string }))
  return fakeNotices
}

export const addNotice = async (noticeData: Notice): Promise<string> => {
  const docRef = await addDoc(collection(db, "notices"), noticeData)
  return docRef.id
}

export const updateNotice = async (id: string, noticeData: Partial<Notice>): Promise<boolean> => {
  const noticeRef = doc(db, "notices", id)
  await updateDoc(noticeRef, noticeData)
  return true
}

export const deleteNotice = async (id: string): Promise<boolean> => {
  const noticeRef = doc(db, "notices", id)
  await deleteDoc(noticeRef)
  return true
}

// Achievers
export const getAllAchievers = async (): Promise<(Achiever & { id: string })[]> => {
  const achieversQuery = query(collection(db, "achievers"), orderBy("year", "desc"))
  const querySnapshot = await getDocs(achieversQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as Achiever & { id: string }))
}

export const getTopAchievers = async (count = 3): Promise<(Achiever[])> => {
  // const achieversQuery = query(collection(db, "achievers"), orderBy("year", "desc"), limit(count))
  // const querySnapshot = await getDocs(achieversQuery)
  // return querySnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data()
  // } as Achiever & { id: string }))
  return fakeAchievers;
}

export const addAchiever = async (achieverData: Achiever): Promise<string> => {
  const docRef = await addDoc(collection(db, "achievers"), achieverData)
  return docRef.id
}

export const updateAchiever = async (id: string, achieverData: Partial<Achiever>): Promise<boolean> => {
  const achieverRef = doc(db, "achievers", id)
  await updateDoc(achieverRef, achieverData)
  return true
}

export const deleteAchiever = async (id: string): Promise<boolean> => {
  const achieverRef = doc(db, "achievers", id)
  await deleteDoc(achieverRef)
  return true
}

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

