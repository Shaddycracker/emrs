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

