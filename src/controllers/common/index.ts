import { collection, addDoc ,updateDoc , doc ,setDoc ,serverTimestamp ,getDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";
import type { Collections } from '../../types/main'
export const addDocController  = async <T extends { [x: string]: any}>(collectionName: Collections , value:T ) :Promise<string | null > =>{
    let idDoc : string | null = null;
    try {
        const docRef = await addDoc(collection(db, collectionName),{
          ...value,
          timestamp: serverTimestamp()
        });
        idDoc = docRef.id
      } catch (e : any) {
        throw new Error(e);
        
      }     
      return idDoc
}

export const getDocController  = async (collectionName: Collections , id: string ) :Promise<any> =>{
  let data = null
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        data = docSnap.data();
        data._id = docSnap.id;
    }
    } catch (e : any) {
      throw new Error(e)
    }     
    return data
}
export const updateDocController = async <T extends { [x: string]: any }>(collectionName: Collections , value:T , id : string):Promise<void> =>{
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef,{
      ...value,
      timestamp: serverTimestamp()
    });
    } catch (e : any) {
      throw new Error(e);
    }
}

export const setDocController = async <T extends { [x: string]: any}>(collectionName: Collections , value:T , id : string ) :Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef,{
      ...value,
      timestamp: serverTimestamp()
    });
    } catch (e : any) {
      throw new Error(e);
    }
}

export function convertPriceStringToNumber(priceString: string | number): number {
  if (typeof priceString === "number") {
    return priceString;
  }
  const data = Number(priceString.trim().replaceAll(",", ""));
  return data;
}