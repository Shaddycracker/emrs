import {Faculty} from "@/firebase/types/types";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/config";


export const getfaculty = async (): Promise<Faculty[]> => {
    const docRef = collection(db, "faculty")
    const dataCollection = await getDocs(docRef);
    return dataCollection.docs.map((doc) => ({...doc.data() as Faculty}))

}
