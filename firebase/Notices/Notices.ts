import {Notice} from "@/firebase/types/types";
import {collection,doc,getDoc,getDocs, limit, orderBy, query,updateDoc,addDoc,deleteDoc} from "firebase/firestore";
import {db} from "@/firebase/config";

export const getRecentNotices = async (count = 3): Promise<(Notice[])> => {
    const noticesQuery = query(collection(db, "notices"), orderBy("date", "desc"), limit(count))
    const querySnapshot = await getDocs(noticesQuery)
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as Notice & { id: string }))
}
export const getAllNotices = async (): Promise<(Notice[])> => {
    const noticesQuery = query(collection(db, "notices"), orderBy("date", "desc"))
    const querySnapshot = await getDocs(noticesQuery)
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as Notice & { id: string }))
}

export async function getNoticeById(noticeId: string): Promise<Notice | null> {
    try {
        const docRef = doc(db,"notices", noticeId);
        console.log("docRef", docRef);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
             return docSnap.data() as Notice;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
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
    try{
        const noticeRef = doc(db, "notices", id)
        await deleteDoc(noticeRef)
        return true

    }
    catch(error){
        console.error("Error deleting notice:", error);
        return false;
    }

}
