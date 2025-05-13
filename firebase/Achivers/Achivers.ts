
// Achievers
import {Achiever} from "@/firebase/types/types";
import {addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc,limit} from "firebase/firestore";
import {db} from "@/firebase/config";

export const getAllAchievers = async (): Promise<Achiever[]> => {
    const achieversQuery = query(collection(db, "achievers"), orderBy("session", "desc"))
    const querySnapshot = await getDocs(achieversQuery)
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as Achiever))
}

export const getTopAchievers = async (count = 3): Promise<Achiever[]> => {
    const achieversQuery = query(collection(db, "achievers"), orderBy("session", "desc"), limit(count))
    const querySnapshot = await getDocs(achieversQuery)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Achiever))
}

export const addAchiever = async (achieverData: Achiever): Promise<string> => {
    const docRef = await addDoc(collection(db, "achievers"), achieverData)
    await updateDoc(docRef, { id: docRef.id })
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