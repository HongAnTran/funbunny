import { useEffect, useState } from 'react';
import { Collections } from '../types/main';
import { db } from '../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
// ==============================|| ELEMENT REFERENCE HOOKS  ||============================== //

const useGetDoc  =<T,>  (collection : Collections, id : string , initialdata : T ):[T ,boolean , boolean] => {
    const [ data, setData ] =  useState<T>(initialdata)
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [isError , setIsError] = useState<boolean>(false)
    useEffect(() => {
        setIsLoading(true);
        
       (async ()=>{
        try {
            const docRef = doc(db, collection, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setData(docSnap.data() as T)
            }else {
                setIsError(true)
            }
        } catch (error) {
            setIsError(true)
            alert(error)
        }
        finally{
            setIsLoading(false);
        }
       })()
    },[collection , id])

    return [data , isLoading ,isError]
};

export default useGetDoc;
