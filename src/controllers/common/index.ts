import { collection, addDoc ,updateDoc , doc ,setDoc ,serverTimestamp } from "firebase/firestore"; 
import { db } from "../../firebase";
import type { Collections } from '../../types'
export const addDocController  = async <T extends { [x: string]: any}>(collectionName: Collections , value:T ) :Promise<string | null > =>{
    let idDoc : string | null = null;
    try {
        const docRef = await addDoc(collection(db, collectionName),{
          ...value,
          timestamp: serverTimestamp()
        });
        idDoc = docRef.id
      } catch (e) {
        alert(e);
      }     
      return idDoc
}

export const updateDocController = async <T extends { [x: string]: any }>(collectionName: Collections , value:T , id : string):Promise<void> =>{
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef,{
      ...value,
      timestamp: serverTimestamp()
    });
    } catch (e) {
      alert( e);
    }
}

export const setDocController = async <T extends { [x: string]: any}>(collectionName: Collections , value:T , id : string ) :Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef,{
      ...value,
      timestamp: serverTimestamp()
    });
    } catch (e) {
      alert(e);
    }
}
