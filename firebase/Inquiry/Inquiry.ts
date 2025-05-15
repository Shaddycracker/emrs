import {Inquiry} from "@/firebase/types/types";
import {addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc,Timestamp} from "firebase/firestore";
import {db} from "@/firebase/config";

export const getAllInquiries = async (): Promise<(Inquiry[])> => {
    const inquiriesQuery = query(collection(db, "inquiries"), orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(inquiriesQuery)
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as Inquiry))

}

export const submitInquiry = async (inquiryData: Inquiry): Promise<string> => {
    const docRef = await addDoc(collection(db, "inquiries"),inquiryData)
    await updateDoc(docRef, { id: docRef.id })
    return docRef.id
}

export const updateInquiryStatus = async (id: string, status: string): Promise<boolean> => {
    const inquiryRef = doc(db, "inquiries", id)
    await updateDoc(inquiryRef, {
        status,
        updatedAt:Timestamp.now()
    })
    return true
}

export const deleteInquiry = async (id: string): Promise<boolean> => {
    const inquiryRef = doc(db, "inquiries", id)
    await deleteDoc(inquiryRef)
    return true
}
