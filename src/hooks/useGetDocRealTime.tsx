import { useEffect, useState } from 'react';
import { Collections } from '../types/main';
import { db } from '../firebaseConfig';
import { doc, onSnapshot } from "firebase/firestore";
// ==============================|| ELEMENT REFERENCE HOOKS  ||============================== //

const useGetDocRealTime  =<T,>  (collection : Collections, id : string , initialdata : T):[T ,boolean , boolean] => {
    const [ data, setData ] =  useState<T>(initialdata)
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [isError , setIsError] = useState<boolean>(false)
    useEffect(() => {
        const unsub = onSnapshot(doc(db, collection, id), (doc) => {
            setIsLoading(true);
            if(doc.exists()){
                setData(doc.data() as T);
            }else{
                setIsError(true);
            }
            setIsLoading(false);  
        });
     
        return ()=>{
            unsub()
        }
    },[collection , id])

    return [data , isLoading ,isError]
};

export default useGetDocRealTime;
