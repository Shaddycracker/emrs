import { db } from "@/firebase/config"
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { Committee } from "@/firebase/types/types"

export const getAllCommittees = async (): Promise<Committee[]> => {
    const snapshot = await getDocs(collection(db, "committee"))
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Committee[]
}

export const addCommittee = async (committee: Omit<Committee, "id">): Promise<string> => {
    const docRef = await addDoc(collection(db, "committee"), committee)
    return docRef.id
}

export const updateCommittee = async (id: string, data: Omit<Committee, "id">): Promise<void> => {
    await updateDoc(doc(db, "committee", id), data)
}

export const deleteCommittee = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "committee", id))
}
