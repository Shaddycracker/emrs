import { Staff } from "@/firebase/types/types";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    limit
} from "firebase/firestore";
import { db } from "@/firebase/config";

// 🔽 Get recent staff (limit by count)
export const getRecentStaff = async (count = 3): Promise<Staff[]> => {
    const staffQuery = query(collection(db, "staff"), orderBy("dateOfJoin", "desc"), limit(count));
    const querySnapshot = await getDocs(staffQuery);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as Staff & { id: string }));
};

// 🔽 Get all staff
export const getAllStaff = async (): Promise<Staff[]> => {
    const staffQuery = query(collection(db, "staff"), orderBy("dateOfJoin", "desc"));
    const querySnapshot = await getDocs(staffQuery);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as Staff & { id: string }));
};

// 🔽 Get single staff by ID
export const getStaffById = async (staffId: string): Promise<Staff | null> => {
    try {
        const docRef = doc(db, "staff", staffId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Staff;
        } else {
            console.log("No such staff found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching staff:", error);
        return null;
    }
};

// 🔽 Add new staff
export const addStaff = async (staffData: Omit<Staff, "id">): Promise<string> => {
    const docRef = await addDoc(collection(db, "staff"), staffData);
    return docRef.id;
};

// 🔽 Update staff
export const updateStaff = async (id: string, staffData: Partial<Staff>): Promise<boolean> => {
    try {
        const staffRef = doc(db, "staff", id);
        await updateDoc(staffRef, staffData);
        return true;
    } catch (error) {
        console.error("Error updating staff:", error);
        return false;
    }
};

// 🔽 Delete staff
export const deleteStaff = async (id: string): Promise<boolean> => {
    try {
        const staffRef = doc(db, "staff", id);
        await deleteDoc(staffRef);
        return true;
    } catch (error) {
        console.error("Error deleting staff:", error);
        return false;
    }
};
