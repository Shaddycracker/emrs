import {PrincipleDesk} from "@/firebase/types/types";
import {collection,getDocs, query} from "firebase/firestore";
import {db} from "@/firebase/config";


export const getPrincipleDesk = async (): Promise<(PrincipleDesk[])> => {
    const noticesQuery = query(collection(db, "principle"))
    const querySnapshot = await getDocs(noticesQuery)
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as PrincipleDesk & { id: string }))
}

