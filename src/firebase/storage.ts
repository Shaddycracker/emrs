import { storage } from "./config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export const uploadImage = async (file:File, path:string) => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    return await getDownloadURL(snapshot.ref)
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error

  }
}
