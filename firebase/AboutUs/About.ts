import {AboutUs} from "@/firebase/types/types";
import {collection,getDocs} from "firebase/firestore";
import {db} from "@/firebase/config";


export const getAboutUs=async():Promise<AboutUs> =>{
        const docRef =collection(db,"aboutus")
        const dataCollection = await getDocs(docRef);
        return dataCollection.docs[0].data() as AboutUs
}
