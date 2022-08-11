import { collection, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "./firebase.config"


// add button as understand "setDoc"
export const saveItem = async (data) => {
    await setDoc(doc(firestore, 'productItems', `${Date.now()}`), data, { merge: true })
}

// fetch data "getDocs"
export const getAllItems = async (data) => {
    const items = await getDocs(query(collection(firestore, "productItems"), orderBy("id", "desc")))
    return items.docs.map(doc => doc.data())
}
